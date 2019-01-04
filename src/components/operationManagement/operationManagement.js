import React from 'react';
import BlockQuote from '../BlockQuote/blockquote';
import OperationTable from './operationTable';
import '../Home/page.css';
import axios from "axios";
import AddModal from "./addModal";
import {message} from "antd";
import SearchCell from '../BlockQuote/search';
import DeleteByIds from "../BlockQuote/deleteByIds";

class OperationManagement extends React.Component {
    url;
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
            searchContent:'',
            searchText: '',
            pageChangeFlag: 0, //分页标志： 0为fetch 1为search
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
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current')) ;
        const {  selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent}></BlockQuote>
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
                            name='请输入操作名称'
                            searchEvent={this.searchEvent}
                            searchContentChange={this.searchContentChange}
                            fetch={this.fetch}
                        />
                    </span>
                    <div className='clear' ></div>
                    <OperationTable
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

    /**修改父组件的数据 */
    modifySelectedRowKeys = (data) => {
        this.setState({selectedRowKeys:data});
    };
    modifyDataSource = (data) => {
        this.setState({dataSource:data});
    };
    /**获取所有数据 getAllByPage */
    handleTableChange = (pagination) => {
        const pageChangeFlag = this.state.pageChangeFlag;
        if(pageChangeFlag===0){
            this.fetch({
                size: pagination.pageSize,
                page: pagination.current,
                orderField: 'id',
                orderType: 'desc',

            });
        }else{
            this.searchEvent({
                size: pagination.pageSize,
                page: pagination.current,
                orderField: 'id',
                orderType: 'desc',
            });
        }
    };
    fetch = (params = {}) => {
        axios({
            url: `${this.url.operation.getOperationsByPage}` ,
            method: 'get',
            headers:{
                'Authorization': this.url.Authorization
            },
            params: params,
        }).then((data) => {
            const res = data.data.data;
            this.pagination.total=res?res.total:0;
            for(var i = 1; i<=res.list.length; i++){
                res.list[i-1]['index']=(res.prePage)*10+i;
            }
            this.setState({
                dataSource: res.list,
                searchContent: '',
                selectedRowKeys: [],
                pageChangeFlag: 0,
            });
        })
    };
    /**---------------------- */
    /**实现批量删除功能 */
    deleteByIds = () => {
        const ids = this.state.selectedRowKeys;
        axios({
            url: `${this.url.operation.deleteByIds}`,
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
            message.info('删除失败，请联系管理员！');
        });

    };
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    };
    cancel() {
        this.setState({
            selectedRowKeys: [],
        });
    }
    /**---------------------- */
    /**实现单条数据功能 */
    /** 根据角色名称分页查询*/
    searchEvent(params = {}){
        const ope_name = this.state.searchContent;
        axios({
            url: `${this.url.operation.pagesByName}`,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{
                size: params.size,
                page: params.page,
                operationName:ope_name
            },
        }).then((data)=>{
            const res = data.data.data;
            this.pagination.total=res?res.total:0;
            for(var i = 1; i<=res.list.length; i++){
                res.list[i-1]['index']=(res.prePage)*10+i;
            }
            this.setState({
                dataSource: res.list,
                pageChangeFlag: 1
            });
        })

    };
    /**获取查询时角色名称的实时变化 */
    searchContentChange(e){
        const value = e.target.value;
        this.setState({searchContent:value});
    }
    /**---------------------- */
}

export default OperationManagement;