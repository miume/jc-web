import React from 'react';
import {Table, Icon, Divider, message} from 'antd';
import axios from "axios";
import '../acceptOrders.css';

//用于编写表格的显示样式

class InnerTable extends React.Component {
    constructor(props) {
        super(props)
    }
    columns = [
        {
            title: '保养单号',
            dataIndex: 'code',
            key: 'code',
            width: '10px',
            align:'center',
        },
        {
            title: '设备名称/编号',
            dataIndex: 'deviceName',
            key: 'deviceName',
            width: '10px',
            align:'center',
        },
        {
            title: '所属部门',
            dataIndex: 'deptCode',
            key: 'deptCode',
            width: '10px',
            align:'center',
        },
        {
            title: '本次计划执行日期',
            dataIndex: 'planDate',
            key: 'planDate',
            width: '10px',
            align:'center',
        },
        {
            title: '接单时间',
            dataIndex: 'receiveDate',
            key: 'receiveDate',
            width: '10px',
            align:'center',
        },
        {
            title: '保养人',
            dataIndex: 'maintPeople',
            key: 'maintPeople',
            width: '5px',
            align:'center',
        },
    ];

    dataSource = [
        {
            key: '1',
            code:this.props.code,
            deviceName:this.props.deviceName,
            deptCode:this.props.deptCode,
            planDate:this.props.planDate,
            receiveDate:this.props.receiveDate,
            maintPeople:this.props.maintPeople,
        }
    ];

    render() {
        return (
            <div >
                <Table
                    dataSource={this.dataSource}
                    columns={this.columns}
                    size="small"
                    pagination={false}
                    bordered
                />
            </div>);
    }


}


export default InnerTable