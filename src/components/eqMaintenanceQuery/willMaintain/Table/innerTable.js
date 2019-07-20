import React from 'react';
import {Table, Icon, Divider, message} from 'antd';
import axios from "axios";
import '../willMaintain.css';

//用于编写表格的显示样式

class InnerTable extends React.Component {
    constructor(props) {
        super(props)
    }
    columns = [
        {
            title: '保养单号',
            dataIndex: 'list',
            key: 'list',
            width: '10px',
            align:'center',
        },
        {
            title: '设备名称/编号',
            dataIndex: 'name',
            key: 'name',
            width: '10px',
            align:'center',
        },
        {
            title: '所属部门',
            dataIndex: 'depart',
            key: 'depart',
            width: '10px',
            align:'center',
        },
        {
            title: '本次计划执行日期',
            dataIndex: 'date',
            key: 'date',
            width: '10px',
            align:'center',
        }
    ];

    dataSource = [
        {
            key: '1',
            list: 32,
            name: '？？？',
            depart: '项目部',
            date: '2019.7.17',
        }
    ];

    render() {
        return (
            <div>
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