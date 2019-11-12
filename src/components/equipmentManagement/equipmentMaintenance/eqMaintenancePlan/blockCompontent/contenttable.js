import {Divider, message, Popconfirm, Table} from 'antd';
import React from 'react'
import axios from 'axios'

import './style.css'
import DetailofMain from '../miniCompontent/detialofmaintance'
import EditorofMain from '../miniCompontent/editorofmain'

class ContentTable extends React.Component {
    url
    ob
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        sorter: (a, b) => a.index - b.index,
        align: 'center',
        width: '6%',
    },  {
        title: '设备名称/编号',
        dataIndex: 'deviceNameAndNum',
        key: 'deviceNameAndNum',
        align: 'center',
        width: '16%',
    }, {
        title: '计划名称',
        dataIndex: 'planName',
        key: 'planName',
        align: 'center',
        width: '17%',
    },{
        title: '保养周期',
        dataIndex: 'maintPeriod',
        key: 'maintPeriod',
        align: 'center',
        width: '9%',
    }, {
        title: '本计划执行日期',
        dataIndex: 'planDate',
        key: 'planDate',
        align: 'center',
        width: '17%',
    }, {
        title: '制定人',
        dataIndex: 'setPeopleName',
        key: 'setPeopleName',
        align: 'center',
        width: '10%',
    }, {
        title: '是否生效',
        dataIndex: 'effFlag',
        key: 'effFlag',
        align: 'center',
        width: '10%',
        render: (statusCode) => {
            if(statusCode===0)
                return <span className="main-statu1"><i style={{color: `\t#53FF53`}} className="fa fa-circle" aria-hidden="true"></i>&nbsp;已生效</span>
            else
                return <span className="main-statu2"><i style={{color: `\t#9D9D9D`}} className="fa fa-circle" aria-hidden="true"></i>已失效</span>
            }
    }, {
        title: '操作',
        dataIndex: 'whetherdelete',
        key: 'whetherdelete',
        align: 'center',
        width: '19%',
        render: (text,record) => {
            return (
                <span>
                <EditorofMain
                    editorRecord={record}
                    depCode={this.props.depCode}
                    getMaintType={this.props.getMaintType}
                    getDepartmentData={this.props.getDepartmentData}
                    MaintenanceType={this.props.MaintenanceType}
                    Opt_type={this.props.Opt_type}
                    deviceName={this.props.deviceName}
                    getTableData={this.props.getTableData}
                    url={this.props.url}
                    condition={this.props.condition}
                />
                <Divider type="vertical"/>
                <DetailofMain
                    url={this.props.url}
                    editorRecord={record}
                    depCode={this.props.depCode}
                    deviceName={this.props.deviceName}
                    getTableData={this.props.getTableData}
                />
                <Divider type="vertical"/>
                    {
                        text ?
                            <span>删除</span> :
                            <Popconfirm title="确认删除?" onConfirm={() =>this.handleDel(record.code)} okText="确定" cancelText="取消" >
                                <span className='blue'>删除</span>
                            </Popconfirm>
                    }
                </span>
            )
        }
    }]

    onShowSizeChange=(current,size)=>{
        this.props.getTableSize(current,size)
    }

    handleTableChange=(page)=>{
        const params={
            deptId: this.props.depCode,
            statusId: this.props.statusId,
            condition:this.props.searchContent,
            page:page.current,
            depName:this.props.depName,
            size:page.pageSize,
        }
        this.props.getTableData(params);
    }
    handleDel=(id)=>{
        axios({
            url:`${this.props.url.DeviceMaintenancePlan.maintenanceDeletePlan}${id}`,
            method:'delete',
            header:{
                'Authorization': this.url.Authorization,
            },
        }).then((data)=>{
            message.info(data.data.message);
            const params={
                deptId:this.props.depCode,
            }
            this.props.getTableData(params,this.props.depName)
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        return(
            <div>
                <Table
                    rowKey={record=>record.code}
                    align={"center"}
                    dataSource={this.props.dataSource}
                    columns={this.columns}
                    bordered
                    size="small"
                    onChange={this.handleTableChange}
                    onShowSizeChange={this.onShowSizeChange}
                    pagination={this.props.pagination}
                />
            </div>
        )
    }
}
export default  ContentTable
