import React from 'react';
import '../Home/page.css';
import { Table,Popconfirm,Divider,message } from 'antd';
import BlockQuote from '../BlockQuote/blockquote';
import SearchCell from '../BlockQuote/search';
import DeleteByIds from '../BlockQuote/deleteByIds';
import Add from './add';
import Detail from './detail';
import Editor from './edit';
import axios from "axios";

// const FormItem = Form.Item;

class Management extends React.Component{
    url
    status
    operation
    constructor(props){
        super(props)
        this.state = {
            dataSource: [],
            pagination:[],
            selectedRowKeys: [],
            loading: false,
            searchContent:'',
            searchText: '',
        }
        this.onSelectChange = this.onSelectChange.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.start=this.start.bind(this);
        this.cancel=this.cancel.bind(this);
        this.handleTableChange=this.handleTableChange.bind(this);
        this.judgeOperation = this.judgeOperation.bind(this);
        this.pagination = {
            total: this.state.dataSource.length,
            showTotal(total){
                return `共${total}条记录`
            },
            showSizeChanger: true,
          };
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'commonBatchNumber.id',
            align:'center',
            width: '6%',
        },{
            title: '流程名称',
            dataIndex: 'commonBatchNumber.description',
            key: 'description',
            align:'center',
            width: '15%',
        },{
            title: '创建人',
            dataIndex: 'createPersonName',
            key: 'createPersonName',
            align:'center',
            width: '13%',
        },{
            title: '创建时间',
            dataIndex: 'commonBatchNumber.createTime',
            key: 'createTime',
            align:'center',
            width: '18%',
        },{
            title: '保存状态',
            dataIndex: 'commonBatchNumber.status',
            key: 'status',
            align:'center',
            width: '14%',
            render: state => {
                return this.status[state.toString()];
           },
        },{
            title: '批号',
            dataIndex: 'commonBatchNumber.batchNumber',
            key: 'batchNumber',
            align:'center',
            width: '18%',
        },{
            title: '操作',
            dataIndex: 'commonBatchNumber.id',
            key: 'id',
            align:'center',
            width: '13%',
            render : (text,record) =>{
                return (
                    <span>
                        <Detail value={record} />
                        <Divider type="vertical" />
                        <Editor value={text} status={record.commonBatchNumber.status} pagination={this.pagination} handle={this.handleTableChange} flag={this.judgeOperation(this.operation,'UPDATE')}/>
                        <Divider type="vertical" />
                        {record.commonBatchNumber.status === -1?<Popconfirm title="确定删除?" onConfirm={()=>this.handleDelete(record.commonBatchNumber.id)} okText="确定" cancelText="取消" >
                            <span className={this.judgeOperation(this.operation,'DELETE')?'blue':'hide'} href="#">删除</span>
                        </Popconfirm>:<span className={this.judgeOperation(this.operation,'DELETE')?'notClick':'hide'}>删除</span>}
                        
                    </span>
                );
            }
        }]
    }
    handleDelete = (id) => {
        axios({
            url:`${this.url.processManagement.deleteByIds}/${id}`,
            method:'Delete',
            headers:{
                'Authorization':this.Authorization
            },
        }).then((data)=>{
            message.info(data.data.message);
        }).catch((error)=>{
            message.info(error.data)
        });
        setTimeout(() => {
            if((this.pagination.total-1)%10===0){
                this.pagination.current = this.pagination.current-1
            }
            this.handleTableChange(this.pagination);
        }, 1000);
    };
    judgeOperation(operation,operationCode){
        if(operation===null) return false
        var flag = operation?operation.filter(e=>e.operationCode===operationCode):[];
        return flag.length>0?true:false
    }
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
            url: `${this.url.processManagement.getAllByPage}`,
            method: 'get',
            headers:{
                'Authorization': this.Authorization
            },
            params: params,
            // type: 'json',
        }).then((data) => {
            const res = data.data.data;
            if(res&&res.list){
                this.pagination.total=res.total;
                this.pagination.current = res.pageNum;
                for(var i = 1; i<=res.list.length; i++){
                    res.list[i-1]['index']=(res.prePage)*10+i;
                }
                this.setState({
                    loading: false,
                    dataSource: res.list,
                    searchContent:'',
                    selectedRowKeys: [],
                });
            }
        })
    };
    componentDidMount() {
        this.fetch();
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
          return ;
        }
      }
    // handleSearch = (selectedKeys, confirm) => () => {
    //     confirm();
    //     this.setState({ searchText: selectedKeys[0] });
    //   }
    /**获取查询时菜单名称的实时变化 */
    searchContentChange(e){
        const value = e.target.value;
        this.setState({searchContent:value});
    }
    searchEvent(){
    const ope_name = this.state.searchContent;
    axios({
        url:`${this.url.processManagement.getAllByPage}`,
        method:'get',
        headers:{
            'Authorization':this.Authorization
        },
        params:{
            size: this.pagination.pageSize,
            page: this.pagination.current,
            taskName:ope_name
        },
        type:'json',
    }).then((data)=>{
        const res = data.data.data;
        if(res&&res.list){
            this.pagination.total=res.total;
            for(var i = 1; i<=res.list.length; i++){
                res.list[i-1]['index']=(res.prePage)*10+i;
            }
            this.setState({
                dataSource: res.list,
            });
        }
    })
    };
    handleReset = clearFilters => () => {
        clearFilters();
        this.setState({ searchText: '' });
    }
    start = () => {
        const ids = this.state.selectedRowKeys;
        axios({
            url:`${this.url.processManagement.deleteByIds}`,
            method:'delete',
            headers:{
                'Authorization':this.Authorization
            },
            data:ids,
            type:'json'
        }).then((data)=>{
            message.info(data.data.message);
            if((this.pagination.total-1)%10===0){
                this.pagination.current = this.pagination.current-1
            }
            this.handleTableChange(this.pagination);
        })
    };
    cancel() {
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }
    rowSelected(selectedRowKeys){
        this.setState({
          selectedIds: selectedRowKeys
        });
      }
      /**实现全选 */
      onSelectChange(selectedRowKeys) {
        this.setState({ selectedRowKeys:selectedRowKeys });
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        this.status = JSON.parse(localStorage.getItem('status'));
        const current = JSON.parse(localStorage.getItem('current'));
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            onSelect() {},
            onSelectAll() {},
            getCheckboxProps: record => ({
                disabled: record.commonBatchNumber.status === 2, // Column configuration not to be checked
              }),
          };
            return(
                <div>
                    <BlockQuote name={current.menuName} menu={current.menuParent}></BlockQuote>
                    <div style={{padding:'15px'}}>
                    <Add 
                        fetch={this.fetch}
                        flag={this.judgeOperation(this.operation,'SAVE')}
                    />&nbsp;&nbsp;&nbsp;
                    <DeleteByIds
                        selectedRowKeys={this.state.selectedRowKeys}
                        deleteByIds={this.start}
                        loading={loading}
                        cancel={this.cancel}
                        flag={this.judgeOperation(this.operation,'DELETE')}
                    />
                    <SearchCell name='请输入流程名称' searchEvent={this.searchEvent} searchContentChange={this.searchContentChange} fetch={this.fetch} flag={this.judgeOperation(this.operation,'QUERY')}/>              
                    <div className='clear' ></div>
                    <Table rowSelection={rowSelection} columns={this.columns} pagination={this.pagination} dataSource={this.state.dataSource} scroll={{ y: 400 }} rowKey={record => record.commonBatchNumber.id} size="small" bordered onChange={this.handleTableChange}/>
                        </div>
                </div>
            );
    }
}
export default Management;