import  React,{Component} from 'react'
import Search from './compareSearch'
import {Spin,message} from 'antd'
import axios from 'axios'
import ReactEcharts from 'echarts-for-react'
import '../../../../costAccounting/processStatistics/process.css'
class PositiveProcessCom extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            name:[],
            xData:[],
            series:[]
        }
        this.handleConfirm=this.handleConfirm.bind(this);
        this.timeChange=this.timeChange.bind(this)
        this.getOption=this.getOption.bind(this);
        this.selectChange=this.selectChange.bind(this);
    }
    handleConfirm(){
        let {periodCode,lineCode,startTime,endTime,flag}=this.state;   
        this.setState({
            loading:true
        })
        axios({
            url:this.props.url.positiveProcessStatis.processCompare,
            method:'get',
            headers:{
               'Authorization' :this.props.url.Authorization
            },
            params:{
                periodId:periodCode,
                flag:flag,
                startTime:startTime,
                endTime:endTime,
                lineCode:lineCode
            }
        }).then(data=>{
            let res=data.data.data
           if(res){
                let xData=[],name=[],
                    data10=[[],[],[],[],[],[],[],[],[]]
                for(let i=0;i<res.length;i++){
                    if(res[i].list){
                        data10[0].push(res[i].list[0].statValue)
                        name.push(res[i].list[0].processName)

                        data10[1].push(res[i].list[1].statValue)
                        name.push(res[i].list[1].processName)

                        data10[2].push(res[i].list[2].statValue)
                        name.push(res[i].list[2].processName)

                        data10[3].push(res[i].list[3].statValue)
                        name.push(res[i].list[3].processName)

                        data10[4].push(res[i].list[4].statValue)
                        name.push(res[i].list[4].processName)

                        data10[5].push(res[i].list[5].statValue)
                        name.push(res[i].list[5].processName)

                        data10[6].push(res[i].list[6].statValue)
                        name.push(res[i].list[6].processName)

                        data10[7].push(res[i].list[7].statValue)
                        name.push(res[i].list[7].processName)

                        data10[8].push(res[i].list[8].statValue)
                        name.push(res[i].list[8].processName)
                    }
                    xData.push(res[i].time)
                } 
                name=[...new Set(name)]    
                this.setState({
                    xData:xData,
                    name:name,
                    data10:data10
                })
            }
            this.setState({
                loading:false
            })
        })
    }
    selectChange(value,name){
        name=name.props.name
        this.setState({
            [name]:value
        })
    }
    timeChange(date,dateString){
        this.setState({
            startTime:dateString[0],
            endTime:dateString[1]
        })
    }
  
    getOption(){
        let {xData,name,data10}=this.state,
            series=[]
            for(let i=0;i<name.length;i++){
                series.push({
                    name:name[i],
                    type:'line',
                    label: labelOption,
                    data:data10[i]
                })
            }
        let labelOption = {
            normal: {
                show: true,
                formatter: '{c}  {name|{a}}',
                fontSize: 16,
                rich: {
                    name: {
                        textBorderColor: '#fff'
                    }
                }
            }
        }
        const option={
            tooltip:{
                trigger:'axis'
            },
            legend:{
                data: name
            },
            color: ['#003366', '#dc150c','#1890ff','yellow','orange','green','purple','black','blue'],
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
            xAxis:{
                type:'category',
                name:'日期',
                boundaryGap:false,
                data: xData
            },
            yAxis:{
                type:'value',
                name:'含量(T)'
            },
            series:series
        }
        return option
    }
    render(){
        let {loading,dataFlag}=this.state,{line}=this.props
        return(
            <Spin spinning={loading}>
                <Search flag={true} handleConfirm={this.handleConfirm} dataFlag={dataFlag}
                timeChange={this.timeChange} selectChange={this.selectChange} staticPeriod={this.props.staticPeriod}
                line={line}/>
                <div className={'clear'}></div>
                <div className={'statis-processCompare-echarts'}>
                    <ReactEcharts  
                        option={this.getOption()}
                        style={{width:'100%'}}
                    />
                </div>
            </Spin>
        )
    }
}
export default PositiveProcessCom