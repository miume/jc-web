import React from 'react';
import {Table} from 'antd';
import Detail from "./MaintdetailModal"
import "./batchSearch.css"

class MaintenanceModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: []
        };

    }
    url=JSON.parse(localStorage.getItem('url'));
    columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            sorter: (a, b) => a.index - b.index,
            align:'center',
            width:"6%"
        },
        {
            title: '保养单号',
            dataIndex: 'plancode',
            key: 'plancode',
            align:'center',
            width:'8%',

        }, {
            title: '本次计划执行日期',
            key: 'planDate',
            align:'center',
            dataIndex: 'planDate',
            width:"12%"
        },
        {
            title: '接单时间',
            key: 'receiveDate',
            dataIndex: 'receiveDate',
            width:"12%"
        },
        {
            title: '保养完成日期',
            sorter: (a, b) => a.deadline - b.deadline,
            key: 'finishiDate',
            dataIndex: 'finishiDate',
            align:'center',
            width:"12%",
        },
        {
            title: '保养人',
            key: 'maintPeople',
            dataIndex: 'maintPeople',
            align:'center',
            width:"10%",
        }, {
        title: '操作',
        dataIndex: 'code',
        key: 'code',
        align: 'center',
        width: '8%',
        render: (text, record) => {
            return (
                <Detail
                    record={record}
                    code={record.plancode}
                    url={this.url}
                />
            )
        }
    }];
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div style={{height: '520px'}}>
                <span>
                    <span className={"batct_maint_firstLine_name"}><b>设备名称:&nbsp;</b></span><span className={"batct_maint_firstLine_content"}><b>设备名称</b></span>
                    <span className={"batct_maint_firstLine_name"}><b>固定资产编码:</b>&nbsp;</span><span className={"batct_maint_firstLine_content"}><b>固定资产编码</b></span>
                    <span className={"batct_maint_firstLine_name"}><b>所属部门:</b>&nbsp;</span><span className={"batct_maint_firstLine_content"}><b>所属部门</b></span>
                </span>
                <Table
                    className={"batct_maint_Table"}
                    dataSource={this.props.data}
                    columns={this.columns}
                    size="small"
                    bordered
                    scroll={{y: 400}}
                />
            </div>
        )

    }
}

export default MaintenanceModal
