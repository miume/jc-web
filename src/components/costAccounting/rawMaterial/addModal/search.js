import React from 'react';
import {Button, DatePicker, Input, Select} from "antd";
import NewButton from "../../../BlockQuote/newButton";
import moment from "moment";

const {RangePicker} = DatePicker;
const {Option} = Select;

class Search extends React.Component {
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            start: '',
            end: '',        //记录日期组件的开始时间和结束时间
            periodCode: 1,  //记录下拉框-周期类型编码
            dateFormat: 'YYYY-MM-DD',
            periods: ''     //记录输入框期数的变化
        };
        this.reset = this.reset.bind(this);
        this.search = this.search.bind(this);
        this.onChange =this.onChange.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.selectChange = this.selectChange.bind(this);
    }

    render() {
        const {start, end, dateFormat} = this.state;
        const value = start === undefined || end === undefined || start === "" || end === "" ? null : [moment(start, dateFormat), moment(end, dateFormat)];
        return (
            <span className={this.props.flag?'':'hide'}>
                <span>周期：</span>
                <Select className={'raw-material-select'}
                        style={{marginRight: 10,width:80}} value={this.state.periodCode} onChange={this.selectChange}>
                    <Option value={1}>周</Option>
                    <Option value={2}>月</Option>
                    <Option value={3}>年</Option>
                </Select>
                <span>期数：</span>
                <Input placeholder={'请输入期数'} onChange={this.inputChange} style={{width:100, marginRight: 10}}/>
                <RangePicker placeholder={["开始日期","结束日期"]}  onChange={this.onChange}
                             className={'raw-material-date'} style={{marginRight: 10}}
                             value={value}
                             format={dateFormat}
                />
                <NewButton name={'确定'} handleClick={this.search}/>
                <Button
                    type="primary"
                    onClick={this.reset}
                    className='button'
                ><i className="fa fa-repeat" aria-hidden="true"></i> 重置</Button>
            </span>
        )
    }

    /**重置事件*/
    reset() {
        this.setState({
            start: '',
            end: '',
            periodCode: '周',
            periods: ''
        })
    }

    /**date时间范围变化监控*/
    onChange(date, dateString) {
        console.log(date, dateString)
        this.setState({
            start: dateString[0],
            end: dateString[1]
        })
    }

    /**监控下拉框的变化*/
    selectChange(value) {
        console.log('select=',value)
        this.setState({
            periodCode: value
        })
    }

    /**监控输入框期数的变化*/
    inputChange(e) {
        let value = e.target.value;
        this.setState({
            periods: value
        })
    }

    /**搜索时间*/
    search() {
        let {start, end, periodCode,periods} = this.state;
        let params = {
            start: start,
            end: end,
            periodCode: periodCode,
            periods: periods
        }
        console.log(params)
    }
}

export default Search;
