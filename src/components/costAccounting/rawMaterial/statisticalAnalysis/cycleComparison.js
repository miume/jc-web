/**
 * 周期对比曲线
 * */
import React from 'react';
import {DatePicker, Select} from "antd";
import ReactEcharts from 'echarts-for-react';
import NewButton from "../../../BlockQuote/newButton";
import moment from "moment";
import axios from 'axios';

const {Option} = Select;
const {RangePicker} = DatePicker;

class CycleComparison extends React.Component {
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    componentDidMount() {
        this.getProductionLine();
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            periodCode: 1,  //记录下拉框-周期类型编码
            start: '',      //记录事件组件的value值
            dateFormat: 'YYYY-MM-DD',
            productionLine: []
        };
        this.search = this.search.bind(this);
        this.getOption = this.getOption.bind(this);
        this.getFooter = this.getFooter.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getProductionLine = this.getProductionLine.bind(this);
    }
    render() {
        const {start, end, dateFormat} = this.state;
        const value = start === undefined || end === undefined || start === "" || end === "" ? null : [moment(start, dateFormat), moment(end, dateFormat)];
        return (
            <div className='staticalAnalysis'>
                <div style={{float:'right'}}>
                    <Select className={'raw-material-select'}
                            style={{marginRight: 10}} value={this.state.periodCode} onChange={this.selectChange}>
                        <Option value={1}>周</Option>
                        <Option value={2}>月</Option>
                        <Option value={3}>年</Option>
                    </Select>
                    <Select className={'raw-material-select'}
                            style={{marginRight: 10}} value={this.state.lineCode} onChange={this.selectChange}>
                        {
                            this.state.productionLine.map(e =>  (
                                <Option key={e.code} value={e.code}>{e.name}</Option>
                            ))
                        }
                    </Select>
                    <RangePicker placeholder={["开始日期","结束日期"]}  onChange={this.onChange}
                                 className={'raw-material-date'} style={{marginRight: 10}}
                                 value={value}
                                 format={dateFormat}
                    />
                    <NewButton name={'查询'} className={'fa fa-search'} handleClick={this.search}/>
                </div>
                <div className={'clear'}></div>
                <ReactEcharts option={this.getOption()} />
            </div>
        )
    }

    /**图表*/
    getOption() {
        var labelOption = {
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
        };
        return (
            {
                color: ['#003366', '#006699', '#4cabce', '#e5323e'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['Forest', 'Steppe', 'Desert', 'Wetland']
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {show: false},
                        data: ['2012', '2013', '2014', '2015', '2016']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'Forest',
                        type: 'bar',
                        barGap: 0,
                        label: labelOption,
                        data: [320, 332, 301, 334, 390]
                    },
                    {
                        name: 'Steppe',
                        type: 'bar',
                        label: labelOption,
                        data: [220, 182, 191, 234, 290]
                    },
                    {
                        name: 'Desert',
                        type: 'bar',
                        label: labelOption,
                        data: [150, 232, 201, 154, 190]
                    },
                    {
                        name: 'Wetland',
                        type: 'bar',
                        label: labelOption,
                        data: [98, 77, 101, 99, 40]
                    }
                ]
            }
        )
    }

    /**获取所有产品线*/
    getProductionLine() {
        axios.get(`${this.props.url.precursorProductionLine.all}`,{}, {
            headers:{
                'Authorization':this.props.url.Authorization,
            },
        }).then(data => {
            let res = data.data.data;
            if(res && res.length) {
                this.setState({
                    productionLine: res
                })
            }
        })
    }

    /**切换分页*/
    getFooter(data) {
        return (
            <div className='raw-material-line-footer'>
                <div>总计</div>
                <div className='raw-material-line-footer'>
                    <div className='raw-material-line-footer-div'>{`重量：100T`}</div>
                    <div className='raw-material-line-footer-div'>{`Ni金属量：5T`}</div>
                    <div className='raw-material-line-footer-div'>{`Co金属量：5T`}</div>
                    <div className='raw-material-line-footer-div'>{`Mn金属量：5T`}</div>
                </div>
            </div>
        )
    }

    /**监控下拉框的变化*/
    selectChange(value) {
        console.log('select=',value)
        this.setState({
            periodCode: value
        })
    }

    /**date时间范围变化监控*/
    onChange(date, dateString) {
        console.log(dateString)
        this.setState({
            start: dateString[0],
            end: dateString[1]
        })
    }

    /**根据周期类型和开始事件进行搜索*/
    search() {
        let {start, end, periodCode} = this.state;
        console.log(start, end, periodCode)
    }
}

export default CycleComparison;

