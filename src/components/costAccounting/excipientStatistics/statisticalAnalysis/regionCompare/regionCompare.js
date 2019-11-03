import React,{Component} from 'react'
import {Spin} from 'antd'
import Search from '../productLineCompare/compareSearch'
import ReactEcharts from 'echarts-for-react';
class ProcessCompare extends Component{//工序对比分析
    constructor(props){
        super(props);
        this.state={
            loading:false
        }
        this.getOption=this.getOption.bind(this);
    }
    getOption(){
        const option = {
            // title: {
            //     text: ''
            // },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['Ni','Co','Mn']
            },
            // grid: {
            //     top: '16%',   // 等价于 y: '16%'
            //     left: '5%', 
            //     right: '5%',
            //     bottom: '3%',
            //     containLabel: true
            // },
            toolbox: {
                feature: {
                    saveAsImage: {}
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
    render(){
        
        return(
            <div>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                   <Search flag={true}/>
                   <ReactEcharts
                        option={this.getOption()}
                        style={{height: '350px', width: '800px',margin:'20px 100px 0 150px'}}
                        />
                </Spin>
            </div>
        );
    }
}
export default ProcessCompare