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
        dataIndex: 'batchNumber',
        key: 'batchNumber',
        align:'center',
        width: '12%',
    },{
        title: '物料类型',
        dataIndex: 'materialClass',
        key: 'materialClass',
        align:'center',
        width: '6%',
    },{
        title: '厂商名称',
        dataIndex: 'manufactureName',
        key: 'manufactureName',
        align:'center',
        width: '6%',
    },{
        title: '到货日期',
        dataIndex: 'receivedDate',
        key: 'receivedDate',
        align:'center',
        width: '10%',
    },{
        title: '创建人',
        dataIndex: 'createPersonName',
        key: 'createPersonName',
        align:'center',
        width: '6%',
    },{
        title: '创建日期',
        dataIndex: 'createTime',
        key: 'createTime',
        align:'center',
        width: '10%',
    },{
        title: '审核状态',
        dataIndex: 'status',
        key: 'status',
        align:'center',
        width: '6%',
        render:state => {
            return this.props.status[state.toString()];
        }
    },{
        title: '紧急',
        dataIndex: 'isUrgent',
        key: 'isUrgent',
        align:'center',
        width: '6%',
        render:isUrgent=>isUrgent?<span><i className="fa fa-circle" aria-hidden="true"></i>正常</span>:<span className='urgent'><i className="fa fa-circle" aria-hidden="true"></i> 紧急</span>,
    },{
        title: '操作',
        dataIndex: 'batchNumberId',
        key: 'batchNumberId',
        align:'center',
        width: '13%',
        render: (text,record) => {
            // let operationCheckFlag = this.judgeCheckOperation(record.state);
            let operationCheckFlag = true;
            return (
                <span>
                    {operationCheckFlag?(
                        <EditSpan
                            // fetch={this.props.fetch}
                            url={this.props.url}
                            // id={record.purchaseReportRecord.id}
                            menuList={this.props.menuList}
                        />
                    ):(
                        <span  className="notClick"><i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;编辑</span>
                    )}
                    <Divider type="vertical" />
                    <DetailSpan
                        url={this.props.url}
                        menuList={this.props.menuList}
                        state={record.status}
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
                rowKey={record => record.id}
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
        if(record==='0'||record==='3'){
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
export default UnqualifiedTable;