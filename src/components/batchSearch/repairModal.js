import React from 'react';
import {Table} from 'antd';
import RepairDetail from "./repairDetailModal"

class RepairModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        sorter: (a, b) => a.index - b.index,
        align: 'center',
        width: '5%',
    }, {
        title: '维修单号',
        dataIndex: 'a',
        key: 'a',
        align: 'center',
        width: '13%',
    }, {
        title: '紧急程度',
        dataIndex: 'b',
        key: 'b',
        align: 'center',
        width: '8%',
    }, {
        title: '申请时间',
        dataIndex: 'c',
        key: 'c',
        align: 'center',
        width: '16%',
    }, {
        title: '申请人',
        dataIndex: 'd',
        key: 'd',
        align: 'center',
        width: '7%',
    },{
        title: '接单时间',
        dataIndex: 'e',
        key: 'e',
        align: 'center',
        width: '17%',
        render: (time) => {
            return <span title={time} className='text-decoration'>{time.split(" ")[0] + '...'}</span>
        }
    }, {
        title: '接单人',
        dataIndex: 'f',
        key: 'f',
        align: 'center',
        width: '7%',
    },{
        title: '完工时间',
        dataIndex: 'h',
        key: 'h',
        align: 'center',
        width: '17%',
        render: (time) => {
            return <span title={time} className='text-decoration'>{time.split(" ")[0] + '...'}</span>
        }
    }, {
        title: '操作',
        dataIndex: 'code',
        key: 'code',
        align: 'center',
        width: '8%',
        render: (text, record) => {
            return (
                <RepairDetail/>
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

export default RepairModal