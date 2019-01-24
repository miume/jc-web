import React from 'react';
import {Divider, Table} from 'antd';
import EditSpan from './editSpan';
import DetailSpan from './detailSpan';
import CheckEditSpan from "../purchaseCheckReport/checkEditSpan";

class UnqualifiedTable extends React.Component {
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
    },{
        title: '物料类型',
        dataIndex: 'details.materialName',
        key: 'details.materialName',
        align:'center',
        width: '6%',
        render: materialName => {
            return materialName?materialName:'无'
        }
    },{
        title: '厂商名称',
        dataIndex: 'details.factory',
        key: 'details.factory',
        align:'center',
        width: '6%',
        render: factory => {
            return factory?factory:'无'
        }
    },{
        title: '到货日期',
        dataIndex: 'details.date',
        key: 'details.date',
        align:'center',
        width: '10%',
        render: date => {
            return date?date:'无'
        }
    },{
        title: '创建人',
        dataIndex: 'createPersonName',
        key: 'createPersonName',
        align:'center',
        width: '6%',
        render: createPersonName => {
            return createPersonName?createPersonName:'无'
        }
    },{
        title: '创建日期',
        dataIndex: 'commonBatchNumber.createTime',
        key: 'commonBatchNumber.createTime',
        align:'center',
        width: '10%',
        render: createTime => {
            return createTime?createTime:'无'
        }
    },{
        title: '审核状态',
        dataIndex: 'commonBatchNumber.status',
        key: 'commonBatchNumber.status',
        align:'center',
        width: '6%',
        render:state => {
            return this.props.status[state.toString()];
        }
    },{
        title: '紧急',
        dataIndex: 'commonBatchNumber.isUrgent',
        key: 'commonBatchNumber.isUrgent',
        align:'center',
        width: '6%',
        render:isUrgent=>isUrgent?<span><i className="fa fa-circle" aria-hidden="true"></i>正常</span>:<span className='urgent'><i className="fa fa-circle" aria-hidden="true"></i> 紧急</span>,
    },{
        title: '操作',
        dataIndex: 'commonBatchNumber.id',
        key: 'commonBatchNumber.id',
        align:'center',
        width: '13%',
        render: (text,record) => {
            let operationCheckFlag = this.judgeCheckOperation(record.commonBatchNumber.status);
            // let operationCheckFlag = true;
            return (
                <span>
                    {operationCheckFlag?(
                        <EditSpan
                            fetch={this.props.fetch}
                            url={this.props.url}
                            checkStatus={record.commonBatchNumber.status}
                            batchNumberId={record.commonBatchNumber.id}
                            menuList={this.props.menuList}
                        />
                    ):(
                        <span  className="notClick">编辑</span>
                    )}
                    <Divider type="vertical" />
                    <DetailSpan
                        url={this.props.url}
                        menuList={this.props.menuList}
                        checkStatus={record.commonBatchNumber.status}
                        batchNumberId={record.commonBatchNumber.id}
                        name='详情'
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
                rowKey={record => record.commonBatchNumber.id}
                dataSource={this.props.data}
                columns={columns}
                pagination={this.props.pagination}
                size="small"
                bordered
                scroll={{ y: 400 }}
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
}
export default UnqualifiedTable;