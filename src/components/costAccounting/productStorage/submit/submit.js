import React from 'react';
import {Table} from "antd";
import DeleteById from "../../../BlockQuote/deleteById";
import Search from "../search";

class UnSubmitted extends React.Component {
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.pagination = {
            total: this.props.data.length,
            showSizeChanger: true,//是否可以改变 pageSize
            showTotal: (total) => `共${total}条记录`,//显示共几条记录
            pageSizeOptions: ["10","20","50","100"]
        };
        this.columns = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            sorter: (a,b) => a.code - b.code,
            width: '10%'
        }, {
            title: '周期类型',
            key: 'periodName',
            dataIndex: 'periodName',
            width: '10%'
        }, {
            title: '期数',
            key: 'head.lineName',
            dataIndex: 'head.lineName',
            width: '20%'
        }, {
            title: '开始时间',
            key: 'head.startTime',
            dataIndex: 'head.startTime',
            width: '20%'
        }, {
            title: '结束时间',
            key: 'head.endTime',
            dataIndex: 'head.endTime',
            width: '20%'
        }, {
            title: '操作',
            key: 'head.code',
            dataIndex: 'head.code',
            width: '20%',
            render: (text) => {
                return (
                    <span>
                        <span className='blue' onClick={() => this.props.handleClick(text)}>编辑</span>
                        <DeleteById id={text} handleDelete={this.handleDelete} flag={true}/>
                    </span>
                )
            }
        }]
    }

    render() {
        return (
            <Table rowKey={record => record.head.code} dataSource={this.props.data}
                   columns={this.columns} pagination={this.pagination}
                   onChange={this.handleTableChange}
                   size={"small"} bordered/>
        )
    }

    /**单条记录删除*/
    handleDelete(id) {

    }

    /**切换分页*/
    handleTableChange(pagination) {
        this.props.getUnSubmittedData('',{},pagination)
    }
}

export default UnSubmitted;
