import React from 'react';
import axios from 'axios';
import { Table, Input, InputNumber, Popconfirm, Form, Divider} from 'antd';
import '../equipmentArchive.css'

const FormItem = Form.Item;
const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props}/>
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

class FittingModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            editingKey: ''
        };
        this.isEditing = this.isEditing.bind(this);
        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    columns = [{
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        width: '25%',
        editable: true
    },{
        title: '规格',
        dataIndex: 'specification',
        key: 'specification',
        align: 'center',
        width: '20%',
        editable: true
    },{
        title: '数量',
        dataIndex: 'counts',
        key: 'counts',
        align: 'center',
        width: '20%',
        editable: true
    },{
        title: '操作',
        dataIndex: 'code',
        key: 'code',
        align: 'center',
        width: '35%',
        render: (text, record) => {
            const editable = this.isEditing(record);
            return (
                <span>
                    <span>
                        {editable ? (
                            <span>
                                <EditableContext.Consumer>
                                    {form => (
                                        <span
                                            className='blue'
                                            onClick={() => this.save(form, record.code)}
                                            style={{ marginRight: 8}}
                                        >
                                            保存
                                        </span>
                                    )}
                                    </EditableContext.Consumer>
                                <Popconfirm
                                    title="确定取消?"
                                    onConfirm={() => this.cancel(record.code)}
                                    okText="确定" cancelText="取消"
                                >
                                    <span className='blue'>取消</span>
                                </Popconfirm>
                            </span>
                        ) : (
                            <span className='blue' onClick={() => this.edit(record.code)}>编辑</span>
                        )}
                        </span>
                    <Divider type="vertical"/>
                    <span className="blue" onClick={() => this.delete(record.code)}>删除</span>
                </span>
            )
        },
    }]
    render() {
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
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        return (
            <Table
                components={components}
                rowKey={record => record.code}
                columns={columns}
                dataSource={this.props.data}
                rowClassName="editable-row"
                size="small"
                bordered
                scroll={{y: 400}}
            />
            // <div style={{height:'550px'}} >
            //     <Row>
            //         <Col span={6}>
            //             <td className="eq-td">s</td>
            //         </Col>
            //         <Col span={6}>
            //             <td className="eq-td eq-td-left">b</td>
            //         </Col>
            //         <Col span={6}>
            //             <td className="eq-td eq-td-left">c</td>
            //         </Col>
            //         <Col span={6}>
            //             <td className="eq-td eq-td-left">d</td>
            //         </Col>
            //     </Row>
            // </div>
        )

    }
    isEditing = record => record.code === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.props.data];
            const index = newData.findIndex(item => key === item.code);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.props.addSaveFun(newData[index],index);
                this.setState({ editingKey: '' });
            } else {
                this.setState({ editingKey: '' });
            }
        });
    }
    delete = (code) => {
        this.props.deleteSaveFun(code)
    };

    edit(key) {
        this.setState({ editingKey: key });
    }
}

export default FittingModal