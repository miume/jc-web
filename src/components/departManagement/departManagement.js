import React from 'react';
import BlockQuote from '../BlockQuote/blockquote';
import DepartTable from './departTable';
import '../Home/page.css';
import axios from "axios";
import AddModal from "./addModal";
import {message} from "antd";
import SearchCell from '../BlockQuote/search';
import DeleteByIds from "../BlockQuote/deleteByIds";






class Depart extends React.Component {
    Authorization;
    server;
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
            loading: false,
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
        this.pagination = {
            total: this.state.dataSource.length,
            showTotal(total) {
                return `共${total}条记录`
            },
            showSizeChanger: true,
        }
    }
    render() {
        /**这是个令牌，每次调用接口都将其放在header里 */
        this.Authorization = localStorage.getItem('Authorization');
        /**这是服务器网址及端口 */
        this.server = localStorage.getItem('remote');
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div>
                <BlockQuote name="部门管理" menu='用户和权限'></BlockQuote>
                <div style={{padding:'15px'}}>
                    <AddModal
                        fetch={this.fetch}
                    />
                    <DeleteByIds
                        selectedRowKeys={this.state.selectedRowKeys}
                        deleteByIds={this.deleteByIds}
                        cancel={this.cancel}
                    />
                    <span style={{float:'right',paddingBottom:'8px'}}>
                        <SearchCell
                            name='请输入部门名称'
                            searchEvent={this.searchEvent}
                            searchContentChange={this.searchContentChange}
                            fetch={this.fetch}
                        />
                    </span>
                <div className='clear' ></div>
                <DepartTable
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
        this.setState({ loading: true });
        axios({
            url: `${this.server}/jc/auth/department/getDepartmentsByPage`,
            method: 'get',
            headers:{
                'Authorization': this.Authorization
            },
            params: params,
            // type: 'json',
        }).then((data) => {
            const res = data.data.data;
            this.pagination.total=res.total;
            for(var i = 1; i<=res.list.length; i++){
                res.list[i-1]['index']=(res.prePage)*10+i;
            }
            this.setState({
                loading: false,
                dataSource: res.list,
            });
        });
    };
    componentDidMount() {
        this.fetch();
    }
    /**---------------------- */
    /**实现批量删除功能 */
    deleteByIds = () => {
        const ids = this.state.selectedRowKeys;
        axios({
            url:`${this.server}/jc/auth/department/deleteByIds`,
            method:'Delete',
            headers:{
                'Authorization':this.Authorization
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
            url:`${this.server}/jc/auth/department/getDepartmentsByNameLikeByPage`,
            method:'get',
            headers:{
                'Authorization':this.Authorization
            },
            params:{
                size: this.pagination.pageSize,
                page: this.pagination.current,
                departmentName:dep_name
                // department_name:dep_name
            },
            type:'json',
        }).then((data)=>{
            const res = data.data.data;
            this.pagination.total=res.total;
            for(var i = 1; i<=res.list.length; i++){
                res.list[i-1]['index']=(res.prePage)*10+i;
            }
            this.setState({
                dataSource: res.list,
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