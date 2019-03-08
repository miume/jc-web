import React from 'react';
import {Table, Input, InputNumber, Popconfirm, Form, Divider, message} from 'antd';
import DeletaSpan from './deleteSpan';
import axios from "axios";

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


class OperationTable extends React.Component {
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
    columns = this.props.judgeOperation(this.props.operation,'DELETE')||this.props.judgeOperation(this.props.operation,'UPDATE')?
    [{
        title: '序号',
        dataIndex: 'index',
        key: 'id',
        sorter: (a, b) => a.id - b.id,
        align:'center',
        width: '20%',
    },{
        title: '操作名称',
        dataIndex: 'operationName',
        key: 'operationName',
        align:'center',
        editable: 1,
        width: '25%',
    },{
        title: '描述',
        dataIndex: 'operationCode',
        key: 'operationCode',
        align:'center',
        editable: 1,
        width: '25%',
    },{
        title: '操作',
        key: 'operation',
        align:'center',
        width: '25%',
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
                                            className='blue'
                                            onClick={() => this.save(form, record.id)}
                                            style={{ marginRight: 8}}
                                        >
                                            保存
                                        </span>
                                    )}
                                    </EditableContext.Consumer>
                                <Popconfirm
                                    title="确定取消?"
                                    onConfirm={() => this.cancel(record.id)}
                                    okText="确定" cancelText="取消"
                                >
                                    <span className='blue'>取消</span>
                                </Popconfirm>
                            </span>
                        ) : (
                            <span className='blue' onClick={() => this.edit(record.id)}>编辑</span>
                        )}
                         <Divider type="vertical" />
                        </span>
                    <DeletaSpan
                        record={record}
                        getFetch={this.getFetch.bind(this)}
                        flag={this.props.judgeOperation(this.props.operation,'DELETE')}
                    />
                </span>
            )
        }
    }]:
    [{
        title: '序号',
        dataIndex: 'index',
        key: 'id',
        sorter: (a, b) => a.id - b.id,
        align:'center',
        width: '20%',
    },{
        title: '操作名称',
        dataIndex: 'operationName',
        key: 'operationName',
        align:'center',
        editable: 1,
        width: '25%',
    },{
        title: '描述',
        dataIndex: 'operationCode',
        key: 'operationCode',
        align:'center',
        editable: 1,
        width: '25%',
    }];
    render(){
        //  获取record的记录
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
        //  单行编辑
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        return (
            <Table
                components={components}
                rowClassName="editable-row"
                rowKey={record => record.id}
                dataSource={this.props.data}
                columns={columns}
                rowSelection={this.props.rowSelection}
                pagination={this.props.pagination}
                handleTableChange={this.props.handleTableChange}
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
                data['id'] = id.toString();
                axios({
                    url: `${this.props.url.operation.update}`,
                    method:'post',
                    headers:{
                        'Authorization':this.props.url.Authorization
                    },
                    data:data,
                    type:'json'
                }).then((data)=>{
                    this.props.modifyDataSource(newData);
                    message.info(data.data.message);
                }).catch(()=>{
                    message.info('保存失败，请联系管理员！');
                });
                // this.props.modifyDataSource(newData);
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
    /**---------------------- */

}
export default OperationTable;