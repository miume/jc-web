import React from 'react';
import {Table} from "antd";
import axios from 'axios';

class StockOutDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getData = this.getData.bind(this);
        this.columns = [{
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
            width: '20%'
        },{
            title: '出库状态',
            key: 'status',
            dataIndex: 'status',
            width: '10%'
        },{
            title: '使用产线',
            key: 'line',
            dataIndex: 'line',
            width: '15%'
        },{
            title: '出库类别',
            key: 'outType.deliveryTypeName',
            dataIndex: 'outType.deliveryTypeName',
            width: '15%'
        },{
            title: '出库点',
            key: 'address.deliveryAddressName',
            dataIndex: 'address.deliveryAddressName',
            width: '15%'
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
            width: '17%'
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
            width: '6%'
        }, {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
            width: '7%'
        }]
    }

    render() {
        let {data} = this.state, detail = data && data.detail ? data.detail : [];
        for(let i = 0; i < detail.length; i++) {
            detail[i]['index'] = i + 1;
        }
        return (
            <div>
                <Table columns={this.columns} pagination={false} dataSource={data ? [data] : []}
                       bordered size={'small'} rowKey={record => record.head.id}/>
                       <br/>
                <Table columns={this.columns1} pagination={false} scroll={{y:200}} dataSource={detail}
                       bordered size={'small'} rowKey={record => record.head.id}/>
                <br/>
            </div>
        )
    }

    componentDidMount() {
        let {url, batchNumberId} = this.props;
        this.getData(url, batchNumberId)
    }

    getData(url, batchNumberId) {
        axios.get(`${url.outStock}/commonBatchDetail?commonBatchId=${batchNumberId}`).then(data => {
            let res = data.data.data;
            this.setState({
                data: res && res.head ? res : undefined
            })
        })
    }
}

export default StockOutDetail;
