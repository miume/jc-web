import React,{Component} from 'react'
import Search from '../productLineCompare/compareSearch'
import ReactEcharts from 'echarts-for-react';
import axios from 'axios';
import {Spin} from "antd";

class ProcessCompare extends Component{//工序对比分析
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            xData: [],
            alkData: [],
            ammData: []
        };
        this.getOption = this.getOption.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.precursorProcessType = this.precursorProcessType.bind(this);
    }

    render() {
        let {staticPeriod} = this.props, {processData,xData,alkData,ammData,loading} = this.state;
        return (
            <Spin spinning={loading}>
                <Search flag={true} staticPeriod={staticPeriod}
                        processData={processData} search={this.getTableData}/>
                <div className='clear'></div>
                <div className={'raw-material-canvas'}>
                    <ReactEcharts option={this.getOption(xData,alkData,ammData)}
                                  style={{width: '100%'}}/>
                </div>
            </Spin>
        );
    }

    componentDidMount() {
        this.precursorProcessType();
    }

    /**获取辅料的所有工序名称*/
    precursorProcessType() {
        axios({
            url: `${this.props.url.precursorProcessType.getByType}?flag=1`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then((data) => {
            let res = data.data.data;
            if(res && res.length) {
                this.setState({
                    processData: res,
                });
            }
        })
    }

    getTableData(params,processId) {
        this.setState({
            loading: true
        });
        axios({
            url: `${this.props.url.auxiliary.processCur}?processId=${processId}`,
            method: 'post',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            data: params
        }).then((data) => {
            let res = data.data.data, xData = [], alkData = [], ammData = [];
            if(res && res.length) {
                for(let i = 0; i < res.length; i++) {
                    let e = res[i];
                    xData.push(e['periodNum']);
                    alkData.push(e['alk']);
                    ammData.push(e['amm']);
                }
            }
            this.setState({
                xData,
                alkData,
                ammData,
                loading: false
            })
        });
    }

    getOption(xData,alkData,ammData) {
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
        },
            option = (
                {
                    color: ['#003366', '#dc150c'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data:['氨量','碱量']
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
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            name: '周期数',
                            axisTick: {show: false},
                            data: xData
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '含量（T）',
                        }
                    ],
                    series: [
                        {
                            name: '氨量',
                            type: 'line',
                            barGap: 0,
                            label: labelOption,
                            data: alkData
                        },
                        {
                            name: '碱量',
                            type: 'line',
                            label: labelOption,
                            data: ammData
                        }
                    ]
                }
            );
        return option;
    }
}
export default ProcessCompare
