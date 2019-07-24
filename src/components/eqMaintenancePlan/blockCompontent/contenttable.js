import {Divider, Table,message} from 'antd';
import React from 'react'
import axios from 'axios'

import './style.css'
import DetailofMain from '../miniCompontent/detialofmaintance'
import EditorofMain from '../miniCompontent/editorofmain'

class ContentTable extends React.Component {
    url
    ob
    state={
        record:'',
    }
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        sorter: (a, b) => a.index - b.index,
        align: 'center',
        width: '7%',
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
        width: '10%',
    },{
        title: '保养周期',
        dataIndex: 'maintPeriod',
        key: 'maintPeriod',
        align: 'center',
        width: '10%',
    }, {
        title: '本计划执行日期',
        dataIndex: 'planDate',
        key: 'planDate',
        align: 'center',
        width: '17%',
    }, {
        title: '制定人',
        dataIndex: 'setPeople',
        key: 'setPeople',
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
                    return <span className="main-statu1">已生效</span>
               else
                    return <span className="main-statu2">已失效</span>
            }
    }, {
        title: '操作',
        dataIndex: 'whetherdelete',
        key: 'whetherdelete',
        align: 'center',
        width: '19%',
        render: (text,record) => {
            if(text){
                return (
                    <span>
                    <EditorofMain
                        editorRecord={record}
                        depCode={this.props.depCode}
                        depName={this.props.depName}
                        getMaintType={this.props.getMaintType}
                        getDepartmentData={this.props.getDepartmentData}
                        MaintenanceType={this.props.MaintenanceType}
                        Opt_type={this.props.Opt_type}
                        deviceName={this.props.deviceName}
                        getTableData={this.props.getTableData}
                        url={this.props.url}
                    />
                    <Divider type="vertical"/>
                    <DetailofMain
                        editorRecord={record}
                        url={this.props.url}
                        depCode={this.props.depCode}
                        depName={this.props.depName}
                        deviceName={this.props.deviceName}
                        getTableData={this.props.getTableData}
                    />
                    <Divider type="vertical"/>
                    <span>删除</span>
                    </span>)
                }
            else {
                return (
                    <span>
                    <EditorofMain
                        editorRecord={record}
                        depCode={this.props.depCode}
                        depName={this.props.depName}
                        getMaintType={this.props.getMaintType}
                        getDepartmentData={this.props.getDepartmentData}
                        MaintenanceType={this.props.MaintenanceType}
                        Opt_type={this.props.Opt_type}
                        deviceName={this.props.deviceName}
                        getTableData={this.props.getTableData}
                        url={this.props.url}
                    />
                    <Divider type="vertical"/>
                    <DetailofMain
                        url={this.props.url}
                        editorRecord={record}
                        depCode={this.props.depCode}
                        depName={this.props.depName}
                        deviceName={this.props.deviceName}
                        getTableData={this.props.getTableData}
                    />
                    <Divider type="vertical"/>
                    <span className="blue" onClick={()=>this.handleDel(record.code)} >删除</span>
                    </span>
                )
            }
        }
    }]
    onShowSizeChange=(current,size)=>{
        this.props.getTableSize(current,size)
    }
    handleTableChange=(page,pageSize)=>{
        console.log(pageSize)
        const params={
            deptId: this.props.depCode,
            statusId: this.props.statusId,
            condition:this.props.searchContent,
            page:page.current,
            depName:this.props.depName,
            size:this.props.size,
        }
        console.log(params)
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
            console.log(id);
            console.log(params)
            this.props.getTableData(params,this.props.depName)
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        return(
            <div>
                <Table
                    rowKey={record=>record.id}
                    align={"center"}
                    dataSource={this.props.dataSource}
                    columns={this.columns}
                    bordered
                    scroll={{y:380}}
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
