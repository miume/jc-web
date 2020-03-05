import React from 'react';
import {Table} from "antd";

class StockOutDetail extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            width: '5%'
        },{
            title: '出库单号',
            key: 'head.id',
            dataIndex: 'head.id',
            width: '10%'
        },{
            title: '领用单位',
            key: 'dept',
            dataIndex: 'dept',
            width: '15%'
        },{
            title: '出库日期',
            key: 'head.createdTime',
            dataIndex: 'head.createdTime',
            width: '15%'
        },{
            title: '出库状态',
            key: 'status',
            dataIndex: 'status',
            width: '11%'
        },{
            title: '使用产线',
            key: 'line',
            dataIndex: 'line',
            width: '11%'
        },{
            title: '出库类别',
            key: 'outType.deliveryTypeName',
            dataIndex: 'outType.deliveryTypeName',
            width: '11%'
        },{
            title: '出库点',
            key: 'address.deliveryAddressName',
            dataIndex: 'address.deliveryAddressName',
            width: '11%'
        }];

        this.columns1 = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            width: '5%'
        },{
            title: '出库时间',
            key: 'head.createdTime',
            dataIndex: 'head.createdTime',
            width: '18%'
        },{
            title: '物料大类',
            key: 'type.typeName',
            dataIndex: 'type.typeName',
            width: '12%'
        },{
            title: '物料小类',
            key: 'subType.subTypeName',
            dataIndex: 'subType.subTypeName',
            width: '12%'
        },{
            title: '物料名称',
            key: 'head.materialName',
            dataIndex: 'head.materialName',
            width: '15%'
        },{
            title: '供货单位',
            key: 'supplier.materialSupplierName',
            dataIndex: 'supplier.materialSupplierName',
            width: '20%'
        },{
            title: '分组号',
            key: 'head.groupName',
            dataIndex: 'head.groupName',
            width: '6%'
        },{
            title: '重量',
            key: 'head.weight',
            dataIndex: 'head.weight',
            width: '5%'
        }, {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
            width: '7%'
        }]
    }

    render() {
        return (
            <div>
                <Table columns={this.columns} pagination={false}
                       bordered size={'small'} rowKey={record => record.head.id}/>
                       <br/>
                <Table columns={this.columns} pagination={false} scroll={{y:200}}
                       bordered size={'small'} rowKey={record => record.detail.id}/>
                <br/>
            </div>
        )
    }
}

export default StockOutDetail;
