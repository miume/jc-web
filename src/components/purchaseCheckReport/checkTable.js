import React from 'react';
import {Divider, Table} from 'antd';
import CheckEditSpan from './checkEditSpan';
import CheckDetailSpan from './checkDetailSpan';
import DeletaSpan from './deleteSpan';

class CheckTable extends React.Component {
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'id',
        sorter: (a, b) => a.key - b.key,
        align:'center',
        width: '6%',
    },{
        title: '批号',
        dataIndex: 'a',
        key: 'a',
        align:'center',
        width: '6%',
    },{
        title: '原材料',
        dataIndex: 'b',
        key: 'b',
        align:'center',
        width: '6%',
    },{
        title: '生产厂家',
        dataIndex: 'c',
        key: 'c',
        align:'center',
        width: '6%',
    },{
        title: '到货日期',
        dataIndex: 'd',
        key: 'd',
        align:'center',
        width: '6%',
    },{
        title: '创建人',
        dataIndex: 'e',
        key: 'e',
        align:'center',
        width: '6%',
    },{
        title: '创建日期',
        dataIndex: 'f',
        key: 'f',
        align:'center',
        width: '6%',
    },{
        title: '修改人',
        dataIndex: 'h',
        key: 'h',
        align:'center',
        width: '6%',
    },{
        title: '修改日期',
        dataIndex: 'i',
        key: 'i',
        align:'center',
        width: '6%',
    },{
        title: '类型',
        dataIndex: 'j',
        key: 'j',
        align:'center',
        width: '6%',
    },{
        title: '审核状态',
        dataIndex: 'k',
        key: 'k',
        align:'center',
        width: '6%',
    },{
        title: '紧急',
        dataIndex: 'l',
        key: 'l',
        align:'center',
        width: '6%',
    },{
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align:'center',
        width: '25%',
        render: (text,record) => {
            let operationFlag = this.judgeOperation(record.i);
            return (
                <span>
                    <CheckEditSpan
                        disabled={operationFlag}
                    />
                    <Divider type="vertical" />
                    <CheckDetailSpan />
                    <Divider type="vertical" />
                    <DeletaSpan
                        record={record}
                        handleDelete={this.handleDelete.bind(this)}
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
                scroll={{ x: 1500}}
            />
        )
    }
    /**判断编辑可否功能 */
    judgeOperation = (record) => {
        if(record==="不通过"){
            return false;
        }else{
            return true;
        }
    };
    /**---------------------- */
    /**单条记录删除 */
    handleDelete = (key) => {
        // const dataSource = this.state.dataSource;
        // this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };
    /**---------------------- */

}
export default CheckTable;