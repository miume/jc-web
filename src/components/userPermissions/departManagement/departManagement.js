import React from 'react';
import BlockQuote from '../../BlockQuote/blockquote';
import DepartTable from './departTable';
import axios from "axios";
import AddModal from "./addModal";
import {message} from "antd";
import home from '../../commom/fns';
import SearchCell from '../../BlockQuote/search';
import DeleteByIds from "../../BlockQuote/deleteByIds";
class Depart extends React.Component {
    url;
    operation
    componentDidMount() {
        this.fetch({
            pageSize:10,
            pageNumber:1,
        });
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
            editingKey: '',
            searchContent:'',
            searchText: '',
            pagination : {
                showTotal(total) {
                    return `共${total}条记录`
                },
                showSizeChanger:true
            },
            pageChangeFlag : 0,   //0表示分页 1 表示查询
        };
        this.modifySelectedRowKeys=this.modifySelectedRowKeys.bind(this);
        this.deleteByIds=this.deleteByIds.bind(this);
        this.cancel=this.cancel.bind(this);
        this.fetch=this.fetch.bind(this);
        this.modifyDataSource=this.modifyDataSource.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        // this.judgeOperation = this.judgeOperation.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current')) ;
        /**获取当前菜单的所有操作权限 */
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
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
                        flag={home.judgeOperation(this.operation,'SAVE')}
                    />
                    <DeleteByIds
                        selectedRowKeys={this.state.selectedRowKeys}
                        deleteByIds={this.deleteByIds}
                        cancel={this.cancel}
                        flag={home.judgeOperation(this.operation,'DELETE')}
                    />
                    <SearchCell
                        name='请输入部门名称'
                        searchEvent={this.searchEvent}
                        searchContentChange={this.searchContentChange}
                        fetch={this.fetch}
                        flag={home.judgeOperation(this.operation,'QUERY')}
                    />
                <div className='clear' ></div>
                <DepartTable
                    url={this.url}
                    data={this.state.dataSource}
                    pagination={this.state.pagination}
                    rowSelection={rowSelection}
                    fetch={this.fetch}
                    modifyDataSource={this.modifyDataSource}
                    handleTableChange={this.handleTableChange}
                    handleDelete={this.handleDelete}
                    judgeOperation = {home.judgeOperation}
                    operation = {this.operation}
                />
                </div>
            </div>
        )
    }
    /**用来判断该菜单有哪些操作权限 */

    judgeOperation(operation,operationCode){
        if(operation===null) return false
        var flag = operation?operation.filter(e=>e.operationCode===operationCode):[];
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
        this.setState({
            pagination:pagination
        });
        const {pageChangeFlag} = this.state;
        /**分页查询 */
        if(pageChangeFlag){
            this.fetch({
                pageSize:pagination.pageSize,
                pageNumber:pagination.current,
                departmentName:this.state.searchContent
            })
        }else{
            this.fetch({
                pageSize:pagination.pageSize,
                pageNumber:pagination.current,
            })
        }
    };
    fetch = (params ,flag) => {
        /**flag为1时，清空搜索框的内容 以及将分页搜索位置0 */
        if(flag) {
            var {pagination} = this.state;
            pagination.current = 1;
            pagination.total = 0;
            this.setState({
                pageChangeFlag:0,
                searchContent:'',
                pagination:pagination
            })
        }
        axios({
            url: `${this.url.department.byNameLikeByPage}` ,
            method: 'get',
            headers:{
                'Authorization': this.url.Authorization
            },
            params: params,
        }).then((data) => {
            const res = data.data.data?data.data.data:[];
            if(res&&res.list){
                for(var i = 1; i<=res.list.length; i++){
                    res.list[i-1]['index']=(res.prePage)*10+i;
                }
                const {pagination} = this.state;
                pagination.total=res.total;
                this.setState({
                    dataSource: res.list,
                    pagination:pagination,
                });
            }else{
                this.setState({
                    dataSource: []
                })
            }
        });
    };
    /**---------------------- */
    /**实现批量删除功能 */
    deleteByIds = () => {
        const ids = this.state.selectedRowKeys;
        axios({
            url: `${this.url.department.department.batchDelete}`,
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
        this.setState({
            pageChangeFlag:1
        });
        this.fetch({
            departmentName:this.state.searchContent
        })
    };
    /**获取查询时角色名称的实时变化 */
    searchContentChange(e){
        const value = e.target.value;
        this.setState({searchContent:value});
    }
    /**---------------------- */

    handleDelete = (id) => {
        axios({
            url:`${this.url.department.department}/${id}`,
            method:'Delete',
            headers:{
                'Authorization':this.url.Authorization
            },
        }).then((data)=>{
            message.info(data.data.message);
            this.fetch({
                pageSize:this.state.pagination.pageSize,
                pageNumber:this.state.pagination.current,
            })
        }).catch(()=>{
            message.info('删除失败，请联系管理员！');
        });
    }

}

export default Depart;
