import React from 'react';
import {Table, Input, Popconfirm, Form, Divider, message,Select,Icon} from 'antd';
import DeletaSpan from './deleteSpan';
import axios from "axios";
import SearchFather from './searchCell'

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
        if (this.props.inputType === 'select' && this.props.record.parent !== -1) {
            return <Select >
              {
                this.props.fathermenu.map(de=>{
                  return (//这个.id是根据后端部门getAll传过来的字段名称决定的
                    <Option key={de.id} value={de.id}>{de.menuName}</Option>
                  );
                })
              }
        </Select>;
        }
        return <Input disabled= {this.props.inputType === 'select' && this.props.record.parent===-1?true:false}/>;
    };
    render() {
        const {
            editing,
            dataIndex,
            title,
            record,
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
                                        initialValue: record[dataIndex]===-1?"无父菜单":record[dataIndex],
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

class MenuTable extends React.Component{
    url
    constructor(props){
        super(props);
        this.state = {
            editingKey: '',
            searchText: '',

        };
        this.Authorization = localStorage.getItem('Authorization');
        this.isEditing = this.isEditing.bind(this);
        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
    }


    columns = this.props.judgeOperation(this.props.operation,'DELETE')||this.props.judgeOperation(this.props.operation,'UPDATE')?[{
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
        title: '类型',
        dataIndex : 'menuType',
        key: 'menuType',
        align:'center',
        width: '20%',
        render:(text, record)=>{
            if(record.menuType===1){
                return '父菜单'
            }else if(record.menuType>=2){
                return '子菜单'
            }
        }
    },{
        title: '父菜单',
        dataIndex: 'parent',
        key: 'parentName',
        align:'center',
        editable: 1,
        width: '20%',
        render:(text,record)=>{
            return record.parentName
        }
    },{
        title: '操作',
        key: 'operation',
        align:'center',
        width: '20%',
        render: (text,record) => {
            const editable = this.isEditing(record);
            return (
                <span>
                    <span className={this.props.judgeOperation(this.props.operation,'UPDATE')?'':'hide'}>
                        {editable ? (
                            <span>
                                <EditableContext.Consumer>
                                    {form => (
                                        <span
                                            onClick={() => this.save(form, record.menuId)}
                                            style={{ marginRight: 8 }}
                                            className="blue"
                                        >
                                            保存
                                        </span>
                                    )}
                                    </EditableContext.Consumer>
                                <Popconfirm
                                    title="确定取消?"
                                    onConfirm={() => this.cancel(record.menuId)}
                                    okText="确定" cancelText="取消"
                                >
                                    <span className="blue">取消</span>
                                </Popconfirm>
                            </span>
                        ) : (
                            <span className='blue' onClick={() => this.edit(record.menuId)}>编辑</span>
                        )}
                        </span>
                    {this.props.judgeOperation(this.props.operation,'DELETE')?<Divider type="vertical" />:null}
                    <DeletaSpan
                        record={record}
                        getFetch={this.getFetch.bind(this)}
                        flag={this.props.judgeOperation(this.props.operation,'DELETE')}
                        pagination = {this.props.pagination}
                    />

                </span>
            )
        }
    }]:
    [{
        title: '序号',
        dataIndex: 'index',
        key: 'id',
        sorter: (a, b) => a.menuId - b.menuId,
        align:'center',
        width: '20%',
    },{
        title: '菜单名称',
        dataIndex: 'menuName',
        key: 'menuName',
        align:'center',
        editable: 1,
        width: '20%',
    },{
        title: '类型',
        dataIndex : 'menuType',
        key: 'menuType',
        align:'center',
        width: '20%',
        render:(text, record)=>{
            if(record.menuType===1){
                return '父菜单'
            }else if(record.menuType>=2){
                return '子菜单'
            }
        }
    },{
        title: '父菜单',
        dataIndex: 'parentName',
        key: 'parentName',
        align:'center',
        editable: 1,
        width: '20%',
        // filterDropdown: () => (
        //     <div className="custom-filter-dropdown">
        //       <SearchFather  searchEvent={this.props.searchFatherEvent} searchContentChange={this.props.searchContentChange1} fetch={this.props.fetch}/>
        //     </div>
        //   ),
        // filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
        // onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
        // render:(text,record)=>{
        //     return record.parentName
        // },
    }];
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        //  单行编辑
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const table_column=this.columns.map((col) =>{
            if (!col.editable) {
              return col;
            }
            return {
              ...col,
              onCell: record => ({
                inputType:col.dataIndex === 'parent' ? 'select' : 'text',
                record:record,
                editable:col.editable,
                dataIndex:col.dataIndex,
                title:col.title,
                editing:this.isEditing(record),
                fathermenu:this.props.fatherMenu
              }),
            };
          });
        return (
            <Table
                components={components}
                rowClassName="editable-row"
                rowKey={record => record.menuId}
                dataSource={this.props.data}
                columns={table_column}
                rowSelection={this.props.rowSelection}
                pagination={this.props.pagination}
                size="small"
                bordered
                onChange={this.props.handleTableChange}
            />
        );
    };
    /**实现初始化页面功能 */
    getFetch = (pagination) => {
        this.props.handleTableChange(pagination);
    };
    /**---------------------- */
    /**实现字段搜索功能 */
    isEditing = (record) => {
        return record.menuId === this.state.editingKey;
    };

    edit(id) {
        this.setState({ editingKey: id });
    }

    save(form, id) {
        /**row代表修改后的数据  item 代表原始数据 */
        form.validateFields((error, row) => {
            var data={}
            data['id'] = id
            if (error) {
                return;
            }
            if(row.parent === '无父菜单'){
                data['parent'] = -1
            }else{
                data['parent'] = row.parent
            }
            data['menuName'] = row.menuName
            // const newData = [...this.props.data];
            // const index = newData.findIndex(item => id === item.id);
            // if (index > -1) {
            //     const item = newData[index];
            //     newData.splice(index, 1, {
            //         ...item,
            //         ...row,
            //     });
            //     const data = row;
            //     data['id'] = id.toString()
                axios({
                    url:`${this.url.menu.add}`,
                    method:'put',
                    headers:{
                        'Authorization':this.url.Authorization
                    },
                    data:data,
                    type:'json'
                }).then((data)=>{
                    message.info(data.data.message);
                    // this.props.modifyDataSource(newData);
                }).catch((error)=>{
                    message.info(error.data.message);
                });

                this.setState({ editingKey: '' });
                this.getFetch(this.props.pagination)
            // }
            // else {
            //     newData.push(row);
            //     this.props.modifyDataSource(newData);
            //     this.setState({ editingKey: '' });
            // }
        });
    }

    cancel = () => {
        this.setState({ editingKey: '' });
    };
}

export default MenuTable;