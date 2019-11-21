import React from 'react';
import BlockQuote from '../../BlockQuote/blockquote';
import OperationTable from './operationTable';
import '../../Home/page.css';
import axios from "axios";
import AddModal from "./addModal";
import {message, Spin} from "antd";
import home from '../../commom/fns';
import SearchCell from '../../BlockQuote/search';
import DeleteByIds from "../../BlockQuote/deleteByIds";

class OperationManagement extends React.Component {
    url;
    operation;
    componentDidMount() {
        this.fetch();
    }
    componentWillUnmount() {
        this.setState = () => {
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
            loading: true
        };
        this.reset = this.reset.bind(this);
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
            pageSizeOptions: ["10","20","50","100"]
        }
    }
    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current')) ;
        /**获取当前菜单的所有操作权限 */
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
        const {  selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent}></BlockQuote>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <AddModal
                        fetch={this.fetch}
                        flag={home.judgeOperation(this.operation,'SAVE')}
                    />
                    <DeleteByIds
                        selectedRowKeys={this.state.selectedRowKeys}
                        deleteByIds={this.deleteByIds}
                        cancel={this.cancel} flag={home.judgeOperation(this.operation,'DELETE')}
                    />
                    <SearchCell
                        name='请输入操作名称'
                        searchEvent={this.searchEvent}
                        searchContentChange={this.searchContentChange}
                        fetch={this.reset}
                        flag={home.judgeOperation(this.operation,'QUERY')}
                    />
                    <div className='clear' ></div>
                    <OperationTable
                        url={this.url}
                        data={this.state.dataSource}
                        pagination={this.pagination}
                        rowSelection={rowSelection}
                        fetch={this.fetch}
                        modifyDataSource={this.modifyDataSource}
                        handleTableChange={this.handleTableChange}
                        judgeOperation = {home.judgeOperation}
                        operation = {this.operation}
                    />
                </Spin>
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
    /**点击表格分页或者切换每页显示页数*/
    handleTableChange(pagination) {
        this.pagination = pagination;
        this.fetch();
    };

    fetch(params = {},flag) {
        let {searchContent} = this.state, {pageSize,current} = this.pagination;
        params = {
            operationName: flag ? '' : searchContent,
            pageSize: pageSize ? pageSize : 10,
            pageNumber: current ? current : 1,
        };
        this.setState({
            loading: true
        });
        this.getTableData(params);
    };

    /**获取表格数据*/
    getTableData(params) {
        axios({
            url: `${this.url.operation.pagesByName}` ,
            method: 'get',
            headers:{
                'Authorization': this.url.Authorization
            },
            params: params,
        }).then((data) => {
            const res = data.data.data;
            this.pagination.total = res ? res.total : 0;
            let dataSource = [];
            if(res&&res.list) {
                for(let i = 1; i<=res.list.length; i++){
                    res.list[i-1]['index']=(res['prePage']) * res['pageSize'] + i;
                }
                dataSource = res.list
                this.setState({
                    dataSource: dataSource,
                });
            }
            this.setState({
                loading: false
            })
        })
    }

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

    /**实现单条数据功能 */
    /** 根据角色名称分页查询*/
    searchEvent(){
        this.fetch();
    };

    /**获取查询时角色名称的实时变化 */
    searchContentChange(e){
        const value = e.target.value;
        this.setState({searchContent:value});
    }

    /**重置操作*/
    reset() {
        this.setState({
            searchContent: ''
        });
        this.fetch({},1)
    }
}

export default OperationManagement;
