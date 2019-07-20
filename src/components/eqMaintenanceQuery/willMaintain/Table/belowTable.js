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
            dataIndex: 'number',
            key: 'number',
            width: '2px',
            align:'center',
        },
        {
            title: '保养项目',
            dataIndex: 'project',
            key: 'project',
            width: '10px',
            align:'center',
        },
        {
            title: '保养内容',
            dataIndex: 'content',
            key: 'content',
            width: '10px',
            align:'center',
        }
    ];

    dataSource = [
        {
            number:1,
            project:"洗澡",
            content:"睡觉"
        },
        {
            number:2,
            project:"洗澡",
            content:"睡觉"
        },
        {
            number:3,
            project:"洗澡",
            content:"睡觉"
        }
    ];

    render() {
        return (
            <div>
                <Table
                    dataSource={this.dataSource}
                    columns={this.columns}
                    size="small"
                    pagination={false}
                    bordered
                />
            </div>);
    }


}


export default BelowTable