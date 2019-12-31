import React from 'react';
import Search from "./search";
import {Table, Tabs} from "antd";

class Query extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.columns = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            width: '10%'
        },{
            title: '出库单号',
            key: 'materialName',
            dataIndex: 'materialName',
            width: '10%'
        },{
            title: '领用单位',
            key: 'batch',
            dataIndex: 'batch',
            width: '10%'
        },{
            title: '物料大类',
            key: 'typeName',
            dataIndex: 'typeName',
            width: '10%'
        },{
            title: '物料小类',
            key: 'subTypeName',
            dataIndex: 'subTypeName',
            width: '10%'
        },{
            title: '出库日期',
            key: 'date',
            dataIndex: 'date',
            width: '10%'
        },{
            title: '出库状态',
            key: 'status',
            dataIndex: 'status',
            width: '10%'
        }]
    }

    render() {
        return (
            <div className={'rightDiv-content'}>
                <Search/>
                <div>
                    <Table columns={this.columns} pagination={false}
                           bordered size={'small'} rowKey={record => record.id}/>
                </div>
            </div>
        )
    }
}

export default Query;
