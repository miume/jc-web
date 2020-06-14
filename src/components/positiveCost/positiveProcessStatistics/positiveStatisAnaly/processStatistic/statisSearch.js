import React,{Component} from 'react'
import {Select,DatePicker} from 'antd'
import NewButton from '../../../../BlockQuote/newButton'
const {Option}=Select
 class Search extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let {lineCode,periodCode,lineNameData,periods,modelData,modelCode,staticPeriod,line,beginTime,endTime}=this.props
        console.log(periodCode,beginTime)
        return(
            <div className='searchCell'>
                <span className={this.props.productFlag?'':'hide'}>
                    <Select value={modelCode} onChange={this.props.selectChange} style={{width:'150px',marginRight:'10px'}} placeholder='请选择产品型号'>
                        {
                            modelData?modelData.map(item=>{
                                return(
                                    <Option key={item.code} name='modelCode' value={item.code}>{item.name}</Option>
                                )
                            }):null
                        }
                    </Select>
                </span>
                <Select value={periodCode} onChange={this.props.selectChange} style={{width:'200px',marginRight:'10px'}} placeholder='请选择周期类型'>
                    {
                        staticPeriod?staticPeriod.map(item=>{
                            return(
                                <Option key={item.code} name='periodCode' value={item.code}>{item.name}</Option>
                            )
                        }):null
                    }
                </Select>
                <Select placeholder={'请选择周期开始时间'} style={{width:'400px',marginRight:'10px'}} onChange={this.props.onChange}
                 value={beginTime&&endTime?`${beginTime} ~ ${endTime}`:undefined}
                        dropdownMatchSelectWidth={false} dropdownStyle={{width: 400}}>
                    {
                        lineNameData ?
                            lineNameData.map((e,index) =>
                                <Option key={index} value={`${e.periods}/${e.beginTime}/${e.endTime}`} name='periods' disabled={e.disabled}>
                                    <div>
                                        <span style={{padding: '0 10',display:'inline-block',width: 40}}>{e.periods}</span>
                                        <span style={{padding: '0 10',display:'inline-block',width: 170}}>{e.beginTime}</span>
                                        <span style={{padding: '0 10',display:'inline-block',width: 170}}>{e.endTime}</span>
                                    </div>
                                </Option>
                            ) : null
                    }
                </Select>
                <span className={this.props.lineFlag?'':'hide'}>
                    <Select value={lineCode} onChange={this.props.selectChange} style={{width:'150px',marginRight:'10px'}} placeholder='请选择产线'>
                        {
                            line?line.map(item=>{
                                return(
                                    <Option key={item.code} name='lineCode' value={item.code}>{item.name}</Option>
                                )
                            }):null
                        }
                    </Select>
                </span>
                <NewButton name='确定' handleClick={this.props.getTableData}/>
            </div>
        )
    }
 }
 export default Search