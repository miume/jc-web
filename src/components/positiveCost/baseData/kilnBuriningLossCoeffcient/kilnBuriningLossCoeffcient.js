import React from 'react';
import BlockQuote from "../../../BlockQuote/blockquote";
import {Spin, message, Table, Divider, Popconfirm} from "antd";
import SearchCell from '../../../BlockQuote/newSearchSell';
import DeleteByIds from '../../../BlockQuote/deleteByIds';
import AddModal from "./addModal";
import axios from 'axios';
import {getOperations,judgeOperation} from "../../../commom/getOperations";

class KilnBurning extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedRowKeys: [],
            searchContent: undefined
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
            width: '5%'
        },{
            title: '产品型号',
            key: ' name',
            dataIndex: 'name',
            width: '10%'
        },{
            title: '1#窑炉',
            key: 'lossrate1',
            dataIndex: 'lossrate1',
            width: '9%'
        },{
            title: '2#窑炉',
            key: 'lossrate2',
            dataIndex: 'lossrate2',
            width: '9%'
        },{
            title: '3#窑炉',
            key: 'lossrate3',
            dataIndex: 'lossrate3',
            width: '9%'
        },{
            title: '4#窑炉',
            key: 'lossrate4',
            dataIndex: 'lossrate4',
            width: '9%'
        },{
            title: '5#窑炉',
            key: 'lossrate5',
            dataIndex: 'lossrate5',
            width: '9%'
        },{
            title: '6#窑炉',
            key: 'lossrate6',
            dataIndex: 'lossrate6',
            width: '9%'
        },{
            title: '7#窑炉',
            key: 'lossrate7',
            dataIndex: 'lossrate7',
            width: '9%'
        },{
            title: '8#窑炉',
            key: 'lossrate8',
            dataIndex: 'lossrate8',
            width: '9%'
        },{
            title: '操作',
            key: 'code',
            dataIndex: 'code',
            width: '10%',
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

        // data = [{code:1,index:1,name:'ceshi',lossrate1:1,lossrate2:2,lossrate3:3,lossrate4:4,lossrate5:5,lossrate6:6,lossrate7:7,lossrate8:8}] //TODO：删除测试数据
        return (
            <div>
                <BlockQuote name={this.current.menuName} menu={this.current.menuParent} menu2='返回' returnDataEntry={this.back}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <AddModal flag={addFlag} title={'新增'} url={this.url} getTableParams={this.getTableParams}/>
                    <DeleteByIds selectedRowKeys={selectedRowKeys} deleteByIds={this.deleteByIds} cancel={this.cancel}
                                 cancel={this.cancel} flag={deleteFlag}/>
                    <SearchCell flag={true} searchEvent={this.searchEvent} reset={this.reset} placeholder={'请输入产品型号'}/>
                    <div className='clear'></div>
                    <Table dataSource={this.state.data} columns={this.columns} rowSelection={rowSelection} pagination={this.pagination}
                           onChange={this.handleTableChange} size={'small'} bordered rowKey={record => record.code}/>
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
                condition:value === undefined ? searchContent : value,
                page: current,
                size: pageSize,

            };
        console.log(this.state)
        this.getTableData(params);
    }

    /**获取表格数据*/
    getTableData(params) {
        this.setState({
            loading: true
        });
        axios({
            url: `${this.url.kilnBurning.page}`,
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
    /**删除*/
    deleteById(id) {
        let params = {
            id:id
        }
        axios({
            url:`${this.url.kilnBurning.delete}`,
            method:'Delete',
            headers:{
                'Authorization':this.url.Authorization
            },
            params
        }).then((data)=>{
            if(data.data.code === 0) {
                message.info(data.data.message);
                this.getTableParams(); //删除后重置信息
            } else {
                message.info(data.data.message);
            }
        }).catch(()=>{
            message.info('删除失败，请联系管理员！');
        });
    }
   /**批量删除*/
    deleteByIds() {
        let {selectedRowKeys} = this.state, ids = '';
        selectedRowKeys.map((e,index) => {
            index === 0 ? ids += `ids=${e}` : ids += `&ids=${e}`
        });
        console.log(selectedRowKeys)
        axios({
            url:this.url.kilnBurning.deletes,
            method:'delete',
            headers:{
                'Authorization':this.url.Authorization
            },
            data:selectedRowKeys,
            type:'json'
        }).then((data)=>{
            if(data.data.code === 0) {
                message.info(data.data.message);
                this.getTableParams(); //删除后重置信息
            } else {
                message.info(data.data.message);
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
            searchContent:searchContent
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

export default KilnBurning;
