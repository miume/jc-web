import React from 'react';
import {Table} from "antd";
import {getOperations,judgeOperation} from "../../../commom/getOperations";
import Check from "./check";

class InDaily extends React.Component {

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
            title: '月份',
            key: 'col2',
            dataIndex: 'col2',
            width: '5%'
        },{
            title: '开始日期',
            key: 'col3',
            dataIndex: 'col3',
            width: '12%',
            render:(text)=>{
                return <span title={text} className='text-decoration'>{text.split(" ")[0] + "..."}</span>
            }
        },{
            title: '结束日期',
            key: 'col4',
            dataIndex: 'col4',
            width: '15%',
            render:(text)=>{
                return <span title={text} className='text-decoration'>{text.split(" ")[0] + "..."}</span>
            }
        },{
            title: '大类',
            key: 'col5',
            dataIndex: 'col5',
            width: '8%'
        },{
            title: '小类',
            key: 'col6',
            dataIndex: 'col6',
            width: '8%'
        },{
            title: '物料名称',
            key: 'col7',
            dataIndex: 'col7',
            width: '8%'
        },{
            title: '计量单位',
            key: 'col8',
            dataIndex: 'col8',
            width: '8%'
        },{
            title: '上月库存',
            key: 'col9',
            dataIndex: 'col9',
            width: '7%'
        },{
            title: '本月入库',
            key: 'col10',
            dataIndex: 'col10',
            width: '7%'
        },{
            title: '本月出库',
            key: 'col11',
            dataIndex: 'col11',
            width: '7%'
        },{
            title: '本月库存',
            key: 'col12',
            dataIndex: 'col12',
            width: '7%'
        }];
    }

    render() {
        return (
            <div>
                <Table rowKey={record => record.code}
                       dataSource={this.props.dataSource}
                       columns={this.columns}
                       pagination={this.props.pagination}
                       onChange={this.props.handleTableChange}
                       size={'small'}
                       bordered
                />
            </div>
        );
    }



}

export default InDaily;
