import React from 'react';
import {Table, message, Divider, Popconfirm} from 'antd';
import axios from "axios";
import AddModal from "./addaModal";

class ProcessTable extends React.Component{
    constructor(props){
        super(props)
        this.handleTableChange = this.handleTableChange.bind(this);
    }

    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        sorter: (a, b) => a.index - b.index,
        width: "20%",
    },{
        title: '名称',
        dataIndex: 'processName',
        key: 'processName',
        width: '40%',
    },{
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        width: '40%',
        render: (text, record) => {
            return (
                <span>
                    <AddModal
                        deptName={this.props.deptName}
                        deptId={record.deptCode}
                        url={this.props.url}
                        flag={true}
                        code = {record.code}
                        processName={record.processName}
                        getTableData={this.props.getTableData}
                    />
                    <Divider type="vertical" />
                    <Popconfirm
                        title="确认删除?"
                        onConfirm={() => this.handleDelete(record.code)}
                        okText="确定"
                        cancelText="取消" >
                        <span className='blue'>删除</span>
                    </Popconfirm>
                </span>
            )
        }
    }];
    /**rowKey={record => record.code}用于选定需要批量删除的数据的ID*/
    render() {
        return (
            <Table
                columns={this.columns}
                rowKey={record => record.code}
                pagination={this.props.pagination}
                rowSelection={this.props.rowSelection}
                dataSource={this.props.rightTableData}
                onChange={this.handleTableChange}
                size="small"
                bordered
            />
        );
    }
    handleDelete = (id) => {
        axios({
            url:`${this.props.url.equipmentProcessName.deptProcess}/${id}`,
            method:'Delete',
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then((data)=>{
            message.info(data.data.message);
            this.props.getTableData({
                deptId: this.props.deptId
            });
        }).catch(()=>{
            message.info('删除失败，请联系管理员！');
        });

    }

    fetch = () => {
    };


    handleTableChange = (page) => {
        const {pageChangeFlag} = this.props.pageChangeFlag;
        if (pageChangeFlag) {
            this.props.getTableData({
                id:parseInt(this.props.deptCode),
                page:page.current,
                size:page.pageSize,
                depName:this.props.deptName,
            })
        } else {
            this.props.getTableData({
                id:parseInt(this.props.deptCode),
                page:page.current,
                size:page.pageSize,
                depName:this.props.deptName,
            })
        }
    };
}

export  default ProcessTable
