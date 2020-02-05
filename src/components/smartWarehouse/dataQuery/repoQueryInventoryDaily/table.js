import React from 'react';
import {Table} from "antd";
import {getOperations,judgeOperation} from "../../../commom/getOperations";
import Edit from './edit'

class InventoryDailyTable extends React.Component {

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
            title: '大类',
            key: 'col2',
            dataIndex: 'col2',
            width: '10%'
        },{
            title: '小类',
            key: 'col3',
            dataIndex: 'col3',
            width: '10%'
        },{
            title: '物料名称',
            key: 'col4',
            dataIndex: 'col4',
            width: '10%'
        },{
            title: '供应商',
            key: 'col5',
            dataIndex: 'col5',
            width: '10%'
        },{
            title: '计量单位',
            key: 'col6',
            dataIndex: 'col6',
            width: '7%'
        },{
            title: '前日库存',
            key: 'col7',
            dataIndex: 'col7',
            width: '7%'
        },{
            title: '当日入库',
            key: 'col8',
            dataIndex: 'col8',
            width: '7%'
        },{
            title: '当日出库',
            key: 'col9',
            dataIndex: 'col9',
            width: '7%'
        },{
            title: '现存量',
            key: 'col10',
            dataIndex: 'col10',
            width: '5%'
        },{
            title: '安全库存',
            key: 'col11',
            dataIndex: 'col11',
            width: '7%'
        },{
            title: '备注',
            key: 'col12',
            dataIndex: 'col12',
            width: '10%'
        },{
            title: '操作',
            key: 'code',
            dataIndex: 'code',
            width: '5%',
            render: (text,record) => {
                return (
                    <span>
                        <Edit
                            record={record}
                            url={this.props.url}
                            searchContent={this.props.searchContent}
                            getTableParams={this.props.getTableParams}
                        />
                    </span>
                )
            }
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

export default InventoryDailyTable;
