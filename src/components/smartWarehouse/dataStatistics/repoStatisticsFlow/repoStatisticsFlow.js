import React from 'react';
import BlockQuote from "../../../BlockQuote/blockquote";
import {Spin, Tabs, DatePicker} from "antd";
import axios from 'axios';
import {getOperations,judgeOperation} from "../../../commom/getOperations";
import MonthView from "./monthView"
import YearView from "./yearView"
import MonthTable from "./monthTable"
import YearTable from "./yearTable"
import "./repoStatisticsFlow.css"
import moment from "moment";


const { TabPane } = Tabs;
const { MonthPicker } = DatePicker;

class RepoStatisticsFlow extends React.Component {
    componentWillUnmount = () => {
        this.setState(() => {
            return;
        })
    }
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            searchContent: '',
            yearDataSource:[],
            tabKey:'1',
            dateString:"",
            // yearString:"",

            month:1,
            monthColumn:[],
            monthRow1:[],
            monthRow2:[],
            monthRow3:[],
            monthOption: {},

            yearColumn:[],
            yearRow1:[],
            yearRow2:[],
            yearRow3:[],
            yearOption: {},

            isopen: false,
            yearString: null

        };
        this.operations = [];
        this.month = [];
        this.day = [];
    }

    render() {
        this.current = JSON.parse(localStorage.getItem('dataEntry'));
        this.url = JSON.parse(localStorage.getItem('url'));
        return (
            <div>
                <BlockQuote name={this.current.menuName} menu={this.current.menuParent} menu2='返回' returnDataEntry={this.back}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <Tabs defaultActiveKey='1'>
                        <TabPane tab='月视图' key='1'>
                            <div className="repoStatisticsFlow_month_top">
                                <MonthPicker onChange={this.selectChange} value={this.state.dateString ? moment(this.state.dateString) : null} placeholder="请选择统计月份" />
                            </div>
                            <div className="repoStatisticsFlow_month_middle">
                                <MonthView
                                    key="monthView"
                                    monthOption={this.state.monthOption}
                                />
                            </div>
                            <div className="repoStatisticsFlow_month_bottom">
                                <MonthTable
                                    key="monthTable"
                                    monthColumn={this.state.monthColumn}
                                    monthRow1={this.state.monthRow1}
                                    monthRow2={this.state.monthRow2}
                                    monthRow3={this.state.monthRow3}
                                />
                            </div>
                        </TabPane>
                        <TabPane tab='年视图' key='2'>
                            <div>
                                <DatePicker
                                    value={this.state.yearString}
                                    open={this.state.isopen}
                                    mode="year"
                                    placeholder="请选择年份"
                                    format="YYYY"
                                    onOpenChange={(status) => {
                                        if(status){
                                            this.setState({isopen: true})
                                        } else {
                                            this.setState({isopen: false})
                                        }
                                    }}
                                    onPanelChange={this.selectYearChange}
                                />
                            </div>
                            <YearView
                                yearOption={this.state.yearOption}
                            />
                            <YearTable
                                yearColumn={this.state.yearColumn}
                                yearRow1={this.state.yearRow1}
                                yearRow2={this.state.yearRow2}
                                yearRow3={this.state.yearRow3}
                            />
                        </TabPane>
                    </Tabs>
                </Spin>
            </div>
        );
    }
    selectYearChange = (v) => {
        const year = new Date(v.toString()).getFullYear()
        this.getYearData(year)
        this.setState({
            yearString: v,
            isopen: false
        })
    }
    selectChange = (date, dateString) => {
        this.getMonthData(dateString);
        this.setState({
            dateString:dateString
        });
    }

    getYearData = (value) => {
        this.setState({
            loading: false
        });
        axios({
            url: `${this.url.repoStatisticsFlow.yearView}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params:{
                year:parseInt(value),
            }
        }).then(data => {
            let res = data.data.data;
            if(res) {
                var yearColumn = ["月份"];
                var yearIndex = []
                var yearRow1 = ["进"];
                var yearRow2 = ["出"];
                var yearRow3 = ["存"];
                var yearIn = [];
                var yearOut = [];
                var yearSave = [];
                for (var i = 0; i < res.length ; i++) {
                    const date = res[i].date.split("-");
                    yearColumn.push(`${parseInt(date[1])}月`)
                    yearIndex.push(`${parseInt(date[1])}月`)
                    yearRow1.push(res[i].in)
                    yearRow2.push(res[i].out)
                    yearRow3.push(res[i].store)
                    yearIn.push(res[i].in)
                    yearOut.push(res[i].out)
                    yearSave.push(res[i].store)
                }


                const yearOption = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['进', '出', '存']
                    },
                    xAxis: [
                        {
                            type: 'category',
                            axisTick: {show: false},
                            data: yearIndex
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '进',
                            type: 'bar',
                            barGap: 0,
                            data: yearIn
                        },
                        {
                            name: '出',
                            type: 'bar',
                            data: yearOut
                        },
                        {
                            name: '存',
                            type: 'bar',
                            data: yearSave
                        }
                    ]
                }

                this.setState({
                    yearColumn:yearColumn,
                    yearRow1:yearRow1,
                    yearRow2:yearRow2,
                    yearRow3:yearRow3,
                    yearOption: yearOption
                })
            }
            this.setState({
                loading: false
            })
        })


    }

    /**获取 month 数据*/
    getMonthData = (value) => {
        this.setState({
            loading: true
        });
        axios({
            url: `${this.url.repoStatisticsFlow.monthView}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params:{
                year:value?parseInt(value.split("-")[0]):undefined,
                month:value?parseInt(value.split("-")[1]):undefined
            }
        }).then(data => {
            let res = data.data.data;
            if(res) {
                var monthColumn = ["日期"];
                var monthRow1 = ["进"];
                var monthRow2 = ["出"];
                var monthRow3 = ["存"];
                var monthIn = [];
                var monthOut = [];
                var monthSave = [];
                for (var i = 0; i < res.length ; i++) {
                    const date = res[i].date.split("-");
                    monthColumn.push(parseInt(date[2]));
                    monthRow1.push(res[i].in)
                    monthRow2.push(res[i].out)
                    monthRow3.push(res[i].store)
                    monthIn.push(res[i].in)
                    monthOut.push(res[i].out)
                    monthSave.push(res[i].store)
                }
                /** 获取图数据 */

                const monthOption = {
                    title: {
                        text: `长远锂科智能仓库${value.split("-")[1]}月流量统计`,
                        left: 'center',
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        bottom: 10,
                        left: 'center',
                        data: ['进', '出', '存']
                    },
                    grid: {
                        bottom: 70
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.day
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '进',
                            type: 'line',
                            data: monthIn
                        },
                        {
                            name: '出',
                            type: 'line',
                            data: monthOut
                        },
                        {
                            name: '存',
                            type: 'line',
                            data: monthSave
                        }
                    ]
                };

                this.setState({
                    monthOption: monthOption,
                    monthColumn:monthColumn,
                    monthRow1:monthRow1,
                    monthRow2:monthRow2,
                    monthRow3:monthRow3,
                    // month: value,

                })
            }
            this.setState({
                loading: false
            })
        })

    }

    back = () => {
        this.props.history.push('/repoStatistics');
    }

}

export default RepoStatisticsFlow;
