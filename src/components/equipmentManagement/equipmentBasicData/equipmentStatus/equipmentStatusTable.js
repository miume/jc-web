import React from 'react';
import {Table} from 'antd';
import DeletaSpan from './deletaSpan'
import './equipmentStatus.css'
import Edit from './edit';

class equipmentStatusTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingKey: '',
        }
        this.cancel = this.cancel.bind(this);
        this.getFetch = this.getFetch.bind(this);
    }

    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        sorter: (a, b) => a.index - b.index,
        align: 'center',
        width: '20%',
    }, {
        title: '状态名称',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        editable: 1,
        width: '30%',
    }, {
        title: '颜色',
        dataIndex: 'color',
        key: `code`,
        align: 'center',
        editable: 1,
        width: '20%',
        render: color => {
            return <span><i style={{color: `${color}`}} className="fa fa-circle" aria-hidden="true"></i></span>
        }
    }, {
        title: '操作',
        dataIndex: 'code',
        key: 'code',
        align: 'center',
        width: '25%',
        render: (text, record) => {
            return (
                <span>
                    <Edit
                        fetch={this.props.fetch}
                        url={this.props.url}
                        record={record}
                        editFlag={true}
                    />
                    <DeletaSpan
                        record={record}
                        getFetch={this.getFetch}
                        handleDelete={this.props.handleDelete}
                        flag={this.props.judgeOperation(this.props.operation, 'DELETE')}
                    />
                </span>
            )
        }
    }]

    render() {
        return (
            <Table
                rowClassName="editable-row"
                rowKey={record => record.code}
                columns={this.columns}
                rowSelection={this.props.rowSelection}
                dataSource={this.props.data}
                pagination={false}
                size="small"
                bordered
            />
        );
    }

    getFetch = () => {
        this.props.fetch();
    };
    cancel = () => {
        this.setState({editingKey: ''});
    };

}

export default equipmentStatusTable
