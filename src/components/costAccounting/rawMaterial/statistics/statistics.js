import React from 'react';
import {Table} from "antd";
import Detail from './detail';

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.pagination = {
            showSizeChanger: true,//是否可以改变 pageSize
            showTotal: (total) => `共${total}条记录`,//显示共几条记录
            pageSizeOptions: ["10","20","50","100"]
        };
        this.columns = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            sorter: (a,b) => a.index - b.index,
            width: '5%'
        }, {
            title: '周期类型',
            key: 'headDTO.name',
            dataIndex: 'headDTO.name',
            width: '7%'
        }, {
            title: '期数',
            key: 'headDTO.lineName',
            dataIndex: 'headDTO.lineName',
            width: '7%'
        }, {
            title: '开始时间',
            key: 'headDTO.startTime',
            dataIndex: 'headDTO.startTime',
            width: '10%'
        }, {
            title: '结束时间',
            key: 'headDTO.endTime',
            dataIndex: 'headDTO.endTime',
            width: '10%'
        }, {
            title: '数据类别',
            key: 'materialTypeName',
            dataIndex: 'materialTypeName',
            width: '9%'
        }, {
            title: '物料名称',
            key: 'data.materialTypeName',
            dataIndex: 'data.materialTypeName',
            width: '9%'
        }, {
            title: '重量(T)',
            key: 'data.totals',
            dataIndex: 'data.totals',
            width: '9%'
        }, {
            title: 'Ni金属量(T)',
            key: 'data.niValue',
            dataIndex: 'data.niValue',
            width: '9%'
        }, {
            title: 'Co金属量(T)',
            key: 'data.coValue',
            dataIndex: 'data.coValue',
            width: '9%'
        }, {
            title: 'Mn金属量(T)',
            key: 'data.mnValue',
            dataIndex: 'data.mnValue',
            width: '9%'
        },{
            title: '操作',
            key: 'data.materialTypeCode',
            dataIndex: 'data.materialTypeCode',
            width: '5%',
            render: (text, record) => {
                return (
                    <Detail url={this.props.url} head={record.headDTO} materialTypeCode={text} statisticCode={record.headDTO.code}/>
                )
            }
        }]
    }

    render() {
        let {data} = this.props;
        this.pagination.total = data && data.total ? data.total : 0;
        return (
            <Table columns={this.columns} rowKey={record => record.data.code} pagination={this.pagination}
                   size={"small"} bordered dataSource={data} onChange={this.props.handleTableChange}/>
        )
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default Statistics;
