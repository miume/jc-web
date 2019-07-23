import React from "react"
import {Divider, Popconfirm, Table} from 'antd'
import TabBar from "antd/lib/tabs/TabBar";
import Mmodal from "../eqMaintenanceDataEntry/mmodal";
import home from "../commom/fns";
import Detail from "./detail"
class CheckTable extends React.Component{
    constructor(props){
        super(props)
        this.state={
            selectedRowKeys : [],

        }
    }

    render(){
        const {selectedRowKeys,pagination} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange:this.onSelectChange,

        };




        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b) =>a.id-b.id,
            width:'5%',
        },{ title: '设备编号',
            dataIndex: 'devicenumber' ,
            key: 'devicenumber',
            width: '30%',
            align:'left',
            editable: false
        }, {
            title: '设备名称',
            dataIndex: 'devicename',
            key:  'devicename',
            width: '23%',
            align:'left',
            editable: true
        },{
            title: '所属车间',
            dataIndex: 'workshop',
            key: 'workshop',
            width: '23%',
            align:'left',
            editable: true
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align: 'left',
            render: (text, record) => {
                return (
                     <Detail />
                     );
                }
            }]
        return(







            <Table
                   rowSelection={rowSelection}
                   columns={this.columns}
                   dataSource={this.props.datasource}
                   onChange={this.props.handleTableChange}
                   size="small"
                   bordered
                   scroll={{ y: 380 }}

            />
        )
    }
}
export default CheckTable