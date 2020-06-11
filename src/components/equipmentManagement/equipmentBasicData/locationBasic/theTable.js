import React from 'react';
import {Table, Input, InputNumber, Popconfirm, Form, Divider, message} from 'antd';
import axios from "axios";
import DeletaSpan from "./deleteModal";
import EditPart from "./editPart"

class TheTable extends React.Component{
    constructor(props){
        super(props)
        this.state={
            deptCode:'',
        }
        this.handleTableChange=this.handleTableChange.bind(this);
    }

    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        sorter: (a, b) => a.index - b.index,
        align:'center',
        width: "230px",
    },{
        title: '所属部门',
        dataIndex: 'deptName',
        key: 'deptName',
        align:'center',
        editable: 1,
        width: '20%',
    },{
        title: '位置',
        dataIndex: 'locationName',
        key: 'locationName',
        align:'center',
        editable: 1,
        width: '20%',
    },{
        title: 'ID号',
        dataIndex: 'idCode',
        key: 'idCode',
        align:'center',
        editable: 1,
        width: '21%',
    },{
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align:'center',
        editable: 1,
        width: '21%',
        render: (text, record) => {
            let {deleteFlag ,updateFlag}=this.props
            return (
                <div style={{display:'flex'}}>
                    <EditPart
                        url={this.props.url}
                        code={record.code}
                        locationName={record.locationName}
                        idCode={record.idCode}
                        deptName={this.props.deptName}
                        deptCode={this.props.deptCode}
                        getTableData={this.props.fetch}
                        pagination={this.props.pagination}
                        updateFlag={updateFlag}
                    />
                    {updateFlag&&deleteFlag?<Divider type='vertical'/>:''}
                    <DeletaSpan
                        url={this.props.url}
                        code={record.code}
                        handleDelete={this.handleDelete}
                        record={record}
                        flag={deleteFlag}
                    />
                </div>
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
                fixed='true'
                size="small"
                bordered
            />
        );
    }
    handleDelete = (id) => {
        axios({
            url:`${this.props.url.locationBasic.basicInfoLocation}/${id}`,
            method:'Delete',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                id:id,
            }
        }).then((data)=>{
            message.info(data.data.message);
            this.props.fetch();
        }).catch(()=>{
            message.info('删除失败，请联系管理员！');
        });

    }

    fetch = () => {
        /**flag为1时，将分页搜索位置0 */
        var params={
            id:this.props.deptCode,
            page:this.props.pagination.page,
            size:10,
            depName:this.props.deptName,
        }
        this.props.getTableData(params);
    };



    handleTableChange = (page) => {
        const {pageChangeFlag} = this.props.pageChangeFlag;
        if (pageChangeFlag) {
            this.props.getTableData({
                deptId:parseInt(this.props.deptCode),
                page:page.current,
                size:page.pageSize,
                depName:this.props.deptName,
            })
        } else {
            this.props.getTableData({
                deptId:parseInt(this.props.deptCode),
                page:page.current,
                size:page.pageSize,
                depName:this.props.deptName,
            })
        }
    };
}

export  default TheTable
