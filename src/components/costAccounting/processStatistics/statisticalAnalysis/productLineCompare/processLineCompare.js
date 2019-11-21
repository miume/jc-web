import React,{Component} from 'react'
import {Spin} from 'antd'
import Search from '../processCompare/compareSearch'
import ReactEcharts from 'echarts-for-react';
import '../../process.css'
import moment from 'moment'
import axios from 'axios'
class ProductLineCompare extends Component{//工序对比分析
    constructor(props){
        super(props);
        this.state={
            loading:false,
            periodCode:this.props.periodCode,
            startDate:'',
            endDate:'',
            startTime:'',
            endTime:'',
            lineCode:'',
            length:this.props.length,
            startSecondTime:this.props.startSecondTime
        }
        this.getOption=this.getOption.bind(this);
        this.selectPeriodChange=this.selectPeriodChange.bind(this);
        this.selectLineChange=this.selectLineChange.bind(this);
        this.startChange=this.startChange.bind(this);
        this.endChange=this.endChange.bind(this);
        this.search=this.search.bind(this);
    }
    componentDidMount(){
      //console.log(this.startSecondTime)
    }
    getOption(){
        const option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['Ni','Co','Mn']
            },
        
            toolbox: {
                feature: {
                    magicType:{show:true,type:['line','bar']},
                    saveAsImage: {show:true}
                }
            },
            xAxis: {
                type: 'category',
                name:'周期数',
                boundaryGap: false,
                data: ['59','60','61','63','64','70']
            },
            yAxis: {
                type: 'value',
                name:'含量(T)'
            },
            series: [
                {
                    name:'Ni',
                    type:'line',
                    data:[24, 25, 57, 35, 32, 20]
                },
                {
                    name:'Co',
                    type:'line',
                    data:[26, 28, 51, 48, 19, 17]
                },
                {
                    name:'Mn',
                    type:'line',
                    data:[9, 26, 28, 52, 48, 18]
                },
            ]
        };
        return option;        
    }
    selectPeriodChange(value,name){
        let name1=name.props.name.split('-')
        let startSecondTime=name1[0],
            length=name[1]
        this.setState({
            periodCode:value,
            length:length,
            startSecondTime:startSecondTime
        })
    }
    selectLineChange(value){
        this.setState({
            lineCode:value
        })
    }
    startChange(date,dateString){
        let {startSecondTime,length}=this.state
        let time=new Date(Date.parse(dateString)+length*24*3600*1000)
        let end=moment(time).format('YYYY-MM-DD')
        this.setState({
            startTime:`${dateString} ${startSecondTime}`,
            startDate:dateString,
            endDate:end,
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
            url:this.props.url.precursorGoodIn.lineCompare,
            method:'get',
            headers:{
                'Authorization' :this.props.url.Authorization
            },
            params:{
                periodId:periodCode,
                lineId:processCode,
                startTime:startTime,
                endTime:endTime
            }
        }).then(data=>{
            //console.log(data)
        })
    }
    render(){
        this.startSecondTime=this.props.staticPeriod && this.props.staticPeriod[0] ? this.props.staticPeriod[0].startTime : ''
        return(
            <div>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                   <Search flag={true} lineFlag={true}  periodCode={this.props.periodCode} staticPeriod={this.props.staticPeriod} productLine={this.props.productLine} lineCode={this.state.lineCode} selectPeriodChange={this.selectPeriodChange} selectLineChange={this.selectLineChange} startChange={this.startChange} endChange={this.endChange} endDate={this.state.endDate} search={this.search}/>
                   <div className='statis-processCompare-echarts'> 
                    <ReactEcharts
                        option={this.getOption()}
                        style={{width:'100%',height:'80%'}}
                        />
                  </div>
                </Spin>
            </div>
        );
    }
}
export default ProductLineCompare 