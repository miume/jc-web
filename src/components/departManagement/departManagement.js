import React from 'react';
import WhiteSpace from '../BlockQuote/whiteSpace';
import BlockQuote from '../BlockQuote/blockquote';
import DepartTable from './departTable';
import AddModal from './addModal';
import DeleteModal from './deleteModal';
import '../Home/page.css';
// import './departTable.css';
import {Button, Divider, Icon, Input, Popconfirm,Form,InputNumber,} from "antd";
import UserManagement from "../roleManagement/userManagement";
import PermissionManagement from "../roleManagement/permissionManagement";

//数据
const data = [{
    key: '1',
    name: 'A部'
},{
    key: '2',
    name: 'B部'
},{
    key: '3',
    name: 'C部'
}];
//行编辑
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);
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

class Depart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: data,       //数据
            selectedRowKeys: [],    //多选框key
            visible: false,         //是否可见
            editingKey: '',         //编辑id
        };
        //  父组件方法绑定
        this.deleteByIds = this.deleteByIds.bind(this);
        //  列
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
            editable: 1,
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
            render: (text, record) => {
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
                                            style={{ marginRight: 8 }}
                                        >保存</a>
                                    )}
                                    </EditableContext.Consumer>
                                <Popconfirm title="确定取消?" onConfirm={() => this.cancel(record.key)}  okText="确定" cancelText="取消" >
                                    <a>取消</a>
                                </Popconfirm>
                            </span>
                        ) : (
                            <a onClick={() => this.edit(record.key)}>编辑</a>
                        )}
                        </span>
                        <Divider type="vertical" />
                        <Popconfirm title="确定删除?" onConfirm={()=>this.handleDelete(record.key)} okText="确定" cancelText="取消" >
                            <a href="#">删除</a>
                        </Popconfirm>
                    </span>
                )
            }
        }];
    }
    //render()是进行复杂的页面渲染
    render() {
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
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
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable ,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });
        return(
            <div>
                <BlockQuote name="部门管理"/>
                <div className="fl">
                    <AddModal />
                    <DeleteModal selectedRowKeys={this.state.selectedRowKeys}/>
                </div>
                <WhiteSpace></WhiteSpace>
                <div className='clear' ></div>
                {/*父组件通过属性dataSource(子组件的state值)={本state}将值传给子组件的state里参数*/}
                <DepartTable
                    data={this.state.dataSource}
                    columns={columns}
                    rowSelection={this.rowSelection}
                    components={components}
                    pagination={pagination}
                    rowClassName="editable-row"
                />
            </div>
        )
    }
    /**修改父组件的数据 */
    modifyDataSource = (data) => {
        this.setState({dataSource:data});
    };
    modifySelectedRowKeys = (data) => {
        this.setState({selectedRowKeys:data});
    };
    /**---------------------- */
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
            this.modifySelectedRowKeys(selectedRowKeys);
        },
    };
    /**---------------------- */
    /**实现批量删除功能 */
    deleteByIds() {
        const ids = this.state.selectedRowKeys.toString();
        console.log(ids)
    }
    /**---------------------- */
    /**实现行编辑功能 */
    isEditing = (record) => {
        return record.key === this.state.editingKey;
    };
    edit(key) {
        this.setState({ editingKey: key });
    };
    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.dataSource];
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
    cancel = () => {
        this.setState({ editingKey: '' });
    };
    handleDelete(key){
        const dataSource = this.state.dataSource;
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }

    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */
}

export default Depart;