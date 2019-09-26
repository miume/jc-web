import React from 'react';
import {Divider, Table} from 'antd';
import EditSpan from './editSpan';
import DetailSpan from './detailSpan';
import './unqualifiedTrack.css';
class UnqualifiedTrackTable extends React.Component {
    constructor(props){
        super(props);
        this.judgeCheckOperation = this.judgeCheckOperation.bind(this);
    }
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        sorter: (a, b) => a.index - b.index,
        align:'center',
        width: '10%',
    },{
        title: '不合格品',
        dataIndex: 'details.materialName',
        key: 'details.materialName',
        align:'center',
        width: '15%',
    },{
        title: '发生工序',
        dataIndex: 'details.process.name',
        key: 'details.process',
        align:'center',
        width: '20%',
    },{
        title: '发生时间',
        dataIndex: 'details.createTime',
        key: 'details.createTime',
        align:'center',
        width: '20%',
    },{
        title: '处理负责人',
        dataIndex: 'details.handle',
        key: 'details.handle',
        align:'center',
        width: '15%',
    },{
        title: '操作',
        dataIndex: 'commonBatchNumber.id',
        key: 'commonBatchNumber.id',
        align:'center',
        width: '20%',
        render: (text,record) => {
            let operationCheckFlag = this.judgeCheckOperation(record.commonBatchNumber.status);
            return (
                <span>
                    <DetailSpan
                        record={record}
                        fetch={this.props.fetch}
                        url={this.props.url}
                        checkStatus={record.commonBatchNumber.status}
                        batchNumberId={record.commonBatchNumber.id}
                        menuList={this.props.menuList}
                    />
                    <span className={this.props.judgeOperation(this.props.operation,'UPDATE')?'':'hide'}>
                        <Divider type="vertical" />
                        {operationCheckFlag?(
                            <EditSpan
                                record={record}
                                // unTrackThead={record}
                                fetch={this.props.fetch}
                                url={this.props.url}
                                checkStatus={record.commonBatchNumber.status}
                                batchNumberId={record.commonBatchNumber.id}
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
                className="unTrackCursorDefault"
                rowKey={record => record.id}
                dataSource={this.props.data}
                columns={columns}
                pagination={this.props.pagination}
                onChange={this.props.handleTableChange}
                size="small"
                bordered
                scroll={{y: 400 }}
            />
        )
    }
    judgeCheckOperation = (record) => {
        if(record===-1||record===3){

            return true;
        }else{
            return false;
        }
    };

}
export default UnqualifiedTrackTable;