import React,{Component} from 'react'
import {Select,DatePicker} from 'antd'
import NewButton from '../../../../BlockQuote/newButton'
import '../../process.css'
import moment from 'moment'
const {Option}=Select;
class Search extends Component{//工序对比分析
    constructor(props){
        super(props);
    }
   
    render(){
        let code=this.props.periodCode?this.props.periodCode:null
        let endDate=this.props.endDate?moment(this.props.endDate):null
        return(
            <div className={this.props.flag?'statis-processCompare-search':'hide'}>
                
                <Select placeholder='请选择周期类型' value={code} style={{width:'150px',marginRight:'10px'}} onChange={this.props.selectPeriodChange}>
                        
                        {
                            this.props.staticPeriod?this.props.staticPeriod.map(data=>{
                                return(
                                    <Option key={data.code} name={`${data.startTime}-${data.length}`} value={data.code}>{data.name} </Option>
                                )
                            }):null
                        }
                </Select>
                
                {!this.props.lineFlag?<Select  placeholder={'请选择过程工序'} style={{width:'200px',marginRight:'10px'}} onChange={this.props.selectProcessChange}>
                    
                    {
                        this.props.process?this.props.process.map(data=>{
                            return(
                                <Option key={data.code} value={data.code}>{data.processName}</Option>
                            )
                        }
                        ):null
                    }
                </Select>:
                <Select placeholder={'请选择产线'} style={{width:'200px',marginRight:'10px'}} onChange={this.props.selectLineChange}>
                 {this.props.productLine?this.props.productLine.map(data=>{
                     return(
                         <Option key={data.code} value={data.code}>{data.name}</Option>
                     )
                 }):null}
                </Select>
               }
                <DatePicker  placeholder='开始时间' style={{width:'200px'}} onChange={this.props.startChange}/>
                &nbsp;<span>~</span>&nbsp;<DatePicker  value={endDate} placeholder='开始时间截止' style={{width:'200px',marginRight:'10px'}} onChange={this.props.endChange}/>
                <NewButton name='确定' handleClick={this.props.search}/>
                
            </div>
        );
    }
}
export default Search