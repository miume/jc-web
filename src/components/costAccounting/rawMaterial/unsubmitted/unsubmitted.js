import React from 'react';
import axios from 'axios';
import {Table} from "antd";
import DeleteById from "../../../BlockQuote/deleteById";

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
            render: (text, record) => {
                return (
                    <span>
                        <span className='blue' onClick={() => this.props.handleClick(record)}>编辑</span>
                        <DeleteById id={text} handleDelete={this.handleDelete} flag={true}/>
                    </span>
                )
            }
        }]
    }

    render() {
        return (
            <Table rowKey={record => record.code} dataSource={this.props.data}
                   columns={this.columns} pagination={this.props.pagination}
                   onChange={this.props.handleTableChange}
                   size={"small"} bordered/>
        )
    }

    /**单条记录删除*/
    handleDelete(id) {
    //     axios({
    //         url: `${this.props.url.rawMaterial.delete}/id=${id}`,
    //         method: 'DELETE',
    //         headers: {
    //             Authorizaion: this.props.url.Authorizaion
    //         }
    //     }).then((data) => {
    //
    //     })
    }
}

export default UnSubmitted;
