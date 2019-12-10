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
        this.pagination = {
            total: this.props.data.total,
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
            key: 'periodName',
            dataIndex: 'periodName',
            width: '10%'
        }, {
            title: '期数',
            key: 'head.periods',
            dataIndex: 'head.periods',
            width: '10%'
        }, {
            title: '开始时间',
            key: 'head.startTime',
            dataIndex: 'head.startTime',
            width: '10%'
        }, {
            title: '结束时间',
            key: 'head.endTime',
            dataIndex: 'head.endTime',
            width: '10%'
        }, {
            title: '区域',
            key: 'processName',
            dataIndex: 'processName',
            width: '10%'
        }, {
            title: '小计',
            key: 'processTotal.totals',
            dataIndex: 'processTotal.totals',
            width: '10%'
        }, {
            title: '氨量(T)',
            key: 'processTotal.ammoniaValue',
            dataIndex: 'processTotal.ammoniaValue',
            width: '10%'
        }, {
            title: '碱量(T)',
            key: 'processTotal.alkaliValue',
            dataIndex: 'processTotal.alkaliValue',
            width: '10%'
        },{
            title: '操作',
            key: 'processTotal.code',
            dataIndex: 'processTotal.code',
            width: '10%',
            render: (text, record) => {
                return (
                    <Detail data={record}/>
                )
            }
        }]
    }

    render() {
        return(
            <Table columns={this.columns} rowKey={record => record.index}  pagination={this.pagination}
                   size={"small"} bordered dataSource={this.props.data}/>
        )
    }
}

export default Statistics
