/**
 * 周期对比曲线
 * */
import React from 'react';
import axios from 'axios';
import ReactEcharts from 'echarts-for-react';
import Search from "../../excipientStatistics/statisticalAnalysis/productLineCompare/compareSearch";
import {Spin} from "antd";

class CycleComparison extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
        this.getOption = this.getOption.bind(this);
        this.getTableData = this.getTableData.bind(this);
    }
    render() {
        let {staticPeriod,productionLineData} = this.props, {xData,niData,coData,mnData,loading} = this.state;
        return (
            <Spin spinning={loading} wrapperClassName='rightDiv-content'>
                <Search flag={true} staticPeriod={staticPeriod}
                        productionLineData={productionLineData} search={this.getTableData}/>
                <div className={'clear'}></div>
                <div className={'raw-material-canvas'}>
                    <ReactEcharts option={this.getOption(xData,niData,coData,mnData)}
                                  style={{width: '100%',height:'80%'}}/>
                </div>
            </Spin>
        )
    }

    getTableData(params,lineId) {
        this.setState({
            loading: true
        });
        axios({
            url: `${this.props.url.rawMaterial.periodCompare}?lineCode=${lineId}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params
        }).then((data) => {
            let res = data.data.data, xData = [], niData = [], coData = [], mnData = [];
            if(res && res.length) {
                for(let i = 0; i < res.length; i++) {
                    let e = res[i];
                    xData.push(e['periods']);
                    niData.push(e['niValue']);
                    coData.push(e['coValue']);
                    mnData.push(e['mnValue']);
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

export default CycleComparison;

