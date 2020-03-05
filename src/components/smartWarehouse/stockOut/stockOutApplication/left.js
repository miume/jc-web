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
            width: '54%'
        },{
            title: '单位',
            key: 'measureUnit',
            dataIndex: 'measureUnit',
            width: '8%'
        },{
            title: '重量',
            key: 'weight',
            dataIndex: 'weight',
            width: '8%'
        }];
        this.getData = this.getData.bind(this);
        this.onRowClick = this.onRowClick.bind(this);
    }

    render() {
        let {data,rowSelection} = this.props, {tableData} = this.state;
        return (
            <div style={{width: '48%'}}>
                <Table columns={this.columns} pagination={false} dataSource={data} scroll={{y:110}}
                       rowClassName={(record) => record.isClicked ? 'stock-out-table-row-click' : ''}
                       bordered size={'small'} rowKey={record => record.id} onRow={this.onRowClick}/>

                <Table columns={this.columns1} pagination={false} className={'stock-out-table'}  dataSource={tableData}
                       bordered size={'small'} rowKey={record => record.id} rowSelection={rowSelection}/>
            </div>
        )
    }

    onRowClick(record,index) {
        return {
            onClick: () => {
                let matId = record.materialNameCode, {preClickedIndex} = this.state;
                if(preClickedIndex === index) return;
                this.props.updateData(preClickedIndex,index);
                this.setState({
                    preClickedIndex: index
                });
                this.getData(matId)
            }
        }
    }

    getData(matId) {
        let {type} = this.props;
        axios({
            url: `${this.props.url[type]}/queryDown?matId=${matId}`,
            method: 'post'
        }).then(data => {
            let res = data.data.data ? data.data.data.details : [], result = [];
            for(let i = 0; i < res.length; i++) {
                res[i]['index'] = i + 1;
                let {id,materialCode,materialNameCode,materialName,weight,measureUnit} = res[i];
                result.push({
                    index: i + 1,
                    id: id,
                    ledgersId: parseInt(id),
                    metBatch: materialCode,
                    matName: materialName,
                    matId: materialNameCode,
                    weight: weight,
                    measureUnit: measureUnit
                })
            }
            this.setState({
                tableData: result
            })
        })
    }

    selectChange(selectedRowKeys,selectedRows) {
        this.setState({
            selectedRowKeys,
            selectedRows
        })
    }
}

export default Left;
