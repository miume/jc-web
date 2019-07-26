import React from 'react';
import {Table, Icon, Divider, message} from 'antd';
import axios from "axios";
import Details from "./detail";
import '../acceptOrders.css'

//用于编写表格的显示样式

class TheTable extends React.Component {
    constructor(props) {
        super(props)
    }

   columns = [
        {
            title: '序号',
            dataIndex: 'num',
            key: 'num',
            sorter: (a, b) => a.index - b.index,
            width: '5px',
            align:'center',
        },
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
            sorter: (a, b) => a.index - b.index,
            width: '10px',
            align:'center',
        },
        {
            title: '所属部门',
            dataIndex: 'deptName',
            key: 'deptName',
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
        {
            title: '操作',
            dataIndex: 'move',
            key: 'move',
            width: '5px',
            align:'center',
            render: (text, record) => {
                return (
                    <span>
                        <Details
                            url={this.props.url}
                            record={record}
                        />
                    </span>
                )
            }
        },
    ];

    render() {
        return (
            <div>
                <Table
                    dataSource={this.props.rightTableData}
                    pagination={this.props.pagination}
                    onChange={this.props.handleTableChange}
                    columns={this.columns}
                    size="small"
                    bordered
                />
            </div>);
    }

}


export default TheTable