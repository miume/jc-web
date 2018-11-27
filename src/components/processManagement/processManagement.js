import React from 'react';
import '../Home/page.css';
import { Table,Input,Icon,Button,InputNumber,Form,Popconfirm,Divider,Modal,message } from 'antd';
import BlockQuote from '../BlockQuote/blockquote';
import SearchCell from '../BlockQuote/search';
import DeleteByIds from './deleteByIds';
import Add from './addModal';
import Detail from './detail';
import Editor from './editor';
import axios from "axios";

const FormItem = Form.Item;

class Management extends React.Component{
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
        this.cancle = this.cancle.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.start=this.start.bind(this);
        this.cancel=this.cancel.bind(this);
        this.handleTableChange=this.handleTableChange.bind(this);
        this.pagination = {
            total: this.state.dataSource.length,
            showTotal(total){
                return `共${total}条记录`
            },
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
              console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange(current) {
              console.log('Current: ', current);
            }
          };
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'batchNumberId',
            sorter: (a, b) => a.batchNumberId - b.batchNumberId,
            align:'center',
            width: '10%',
        },{
            title: '流程名称',
            dataIndex: 'name',
            key: 'name',
            align:'center',
            width: '15%',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div className="custom-filter-dropdown">
                  <Input
                    ref={ele => this.searchInput = ele}
                    placeholder="流程名称"
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={this.handleSearch(selectedKeys, confirm)}
                  />
                  <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>搜索</Button>
                  <Button onClick={this.handleReset(clearFilters)}>重置</Button>
                </div>
              ),
              filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
              onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
              onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                  setTimeout(() => {
                    this.searchInput.focus();
                  });
                }
              },
              render: (text) => {
                const { searchText } = this.state;
                return searchText ? (
                  <span>
                    {text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((fragment, i) => (
                      fragment.toLowerCase() === searchText.toLowerCase()
                        ? <span key={i} className="highlight">{fragment}</span> : fragment // eslint-disable-line
                    ))}
                  </span>
                ) : text;
              },
        },{
            title: '创建人',
            dataIndex: 'personName',
            key: 'personName',
            align:'center',
            width: '13%',
        },{
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            align:'center',
            width: '15%',
        },{
            title: '审核状态',
            dataIndex: 'status',
            key: 'status',
            align:'center',
            width: '13%',
            render(text,record){
                switch(record.status){
                    case -1 : return "已保存未提交"
                    break;
                    case 0 : return "已审核未提交"
                    break;
                    case 1 : return "审核"
                    break;
                    case 2 : return "审核通过"
                    break;
                    case 3 : return "审核未通过"
                    break;
                    case 4 : return "合格"
                    break;
                    case 5 : return "不合格"
                    break;
                    default : return ''
                }
            }
        },{
            title: '是否紧急',
            dataIndex: 'isUrgent',
            key: 'isUrgent',
            align:'center',
            width: '13%',
            render(text,record){
                if(record.isUrgent === 0){
                    return '不紧急'
                }else {
                    return "紧急"
                }
            }
        },{
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            align:'center',
            width: '13%',
            render : (text,record) =>{
                return (
                    <span>
                        <Detail value={record} />
                        <Divider type="vertical" />
                        <Editor value={record} />
                        <Divider type="vertical" />
                        <Popconfirm title="确定删除?" onConfirm={()=>this.handleDelete(record.batchNumberId)} okText="确定" cancelText="取消" >
                            <a href="#">删除</a>
                        </Popconfirm>
                    </span>
                    );
            }
        }]
    }
    cancle() {

    }
    handleDelete = (id) => {
        axios({
            url:'http://2p277534k9.iok.la:58718/jc/batchAuditTask/'+parseInt(id),
            method:'Delete',
            // headers:{
            //     'Authorization':Authorization
            // },
        }).then((data)=>{
            console.log(data);
            message.info(data.data.message);
        }).catch((error)=>{
            console.log(error);
            message.info(error.data)
        });
        setTimeout(() => {
            this.fetch();
        }, 1000);
    }
    /**获取所有数据 getAllByPage */
    handleTableChange = (pagination) => {
        this.fetch({
            size: pagination.pageSize,
            page: pagination.current,
            orderField: 'batchNumberId',
            orderType: 'desc',
  
        });
    };
    fetch = (params = {}) => {
        this.setState({ loading: true });
        axios({
            url: 'http://2p277534k9.iok.la:58718/jc/batchAuditTask/getAllByPage',
            method: 'get',
            // headers:{
            //     'Authorization': Authorization
            // },
            params: params,
            // type: 'json',
        }).then((data) => {
            const res = data.data.data;
            console.log(res)
            this.pagination.total=res.total;
            for(var i = 1; i<=res.list.length; i++){
                res.list[i-1]['index']=(res.prePage)*10+i;
            }
            this.setState({
                loading: false,
                dataSource: res.list,
            });
        })
    };
    componentDidMount() {
        this.fetch();
    }
    handleSearch = (selectedKeys, confirm) => () => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
      }
    /**获取查询时菜单名称的实时变化 */
    searchContentChange(e){
        const value = e.target.value;
        this.setState({searchContent:value});
    }
    searchEvent(){
    const ope_name = this.state.searchContent;
    axios({
        url:'http://2p277534k9.iok.la:58718/jc/batchAuditTask/getAllByPageByFactors',
        method:'get',
        // headers:{
        //     'Authorization':Authorization
        // },
        params:{
            size: this.pagination.pageSize,
            page: this.pagination.current,
            name:ope_name
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
    handleReset = clearFilters => () => {
        clearFilters();
        this.setState({ searchText: '' });
    }
    start = () => {
        const ids = this.state.selectedRowKeys;
        console.log(ids)
        axios({
            url:'http://2p277534k9.iok.la:58718/jc/batchAuditTask/deleteByIds',
            method:'delete',
            // headers:{
            //     'Authorization':Authorization
            // },
            data:ids,
            type:'json'
        }).then((data)=>{
            message.info(data.data.message);
            this.fetch();
        }).catch((error)=>{
            message.info(error.data.message)
        });
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
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys:selectedRowKeys }); 
    }
    render(){
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            onSelect() {},
            onSelectAll() {},
          };
            return(
                <div>
                    <BlockQuote name="流程管理" menu='质量与流程'></BlockQuote>
                    <div style={{padding:'15px'}}>
                    <Add />
                    <DeleteByIds
                        selectedRowKeys={this.state.selectedRowKeys}
                        start={this.start}
                        loading={loading}
                        cancel={this.cancel}
                    />
                    <span style={{float:'right',paddingBottom:'8px'}}>
                        <SearchCell name='请输入流程名称' searchEvent={this.searchEvent} searchContentChange={this.searchContentChange} fetch={this.fetch}/>
                    </span>
                <Table rowSelection={rowSelection} columns={this.columns} pagination={this.pagination} dataSource={this.state.dataSource} scroll={{ y: 400 }} rowKey={record => record.batchNumberId} size="small" bordered onChange={this.handleTableChange}/>
                    </div>
                </div>
            );
    }
}
export default Management;