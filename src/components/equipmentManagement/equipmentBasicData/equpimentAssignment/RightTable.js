import React from 'react'
import {Table} from "antd";

class RightTable extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            sorter:(a,b) =>a.code-b.code,
            width:'6%',
        },{
            title:'所属部门',
            dataIndex: 'deptName' ,
            width: '13%',
        }, {
            title: '固定资产编号',
            dataIndex: 'fixedassetsCode',
            width: '13%',
        },{
            title: '设备名称',
            dataIndex: 'deviceName',
            width: '13%'
        }, {
            title: '规格型号',
            dataIndex: 'specification',
            width: '13%'
        },{
            title: 'ID卡号',
            dataIndex: 'idCode',
            width: '15%',
        },{
           title:'启动日期',
            dataIndex:'startDate',
            width:'15%'
        },{
            title:'设备状态',
            dataIndex:'status',
            width:'19%',
            render: (text, record) => {
                return(
                    <span>{text}&nbsp;&nbsp;<i style={{color: `${record.color}`}} className="fa fa-circle" aria-hidden="true"></i></span>
                )
            }
        }];

        return(
            <div>
            <Table
                columns={this.columns}
                bordered
                rowKey={record => record.code}
                dataSource={this.props.dataSource}
                size="small"
                pagination={this.props.pagination}
                onChange={this.props.handleTableChange}
                    />
            </div>
        )
    }
}
export  default  RightTable
