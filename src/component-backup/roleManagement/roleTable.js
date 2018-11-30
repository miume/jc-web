import React from 'react';
import { Table } from 'antd';
// import '../css/roleTable.css';

class RoleTable extends React.Component{
    render(){
        return (
            <Table rowSelection={this.props.rowSelection} columns={this.props.columns} dataSource={this.props.data}  pagination={this.props.pagination} components={this.props.components} size="small" bordered  scroll={{ y: 400 }}/>
        ); 
        //useFixedHeader 用来固定表头（需要指定 column 的 width 属性，否则列头和内容可能不对齐）
    }
}
export default RoleTable;