import React,{component, Component} from 'react'
import {DatePicker,Select,Button} from 'antd'
import NewButton from '../../BlockQuote/newButton'

const {Option}=Select;
const {RangePicker}=DatePicker;
 class Search extends Component{
    constructor(props){
        super(props);
        this.state={
            startDate:'',
            endDate:'',
            startTime:'',
            endTime:'',
            periodCode:'',//记录下拉框周期类型的value值
        }
        this.startChange=this.startChange.bind(this);
        this.endChange=this.endChange.bind(this);
        this.selectChange=this.selectChange.bind(this);
        this.confirm=this.confirm.bind(this);
    }
    getPeriod(){

    }
     startChange(date,dateString){
         this.setState({
             startDate:dateString
         })
     }
     endChange(date,dateString){
         this.setState({
             endDate:dateString
         })
     }
     selectChange(value){
         this.setState({
             periodCode:value
         })
     }
     confirm(){
         let {startTime,endTime,periodCode}=this.state;//es6新语法，解构赋值
         let params={//点击搜索传给后台的值
             startTime:startTime,
             endTime:endTime,
             periodCode:periodCode
         }
     }
    render(){
        return(
            <span className={this.props.flag?'searchCell':'hide'} >
                <span>开始时间 : </span>&nbsp;<DatePicker onChange={this.props.startChange} style={{width:'200px',marginRight:'20px'}} placeholder={'请选择开始日期'}/>
                <span>结束时间 : </span>&nbsp;<DatePicker onChange={this.props.endChange} style={{width:'200px',marginRight:'20px'}} placeholder='请选择结束日期'/>    
                <Select defaultValue='周' style={{width:120,marginRight:'10px'}} onChange={this.props.selectChange}>
                    <Option key={1} value={1}>周</Option>
                    <Option key={2} value={2}>月</Option>
                    <Option key={3} value={3}>年</Option>
                </Select>
                <NewButton name='确定'  handleClick={this.confirm}/>
            </span>
        );
    }
 }
 export default Search