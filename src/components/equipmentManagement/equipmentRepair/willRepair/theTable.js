import React from 'react';
import {Table} from 'antd';
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
        dataIndex: 'emergeStatus',
        key: 'emergeStatus',
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

    // dataSource=[{
    //     code:'1',
    //     deviceCode:'12345',
    //     deviceName:'xxx',
    //     fixedassetsCode:'s1234ddd',
    //     emergeStatus:'紧急',
    //     reportTime:"2019-8-8",
    //     reportPeople:'蔡徐坤',
    //     faultContent:'xxxxxxxxxxxxxxxx',
    // }]
    render(){
        return(
            <div>
                <Table
                    rowKey={record => record.code}
                    columns={this.columns}
                    pagination={this.props.pagination}
                    onChange={this.props.handleTableChange}
                    dataSource={this.props.rightTableData}
                    size="small"
                    bordered
                />
            </div>
        )
    };
}
export default TheTable
