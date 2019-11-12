import React ,{Component} from  'react'
import {Button,Select,Input,DatePicker} from 'antd'
import '../../processStatistics/process.css'
import NewButton from '../../../BlockQuote/newButton'
import moment from 'moment'
const {Option}=Select;
class AddSearch extends Component{
    constructor(props){
        super(props);
        
    }
    render(){
        let endDate=this.props.endDate?moment(this.props.endDate):null
        return(
            <div className={this.props.flag?'':'hide'}>
                <span>周期 : </span>&nbsp;
                <Select value={this.props.periodCode} className='process-add-head-select' style={{marginRight:'20px'}} onChange={this.props.selectChange}>
                    {
                        this.props.staticPeriod?this.props.staticPeriod.map(data=>{
                            return(
                                <Option key={data.code} name={`${data.startTime}-${data.length}`} value={data.code}>{data.name}</Option>
                            )
                        }):null
                    }
                </Select>
                <span>期数 : </span>&nbsp;<Input value={this.props.inputPeriod} placeholder='请输入期数' style={{width:130,marginRight:'20px'}} onChange={this.props.inputChange}/>
                <span>开始时间 : </span>&nbsp;<DatePicker  onChange={this.props.startChange} className='process-add-head-date' style={{marginRight:'20px'}} placeholder='请选择开始日期'/>
                <span>结束时间 : </span>&nbsp;<DatePicker value={endDate} onChange={this.props.endChange} className='process-add-head-date' style={{marginRight:'20px'}} placeholder='请选择结束日期'/>
                <NewButton name='确定'  handleClick={this.props.search}/>&nbsp;
                <Button type='primary' className='button' onClick={this.props.reset}>
                   <i className='fa fa-repeat'></i> 重置
                </Button>
        </div>
        );
    }
}
export default AddSearch