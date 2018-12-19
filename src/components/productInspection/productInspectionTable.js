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
        key: 'id',
        sorter: (a, b) => a.key - b.key,
        align:'center',
        width: '6%',
    },{
        title: '送检日期',
        dataIndex: 'sampleDeliveringDate',
        key: 'sampleDeliveringDate',
        align:'center',
        width: '13%',
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
        title: '编号',
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
        render:state => {
            switch(`${state}`) {
                case '0': return '未发布';
                case '1': return '已发布';
                default: return '';
            }
        },
    },{
        title: '审核状态',
        dataIndex: 'status',
        key: 'status',
        align:'center',
        width: '8%',
        render:state => {
            switch(`${state}`) {
                case '0': return '未申请'
                case '1': return '审核中';
                case '2': return '已通过';
                case '3': return '不通过';
                default: return '';
            }
        }
    },{
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align:'center',
        width: '19%',
        render: (text,record) => {
            let detailSpanFlag = this.judgeDetailOperation(record.status);
            let checkSpanFlag = this.judgeCheckOperation(record.status);
            let releaseSpanFlag = this.judgeReleaseOperation(record.h,record.status);
            return (
                <span>
                    {detailSpanFlag?(
                        <DetailSpan
                            record={record}
                            checkStatus={record.status}
                        />
                    ):(
                        <span  className="notClick"><i className="fa fa-file-text-o" aria-hidden="true"></i>&nbsp;详情</span>
                    )}
                    <Divider type="vertical" />
                    {checkSpanFlag?(
                        <CheckSpan
                            record={record}
                        />
                    ):(
                        <span  className="notClick"><i className="fa fa-archive" aria-hidden="true"></i>&nbsp;录检</span>
                    )}
                    <Divider type="vertical" />
                    {releaseSpanFlag?(
                        <ReleaseSpan
                            record={record}
                        />
                    ):(
                        <span  className="notClick"><i className="fa fa-bullhorn" aria-hidden="true"></i>&nbsp;发布</span>
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
                rowKey={record => record.id}
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
        if(status==="0"||status==="3"){
            return true;
        }else{
            return false;
        }
    };
    judgeReleaseOperation = (h,status) => {
        if(h==="0"&&status==="3"){
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