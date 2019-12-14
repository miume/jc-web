import React,{Component} from 'react'
import {Spin,Table} from 'antd';
import axios from 'axios';
import Search from '../../../excipientStatistics/statisticalAnalysis/producuLineStatis/productLineSearch';

class ProductLineStatis extends Component{//产品线统计
    constructor(props){
        super(props);
        this.state = {
            loading:false
        };
        this.getFooter = this.getFooter.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.getDateRange = this.getDateRange.bind(this);
        this.periodsChange = this.periodsChange.bind(this);
        this.startTimeChange = this.startTimeChange.bind(this);
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index'
        },{
            title:'周期类型',
            dataIndex:'periodName',
            key:'periodName'
        },{
            title:'期数',
            dataIndex:'head.lineName',
            key:'head.lineName'
        },{
            title:'开始时间',
            dataIndex:'head.startTime',
            key:'head.startTime'
        },{
            title:'结束时间',
            dataIndex:'head.endTime',
            key:'head.endTime'
        },{
            title:'产线',
            dataIndex:'lName',
            key:'lName'
        },{
            title:'小计(T)',
            dataIndex:'lineDetail.totals',
            key:'lineDetail.totals'
        },{
            title:'Ni(T)',
            dataIndex:'lineDetail.niValue',
            key:'Ni'
        },{
            title:'Co(T)',
            dataIndex:'lineDetail.coValue',
            key:'Co'
        },{
            title:'Mn(T)',
            dataIndex:'lineDetail.mnValue',
            key:'Mn'
        }]
    }
    render() {
        let {staticPeriod} = this.props, {loading,periodCode,dateRange,startTime,data} = this.state;
        return(
            <Spin spinning={loading} wrapperClassName='rightContent-Div'>
                <Search flag={true} staticPeriod={staticPeriod} periodCode={periodCode} periodsChange={this.periodsChange}
                        dateRange={dateRange} startTime={startTime} startTimeChange={this.startTimeChange}/>
                <div className='clear'></div>
                <Table
                    dataSource={data}
                    columns={this.columns}
                    rowKey={record => record.lineDetail.code}
                    size='small'
                    bordered
                    footer={this.getFooter}
                    pagination={false}
                />
            </Spin>
        );
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
            url: `${this.props.url.productStorage.getDate}?periodId=${periodCode}`,
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
            url: `${this.props.url.productStorage.stasticByLine}`,
            method: 'post',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            data: params
        }).then((data) => {
            let res = data.data.data;
            if(res) {
                let {list,total} = res;
                for(let i = 0; i < list.length; i++) {
                    list[i]['index'] = i + 1;
                }
                this.setState({
                    data: list,
                    total: total,
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
export default ProductLineStatis;
