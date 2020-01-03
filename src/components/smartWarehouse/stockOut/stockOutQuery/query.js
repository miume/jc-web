import React from 'react';
import Search from "./search";
import {Table} from "antd";
import Detail from "./detail";
const data = [{
    id: 1,
    index: 1,
    materialName: '出库单号',
    supplier: '领用单位',
    typeName: '物料大类',
    subTypeName: '物料小类',
    date: '2019-12-28',
    status: 0
}];

class Query extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.reset = this.reset.bind(this);
        this.search = this.search.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.columns = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            width: '10%'
        },{
            title: '出库单号',
            key: 'materialName',
            dataIndex: 'materialName',
            width: '15%'
        },{
            title: '领用单位',
            key: 'supplier',
            dataIndex: 'supplier',
            width: '10%'
        },{
            title: '物料大类',
            key: 'typeName',
            dataIndex: 'typeName',
            width: '15%'
        },{
            title: '物料小类',
            key: 'subTypeName',
            dataIndex: 'subTypeName',
            width: '15%'
        },{
            title: '出库日期',
            key: 'date',
            dataIndex: 'date',
            width: '15%'
        },{
            title: '出库状态',
            key: 'status',
            dataIndex: 'status',
            width: '10%'
        },{
            title: '操作',
            key: 'id',
            dataIndex: 'id',
            render: (text) => {
                return <Detail id={text}/>
            }
        }]
    }

    render() {
        let {url} = this.props, {data} = this.state;
        return (
            <div className={'rightDiv-content'}>
                <Search search={this.search} reset={this.reset} url={url}/>
                <div>
                    <Table columns={this.columns} pagination={false} dataSource={data}
                           bordered size={'small'} rowKey={record => record.id}/>
                </div>
            </div>
        )
    }

    getTableData(params) {
        this.setState({
            data: data
        })
    }

    search(params) {
        this.getTableData(params);
    }

    reset(params) {

    }
}

export default Query;
