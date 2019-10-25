import React from "react";
import axios from "axios";
import {Table, message, Spin, Divider} from "antd";
import DeviceService from "./deviceService";
import DeviceMaintenance from "./deviceMaintenance"

class Instrument extends React.Component{
    url
    constructor(props){
        super(props);
        this.state={
            data : [{
                index:"1",
                batchNumber:"19M01001806TE4S",
                slot:"JH",
                startTime:"2019-01-01  12:30",
                endTime:"2019-01-01  12:30",
            }],
        }
        this.column = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            align:'center',
            width: '9%',
        },{
            title: '批次信息',
            dataIndex: 'batchNumber',
            key: 'batchNumber',
            align:'center',
            width: '19%',
        },{
            title: '合成槽号',
            dataIndex: 'slot',
            key: 'slot',
            align:'center',
            width: '15%',
        },{
            title: '工序开始时间',
            dataIndex: 'startTime',
            key: 'startTime',
            align:'center',
            width: '19%',
        },{
            title: '工序结束时间',
            dataIndex: 'endTime',
            key: 'endTime',
            align:'center',
            width: '19%',
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align:'center',
            width: '19%',
            render:(text,record)=>{
                return(
                    <span>
                        <DeviceService />
                        <Divider type="vertical"/>
                        <DeviceMaintenance />
                    </span>
                )
            }
        }]
    }

    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        return(
            <span>
                <Table pagination={false} size="small" bordered  dataSource={this.state.data} columns={this.column} rowKey={record=>record.index}/>
            </span>
        )
    }
}

export default Instrument