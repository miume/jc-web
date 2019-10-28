import React from 'react';
import {Table} from 'antd';
import '../willMaintain.css';

//用于编写表格的显示样式

class BelowTable extends React.Component {
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    constructor(props) {
        super(props)
    }
    columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
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
            <div style = {{height:'200px'}}>
                <Table
                    rowKey={item => item.code}
                    dataSource={this.props.newRowData}
                    columns={this.columns}
                    size="small"
                    pagination={false}
                    bordered
                    scroll={{y:150}}
                />
            </div>);
    }


}


export default BelowTable
