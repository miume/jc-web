import React from 'react';
import {Divider, message, Popconfirm, Table} from "antd";
import AddModal from "./add/addModal";
import axios from "axios";
import AddTableModal from "./tableAdd/addModal";

class CheckTemplateTable extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.columns = [{
            title:'序号',
            key:'index',
            dataIndex:'index',
            width: '5%'
        },{
            title:'点检站点',
            key:'siteName',
            dataIndex:'siteName',
            width: '15%'
        },{
            title:'模板名称',
            key:'modelName',
            dataIndex:'modelName',
            width: '15%'
        },{
            title:'点检频率',
            key:'frequency',
            dataIndex:'frequency',
            width: '15%'
        },{
            title:'编号',
            key:'batchNumber',
            dataIndex:'batchNumber',
            width: '15%'
        },{
            title:'生效日期',
            key:'effectiveDate',
            dataIndex:'effectiveDate',
            width: '20%'
        },{
            title:'操作',
            key:'code',
            dataIndex:'code',
            width: '15%',
            render: ((text,record) => {
                let {updateFlag,deleteFlag,addFlag} = this.props;
                return (
                    <span>
                        <AddModal record={record} flag={updateFlag} title={'编辑'} url={this.props.url} getTableParams={this.props.getTableParams}/>
                        {addFlag && updateFlag ? <Divider type="vertical" /> : ''}
                        <AddTableModal record={record} flag={addFlag} title={'新建点检'} url={this.props.url}/>
                        {addFlag && deleteFlag ? <Divider type="vertical" /> : ''}
                        <span className={deleteFlag ? '' : 'hide'}>
                            <Popconfirm title="确认删除?" onConfirm={()=> this.handleDelete(text)} okText="确定" cancelText="取消" >
                                <span className='blue'>删除</span>
                            </Popconfirm>
                        </span>
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
                   dataSource={data} pagination={this.props.pagination} onChange={handleTableChange}
                   bordered size={'small'}/>
        );
    }

    handleDelete(code) {
        axios({
            url:`${this.props.url.checkModel.delete}?id=${code}`,
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

export default CheckTemplateTable;
