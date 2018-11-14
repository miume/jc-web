import React from 'react';
import WhiteSpace from '../BlockQuote/whiteSpace';
import BlockQuote from '../BlockQuote/blockquote';
import DepartTable from './departTable';
import AddModal from './addModal';
import DeleteModal from './deleteModal';
import '../Home/page.css';
// import './departTable.css';
import axios from 'axios';

import {Button, Divider, Icon, Input, Popconfirm,Form,InputNumber,} from "antd";


//数据
// const data = [{
//     key: '1',
//     name: 'A部'
// },{
//     key: '2',
//     name: 'B部'
// },{
//     key: '3',
//     name: 'C部'
// }];
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

const Authorization = 'JCeyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbi1bUk9MRV9BVVRIX1JPTEVfREVMRVRFLCBST0xFX0FVVEhfQVVUSF9ERUxFVEUsIFJPTEVfQVVUSF9BVVRIX1VQREFURSwgUk9MRV9BVVRIX1JPTEVfVVBEQVRFLCBST0xFX0FVVEhfQVVUSF9ET1dOTE9BRCwgUk9MRV9BVVRIX01FTlVfRE9XTkxPQUQsIFJPTEVfQVVUSF9NRU5VX1BSSU5ULCBST0xFX0FVVEhfUk9MRV9BVURJVCwgUk9MRV9BVVRIX01FTlVfUVVFUlksIFJPTEVfVVNFUiwgUk9MRV9BVVRIX1JPTEVfRE9XTkxPQUQsIFJPTEVfQVVUSF9BVVRIX1NBVkUsIFJPTEVfQVVUSF9BVVRIX1BSSU5ULCBST0xFX0FVVEhfUk9MRV9RVUVSWSwgUk9MRV9BVVRIX0FVVEhfVVBMT0FELCBST0xFX0FVVEhfTUVOVV9TQVZFLCBST0xFX0FVVEhfUk9MRV9TQVZFLCBST0xFX0FVVEhfTUVOVV9ERUxFVEUsIFJPTEVfQVVUSF9BVVRIX1FVRVJZLCBST0xFX0FVVEhfUk9MRV9QUklOVCwgUk9MRV9BVVRIX01FTlVfQVVESVQsIFJPTEVfQVVUSF9ST0xFX1VQTE9BRCwgUk9MRV9BVVRIX0FVVEhfQVVESVQsIFJPTEVfQVVUSF9NRU5VX1VQTE9BRCwgUk9MRV9BRE1JTiwgUk9MRV9BVVRIX01FTlVfVVBEQVRFXSIsImV4cCI6MTU0MjI1OTA1OX0.vKyoQ2Q_NBf3MEDc-qa2v4YOdftGYXKvFdb_RyXQYrHCHIvAbg0faTvPYkzEDSgqGAhljI87ry4T5Pn6hbG2cw'
class Depart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],       //数据
            selectedRowKeys: [],    //多选框key
            visible: false,         //是否可见
            editingKey: '',         //编辑id
            pagination: {},
            loading: false,
            Authorization:Authorization
        };
        //  父组件方法绑定
        this.deleteByIds = this.deleteByIds.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        //  列
        this.columns = [{
            title: '序号',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.key - b.key,
            align:'center',
            width: '20%',
        },{
            title: '部门名称',
            dataIndex: 'department_name',
            key: 'department_name',
            align:'center',
            width: '25%',
            editable: 1,
        },{
            title: '描述',
            dataIndex: 'extra_info',
            key: 'extra_info',
            align:'center',
            width: '25%',
            editable: 1,
        },{
            title: '操作',
            key: 'operation',
            align:'center',
            width: '25%',
            render: (text, record) => {
                const editable = this.isEditing(record);
                console.log(record);
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
    /**获取所有数据 getAllByPage */
    handleTableChange = (pagination) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: 'id',
            sortOrder: 'desc',
        });
    };
    fetch = (params = {}) => {
        console.log('params:', params);
        this.setState({ loading: true });
        // var url = 'http://218.77.105.241:40080/jc/department/getDepartmentsByPage?size=10&orderField='+params.sortField+'&orderType='+sortField.sortOrder;
        var url = 'http://218.77.105.241:40080/jc/department/getDepartmentsByPage?size=10&orderField=id&orderType=desc';
        axios({
            url: url,
            method: 'get',
            headers:{
                'Authorization': Authorization
            },
            data: {
                // results: 10,
                ...params,
            },
            type: 'json',
        }).then((data) => {
            console.log(data);
            const pagination = { ...this.state.pagination };
            console.log(data.data.data.list);
            // Read total count from server
            // pagination.total = data.totalCount;
            pagination.total = 200;
            this.setState({
                loading: false,
                dataSource: data.data.data.list,
                pagination,
            });
        });
    };
    /** ----------------------*/
    componentDidMount() {
        this.fetch();
    }
    //render()是进行复杂的页面渲染
    render() {
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        // console.log(this.state.dataSource);
        const pagination = {
            total: this.state.dataSource,
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
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                    handleTableChange={this.handleTableChange}
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