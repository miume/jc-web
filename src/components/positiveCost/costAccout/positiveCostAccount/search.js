import React, { Component } from 'react'
import {Select,Radio} from 'antd'
import NewButton from '../../../BlockQuote/newButton'
const {Option}=Select
class Search extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let  {lineNameData,periods,selectChange,periodCode,staticPeriod,type,onRadioChange,productionType,pageType,allProductionType} = this.props; //es6数组去重
        return(
            <div className={this.props.flag?'searchCell':'hide'}>
                <Select value={productionType} style={ pageType === 3 ? {width:'150px',marginRight:'10px'} : {display:'none'}} onChange={selectChange} placeholder='请选择产品型号'>
                    {
                        allProductionType ? allProductionType.map(e=>{
                            return(
                                <Option key={e.code} value={e.code} name='productionType'>{e.name}</Option>
                            )
                        }):null
                    }
                </Select>
                <Radio.Group onChange={onRadioChange} value={type}>
                    <Radio value={1}>前驱体</Radio>
                    <Radio value={2}>碳酸锂</Radio>
                </Radio.Group>
                <Select value={periodCode} style={{width:'150px',marginRight:'10px'}} onChange={selectChange}>
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
