import React,{Component} from 'react'
import {Spin} from 'antd'
import Search from './compareSearch'
import ReactEcharts from 'echarts-for-react';
import '../../process.css'
import moment from 'moment'
import axios from 'axios'
class ProcessCompare extends Component{//工序对比分析
    constructor(props){
        super(props);
        this.state={
            loading:false,
            periodCode:this.props.periodCode,
            startDate:'',
            endDate:'',
            processCode:'',
            startSecondTime:this.props.startSecondTime,//获取对应的时分秒
            startTime:'',
            endTime:'',
            length:this.props.length,
            xData:[],//期数
            seriesDataNi:[],
            seriesDataCo:[],
            seriesDataMn:[],//niCoMn对应的值
        }
        this.getOption=this.getOption.bind(this);
        this.selectPeriodChange=this.selectPeriodChange.bind(this);
        this.selectProcessChange=this.selectProcessChange.bind(this);
        this.startChange=this.startChange.bind(this);
        this.endChange=this.endChange.bind(this);
        this.search=this.search.bind(this);
    }
    getOption(){
        let {xData,seriesDataCo,seriesDataMn,seriesDataNi}=this.state
        const option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['Ni','Co','Mn']
            },
            toolbox: {
                feature: {
                    dataView: {show: true, readOnly: false},
                    magicType:{show:true,type:['line','bar']},
                    saveAsImage: {show:true}
                }
            },
            xAxis: {
                type: 'category',
                name:'周期数',
                boundaryGap: false,
                data: xData
            },
            yAxis: {
                type: 'value',
                name:'含量(T)'
            },
            series: [
                {
                    name:'Ni',
                    type:'line',
                   data:seriesDataNi
                },
                {
                    name:'Co',
                    type:'line',
                   data:seriesDataCo
                },
                {
                    name:'Mn',
                    type:'line',
                   data:seriesDataMn
                },
            ]
        };
        return option;        
    }
    selectPeriodChange(value,name){
        let name1=name.props.name.split('-')
        let startSecondTime=name1[0],
            length=name1[1]
        this.setState({
            periodCode:value,
            length:length,
            startSecondTime:startSecondTime
        })
    }
    selectProcessChange(value){
        this.setState({
            processCode:value
        })
    }
    startChange(date,dateString){
        let {startSecondTime,length}=this.state;
        let time=new Date(Date.parse(dateString)+length*24*3600*1000) 
        let end=moment(time).format('YYYY-MM-DD')
        this.setState({
            startDate:dateString,
            startTime:`${dateString} ${startSecondTime}`,
            endDate: end,
            endTime:`${end} ${startSecondTime}`
        })
    }
    endChange(date,dateString){
        let {startSecondTime}=this.state
        this.setState({
            endDate:dateString,
            endTime:`${dateString} ${startSecondTime}`
        })
    }
    search(){
        let {periodCode,processCode,startTime,endTime}=this.state;   
        axios({
            url:this.props.url.precursorGoodIn.processCompare,
            method:'get',
            headers:{
               'Authorization' :this.props.url.Authorization
            },
            params:{
                periodId:periodCode,
                processId:processCode,
                startTime:startTime,
                endTime:endTime
            }
        }).then(data=>{
            let res=data.data.data
           if(res){
                let xData=[],
                    seriesDataNi=[],
                    seriesDataCo=[],
                    seriesDataMn=[]
                for(let i=0;i<res.length;i++){
                    seriesDataNi.push(res[i].ni)
                    seriesDataCo.push(res[i].co)
                    seriesDataMn.push(res[i].mn)
                    xData.push(res[i].periodNum)
                }
                this.setState({
                    xData:xData,
                    seriesDataNi:seriesDataNi,
                    seriesDataCo:seriesDataCo,
                    seriesDataMn:seriesDataMn,
                })
           }
        })
    }
    render(){
        this.startSecondTime=this.props.staticPeriod && this.props.staticPeriod[0]?this.props.staticPeriod[0].startTime:''
        return(
            <div>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                   <Search flag={true} staticPeriod={this.props.staticPeriod} process={this.props.process} periodCode={this.props.periodCode} startDate={this.state.startDate} endDate={this.state.endDate} selectPeriodChange={this.selectPeriodChange} selectProcessChange={this.selectProcessChange} startChange={this.startChange} endChange={this.endChange} search={this.search}/>
                  <div className='statis-processCompare-echarts'>
                    <ReactEcharts
                        option={this.getOption()}
                        style={{width:'100%',height: '80%'}}
                    />
                  </div>
                </Spin>
            </div>
        );
    }
}
export default ProcessCompare