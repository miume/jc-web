import React from "react"
import {Divider, Popconfirm, Table} from 'antd'
import TabBar from "antd/lib/tabs/TabBar";
import Mmodal from "../eqMaintenanceDataEntry/mmodal";
import home from "../commom/fns";
import Detail from "./detail"
import SeDetail from './seDetail'
class SeTable extends React.Component{
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
        },{ title: '点检时间',
            dataIndex: 'checktime' ,
            key: 'devicenumber',
            width: '19%',
            align:'left',
            editable: false
        }, {
            title: '点检人',
            dataIndex: 'checkname',
            key:  'checkname',
            width: '13%',
            align:'left',
            editable: true
        },{
            title: '确认时间',
            dataIndex: 'confirmtime',
            key: 'confirmtime',
            width: '19%',
            align:'left',
            editable: true
        }, {
            title: "确认人",
            dataIndex: 'confirmpeople',
            key: 'confirmpeople',
            width: '13%',
            align: 'left',
        },{
            title: "状态",
            dataIndex: 'satausCode',
            key: 'statusCode',
            width: '13%',
            align: 'left',
            render: (text, record) => {
                return(
                    <span>{record.name}&nbsp;&nbsp;
                        <i style={{color: `${record.color}`}} className="fa fa-circle" aria-hidden="true">

                        </i></span>
                )
            }
        },{
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                align: 'left',
                render: (text, record) => {
                    return (
                        <SeDetail />
                    );
                }
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
export default SeTable