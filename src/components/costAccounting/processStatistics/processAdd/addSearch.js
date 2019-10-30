import React ,{Component} from  'react'
import {Button,Select,Input,DatePicker} from 'antd'
import '../../processStatistics/process.css'
import NewButton from '../../../BlockQuote/newButton'

const {Option}=Select;
class AddSearch extends Component{
    constructor(props){
        super(props)
        this.search=this.search.bind(this);
        this.reset=this.reset.bind(this);
        this.startChange=this.startChange.bind(this);
        this.endChange=this.endChange.bind(this);
    }
    search(){

    }
    reset(){

    }
    startChange(date,dateString){

    }
    endChange(date,dateString){
        
    }
    render(){
        return(
            <div className={this.props.flag?'':'hide'}>
                <span>周期 : </span>&nbsp;
                <Select defaultValue='周' className='process-add-head-select' style={{marginRight:'20px'}}>
                    <Option key={1} value={1}>周</Option>
                    <Option key={2} value={2}>月</Option>
                    <Option key={3} value={3}>年</Option>
                </Select>
                <span>期数 : </span>&nbsp;<Input placeholder='请输入期数' style={{width:130,marginRight:'20px'}} />
                <span>开始时间 : </span>&nbsp;<DatePicker onChange={this.startChange} className='process-add-head-date' style={{marginRight:'20px'}} placeholder='请选择开始日期'/>
                <span>结束时间 : </span>&nbsp;<DatePicker onChange={this.endChange} className='process-add-head-date' style={{marginRight:'20px'}} placeholder='请选择结束日期'/>
                <NewButton name='确定' className='fa fa-search' handleClick={this.search}/>&nbsp;
                <Button type='primary' className='button' onClick={this.reset}>
                   <i className='fa fa-repeat'></i> 重置
                </Button>
        </div>
        );
    }
}
export default AddSearch