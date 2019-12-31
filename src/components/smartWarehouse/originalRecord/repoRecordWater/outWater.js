import React from 'react';
import {Table} from "antd";
import {getOperations,judgeOperation} from "../../../commom/getOperations";

class OutWater extends React.Component {

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
            width: '10%'
        },{
            title: '物料编码',
            key: 'col2',
            dataIndex: 'col2',
            width: '20%'
        },{
            title: '出库日期',
            key: 'col3',
            dataIndex: 'col3',
            width: '40%'
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

export default OutWater;
