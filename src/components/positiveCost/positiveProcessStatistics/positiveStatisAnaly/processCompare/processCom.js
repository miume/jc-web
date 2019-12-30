import  React,{Component} from 'react'
import Search from './compareSearch'
import {Spin} from 'antd'
import ReactEcharts from 'echarts-for-react'
import '../../../../costAccounting/processStatistics/process.css'
class PositiveProcessCom extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false
        }
        this.handleConfirm=this.handleConfirm.bind(this);
        this.periodChange=this.periodChange.bind(this);
        this.timeChange=this.timeChange.bind(this)
        this.lineChange=this.lineChange.bind(this);
        this.analyChange=this.analyChange.bind(this)
        this.getOption=this.getOption.bind(this);
    }
    handleConfirm(){

    }
    periodChange(){

    }
    timeChange(){

    }
    lineChange(){

    }
    analyChange(){

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
        let {loading}=this.state
        return(
            <Spin spinning={loading}>
                <Search flag={true} handleConfirm={this.handleConfirm} periodChange={this.periodChange} timeChange={this.timeChange} lineChange={this.lineChange} analyChange={this.analyChange}/>
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