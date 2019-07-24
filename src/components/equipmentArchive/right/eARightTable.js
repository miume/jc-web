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
import Edit from '../table/edit'
import Add from "./add";
import EARightBottom from "./eARightBottom";

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
        width: '15%',
    }, {
        title: '部件名称',
        dataIndex: 'deviceName',
        key: 'deviceName',
        align: 'center',
        width: '15%',
    }, {
        title: '规格型号',
        dataIndex: 'specification',
        key: 'specification',
        align: 'center',
        width: '15%',
    }, {
        title: '启动日期',
        dataIndex: 'startdate',
        key: 'startdate',
        align: 'center',
        width: '15%',
    }, {
        title: '操作',
        dataIndex: 'code',
        key: 'code',
        align: 'center',
        width: '25%',
        render: (text, record) => {
            return (
                <span>
                    <Fittings
                        comFlag={true}
                        record={record}
                        url={this.props.url}
                        depCode={this.props.depCode}
                    />
                    <Divider type="vertical"/>
                    <Maintenance/>
                    <Divider type="vertical"/>
                    <Repair/>
                    <Divider type="vertical"/>
                    <Details
                        record={record}
                        url={this.props.url}
                        comFlag={true}
                    />
                    <Divider type="vertical"/>
                    <Edit
                        // deviceName={this.props.deviceName}
                        // getRightData={this.props.getRightData}
                        url={this.props.url}
                        comFlag={true}
                        record={record}
                        // getTableData={this.props.getTableData}
                        depCode={this.props.depCode}
                        fetch={this.props.fetch}
                    />
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
        width: '8%',
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
        width: '10%',
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
        width: '11%',
        render: (text, record) => {
            return(
                <span>{record.name}&nbsp;&nbsp;<i style={{color: `${record.color}`}} className="fa fa-circle" aria-hidden="true"></i></span>
            )
        }
    }, {
        title: '操作',
        dataIndex: 'code',
        key: 'code',
        align: 'center',
        width: '28%',
        render: (text, record) => {
            return (
                <span>
                    <EqComponent
                        comFlag={true}
                        record={record}
                        url={this.props.url}
                        depCode={this.props.depCode}
                    />
                    <Divider type="vertical"/>
                    <Fittings
                        record={record}
                        url={this.props.url}
                        depCode={this.props.depCode}
                    />
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
                    <Edit
                        deviceName={this.props.deviceName}
                        getRightData={this.props.getRightData}
                        url={this.props.url}
                        record={record}
                        getTableData={this.props.getTableData}
                        depCode={this.props.depCode}
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
                    scroll={{y: 360}}

                    onChange={this.props.handleTableChange}
                    pagination={this.props.pagination}
                />
            </div>
        )
    }

    handleDelete = (code) => {
        if(this.props.comFlag){
            axios({
                url: `${this.props.url.eqMaintenanceQuery.recordDelete}`,
                method: 'Delete',
                headers: {
                    'Authorization': this.props.url.Authorization
                },
                params:{
                    code:code
                }
            }).then((data) => {
                message.info(data.data.message);
                this.props.fetch({},{})
            }).catch(() => {
                message.info('删除失败，请联系管理员！');
            });
        }else{
            axios({
                url: `${this.props.url.eqMaintenanceQuery.recordDelete}/${code}`,
                method: 'Delete',
                headers: {
                    'Authorization': this.props.url.Authorization
                },
            }).then((data) => {
                message.info(data.data.message);
                this.props.getRightData(this.props.depCode, this.props.deviceName)
            }).catch(() => {
                message.info('删除失败，请联系管理员！');
            });
        }
    }
}

export default EARightTable