/**
 * 周期对比曲线
 * */
import React from 'react';
import {Spin} from "antd";
import axios from 'axios';
import ReactEcharts from 'echarts-for-react';
import Search from "../../productStorage/statisticalAnalysis/productComparsion/compareSearch";

class ProductionLineComparison extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
        this.getOption = this.getOption.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.precursorProductionLine = this.precursorProductionLine.bind(this);
        this.columns = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            width: '10%'
        }, {
            title: '周期类型',
            key: 'periodName',
            dataIndex: 'periodName',
            width: '10%'
        }, {
            title: '期数',
            key: 'periods',
            dataIndex: 'periods',
            width: '10%'
        }, {
            title: '开始时间',
            key: 'startTime',
            dataIndex: 'startTime',
            width: '10%'
        }, {
            title: '结束时间',
            key: 'endTime',
            dataIndex: 'endTime',
            width: '10%'
        } , {
            title: '产线',
            key: 'lineName',
            dataIndex: 'lineName',
            width: '10%'
        }, {
            title: '小计(T)',
            key: 'totals',
            dataIndex: 'totals',
            width: '10%'
        }, {
            title: 'Ni(T)',
            key: 'NiMetallicity',
            dataIndex: 'NiMetallicity',
            width: '10%'
        }, {
            title: 'Co(T)',
            key: 'CoMetallicity',
            dataIndex: 'CoMetallicity',
            width: '10%'
        }, {
            title: 'Mn(T)',
            key: 'MnMetallicity',
            dataIndex: 'MnMetallicity',
            width: '10%'
        }]
    }

    render() {
        let {staticPeriod} = this.props, {productionLineData,xData,niData,coData,mnData,loading} = this.state;
        return (
            <Spin spinning={loading}>
                <Search flag={true} staticPeriod={staticPeriod} url={this.props.url}
                        productionLineData={productionLineData} search={this.getTableData}/>
                <div className='clear'></div>
                <div className={'raw-material-canvas'}>
                    <ReactEcharts option={this.getOption(xData,niData,coData,mnData)}
                                  style={{width: '100%'}}/>
                </div>
            </Spin>
        )
    }
    componentDidMount() {
        this.precursorProductionLine();
    }

    precursorProductionLine() {
        axios({
            url: `${this.props.url.precursorProductionLine.all}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then((data) => {
            let res = data.data.data;
            if(res && res.length) {
                this.setState({
                    productionLineData: res
                });
            }
        })
    }

    getTableData(params,lineId) {
        this.setState({
            loading: true
        });
        let {periodCode,lineName} = params;
        axios({
            url: `${this.props.url.rawMaterial.lineCompare}?periodNum=${lineName}&periodCode=${periodCode}`,
            method: 'post',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            data: lineId
        }).then((data) => {
            let res = data.data.data, xData = [], niData = [], coData = [], mnData = [];
            if(res && res.length) {
                for(let i = 0; i < res.length; i++) {
                    let e = res[i];
                    xData.push(e['lineName']);
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
                            name: '产线',
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

export default ProductionLineComparison;

