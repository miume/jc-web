import React,{Component} from 'react'
import Search from '../processCompare/compareSearch'
import ReactEcharts from 'echarts-for-react'
import {Spin,message} from 'antd'
import axios from 'axios'
import '../../../../costAccounting/processStatistics/process.css'
class ProductLineCom extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            name:[],
            xData:[],
        }
        this.handleConfirm=this.handleConfirm.bind(this)
        this.timeChange=this.timeChange.bind(this)
        this.getOption=this.getOption.bind(this);
        this.selectChange=this.selectChange.bind(this);
    }
    handleConfirm(){
        let {periodCode,dataFlag,startTime,endTime,materialFlag}=this.state;   
        this.setState({
            loading:true
        })
        axios({
            url:this.props.url.positiveProcessStatis.lineCompare,
            method:'get',
            headers:{
               'Authorization' :this.props.url.Authorization
            },
            params:{
                periodId:periodCode,
                dataFlag:dataFlag,
                startTime:startTime,
                endTime:endTime,
                materialFlag:materialFlag
            }
        }).then(data=>{
            let res=data.data.data
           if(res){
            let xData=[],name=[],
            data10=[[],[],[],[],[],[]]
        for(let i=0;i<res.length;i++){
            if(res[i].lines&&res[i].value){
                data10[0].push(res[i].value[0])
                name.push(res[i].lines[0].name)

                data10[1].push(res[i].value[1])
                name.push(res[i].lines[1].name)

                data10[2].push(res[i].value[2])
                name.push(res[i].lines[2].name)

                data10[3].push(res[i].value[3])
                name.push(res[i].lines[3].name)

                data10[4].push(res[i].value[4])
                name.push(res[i].lines[4].name)

                data10[5].push(res[i].value[5])
                name.push(res[i].lines[5].name)

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
            color: ['#003366', '#dc150c','#1890ff'],
            tooltip:{
                trigger:'axis'
            },
            legend:{
                data: name
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
            xAxis:{
                type:'category',
                name:'日期',
                boundaryGap:false,
                data: xData
            },
            yAxis:{
                type:'value',
                name:'含量(T)',
            },
            series:series
        }
        return option
    }
    render(){
        return(
                <Spin spinning={this.state.loading}>
                    <Search handleConfirm={this.handleConfirm} timeChange={this.timeChange} dataFlag={this.state.dataFlag}
                            selectChange={this.selectChange} staticPeriod={this.props.staticPeriod}
                    />
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
export default ProductLineCom