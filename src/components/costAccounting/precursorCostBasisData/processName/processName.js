import React from "react";
import '../../../Home/page.css';
import { Table, Popconfirm, message, InputNumber, Input, Form, Spin } from 'antd';
import BlockQuote from '../../../BlockQuote/blockquote';
import axios from "axios";

const EditableContext = React.createContext();

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === "number") {
            return <InputNumber />;
        }
        return <Input />;
    };

    renderCell = ({ getFieldDecorator }) => {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {
                    editing ? (
                        <Form.Item style={{ margin: 0 }}>
                            {
                                getFieldDecorator(dataIndex, {
                                    rules: [{
                                        required: true,
                                        message: `请输入${title}`
                                    }],
                                    initialValue: record[dataIndex],
                                })(this.getInput())
                            }
                        </Form.Item>
                    ) : (
                            children
                        )
                }
            </td>
        )
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    }
}

class ProcessName extends React.Component {
    url
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            editingKey: "",
            loading: true
        }
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: '25%'
        }, {
            title: '工序名称',
            dataIndex: 'processName',
            key: 'periodName',
            width: '25%',
            editable: true,
        }, {
            title: '所属类别',
            dataIndex: 'types',
            key: 'types',
            width: '25%',
            render: (text, record) => {
                if (text == 0) {
                    return "主材"
                } else {
                    return "辅材"
                }
            }
        }, {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: '25%',
            render: (text, record) => {
                const editable = this.isEditing(record)
                return (
                    <span>
                        <span>
                            {editable ? (
                                <span>
                                    <EditableContext.Consumer>
                                        {
                                            form => (
                                                <span className='blue'
                                                    onClick={() => this.save(form, record.code)}
                                                    style={{ marginRight: 8 }}
                                                >
                                                    保存
                                                </span>
                                            )
                                        }
                                    </EditableContext.Consumer>
                                    <Popconfirm title="确定取消?" okText='确定' cancelText='取消' onConfirm={() => this.cancel(record.code)}>
                                        <span className='blue'>取消</span>
                                    </Popconfirm>
                                </span>
                            ) : (
                                    <span className='blue' onClick={() => this.edit(record.code)}>编辑</span>
                                )

                            }
                        </span>
                    </span>
                )
            }
        }]
    }
    isEditing = record => record.code === this.state.editingKey;

    cancel = () => {
        this.setState({
            editingKey: ""
        })
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    componentDidMount() {
        this.fetch();
    }

    fetch = () => {
        this.setState({
            loading: true
        })
        axios({
            url: `${this.url.precursorProcessType.all}`,
            method: "get",
            headers: {
                'Authorization': this.url.Authorization
            },
        }).then((data) => {
            const res = data.data.data;
            for (var i = 1; i <= res.length; i++) {
                res[i - 1]['index'] = i;
            }
            if (res.length !== 0) {
                this.setState({
                    data: res,
                    loading: false
                })
            }
        })
    }
    save = (form, key) => {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            var newData = [...this.state.data];
            var index = newData.findIndex(item => key === item.code);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                var data = newData[index];
                delete data["index"];
                axios({
                    url: `${this.url.precursorProcessType.update}`,
                    method: "put",
                    headers: {
                        'Authorization': this.url.Authorization
                    },
                    data: data,
                }).then((data) => {
                    message.info("编辑成功");
                    this.fetch()
                    this.setState({
                        data: newData,
                        editingKey: ""
                    });
                })
            } else {
                newData.push(row);
                this.setState({
                    data: newData,
                    editingKey: ""
                });
            }
        });
    }

    edit = (key) => {
        this.setState({
            editingKey: key
        })
    };
    /**返回数据录入页面 */
    returnDataEntry = () => {
        this.props.history.push({ pathname: "/precursorCostBasisData" });
    }

    render() {
        const components = {
            body: {
                cell: EditableCell,
            }
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === "defaultTime" ? "number" : "text",
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('precursorCostBasisData'));
        return (
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent} menu2='返回'
                    returnDataEntry={this.returnDataEntry} flag={1}></BlockQuote>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <div className='clear' ></div>
                    <EditableContext.Provider value={this.props.form}>
                        <Table pagination={false} components={components} columns={columns} rowKey={record => record.code} dataSource={this.state.data}  size="small" bordered />
                    </EditableContext.Provider>
                </Spin>
            </div>
        )
    }
}

const EditableFormTable = Form.create()(ProcessName);
export default EditableFormTable
