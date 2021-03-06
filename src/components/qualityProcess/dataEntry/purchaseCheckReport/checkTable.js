import React from 'react';
import {Divider, message, Table} from 'antd';
import CheckEditSpan from './checkEditSpan';
import CheckReleaseSpan from './checkReleaseSpan';
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
        dataIndex: 'commonBatchNumber.batchNumber',
        key: 'commonBatchNumber.batchNumber',
        align:'center',
        width: '12%',
        render: batchNumber => {
            return batchNumber?batchNumber:'无';
        }
    },{
        title: '原材料',
        dataIndex: 'details.materialName',
        key: 'details.materialName',
        align:'center',
        width: '6%',
        render: materialName => {
            return materialName?materialName:'无';
        }
    },{
        title: '生产厂家',
        dataIndex: 'details.manufactureName',
        key: 'details.manufactureName',
        align:'center',
        width: '6%',
        render: manufactureName => {
            return manufactureName?manufactureName:'无';
        }
    },{
        title: '到货日期',
        dataIndex: 'details.receiveDate',
        key: 'details.receiveDate',
        align:'center',
        width: '8%',
        render: receiveDate=>{
            return receiveDate?receiveDate:'无'
        }
    },{
        title: '创建人',
        dataIndex: 'createPersonName',
        key: 'createPersonName',
        align:'center',
        width: '6%',
        render: createPersonName => {
            return createPersonName?createPersonName:'无';
        }
    },{
        title: '创建日期',
        dataIndex: 'commonBatchNumber.createTime',
        key: 'commonBatchNumber.createTime',
        align:'center',
        width: '8%',
        render:(createTime)=>{
            return <span title={createTime} className='text-decoration'>{createTime.substring(0,10)+'...'}</span>
        }
    },{
        title: '审核状态',
        dataIndex: 'commonBatchNumber.status',
        key: 'commonBatchNumber.status',
        align:'center',
        width: '8%',
        render:status => {
            return this.props.status[status.toString()];
        }
    },{
        title: '紧急',
        dataIndex: 'commonBatchNumber.isUrgent',
        key: 'commonBatchNumber.isUrgent',
        align:'center',
        width: '6%',
        render:isUrgent=>{
            return isUrgent?<span className='urgent'><i className="fa fa-circle" aria-hidden="true"></i> 紧急</span>:<span><i className="fa fa-circle" aria-hidden="true"></i>正常</span>
        },
    },{
        title: '操作',
        dataIndex: 'commonBatchNumber.id',
        key: 'commonBatchNumber,id',
        align:'center',
        width: '11%',
        render: (text,record) => {
            const status = record.commonBatchNumber.status;
            let operationCheckFlag = this.judgeCheckOperation(status);
            return (
                <span>
                    <CheckReleaseSpan
                        fetch={this.props.fetch}
                        url={this.props.url}
                        id={record.commonBatchNumber.id}
                        menuList={this.props.menuList}
                        state={record.commonBatchNumber.status}
                        name='详情'
                    />
                    <span className={this.props.judgeOperation(this.props.operation,'UPDATE')?'':'hide'}>
                        <Divider type="vertical" />
                        {operationCheckFlag?(
                            <CheckEditSpan
                                fetch={this.props.fetch}
                                url={this.props.url}
                                id={record.commonBatchNumber.id}
                                menuList={this.props.menuList}
                            />
                        ):(
                            <span  className="notClick">编辑</span>
                        )}
                    </span>
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
                rowKey={record => record.commonBatchNumber.id}
                dataSource={this.props.data}
                columns={columns}
                pagination={this.props.pagination}
                size="small"
                bordered
                onChange={this.props.handleTableChange}
            />
        )
    }
    /**判断编辑、删除可否功能 */
    judgeCheckOperation = (record) => {
        if(record===-1||record===3){
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
            this.props.fetch();
            message.info(data.data.message);
        }).catch(()=>{
            message.info('删除失败，请联系管理员！');
        });
    };
    /**---------------------- */
}
export default CheckTable;
