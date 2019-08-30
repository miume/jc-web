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
        dataIndex: 'index',
        key: 'index',
        sorter: (a, b) => a.index - b.index,
        align:'center',
        width: '80px',
    },{
        title: '维修单号',
        dataIndex: 'deviceCode',
        key: 'deviceCode',
        align:'center',
        editable: 1,
        width: '100px',
    },{
        title: '设备名称',
        dataIndex: 'deviceName',
        key: 'deviceName',
        align:'center',
        editable: 1,
        width: '100px',
    },{
        title: '固定资产编号',
        dataIndex: 'fixedassetsCode',
        key: 'fixedassetsCode',
        align:'center',
        editable: 1,
        width: '150px',
    },{
        title: '紧急程度',
        dataIndex: 'emergeStatus',
        key: 'emergeStatus',
        align:'center',
        editable: 1,
        width: '100px',
    },{
        title: '申请时间',
        dataIndex: 'reportTime',
        key: 'reportTime',
        align:'center',
        editable: 1,
        width: '150px',
    },{
        title: '申请人',
        dataIndex: 'reportPeople',
        key: 'reportPeople',
        align:'center',
        editable: 1,
        width: '100px',
    },{
        title: '接单时间',
        dataIndex: 'receiveTime',
        key: 'receiveTime',
        align:'center',
        editable: 1,
        width: '150px',
    },{
        title: '接单人',
        dataIndex: 'receivePeople',
        key: 'receivePeople',
        align:'center',
        editable: 1,
        width: '100px',
    },{
        title: '操作',
        dataIndex: 'move',
        key: 'move',
        align:'center',
        width: '80px',
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
    //
    // dataSource=[{
    //     code:'1',
    //     deviceCode:'12345',
    //     deviceName:'xxx',
    //     fixedassetsCode:'s1234ddd',
    //     emergeStatus:'紧急',
    //     reportTime:"2019-8-8",
    //     receiveTime:'2019-8-9',
    //     reportPeople:'蔡徐坤',
    //     receivePeople:'吴亦凡',
    //     faultContent:'xxxxxxxxxxxxxxxx',
    //     receivePhone:'15678892436',
    // }]

    render(){
        return(
            <div>
                <Table
                    columns={this.columns}
                    pagination={this.props.pagination}
                    onChange={this.props.handleTableChange}
                    dataSource={this.props.rightTableData}
                    // dataSource={this.dataSource}
                    size="small"
                    bordered
                    scroll={{x: "1100px", y: 450 }}
                />
            </div>
        )
    };


}
export default TheTable