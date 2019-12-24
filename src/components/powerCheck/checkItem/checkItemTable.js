import React from 'react';
import {Divider, message, Popconfirm, Table} from "antd";
import AddModal from "./addModal";
import axios from "axios";

class CheckItemTable extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.pagination = {
            showSizeChanger: true,//是否可以改变 pageSize
            showTotal: (total) => `共${total}条记录`,//显示共几条记录
            pageSizeOptions: ["10", "20", "50", "100"]
        };
        this.columns = [{
            title:'序号',
            key:'index',
            dataIndex:'index',
            width: '10%'
        },{
            title:'点检站点',
            key:'siteName',
            dataIndex:'siteName',
            width: '10%'
        },{
            title:'地点',
            key:'place',
            dataIndex:'place',
            width: '10%'
        },{
            title:'设备名/点检项目',
            key:'checkItem',
            dataIndex:'checkItem',
            width: '20%'
        },{
            title:'点检内容',
            key:'checkContent',
            dataIndex:'checkContent',
            width: '15%'
        },{
            title:'输入类型',
            key:'dataType',
            dataIndex:'dataType',
            width: '10%',
            render: (text) => {
                return text ? '输入' : '勾选';
            }
        },{
            title:'频率',
            key:'frequency',
            dataIndex:'frequency',
            width: '10%'
        },{
            title:'操作',
            key:'code',
            dataIndex:'code',
            width: '15%',
            render: ((text,record) => {
                return (
                    <span>
                        <AddModal record={record} title={'编辑'} url={this.props.url} getTableParams={this.props.getTableParams}/>
                        <Divider type={"vertical"}/>
                        <Popconfirm title="确认删除?" onConfirm={()=> this.handleDelete(text)} okText="确定" cancelText="取消" >
                            <span className='blue'>删除</span>
                        </Popconfirm>
                    </span>
                )
            })
        }]
    }

    render() {
        let {data,selectedRowKeys,onSelectChange,handleTableChange} = this.props,
            rowSelection = {
                selectedRowKeys,
                onChange: onSelectChange,
            };
        this.pagination.total = data ? data.total : 0;
        return (
            <Table rowKey={record => record.code} rowSelection={rowSelection} columns={this.columns}
                   dataSource={data} pagination={this.pagination} onChange={handleTableChange}
                   bordered size={'small'}/>
        );
    }

    handleDelete(code) {
        axios({
            url:`${this.props.url.checkItem.delete}?id=${code}`,
            method:'Delete',
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then((data)=>{
            message.info(data.data.message);
            this.props.getTableParams(); //删除后重置信息
        }).catch(()=>{
            message.info('删除失败，请联系管理员！');
        });
    }
}

export default CheckItemTable;
