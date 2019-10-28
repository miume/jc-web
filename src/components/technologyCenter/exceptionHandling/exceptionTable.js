import React from 'react';
import {Divider, Popconfirm, Table} from "antd";
import AddModal from "./addModal";

class ExceptionTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.deleteFlag = this.deleteFlag.bind(this);
        this.judgeEditor = this.judgeEditor.bind(this);
        this.pagination = {
            showTotal(total) {
                return `共${total}条记录`
            },
            showSizeChanger:true,
            pageSizeOptions: ["10","20","50","100"]
        };
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            sorter: (a,b) => a.code - b.code,
            width: '7%'
        }, {
            title: '现象',
            dataIndex: 'phenomenon',
            key: 'phenomenon',
            width: '20%'
        }, {
            title: '原因',
            dataIndex: 'reason',
            key: 'reason',
            width: '20%'
        }, {
            title: '处理方式',
            dataIndex: 'process',
            key: 'process',
            width: '20%'
        }, {
            title: '相关产品处理',
            dataIndex: 'proProcess',
            key: 'proProcess',
            width: '20%'
        }, {
            title: '操作',
            key: 'code',
            align:'center',
            width: '10%',
            render : (text,record) =>  {
                let {update,deleteFlag} = this.props;
                return (
                    <span>
                        {this.judgeEditor(update,record)}
                        {this.deleteFlag(deleteFlag,record)}
                    </span>
                )
            }
        }];
    }

    render() {
        return (
            <Table rowKey={record => record.code} size={"small"} bordered
                   columns={this.columns} pagination={this.pagination}
                   dataSource={this.props.data}/>
        )
    }

    /**判断编辑操作*/
    judgeEditor(flag,record) {
        return (
            <span className={flag?'':'hide'}>
                <AddModal flag={flag} url={this.url}
                          data={record} title={'编辑'}/>
                <Divider type="vertical" />
            </span>
        )
    }

    /**删除*/
    deleteFlag(flag,record) {
        return (
            <span className={flag?'':'hide'}>
                <Popconfirm title="确定删除?" onConfirm={()=>this.handleDelete(record.id)} okText="确定" cancelText="取消" >
                    <span className='blue'>删除</span>
                </Popconfirm>
            </span>
        )
    }
}

export default ExceptionTable;