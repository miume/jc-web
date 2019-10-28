import React from 'react';
import {Table, Popconfirm, message, Divider, Spin} from 'antd';
import SearchCell from '../../../BlockQuote/search';
import DeleteByIds from '../../../BlockQuote/deleteByIds';
import Detail from '../detail';
import axios from 'axios';
import home from '../../../commom/fns';
// const data = [];
// for(var i = 1; i<=20; i++){
//     data.push({
//         index:`${i}`,
//         id:`${i}`,
//         materialName:'钴锰矿',
//         materialClass:'钴锰矿一号',
//         batchNumberId:'ECT/314314',
//         quantity:'122',
//         weight:'22' ,
//         applicant:'杨梅',
//         applyDate:'2018-11-11 11-11-11',
//         status:1,
//         isUrgent:0
//     })
// }
class RawMaterialOut extends React.Component {
    status
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            searchContent: '',
            selectedRowKeys: [],
            pageChangeFlag: 0
        };
        this.fetch = this.fetch.bind(this);
        this.deleteByIds = this.deleteByIds.bind(this);
        this.cancel = this.cancel.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            sorter: (a, b) => a.id - b.id,
            width: '10%'
        }, {
            title: '批号',
            dataIndex: 'batchNumber',
            key: 'batchNumber',
            width: '15%',
        }, {
            title: '申请人',
            dataIndex: 'createPersonName',
            key: 'createPersonName',
            width: '15%'
        }, {
            title: '申请日期',
            dataIndex: 'createTime',
            key: 'createTime',
            width: '16%'
        }, {
            title: '审核状态',
            dataIndex: 'status',
            key: 'status',
            width: '15%',
            render: status => {
                return this.status[status.toString()];
            },
        }, {
            title: '紧急',
            dataIndex: 'isUrgent',
            key: 'isUrgent',
            width: '10%',
            render: isUrgent => isUrgent ?
                <span className='urgent'><i className="fa fa-circle" aria-hidden="true"></i> 紧急</span> :
                <span><i className="fa fa-circle" aria-hidden="true"></i>正常</span>,
        }, {
            title: '操作',
            dataIndex: 'id',
            key: 'id',
            render: (text, record) => {
                const status = record.status;
                const flag = home.judgeOperation(this.operation,'DELETE');
                return (
                    <span>
                    <Detail id={record.id} url={this.props.url}></Detail>
                    <span className={flag?'':'hide'}>
                    <Divider type='vertical'></Divider>
                        {
                            status === 0 || status === 1 || status === 2 || status === 3 ?
                                <span
                                    className={status === 0 || status === 1 || status === 2 || status === 3 ? 'notClick' : 'blue'}
                                    id={record.id}>删除</span>
                                :
                                <Popconfirm title='确定删除' onConfirm={() => this.handleDelete(record.id)} okText='确定'
                                            cancelText='取消'>
                                    <span
                                        className={status === 0 || status === 1 || status === 2 || status === 3 ? 'notClick' : 'blue'}
                                        id={record.id}>删除</span>
                                </Popconfirm>
                        }
                    </span>
               </span>
                );
            }
            }]
        this.pagination = {
            showTotal(total) {
                return `共${total}条记录`
            },
            showSizeChanger: true,
            pageSizeOptions: ['10','20','50','100']
        }
    }
    /**监控表格变化 */
    handleTableChange(pagination) {
        this.pagination = pagination;
        const {pageChangeFlag} = this.state;
        if (pageChangeFlag) {
            this.props.fetch({
                size: pagination.pageSize,
                page: pagination.current,
                personName: this.state.searchContent
            })
        } else {
            this.props.fetch({
                size: pagination.pageSize,
                page: pagination.current,
            })
        }
    }
    /**搜索的重置调用的fetch函数 */
    fetch(status, flag) {
        /**如果flag为1 则将分页搜索标志位置为0 并将搜索内容置为空 */
        if (flag) {
            this.setState({
                pageChangeFlag: 0,
                searchContent: ''
            })
        }
        this.props.fetch();
    }
    /**单条记录删除 */
    handleDelete(id) {
        axios({
            url: `${this.props.url.stockOut.repoOut}/${id}`,
            method: 'Delete',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then((data) => {
            message.info(data.data.message);
            this.props.fetch({
                size: this.pagination.pageSize,
                page: this.pagination.current,
            })
        }).catch(() => {
            message.info('删除失败，请联系管理员！')
        })
    }
    /**批量删除 */
    deleteByIds() {
        axios({
            url: `${this.props.url.stockOut.repoOut}`,
            method: 'Delete',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            data: this.state.selectedRowKeys
        }).then((data) => {
            message.info(data.data.message);
            if (data.data.code === 0) {
                this.props.fetch({
                    size: this.pagination.pageSize,
                    page: this.pagination.current,
                });
            }
        }).catch(() => {
            message.info('删除错误，请联系管理员！')
        })
    }
    /**取消删除 */
    cancel() {
        this.setState({
            selectedRowKeys: []
        })
    }
    /**监控搜索框的输入变化 */
    searchContentChange(e) {
        const value = e.target.value;
        this.setState({
            searchContent: value
        })
    }
    /**根据货物名称进行搜索 */
    searchEvent() {
        this.setState({
            pageChangeFlag: 1
        })
        this.props.fetch({
            personName: this.state.searchContent
        });
    }
    /**监控checkbox的选中情况 */
    onSelectChange(selectedRowKeys) {
        this.setState({
            selectedRowKeys: selectedRowKeys
        })
    }

    render() {
        const {selectedRowKeys} = this.state;
        this.status = JSON.parse(localStorage.getItem('status'))
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
                disabled: record.status === 0 || record.status === 1 || record.status === 2 || record.status === 3
            }),
        };
        this.pagination.total = this.props.data.total;
        const current = JSON.parse(localStorage.getItem('current')) ;
        /**获取当前菜单的所有操作权限 */
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
        return (
            <Spin spinning={this.props.loading} wrapperClassName='rightDiv-content'>
                <DeleteByIds deleteByIds={this.deleteByIds} cancel={this.cancel}
                             selectedRowKeys={this.state.selectedRowKeys}
                             flag={home.judgeOperation(this.operation,'DELETE')}
                             />
                <SearchCell name='请输入申请人' type={this.props.index} fetch={this.fetch} searchEvent={this.searchEvent}
                            searchContentChange={this.searchContentChange}
                            flag={home.judgeOperation(this.operation,'QUERY')}
                            ></SearchCell>
                <div className='clear'></div>
                <Table rowKey={record => record.id} dataSource={this.props.data} columns={this.columns}
                       rowSelection={rowSelection} pagination={this.pagination} onChange={this.handleTableChange}
                       size='small' bordered></Table>
            </Spin>
        );
    }
}

export default RawMaterialOut;
