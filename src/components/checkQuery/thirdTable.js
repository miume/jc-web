import React from "react"
import {Divider, Popconfirm, Table} from 'antd'
import TabBar from "antd/lib/tabs/TabBar";
import Mmodal from "../eqMaintenanceDataEntry/mmodal";
import home from "../commom/fns";
import Detail from "./detail"
import "./checkQuery.css"
class ThirdTable extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b) =>a.id-b.id,
            width:'5%',
        },{ title: '项目名称',
            dataIndex: 'spotcheckItems' ,
            key: 'spotcheckItems',
            width: '19%',
            align:'left',
            editable: false
        }, {
            title: '点检标准',
            dataIndex: 'spotcheckContent',
            key:  'spotcheckContent',
            width: '13%',
            align:'left',
            editable: true
        },{
            title: '点检结果',
            dataIndex: 'mainValues',
            key: 'mainValues',
            width: '19%',
            align:'left',
            editable: true
        }, {
            title: "不合格备注",
            dataIndex: 'mainContent',
            key: 'mainContent',
            width: 'left',
            align: 'left',
        }]
        return(

            <Table
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
export default ThirdTable