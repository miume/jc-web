import React from 'react';
import {Divider, message, Popconfirm, Table} from "antd";
import AddModal from "./add/addModal";
import axios from "axios";

class PowerCheckTable extends React.Component {
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
            title:'点检名称',
            key:'name',
            dataIndex:'name',
            width: '10%'
        },{
            title:'点检站点',
            key:'place',
            dataIndex:'place',
            width: '10%'
        },{
            title:'点检日期',
            key:'date',
            dataIndex:'date',
            width: '20%'
        },{
            title:'录检人',
            key:'people',
            dataIndex:'people',
            width: '15%'
        },{
            title:'班次',
            key:'frequency',
            dataIndex:'frequency',
            width: '15%'
        },{
            title:'生效日期',
            key:'effectiveTime',
            dataIndex:'effectiveTime',
            width: '10%'
        },{
            title:'操作',
            key:'code',
            dataIndex:'code',
            width: '15%',
            render: ((text,record) => {
                return (
                    <span>
                        <AddModal record={record} title={'编辑'}/>
                        <Divider type={"vertical"}/>
                        <Popconfirm title="确认删除?" onConfirm={()=> this.handleDelete(text)} okText="确定" cancelText="取消" >
                            <span className='blue'>删除</span>
                        </Popconfirm>
                        <Divider type={'vertical'}/>
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
        return (
            <Table rowKey={record => record.code} rowSelection={rowSelection} columns={this.columns}
                   dataSource={data} pagination={this.pagination} onChange={handleTableChange}
                   bordered size={'small'}/>
        );
    }

    handleDelete(code) {
        console.log(code)
        // axios({
        //     url:`${this.props.url.eqMaintenanceQuery.recordDelete}/${id}`,
        //     method:'Delete',
        //     headers:{
        //         'Authorization':this.props.url.Authorization
        //     }
        // }).then((data)=>{
        //     message.info(data.data.message);
        //     this.props.getTableData(); //删除后重置信息
        // }).catch(()=>{
        //     message.info('删除失败，请联系管理员！');
        // });
    }
}

export default PowerCheckTable;
