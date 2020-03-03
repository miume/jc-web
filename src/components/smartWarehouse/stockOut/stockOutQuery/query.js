import React from 'react';
import Search from "./search";
import {Spin, Table} from "antd";
import Detail from "./detail";
import axios from 'axios';

class Query extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
        // this.reset = this.reset.bind(this);
        this.search = this.search.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.pagination = {
            pageSize: 10,
            current: 1,
            showSizeChanger: true,//是否可以改变 pageSize
            showTotal: (total) => `共${total}条记录`,//显示共几条记录
            pageSizeOptions: ["10", "20", "50", "100"]
        };
        this.columns = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            width: '10%'
        },{
            title: '出库单号',
            key: 'head.id',
            dataIndex: 'head.id',
            width: '15%'
        },{
            title: '出库日期',
            key: 'head.createdTime',
            dataIndex: 'head.createdTime',
            width: '15%'
        },{
            title: '出库状态',
            key: 'status',
            dataIndex: 'status',
            width: '10%'
        },{
            title: '使用产线',
            key: 'line',
            dataIndex: 'line',
            width: '10%'
        },{
            title: '出库类别',
            key: 'outType.deliveryTypeName',
            dataIndex: 'outType.deliveryTypeName',
            width: '15%'
        },{
            title: '出库点',
            key: 'address.deliveryAddressName',
            dataIndex: 'address.deliveryAddressName',
            width: '15%'
        },{
            title: '操作',
            key: 'head',
            dataIndex: 'head',
            render: (text) => {
                return <Detail id={text.id} url={this.props.url} type={this.props.type}/>
            }
        }]
    }

    render() {
        let {url,supplierData} = this.props, {data,loading} = this.state;
        return (
            <Spin spinning={loading} wrapperClassName={'rightDiv-content'}>
                <Search search={this.search} reset={this.reset} url={url} supplierData={supplierData}/>
                <div>
                    <Table columns={this.columns} pagination={this.pagination} dataSource={data}
                           bordered size={'small'} rowKey={record => record.head.id} onChange={this.handleTableChange}/>
                </div>
            </Spin>
        )
    }

    componentDidMount() {
        this.getTableData({
            date: '',
            deptCode: ''
        })
    }

    getTableData(params) {
        let {pageSize,current} = this.pagination, {type} = this.props,
            data = {
                current: current,
                size: pageSize
            };
        this.setState({
            loading: true
        });
        axios({
            url: `${this.props.url[type]}/page`,
            method: 'post',
            params,
            data
        }).then(data => {
            let res = data.data.data, records = res ? res['records'] : [];
            this.pagination.total = res.total ? res.total : 0;
            for(let i = 0; i < records.length; i++) {
                records[i]['index'] = (res['current'] - 1) * 10 + i + 1;
            }
            this.setState({
                data: records,
                loading: false
            })
        })
    }

    handleTableChange(pagination) {
        this.pagination = pagination;
        let {deptCode,date} = this.state;
        this.getTableData({
            deptCode,
            date
        })
    }

    search(params) {
        let {deptCode,date} = params;
        this.setState({
            deptCode,
            date
        });
        this.pagination.current = 1;
        this.getTableData(params);
    }
}

export default Query;
