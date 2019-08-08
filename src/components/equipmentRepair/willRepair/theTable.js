import React from 'react';
import {Table, Input, InputNumber, Popconfirm, Form, Divider, message, Modal} from 'antd';
import axios from "axios";
import CancleButton from "../../BlockQuote/cancleButton";
import home from "../../commom/fns";
import DetailModal from "./detailModal";

class TheTable extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
    }

    columns = [{
        title: '序号',
        dataIndex: 'code',
        key: 'code',
        sorter: (a, b) => a.index - b.index,
        align:'center',
        width: '10%',
    },{
        title: '维修单号',
        dataIndex: 'deviceCode',
        key: 'deviceCode',
        align:'center',
        editable: 1,
        width: '10%',
    },{
        title: '设备名称',
        dataIndex: 'deviceName',
        key: 'deviceName',
        align:'center',
        editable: 1,
        width: '10%',
    },{
        title: '固定资产编号',
        dataIndex: 'fixedassetsCode',
        key: 'fixedassetsCode',
        align:'center',
        editable: 1,
        width: '15%',
    },{
        title: '紧急程度',
        dataIndex: 'faultContent',
        key: 'faultContent',
        align:'center',
        editable: 1,
        width: '10%',
    },{
        title: '申请时间',
        dataIndex: 'reportTime',
        key: 'reportTime',
        align:'center',
        editable: 1,
        width: '15%',
    },{
        title: '申请人',
        dataIndex: 'reportPeople',
        key: 'reportPeople',
        align:'center',
        editable: 1,
        width: '10%',
    },{
        title: '操作',
        dataIndex: 'move',
        key: 'move',
        align:'center',
        width: '10%',
        render: (text, record) =>{
            return(
                <div>
                    <DetailModal
                        record={record}
                        url={this.props.url}
                        code={record.code}
                        rightTableData={this.props.rightTableData}
                    />
                </div>
            )
        }
    }]
    render(){
        return(
            <div>
                <Table
                    columns={this.columns}
                    dataSource={this.props.rightTableData}
                    size="small"
                    bordered
                    scroll={{ y: 450 }}
                />
            </div>
        )
    };


}
export default TheTable