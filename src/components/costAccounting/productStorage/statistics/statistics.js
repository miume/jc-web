import React from 'react';
import {Table} from "antd";
import Detail from './detail';

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.tableChange = this.tableChange.bind(this);
        this.pagination = {
            showSizeChanger: true,//是否可以改变 pageSize
            showTotal: (total) => `共${total}条记录`,//显示共几条记录
            pageSizeOptions: ["10", "20", "50", "100"]
        };
        this.columns = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            sorter: (a, b) => a.index - b.index,
            width: '5%'
        }, {
            title: '周期类型',
            key: 'periodName',
            dataIndex: 'periodName',
            width: '7%'
        }, {
            title: '期数',
            key: 'list.periods',
            dataIndex: 'list.periods',
            width: '7%'
        }, {
            title: '开始时间',
            key: 'head.startTime',
            dataIndex: 'head.startTime',
            width: '10%'
        }, {
            title: '结束时间',
            key: 'head.endTime',
            dataIndex: 'head.endTime',
            width: '10%'
        }, {
            title: '成品名称',
            key: 'list.productionTypeName',
            dataIndex: 'list.productionTypeName',
            width: '9%'
        }, {
            title: '产品类型',
            key: 'list.productionTypeCode',
            dataIndex: 'list.productionTypeCode',
            width: '9%'
        }, {
            title: '重量(T)',
            key: 'list.totals',
            dataIndex: 'list.totals',
            width: '9%'
        }, {
            title: 'Ni金属量(T)',
            key: 'list.niValue',
            dataIndex: 'list.niValue',
            width: '9%'
        }, {
            title: 'Co金属量(T)',
            key: 'list.coValue',
            dataIndex: 'list.coValue',
            width: '9%'
        }, {
            title: 'Mn金属量(T)',
            key: 'list.mnValue',
            dataIndex: 'list.mnValue',
            width: '9%'
        }, {
            title: '操作',
            key: 'list.code',
            dataIndex: 'list.code',
            width: '5%',
            render: (text) => {
                return (
                    <Detail code={text} url={this.props.url}/>
                )
            }
        }]
    }

    render() {
        let {data} = this.props;
        this.pagination.total =  (data && data.total) ? data.total : 0;
        return (
            <Table columns={this.columns} rowKey={record => record.list.code} pagination={this.pagination}
                   size={"small"} bordered dataSource={data} onChange={this.tableChange}/>
        )
    }

    tableChange(pagination) {
        this.props.getUnSubmittedData('',{},pagination);
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default Statistics
