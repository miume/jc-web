import React from 'react';
import axios from 'axios';
import {Table} from 'antd';
import Detail from "./MaintdetailModal"

class MaintenanceModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: []
        };

    }
    url=JSON.parse(localStorage.getItem('url'));
    columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            sorter: (a, b) => a.index - b.index,
            align:'center',
            width:"6%"
        },
        {
            title: '保养单号',
            dataIndex: 'plancode',
            key: 'plancode',
            align:'center',
            width:'8%',

        }, {
            title: '本次计划执行日期',
            key: 'planDate',
            align:'center',
            dataIndex: 'planDate',
            width:"12%"
        },
        {
            title: '接单时间',
            key: 'receiveDate',
            dataIndex: 'receiveDate',
            width:"12%"
        },
        {
            title: '保养完成日期',
            sorter: (a, b) => a.deadline - b.deadline,
            key: 'finishiDate',
            dataIndex: 'finishiDate',
            align:'center',
            width:"12%",
        },
        {
            title: '保养人',
            key: 'maintPeople',
            dataIndex: 'maintPeople',
            align:'center',
            width:"10%",
        }, {
        title: '操作',
        dataIndex: 'code',
        key: 'code',
        align: 'center',
        width: '8%',
        render: (text, record) => {
            return (
                <Detail
                    record={record}
                    code={record.plancode}
                    url={this.url}
                />
            )
        }
    }];
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    handleClickDetail=(record)=>{
        console.log(record)
        const param=record.plancode;
        axios({
            url:this.url.eqMaintenanceQuery.recordDetail,
            method:"get",
            headers: {
                'Authorization': this.url.Authorization
            },
            params:{
                id:param,
            }
        }).then((data)=>{
            const result=data.data.data;
            console.log(result)
        })
        this.setState({
            visible: true,
        })
    }
    render() {
        return (
            <div style={{height: '500px'}}>
                <Table
                    dataSource={this.props.data}
                    columns={this.columns}
                    size="small"
                    bordered
                    scroll={{y: 400}}
                />
            </div>
        )

    }
}

export default MaintenanceModal