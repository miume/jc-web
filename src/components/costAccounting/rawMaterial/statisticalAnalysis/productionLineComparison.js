/**
 * 周期对比曲线
 * */
import React from 'react';
import {DatePicker, Select, Table} from "antd";
import NewButton from "../../../BlockQuote/newButton";
import moment from "moment";
import axios from 'axios';

const {Option} = Select;
const {RangePicker} = DatePicker;

class ProductionLineComparison extends React.Component {
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
            dateFormat: 'YYYY-MM-DD'
        };
        this.search = this.search.bind(this);
        this.getFooter = this.getFooter.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getProductionLine = this.getProductionLine.bind(this);
        this.columns = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            sorter: (a,b) => a.code - b.code,
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
            key: 'start',
            dataIndex: 'start',
            width: '10%'
        }, {
            title: '结束时间',
            key: 'end',
            dataIndex: 'end',
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
                        <Option value={1}>产线1</Option>
                        <Option value={2}>产线2</Option>
                        <Option value={3}>产线3</Option>
                    </Select>
                    <RangePicker placeholder={["开始日期","结束日期"]}  onChange={this.onChange}
                                 className={'raw-material-date'} style={{marginRight: 10}}
                                 value={value}
                                 format={dateFormat}
                    />
                    <NewButton name={'查询'} className={'fa fa-search'} handleClick={this.search}/>
                </div>
                <div className={'clear'}></div>
            </div>
        )
    }

    /**获取所有产品线*/
    getProductionLine() {
        axios.get(`${this.props.url.precursorProductionLine.all}`,)
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

export default ProductionLineComparison;

