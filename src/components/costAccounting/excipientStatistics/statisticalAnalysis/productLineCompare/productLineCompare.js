import React,{Component} from 'react'
import Search from './compareSearch'
import ReactEcharts from 'echarts-for-react';
import axios from "axios";
class ProductLineCompare extends Component{//工序对比分析
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
        this.precursorProductionLine = this.precursorProductionLine.bind(this);
    }

    render() {
        let {staticPeriod} = this.props, {productionLineData,xData,alkData,ammData} = this.state;
        return (
            <div>
                <Search flag={true} staticPeriod={staticPeriod}
                        productionLineData={productionLineData} search={this.getTableData}/>
                <div className='clear'></div>
                <div className={'raw-material-canvas'}>
                    <ReactEcharts option={this.getOption(xData,alkData,ammData)}
                                  style={{width: '100%',height:'80%'}}/>
                </div>
            </div>
        );
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
        axios({
            url: `${this.props.url.auxiliary.lineCur}?lineId=${lineId}`,
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
                ammData
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
                            name: '含量（kg）',
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
export default ProductLineCompare
