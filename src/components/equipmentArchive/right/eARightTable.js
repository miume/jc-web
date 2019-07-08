import React, {Component} from 'react';
import {Table, Icon} from 'antd';
import '../equipmentArchive.css'
class EARightTable extends Component {
    constructor(props){
        super(props)
    }
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        sorter: (a, b) => a.index - b.index,
        align:'center',
        width: '8%',
    },{
        title: '固定资产编码',
        dataIndex: 'index',
        key: 'index',
        align:'center',
        width: '13%',
    },{
        title: '设备名称',
        dataIndex: 'index',
        key: 'index',
        align:'center',
        width: '10%',
    },{
        title: '规格型号',
        dataIndex: 'index',
        key: 'index',
        align:'center',
        width: '10%',
    },{
        title: '启动日期',
        dataIndex: 'index',
        key: 'index',
        align:'center',
        width: '10%',
    },{
        title: '设备状况',
        dataIndex: 'index',
        key: 'index',
        align:'center',
        width: '15%',
    },{
        title: '操作',
        dataIndex: 'index',
        key: 'index',
        align:'center',
        width: '30%',
    }];
    render() {
        return (
            <div className="eA-right-bottom">
                <Table
                    rowKey={record => record.id}
                    rowSelection={this.props.rowSelection}
                    dataSource={this.props.dataSource}
                    columns={this.columns}
                    size="small"
                    bordered
                    scroll={{ y: 400 }}
                />
            </div>
        )
    }
}

export default EARightTable