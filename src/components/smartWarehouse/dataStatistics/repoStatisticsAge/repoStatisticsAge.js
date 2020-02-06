import React, { Component } from "react";
import BlockQuote from '../../../BlockQuote/blockquote'
import {Select, Button,Input,Table,message,Spin} from 'antd'
import axios from 'axios'
import './repoStatisticsAge.css'
import {getOperations,judgeOperation} from "../../../commom/getOperations";
import ReactEcharts from 'echarts-for-react'
import MiddleSearch from './middleSearch'
import TopSearch from './topSearch'
const {Option}=Select

class RepoStatisticsAge extends Component{
    constructor(props){
        super(props)
        this.state={
            xData:[],
            yData:[],
            tableData:[],
            loading:false
        }
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index'
        },{
            title:'编码',
            dataIndex:'编码',
            key:'编码'
        },{
            title:'重量',
            dataIndex:'重量',
            key:'重量'
        }]
        this.back=this.back.bind(this);
        this.loadingParent=this.loadingParent.bind(this);
        this.getTurnData=this.getTurnData.bind(this)
        this.getData=this.getData.bind(this)
        this.selectAgeChange=this.selectAgeChange.bind(this)
    }
    
    render(){
        this.current=JSON.parse(localStorage.getItem('dataEntry'))
        this.url = JSON.parse(localStorage.getItem('url'));
        let {xData,tableData1,turn,totalTurn,loading}=this.state
        return(
            <div>
                <BlockQuote name={this.current.menuName} menu={this.current.menuParent} menu2={'返回'} returnDataEntry={this.back}/>
                <div className={'rightDiv-content'}>
                    <Spin spinning={loading}>
                        <TopSearch url={this.url} getTurnData={this.getTurnData} loadingParent={this.loadingParent}/>
                        <div className={'repoStatisticsAge-turn-div'}>
                            <div>周转率：<span className={'repoStatisticsAge-turn-span'}>{turn}</span></div>
                            <div>总周转率：<span className={'repoStatisticsAge-turn-span'}>{totalTurn}</span></div>
                        </div>
                        <MiddleSearch url={this.url} loadingParent={this.loadingParent} getData={this.getData}/>
                        <div className='repoStatisticsAge-age-echarts'>
                            <ReactEcharts
                                option={this.getOption()}
                                style={{width:'100%',height: '90%'}}
                            />
                        </div>
                        <Select placeholder={'库龄区间'} onChange={this.selectAgeChange}  style={{width:'250px',marginBottom:'20px'}}>
                            {
                                xData&&xData.length?xData.map(item=>{
                                    return(
                                        <Option key={item} value={item}>{item}</Option>
                                    )
                                }):null
                            }
                        </Select>
                        <Table dataSource={tableData1} columns={this.columns} rowKey={(record)=>record.index} pagination={false} size='small' bordered/>
                    </Spin>
                </div>
            </div>
        )
    }
    /**获取子组件数据，根据物料，时间得到的数据*/
    getTurnData(res){
        if(res){
            this.setState({
                turn:res['周转率'],
                totalTurn:res['总库周转率']
            })
        }
        this.setState({
            loading:false
        })
    }
    loadingParent(){
        this.setState({
            loading:true
        })
    }
    /**获取子组件数据，根据库龄区间得到的数据*/
    getData(res){
        if(res){
            this.setState({
                loading:false
            })
            let xData=res.regions?res.regions:undefined,
                yData=res.counts?res.counts:undefined,
                tableData=res.details?res.details:undefined
            if(tableData[0]){
                for(let i=0;i<tableData[0].length;i++){
                    tableData[0][0]['index']=i+1
                }
            }
            this.setState({
                xData:xData,
                yData:yData,
                tableData:tableData,//这个是一个二维数组
                tableData1:tableData[0]?tableData[0]:[]// 默认第一个区间
            })
        }
    }
     /**库龄区间下拉框变化,不同区间底下表格数据是不一样的*/
     selectAgeChange(value){
        let {xData,tableData}=this.state
        for(let i=0;i<xData.length;i++){
            if(value===xData[i]){
                for(let j=0;j<tableData[i].length;j++){
                    tableData[i][0]['index']=j+1
                }
                this.setState({
                    tableData1:tableData[i]
                })
            }
        }
    }
    getOption(){
        let {xData,yData}=this.state
        const option = {
            color: ['#1890ff'],
            title: {
                text: '分布统计重量',
                left: 'center',
            },
            tooltip: {
                trigger: 'axis'
            },
         
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            xAxis: {
                type: 'category',
                name:'库龄区间',
                boundaryGap: false,
                data: xData
            },
            yAxis: {
                type: 'value',
                name:'值'
            },
            series: [
                {
                    name:'Ni',
                    type:'bar',
                    data:yData
                } 
            ]
        };
        return option;        
    }
    back(){
        this.props.history.push('/repoStatistics')
    }
  
}
export default RepoStatisticsAge