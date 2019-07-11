import React, {Component} from 'react';
import {Table, Icon, Divider, message} from 'antd';
import '../equipmentArchive.css'
import EqComponent from '../table/eqComponent'
import Fittings from '../table/fittings'
import Delete from '../table/delete'
import Details from '../table/details'
import Maintenance from '../table/maintenance'
import Repair from '../table/repair'
import axios from "axios";

class EARightTable extends Component {
    constructor(props) {
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
    }

    columns = this.props.comFlag ? [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        sorter: (a, b) => a.index - b.index,
        align: 'center',
        width: '8%',
    }, {
        title: '固定资产编码',
        dataIndex: 'fixedassetsCode',
        key: 'fixedassetsCode',
        align: 'center',
        width: '13%',
    }, {
        title: '部件名称',
        dataIndex: 'deviceName',
        key: 'deviceName',
        align: 'center',
        width: '10%',
    }, {
        title: '规格型号',
        dataIndex: 'specification',
        key: 'specification',
        align: 'center',
        width: '10%',
    }, {
        title: 'ID卡号',
        dataIndex: 'idCode',
        key: 'idCode',
        align: 'center',
        width: '13%',
    }, {
        title: '启动日期',
        dataIndex: 'startdate',
        key: 'startdate',
        align: 'center',
        width: '10%',
    }, {
        title: '操作',
        dataIndex: 'code',
        key: 'code',
        align: 'center',
        width: '30%',
        render: (text, record) => {
            return (
                <span>
                    <EqComponent/>
                    <Divider type="vertical"/>
                    <Fittings/>
                    <Divider type="vertical"/>
                    <Maintenance/>
                    <Divider type="vertical"/>
                    <Repair/>
                    <Divider type="vertical"/>
                    <Details/>
                    <Delete
                        record={record}
                        flag={true}
                        // flag={this.props.judgeOperation(this.props.operation,'DELETE')}
                        handleDelete={this.handleDelete}
                    />
                </span>
            )
        }
    }] : [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        sorter: (a, b) => a.index - b.index,
        align: 'center',
        width: '6%',
    }, {
        title: '固定资产编码',
        dataIndex: 'fixedassetsCode',
        key: 'fixedassetsCode',
        align: 'center',
        width: '10%',
    }, {
        title: this.props.comFlag ? '部件名称' : '设备名称',
        dataIndex: 'deviceName',
        key: 'deviceName',
        align: 'center',
        width: '8%',
    }, {
        title: '规格型号',
        dataIndex: 'specification',
        key: 'specification',
        align: 'center',
        width: '9%',
    }, {
        title: 'ID卡号',
        dataIndex: 'idCode',
        key: 'idCode',
        align: 'center',
        width: '10%',
    }, {
        title: '启动日期',
        dataIndex: 'startdate',
        key: 'startdate',
        align: 'center',
        width: '10%',
    }, {
        title: '设备状态',
        dataIndex: 'statusCode',
        key: 'statusCode',
        align: 'center',
        width: '13%',
        render: statusCode => {
            switch (statusCode) {
                case 0:
                    return <span className="eq-statu1">状况1&nbsp;&nbsp;<i className="fa fa-circle" aria-hidden="true"></i></span>
                case 1:
                    return <span className="eq-statu2">状况2&nbsp;&nbsp;<i className="fa fa-circle" aria-hidden="true"></i></span>
                case 2:
                    return <span className="eq-statu3">状况3&nbsp;&nbsp;<i className="fa fa-circle" aria-hidden="true"></i></span>
                default:
                    return <span className="eq-statu4">状况4&nbsp;&nbsp;<i className="fa fa-circle" aria-hidden="true"></i></span>
            }
        },
    }, {
        title: '操作',
        dataIndex: 'code',
        key: 'code',
        align: 'center',
        width: '28%',
        render: (text, record) => {
            return (
                <span>
                    <EqComponent/>
                    <Divider type="vertical"/>
                    <Fittings/>
                    <Divider type="vertical"/>
                    <Maintenance/>
                    <Divider type="vertical"/>
                    <Repair/>
                    <Divider type="vertical"/>
                    <Details
                        record={record}
                        url={this.props.url}
                    />
                    <Divider type="vertical"/>
                    <Details
                        url={this.props.url}
                        editFlag={false}
                        name ="编辑"
                    />
                    <Delete
                        url={this.props.url}
                        record={record}
                        flag={true}
                        // flag={this.props.judgeOperation(this.props.operation,'DELETE')}
                        handleDelete={this.handleDelete}
                    />
                </span>
            )
        }
    }];

    render() {
        return (
            <div className="eA-right-bottom">
                <Table
                    rowKey={record => record.code}
                    rowSelection={this.props.rowSelection}
                    dataSource={this.props.dataSource}
                    columns={this.columns}
                    size="small"
                    bordered
                    scroll={{y: 400}}
                />
            </div>
        )
    }
    handleDelete = (code) => {
        axios({
            url:`${this.props.url.equipmentArchive.device}/${code}`,
            method:'Delete',
            headers:{
                'Authorization':this.props.url.Authorization
            },
        }).then((data)=>{
            message.info(data.data.message);
            this.props.getTableData(this.props.depCode,this.props.deviceName)
        }).catch(()=>{
            message.info('删除失败，请联系管理员！');
        });
    }
}

export default EARightTable