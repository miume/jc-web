import React,{Component} from 'react'
import {Select,DatePicker} from 'antd'
import NewButton from '../../../../BlockQuote/newButton'
const {Option}=Select
 class Search extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let {lineCode,periodCode,timeData,startTime,lineNameData,periods}=this.props
        return(
            <div className='searchCell'>
                <Select value={periodCode} onChange={this.props.selectChange} style={{width:'200px',marginRight:'10px'}} placeholder='请选择周期类型'>
                    {
                        this.props.staticPeriod?this.props.staticPeriod.map(item=>{
                            return(
                                <Option key={item.code} name='periodCode' value={item.code}>{item.name}</Option>
                            )
                        }):null
                    }
                </Select>
                <Select placeholder={'请选择周期开始时间'} style={{width:'200px',marginRight:'10px'}} onChange={this.props.onChange} value={periods}
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
                            this.props.line?this.props.line.map(item=>{
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