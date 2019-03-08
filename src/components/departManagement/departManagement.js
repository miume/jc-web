import React from 'react';
import BlockQuote from '../BlockQuote/blockquote';
import DepartTable from './departTable';
import axios from "axios";
import AddModal from "./addModal";
import {message} from "antd";
import SearchCell from '../BlockQuote/search';
import DeleteByIds from "../BlockQuote/deleteByIds";






class Depart extends React.Component {
    url;
    operation
    componentDidMount() {
        this.fetch();
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
          return ;
        }
      }
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            selectedRowKeys: [],
            editingKey: '',
            pagination:{},
            searchContent:'',
            searchText: '',
        };
        this.modifySelectedRowKeys=this.modifySelectedRowKeys.bind(this);
        this.deleteByIds=this.deleteByIds.bind(this);
        this.cancel=this.cancel.bind(this);
        this.fetch=this.fetch.bind(this);
        this.modifyDataSource=this.modifyDataSource.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.judgeOperation = this.judgeOperation.bind(this);
        this.pagination = {
            total: this.state.dataSource.length,
            showTotal(total) {
                return `共${total}条记录`
            },
            showSizeChanger: true,
        }
    }
    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current')) ;
        /**获取当前菜单的所有操作权限 */
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operationList:null;
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent}></BlockQuote>
                <div style={{padding:'15px'}}>
                    <AddModal
                        url={this.url}
                        fetch={this.fetch}
                    />
                    <DeleteByIds
                        selectedRowKeys={this.state.selectedRowKeys}
                        deleteByIds={this.deleteByIds}
                        cancel={this.cancel}
                    />
                    <SearchCell
                        name='请输入部门名称'
                        searchEvent={this.searchEvent}
                        searchContentChange={this.searchContentChange}
                        fetch={this.fetch}
                    />
                <div className='clear' ></div>
                <DepartTable
                    url={this.url}
                    data={this.state.dataSource}
                    pagination={this.pagination}
                    rowSelection={rowSelection}
                    fetch={this.fetch}
                    modifyDataSource={this.modifyDataSource}
                    handleTableChange={this.handleTableChange}
                />
                </div>
            </div>
        )
    }
    /**用来判断该菜单有哪些操作权限 */
    judgeOperation(operation,operationName){
        var flag = operation.filter(e=>e.operationName===operationName);
        return flag.length>0?true:false
    }
    /**修改父组件的数据 */
    modifyDataSource = (data) => {
        this.setState({dataSource:data});
    };
    modifySelectedRowKeys = (data) => {
        this.setState({selectedRowKeys:data});
    };
    /**---------------------- */
    /**获取所有数据 getAllByPage */
    handleTableChange = (pagination) => {
        this.fetch({
            size: pagination.pageSize,
            page: pagination.current,
            orderField: 'id',
            orderType: 'desc',

        });
    };
    fetch = (params = {}) => {
        axios({
            url: `${this.url.department.getDepartmentsByPage}` ,
            method: 'get',
            headers:{
                'Authorization': this.url.Authorization
            },
            params: params,
        }).then((data) => {
            const res = data.data.data;
            this.pagination.total=res?res.total:0;
            if(res&&res.list){
                for(var i = 1; i<=res.list.length; i++){
                    res.list[i-1]['index']=(res.prePage)*10+i;
                }
                this.setState({
                    dataSource: res.list,
                    searchContent: ''
                });
            }
        });
    };
    /**---------------------- */
    /**实现批量删除功能 */
    deleteByIds = () => {
        const ids = this.state.selectedRowKeys;
        axios({
            url: `${this.url.department.deleteByIds}`,
            method:'Delete',
            headers:{
                'Authorization':this.url.Authorization
            },
            data:ids,
            type:'json'
        }).then((data)=>{
            message.info(data.data.message);
            this.fetch();
        }).catch(()=>{
            message.info('删除失败，请联系管理员！')
        });

    };
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    };
    cancel() {
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
            });
        }, 1000);
    }
    /**---------------------- */
    /** 根据角色名称分页查询*/
    searchEvent(){
        const dep_name = this.state.searchContent;
        axios({
            url: `${this.url.department.getDepartmentsByNameLikeByPage}`,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{
                size: this.pagination.pageSize,
                page: this.pagination.current,
                departmentName:dep_name
            },
            type:'json',
        }).then((data)=>{
            const res = data.data.data;
            this.pagination.total=res?res.total:0;
            if(res&res.list){
                for(var i = 1; i<=res.list.length; i++){
                    res.list[i-1]['index']=(res.prePage)*10+i;
                }
            }
            this.setState({
                dataSource: res&res.list?res.list:[],
            });
        });
    };
    /**获取查询时角色名称的实时变化 */
    searchContentChange(e){
        const value = e.target.value;
        this.setState({searchContent:value});
    }
    /**---------------------- */

}

export default Depart;