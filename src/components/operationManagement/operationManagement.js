import React from 'react';
import WhiteSpace from '../BlockQuote/whiteSpace';
import BlockQuote from '../BlockQuote/blockquote';
import OperationTable from './operationTable';
import '../Home/page.css';
import axios from "axios";
import AddModal from "./addModal";
// import DeleteModal from "./deleteModal";
import {message} from "antd";
import DeleteModal from "../operationManagement/deleteModal";
// import SearchCell from "./search";
import SearchCell from '../BlockQuote/search';

/**这是个令牌，每次调用接口都将其放在header里 */
class OperationManagement extends React.Component {
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
            loading: false,
            searchContent:'',
            searchText: '',
        };
        this.modifySelectedRowKeys=this.modifySelectedRowKeys.bind(this);
        this.start=this.start.bind(this);
        this.cancel=this.cancel.bind(this);
        this.fetch=this.fetch.bind(this);
        this.modifyDataSource=this.modifyDataSource.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);

        this.pagination = {
            total: this.state.dataSource.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                // console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange(current) {
                // console.log('Current: ', current);
            }
        }
    }
    render() {
        this.Authorization = localStorage.getItem('Authorization');
        this.server = localStorage.getItem('remote');

        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div>
                <BlockQuote name="操作管理" menu='用户和权限'></BlockQuote>
                <div style={{padding:'15px'}}>
                    <AddModal
                        fetch={this.fetch}
                    />
                    <DeleteModal
                        selectedRowKeys={this.state.selectedRowKeys}
                        start={this.start}
                        loading={loading}
                        cancel={this.cancel}
                    />
                    <span style={{float:'right',paddingBottom:'8px'}}>
                        <SearchCell
                            name='请输入操作名称'
                            searchEvent={this.searchEvent}
                            searchContentChange={this.searchContentChange}
                            fetch={this.fetch}
                        />
                    </span>
                    <div className='clear' ></div>
                    <OperationTable
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
    modifySelectedRowKeys = (data) => {
        this.setState({selectedRowKeys:data});
    };
    modifyDataSource = (data) => {
        this.setState({dataSource:data});
    };
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
            url: `${this.server}/jc/operation/getOperationsByPage`,
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
        }).catch((error)=>{
            console.log(error)
            message.info(error.data.message)
        });
    };
    componentDidMount() {
        this.fetch();
    }
    /**---------------------- */
    /**实现批量删除功能 */
    start = () => {
        const ids = this.state.selectedRowKeys;
        axios({
            url:`${this.server}/jc/operation/deleteByIds`,
            method:'Delete',
            headers:{
                'Authorization':this.Authorization
            },
            data:ids,
            type:'json'
        }).then((data)=>{
            message.info(data.data.message);
            this.fetch();
        }).catch((error)=>{
            message.info(error.data.message)
        });

    };
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    };
    cancel() {
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }
    /**---------------------- */
    /**实现单条数据功能 */
    /** 根据角色名称分页查询*/
    searchEvent(){
        const ope_name = this.state.searchContent;
        axios({
            url:`${this.server}/jc/operation/getRolesByNameLikeByPage`,
            method:'get',
            headers:{
                'Authorization':this.Authorization
            },
            params:{
                size: this.pagination.pageSize,
                page: this.pagination.current,
                operationName:ope_name
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
        }).catch((error)=>{
                message.info(error.data.message)
            })

    };
    /**获取查询时角色名称的实时变化 */
    searchContentChange(e){
        const value = e.target.value;
        this.setState({searchContent:value});
    }
    /**---------------------- */
    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */
}

export default OperationManagement;