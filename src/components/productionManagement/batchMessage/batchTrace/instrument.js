import React from "react";
import axios from "axios";
import {Table, message, Spin, Divider} from "antd";
import InstrumentDetail from "./instrumentDetail"

class Instrument extends React.Component{
    constructor(props){
        super(props);
        this.column = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: '6%',
        },{
            title: '批次信息',
            dataIndex: 'batch',
            key: 'batch',
            width: '21%',
        },{
            title: '合成槽号',
            dataIndex: 'cellNum',
            key: 'cellNum',
            width: '15%',
        },{
            title: '工序开始时间',
            dataIndex: 'startTime',
            key: 'startTime',
            width: '22%',
        },{
            title: '工序结束时间',
            dataIndex: 'endTime',
            key: 'endTime',
            width: '22%',
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: '15%',
            render:(text,record)=>{
                return(
                    <span>
                        <InstrumentDetail instrumentCode={record.instrumentCode} url={this.props.url} record={record}/>
                    </span>
                )
            }
        }]
    }

    render(){
        return(
            <span>
                <Table pagination={false} size="small" bordered  dataSource={this.props.instrumentData} columns={this.column} rowKey={record=>record.code} scroll={{y:250}}/>
            </span>
        )
    }
}

export default Instrument