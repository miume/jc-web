import React from 'react';
import {Input, Table} from "antd";
const data=[{
    index:1,
    code:1,
    materialName: 'CuSO4',
    materialCode: '23dwfcfdfv',
    deliveryTime: '2019-10-01',
    weights: 12,
    dataType: '出料'
},{
    index:2,
    code:2,
    materialName: 'CuSO4',
    materialCode: '23dwfcfdfv',
    deliveryTime: '2019-10-01',
    weights: 12,
    dataType: '出料'
},{
    index:3,
    code:3,
    materialName: 'CuSO4',
    materialCode: '23dwfcfdfv',
    deliveryTime: '2019-10-01',
    weights: 12,
    dataType: '出料'
}]
class AddTable extends React.Component {
    constructor(props) {
        super(props);
        this.getFooter = this.getFooter.bind(this);
        this.columns = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            sorter: (a,b) => a.code - b.code,
            width:'16.6%'
        }, {
            title: '物料名称',
            key: 'materialName',
            dataIndex: 'materialName',
            width:'16.6%'
        }, {
            title: '物料编码',
            key: 'materialCode',
            dataIndex: 'materialCode',
            width:'16.6%'
        }, {
            title: '出库时间',
            key: 'deliveryTime',
            dataIndex: 'deliveryTime',
            width:'16.6%'
        }, {
            title: '重量(T)',
            key: 'weights',
            dataIndex: 'weights',
            width:'16.6%'
        }, {
            title: '叫料点',
            key: 'dataType',
            dataIndex: 'dataType',
            width:'16.6%'
        }]

    }

    render() {
        return (
            <div className={'raw-material-add-table'}>
                <Table size={"small"} columns={this.columns} bordered dataSource={data}
                       pagination={false} rowKey={record => record.code}
                       footer={this.getFooter} scroll={{y:150}}/>
            </div>
        )
    }

    getFooter() {
        return (
            <div className={'raw-material-add-footer'}>
                <div>
                    <label>NiSO4溶液：</label>
                    <Input placeholder='请输入' name='NiSO4' style={{width: 200}} onChange={this.props.inputChange}/>
                </div>
                <div>
                    <label>CoSO4溶液：</label>
                    <Input placeholder='请输入' name='CoSO4' style={{width: 200}} onChange={this.props.inputChange}/>
                </div>
                <div>
                    <label>MnSO4溶液：</label>
                    <Input placeholder='请输入' name='MnSO4' style={{width: 200}} onChange={this.props.inputChange}/>
                </div>
            </div>
        )
    }
}

export default AddTable;
