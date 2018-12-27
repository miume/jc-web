import React from 'react';
import {Table} from 'antd';
import CheckReleaseSpan from './checkReleaseSpan';


class ReleaseTable extends React.Component {
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        sorter: (a, b) => a.index - b.index,
        align:'center',
        width: '5%',
    },{
        title: '批号',
        dataIndex: 'commonBatchNumberDTO.commonBatchNumber.batchNumber',
        key: 'commonBatchNumberDTO.commonBatchNumber.batchNumber',
        align:'center',
        width: '6%',
    },{
        title: '原材料',
        dataIndex: 'sampleDeliveringRecordDTO.repoBaseSerialNumber.materialName',
        key: 'sampleDeliveringRecordDTO.repoBaseSerialNumber.materialName',
        align:'center',
        width: '6%',
    },{
        title: '生产厂家',
        dataIndex: 'sampleDeliveringRecordDTO.repoBaseSerialNumber.manufacturerName',
        key: 'sampleDeliveringRecordDTO.repoBaseSerialNumber.manufacturerName',
        align:'center',
        width: '6%',
    },{
        title: '到货日期',
        dataIndex: 'sampleDeliveringRecordDTO.sampleDeliveringRecord.sampleDeliveringDate',
        key: 'sampleDeliveringRecordDTO.sampleDeliveringRecord.sampleDeliveringDate',
        align:'center',
        width: '12%',
    },{
        title: '创建人',
        dataIndex: 'commonBatchNumberDTO.createPersonName',
        key: 'commonBatchNumberDTO.createPersonName',
        align:'center',
        width: '6%',
    },{
        title: '创建日期',
        dataIndex: 'commonBatchNumberDTO.commonBatchNumber.createTime',
        key: 'commonBatchNumberDTO.commonBatchNumber.createTime',
        align:'center',
        width: '12%',
    },{
        title: '发布状态',
        dataIndex: 'commonBatchNumberDTO.commonBatchNumber.isPublished',
        key: 'commonBatchNumberDTO.commonBatchNumber.isPublished',
        align:'center',
        width: '6%',
        render:state => {
            switch(state) {
                case 0: return '未发布';
                case 1: return '已发布';
                default: return '';
            }
        },
    },{
        title: '紧急',
        dataIndex: 'commonBatchNumberDTO.commonBatchNumber.isUrgent',
        key: 'commonBatchNumberDTO.commonBatchNumber.isUrgent',
        align:'center',
        width: '6%',
        render:isUrgent=>isUrgent?<span><i className="fa fa-circle" aria-hidden="true"></i>正常</span>:<span className='urgent'><i className="fa fa-circle" aria-hidden="true"></i> 紧急</span>,
    },{
        title: '操作',
        dataIndex: 'purchaseReportRecord.id',
        key: 'purchaseReportRecord.id',
        align:'center',
        width: '6%',
        render: (text,record) => {
            let operationFlag = this.judgeOperation(record.commonBatchNumberDTO.commonBatchNumber.isPublished);
            return (
                <span>
                    {operationFlag?(
                        <CheckReleaseSpan
                            fetch={this.props.fetch}
                            state={2}
                            name='发布'
                            id={text}
                        />
                    ):(
                        <span  className="notClick">发布</span>
                    )}
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
                }),
            };
        });
        return(
            <Table
                rowKey={record => record.purchaseReportRecord.id}
                dataSource={this.props.data}
                columns={columns}
                pagination={this.props.pagination}
                size="small"
                bordered
                scroll={{y: 400 }}
            />
        )
    }
    /**判断发布可否功能 */
    judgeOperation = (record) => {
        if(record===0){
            return true;
        }else{
            return false;
        }
    };
    /**---------------------- */
}
export default ReleaseTable;