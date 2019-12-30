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
            // dataFlag:undefined,
            // periodCode:undefined,
            // lineCode:undefined,
            // flag:undefined
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
                // let xData=[],
                //     seriesDataNi=[],
                //     seriesDataCo=[],
                //     seriesDataMn=[]
                // for(let i=0;i<res.length;i++){
                //     seriesDataNi.push(res[i].ni)
                //     seriesDataCo.push(res[i].co)
                //     seriesDataMn.push(res[i].mn)
                //     xData.push(res[i].periodNum)
                // }
                // this.setState({
                //     xData:xData,
                //     seriesDataNi:seriesDataNi,
                //     seriesDataCo:seriesDataCo,
                //     seriesDataMn:seriesDataMn,
                // })
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
                data:['在线原料','工序名称','工序名称1']
            },
            color: ['#003366', '#dc150c','#1890ff'],
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
                type:'',
                name:'日期',
                boundaryGap:false,
                data:['2019-09-01','2019-09-02','2019-09-03','2019-09-04','2019-09-05']
            },
            yAxis:{
                type:'value',
                name:'含量(T)'
            },
            series:[{
                name:'在线原料',
                type:'line',
                label: labelOption,
                data:[24, 25, 57, 35, 32]
            },{
                name:'工序名称',
                type:'line',
                label: labelOption,
                data:[26, 28, 51, 48, 19]
            },{
                name:'工序名称1',
                type:'line',
                label: labelOption,
                data:[9, 26, 28, 52, 48]
            }]
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