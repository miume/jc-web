import React from 'react';
import {Divider, Table} from 'antd';
import EditSpan from './editSpan';
import DetailSpan from './detailSpan';

class UnqualifiedTrackTable extends React.Component {
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        sorter: (a, b) => a.id - b.id,
        align:'center',
        width: '10%',
    },{
        title: '不合格品',
        dataIndex: 'a',
        key: 'a',
        align:'center',
        width: '15%',
    },{
        title: '发生工序',
        dataIndex: 'b',
        key: 'b',
        align:'center',
        width: '20%',
    },{
        title: '发生时间',
        dataIndex: 'c',
        key: 'c',
        align:'center',
        width: '20%',
    },{
        title: '处理负责人',
        dataIndex: 'd',
        key: 'd',
        align:'center',
        width: '15%',
    },{
        title: '操作',
        dataIndex: 'id',
        key: 'id',
        align:'center',
        width: '20%',
        render: (text,record) => {
            return (
                <span>
                    <EditSpan
                    />
                    <Divider type="vertical" />
                    <DetailSpan
                        state={record.state}
                        name='详情'
                    />
                </span>
            )
        }
    }];
    render() {
        const columns = this.columns.map((col) => {
            return {
                ...col,
                onCell: record => ({
                    record,
                }),
            };
        });
        return(
            <Table
                rowKey={record => record.id}
                dataSource={this.props.data}
                columns={columns}
                pagination={this.props.pagination}
                size="small"
                bordered
                scroll={{y: 400 }}
            />
        )
    }

}
export default UnqualifiedTrackTable;