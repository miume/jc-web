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
            sorter:(a,b) =>a.id-b.id,
            width:'10%',
        },{ title:'所属部门',
            dataIndex: 'Deptcode' ,
            width: '13%',
            align:'left',
        }, {
            title: '固定资产编号',
            dataIndex: 'Fixedassetscode',
            width: '13%',
            align:'left',
        },{
            title: '设备名称',
            dataIndex: 'Devicename',
            width: '13%',
            align:'left',
            editable: true
        }, {
            title: '规格型号',
            dataIndex: 'specification',
            width: '13%',
            align:'left',
        },{
            title: 'ID卡号',
            dataIndex: 'IDcode',
            width: '15%',
            align:'left',
        },{
           title:'启动日期',
            dataIndex:'startdate',
            width:'15%',
            align:'left',
        },{
            title:'设备状态',
            dataIndex:'status',
            width:'left',
            align:'left',
            render: (text, record) => {
                return(
                    <span>{record.name}&nbsp;&nbsp;<i style={{color: `${record.color}`}} className="fa fa-circle" aria-hidden="true"></i></span>
                )
            }
        }]

        return(
            <div>
            <Table
                columns={this.columns}
                bordered
                dataSource={this.props.DataSource}
                size="small"
                style={{paddingTop:'5px'}}
                pagination={this.props.pagination}
                onChange={this.props.handleTableChange}
                    />
            </div>
        )
    }
}
export  default  RightTable
