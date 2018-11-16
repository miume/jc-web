import React from 'react';
import { Table } from 'antd';
// import EditSpan from './editSpan';
import DeletaSpan from './deleteSpan';


class OperationTable extends React.Component {
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'id',
        sorter: (a, b) => a.key - b.key,
        align:'center',
        width: '20%',
    },{
        title: '操作名称',
        dataIndex: 'operationName',
        key: 'operationName',
        align:'center',
        editable: 1,
        width: '25%',
    },{
        title: '描述',
        dataIndex: 'operationCode',
        key: 'operationCode',
        align:'center',
        editable: 1,
        width: '25%',
    },{
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align:'center',
        width: '25%',
        render: (text,record) => {
            return (
                <span>
                    <DeletaSpan
                        record={record}
                        getFetch={this.getFetch.bind(this)}
                    />
                </span>
            )
        }
    }];
    render(){
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
            <Table
                rowKey={record => record.id}
                dataSource={this.props.data}
                columns={columns}
                rowSelection={this.props.rowSelection}
                pagination={this.props.pagination}
                handleTableChange={this.props.handleTableChange}
                size="small"
                bordered
                scroll={{ y: 400 }}
            />
        );
        //useFixedHeader 用来固定表头（需要指定 column 的 width 属性，否则列头和内容可能不对齐）
    };
    /**实现初始化页面功能 */
    getFetch = () => {
        this.props.fetch();
    };
    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */
}
export default OperationTable;