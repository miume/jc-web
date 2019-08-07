import React from 'react';
import {Table} from 'antd';
import '../willMaintain.css';

//用于编写表格的显示样式

class InnerTable extends React.Component {
    constructor(props) {
        super(props)
    }
    columns = [
        {
            title: '保养单号',
            dataIndex: 'code',
            key: 'code',
            width: '20%',
            align:'center',
        },
        {
            title: '设备名称/编号',
            dataIndex: 'deviceName',
            key: 'deviceName',
            width: '20%',
            align:'center',
        },
        {
            title: '所属部门',
            dataIndex: 'deptCode',
            key: 'deptCode',
            width: '20%',
            align:'center',
        },
        {
            title: '本次计划执行日期',
            dataIndex: 'planDate',
            key: 'planDate',
            width: '20%',
            align:'center',
        },
    ];

    dataSource=[
        {
            key:'1',
            code: this.props.code,
            deviceName: this.props.deviceName,
            deptCode: this.props.deptCode,
            planDate: this.props.planDate,
        }
        ];
    render() {
        return (
            <div>
                <Table
                    dataSource={this.dataSource}
                    columns={this.columns}
                    size="small"
                    pagination={false}
                    bordered
                />
            </div>);
    }


}


export default InnerTable