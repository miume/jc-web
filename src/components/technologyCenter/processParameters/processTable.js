import React from 'react';
import {Divider, Table} from "antd";
import DeleteById from "../../BlockQuote/deleteById";
import AddModal from "./addModal";
import DetailModal from "./detail/detailModal";

class ProcessTable extends React.Component {
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            selectedRowKeys: []
        };
        this.judgeOperation = this.judgeOperation.bind(this);
        this.judgeEditor = this.judgeEditor.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.pagination = {
            showSizeChanger: true,//是否可以改变 pageSize
            showTotal: (total) => `共${total}条记录`,//显示共几条记录
            pageSizeOptions: ["10","20","50","100"]
        };
        this.columns = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            sorter: (a,b) => a.code - b.code,
            width: '7%'
        }, {
            title: '编号',
            key: 'processNum',
            dataIndex: 'processNum',
            width: '10%'
        }, {
            title: '使用车间',
            key: 'plantName',
            dataIndex: 'plantName',
            width: '10%'
        }, {
            title: '工序',
            key: 'processName',
            dataIndex: 'processName',
            width: '10%'
        }, {
            title: '生效日期',
            key: 'effectiveDate',
            dataIndex: 'effectiveDate',
            width: '12%'
        }, {
            title: '失效日期',
            key: 'expiryDate',
            dataIndex: 'expiryDate',
            width: '12%'
        }, {
            title: '编制人',
            key: 'preparer',
            dataIndex: 'preparer',
            width: '12%'
        }, {
            title: '编制时间',
            key: 'dateOfFiling',
            dataIndex: 'dateOfFiling',
            width: '12%'
        }, {
            title: '操作',
            key: 'code',
            dataIndex: 'code',
            render: (text, record) => {
                let {update,deleteFlag,status} = this.props;
                return (
                    this.judgeOperation(status,update,deleteFlag,record)
                )
            }
        }]
    }

    render() {
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange:this.onSelectChange,
        };
        return (
            <Table rowKey={record => record.code} dataSource={this.props.data}
                   columns={this.columns} pagination={this.pagination}
                   onChange={this.handleTableChange} rowSelection={rowSelection}
                   size={"small"} bordered/>
        )
    }

    /**根据不同tabs页面渲染不同操作*/
    judgeOperation(status,update,deleteFlag,record) {
        //待审核和审核中 已驳回
        if(status === '2' || status === '3' || status === '5' ) {
            return (
                <DetailModal data={record}/>
            )
        }
        //已通过
        if(status === '4' ) {
            return (
                <span>
                    <span className='blue'>发布</span>
                    <Divider type='vertical'/>
                    <DetailModal data={record}/>
                </span>
            )
        }
        //已发布
        if(status === '6') {
            return (
                <span>
                    <DetailModal data={record}/>
                    <Divider type='vertical'/>
                    <AddModal flag={update}
                              data={record} title={'复制新建'}/>
                </span>
            )
        }
        //未提交
        return (
            <span>
                {this.judgeEditor(update,record)}
                <DeleteById id={record.code} handleDelete={this.handleDelete} flag={deleteFlag}/>
            </span>
        )
    }

    /**判断编辑操作*/
    judgeEditor(flag,record) {
        return (
            <span className={flag?'':'hide'}>
                <AddModal flag={flag}
                          data={record} title={'编辑'}/>
            </span>
        )
    }

    /**单条记录删除*/
    handleDelete(id) {

    }

    /**切换分页*/
    handleTableChange(pagination) {
        console.log(pagination)
    }

    /**table checkbox选中*/
    onSelectChange(selectedRowKeys) {
        this.setState({ selectedRowKeys });
        console.log(this.state.selectedRowKeys)
    }
}

export default ProcessTable;
