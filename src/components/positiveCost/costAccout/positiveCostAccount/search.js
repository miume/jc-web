import React, { Component } from 'react'
import {Select} from 'antd'
import SearchCell from '../../../BlockQuote/search'
import NewButton from '../../../BlockQuote/newButton'
const {Option}=Select
class Search extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let  {lineNameData,periods,selectChange,periodCode,staticPeriod} = this.props; //es6数组去重
        return(
            <div className={this.props.flag?'searchCell':'hide'}>
                {/* <Select  style={{width:'150px',marginRight:'10px'}} onChange={this.props.selectChange} placeholder='请选择核算对象'>
                    
                         <Option key={0} value={0} name='lineCode'>产线</Option>
                         <Option key={1} value={1} name='lineCode'>车间</Option>
                    
                </Select> */}
                <Select value={periodCode} style={{width:'150px',marginRight:'10px'}} onChange={this.props.selectChange}>
                        {
                            staticPeriod?staticPeriod.map(e=>{
                                return(
                                    <Option key={e.code}  value={e.code} name='periodCode'>{e.name}</Option>
                                )
                            }):null
                        }
                </Select>
                <Select placeholder={'请选择周期开始时间'} style={{width:'200px',marginRight:'10px'}} onChange={this.props.timeChange} value={periods}
                        dropdownMatchSelectWidth={false} dropdownStyle={{width: 300}}>
                    {
                        lineNameData ?
                            lineNameData.map((e,index) =>
                                <Option key={index} value={`${e.periods}/${e.startTime}/${e.endTime}`} name='periods' disabled={e.disabled}>
                                    <div>
                                        <span style={{padding: '0 10',display:'inline-block',width: 40}}>{e.periods}</span>
                                        <span style={{padding: '0 10',display:'inline-block',width: 120}}>{e.startTime}</span>
                                        <span style={{padding: '0 10',display:'inline-block',width: 120}}>{e.endTime}</span>
                                    </div>
                                </Option>
                            ) : null
                    }
                </Select>
                <NewButton name='查询' handleClick={this.props.confirm}/>
            </div>
        )
    }
}
export default Search
