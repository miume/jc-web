import React from 'react';
import {Table} from "antd";

class Left extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            selectedRows: []
        };
        this.columns = [{
            title: '物料名称',
            key: 'materialName',
            dataIndex: 'materialName',
            width: '33%'
        },{
            title: '实际库存',
            key: 'RealWeight',
            dataIndex: 'RealWeight',
            width: '33%'
        },{
            title: '可用库存',
            key: 'UsefulWeight',
            dataIndex: 'UsefulWeight',
            width: '33%'
        }];

        this.columns1 = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            width: '10%'
        },{
            title: '物料名称',
            key: 'materialName',
            dataIndex: 'materialName',
            width: '30%'
        },{
            title: '批号',
            key: 'batch',
            dataIndex: 'batch',
            width: '30%'
        },{
            title: '重量',
            key: 'weight',
            dataIndex: 'weight',
            width: '30%'
        }]
    }

    render() {
        let {selectedRowKeys} = this.state,
            rowSelection = {
                selectedRowKeys,
                onChange: this.selectChange.bind(this)
            };
        return (
            <div style={{width: '48%'}}>
                <Table columns={this.columns} pagination={false}
                       bordered size={'small'} rowKey={record => record.id}/>

                <Table columns={this.columns1} pagination={false} className={'stock-out-table'}
                       bordered size={'small'} rowKey={record => record.id} rowSelection={rowSelection}/>
            </div>
        )
    }

    selectChange(selectedRowKeys,selectedRows) {
        this.setState({
            selectedRowKeys,
            selectedRows
        })
    }
}

export default Left;
