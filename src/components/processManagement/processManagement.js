import React from 'react';
import '../Home/page.css';
import { Table,Input,Icon,Button,InputNumber,Form,Popconfirm,Divider,Modal } from 'antd';
import BlockQuote from '../BlockQuote/blockquote';
import SearchCell from '../BlockQuote/search';
import DeleteByIds from '../roleManagement/deleteByIds';
import Add from './processAdd';
import Detail from './detail';
import Editor from './editor';


const data = [];
const FormItem = Form.Item;

for (let i = 0; i < 46; i++) {
    data.push({
      key: i.toString(),
      name: `流程${i}`,
      creater:`创建人${i}`,
      createTime:`时间${i}`,
      type:`类型${i}`,
      status:`状态${i}`,
    });
}

class Management extends React.Component{
    constructor(props){
        super(props)
        this.onSelectChange = this.onSelectChange.bind(this);
        this.deleteByIds = this.deleteByIds.bind(this);
        this.cancle = this.cancle.bind(this);
        this.state = {
            dataSource : data,
            count : 2,
            searchText: '',
            editingKey: '',
            visible: false,
            roleDescription: '',
            roleName: '',
            selectedRowKeys: [],
        }
        this.columns = [{
            title: '序号',
            dataIndex: 'key',
            key: 'key',
            sorter: (a, b) => a.key - b.key,
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
            dataIndex: 'creater',
            key: 'creater',
            align:'center',
            width: '15%',
        },{
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            align:'center',
            width: '15%',
        },{
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            align:'center',
            width: '15%',
        },{
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            align:'center',
            width: '15%',
        },{
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            align:'center',
            width: '15%',
            render : (text,record) =>{
                return (
                    <span>
                        <Detail value={record} />
                        <Divider type="vertical" />
                        <Editor value={record} />
                        {/* <Divider type="vertical" />
                        <Popconfirm title="确定删除?" onConfirm={()=>this.handleDelete(record.key)} okText="确定" cancelText="取消" >
                            <a href="#">删除</a>
                        </Popconfirm> */}
                    </span>
                    );
            }
        }]
    }
    cancle() {

    }
    deleteByIds() {
        const ids = this.state.selectedRowKeys.toString();
        console.log(ids)
     }
    handleSearch = (selectedKeys, confirm) => () => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
      }
    
    handleReset = clearFilters => () => {
        clearFilters();
        this.setState({ searchText: '' });
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
        const rowSelection = {
            onChange: this.onSelectChange,
            onSelect() {},
            onSelectAll() {},
          };
          const pagination = {
            total: data.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
              console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange(current) {
              console.log('Current: ', current);
            }
          };
            return(
                <div>
                    <BlockQuote name="流程管理"></BlockQuote>
                    <div style={{paddingTop:'10px'}}>
                    <Add />
                    <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} />
                    <span style={{float:'right',paddingBottom:'8px'}}>
                        <SearchCell name='请输入流程名称'/>
                    </span>
                    </div>
                <Table rowSelection={rowSelection} columns={this.columns} pagination={pagination} dataSource={this.state.dataSource} scroll={{ y: 400 }} size="small" bordered />
                </div>
            );
    }
}
export default Management;