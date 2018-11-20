import React from 'react';
import {Table, Input, InputNumber, Popconfirm, Form, Divider, message,Select} from 'antd';
import DeletaSpan from './deleteSpan';
import axios from "axios";


const Option = Select.Option;
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
        if (this.props.inputType === 'select') {
            return <Select >
            {
              this.props.fathermenu.map(de=>{
                return (
                  <Option key={de.id} value={de.menuName}>{de.menuName}</Option>
                );
              })
            }
          {/* <Option value="1">生产部</Option>
          <Option value="2">测试部</Option> */}
          
      </Select>;
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
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{ margin: 0 }}>
                                    {getFieldDecorator(dataIndex, {
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
/**这是个令牌，每次调用接口都将其放在header里 */
const Authorization = localStorage.getItem('Authorization');

class MenuTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            editingKey: '',
        };
        this.isEditing = this.isEditing.bind(this);
        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'id',
        sorter: (a, b) => a.id - b.id,
        align:'center',
        width: '15%',
    },{
        title: '菜单名称',
        dataIndex: 'menuName',
        key: 'menuName',
        align:'center',
        editable: 1,
        width: '20%',
    },{
        title: '描述',
        dataIndex: 'prefix',
        key: 'prefix',
        align:'center',
        editable: 1,
        width: '20%',
    },{
        title: '父菜单',
        dataIndex: 'parent',
        key: 'parent',
        align:'center',
        editable: 1,
        width: '20%',
    },{
        title: '操作',
        key: 'operation',
        align:'center',
        width: '20%',
        render: (text,record) => {
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
                                            onClick={() => this.save(form, record.id)}
                                            style={{ marginRight: 8 }}
                                        >
                                            保存
                                        </a>
                                    )}
                                    </EditableContext.Consumer>
                                <Popconfirm
                                    title="确定取消?"
                                    onConfirm={() => this.cancel(record.id)}
                                    okText="确定" cancelText="取消"
                                >
                                    <a>取消</a>
                                </Popconfirm>
                            </span>
                        ) : (
                            <a onClick={() => this.edit(record.id)}>编辑</a>
                        )}
                        </span>
                    <Divider type="vertical" />
                    <DeletaSpan
                        record={record}
                        getFetch={this.getFetch.bind(this)}
                    />

                </span>
            )
        }
    }];
    render(){
        //  单行编辑
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const table_column =this. columns.map((col) => {
            if (!col.editable) {
              return col;
            }
            return {
              ...col,
              onCell: record => ({
                record,
                inputType: col.dataIndex === 'parent' ? 'select' : 'text',
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: this.isEditing(record),
                fathermenu:this.props.fatherMenu
              }),
            };
          });
        return (
            <Table
                components={components}
                rowClassName="editable-row"
                rowKey={record => record.id}
                dataSource={this.props.data}
                columns={table_column}
                rowSelection={this.props.rowSelection}
                pagination={this.props.pagination}
                // handleTableChange={this.props.handleTableChange}
                size="small"
                bordered
                scroll={{ y: 400 }}
                onChange={this.props.handleTableChange}
            />
        );
    };
    /**实现初始化页面功能 */
    getFetch = () => {
        this.props.fetch();
    };
    /**---------------------- */
    /**实现字段搜索功能 */
    isEditing = (record) => {
        return record.id === this.state.editingKey;
    };

    edit(id) {
        console.log(id);
        console.log(this.state.editingKey)
        this.setState({ editingKey: id });
    }

    save(form, id) {
        /**row代表修改后的数据  item 代表原始数据 */
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.props.data];
            const index = newData.findIndex(item => id === item.id);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                const data = row;
                data['id'] = id.toString()
                console.log(data)
                axios({
                    url:'http://218.77.105.241:40080/jc/menu/update',
                    method:'post',
                    headers:{
                        'Authorization':Authorization
                    },
                    data:data,
                    type:'json'
                }).then((data)=>{
                    message.info(data.data.message);
                    this.props.fetch();
                }).catch((error)=>{
                    console.log(error);
                    message.info(error.data.message);
                });
                this.props.modifyDataSource(newData);
                this.setState({ editingKey: '' });
            } else {
                newData.push(row);
                this.props.modifyDataSource(newData);
                this.setState({ editingKey: '' });
            }
        });
    }

    cancel = () => {
        this.setState({ editingKey: '' });
    };
}

export default MenuTable;