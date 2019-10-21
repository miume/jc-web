import React from 'react';
import {Table} from "antd";
import Detail from './detail';

class Statistics extends React.Component {
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
            width: '7%'
        }, {
            title: '周期类型',
            key: 'periodName',
            dataIndex: 'index',
            width: '7%'
        }, {
            title: '期数',
            key: 'lineName',
            dataIndex: 'lineName',
            width: '7%'
        }, {
            title: '开始时间',
            key: 'start',
            dataIndex: 'start',
            width: '7%'
        }, {
            title: '结束时间',
            key: 'end',
            dataIndex: 'end',
            width: '7%'
        }, {
            title: '物料名称',
            key: 'materialName',
            dataIndex: 'materialName',
            width: '7%'
        }, {
            title: '重量(T)',
            key: 'weight',
            dataIndex: 'weight',
            width: '7%'
        }, {
            title: 'Ni浓度',
            key: 'NiConcentration',
            dataIndex: 'NiConcentration',
            width: '7%'
        }, {
            title: 'Co浓度',
            key: 'CoConcentration',
            dataIndex: 'CoConcentration',
            width: '7%'
        }, {
            title: 'Mn浓度',
            key: 'MnConcentration',
            dataIndex: 'MnConcentration',
            width: '7%'
        }, {
            title: 'Ni金属量(T)',
            key: 'NiMetallicity',
            dataIndex: 'NiMetallicity',
            width: '7%'
        }, {
            title: 'Co金属量(T)',
            key: 'CoMetallicity',
            dataIndex: 'CoMetallicity',
            width: '7%'
        }, {
            title: 'Mn金属量(T)',
            key: 'MnMetallicity',
            dataIndex: 'MnMetallicity',
            width: '7%'
        },{
            title: '操作',
            key: 'code',
            dataIndex: 'code',
            width: '20%',
            render: (text, record) => {
                const columns = this.columns.slice(5,13);
                return (
                    <Detail data={record} columns={columns}/>
                )
            }
        }]
    }

    render() {
        return (
            <Table columns={this.columns} rowKey={record => record.code}  pagination={this.pagination}
                   size={"small"} bordered scroll={{x: 1500}} dataSource={this.props.data}/>
        )
    }

    /**单条记录删除*/
    handleDelete(id) {

    }
}

export default Statistics;
