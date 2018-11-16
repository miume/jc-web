import React from 'react';
import {Divider, Table} from 'antd';
import DetailSpan from './packDetailSpan';


class PackTable extends React.Component {
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'id',
        sorter: (a, b) => a.key - b.key,
        align:'center',
        width: '12%',
    },{
        title: '送样日期',
        dataIndex: 'a',
        key: 'a',
        align:'center',
        width: '8%',
    },{
        title: '送样人',
        dataIndex: 'b',
        key: 'b',
        align:'center',
        width: '8%',
    },{
        title: '送样工厂',
        dataIndex: 'c',
        key: 'c',
        align:'center',
        width: '8%',
    },{
        title: '批号',
        dataIndex: 'd',
        key: 'd',
        align:'center',
        width: '8%',
    },{
        title: '检测项目',
        dataIndex: 'e',
        key: 'e',
        align:'center',
        width: '8%',
    },{
        title: '异常备注',
        dataIndex: 'f',
        key: 'f',
        align:'center',
        width: '8%',
    },{
        title: '审核状态',
        dataIndex: 'h',
        key: 'h',
        align:'center',

        width: '8%',
    },{
        title: '接受反馈',
        dataIndex: 'i',
        key: 'i',
        align:'center',
        width: '8%',
    },{
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align:'center',
        width: '17%',
        render: (text,record) => {
            console.log("-----");
            console.log(record);
            // let operationFlag = this.judgeOperation(record.i);
            return (
                <span>
                    <DetailSpan
                        record={record}
                    />
                </span>
            )
        }
    }];
    render() {
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
                size="small"
                bordered
                scroll={{ y: 400 }}
            />
        )
    }
}

export default PackTable;