import React,{Component} from 'react'
import {Select,DatePicker} from 'antd'
import NewButton from '../../../../BlockQuote/newButton'
const {Option}=Select
const {RangePicker}=DatePicker
 class Search extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div style={{textAlign:'center',marginTop:'20px'}}>
                <Select style={{width:150,marginRight:'20px'}} placeholder='请选择周期类型' onChange={this.props.periodChange}></Select>
                <RangePicker placeholder={['开始时间','结束时间']} style={{width:200,marginRight:'20px'}} onChange={this.props.timeChange}></RangePicker>
                
                <span  className={this.props.flag?'':'hide'}><Select style={{width:150,marginRight:'20px'}} placeholder='请选择产线' onChange={this.props.lineChange}></Select></span>
               <span> <Select style={{width:150,marginRight:'20px'}} placeholder={this.props.flag?'请选择分析类型':'请选择数据类型'} onChange={this.props.flag?this.props.analyChange:this.props.dataTypeChange}></Select></span>
               <span> <Select style={{width:150,marginRight:'20px'}} placeholder={this.props.flag?'请选择分析类型':'请选择数据类型'} onChange={this.props.flag?this.props.analyChange:this.props.dataTypeChange}></Select></span>
                <NewButton name='确定' handleClick={this.props.handleConfirm}/>
            </div>
        )
    }
 }
 export default Search