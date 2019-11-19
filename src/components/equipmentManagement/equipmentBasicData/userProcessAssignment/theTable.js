import React from 'react';
import {Table} from 'antd';
import Editor from "./editorModal";

class TheTable extends React.Component{
    constructor(props){
        super(props);
    }

    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        sorter: (a, b) => a.index - b.index,
        width: "10%",
    },{
        title: '用户名',
        dataIndex: 'user.name',
        key: 'user.name',
        width: '15%',
    },{
        title: '所属工序',
        dataIndex: 'processName',
        key: 'processName',
        width: '60%',
    },{
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        width: '15%',
        render: (text, record) => {
            let {url,deptId,deptName} = this.props;
            return <Editor url={url} deptId={deptId} deptName={deptName} record={record} getTableData={this.props.getTableData}/>
        }
    }];
    /**rowKey={record => record.code}用于选定需要批量删除的数据的ID*/
    render() {
        return (
            <Table
                columns={this.columns}
                rowKey={record => record.user.id}
                pagination={this.props.pagination}
                dataSource={this.props.rightTableData}
                onChange={this.props.handleTableChange}
                size="small"
                bordered
            />
        );
    }
}

export  default TheTable
