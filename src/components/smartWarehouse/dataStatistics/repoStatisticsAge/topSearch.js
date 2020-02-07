import React, { Component } from 'react'
import {Select, Button,DatePicker,message} from 'antd'
import './repoStatisticsAge.css'
import axios from 'axios'
const {MonthPicker}=DatePicker
const {Option}=Select
class TopSearch extends Component{
    constructor(props){
        super(props)
        this.state={
            typeData:[],
            subTypeData:[],
        }
        this.getAllType=this.getAllType.bind(this)
        this.getAllSubType=this.getAllSubType.bind(this)
        this.selectChange=this.selectChange.bind(this)
        this.searchTop=this.searchTop.bind(this)
        this.monthChange=this.monthChange.bind(this);
    }
    render(){
        let {typeData,subTypeData}=this.state
        return(
            <div className={'repoStatisticsAge-age-div'}>
                <div>物料大类：<Select style={{width:'250px'}} onChange={this.selectChange} placeholder={'请选择物料大类'}>
                            {
                                typeData&&typeData.length?typeData.map(item=>{
                                    return(
                                        <Option key={item.id} value={item.id} name={'type'}>{item.typeName}</Option>
                                    )
                                }):null
                            }
                        </Select>
                </div>
                <div>物料小类：<Select style={{width:'250px'}} onChange={this.selectChange} placeholder={'请选择物料小类'}>
                            {
                                subTypeData&&subTypeData.length?subTypeData.map(item=>{
                                    return(
                                        <Option key={item.id} value={item.id} name={'subType'}>{item.subTypeName}</Option>
                                    )
                                }):null
                            }
                        </Select>
                </div>
                <div>统计月份：<MonthPicker style={{width:'250px'}} onChange={this.monthChange} placeholder={'请选择统计月份'}/></div>
                <Button type='primary' onClick={this.searchTop}><i className={'fa fa-search'}></i>&nbsp;查询</Button>
            </div>
        )
    }
    componentDidMount(){
        this.getAllType()
        this.getAllSubType()
    }
        /**获取所有物料大类*/
    getAllType(){
        axios({
            url: `${this.props.url.material.material}/getAll`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
        }).then(data => {
            let res = data.data.data;
            if(res) {
                this.setState({
                    typeData:res
                })
            }
        })
    }
        /**获取所有物料小类*/
    getAllSubType(){
        axios({
            url: `${this.props.url.subMaterial.subMaterial}/getAll`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
        }).then(data => {
            let res = data.data.data;
            if(res) {
                this.setState({
                    subTypeData: res
                })
            }
        })
    }
    selectChange(value,name){
        name=name.props.name
        this.setState({
            [name]:parseInt(value)
        })
    }
    monthChange(date,dateString){
        this.setState({
            time:dateString
        })
    }
    /**根据物料，时间查询*/
    searchTop(){
        this.props.loadingParent()
        let {type,subType,time}=this.state,
        params={
            type:type,
            subType:subType,
            time:time
        }
        axios({
            url:this.props.url.swmsStockAgeStatistic.turnoverRate,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:params
        }).then(data=>{
                if(data.data.code==='000000'){
                    let res=data.data.data
                    this.props.getTurnData(res)
                }
                else{
                    message.info(data.data.mesg)
                }
        }).catch(()=>{
            message.info('操作失败，请联系管理员!')
        })
    }
    componentWillUnmount(){
        this.setState=()=>{
            return;
        }
    }
}
export default TopSearch