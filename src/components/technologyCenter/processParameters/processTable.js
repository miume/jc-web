import React from 'react';
import axios from 'axios';
import {Divider, Table, message, Popconfirm} from "antd";
import DeleteById from "../../BlockQuote/deleteById";
import DetailModal from "./detail/detailModal";

class ProcessTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            head: {}
        };
        this.publish = this.publish.bind(this);
        this.judgeOperation = this.judgeOperation.bind(this);
        this.judgeEditor = this.judgeEditor.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.pagination = {
            showSizeChanger: true,//是否可以改变 pageSize
            showTotal: (total) => `共${total}条记录`,//显示共几条记录
            pageSizeOptions: ["10","20","50","100"]
        };
        this.columns = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            sorter: (a,b) => a.code - b.code,
            width: '5%'
        }, {
            title: '编号',
            key: 'processNum',
            dataIndex: 'processNum',
            width: '9%'
        }, {
            title: '使用车间',
            key: 'deptName',
            dataIndex: 'deptName',
            width: '9%'
        }, {
            title: '工序',
            key: 'processName',
            dataIndex: 'processName',
            width: '9%'
        }, {
            title: '生效日期',
            key: 'effectiveDate',
            dataIndex: 'effectiveDate',
            width: '14%'
        }, {
            title: '失效日期',
            key: 'expiryDate',
            dataIndex: 'expiryDate',
            width: '14%'
        }, {
            title: '编制人',
            key: 'prepareName',
            dataIndex: 'prepareName',
            width: '12%'
        }, {
            title: '编制时间',
            key: 'dateOfFiling',
            dataIndex: 'dateOfFiling',
            width: '14%'
        }, {
            title: '操作',
            key: 'code',
            dataIndex: 'code',
            render: (text, record) => {
                let {update,deleteFlag,status,url} = this.props;
                return (
                    this.judgeOperation(status,update,deleteFlag,record.code,url)
                )
            }
        }]
    }

    render() {
        let {data,selectedRowKeys,status} = this.props,
            rowSelection = {
            selectedRowKeys: selectedRowKeys,
            onChange:this.props.onSelectChange,
        };
        this.pagination.total = data ? data['total'] : 0;
        return (
            status === '0' ?
                <Table rowKey={record => record.code} dataSource={data}
                   columns={this.columns} pagination={this.pagination}
                   onChange={this.handleTableChange} rowSelection={rowSelection}
                   size={"small"} bordered/> :
                <Table rowKey={record => record.code} dataSource={data}
                       columns={this.columns} pagination={this.pagination}
                       onChange={this.handleTableChange}
                       size={"small"} bordered/>
        )
    }

    /**根据不同tabs页面渲染不同操作*/
    judgeOperation(status,update,deleteFlag,code,url) {
        //待审核和审核中 已驳回
        if(status === '1' || status === '2' || status === '4' ) {
            return (
                <DetailModal code={code} url={url} status={status}/>
            )
        }
        //已通过
        if(status === '3' ) {
            return (
                <span>
                    <Popconfirm title="确认发布?" onConfirm={() => this.publish(code)} okText="确定" cancelText="取消" >
                        <span className='blue'>发布</span>
                    </Popconfirm>
                    <Divider type='vertical'/>
                    <DetailModal code={code} url={url} status={status}/>
                </span>
            )
        }
        //已发布
        if(status === '5') {
            return (
                <span>
                    <DetailModal code={code} url={url} status={status}/>
                    <Divider type='vertical'/>
                    <span className={'blue'} onClick={() =>this.props.handleAdd(code)}>复制新建</span>
                </span>
            )
        }
        //未提交
        return (
            <span>
                {this.judgeEditor(update,code)}
                <DeleteById id={code} handleDelete={this.handleDelete} flag={deleteFlag}/>
            </span>
        )
    }

    /**判断编辑操作*/
    judgeEditor(flag,code) {
        return (
            <span className={flag?'':'hide'}>
                <span className={'blue'} onClick={() =>this.props.handleAdd(code)}>编辑</span>
            </span>
        )
    }

    /**单条记录删除*/
    handleDelete(id) {
        axios({
            url: `${this.props.url.processParam.delete}/${id}`,
            method: 'DELETE',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then((data) => {
            message.info(data.data.message);
            this.props.fetch();
        })
    }

    /**发布*/
    publish(code) {
        axios({
            url: `${this.props.url.processParam.publish}?id=${code}`,
            method: 'put',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then((data) => {
            message.info(data.data.message);
            this.props.fetch();
        })
    }

    /**切换分页*/
    handleTableChange(pagination) {
        this.pagination = pagination;
        this.props.fetch(pagination);
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default ProcessTable;
