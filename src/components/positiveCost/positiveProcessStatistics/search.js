import React,{component, Component} from 'react'
import {DatePicker,Select,Button} from 'antd'
import NewButton from '../../BlockQuote/newButton'

const {Option}=Select;
const {RangePicker}=DatePicker;
 class Search extends Component{
    constructor(props){
        super(props);
        
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
                <NewButton name='确定'  handleClick={this.props.search}/>
                <Button type='primary'  onClick={this.props.reset}><i className="fa fa-repeat" aria-hidden="true"></i> 重置</Button>
            </span>
        );
    }
 }
 export default Search