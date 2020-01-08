import React,{Component} from 'react'
import {Spin} from 'antd'
import Search from './compareSearch'
import ReactEcharts from 'echarts-for-react';
import axios from "axios";
class ProcessCompare extends Component{ //产线对比曲线
    constructor(props) {
        super(props);
        this.state = {
            loading:false
        };
        this.getOption = this.getOption.bind(this);
        this.getTableData = this.getTableData.bind(this);
    }

    render(){
        let {staticPeriod,productionLineData} = this.props, {xData,niData,coData,mnData,loading} = this.state;
        return(
            <Spin spinning={loading}>
                <Search flag={true} type={'product'} staticPeriod={staticPeriod} url={this.props.url}
                        productionLineData={productionLineData} search={this.getTableData}/>
                <div className='clear'></div>
                <div className={'raw-material-canvas'}>
                    <ReactEcharts option={this.getOption(xData,niData,coData,mnData)}
                                  style={{width: '100%'}}/>
                </div>
            </Spin>
        );
    }

    getTableData(params,lines) {
        this.setState({
            loading: true
        });
        lines = lines.join(',');
        axios({
            url: `${this.props.url.productStorage.lineCur}?lines=${lines}`,
            method: 'post',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            data: params
        }).then((data) => {
            let res = data.data.data, xData = [], niData = [], coData = [], mnData = [];
            if(res && res.length) {
                for(let i = 0; i < res.length; i++) {
                    let e = res[i];
                    xData.push(e['lineName']);
                    niData.push(e['ni']);
                    coData.push(e['co']);
                    mnData.push(e['mn']);
                }
            }
            this.setState({
                xData,
                niData,
                coData,
                mnData,
                loading: false
            })
        });
    }

    getOption(xData,niData,coData,mnData) {
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
                    color: ['#003366', '#dc150c', '#58a0a8'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data:['Ni','Co','Mn']
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
                            name: 'Ni',
                            type: 'line',
                            barGap: 0,
                            label: labelOption,
                            data: niData
                        },
                        {
                            name: 'Co',
                            type: 'line',
                            label: labelOption,
                            data: coData
                        },
                        {
                            name: 'Mn',
                            type: 'line',
                            label: labelOption,
                            data: mnData
                        }
                    ]
                }
            );
        return option;
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}
export default ProcessCompare
