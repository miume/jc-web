import React from 'react';
import {Table} from "antd";
import Detail from './detail';
import Search from "../search";

class Statistics extends React.Component{
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
    constructor(props){
        super(props);
        this.state = {
            visible: false
        };
        this.handleDelete = this.handleDelete.bind(this);
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
            key: 'lineName',
            dataIndex: 'lineName',
            width: '10%'
        }, {
            title: '开始时间',
            key: 'start',
            dataIndex: 'start',
            width: '10%'
        }, {
            title: '结束时间',
            key: 'end',
            dataIndex: 'end',
            width: '10%'
        }, {
            title: '区域',
            key: 'region',
            dataIndex: 'region',
            width: '10%'
        }, {
            title: '小计',
            key: 'count',
            dataIndex: 'count',
            width: '10%'
        }, {
            title: '氨量(T)',
            key: 'ammonia',
            dataIndex: 'ammonia',
            width: '10%'
        }, {
            title: '碱量(T)',
            key: 'alkali',
            dataIndex: 'alkali',
            width: '10%'
        },{
            title: '操作',
            key: 'code',
            dataIndex: 'code',
            width: '10%',
            render: (text, record) => {
                return (
                    <Detail data={record}/>
                )
            }
        }]
    }

    render(){
        return(
            <span>
                {/* <Search flag={true}/>
                <div className='clear' ></div> */}
                <Table columns={this.columns} rowKey={record => record.code}  pagination={this.pagination}
                size={"small"} bordered dataSource={this.props.data}/>
            </span>
        )
    }
    /**单条记录删除*/
    handleDelete(id) {

    }
}

export default Statistics