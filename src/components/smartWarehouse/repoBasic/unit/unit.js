import React from 'react';
import BlockQuote from "../../../BlockQuote/blockquote";
import {Spin, message, Table, Divider, Popconfirm} from "antd";
import SearchCell from '../../../BlockQuote/newSearchSell';
import DeleteByIds from '../../../BlockQuote/deleteByIds';
import AddModal from "./addModal";
import axios from 'axios';
import {getOperations,judgeOperation} from "../../../commom/getOperations";

class Unit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedRowKeys: [],
            searchContent: ''
        };
        this.operations = [];
        this.pagination = {
            pageSize: 10,
            current: 1,
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
            title: '计量单位',
            key: 'measureUnit',
            dataIndex: 'measureUnit',
            width: '30%'
        },{
            title: '中文说明',
            key: 'measureUnitDesc',
            dataIndex: 'measureUnitDesc',
            width: '30%'
        },{
            title: '自动标记',
            key: 'autoFlag',
            dataIndex: 'autoFlag',
            width: '20%',
            render: (text) => {
                return text ? '否' : '是'
            }
        },{
            title: '操作',
            key: 'id',
            dataIndex: 'id',
            width: '40%',
            render: (text,record) => {
                let {deleteFlag,updateFlag} = this.state;
                return (
                    <span>
                        <AddModal flag={updateFlag} record={record} title={'编辑'} url={this.url} getTableParams={this.getTableParams}/>
                        {updateFlag && deleteFlag ? <Divider type={"vertical"}/> : ''}
                        <span className={deleteFlag ? '' : 'hide'}>
                            <Popconfirm title="确认删除?" onConfirm={()=> this.deleteById(text)} okText="确定" cancelText="取消" >
                                <span className='blue'>删除</span>
                            </Popconfirm>
                        </span>
                    </span>
                )
            }
        }];

        this.back = this.back.bind(this);
        this.reset = this.reset.bind(this);
        this.cancel = this.cancel.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.deleteByIds = this.deleteByIds.bind(this);
        this.deleteById=this.deleteById.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.getTableParams = this.getTableParams.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
    }

    render() {
        this.current = JSON.parse(localStorage.getItem('dataEntry'));
        this.url = JSON.parse(localStorage.getItem('url'));
        let {selectedRowKeys,data,addFlag,deleteFlag} = this.state,
            rowSelection = {
                selectedRowKeys,
                onChange: this.onSelectChange,
            };
        return (
            <div>
                <BlockQuote name={this.current.menuName} menu={this.current.menuParent} menu2='返回' returnDataEntry={this.back}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <AddModal flag={addFlag} title={'新增'} url={this.url} getTableParams={this.getTableParams}/>
                    <DeleteByIds selectedRowKeys={selectedRowKeys} deleteByIds={this.deleteByIds} cancel={this.cancel}
                                 cancel={this.cancel} flag={deleteFlag}/>
                    <SearchCell flag={true} searchEvent={this.searchEvent} reset={this.reset} placeholder={'请输入中文描述'}/>
                    <div className='clear'></div>
                    <Table dataSource={data} columns={this.columns} rowSelection={rowSelection} pagination={this.pagination}
                           onChange={this.handleTableChange} size={'small'} bordered rowKey={record => record.id}/>
                </Spin>
            </div>
        );
    }

    componentDidMount() {
        this.getTableParams();
        let {openKeys,menuId} = this.current, operations = getOperations(openKeys,menuId);
        this.setState({
            addFlag: judgeOperation(operations,'SAVE'),
            updateFlag: judgeOperation(operations,'UPDATE'),
            deleteFlag: judgeOperation(operations,'DELETE')
        })
    }

    /**确定获取表格数据的参数*/
    getTableParams(value) {
        let {searchContent} = this.state, {pageSize,current} = this.pagination,
            params = {
                size: pageSize,
                current: current
            };
        this.getTableData(params,value === undefined ? searchContent : value);
    }

    /**获取表格数据*/
    getTableData(params,searchContent) {
        this.setState({
            loading: true
        });
        axios({
            url: `${this.url.SwmsBasicMeasureUnit}/pages?supplierName=${searchContent}`,
            method: 'post',
            headers: {
                'Authorization': this.url.Authorization
            },
            data:params
        }).then(data => {
            let res = data.data.data;
            if(res && res.records) {
                this.pagination.total = res['total'] ? res['total'] : 0;
                for(let i = 0; i < res.records.length; i++) {
                    res['records'][i]['index'] = (res['current'] - 1) * 10 + i + 1;
                }
                this.setState({
                    data: res.records
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

    deleteById(id) {
        axios({
            url:`${this.url.SwmsBasicMeasureUnit}/${id}`,
            method:'Delete',
            headers:{
                'Authorization':this.url.Authorization
            }
        }).then((data)=>{
            if(data.data.code === '000000') {
                message.info(data.data.mesg);
                this.getTableParams(); //删除后重置信息
            } else {
                message.info(data.data.mesg);
            }
        }).catch(()=>{
            message.info('删除失败，请联系管理员！');
        });
    }

    deleteByIds() {
        let {selectedRowKeys} = this.state, ids = '';
        selectedRowKeys.map((e,index) => {
            index === 0 ? ids += `ids=${e}` : ids += `&ids=${e}`
        });
        axios({
            url:`${this.url.SwmsBasicMeasureUnit}/batchDelete?${ids}`,
            method:'Delete',
            headers:{
                'Authorization':this.url.Authorization
            }
        }).then((data)=>{
            if(data.data.code === '000000') {
                message.info(data.data.mesg);
                this.getTableParams(); //删除后重置信息
            } else {
                message.info(data.data.mesg);
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

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default Unit;
