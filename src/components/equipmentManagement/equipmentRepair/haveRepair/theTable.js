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
        width: '80px',
    },{
        title: '维修单号',
        dataIndex: 'code',
        key: 'code',
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
        title: '完成时间',
        dataIndex: 'finishTime',
        key: 'finishTime',
        align:'center',
        editable: 1,
        width: '150px',
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
    //     faultContent:'漱口水电话福克斯大回馈粉丝低速回放活动房卡的很但是补发单号大饱口福很多事覅湖大铝框架和地理树回复打开VB凝聚法',
    //     faultReason:'漱口水电话福克斯大回馈粉丝低速回放活动房卡的很但是补发单号大饱口福很多事覅湖大铝框架和地理树回复打开VB凝聚法',
    //     receivePhone:'15678892436',
    //     finishTime:'2019-8-10',
    // }]
    render(){
        return(
            <div>
                <Table
                    columns={this.columns}
                    pagination={this.props.pagination}
                    onChange={this.props.handleTableChange}
                    dataSource={this.props.rightTableData}
                    rowKey={record => record.code}
                    size="small"
                    bordered
                    scroll={{x: "1260px"}}
                />
            </div>
        )
    };


}
export default TheTable
