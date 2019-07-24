import React from 'react';
import {Table, Icon, Divider, message} from 'antd';
import axios from "axios";
import Details from "./detail";
import Delete from "./delete";
import '../willMaintain.css'
import DeletaSpan from "../../../departManagement/deleteSpan";

//用于编写表格的显示样式

class TheTable extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            isDelete:0,
        }
        this.handleDelete=this.handleDelete.bind(this);
    }
    columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
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
            dataIndex: 'depName',
            key: 'depName',
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
                        <Details
                            url={this.props.url}
                            record={record}
                        />
                        <Delete
                            handleDelete={this.handleDelete}
                            record={record}
                        />
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
                    pagination={this.props.pagination}
                    onChange={this.props.handleTableChange}
                    columns={this.columns}
                    size="small"
                    bordered
                />
            </div>);
    }

    handleDelete = (id) => {
        axios({
            url:`${this.props.url.eqMaintenanceQuery.recordDelete}/${id}`,
            method:'Delete',
            headers:{
                'Authorization':this.props.url.Authorization
            },

            params:{
                id:id,
            }

        }).then((data)=>{
            message.info(data.data.message);
            this.props.searchReset();//删除后重置信息
        }).catch(()=>{
            message.info('删除失败，请联系管理员！');
        });

    }

}


export default TheTable