import React from 'react';
import {Divider, Table} from 'antd';
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
        width: '10%',
        render: receiveDate => {
            return <abbr style={{cursor:'default'}} title={receiveDate?receiveDate:'无'}>{receiveDate?receiveDate.substring(0,10):'无'}</abbr>
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
        width: '10%',
        render: createTime => {
            return <abbr style={{cursor:'default'}} title={createTime?createTime:'无'}>{createTime?createTime.substring(0,10):'无'}</abbr>
        }
    },{
        title: '发布状态',
        dataIndex: 'commonBatchNumber.isPublished',
        key: 'commonBatchNumber.isPublished',
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
        width: '6%',
        render: (text,record) => {
            let operationFlag = this.judgeOperation(record.commonBatchNumber.isPublished);
            // let operationFlag = true;
            return (
                <span>
                    {operationFlag?(
                        <CheckReleaseSpan
                            url={this.props.url}
                            fetch={this.props.fetch}
                            menuList={this.props.menuList}
                            state={record.commonBatchNumber.status}
                            name='发布'
                            id={record.commonBatchNumber.id}
                        />
                    ):(
                        <span  className="notClick">发布</span>
                    )}
                    <Divider type="vertical" />
                    <CheckReleaseSpan
                        fetch={this.props.fetch}
                        url={this.props.url}
                        id={record.commonBatchNumber.id}
                        menuList={this.props.menuList}
                        state={record.commonBatchNumber.status}
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