import React from 'react';
import {Table, Icon, Divider, message} from 'antd';
import axios from "axios";
import '../willMaintain.css';

//用于编写表格的显示样式

class BelowTable extends React.Component {
    constructor(props) {
        super(props)
    }
    columns = [
        {
            title: '序号',
            dataIndex: 'code',
            key: 'code',
            width: '2px',
            align:'center',
        },
        {
            title: '保养项目',
            dataIndex: 'maintenanceItems',
            key: 'maintenanceItems',
            width: '10px',
            align:'center',
        },
        {
            title: '保养内容',
            dataIndex: 'maintenanceContent',
            key: 'maintenanceContent',
            width: '10px',
            align:'center',
        }
    ];

    render() {
        return (
            <div>
                <Table
                    dataSource={this.props.newRowData}
                    columns={this.columns}
                    size="small"
                    pagination={false}
                    bordered
                />
            </div>);
    }


}


export default BelowTable