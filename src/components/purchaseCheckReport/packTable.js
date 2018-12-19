import React from 'react';
import {Table} from 'antd';
import DetailSpan from './packDetailSpan';

class PackTable extends React.Component {
    Authorization;
    server;
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'id',
        sorter: (a, b) => a.id - b.id,
        align:'center',
        width: '8%',
    },{
        title: '送检日期',
        dataIndex: 'sampleDeliveringDate',
        key: 'sampleDeliveringDate',
        align:'center',
        width: '15%',
    },{
        title: '送样人',
        dataIndex: 'deliverer',
        key: 'deliverer',
        align:'center',
        width: '8%',
    },{
        title: '送样工厂',
        dataIndex: 'deliveryFactory',
        key: 'deliveryFactory',
        align:'center',
        width: '8%',
    },{
        title: '编号',
        dataIndex: 'serialNumberd',
        key: 'serialNumberd',
        align:'center',
        width: '8%',
    },{
        title: '检测项目',
        dataIndex: 'testItem',
        key: 'testItem',
        align:'center',
        width: '8%',
    },{
        title: '异常备注',
        dataIndex: 'exceptionComment',
        key: 'exceptionCommentf',
        align:'center',
        width: '8%',
    },{
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        align:'center',
        width: '8%',
    },{
        title: '接受反馈',
        dataIndex: 'acceptStatus',
        key: 'acceptStatus',
        align:'center',
        width: '8%',
    },{
        title: '审核状态',
        dataIndex: 'status',
        key: 'status',
        align:'center',

        width: '8%',
    },{
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align:'center',
        width: '8%',
        render: (text,record) => {
            // let operationFlag = this.judgeOperation(record.i);
            return (
                <span>
                    <DetailSpan
                        record={record}
                        modifySelectedRowKeysData={this.props.modifySelectedRowKeysData}
                    />
                </span>
            )
        }
    }];
    render() {
        this.Authorization = localStorage.getItem('Authorization');
        this.server = localStorage.getItem('remote');
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
        return(
            <Table
                rowKey={record => record.id}
                dataSource={this.props.data}
                columns={columns}
                rowSelection={this.props.rowSelection}
                pagination={this.props.pagination}
                size="small"
                bordered
                scroll={{ y: 400 }}
            />
        )
    }
}

export default PackTable;