import React from 'react';
import {Divider, message, Popconfirm, Table} from "antd";
import AddModal from "../checkTemplate/tableAdd/addModal";
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
            key:'modelName',
            dataIndex:'modelName',
            width: '10%'
        },{
            title:'点检站点',
            key:'siteName',
            dataIndex:'siteName',
            width: '10%'
        },{
            title:'点检日期',
            key:'checkDate',
            dataIndex:'checkDate',
            width: '15%'
        },{
            title:'录检人',
            key:'operator',
            dataIndex:'operator',
            width: '10%'
        },{
            title:'班次',
            key:'classNum',
            dataIndex:'classNum',
            width: '10%'
        },{
            title:'生效日期',
            key:'effectiveDate',
            dataIndex:'effectiveDate',
            width: '15%'
        },{
            title:'操作',
            key:'code',
            dataIndex:'code',
            width: '20%',
            render: ((text,record) => {
                let status = record.status;
                return (
                    <span>
                        <AddModal record={record} title={'编辑'} status={status} url={this.props.url} handleCancel={this.props.getTableParams}/>
                        <Divider type={'vertical'}/>
                        <AddModal record={record} title={'详情'} disabled={true} url={this.props.url}/>
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
            url:`${this.props.url.checkRecord.delete}?id=${code}`,
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

export default PowerCheckTable;
