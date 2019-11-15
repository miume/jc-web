import React,{Component} from 'react'
import {Select,DatePicker} from 'antd'
import NewButton from '../../../../BlockQuote/newButton'
import '../../process.css'
const {Option}=Select;
class Search extends Component{//工序对比分析
    constructor(props){
        super(props);
    }
   
    render(){
        let code=this.props.periodCode?this.props.periodCode:null
        return(
            <div className={this.props.flag?'statis-processCompare-search':'hide'}>
                
                <Select placeholder='请选择周期类型' value={code} style={{width:'150px',marginRight:'10px'}} onChange={this.props.selectPeriodChange}>
                        
                        {
                            this.props.staticPeriod?this.props.staticPeriod.map(data=>{
                                return(
                                    <Option key={data.code} value={data.code}>{data.name} </Option>
                                )
                            }):null
                        }
                </Select>
                <Select  placeholder={this.props.lineFlag?'请选择产线':'请选择过程工序'} style={{width:'150px',marginRight:'10px'}} onChange={this.props.selectProcessChange}>
                    
                    {
                        this.props.process?this.props.process.map(data=>{
                            return(
                                <Option key={data.code} value={data.code}>{data.processName}</Option>
                            )
                        }
                        ):null
                    }
                </Select>
                <DatePicker placeholder='统计时段' style={{width:'150px',marginRight:'10px'}} onChange={this.props.dateChange}/>
                <NewButton name='确定' handleClick={this.props.search}/>
                
            </div>
        );
    }
}
export default Search