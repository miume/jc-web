import React, { Component } from 'react'
import {Select} from 'antd'
import SearchCell from '../../BlockQuote/search'
import NewButton from '../../BlockQuote/newButton'
const {Option}=Select
class Search extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let date=this.props.date?[...new Set(JSON.parse(JSON.stringify(this.props.date)))]:null //es6数组去重
        return(
            <div className={this.props.flag?'searchCell':'hide'}>
                <Select  style={{width:'120px',marginRight:'10px'}} onChange={this.props.lineChange} placeholder='请选择产线'>
                    <Option value={0} name={'产线'}>产线</Option>
                    <Option value={1} name={'车间'}>车间</Option>
                </Select>
                <Select value={this.props.periodCode} style={{width:'120px',marginRight:'10px'}} onChange={this.props.selectChange}>
                        {
                            this.props.staticPeriod?this.props.staticPeriod.map(e=>{
                                return(
                                    <Option key={e.code}  value={e.code}>{e.name}</Option>
                                )
                            }):null
                        }
                </Select>
                
                <Select
                    showSearch
                    style={{ width: 200 ,marginRight:'10px'}}
                    placeholder="请选择周期开始时间"
                    onChange={this.props.timeChange}
                >
                    {
                        date?date.map((data,index)=>{
                            return(
                                <Option key={index} value={data}>{data}</Option>
                            )
                        }):null
                    }
                </Select>
                <NewButton name='确定' handleClick={this.props.confirm}/>
            </div>
        )
    }
}
export default Search