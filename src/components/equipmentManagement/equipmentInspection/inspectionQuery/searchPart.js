import React from 'react';
import {Button, DatePicker, Icon, Input} from 'antd';
import "./inspectionQuery.css"
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
const { RangePicker } = DatePicker;

export default class SearchPart extends React.Component{
    constructor(props){
        super(props)
        this.state={
            InputValue:'',
            RangePickerValue:[],
        }
    }
    handleRangePickerChange=(value)=>{
        this.setState({RangePickerValue:value})
    }
    handleInputChange=(e)=>{
        this.setState({InputValue:e.target.value})
    }
    render(){
        return(
            <span className="inspectionsearchPart">
                <Input
                    id="inspectionInput"
                    placeholder="请输入计划名称"
                    value={this.state.InputValue}
                    onChange={this.handleInputChange}
                />
                <RangePicker
                    style={{marginLeft:10}}
                    placeholder={["开始日期","结束日期"]}
                    value={this.state.RangePickerValue}
                    onChange={this.handleRangePickerChange}
                />
                <Button
                    type="primary"
                    style={{marginLeft:10}}
                    onClick={this.handleSearch}
                    className='button'
                >
                    <Icon type="search" />搜索</Button>
                <Button
                    type="primary"
                    onClick={this.getFetch}
                    className='button'
                >
                    <i className="fa fa-repeat" aria-hidden="true"/> 重置</Button>
            </span>
        );
    }
    handleSearch=()=>{
        var params={};
        if(this.state.RangePickerValue.length===0){
            params={
                condition:this.state.InputValue,
                startDate:'',
                endDate:'',
            }
        }
        else{
            params={
                condition:this.state.InputValue,
                startDate:moment(this.state.RangePickerValue[0]).format("YYYY-MM-DD"),
                endDate:moment(this.state.RangePickerValue[1]).format("YYYY-MM-DD"),
            }
        }
        this.props.getTableData(params)
        this.props.handleSearch()
        //console.log(params)
    }
    getFetch = () => {
        /**重置时清除搜索框的值 */
        this.setState({
            InputValue:'',
            RangePickerValue:[],
        })
        this.props.handleSearch()
        this.props.getTableData()
    }
}

