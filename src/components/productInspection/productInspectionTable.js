import React from 'react';
import {Divider, Table} from 'antd';
import DetailSpan from './detailSpan';
import CheckSpan from './checkSpan';
import ReleaseSpan from './releaseSpan';
import './productInspection.css';

class ProductTable extends React.Component{
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        sorter: (a, b) => a.index - b.index,
        align:'center',
        width: '6%',
    },{
        title: '送检日期',
        dataIndex: 'sampleDeliveringRecordDTO.sampleDeliveringRecord.sampleDeliveringDate',
        key: 'sampleDeliveringRecordDTO.sampleDeliveringRecord.sampleDeliveringDate',
        align:'center',
        width: '13%',
    },{
        title: '送检人',
        dataIndex: 'sampleDeliveringRecordDTO.deliverer.name',
        key: 'sampleDeliveringRecordDTO.deliverer.name',
        align:'center',
        width: '8%',
    },{
        title: '送检工厂(原材料)',
        dataIndex: 'sampleDeliveringRecordDTO.deliveryFactory.name',
        key: 'sampleDeliveringRecordDTO.deliveryFactory.name',
        align:'center',
        width: '10%',
    },{
        title: '编号',
        dataIndex: 'sampleDeliveringRecordDTO.repoBaseSerialNumber.serialNumber',
        key: 'sampleDeliveringRecordDTO.repoBaseSerialNumber.serialNumber',
        align:'center',
        width: '10%',
    },{
        title: '检测项目',
        dataIndex: 'testReportRecordDTO.testItemName',
        key: 'testReportRecordDTO.testItemName',
        align:'center',
        width: '8%',
    },{
        title: '异常备注',
        dataIndex: 'sampleDeliveringRecordDTO.sampleDeliveringRecord.exceptionComment',
        key: 'sampleDeliveringRecordDTO.sampleDeliveringRecord.exceptionComment',
        align:'center',
        width: '8%',
    },{
        title: '发布状态',
        dataIndex: 'commonBatchNumberDTO.commonBatchNumber.isPublished',
        key: 'commonBatchNumberDTO.commonBatchNumber.isPublished',
        align:'center',
        width: '8%',
        render:state => {
            switch(state) {
                case 0: return '未发布';
                case 1: return '已发布';
                default: return '';
            }
        },
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
        width: '16%',
        render: (text,record) => {
            let detailSpanFlag = this.judgeDetailOperation(record.status);
            let checkSpanFlag = this.judgeCheckOperation(record.status);
            let releaseSpanFlag = this.judgeReleaseOperation(record.h,record.status);
            // let detailSpanFlag = true
            // let checkSpanFlag = true
            // let releaseSpanFlag = true
            return (
                <span>
                    {detailSpanFlag?(
                        <DetailSpan
                            url={this.props.url}
                            record={record}
                            checkStatus={record.commonBatchNumberDTO.commonBatchNumber.status}
                        />
                    ):(
                        <span  className="notClick">详情</span>
                    )}
                    <Divider type="vertical" />
                    {checkSpanFlag?(
                        <CheckSpan
                            record={record}
                        />
                    ):(
                        <span  className="notClick">录检</span>
                    )}
                    <Divider type="vertical" />
                    {releaseSpanFlag?(
                        <ReleaseSpan
                            record={record}
                        />
                    ):(
                        <span  className="notClick">发布</span>
                    )}
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
                }),
            };
        });
        return (
            <Table
                className="productCursorDefault"
                rowKey={record => record.commonBatchNumberDTO.commonBatchNumber.id}
                dataSource={this.props.data}
                columns={columns}
                rowSelection={this.props.rowSelection}
                pagination={this.props.pagination}
                size="small"
                bordered
                scroll={{ y: 380 }}
            />
        );
    }
    /**判断详情，录检，发布可否功能 */
    judgeDetailOperation = (status) => {
        if(status===0){
            return false;
        }else{
            return true;
        }
    };
    judgeCheckOperation = (status) => {
        if(status===0||status===3){
            return true;
        }else{
            return false;
        }
    };
    judgeReleaseOperation = (h,status) => {
        if(h===0&&status===3){
            return true;
        }else{
            return false;
        }
    };
    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */

}

export default ProductTable;