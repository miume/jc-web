import React from 'react';
import {Button, Input, Icon, Popconfirm, Form, InputNumber, Divider, Modal} from 'antd';
// import reqwest from 'reqwest'
import axios from 'axios';

import '../Home/page.css';
import WhiteSpace from '../BlockQuote/whiteSpace';
import BlockQuote from '../BlockQuote/blockquote';
import ApiTable from './ApiTable';
import ApiModal from './apiModal';
import DeleteByIds from './deleteByIds';
const EditableContext = React.createContext(); // ??这个是什么作用
const FormItem = Form.Item;
const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow); //??

//  表中数据
const data = [{
    key: '1',
    name: '新增',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  }, {
    key: '2',
    name: '删除',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  }, {
    key: '3',
    name: '编辑',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  }];
//  编辑
class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };
    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    this.form = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{ margin: 0 }}>
                                    {form.getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: true,
                                            message: `Please Input ${title}!`,
                                        }],
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

// const Authorization = 'JCeyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbi1bUk9MRV9BVVRIX1JPTEVfREVMRVRFLCBST0xFX0FVVEhfQVVUSF9ERUxFVEUsIFJPTEVfQVVUSF9BVVRIX1VQREFURSwgUk9MRV9BVVRIX01FTlVfU0FWRSwgUk9MRV9BVVRIX1JPTEVfVVBEQVRFLCBST0xFX0FVVEhfQVVUSF9ET1dOTE9BRCwgUk9MRV9BVVRIX01FTlVfRE9XTkxPQUQsIFJPTEVfQVVUSF9NRU5VX1BSSU5ULCBST0xFX0FVVEhfUk9MRV9TQVZFLCBST0xFX0FVVEhfTUVOVV9ERUxFVEUsIFJPTEVfQVVUSF9BVVRIX1FVRVJZLCBST0xFX0FVVEhfUk9MRV9BVURJVCwgUk9MRV9BVVRIX1JPTEVfUFJJTlQsIFJPTEVfQVVUSF9NRU5VX1FVRVJZLCBST0xFX0FVVEhfTUVOVV9BVURJVCwgUk9MRV9BVVRIX1JPTEVfVVBMT0FELCBST0xFX0FVVEhfUk9MRV9ET1dOTE9BRCwgUk9MRV9BVVRIX0FVVEhfU0FWRSwgUk9MRV9BVVRIX0FVVEhfQVVESVQsIFJPTEVfQVVUSF9BVVRIX1BSSU5ULCBST0xFX0FVVEhfTUVOVV9VUExPQUQsIFJPTEVfQVVUSF9ST0xFX1FVRVJZLCBST0xFX0FVVEhfTUVOVV9VUERBVEUsIFJPTEVfQVVUSF9BVVRIX1VQTE9BRF0iLCJleHAiOjE1NDIwODUxNzB9.9mRieOuE9oBKrYp37IkG9LpvoJ9xCv2R9hrRBnvRuAZTYXx9-xv16X4xqCxK46B3MzoqW2wB9DvKnaZXpAAg7w'
class Api extends React.Component {
    //  构造--进行初始化
    constructor(props) {    // 有constructor构造方法，则必须有super继承
        super(props);
        this.state = {      //维持组件状态，当状态改变时，仅这部分进行更新
            dataSource : data,
            editingKey : '',    //编辑
            visible : false,    //弹出框是否弹出
            apiName : '' ,       //弹出框中操作名称
            searchText : '',
            selectedRowKeys: [],
            // pagination: {},
            // loading: false,
        };
        // 给子组件调用方法，需要进行绑定
        this.handleApiNameChange = this.handleApiNameChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        //  各列下的一系列的渲染
        //  表头数据与表头所需要实现的功能
        this.columns = [{
            title : '序号',
            dataIndex : 'key',
            key : 'key',
            sorter : (a, b) => a.key - b.key, //  列排序设置
            align : 'center',
            width: '15%',
        },{
            title : '操作名称',
            dataIndex : 'name',
            key : 'name',
            align : 'center',
            editable : 1, // ？？--弹出框？
            width : '40%',
            filterDropdown : ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
                <div className = "custom-filter-dropdown">
                    <Input
                        ref={ ele => this.searchInput = ele }  // 表头添加一个搜索
                        placeholder="操作名称"
                        value={ selectedKeys[0] }
                        onChange={ e => setSelectedKeys(e.target.value ? [e.target.value] : []) }
                        onPressEnter={ this.handleSearch(selectedKeys, confirm) }
                    />
                    <Button type = "primary" onClick={ this.handleSearch(selectedKeys, confirm)}>搜索</Button>
                    <Button onClick={this.handleReset(clearFilters)}>重置</Button>
                </div>
            ),
            filterIcon : filtered => <Icon type="search" style={{ color : filtered ? '#108ee9' : '#aaa',fontSize:'18px'}} />,
            // onFilter 用于筛选当前数据
            onFileter : (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => {
                        this.searchInput.focus();
                    });
                }
            },
            render : (text) => {
                const { searchText } = this.state;
                return searchText ? (
                    <span>
                    {text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((fragment, i) => (
                        fragment.toLowerCase() === searchText.toLowerCase()
                            ? <span key={i} className="highlight">{fragment}</span> : fragment
                    ))}
                  </span>
                ) : text;
            },
        },{
            title : '操作',
            key : 'operation',
            align :'center',
            width : '40%',
            render : (text, record) => {
                const editable = this.isEditing(record);
                return (
                    <span>
                        <span>
                        {editable ? (
                            <span>
                                <EditableContext.Consumer>
                                    {form => (
                                        <a
                                            href="javascript:;"
                                            onClick={() => this.save(form, record.key)}
                                            style={{ marginRight : 8}}>保存</a>
                                    )}
                                </EditableContext.Consumer>
                                <Popconfirm title="确认取消？" onConfirm={() => this.cancel(record.key)} okText="确定" cancelText="取消">
                                    <a>取消</a>
                                </Popconfirm>
                            </span>
                        ) : (
                            <a onClick={() => this.edit(record.key)}>编辑</a>
                        )}
                    </span>
                    <Divider type="vertical" />
                        <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record.key)} okText="确定" cancelText="取消" >
                            <a href="#">删除</a>
                        </Popconfirm>
                    </span>
                )
            },
            onFilter: (value, record) => record.address.indexOf(value) === 0,
        }]
    }
    handleApiNameChange(e) {    // 当api状态改变时，则
        this.setState({apiName : e.target.value})
    };
    handleDelete = (key) => {
        const dataSource = this.state.dataSource;
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
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
    /**相关处理 */
    isEditing = (record) => {
        return record.key === this.state.editingKey;
    };
    cancel = () => {
        this.setState({ editingKey: '' });
    };
    /**处理新增一条记录 */
    handleAdd = () => {
        this.setState({
            visible: true
        });
    };
    handleOk() {
        console.log(this.formRef.getItemsValue());
        this.setState({
            visible: false
        });
    }

    handleCancel() {
        this.setState({
            visible: false
        });
    }
    edit(key) {
        this.setState({ editingKey: key });
    };
    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = this.state.dataSource;
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({ dataSource: newData, editingKey: '' });
            } else {
                newData.push(row);
                this.setState({ dataSource: newData, editingKey: '' });
            }
        });
    };


    /**实现全选 */
    onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys:selectedRowKeys });
    }
    render() {
        const rowSelection = {
            onChange: this.onSelectChange,
            onSelect() {
                // console.log(record, selected, selectedRows);
            },
            onSelectAll() {
                // console.log(selected, selectedRows, changeRows);
            },
        };
        //  分页设置
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
        //  点编辑，在每个对应列下面弹出修改框
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });
        return (
            <div>
                <BlockQuote name="操作管理"></BlockQuote>
                <div className="fl">
                    <Button type="primary" size="small" style={{marginRight:'15px'}}  onClick={() => this.handleAdd()} >新增</Button>
                    <Modal title="新增" visible={this.state.visible}
                           onOk={() => this.handleOk()} onCancel={() => this.handleCancel()}
                           footer={[
                               <Button key="submit" type="primary" size="large" onClick={() => this.handleOk()}>确 定</Button>,
                               <Button key="back" type="ghost" size="large" onClick={() => this.handleCancel()}>返 回</Button>
                           ]}>
                        <ApiModal wrappedComponentRef={(form) => this.formRef = form}></ApiModal>
                    </Modal>
                    <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} />
                </div>
                <WhiteSpace></WhiteSpace>
                <div className='clear' ></div>
                <ApiTable data={this.state.dataSource} rowSelection={rowSelection} columns={columns} pagination={pagination} components={components} />
            </div>

        );
    }
}

export default Api;