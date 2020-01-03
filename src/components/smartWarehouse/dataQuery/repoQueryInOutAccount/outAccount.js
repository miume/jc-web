import React from 'react';
import {Table} from "antd";
import {getOperations,judgeOperation} from "../../../commom/getOperations";

class OutAccount extends React.Component {

    componentWillUnmount = () => {
        this.setState(() => {
            return;
        })
    }
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            searchContent: '',
            dataSource:[]
        };
        this.columns = [{
            title: '序号',
            key: 'col1',
            dataIndex: 'col1',
            width: '5%'
        },{
            title: '物料编码',
            key: 'col2',
            dataIndex: 'col2',
            width: '9%'
        },{
            title: '物料名称',
            key: 'col3',
            dataIndex: 'col3',
            width: '10%'
        },{
            title: '物料批号',
            key: 'col4',
            dataIndex: 'col4',
            width: '16%'
        },{
            title: '物料类型',
            key: 'col5',
            dataIndex: 'col5',
            width: '10%'
        },{
            title: '物料小类',
            key: 'col6',
            dataIndex: 'col6',
            width: '10%'
        },{
            title: '供应商',
            key: 'col7',
            dataIndex: 'col7',
            width: '10%'
        },{
            title: '重量',
            key: 'col8',
            dataIndex: 'col8',
            width: '8%'
        },{
            title: '袋号',
            key: 'col9',
            dataIndex: 'col9',
            width: '8%'
        },{
            title: '出库时间',
            key: 'col10',
            dataIndex: 'col10',
            width: '14%'
        }];
    }

    render() {
        return (
            <div>
                <Table dataSource={this.props.dataSource} columns={this.columns}  pagination={this.props.pagination}
                       onChange={this.props.handleTableChange} size={'small'} bordered rowKey={record => record.col1}/>
            </div>
        );
    }

}

export default OutAccount;
