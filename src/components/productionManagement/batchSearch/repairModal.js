import React from 'react';
import {Table} from 'antd';
import RepairDetail from "./repairDetailModal"

class RepairModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        sorter: (a, b) => a.index - b.index,
        align: 'center',
        width: '5%',
    }, {
        title: '维修单号',
        dataIndex: 'code',
        key: 'code',
        align: 'center',
        width: '10%',
    },{
        title: '紧急程度',
        dataIndex: 'emergeStatus',
        key: 'emergeStatus',
        align: 'center',
        width: '8%',
        render:(text,record)=>{
            if(record.emergeStatus==='0'){
                return (<span>一般</span>)
            }
            else {

                return (<span>紧急</span>)
            }
        }

    },{
        title: '申请时间',
        dataIndex: 'reportTime',
        key: 'reportTime',
        align: 'center',
        width: '13%',
    },  {
        title: '申请人',
        dataIndex: 'reportPeople',
        key: 'reportPeople',
        align: 'center',
        width: '7%',
    }, {
        title: '接单时间',
        dataIndex: 'receiveTime',
        key: 'receiveTime',
        align: 'center',
        width: '13%',
    },{
        title: '接单人',
        dataIndex: 'receivePeople',
        key: 'receivePeople',
        align: 'center',
        width: '8%',
    }, {
        title: '完成时间',
        dataIndex: 'finishTime',
        key: 'finishTime',
        align: 'center',
        width: '13%',
    }, {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align: 'center',
        width: '10%',
        render: (text, record) => {
            return (
                <RepairDetail
                    deptName={this.props.deptName}
                    record={record}
                />
            )
        }
    }];

    render() {
        return (
            <div style={{height: '520px'}}>
                <span>
                    <span className={"batct_repair_firstLine_name"}><b>设备名称:&nbsp;</b></span><span className={"batct_repair_firstLine_content"}><b>设备名称</b></span>
                    <span className={"batct_repair_firstLine_name"}><b>固定资产编码:</b>&nbsp;</span><span className={"batct_repair_firstLine_content"}><b>固定资产编码</b></span>
                    <span className={"batct_repair_firstLine_name"}><b>所属部门:</b>&nbsp;</span><span className={"batct_repair_firstLine_content"}><b>所属部门</b></span>
                </span>
                <Table
                    className={"batct_repair_Table"}
                    dataSource={this.props.data}
                    columns={this.columns}
                    size="small"
                    bordered
                    scroll={{y: 400}}
                    rowKey={record => record.code}
                />
            </div>
        )

    }
}

export default RepairModal