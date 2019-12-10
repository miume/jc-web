import React from "react";
import axios from "axios";
import {Table, message, Spin, Divider} from "antd";
import DeviceService from "./deviceService";
import DeviceMaintenance from "./deviceMaintenance"

class Device extends React.Component{
    constructor(props){
        super(props);
        this.column = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: '5%',
        },{
            title: '批次信息',
            dataIndex: 'batch',
            key: 'batch',
            width: '16%',
        },{
            title: '工序',
            dataIndex: 'ruleValue',
            key: 'ruleValue',
            width: '8%',
        },{
            title: '工序开始时间',
            dataIndex: 'startTime',
            key: 'startTime',
            width: '16.5%',
        },{
            title: '工序结束时间',
            dataIndex: 'endTime',
            key: 'endTime',
            width: '16.5%',
        },{
            title: '固定资产编码',
            dataIndex: 'fixedassetsCode',
            key: 'fixedassetsCode',
            width: '12%',
        },{
            title: '规格型号',
            dataIndex: 'specification',
            key: 'specification',
            width: '12%',
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render:(text,record)=>{
                return(
                    <span>
                        <DeviceService url={this.props.url} record={record}/>
                        <Divider type="vertical"/>
                        <DeviceMaintenance url={this.props.url} record={record}/>
                    </span>
                )
            }
        }]
    }

    render(){
        return(
            <span>
                <Table pagination={false} size="small" bordered  dataSource={this.props.deviceData} columns={this.column} rowKey={record=>record.index}/>
            </span>
        )
    }
}

export default Device