import React from 'react';
import {Divider, message, Popconfirm, Table} from 'antd';
import CheckEditSpan from './checkEditSpan';
import CheckReleaseSpan from './checkReleaseSpan';
// import DeleteById from '../BlockQuote/deleteById';
import axios from "axios";

class CheckTable extends React.Component {
    constructor(props){
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }
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
        dataIndex: 'materialName',
        key: 'materialName',
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
        dataIndex: 'purchaseReportRecord.id',
        key: 'purchaseReportRecord,id',
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
                            fetch={this.props.fetch}
                            url={this.props.url}
                            id={record.purchaseReportRecord.id}
                            menuList={this.props.menuList}
                        />
                    ):(
                        <span  className="notClick">编辑</span>
                    )}
                    <Divider type="vertical" />
                    <CheckReleaseSpan
                        url={this.props.url}
                        id={record.purchaseReportRecord.id}
                        menuList={this.props.menuList}
                        state={record.state}
                        name='详情'
                    />
                    <Divider type="vertical" />
                    {operationDeleteFlag?(
                        <Popconfirm title="确定删除?" onConfirm={()=>this.handleDelete(text)} okText="确定" cancelText="取消" >
                            <span className='blue'>删除</span>
                        </Popconfirm>
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
                rowKey={record => record.purchaseReportRecord.id}
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
    handleDelete = (id) => {
        axios({
            url:`${this.props.url.purchaseCheckReport.purchaseReportRecord}/${id}`,
            method:'Delete',
            headers:{
                'Authorization':this.props.url.Authorization
            },
        }).then((data)=>{
            message.info(data.data.message);
            console.log('222')
            this.props.fetch();
        }).catch(()=>{
            message.info('删除失败，请联系管理员！');
        });
    };
    /**---------------------- */
}
export default CheckTable;