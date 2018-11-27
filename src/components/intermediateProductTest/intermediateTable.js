import React from 'react';
import {Divider, Table} from 'antd';
import DetailSpan from './detailSpan';
import CheckSpan from './checkSpan';
import ReleaseSpan from './releaseSpan';

class InterTable extends React.Component{
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'id',
        sorter: (a, b) => a.key - b.key,
        align:'center',
        width: '5%',
    },{
        title: '送样日期',
        dataIndex: 'sampleDeliveringDate',
        key: 'sampleDeliveringDate',
        align:'center',
        width: '15%',
    },{
        title: '送检人',
        dataIndex: 'deliverer',
        key: 'deliverer',
        align:'center',
        width: '8%',
    },{
        title: '送检工厂(原材料)',
        dataIndex: 'deliveryFactory',
        key: 'deliveryFactory',
        align:'center',
        width: '8%',
    },{
        title: '批号',
        dataIndex: 'batchNumber',
        key: 'batchNumber',
        align:'center',
        width: '8%',
    },{
        title: '检测项目',
        dataIndex: 'testItems',
        key: 'testItems',
        align:'center',
        width: '8%',
    },{
        title: '异常备注',
        dataIndex: 'urgentComment',
        key: 'urgentComment',
        align:'center',
        width: '8%',
    },{
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        align:'center',
        width: '8%',
    },{
        title: '发布状态',
        dataIndex: 'h',
        key: 'h',
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
        width: '17%',
        render: (text,record) => {
            let detailSpanFlag = this.judgeDetailOperation(record.status);
            let checkSpanFlag = this.judgeCheckOperation(record.status);
            let releaseSpanFlag = this.judgeReleaseOperation(record.h,record.status);
            return (
                <span>
                    <DetailSpan
                        record={record}
                        disabled={detailSpanFlag}
                    />
                    <Divider type="vertical" />
                    <CheckSpan
                        record={record}
                        disabled={checkSpanFlag}
                    />
                    <Divider type="vertical" />
                    <ReleaseSpan
                        record={record}
                        disabled={releaseSpanFlag}
                    />
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
        );
    }
    /**判断详情，录检，发布可否功能 */
    judgeDetailOperation = (status) => {
        if(status==="未申请"){
            return true;
        }else{
            return false;
        }
    };
    judgeCheckOperation = (status) => {
        if(status==="未申请"||status==="不通过"){
            return false;
        }else{
            return true;
        }
    };
    judgeReleaseOperation = (h,status) => {
        if(h==="未发布"&&status==="已通过"){
            return false;
        }else{
            return true;
        }
    };
    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */

}

export default InterTable;