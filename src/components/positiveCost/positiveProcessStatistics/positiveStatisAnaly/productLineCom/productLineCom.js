import React,{Component} from 'react'
import Search from '../processCompare/compareSearch'
import ReactEcharts from 'echarts-for-react'
import {Spin} from 'antd'
import '../../../../costAccounting/processStatistics/process.css'
class ProductLineCom extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false
        }
        this.handleConfirm=this.handleConfirm.bind(this)
        this.periodChange=this.periodChange.bind(this);
        this.timeChange=this.timeChange.bind(this)
        this.dataTypeChange=this.dataTypeChange.bind(this);
        this.getOption=this.getOption.bind(this);
    }
    handleConfirm(){

    }
    periodChange(){
        
            }
    timeChange(){

    }
    dataTypeChange(){
        
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
            color: ['#003366', '#dc150c','#1890ff'],
            tooltip:{
                trigger:'axis'
            },
            legend:{
                data:['生产线1','生产线2','生产线3']
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
                data:['2019-09-01','2019-09-02','2019-09-03','2019-09-04','2019-09-05']
            },
            yAxis:{
                type:'value',
                name:'含量(T)',
            },
            series:[{
                name:'生产线1',
                type:'line',
                label: labelOption,
                data:[24, 25, 57, 35, 32]
            },{
                name:'生产线2',
                type:'line',
                label: labelOption,
                data:[26, 28, 51, 48, 19]
            },{
                name:'生产线3',
                type:'line',
                label: labelOption,
                data:[9, 26, 28, 52, 48]
            }]
        }
        return option
    }
    render(){
        return(
                <Spin spinning={this.state.loading}>
                    <Search handleConfirm={this.handleConfirm} periodChange={this.periodChange} timeChange={this.timeChange} dataTypeChange={this.dataTypeChange}/>
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