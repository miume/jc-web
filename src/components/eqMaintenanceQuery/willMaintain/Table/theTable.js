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
            width: '5%',
        },
        {
            title: '保养单号',
            dataIndex: 'list',
            key: 'list',
            width: '20%',
        },
        {
            title: '设备名称/编号',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.index - b.index,
            width: '20%',
        },
        {
            title: '所属部门',
            dataIndex: 'depart',
            key: 'depart',
            width: '20%',
        },
        {
            title: '本次计划执行日期',
            dataIndex: 'date',
            key: 'date',
            width: '20%',
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
        const dataSource = [];
        for ( let i=0;i<100;i++){
            dataSource.push({
                key:i,
                num: i,
                list: 32,
                name: '？？？',
                depart: '项目部',
                date: '2019.7.17',
            })
        }
        return (
            <div style={{width:'100%'}}>
                <Table
                    rowKey={record => record.code}
                    rowSelection={this.props.rowSelection}
                    dataSource={dataSource}
                    columns={this.columns}
                    size="small"
                    bordered
                />
            </div>);
    }


}


export default TheTable