import React from "react";
import {Table} from "antd";
import AssayDetail from "./assayDetail"

class Assay extends React.Component{
    constructor(props){
        super(props);
        this.column = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: '5%',
        },{
            title: '批次信息',
            dataIndex: 'batch',
            key: 'batch',
            width: '16%',
        },{
            title: '化验类型',
            dataIndex: 'assayType',
            key: 'assayType',
            width: '12%',
        },{
            title: '送样人',
            dataIndex: 'deliveryPeople',
            key: 'deliveryPeople',
            width: '10%',
        },{
            title: '送样时间',
            dataIndex: 'deliveryDate',
            key: 'deliveryDate',
            width: '19%',
        },{
            title: '送样工厂',
            dataIndex: 'deliveryFactoty',
            key: 'deliveryFactoty',
            width: '12%',
        },{
            title: '检测项目',
            dataIndex: 'testItems',
            key: 'testItems',
            width: '12%',
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: '6%',
            render:(text,record)=>{
                return(
                    <span>
                        <AssayDetail url={this.props.url} record={record}/>
                    </span>
                )
            }
        }]
    }

    render(){
        return(
            <span>
                <Table pagination={false} size="small" bordered  dataSource={this.props.assayData} columns={this.column} rowKey={record=>record.index}/>
            </span>
        )
    }
}
export default Assay