import React from 'react';
import {Divider, Table} from 'antd';
import DetailSpan from './detailSpan';
import EditSpan from './editSpan';
import DeletaSpan from './deleteSpan';

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
        render: (text,record) => {
            console.log("-----")
            console.log(record);
            return (
                <span>
                    <DetailSpan />
                    <Divider type="vertical" />
                    <EditSpan />
                    <Divider type="vertical" />
                    <DeletaSpan record={record}/>
                </span>
            )
        }
    }];
    render() {
        //  获取record的记录
        const columns = this.columns.map((col) => {
            return {
                ...col,
                onCell: record => ({
                    record,
                    // editable: col.editable,
                    // dataIndex: col.dataIndex,
                    // title: col.title,
                    // handleSave: this.handleSave,
                }),
            };
        });
        return (
            <Table rowKey={record => record.id} dataSource={this.props.data} columns={columns} rowSelection={this.props.rowSelection} pagination={this.props.pagination} size="small" bordered  scroll={{ y: 400 }} />
        );
    }
}

export default InterTable;