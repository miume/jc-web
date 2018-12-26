import React from 'react';
import {Divider, Table} from 'antd';
import CheckEditSpan from './checkEditSpan';
import CheckReleaseSpan from './checkReleaseSpan';
import DeleteSpan from './deleteSpan';

class CheckTable extends React.Component {
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
        width: '10%',
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
        width: '10%',
    },{
        title: '审核状态',
        dataIndex: 'commonBatchNumberDTO.commonBatchNumber.status',
        key: 'commonBatchNumberDTO.commonBatchNumber.status',
        align:'center',
        width: '6%',
        render:state => {
            return this.props.status[state.toString()];
        }
    },{
        title: '紧急',
        dataIndex: 'commonBatchNumberDTO.commonBatchNumber.isUrgent',
        key: 'commonBatchNumberDTO.commonBatchNumber.isUrgent',
        align:'center',
        width: '6%',
        render:isUrgent=>isUrgent?<span><i className="fa fa-circle" aria-hidden="true"></i>正常</span>:<span className='urgent'><i className="fa fa-circle" aria-hidden="true"></i> 紧急</span>,
    },{
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align:'center',
        width: '11%',
        render: (text,record) => {
            // let operationCheckFlag = this.judgeCheckOperation(record.state);
            let operationCheckFlag = true;
            // let operationDeleteFlag = this.judgeDeleteOperation(record.state);
            let operationDeleteFlag = true;

            return (
                <span>
                    {operationCheckFlag?(
                        <CheckEditSpan
                            url={this.props.url}
                            id={record.purchaseReportRecord.id}
                            userId={this.props.userId}
                        />
                    ):(
                        <span  className="notClick">编辑</span>
                    )}
                    <Divider type="vertical" />
                    <CheckReleaseSpan
                        state={record.state}
                        name='详情'
                    />
                    <Divider type="vertical" />
                    {operationDeleteFlag?(
                        <DeleteSpan
                            record={record}
                            handleDelete={this.handleDelete.bind(this)}
                        />
                    ):(
                        <span  className="notClick">删除</span>
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
                rowKey={record => record.id}
                dataSource={this.props.data}
                columns={columns}
                pagination={this.props.pagination}
                size="small"
                bordered
                scroll={{ x: 1500,y: 400 }}
            />
        )
    }
    /**判断编辑、删除可否功能 */
    judgeCheckOperation = (record) => {
        if(record===0||record===3){
            return true;
        }else{
            return false;
        }
    };
    judgeDeleteOperation = (record) => {
        if(record===0){
            return true;
        }else{
            return false;
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