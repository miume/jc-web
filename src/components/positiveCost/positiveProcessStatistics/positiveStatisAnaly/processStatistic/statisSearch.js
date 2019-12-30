import React,{Component} from 'react'
import {Select,DatePicker} from 'antd'
import NewButton from '../../../../BlockQuote/newButton'
const {Option}=Select
 class Search extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let {lineCode,periodCode,timeData}=this.props
        return(
            <div className='searchCell'>
                <Select value={periodCode} onChange={this.props.selectChange} style={{width:'150px',marginRight:'10px'}} placeholder='请选择周期类型'>
                    {
                        this.props.staticPeriod?this.props.staticPeriod.map(item=>{
                            return(
                                <Option key={item.code} name='periodId' value={item.code}>{item.name}</Option>
                            )
                        }):null
                    }
                </Select>
                <Select 
                    style={{width:'150px',marginRight:'10px'}}
                    placeholder='请选择时间'
                    showSearch 
                    optionFilterProp="children"  
                    onChange={this.props.onChange}
                    filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {
                        timeData?timeData.map((item,index)=>{
                            return(
                                <Option key={index} value={item.beginTime} name={item.periods}>{item.beginTime}</Option>
                            )
                        }):null
                    }
                </Select>
                <span className={this.props.lineFlag?'':'hide'}>
                    <Select value={lineCode} onChange={this.props.selectChange} style={{width:'150px',marginRight:'10px'}} placeholder='请选择产线'>
                        {
                            this.props.line?this.props.line.map(item=>{
                                return(
                                    <Option key={item.code} name='lineId' value={item.code}>{item.name}</Option>
                                )
                            }):null
                        }
                    </Select>
                </span>
                <NewButton name='确定'/>
            </div>
        )
    }
 }
 export default Search