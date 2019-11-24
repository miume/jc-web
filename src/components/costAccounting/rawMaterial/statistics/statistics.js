import React from 'react';
import {Table} from "antd";
import Detail from './detail';

class Statistics extends React.Component {
    constructor(props) {
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
            width: '5%'
        }, {
            title: '周期类型',
            key: 'periodName',
            dataIndex: 'periodName',
            width: '7%'
        }, {
            title: '期数',
            key: 'periods',
            dataIndex: 'periods',
            width: '7%'
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
            title: '数据类别',
            key: 'dataType',
            dataIndex: 'dataType',
            width: '9%'
        }, {
            title: '物料名称',
            key: 'materialName',
            dataIndex: 'materialName',
            width: '9%'
        }, {
            title: '重量(T)',
            key: 'weight',
            dataIndex: 'weight',
            width: '9%'
        }, {
            title: 'Ni金属量(T)',
            key: 'NiMetallicity',
            dataIndex: 'NiMetallicity',
            width: '9%'
        }, {
            title: 'Co金属量(T)',
            key: 'CoMetallicity',
            dataIndex: 'CoMetallicity',
            width: '9%'
        }, {
            title: 'Mn金属量(T)',
            key: 'MnMetallicity',
            dataIndex: 'MnMetallicity',
            width: '9%'
        },{
            title: '操作',
            key: 'code',
            dataIndex: 'code',
            width: '5%',
            render: (text, record) => {
                return (
                    <Detail data={record}/>
                )
            }
        }]
    }

    render() {
        return (
            <Table columns={this.columns} rowKey={record => record.code}  pagination={this.pagination}
                   size={"small"} bordered dataSource={this.props.data}/>
        )
    }

    /**单条记录删除*/
    handleDelete(id) {

    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default Statistics;
