import React from 'react';
import axios from 'axios';
import {Table, Divider, message} from 'antd';
import AddModal from "./addModal";

class MaintenanceModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        sorter: (a, b) => a.index - b.index,
        align: 'center',
        width: '5%',
    }, {
        title: '工单状态',
        dataIndex: 'a',
        key: 'a',
        align: 'center',
        width: '8%',
    }, {
        title: '设备设施名称',
        dataIndex: 'b',
        key: 'b',
        align: 'center',
        width: '8%',
    }, {
        title: '单位/部门',
        dataIndex: 'c',
        key: 'c',
        align: 'center',
        width: '8%',
    }, {
        title: '所属生产线',
        dataIndex: 'd',
        key: 'd',
        align: 'center',
        width: '8%',
    }, {
        title: '报修人',
        dataIndex: 'e',
        key: 'e',
        align: 'center',
        width: '8%',
    }, {
        title: '报修时间',
        dataIndex: 'f',
        key: 'f',
        align: 'center',
        width: '15%',
        render:(time) => {
            return <span title={time} className='text-decoration'>{time.split(" ")[0]+'...'}</span>
        }
    }, {
        title: '接单时间',
        dataIndex: 'g',
        key: 'g',
        align: 'center',
        width: '15%',
        render:(time) => {
            return <span title={time} className='text-decoration'>{time.split(" ")[0]+'...'}</span>
        }
    }, {
        title: '完工时间',
        dataIndex: 'h',
        key: 'h',
        align: 'center',
        width: '15%',
        render:(time) => {
            return <span title={time} className='text-decoration'>{time.split(" ")[0]+'...'}</span>
        }
    }, {
        title: '操作',
        dataIndex: 'code',
        key: 'code',
        align: 'center',
        width: '15%',
        render: (text, record) => {
            return (
                <span>
                    <span className="blue">详情</span>
                    <Divider type="vertical"/>
                    <span className="blue">评价</span>
                </span>
            )
        }
    }];

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