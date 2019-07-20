import {Divider, Table} from 'antd';
import React from 'react'
import axios from 'axios'

import './style.css'
import DetailofMain from '../miniCompontent/detialofmaintance'
import EditorofMain from '../miniCompontent/editorofmain'

import index from "babel-plugin-import/src";

class ContentTable extends React.Component {
    url
    ob
    state={
        dataSource:[],
        isLoad:false,
        isMaintenanced:false,
        departmentname:'xascacasc',
    }
    ifMain =this.state.isMaintenanced;
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
        dataIndex: 'PlanName1',
        key: 'PlanName1',
        align: 'center',
        width: '10%',
    },{
        title: '保养周期',
        dataIndex: 'MaintenancePeriod',
        key: 'MaintenancePeriod',
        align: 'center',
        width: '10%',
    }, {
        title: '本计划执行日期',
        dataIndex: 'ImplementDate',
        key: 'ImplementDate',
        align: 'center',
        width: '17%',
    }, {
        title: '制定人',
        dataIndex: 'whomade',
        key: 'whomade',
        align: 'center',
        width: '10%',
    }, {
        title: '是否生效',
        dataIndex: 'Effective',
        key: 'Effective',
        align: 'center',
        width: '10%',
        render: (statusCode) => {
            if(statusCode===1)
                    return <span className="main-statu1">已生效</span>
               else
                    return <span className="main-statu2">已失效</span>
            }
    }, {
        title: '操作',
        dataIndex: 'code',
        key: 'code',
        align: 'center',
        width: '19%',
        render: (text,record) => {
            console.log(record)
            return (
                <span>
                    <EditorofMain
                        editorRecord={record}
                        departmente={this.state.departmentname}
                    />
                    <Divider type="vertical"/>
                    <DetailofMain/>
                </span>
            )
        }
    }]
componentDidMount() {
    this.getData();
}

    pagination = {
        total:this.state.dataSource.length,
        showSizeChanger: true,
        itemRender(current, type, originalElement){
            if (type === 'prev') {
                return <a>&nbsp;&nbsp;上一页&nbsp;&nbsp;</a>;
            }
            if (type === 'next') {
                return <a>&nbsp;&nbsp;下一页&nbsp;&nbsp;</a>;
            }
            return originalElement;
        },
        showTotal(total){
            return `共${total}条记录`
        },
    };
    getData=()=>{
        var data=[];
        for(var i=1;i<100;i++){
            data.push({
                index:i,
                deviceNameAndNum:`管道阀门/#0218`,
                MaintenancePeriod:30,
                PlanName1:'阀门保养',
                ImplementDate:'2017-02-18',
                whomade:'tom',
                Effective:1,            //1代表’已生效‘；
            });
        }
        this.setState({
            dataSource:data
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));

        return(
            <div>
                <Table
                    rowKey={record=>record.id}
                    align={"center"}
                    dataSource={this.state.dataSource}
                    columns={this.columns}
                    bordered
                    scroll={{y: 400}}
                    size="small"
                    pagination={this.pagination}
                />
            </div>
        )
    }
}

export default  ContentTable
