import React from 'react';
import {Table, Icon, Divider, message} from 'antd';
import axios from "axios";
import Details from "./detail";
import Delete from "./delete";
import '../willMaintain.css'

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
            width: '10%',
            align:'center',
        },
        {
            title: '保养单号',
            dataIndex: 'code',
            key: 'code',
            width: '20%',
            align:'center',
        },
        {
            title: '设备名称/编号',
            dataIndex: 'deviceName',
            key: 'deviceName',
            sorter: (a, b) => a.index - b.index,
            width: '20%',
            align:'center',
        },
        {
            title: '所属部门',
            dataIndex: 'deptCode',
            key: 'deptCode',
            width: '20%',
            align:'center',
        },
        {
            title: '本次计划执行日期',
            dataIndex: 'planDate',
            key: 'planDate',
            width: '20%',
            align:'center',
        },
        {
            title: '操作',
            dataIndex: 'move',
            key: 'move',
            width: '15%',
            render: (text, record) => {
                return (
                    <div style={{display:'flex'}}>
                        <Details />
                        <Divider type="vertical"/>
                        <Delete/>
                    </div>
                )
            }
        },
    ];



    render() {
        return (
            <div style={{width:'100%'}}>
                <Table
                    dataSource={this.props.rightTableData}
                    columns={this.columns}
                    size="small"
                    bordered
                />
            </div>);
    }


}


export default TheTable