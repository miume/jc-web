import React from "react"
import {Divider, Popconfirm, Table} from 'antd'
import TabBar from "antd/lib/tabs/TabBar";
import Mmodal from "../eqMaintenanceDataEntry/mmodal";
import home from "../commom/fns";
import Detail from "./detail"
import "./checkQuery.css"
class FhTable extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        this.columns=[{
            title:'设备编号',
            dataIndex:'deviceNumber',
            key:'deviceNumber',
            width:'15%',
        },{ title: '设备名称',
            dataIndex: 'deviceName' ,
            key: 'deviceName',
            width: '19%',
            align:'left',
            editable: false
        }, {
            title: '点检时间',
            dataIndex: 'checkTime',
            key:  'checkTime',
            width: '13%',
            align:'left',
            editable: true
        },{
            title: '点检人',
            dataIndex: 'checkPeople',
            key: 'checkPeople',
            width: '19%',
            align:'left',
            editable: true
        }, {
            title: "确认时间",
            dataIndex: 'confirmTime',
            key: 'confirmTime',
            width: 'left',
            align: 'left',
        },{
            title: '确认人',
            dataIndex: 'confirmPeople',
            key: 'confirmPeople',
            width: '19%',
            align:'left',
        }]
        return(

            <Table
                className="checkQ-Table-top"
                columns={this.columns}
                dataSource={this.props.dataSource}
                onChange={this.props.handleTableChange}
                size="small"
                bordered
                scroll={{ y: 380 }}
            />
        )
    }
}
export default FhTable