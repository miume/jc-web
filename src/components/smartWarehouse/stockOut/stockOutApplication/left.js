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
            width: '20%'
        },{
            title: '批号',
            key: 'batch',
            dataIndex: 'batch',
            width: '40%'
        },{
            title: '单位',
            key: 'unit',
            dataIndex: 'unit',
            width: '15%'
        },{
            title: '重量',
            key: 'weight',
            dataIndex: 'weight',
            width: '15%'
        }]
    }

    render() {
        let {data,data1,rowSelection} = this.props;
        return (
            <div style={{width: '48%'}}>
                <Table columns={this.columns} pagination={false} dataSource={data}
                       bordered size={'small'} rowKey={record => record.id}/>

                <Table columns={this.columns1} pagination={false} className={'stock-out-table'}  dataSource={data1}
                       bordered size={'small'} rowKey={record => record.id} rowSelection={rowSelection} scroll={{y:'53vh'}}/>
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
