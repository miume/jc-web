import React,{Component} from 'react'
import {Table, Spin} from 'antd'
import Search from '../producuLineStatis/productLineSearch'
import axios from "axios";
class ProductLineStatis extends Component{//产品线统计
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
        this.getTableData = this.getTableData.bind(this);
        this.getDateRange = this.getDateRange.bind(this);
        this.periodsChange = this.periodsChange.bind(this);
        this.startTimeChange = this.startTimeChange.bind(this);
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index'
        }, {
            title: '周期类型',
            dataIndex: 'periodName',
            key: 'periodName'
        }, {
            title: '期数',
            dataIndex: 'head.periods',
            key: 'head.periods'
        }, {
            title: '开始时间',
            dataIndex: 'head.startTime',
            key: 'head.startTime'
        }, {
            title: '结束时间',
            dataIndex: 'head.endTime',
            key: 'head.endTime'
        }, {
            title: '产线',
            dataIndex: 'lineName',
            key: 'lineName'
        }, {
            title: '小计(m³)',
            dataIndex: 'process.totals',
            key: 'process.totals'
        }, {
            title: '氨量(T)',
            dataIndex: 'process.ammoniaValue',
            key: 'process.ammoniaValue'
        }, {
            title: '碱量(T)',
            dataIndex: 'process.alkaliValue',
            key: 'process.alkaliValue'
        }];
    }

    render() {
        let {staticPeriod} = this.props, {loading,periodCode,dateRange,startTime,data} = this.state;
        return(
            <Spin spinning={loading} wrapperClassName='rightContent-Div'>
                <Search flag={true} staticPeriod={staticPeriod} periodCode={periodCode} periodsChange={this.periodsChange}
                        dateRange={dateRange} startTime={startTime} startTimeChange={this.startTimeChange}/>
                <div className='clear'></div>
                <Table
                    rowKey={record => record.process.code}
                    columns={this.columns}
                    dataSource={data}
                    size='small'
                    bordered
                    pagination={false}
                />
            </Spin>
        );
    }

    componentDidMount() {
        let {periodCode} = this.props;
        if(periodCode) {
            this.setState({
                periodCode: periodCode
            });
            this.getDateRange(periodCode);
        }
    }

    getDateRange(periodCode) {
        axios({
            url: `${this.props.url.auxiliary.getDate}?periodCode=${periodCode}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then((data) => {
            let res = data.data.data;
            if(res && res.length) {
                this.setState({
                    dateRange: res,
                    startTime: res[0]
                });
                this.getTableData({
                    startTime: res[0],
                    periodCode: periodCode
                })
            } else {
                this.setState({
                    startTime: '',
                    data: []
                })
            }
        })
    }

    getTableData(params) {
        this.setState({
            loading: true
        });
        axios({
            url: `${this.props.url.auxiliary.stasticByLine}`,
            method: 'post',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            data: params
        }).then((data) => {
            let res = data.data.data;
            if(res) {
                for(let i = 0; i < res.length; i++) {
                    res[i]['index'] = i + 1;
                }
                this.setState({
                    data: res,
                    loading: false
                })
            } else {
                this.setState({
                    data: [],
                    loading: false
                })
            }
        });

    }

    /**监控开始时间的变化*/
    startTimeChange(value) {
        this.setState({
            startTime: value
        });
        this.getTableData({
            startTime: value,
            periodCode: this.state.periodCode
        })
    }

    periodsChange(value) {
        this.setState({
            periodCode: value
        });
        this.getDateRange(value);
    }
}
export default ProductLineStatis;
