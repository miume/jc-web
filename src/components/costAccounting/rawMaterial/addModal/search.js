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
            dateFormat: 'YYYY-MM-DD',
            periods: '',     //记录输入框期数的变化
            disabled: false
        };
        this.reset = this.reset.bind(this);
        this.search = this.search.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.endDateChange =this.endDateChange.bind(this);
        this.startDateChange =this.startDateChange.bind(this);
    }

    render() {
        const {start, end, dateFormat,disabled} = this.state;
        let startValue = start === undefined || start === "" ? null : moment(start, dateFormat),
            endValue = end === undefined || end === "" ? null : moment(end, dateFormat);
        let {staticPeriod,lineName,currentStaticPeriod} = this.props;
        return (
            <span className={this.props.flag?'':'hide'}>
                <span>周期：</span>
                <SelectPeriod staticPeriod={staticPeriod} periodCode={currentStaticPeriod ? currentStaticPeriod.code : ''} selectChange={this.props.selectChange} disabled={disabled}/>
                <span>期数：</span>
                <Input placeholder={'请输入期数'} name={'lineName'} value={lineName} onChange={this.props.inputChange} disabled={disabled} style={{width:170, marginRight: 10}}/>
                <DatePicker placeholder={"请选择开始日期"} value={startValue} onChange={this.startDateChange} style={{marginRight: 10}} disabled={disabled}/>
                <DatePicker placeholder={"请选择结束日期"} value={endValue} onChange={this.endDateChange} style={{marginRight: 10}} disabled={disabled}/>
                <NewButton name={'确定'} handleClick={this.search} flagConfirm={disabled}/>
            </span>
        )
    }

    /**重置事件*/
    reset() {
        this.setState({
            start: '',
            end: '',
            periodCode: '周',
            lineName: ''
        })
    }

    /**date时间范围变化监控*/
    /**date时间范围变化监控*/
    startDateChange(date, dateString) {
        //根据this.props.length来确定end的默认值
        let length = this.props.currentStaticPeriod ? this.props.currentStaticPeriod.length : 0,
            end = new Date(dateString).getTime() + length * 24 * 3600 * 1000;
        this.setState({
            start: dateString,
            end: moment(end).format('YYYY-MM-DD')
        })
    }

    endDateChange(date, dateString) {
        this.setState({
            end: dateString
        })
    }

    /**监控下拉框的变化*/
    selectChange(value, option) {
        let name = option.props.name.split('-');
        console.log(name)
        this.setState({
            periodCode: value
        })
    }

    /**监控输入框期数的变化*/
    inputChange(e) {
        let value = e.target.value;
        this.setState({
            lineName: value
        })
    }

    /**搜索时间*/
    search() {
        let {start, end} = this.state, {lineName,currentStaticPeriod} = this.props,{code,startTime} = currentStaticPeriod;
        if(!start || !end || !lineName) {
            message.info('信息不完全！');
            return
        }
        let params = {
            startTime: start + ' ' + startTime,
            endTime: end + ' ' + startTime,
            lineName: lineName,
            periodCode: code
        };
        this.setState({
            disabled: true
        });
        this.props.searchEvent(params);
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default Search;
