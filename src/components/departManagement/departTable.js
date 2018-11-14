import React from 'react';
import { Table, Input, InputNumber, Popconfirm, Form } from 'antd';// import DetailSpan from './detailSpan';
// import EditSpan from './editSpan';
import DeletaSpan from './deleteSpan';

class DepartTable extends React.Component {
    columns = [{
        title: '序号',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.key - b.key,
        align:'center',
        width: '20%',
    },{
        title: '部门名称',
        dataIndex: 'departmentName',
        key: 'departmentName',
        align:'center',
        editable: 1,
        width: '25%',
    },{
        title: '描述',
        dataIndex: 'extraInfo',
        key: 'extraInfo',
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
                    <DeletaSpan record={record}/>
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
    /**实现全选功能 */

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
export default DepartTable;