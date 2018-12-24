import React from 'react';
import {Table} from 'antd';
import DetailSpan from './packDetailSpan';
import './purchaseCheckReport.css'

class PackTable extends React.Component {
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        // sorter: (a, b) => a.id - b.id,
        align:'center',
        width: '6%',
    },{
        title: '送检日期',
        dataIndex: 'sampleDeliveringRecordDTO.sampleDeliveringRecord.sampleDeliveringDate',
        key: 'sampleDeliveringRecordDTO.sampleDeliveringRecord.sampleDeliveringDate',
        align:'center',
        width: '15%',
        render: sampleDeliveringDate => {
            return sampleDeliveringDate?sampleDeliveringDate:'无';
        }
    },{
        title: '送样人',
        dataIndex: 'sampleDeliveringRecordDTO.deliverer.name',
        key: 'sampleDeliveringRecordDTO.deliverer.name',
        align:'center',
        width: '8%',
        render: deliverer => {
            return deliverer?deliverer:'无';
        }
    },{
        title: '送样工厂',
        dataIndex: 'sampleDeliveringRecordDTO.deliveryFactory.name',
        key: 'sampleDeliveringRecordDTO.deliveryFactory.name',
        align:'center',
        width: '8%',
        render: deliveryFactoryName => {
            return deliveryFactoryName?deliveryFactoryName:'无';
        }
    },{
        title: '编号',
        dataIndex: 'sampleDeliveringRecordDTO.repoBaseSerialNumber.serialNumber',
        key: 'sampleDeliveringRecordDTO.repoBaseSerialNumber.serialNumber',
        align:'center',
        width: '15%',
        render: serialNumberId => {
            return serialNumberId?serialNumberId:'无';
        }
    },{
        title: '检测项目',
        dataIndex: 'testItemString',
        key: 'testItemString',
        align:'center',
        width: '10%',
        render: testItems => {
            return testItems?testItems:'无';
        }
    },{
        title: '异常备注',
        dataIndex: 'sampleDeliveringRecordDTO.sampleDeliveringRecord.exceptionComment',
        key: 'sampleDeliveringRecordDTO.sampleDeliveringRecord.exceptionComment',
        align:'center',
        width: '8%',
        render: exceptionComment => {
            return exceptionComment?exceptionComment:'无';
        }
    },{
        title: '接受反馈',
        dataIndex: 'sampleDeliveringRecordDTO.sampleDeliveringRecord.acceptStatus',
        key: 'sampleDeliveringRecordDTO.sampleDeliveringRecord.acceptStatus',
        align:'center',
        width: '8%',
        render: acceptStatus => {
            return acceptStatus?acceptStatus:'无';
        }
    },{
        title: '审核状态',
        dataIndex: 'commonBatchNumberDTO.commonBatchNumber.status',
        key: 'commonBatchNumberDTO.commonBatchNumber.status',
        align:'center',
        width: '8%',
        render:state => {
            return this.props.status[state.toString()];
        }
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
                        url={this.props.url}
                        record={record}
                        id={record.sampleDeliveringRecordDTO.sampleDeliveringRecord.id}
                        modifySelectedRowKeysData={this.props.modifySelectedRowKeysData}
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

                }),
            };
        });
        return(
            <Table
                className="purchasePackTable"
                rowKey={record => record.sampleDeliveringRecordDTO.sampleDeliveringRecord.id}
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