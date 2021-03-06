import React, {Component} from 'react';
import {Divider, message, Table} from 'antd';
import '../eqcomponentSearch.css'
import EqComponent from '../table/eqComponent'
import Fittings from '../table/fittings'
import Delete from '../table/delete'
import Details from '../table/details'
import Maintenance from '../table/maintenance'
import Repair from '../table/repair'
import axios from "axios";
import Edit from '../table/edit'

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
            let {updateFlag,deleteFlag}=this.props
            return (
                <span>
                    <Fittings
                        comFlag={true}
                        record={record}
                        url={this.props.url}
                        depCode={this.props.depCode}
                    />
                    <Divider type="vertical"/>
                    <Details
                        record={record}
                        url={this.props.url}
                        comFlag={true}
                    />
                    {updateFlag||deleteFlag?<Divider type='vertical'/>:''}
                    <Edit
                        url={this.props.url}
                        comFlag={true}
                        record={record}
                        depCode={this.props.depCode}
                        fetch={this.props.fetch}
                        updateFlag={updateFlag}
                    />
                    {updateFlag&&deleteFlag?<Divider type='vertical'/>:''}
                    <Delete
                        record={record}
                        flag={true}
                        handleDelete={this.handleDelete}
                        flag={deleteFlag}
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
            let {updateFlag,deleteFlag}=this.props
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
                    {updateFlag||deleteFlag?<Divider type='vertical'/>:''}
                    <Edit
                        deviceName={this.props.deviceName}
                        getRightData={this.props.getRightData}
                        url={this.props.url}
                        record={record}
                        getTableData={this.props.getTableData}
                        depCode={this.props.depCode}
                        updateFlag={updateFlag}
                    />
                    {updateFlag&&deleteFlag?<Divider type='vertical'/>:''}
                    <Delete
                        url={this.props.url}
                        record={record}
                        flag={deleteFlag}
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
                    onChange={this.props.handleTableChange}
                    pagination={this.props.pagination}
                />
            </div>
        )
    }

    handleDelete = (code) => {
        if(this.props.comFlag){
            axios({
                url: `${this.props.url.equipmentArchive.deleteUnit}`,
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
                url: `${this.props.url.equipmentArchive.device}/${code}`,
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
