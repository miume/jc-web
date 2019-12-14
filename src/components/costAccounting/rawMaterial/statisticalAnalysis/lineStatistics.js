import React from 'react';
import {Spin, Table} from "antd";
import axios from "axios";
import Search from "../../excipientStatistics/statisticalAnalysis/producuLineStatis/productLineSearch";

class LineStatistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.getFooter = this.getFooter.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.getDateRange = this.getDateRange.bind(this);
        this.periodsChange = this.periodsChange.bind(this);
        this.startTimeChange = this.startTimeChange.bind(this);
        this.columns = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            width: '7%'
        }, {
            title: '周期类型',
            key: 'periodType',
            dataIndex: 'periodType',
            width: '9%'
        }, {
            title: '期数',
            key: 'periodNum',
            dataIndex: 'periodNum',
            width: '7%'
        }, {
            title: '开始时间',
            key: 'startTime',
            dataIndex: 'startTime',
            width: '16%'
        }, {
            title: '结束时间',
            key: 'endTime',
            dataIndex: 'endTime',
            width: '16%'
        } , {
            title: '产线',
            key: 'productionLine',
            dataIndex: 'productionLine',
            width: '9%'
        }, {
            title: '小计(T)',
            key: 'totals',
            dataIndex: 'totals',
            width: '9%'
        }, {
            title: 'Ni(T)',
            key: 'niValue',
            dataIndex: 'niValue',
            width: '9%'
        }, {
            title: 'Co(T)',
            key: 'coValue',
            dataIndex: 'coValue',
            width: '9%'
        }, {
            title: 'Mn(T)',
            key: 'mnValue',
            dataIndex: 'mnValue',
            width: '9%'
        }]
    }

    render() {
        let {staticPeriod} = this.props, {loading,periodCode,dateRange,startTime,data} = this.state;
        return (
            <Spin spinning={loading} wrapperClassName='rightContent-Div'>
                <Search flag={true} staticPeriod={staticPeriod} periodCode={periodCode} periodsChange={this.periodsChange}
                        dateRange={dateRange} startTime={startTime} startTimeChange={this.startTimeChange}/>
                <div className={'clear'}></div>
                <Table rowKey={record => record.index} dataSource={data}
                       columns={this.columns} pagination={false}
                       size={"small"} bordered
                       footer={this.getFooter}/>
            </Spin>
        )
    }

    /**监控父组件periodCode的变化*/
    componentWillReceiveProps(nextProps, nextContext) {
        let {periodCode} = nextProps;
        if(periodCode) {
            this.setState({
                periodCode: periodCode
            });
            this.getDateRange(periodCode);
        }
    }

    /**根据统计周期code查询所有开始时间*/
    getDateRange(periodCode) {
        axios({
            url: `${this.props.url.rawMaterial.getDate}?periodId=${periodCode}`,
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
                    dateRange: [],
                    startTime: '',
                    data: [],
                    loading: false
                })
            }
        })
    }

    getTableData(params) {
        this.setState({
            loading: true
        });
        axios({
            url: `${this.props.url.rawMaterial.byLineStat}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params
        }).then((data) => {
            let res = data.data.data;
            if(res) {
                let {byLineTotals,lineStatDTOS} = res;
                for(let i = 0; i < lineStatDTOS.length; i++) {
                    lineStatDTOS[i]['index'] = i + 1;
                }
                this.setState({
                    data: lineStatDTOS,
                    total: byLineTotals,
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

    /**监控统计周期的变化*/
    periodsChange(value) {
        this.setState({
            periodCode: value
        });
        this.getDateRange(value);
    }

    getFooter() {
        let {total,data} = this.state;
        return (
            data && data.length ?
                <div className='excipient-statistics-detail-footer'>
                    <div>小计</div>
                    <div>{`重量：${total['totals']}`}</div>
                    <div>{`Ni金属量：${total['niValue']}`}</div>
                    <div>{`Co金属量：${total['coValue']}`}</div>
                    <div>{`Mn金属量：${total['mnValue']}`}</div>
                </div> : null
        )
    }


    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default LineStatistics;
