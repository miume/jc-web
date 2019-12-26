import React from 'react';
import {Table, message} from "antd";
import axios from 'axios';
import DeleteById from "../../../BlockQuote/deleteById";

class UnSubmitted extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.pagination = {
            showSizeChanger: true,//是否可以改变 pageSize
            showTotal: (total) => `共${total}条记录`,//显示共几条记录
            pageSizeOptions: ["10","20","50","100"]
        };
        this.columns = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            width: '10%'
        }, {
            title: '周期类型',
            key: 'name',
            dataIndex: 'name',
            width: '10%'
        }, {
            title: '期数',
            key: 'lineName',
            dataIndex: 'lineName',
            width: '20%'
        }, {
            title: '开始时间',
            key: 'startTime',
            dataIndex: 'startTime',
            width: '20%',
            sorter: (a,b) => a.startTime - b.startTime,
        }, {
            title: '结束时间',
            key: 'endTime',
            dataIndex: 'endTime',
            width: '20%'
        }, {
            title: '操作',
            key: 'code',
            dataIndex: 'code',
            width: '20%',
            render: (text) => {
                return (
                    <span>
                        <span className='blue' onClick={() => this.props.handleClick(text)}>编辑</span>
                        <DeleteById id={text} handleDelete={() => this.handleDelete(text)} flag={true}/>
                    </span>
                )
            }
        }]
    }

    render() {
        let {data} = this.props;
        this.pagination.total = data && data.total ? data.total : 0;
        return (
            <Table rowKey={record => record.code} dataSource={data}
                   columns={this.columns} pagination={this.pagination}
                   onChange={this.props.handleTableChange}
                   size={"small"} bordered/>
        )
    }

    /**单条记录删除*/
    handleDelete(id) {
        axios({
            url: `${this.props.url.rawMaterial.deleteById}?statisticCode=${id}`,
            method: 'DELETE',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then((data) => {
            message.info(data.data.message);
            this.props.handleTableChange(this.pagination);
        })
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default UnSubmitted;
