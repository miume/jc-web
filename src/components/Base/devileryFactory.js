import React from 'react';
import {Button, Input, Table,Icon, Popconfirm, Form, InputNumber, Divider, Modal} from 'antd';
import Blockquote from '../BlockQuote/blockquote';
import SearchCell from '../BlockQuote/search';
import DeliveryFactoryAddModal from './deliveryFactoryAddModal';
import DeleteByIds from './deleteByIds';




const EditableContext = React.createContext(); // ??这个是什么作用
//创建一个Context对象，
//假设我们有很多个组件，我们只需要在父组件使用Provider提供数据，
//然后我们就可以在子组件任何位置使用Consumer拿到数据，不存在跨组件的问题
//Provider有一个参数value
//在Provider组件内遍历子组件，
//如果组件是Consumer的话，就返回一个组件，并将value作为值传递给新创建的子组件Consumer
const FormItem = Form.Item;
const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow); //??

//表格中的数据
const data = [{
    key: '1',
    name: '工厂1',
    
  }, {
    key: '2',
    name: '工厂2',
   
  }, {
    key: '3',
    name: '工厂3',
    
  }];
  //编辑
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
class DeliveryFactory extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dataSource : data,
           visible:false,
           searchText:'',
           editingKey:'',
           selectedRowKeys:[]
        }
        this.onSelectChange=this.onSelectChange.bind(this);
        this.deleteByIds=this.deleteByIds.bind(this);
        this.cancel=this.cancel.bind(this);
        this.columns=[{
           title:'送样工厂序号',
           dataIndex:'key',
           key:'key',
           sorter:(a,b) => a.key-b.key,
           align:'center',
           width:'33%'
        },{
            title:'送样工厂名称',
            dataIndex:'name',
            key:'name',
            editable:1,
            align:'center',
            width:'33%',
         
        },{
            title:'操作',
            key:'operation',
            align:'center',
            width:'33%',
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

        }]
       
    }
    //处理新增一条记录
    handleAdd = () => {
       this.setState({visible:true});
    }
    handleOk() {
        console.log(this.formRef.getItemsValue());//将新增框填写的值打印出来
        this.setState({visible:false});
    }
    handleCancel(){
        this.setState({visible:false});
    }
    //处理单行记录删除
    handleDelete =(key) =>{
        const dataSource = this.state.dataSource;
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }
    //处理批量删除
    deleteByIds(){
        const ids=this.state.selectedRowKeys.toString();
    }
    cancel(){}
  
     /**编辑功能 */
    isEditing = (record) => {
        return record.key === this.state.editingKey;
    };
    cancel = () => {
        this.setState({ editingKey: '' });
    };
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
    //实现checkbox全选
    onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys:selectedRowKeys });
    }
       render(){
        const rowSelection = {//checkbox
            onChange: this.onSelectChange,
            onSelect() {
                //console.log(record, selected, selectedRows);
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
        const components={
           body:{
             row:EditableFormRow,
             cell:EditableCell
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
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });
        
           return(
               <div>
                   <Blockquote name='送样工厂'></Blockquote>
                   <div style={{marginTop:'10px'}}>
                    <Button type='primary' size='small' style={{marginRight:'15px'}} onClick={()=>this.handleAdd()}>新增</Button>
                       <Modal title='新增' visible={this.state.visible}
                       onOk={() => this.handleOk()} onCancel={() => this.handleCancel()}
                       footer={[
                           <Button key='submit' type='primary' size='large' onClick={() => this.handleOk()}>确定</Button>,
                           <Button key='back' type='ghost' size='large' onClick={() => this.handleCancel()}>取消</Button>
                       ]}>
                       <DeliveryFactoryAddModal wrappedComponentRef={(form) => this.formRef = form}></DeliveryFactoryAddModal>
                       </Modal>
                       <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} />
                       <span style={{float:'right',paddingBottom:'8px'}}>
                         <SearchCell name='请输入送样工厂名称' 
                           searchEvent={this.searchEvent}
                           searchContentChange={this.searchContentChange} />
                       </span>
                   </div>
                   
                   <div className='clear' ></div>
                   <Table rowKey={record => record.key} dataSource={this.state.dataSource} columns={columns} rowSelection={rowSelection} pagination={pagination} components={components} size="small" bordered  scroll={{ y: 400 }}></Table>
               </div>
           );
       }
 }
 export default DeliveryFactory;