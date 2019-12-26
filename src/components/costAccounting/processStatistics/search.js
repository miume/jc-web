import React,{component, Component} from 'react'
import {DatePicker,Select,Button} from 'antd'
import moment from 'moment'
import NewButton from '../../BlockQuote/newButton'
import './process.css'
const {Option}=Select;
const {RangePicker}=DatePicker;
 class Search extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let endDate=this.props.endDate?moment(this.props.endDate):null;
        let startDate=this.props.startDate?moment(this.props.startDate):null;
        return(
            <span className={this.props.flag?'searchCell':'hide'} >
                    <span>开始时间 : </span>&nbsp;<DatePicker value={startDate} onChange={this.props.dateStartChange} className='process-add-head-date' placeholder='请选择开始日期'/>
                     &nbsp;<span>~</span>&nbsp;<DatePicker value={endDate} onChange={this.props.dateEndChange} className='process-add-head-date' style={{marginRight:'20px'}} placeholder='请选择开始结束日期'/>
                    <Select value={this.props.periodCode} style={{width:120,marginRight:'10px'}} onChange={this.props.selectChange}>
                        {
                            this.props.staticPeriod?this.props.staticPeriod.map(e=>{
                                return(
                                    <Option key={e.code} name={`${e.startTime}-${e.length}`} value={e.code}>{e.name}</Option>
                                )
                            }):null
                        }
                    </Select>
                    <NewButton name='搜索' className='fa fa-search' handleClick={this.props.search}/>
                    <Button type='primary'  onClick={this.props.reset}><i className="fa fa-repeat" aria-hidden="true"></i> 重置</Button>
            </span>
        );
    }
 }
 export default Search