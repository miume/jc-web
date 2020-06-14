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
    componentDidMount(){
        let {periodCode}=this.props
        this.setState({
            periodCode:periodCode,
        })
    }
    componentWillUnmount(){
        this.setState=()=>{
            return
        }
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
            let res=data.data.data, xData=[],name=[1,2,3,4,5,6],
            data10=[[],[],[],[],[],[]],series=[]
           if(res){
                for(let i=0;i<res.length;i++){
                    if(res[i].lines.length!==0&&res[i].value.length!==0){
                        for(let j=0;j<res[i].lines.length;j++){
                            data10[j].push(res[i].value[j])
                            name[j]=(res[i].lines[j].name)
                        }
                        xData.push(res[i].time)
                    }
                    
                } 
           }
           name=[...new Set(name)]   
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
            for(let i=0;i<name.length;i++){
                series.push({
                    name:name[i],
                    type:'line',
                    label: labelOption,
                    data:data10[i]
                })
            }
            this.setState({
                xData:xData,
                name:name,
                series:series,
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
        let {xData,name,series}=this.state
        const option={
            color: ['#003366', '#dc150c','#1890ff','green','purple','orange'],
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
        let {periodCode}=this.state
        return(
                <Spin spinning={this.state.loading}>
                    <Search handleConfirm={this.handleConfirm} timeChange={this.timeChange} 
                            dataFlag={this.state.dataFlag}   periodCode={periodCode}
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