import React from 'react';
import BlockQuote from "../../../BlockQuote/blockquote";
import {Spin, message, Table, Tabs, Popconfirm, Select} from "antd";
import axios from 'axios';
import {getOperations,judgeOperation} from "../../../commom/getOperations";
import MonthView from "./monthView"
import YearView from "./yearView"
import MonthTable from "./monthTable"
import YearTable from "./yearTable"
import "./repoStatisticsFlow.css"


const { TabPane } = Tabs;
const {Option} = Select;
class RepoStatisticsFlow extends React.Component {
    componentDidMount = () => {
        this.getPreData();
        this.getMonthData(1);
    }
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
                    <Tabs defaultActiveKey='1' onChange={this.tabChange}>
                        <TabPane tab='月视图' key='1'>
                            <div className="repoStatisticsFlow_month_top">
                                <span>请选择月份：</span>
                                <Select
                                    className="repoStatisticsFlow_month_top_select"
                                    onChange={this.monthChange}
                                    value={this.state.month}
                                >
                                    {
                                        this.month?this.month.map(item => {
                                            return (
                                                <Option
                                                    key={item.code} value={item.code}
                                                >
                                                    {item.name}
                                                </Option>
                                            )
                                        }):null
                                    }
                                </Select>
                            </div>
                            <div className="repoStatisticsFlow_month_middle">
                                <MonthView
                                    monthOption={this.state.monthOption}
                                />
                            </div>
                            <div className="repoStatisticsFlow_month_bottom">
                                <MonthTable
                                    monthColumn={this.state.monthColumn}
                                    monthRow1={this.state.monthRow1}
                                    monthRow2={this.state.monthRow2}
                                    monthRow3={this.state.monthRow3}
                                />
                            </div>
                        </TabPane>
                        <TabPane tab='年视图' key='2'>
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
    getPreData = () => {
        var month = [];
        for (var i = 0; i < 12; i++) {
            month.push({
                code: i+1,
                name: `${i+1}月`
            })
        }
        this.month = month;

        var day = []
        for (var i = 0; i < 31; i++) {
            day.push(i+1)
        }
        this.day = day;

    }


    tabChange = (key) => {
        if (key==="1"){
            this.getMonthData(1);

        } else{
            this.getYearData();
        }

    }

    getYearData = () => {

        var yearColumn = ["月份"];
        var yearIndex = []
        for (var i = 0; i < 12 ; i++) {
            yearColumn.push(`${i+1}月`)
            yearIndex.push(`${i+1}月`)
        }
        var yearRow1 = ["进"];
        var yearRow2 = ["出"];
        var yearRow3 = ["存"];
        var yearIn = [];
        var yearOut = [];
        var yearSave = [];
        for (var i = 0; i < 12; i++) {
            yearRow1.push(i*100+i%3)
            yearRow2.push(i*100+i%4)
            yearRow3.push(i*100+i%2)
            yearIn.push(i*100+i%3)
            yearOut.push(i*100+i%4)
            yearSave.push(i*100+i%2)
        }

        const yearOption = {
            // color: ['#003366', '#006699', '#4cabce', '#e5323e'],
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

    /**获取 month 数据*/
    monthChange = (value,option) => {
        this.getMonthData(value);
    }
    getMonthData = (value) => {

        var monthColumn = ["日期"];
        for (var i = 0; i < 31 ; i++) {
            monthColumn.push(i+1)
        }
        var monthRow1 = ["进"];
        var monthRow2 = ["出"];
        var monthRow3 = ["存"];
        var monthIn = [];
        var monthOut = [];
        var monthSave = [];
        for (var i = 1; i < 32; i++) {
            monthRow1.push(i*100+i%3)
            monthRow2.push((i+1)*100+i%4)
            monthRow3.push((i-1)*100+i%2)

            monthIn.push(i*100+i%3)
            monthOut.push((i+1)*100+i%4)
            monthSave.push((i-1)*100+i%2)
        }
        

        /** 获取图数据 */

        const monthOption = {
            title: {
                text: '长远锂科智能仓库12月流量统计',
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
            month: value,

        })


        // this.setState({
        //     loading: true
        // });
        // axios({
        //     url: `${this.url.checkSite.page}`,
        //     method: 'get',
        //     headers: {
        //         'Authorization': this.url.Authorization
        //     },
        //     params
        // }).then(data => {
        //     let res = data.data.data;
        //     if(res && res.list) {
        //         this.pagination.total = res['total'] ? res['total'] : 0;
        //         for(let i = 0; i < res.list.length; i++) {
        //             res['list'][i]['index'] = (res['page'] - 1) * 10 + i + 1;
        //         }
        //         this.setState({
        //             dataSource: res.list
        //         })
        //     }
        //     this.setState({
        //         loading: false
        //     })
        // })
    }

    back = () => {
        this.props.history.push('/repoStatistics');
    }

}

export default RepoStatisticsFlow;
