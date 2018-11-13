import React from 'react';
import { Table, Input, Button, Icon, InputNumber, Popconfirm, Form } from 'antd';
import './departTable.css';
import DeleteModal from './deleteModal';
class DepartTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            searchText: '',
            //删除多项选择框
            selectedRowKeys: [],
        };
        this.columns = [{
            title: '序号',
            dataIndex: 'key',
            key: 'key',
            sorter: (a, b) => a.key - b.key,
            align:'center',
            width: '20%',
        },{
            title: '部门名称',
            dataIndex: 'name',
            key: 'name',
            align:'center',
            width: '50%',
            editable: true,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={ele => this.searchInput = ele}
                        placeholder="部门名称"
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={this.handleSearch(selectedKeys, confirm)}
                    />
                    <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>搜索</Button>
                    <Button onClick={this.handleReset(clearFilters)}>重置</Button>
                </div>
            ),
            filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#108ee9' : '#aaa' , fontSize:'18px'}} />,
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
            title: '操作',
            key: 'operation',
            align:'center',
            width: '28%',
        }];
    };
    render() {
        return(
            // 属性应该放在标签里面
            <Table
                columns={this.columns}
                dataSource={this.state.data}
                rowSelection={this.rowSelection}
            />
        );
    }
    /**实现字段搜索功能 */
    handleSearch = (selectedKeys, confirm) => () => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };
    handleReset = clearFilters => () => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    /**---------------------- */

    /**实现多选功能 */
    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            this.setState({ selectedRowKeys });
        },
    };
    /**---------------------- */

    /**实现字段搜索功能 */
    /**---------------------- */
}

export default DepartTable;