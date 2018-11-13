import React from 'react';
import { Table } from 'antd';

class InterTable extends React.Component{
    columns = [{
        title: '序号',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.key - b.key,
        align:'center',
        width: '12%',
    },{
        title: '送检人',
        dataIndex: 'a',
        key: 'a',
        align:'center',
        editable: 1,
        width: '8%',
    },{
        title: '送检工厂(原材料)',
        dataIndex: 'b',
        key: 'b',
        align:'center',
        editable: 1,
        width: '8%',
    },{
        title: '送检日期',
        dataIndex: 'c',
        key: 'c',
        align:'center',
        editable: 1,
        width: '8%',
    },{
        title: '批号',
        dataIndex: 'd',
        key: 'd',
        align:'center',
        editable: 1,
        width: '8%',
    },{
        title: '检测项目',
        dataIndex: 'e',
        key: 'e',
        align:'center',
        editable: 1,
        width: '8%',
    },{
        title: '紧急备注',
        dataIndex: 'f',
        key: 'f',
        align:'center',
        editable: 1,
        width: '8%',
    },{
        title: '接收反馈',
        dataIndex: 'h',
        key: 'h',
        align:'center',
        editable: 1,
        width: '8%',
    },{
        title: '状态',
        dataIndex: 'i',
        key: 'i',
        align:'center',
        editable: 1,
        width: '8%',
    },{
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align:'center',
        width: '17%',
    }];
    render() {
        return (
            <Table rowKey={record => record.id} dataSource={this.props.data} columns={this.columns} rowSelection={this.props.rowSelection} pagination={this.props.pagination} size="small" bordered  scroll={{ y: 400 }} />
        );
    }
}

export default InterTable;