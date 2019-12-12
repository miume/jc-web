import React from 'react';
import {DatePicker, Input,message} from "antd";
import NewButton from "../../../BlockQuote/newButton";
import moment from "moment";
import SelectPeriod from "../select";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: '',
            end: '',        //记录日期组件的开始时间和结束时间
            periodCode: '',  //记录下拉框-周期类型编码
            dateFormat: 'YYYY-MM-DD'
        };
        this.search = this.search.bind(this);
        this.endDateChange =this.endDateChange.bind(this);
        this.startDateChange =this.startDateChange.bind(this);
    }

    render() {
        let {start, end, dateFormat,periodCode} = this.state,
            startValue = start === undefined || start === "" ? null : moment(start, dateFormat),
            endValue = end === undefined || end === "" ? null : moment(end, dateFormat),
            {staticPeriod,periods,currentStaticPeriod,disabled} = this.props;
        return (
            <span className={this.props.flag?'':'hide'}>
                <span>周期：</span>
                <SelectPeriod staticPeriod={staticPeriod} periodCode={currentStaticPeriod ? currentStaticPeriod.code : periodCode} selectChange={this.props.selectChange} disabled={disabled}/>
                <span>期数：</span>
                <Input placeholder={'请输入期数'} name={'periods'} defaultValue={periods} onChange={this.props.inputChange} disabled={disabled} style={{width:170, marginRight: 10}}/>
                <DatePicker placeholder={"请选择开始日期"} value={startValue} onChange={this.startDateChange} style={{marginRight: 10}} disabled={disabled}/>
                <DatePicker placeholder={"请选择结束日期"} value={endValue} onChange={this.endDateChange} style={{marginRight: 10}} disabled={disabled}/>
                <NewButton name={'确定'} handleClick={this.search} flagConfirm={disabled}/>
            </span>
        )
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.head !== nextProps.head) {
            let {periodCode,periods,lineName,startTime,endTime} = nextProps.head;
            this.setState({
                periodCode: periodCode,
                periods: periods ? periods : lineName,
                start: startTime,
                end: endTime
            })
        }
    }

    /**date时间范围变化监控*/
    /**date时间范围变化监控*/
    startDateChange(date, dateString) {
        //根据this.props.length来确定end的默认值
        let length = this.props.currentStaticPeriod ? this.props.currentStaticPeriod.length : 0,
            end = new Date(dateString).getTime() + length * 24 * 3600 * 1000;
        this.setState({
            start: dateString,
            end: dateString ? moment(end).format('YYYY-MM-DD') : ''
        })
    }

    endDateChange(date, dateString) {
        this.setState({
            end: dateString
        })
    }

    /**搜索时间*/
    search() {
        let {currentStaticPeriod,periods} = this.props;
        if(currentStaticPeriod && periods) {
            let {start, end} = this.state,
                {code,startTime} = currentStaticPeriod;
            if(periods === 0) {
                message.info('期数不能为0！');
                return
            }
            if(!start || !end || !periods || !code) {
                message.info('信息不完全！');
                return
            }
            let params = {
                startTime: start + ' ' + startTime,
                endTime: end + ' ' + startTime,
                periods: periods,
                periodCode: code
            };
            this.props.searchEvent(params);
        } else {
            message.info('信息不完全！');
            return
        }
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default Search;
