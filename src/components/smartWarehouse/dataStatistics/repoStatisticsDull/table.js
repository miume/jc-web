import React from 'react';
import {Icon, Table} from "antd";

class RightTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
        this.columns = [{
            title:'序号',
            key:'col1',
            dataIndex:'col1',
            width: '10%'
        },{
            title:'批号',
            key:'col2',
            dataIndex:'col2',
            width: '40%'
        },{
            title:'重量',
            key:'col3',
            dataIndex:'col3',
            width: '15%'
        },{
            title:'出入库日期',
            key:'col4',
            dataIndex:'col4',
            width: '25%'
        },{
            title:'库龄',
            key:'col5',
            dataIndex:'col5',
            width: '10%'
        }]

    }

    render() {
        return (
            <div className="repoStatisticsDull_table">
                <Table
                    rowKey={record => record.col1}
                    columns={this.columns}
                    dataSource={this.props.dataSource}
                    bordered
                    size={'small'}
                    pagination={false}
                    scroll={{y:500}}
                />
            </div>
        );
    }

}

export default RightTable;
