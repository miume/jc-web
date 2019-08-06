import React from 'react';
import {Table, Input, InputNumber, Popconfirm, Form, Divider, message} from 'antd';
import axios from "axios";
import DeletaSpan from "./deleteModal";
import EditPart from "./editPart"

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
                                            message: `${title}不能为空`,
                                        }],
                                        initialValue:record[dataIndex],
                                    })(this.getInput())
                                    }
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

class TheTable extends React.Component{
    constructor(props){
        super(props)
        this.state={
            deptCode:'',
        }
        this.handleTableChange=this.handleTableChange.bind(this);
    }

    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        sorter: (a, b) => a.index - b.index,
        align:'center',
        width: '20%',
    },{
        title: '所属部门',
        dataIndex: 'deptName',
        key: 'deptName',
        align:'center',
        editable: 1,
        width: '20%',
    },{
        title: '位置',
        dataIndex: 'locationName',
        key: 'locationName',
        align:'center',
        editable: 1,
        width: '20%',
    },{
        title: 'ID号',
        dataIndex: 'idCode',
        key: 'idCode',
        align:'center',
        editable: 1,
        width: '20%',
    },{
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align:'center',
        width: '20%',
        render: (text, record) => {
            return (
                <div style={{display:'flex'}}>
                    <EditPart
                        url={this.props.url}
                        code={record.code}
                        record={record}
                        deptName={this.props.deptName}
                        deptCode={this.props.deptCode}
                        getTableData={this.props.getTableData}
                        pagination={this.props.pagination}
                    />
                    <DeletaSpan
                        url={this.props.url}
                        code={record.code}
                        handleDelete={this.handleDelete}
                        record={record}
                        flag={'1'}
                    />
                </div>
            )
        }
    }];

    render() {
        const {selectedRowKeys,pagination} = this.state;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        return (
            <div>
                <Table
                    columns={this.columns}
                    pagination={this.props.pagination}
                    components={components}
                    rowSelection={this.props.rowSelection}
                    dataSource={this.props.rightTableData}
                    onChange={this.handleTableChange}
                    size="small"
                    bordered
                    scroll={{ y: 450 }}
                />
            </div>
        );
    }
    handleDelete = (id) => {
        console.log(id)
        axios({
            url:`${this.props.url.locationBasic.basicInfoLocation}/${id}`,
            method:'Delete',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                id:id,
            }
        }).then((data)=>{
            message.info(data.data.message);
            this.fetch();
        }).catch(()=>{
            message.info('删除失败，请联系管理员！');
        });

    }

    fetch = () => {
        /**flag为1时，将分页搜索位置0 */
        var params={
            id:this.props.deptCode,
            page:this.props.pagination.page,
            size:10,
            depName:this.props.deptName,
        }
        console.log(params)
        this.props.getTableData(params);
    };



    handleTableChange = (page) => {
        const {pageChangeFlag} = this.props.pageChangeFlag;
        if (pageChangeFlag) {
            this.props.getTableData({
                id:parseInt(this.props.deptCode),
                page:page.current,
                size:page.pageSize,
                depName:this.props.deptName,
            })
        } else {
            this.props.getTableData({
                id:parseInt(this.props.deptCode),
                page:page.current,
                size:page.pageSize,
                depName:this.props.deptName,
            })
        }
    };
}

export  default TheTable