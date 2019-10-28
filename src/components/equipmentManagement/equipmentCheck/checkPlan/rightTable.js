import React from "react"
import {Table, Switch, message} from 'antd'

import DeleteSpan from "./deleteSpan"
import PlanSwitch from './planSwitch'
import axios from "axios";
import "./checkPlan.css"

class RightTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}


        this.handleDelete = this.handleDelete.bind(this)

    }

    handleDelete = (id) => {
        axios({
            url: `${this.props.url.SpotcheckPlan.deleteByCode}`,
            method: 'Delete',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params: {
                code: id
            }
        }).then((data) => {
            message.info(data.data.message);
            this.props.getTableData({
                deptId: this.props.deptCode,
                deviceName: this.props.deviceName,
            })
        }).catch(() => {
            message.info('删除失败，请联系管理员！');
        });
    }

    render() {
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            sorter: (a, b) => a.id - b.id,
            width: '7%',
        }, {
            title: '计划编号',
            dataIndex: 'modelCode',
            key: 'modelCode',
            width: '20%',
            align: 'left',
            editable: false
        }, {
            title: '设备编号',
            dataIndex: 'fixedassetsCode',
            key: 'fixedassetsCode',
            width: '20%',
            align: 'left',
            editable: true
        }, {
            title: '设备名称',
            dataIndex: 'deviceName',
            key: 'deviceName',
            width: '20%',
            align: 'left',
            editable: true
        }, {
            title: '点检计划状态',
            dataIndex: 'effFlag',
            key: 'effFlag',
            width: '20%',
            align: 'left',
            render: (text, record) => {
                return (
                    <PlanSwitch
                        url={this.props.url}
                        record = {record}
                        getTableData={this.props.getTableData}
                        deptCode={this.props.deptCode}
                        deviceName={this.props.deviceName}
                    />
                )
            }
        }, {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align: 'left',
            render: (text, record) => {
                return (
                    <span>
                    {/*<Detail deviceNumber={record.deviceNumber} devicename={record.deviceName}/>*/}
                        <DeleteSpan
                            code={record.code}
                            pagination={this.props.pagination}
                            handleDelete={this.handleDelete}
                            flag={record.detailNum}
                        />
                    </span>
                );
            }
        }]
        return (

            <div className="changeTable">
                <Table
                    dataSource={this.props.dataSource}
                    columns={this.columns}
                    pagination={this.props.pagination}
                    onChange={this.props.handleTableChange}
                    size="small"
                    bordered
                    scroll={{y: 450}}
                    rowKey={record => record.code}
                />
            </div>
        )
    }
}

export default RightTable