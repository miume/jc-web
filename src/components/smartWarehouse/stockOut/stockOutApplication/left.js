import React from 'react';
import {Table} from "antd";
import axios from "axios";

class Left extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            selectedRows: [],
            tableData: []
        };
        this.columns = [{
            title: '物料名称',
            key: 'materialName',
            dataIndex: 'materialName',
            width: '33%'
        },{
            title: '实际库存',
            key: 'realWeight',
            dataIndex: 'realWeight',
            width: '33%'
        },{
            title: '可用库存',
            key: 'usefulWeight',
            dataIndex: 'usefulWeight',
            width: '33%'
        }];

        this.columns1 = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            width: '9%'
        },{
            title: '物料名称',
            key: 'matName',
            dataIndex: 'matName',
            width: '21%'
        },{
            title: '批号',
            key: 'metBatch',
            dataIndex: 'metBatch',
            width: '51%'
        },{
            title: '单位',
            key: 'measureUnit',
            dataIndex: 'measureUnit',
            width: '9%'
        },{
            title: '重量',
            key: 'weight',
            dataIndex: 'weight',
            width: '10%'
        }];
    }

    render() {
        let {data,rowSelection,tableData} = this.props;
        return (
            <div style={{width: '48%'}}>
                <Table columns={this.columns} pagination={false} dataSource={data} scroll={{y:110}}
                       rowClassName={(record) => record.isClicked ? 'stock-out-table-row-click' : ''}
                       bordered size={'small'} rowKey={record => record.id} onRow={this.props.onRowClick}/>

                <Table columns={this.columns1} pagination={false} className={'stock-out-table'}  dataSource={tableData}
                       bordered size={'small'} rowKey={record => record.id} rowSelection={rowSelection}/>
            </div>
        )
    }
}

export default Left;
