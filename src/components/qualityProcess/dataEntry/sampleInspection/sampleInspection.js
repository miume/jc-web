import React from "react";
import BlockQuote from '../../../BlockQuote/blockquote';
import axios from "axios";
import {Table, Divider, message, Popconfirm, Spin} from "antd";
import '../../../Home/page.css';
import SearchCell from '../../../BlockQuote/search'
import AddModal from './addModal'
import DeleteByIds from '../../../BlockQuote/deleteByIds';
import PopRefuse from "./confuse"
import "./sample.css"
import Edit from "./editor"
import Loss from '../../../BlockQuote/lossStatement'
import Reason from '../../../BlockQuote/lossStatement'

class SampleInspection extends React.Component {
    url
    operation

    componentDidMount() {
        this.fetch({
            sortField: 'id',
            sortType: 'desc',
        });
    }

    componentWillUnmount() {
        this.setState = () => {
            return;
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            selectedRowKeys: [],    //多选框key
            loading: true,
            searchContent: '',
            clicked: false,
            Contentvalue: '',
        };
        this.reset = this.reset.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.fetch = this.fetch.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.returnDataEntry = this.returnDataEntry.bind(this);
        this.deleteByIds = this.deleteByIds.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.handleRefuse = this.handleRefuse.bind(this);
        this.contentChange = this.contentChange.bind(this);
        this.judgeOperation = this.judgeOperation.bind(this);
        this.pagination = {
            showTotal(total) {
                return `共${total}条记录`
            },
            showSizeChanger: true,
            pageSizeOptions: ["10","20","50","100"]
        };
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            sorter: (a, b) => a.sampleDeliveringRecord.id - b.sampleDeliveringRecord.id,
            align: 'center',
            width: '6%',
        }, {
            title: '送检时间',
            dataIndex: 'sampleDeliveringRecord.sampleDeliveringDate',
            key: 'sampleDeliveringRecord.sampleDeliveringDate',
            align: 'center',
            width: '7%',
            render: (text) => {
                const items = text.split(' ')
                return <div className='text-decoration' title={text}>{items[0]}</div>
            }
        }, {
            title: '送检人',
            dataIndex: 'deliverer.name',
            key: 'deliverer.name',
            align: 'center',
            width: '8%',
        }, {
            title: '送检工厂',
            dataIndex: 'deliveryFactory.name',
            key: 'deliveryFactory.name',
            align: 'center',
            width: '8%',
        }, {
            title: '编号',
            dataIndex: 'batch',
            key: 'batch',
            align: 'center',
            width: '15%',
            render:(text)=>{
                if(text !==""){
                    // var value = text.split('-')
                    return <div className='text-decoration' title={text}>{text}</div>
                }else {
                    return "无"
                }
            }
        }, {
            title: '批号',
            dataIndex: 'sampleDeliveringRecord.tempBatchNumber',
            key: 'sampleDeliveringRecord.tempBatchNumber',
            align: 'center',
            width: '15%',
        }, {
            title: '类型',
            dataIndex: 'sampleDeliveringRecord.type',
            key: 'sampleDeliveringRecord.type',
            align: 'center',
            width: '6%',
            render: status => {
                switch (`${status}`) {
                    case '1':
                        return "原材料";
                    case "2":
                        return "中间品";
                    case "3":
                        return "成品";
                    default :
                        return null
                }
            }
        }, {
            title: '接受状态',
            dataIndex: 'sampleDeliveringRecord.acceptStatus',
            key: 'status',
            align: 'center',
            width: '8%',
            render: status => {
                switch (`${status}`) {
                    case '-1':
                        return "保存"
                    case '1':
                        return "等待接受";
                    case "2":
                        return "接受";
                    case "3":
                        return "拒绝";
                    default :
                        return null;
                }
            }
        }, {
            title: '操作',
            dataIndex: 'sampleDeliveringRecord.id',
            key: 'id',
            align: 'center',
            width: '23%',
            render: (text, record) => {
                return (
                    <span>
                        {record.sampleDeliveringRecord.acceptStatus === -1 ?
                            <Edit handleTableChange={this.handleTableChange}
                                  flag={this.judgeOperation(this.operation, 'UPDATE')} pagination={this.pagination}
                                  fetch={this.fetch} id={text} data={record}
                                  type={record.sampleDeliveringRecord.type}/> : <span
                                className={this.judgeOperation(this.operation, 'UPDATE') ? 'notClick' : 'hide'}>编辑</span>}
                        {this.judgeOperation(this.operation, 'UPDATE') ? <Divider type="vertical"/> : null}
                        {record.sampleDeliveringRecord.acceptStatus === -1 ? <Popconfirm title="确定删除?"
                                                                                         onConfirm={() => this.handleDelete(record.sampleDeliveringRecord.id)}
                                                                                         okText="确定" cancelText="取消">
                            <span className={this.judgeOperation(this.operation, 'DELETE') ? 'blue' : 'hide'}>删除</span>
                        </Popconfirm> : <span
                            className={this.judgeOperation(this.operation, 'DELETE') ? 'notClick' : 'hide'}>删除</span>}
                        {this.judgeOperation(this.operation, 'DELETE') ? <Divider type="vertical"/> : null}
                        {record.sampleDeliveringRecord.acceptStatus === 1 ? <Popconfirm title="确定接受?"
                                                                                        onConfirm={() => this.handleAccept(record.sampleDeliveringRecord.id)}
                                                                                        okText="确定" cancelText="取消">
                            <span className={this.judgeOperation(this.operation, 'AUDIT') ? 'blue' : 'hide'}>接受</span>
                        </Popconfirm> : <span
                            className={this.judgeOperation(this.operation, 'AUDIT') ? 'notClick' : 'hide'}>接受</span>}
                        {this.judgeOperation(this.operation, 'AUDIT') ? <Divider type="vertical"/> : null}
                        {record.sampleDeliveringRecord.acceptStatus === 1 ?
                            <PopRefuse contentChange={this.contentChange}
                                       flag={this.judgeOperation(this.operation, 'AUDIT')}
                                       id={record.sampleDeliveringRecord.id} handleRefuse={this.handleRefuse}
                                       acceptStatus={record.sampleDeliveringRecord.acceptStatus}/> : <span
                                className={this.judgeOperation(this.operation, 'AUDIT') ? 'notClick' : 'hide'}>拒绝</span>}
                        {this.judgeOperation(this.operation, 'AUDIT') ? <Divider type="vertical"/> : null}
                        <Loss statement={record.sampleDeliveringRecord.exceptionComment} name='异常备注'/>
                        <Divider type="vertical"/>
                        <Reason statement={record.sampleDeliveringRecord.handleComment} name='拒绝原因'/>
                    </span>
                );
            }
        }];
    }

    contentChange(e) {
        const value = e.target.value;
        this.setState({Contentvalue: value});
    }

    judgeOperation(operation, operationCode) {
        if (operation === null) return false
        var flag = operation ? operation.filter(e => e.operationCode === operationCode) : [];
        return flag.length > 0 ? true : false
    }

    /**点击拒绝*/
    handleRefuse(id) {
        axios({
            url: `${this.url.sampleInspection.accept}`,
            method: 'Post',
            headers: {
                'Authorization': this.Authorization
            },
            params: {
                id: id,
                isAccept: 3,
                handleComment: this.state.Contentvalue
            }
        }).then((data) => {
            message.info(data.data.message);
        }).catch((error) => {
            message.info(error.data)
        });
        setTimeout(() => {
            this.handleTableChange(this.pagination);
        }, 1000);
    }

    /**点击接受*/
    handleAccept = (id) => {
        axios({
            url: `${this.url.sampleInspection.accept}`,
            method: 'Post',
            headers: {
                'Authorization': this.Authorization
            },
            params: {
                id: id,
                isAccept: 2
            }
        }).then((data) => {
            message.info(data.data.message);
        }).catch((error) => {
            message.info(error.data)
        });
        setTimeout(() => {
            this.fetch();
        }, 1000);
    }

    /**单条记录删除*/
    handleDelete(id) {
        axios({
            url: `${this.url.sampleInspection.getAll}/${id}`,
            method: 'Delete',
            headers: {
                'Authorization': this.Authorization
            },
        }).then((data) => {
            message.info(data.data.message);
        }).catch((error) => {
            message.info(error.data)
        });
        setTimeout(() => {
            this.fetch();
        }, 1000);
    }

    /**返回数据录入页面 */
    returnDataEntry() {
        this.props.history.push({pathname: '/dataEntry'});
    }

    /**搜索事件*/
    searchEvent() {
        this.fetch();
    };

    /**获取查询时菜单名称的实时变化 */
    searchContentChange(e) {
        const value = e.target.value;
        this.setState({searchContent: value});
    }

    /**重置操作*/
    reset() {
        this.setState({
            searchContent: ''
        });
        this.fetch();
    }

    /**获取所有数据 getAllByPage */
    handleTableChange(pagination) {
        this.pagination = pagination;
        this.fetch();
    };

    fetch(params = {},flag) {
        let {current,pageSize} = this.pagination, {searchContent} = this.state;
        params = {
            batch: flag ? '' : searchContent,
            page: current ? current : 1,
            size: pageSize ? pageSize : 10,
            sortField: 'id',
            sortType: 'desc',
        };
        this.setState({
            loading: true
        });
        this.getTableData(params);
    };

    /**获取表格数据*/
    getTableData(params) {
        axios({
            url: `${this.url.sampleInspection.getPageByBatch}`,
            method: 'get',
            params
        }).then((data) => {
            const res = data.data.data;
            if (res && res.list) {
                for (var i = 1; i <= res.list.length; i++) {
                    res.list[i - 1]['index'] = (res.page-1)*10+i;
                }
                this.pagination.total = res.total;
                this.setState({
                    dataSource: res.list
                });
            }
            this.setState({
                loading: false
            })
        })
    }

    onSelectChange(selectedRowKeys)  {
        this.setState({selectedRowKeys});
    };

    cancel() {
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }

    deleteByIds() {
        const ids = this.state.selectedRowKeys;
        axios({
            url: `${this.url.sampleInspection.getAll}`,
            method: 'delete',
            headers: {
                'Authorization': this.Authorization
            },
            data: ids,
            type: 'json'
        }).then((data) => {
            message.info(data.data.message);
            this.fetch();
        })
    }

    render() {
        const {selectedRowKeys} = this.state;
        this.url = JSON.parse(localStorage.getItem('url'));
        /** 先获取数据录入的所有子菜单，在筛选当前子菜单的所有操作权限*/
        const current = JSON.parse(localStorage.getItem('dataEntry'));
        const operation = JSON.parse(localStorage.getItem('menus')) ? JSON.parse(localStorage.getItem('menus')).filter(e => e.menuName === current.menuParent)[0].menuList : null;
        this.operation = operation.filter(e => e.path === current.path)[0].operations
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
                disabled: record.sampleDeliveringRecord.acceptStatus === 1 || record.sampleDeliveringRecord.acceptStatus === 2 || record.sampleDeliveringRecord.acceptStatus === 3, // Column configuration not to be checked
            }),
        };
        return (
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent} menu2='返回'
                            returnDataEntry={this.returnDataEntry} flag={1} />
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <AddModal fetch={this.fetch} flag={this.judgeOperation(this.operation, 'SAVE')}/>
                    <DeleteByIds
                        selectedRowKeys={this.state.selectedRowKeys}
                        cancel={this.cancel}
                        deleteByIds={this.deleteByIds}
                        flag={this.judgeOperation(this.operation, 'DELETE')}
                    />
                    <SearchCell name='请输入编号' searchEvent={this.searchEvent}
                                searchContentChange={this.searchContentChange} fetch={this.fetch}
                                flag={this.judgeOperation(this.operation, 'QUERY')}/>
                    <div className='clear'></div>
                    <Table columns={this.columns} dataSource={this.state.dataSource} rowSelection={rowSelection}
                           size="small"
                           bordered
                           rowKey={record => record.sampleDeliveringRecord.id}
                           onChange={this.handleTableChange}
                           pagination={this.pagination}
                    />
                </Spin>
            </div>
        )
    }
}

export default SampleInspection
