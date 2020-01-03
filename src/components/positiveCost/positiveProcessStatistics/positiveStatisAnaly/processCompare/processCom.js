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
            let res=data.data.data, xData=[],name=[1,2,3,4,5,6,7,8,9],series=[],
            data10=[[],[],[],[],[],[],[],[],[]]
           if(res){
                for(let i=0;i<res.length;i++){
                    if(res[i].list){
                        for(let j=0;j<res[i].list.length;j++){
                            data10[j].push(res[i].list[j].statValue)
                            name[j]=(res[i].list[j].processName)
                        }
                    }
                    xData.push(res[i].time)
                } 
            }
            name=[...new Set(name)] 
            
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
            
            this.setState({
                loading:false,
                xData:xData,
                name:name,
                series:series
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
        let {xData,name,data10,series}=this.state
           
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