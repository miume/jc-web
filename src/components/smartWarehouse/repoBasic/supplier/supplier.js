import React from 'react';
import BlockQuote from "../../../BlockQuote/blockquote";
import {Spin, message, Table, Divider, Popconfirm} from "antd";
import SearchCell from '../../../BlockQuote/newSearchSell';
import DeleteByIds from '../../../BlockQuote/deleteByIds';
import AddModal from "./addModal";
import axios from 'axios';

class Suppliers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedRowKeys: [],
            searchContent: ''
        };
        this.pagination = {
            showSizeChanger: true,//是否可以改变 pageSize
            showTotal: (total) => `共${total}条记录`,//显示共几条记录
            pageSizeOptions: ["10", "20", "50", "100"]
        };
        this.columns = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            width: '10%'
        },{
            title: '代码(厂商代号)',
            key: 'siteName',
            dataIndex: 'siteName',
            width: '20%'
        },{
            title: '供应商名字',
            key: 'name',
            dataIndex: 'name',
            width: '40%'
        },{
            title: '自动标记',
            key: 'auto',
            dataIndex: 'auto',
            width: '10%'
        },{
            title: '操作',
            key: 'code',
            dataIndex: 'code',
            width: '20%',
            render: (text,record) => {
                return (
                    <span>
                        <AddModal record={record} title={'编辑'} url={this.url} getTableParams={this.getTableParams}/>
                        <Divider type={"vertical"}/>
                        <Popconfirm title="确认删除?" onConfirm={()=> this.deleteByIds(text)} okText="确定" cancelText="取消" >
                            <span className='blue'>删除</span>
                        </Popconfirm>
                    </span>
                )
            }
        }];
        this.back = this.back.bind(this);
        this.reset = this.reset.bind(this);
        this.cancel = this.cancel.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.deleteByIds = this.deleteByIds.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.getTableParams = this.getTableParams.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
    }

    render() {
        let current = JSON.parse(localStorage.getItem('dataEntry')), {selectedRowKeys,data} = this.state;
        this.url = JSON.parse(localStorage.getItem('url'));
        let rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent} menu2='返回' returnDataEntry={this.back}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <AddModal title={'新增'} url={this.url} getTableParams={this.getTableParams}/>
                    <DeleteByIds selectedRowKeys={selectedRowKeys} deleteByIds={this.deleteByIds} cancel={this.cancel}
                                 cancel={this.cancel} flag={true}/>
                    <SearchCell flag={true} searchEvent={this.searchEvent} reset={this.reset} placeholder={'站点名称'}/>
                    <div className='clear'></div>
                    <Table dataSource={data} columns={this.columns} rowSelection={rowSelection} pagination={this.pagination}
                           onChange={this.handleTableChange} size={'small'} bordered rowKey={record => record.code}/>
                </Spin>
            </div>
        );
    }

    componentDidMount() {
        this.getTableParams()
    }

    /**确定获取表格数据的参数*/
    getTableParams(value) {
        let {searchContent} = this.state, {pageSize,current} = this.pagination,
            params = {
                condition: value === undefined ? searchContent : value,
                size: pageSize,
                page: current
            };
        this.getTableData(params);
    }

    /**获取表格数据*/
    getTableData(params) {
        this.setState({
            loading: true
        });
        axios({
            url: `${this.url.checkSite.page}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params
        }).then(data => {
            let res = data.data.data;
            if(res && res.list) {
                this.pagination.total = res['total'] ? res['total'] : 0;
                for(let i = 0; i < res.list.length; i++) {
                    res['list'][i]['index'] = (res['page'] - 1) * 10 + i + 1;
                }
                this.setState({
                    data: res.list
                })
            }
            this.setState({
                loading: false
            })
        })
    }

    onSelectChange(selectedRowKeys) {
        this.setState({
            selectedRowKeys
        })
    }

    deleteByIds(id) {
        let {selectedRowKeys} = this.state,
            ids = typeof id === 'number' ? [id] : selectedRowKeys
        axios({
            url:`${this.url.checkSite.deletes}`,
            method:'Delete',
            headers:{
                'Authorization':this.url.Authorization
            },
            data: ids
        }).then((data)=>{
            if(data.data.code === 4) {
                message.info('存在站点名称已被使用，不允许删除！');
            } else {
                message.info(data.data.message);
                this.getTableParams(); //删除后重置信息
            }
        }).catch(()=>{
            message.info('删除失败，请联系管理员！');
        });
    }

    handleTableChange(pagination) {
        this.pagination = pagination;
        this.getTableParams();
    }

    /**搜索事件*/
    searchEvent(searchContent) {
        this.setState({
            searchContent
        });
        this.pagination.current = 1;
        this.getTableParams(searchContent)
    }

    /**取消批量删除*/
    cancel() {
        this.setState({
            selectedRowKeys: []
        })
    }

    /**重置事件*/
    reset() {
        this.setState({
            searchContent: undefined
        });
        this.pagination.current = 1;
        this.getTableParams('')
    }

    back() {
        this.props.history.push('/repoBasic');
    }
}

export default Suppliers;
