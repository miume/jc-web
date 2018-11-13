import React from 'react';
import WhiteSpace from '../BlockQuote/whiteSpace';
import '../Home/page.css';
import { Table,Input,Icon,Button,InputNumber,Form,Popconfirm,Divider,Modal } from 'antd';
import BlockQuote from '../BlockQuote/blockquote';

const data = [];
const FormItem = Form.Item;

for (let i = 0; i < 46; i++) {
    data.push({
      key: i.toString(),
      name: `流程${i}`,
      crafts:`工艺${i}`,
      type:`类型${i}`,
      personOne:`负责人${i}`,
      personTwo:`负责人${i}`,
      personThree:`负责人${i}`,
      personFour:`负责人${i}`,
      personFive:`负责人${i}`,
    });
}

class Management extends React.Component{
    constructor(props){
        super(props)
        this.onSelectChange = this.onSelectChange.bind(this);
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
            width: '10%',
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
            title: '所属工艺',
            dataIndex: 'crafts',
            key: 'crafts',
            align:'center',
            width: '10%',
        },{
            title: '流程类型',
            dataIndex: 'type',
            key: 'type',
            align:'center',
            width: '10%',
        },{
            title: '负责人1',
            dataIndex: 'personOne',
            key: 'personOne',
            align:'center',
            width: '10%',
        },{
            title: '负责人2',
            dataIndex: 'personTwo',
            key: 'personTwo',
            align:'center',
            width: '10%',
        },{
            title: '负责人3',
            dataIndex: 'personThree',
            key: 'personThree',
            align:'center',
            width: '10%',
        },{
            title: '负责人4',
            dataIndex: 'personFour',
            key: 'personFour',
            align:'center',
            width: '10%',
        },{
            title: '负责人5',
            dataIndex: 'personFive',
            key: 'personFive',
            align:'center',
            width: '10%',
        }]
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
            onSelect() {
                // console.log(record, selected, selectedRows);
            },
            onSelectAll() {
                // console.log(selected, selectedRows, changeRows);
            },
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
                    <WhiteSpace></WhiteSpace>
                <div className='clear' ></div>
                <Table rowSelection={rowSelection} columns={this.columns} pagination={pagination} dataSource={this.state.dataSource} scroll={{ y: 400 }} size="small" bordered />
                </div>
            );
    }
}
export default Management;