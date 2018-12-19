import React from 'react';
import {Table} from 'antd';
import CheckReleaseSpan from './checkReleaseSpan';


class ReleaseTable extends React.Component {
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        sorter: (a, b) => a.id - b.id,
        align:'center',
        width: '5%',
    },{
        title: '批号',
        dataIndex: 'a',
        key: 'a',
        align:'center',
        width: '6%',
    },{
        title: '原材料',
        dataIndex: 'b',
        key: 'b',
        align:'center',
        width: '6%',
    },{
        title: '生产厂家',
        dataIndex: 'c',
        key: 'c',
        align:'center',
        width: '6%',
    },{
        title: '到货日期',
        dataIndex: 'd',
        key: 'd',
        align:'center',
        width: '12%',
    },{
        title: '创建人',
        dataIndex: 'e',
        key: 'e',
        align:'center',
        width: '6%',
    },{
        title: '创建日期',
        dataIndex: 'f',
        key: 'f',
        align:'center',
        width: '12%',
    },{
        title: '修改人',
        dataIndex: 'g',
        key: 'g',
        align:'center',
        width: '6%',
    },{
        title: '修改日期',
        dataIndex: 'h',
        key: 'h',
        align:'center',
        width: '12%',
    },{
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        align:'center',
        width: '6%',
    },{
        title: '发布状态',
        dataIndex: 'state',
        key: 'state',
        align:'center',
        width: '6%',
        render:state => {
            switch(`${state}`) {
                case '0': return '未发布';
                case '1': return '已发布';
                default: return '';
            }
        },
    },{
        title: '紧急',
        dataIndex: 'isUrgent',
        key: 'isUrgent',
        align:'center',
        width: '6%',
        render:isUrgent=>isUrgent?<span><i className="fa fa-circle" aria-hidden="true"></i>正常</span>:<span className='urgent'><i className="fa fa-circle" aria-hidden="true"></i> 紧急</span>,
    },{
        title: '操作',
        dataIndex: 'id',
        key: 'id',
        align:'center',
        width: '6%',
        render: (text,record) => {
            let operationFlag = this.judgeOperation(record.state);
            console.log(operationFlag)
            return (
                <span>
                    {operationFlag?(
                        <CheckReleaseSpan
                            state={'2'}
                            name='发布'
                        />
                    ):(
                        <span  className="notClick">发布</span>
                    )}
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
                rowSelection={this.props.rowSelection}
                pagination={this.props.pagination}
                size="small"
                bordered
                scroll={{y: 400 }}
            />
        )
    }
    /**判断发布可否功能 */
    judgeOperation = (record) => {
        if(record==='0'){
            return true;
        }else{
            return false;
        }
    };
    /**---------------------- */
    /**单条记录删除 */
    handleDelete = (key) => {
        console.log("++++++");
        console.log(key);
        // const dataSource = this.state.dataSource;
        // this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };
    /**---------------------- */
}
export default ReleaseTable;