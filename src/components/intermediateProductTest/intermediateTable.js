import React from 'react';
import axios from 'axios';
import {Divider, Table} from 'antd';
import DetailSpan from './detailSpan';
import CheckSpan from './checkSpan';
import ReleaseSpan from './releaseSpan';

class InterTable extends React.Component{
    url;
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        sorter: (a, b) => a.key - b.key,
        align:'center',
        width: '6%',
    },{
        title: '送检日期',
        dataIndex: 'sampleDeliveringRecord.sampleDeliveringDate',
        key: 'sampleDeliveringRecord.sampleDeliveringDate',
        align:'center',
        width: '15%',
        render: sampleDeliveringDate => {
            return sampleDeliveringDate?sampleDeliveringDate:'无';
        }
    },{
        title: '送检人',
        dataIndex: 'deliverer',
        key: 'deliverer',
        align:'center',
        width: '8%',
        render: deliverer => {
            return deliverer?deliverer:'无';
        }
    },{
        title: '送检工厂(原材料)',
        dataIndex: 'deliveryFactoryName',
        key: 'deliveryFactoryName',
        align:'center',
        width: '8%',
        render: deliveryFactoryName => {
            return deliveryFactoryName?deliveryFactoryName:'无';
        }
    },{
        title: '编号',
        dataIndex: 'sampleDeliveringRecord.serialNumberId',
        key: 'sampleDeliveringRecord.serialNumberId',
        align:'center',
        width: '8%',
        render: serialNumberId => {
            return serialNumberId?serialNumberId:'无';
        }
    },{
        title: '检测项目',
        dataIndex: 'testItemString',
        key: 'testItemString',
        align:'center',
        width: '8%',
        render: testItems => {
            return testItems?testItems:'无';
        }
    },{
        title: '异常备注',
        dataIndex: 'sampleDeliveringRecord.exceptionComment',
        key: 'sampleDeliveringRecord.exceptionComment',
        align:'center',
        width: '8%',
        render: exceptionComment => {
            return exceptionComment?exceptionComment:'无';
        }
    },{
        title: '发布状态',
        dataIndex: 'commonBatchNumber.isPublished',
        key: 'commonBatchNumber.isPublished',
        align:'center',
        width: '8%',
        render: isPublished => {
            switch(`${isPublished}`) {
                case '0': return '未发布';
                case '1': return '已发布';
                default: return '无';
            }
        },
    },{
        title: '审核状态',
        dataIndex: 'commonBatchNumber.status',
        key: 'commonBatchNumber.status',
        align:'center',
        width: '8%',
        render:state => {
            return state?this.props.status[state]:'无';
        }
    },{
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align:'center',
        width: '17%',
        render: (text,record) => {
            const isPublished = record.commonBatchNumber?record.commonBatchNumber.isPublished:'';
            const status = record.commonBatchNumber?record.commonBatchNumber.status:'';
            let detailSpanFlag = this.judgeDetailOperation(status);
            let checkSpanFlag = this.judgeCheckOperation(status);
            // let checkSpanFlag = true;
            let releaseSpanFlag = this.judgeReleaseOperation(isPublished,status);
            // let releaseSpanFlag = true;
            return (
                <span>
                    {detailSpanFlag?(
                        <DetailSpan
                            url={this.props.url}
                            id={record.sampleDeliveringRecord.id}
                        />
                    ):(
                        <span  className="notClick">详情</span>
                    )}
                    <Divider type="vertical" />
                    {checkSpanFlag?(
                        <CheckSpan
                            url={this.props.url}
                            id={record.sampleDeliveringRecord.id}
                        />
                    ):(
                        <span  className="notClick">录检</span>
                    )}
                    <Divider type="vertical" />
                    {releaseSpanFlag?(
                        <ReleaseSpan
                            url={this.props.url}
                            id={record.sampleDeliveringRecord.id}
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
        this.url = JSON.parse(localStorage.getItem('url'));
        return (
            <Table
                rowKey={record => record.index}
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
        if(status==="0"){
            return false;
        }else{
            return true;
        }
    };
    judgeCheckOperation = (status) => {
        if(status===-1||status===3){
            return true;
        }else{
            return false;
        }
    };
    judgeReleaseOperation = (isPublished,status) => {
        if(isPublished==="0"&&(status==="3"||status==='2')){
            return true;
        }else{
            return false;
        }
    };
    /**---------------------- */
    /**通过id查询详情 */
    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */

}

export default InterTable;