import React from 'react';
import {Table} from "antd";
import {getOperations,judgeOperation} from "../../../commom/getOperations";
import Detail from "./detail";

class InventoryQueryTable extends React.Component {

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
            title: '库龄',
            key: 'col2',
            dataIndex: 'col2',
            width: '5%'
        },{
            title: '入库日期',
            key: 'col3',
            dataIndex: 'col3',
            width: '10%',
            render:(text)=>{
                return <span title={text} className='text-decoration'>{text.split(" ")[0] + "..."}</span>
            }
        },{
            title: '批号',
            key: 'col4',
            dataIndex: 'col4',
            width: '15%'
        },{
            title: '大类',
            key: 'col5',
            dataIndex: 'col5',
            width: '10%'
        },{
            title: '小类',
            key: 'col6',
            dataIndex: 'col6',
            width: '10%'
        },{
            title: '物料名称',
            key: 'col7',
            dataIndex: 'col7',
            width: '7%'
        },{
            title: '供应商',
            key: 'col8',
            dataIndex: 'col8',
            width: '7%'
        },{
            title: '检验状态',
            key: 'col9',
            dataIndex: 'col9',
            width: '7%',
            render:(text,record) => {
                if (text===0){
                    return <span>待检</span>
                }
                if (text===1){
                    return <span>合格</span>
                }
                if (text===2){
                    return <span>不合格</span>
                }
                if (text===3){
                    return <span>让步接收</span>
                }
            }
        },{
            title: '单位',
            key: 'col10',
            dataIndex: 'col10',
            width: '5%'
        },{
            title: '实际重量',
            key: 'col11',
            dataIndex: 'col11',
            width: '7%'
        },{
            title: '可用重量',
            key: 'col12',
            dataIndex: 'col12',
            width: '7%'
        },{
            title: '操作',
            key: 'code',
            dataIndex: 'code',
            width: '5%',
            render: (text,record) => {
                return (
                    <span>
                        <Detail
                            record={record}
                            url={this.props.url}
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

export default InventoryQueryTable;
