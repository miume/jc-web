import React ,{Component} from  'react'
import {Button,Select,Input,DatePicker,Popconfirm} from 'antd'
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
        let startDate=this.props.startDate?moment(this.props.startDate):null
        let subLength=this.props.subLength===undefined?undefined:this.props.subLength
        return(
            <div className={this.props.flag?'':'hide'}>
                <span>周期 : </span>&nbsp;
                {this.props.editFlag?(<Input value={this.props.period} placeholder='周期' style={{width:'130px',marginRight:'20px'}} disabled={this.props.flagConfirm}/>):(<Select value={this.props.periodCode} className='process-add-head-select' style={{marginRight:'20px'}} onChange={this.props.selectChange} disabled={this.props.flagConfirm}>
                    {
                        this.props.staticPeriod?this.props.staticPeriod.map(data=>{
                            return(
                                <Option key={data.code} name={`${data.startTime}-${data.length}`} value={data.code}>{data.name}</Option>
                            )
                        }):null
                    }
                </Select>)}
                <span>期数 : </span>&nbsp;<Input value={this.props.inputPeriod} placeholder='请输入期数' style={{width:130,marginRight:'20px'}}  disabled={true}/>
                <span>开始时间 : </span>&nbsp;<DatePicker disabledDate={this.props.disabledDate} value={startDate} onChange={this.props.startChange} className='process-add-head-date' style={{marginRight:'20px'}} placeholder='请选择开始日期' disabled={this.props.flagConfirm}/>
                <span>结束时间 : </span>&nbsp;<DatePicker disabledDate={this.props.disabledDate} value={endDate} onChange={this.props.endChange} className='process-add-head-date' style={{marginRight:'20px'}} placeholder='请选择结束日期' disabled={this.props.flagConfirm}/>
                
                {!this.props.disabledDateFlag?<Button type='primary' className='button' style={this.props.editFlag?{display:'none'}:{}} onClick={this.props.search} disabled={this.props.flagConfirm}>确定</Button>
                :<Popconfirm title={`与上期结束时间间隔${subLength}天，确定继续吗?`} onConfirm={this.props.search} okText="确定" cancelText="再想想" >
                    <Button type='primary' className='button' style={this.props.editFlag?{display:'none'}:{}}  disabled={this.props.flagConfirm}>确定</Button>
                </Popconfirm>}
                &nbsp;
            </div>
        );
    }
}
export default AddSearch