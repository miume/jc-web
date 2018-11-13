import React from 'react';
import { Button,Input,Icon,Table,Popconfirm,Form,Divider,InputNumber,Modal,Select} from 'antd';
import '../Home/page.css';
import BlockQuote from '../BlockQuote/blockquote';
import Span from '../BlockQuote/span';
import WhiteSpace from '../BlockQuote/whiteSpace';
import DeleteByIds from './deleteByIds';
import Add from './add';
import Edit from './edit';
//import Selected from './select';
const Option = Select.Option;
const EditableContext = React.createContext(); // ??这个是什么作用
const FormItem = Form.Item;
const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);
const data=[
    {
      userId:1,
      userName:'张三',
      deparmentId:{//部门有id和名称2个属性,数组要渲染
          id:1,
          name:'生产部'
      },
      
      password:'123456',
      phoneNumber:'13792749',
      extraInfo:'今天请假',
      
    }, {
        userId:2,
        userName:'李四',
        deparmentId:{//部门有id和名称2个属性,数组要渲染
            id:2,
            name:'测试部'
        },
        
        password:'090889',
        phoneNumber:'19877872387',
        extraInfo:'今天过生日',
        
      }
   
]
class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'select') {
            return <Select  >
            <Option value="1">生产部</Option>
            <Option value="2">测试部</Option>
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
        console.log(record);
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
                                        
                                        initialValue:record[dataIndex].id?record[dataIndex].id.toString():record[dataIndex],
                                         
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

class User extends React.Component{
    constructor(props){
      super(props);
      this.state={
        dataSource : data,
        count:2,
        selectedRowKeys : [],//最开始一条记录也没选
        searchText:'',
        visible:false,
        visible1:false,
        editingKey:''
      }
      this.handleDelete=this.handleDelete.bind(this);
      this.onSelectChange=this.onSelectChange.bind(this);
      this.deleteByIds=this.deleteByIds.bind(this);
      this.cancel = this.cancel.bind(this);
      this.showIds = this.showIds.bind(this);
      this.handleUserNameChange=this.handleUserNameChange.bind(this);
      //this.showModal=this.showModal.bind(this);
      
 
  
    }
    //处理单条记录删除(行内)
    handleDelete(key){
        const dataSource = this.state.dataSource;
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
      }
    //实现checkbox全选
    onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys:selectedRowKeys }); 
     } 
     rowSelected(selectedRowKeys){//？
        this.setState({
          selectedIds: selectedRowKeys
        });
      }
      showIds(event) {//?
        console.log(event.target.value)
      }
    /**批量删除弹出框确认函数 */
    deleteByIds() {
        const ids = this.state.selectedRowKeys.toString();
        //console.log(ids)
     }
    cancel(){}

     /**实现字段搜索功能 */
     handleSearch = (selectedKeys, confirm) => () => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    }
    handleReset = clearFilters => () => {
        clearFilters();
        this.setState({ searchText: '' });
    }
    handleUserNameChange(e){
        //console.log(e.target.value);
        this.setState({userName : e.target.value})
    }
    //弹出层弹出
    // showModal(){
    //     this.setState({visible:true});
    // }
    // handleOk=()=> {
    //     //console.log(this.formRef.getItemsValue());
    //     this.setState({
    //       visible: false
    //     });
    //   }
    //   handleCancel=()=> {
    //     this.setState({
    //       visible: false
    //     });
    //   }
    //编辑
    isEditing = (record) => {
        return record.key === this.state.editingKey;
      };
    
      edit(key) {
        this.setState({ editingKey: key });
      }
    
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
      }
    
      cancel = () => {
        this.setState({ editingKey: '' });
      };
   render(){
        const rowSelection = {//checkbox
            onChange:this.onSelectChange,
            onSelect() {},
            onSelectAll() {},
        };
        const pagination = {//分页
            total: data.length,
            showSizeChanger: true,//是否可以改变 pageSize
            showSizeChange(current,pageSize) {
            },
            onChange(current) {}
        };
        const components={
            body:{
                row:EditableFormRow,
                cell:EditableCell,
            },
        };
        const columns=[{//表头
            title:'用户编码',
            dataIndex:'userId',//dataIndex值与字段值要匹配
            key:'userId',
            sorter:true,//需要服务端排序
            width: '10%',
            align:'center',
         },{
            title:'用户名',
            dataIndex:'userName',
            key:'userName',
            editable:1,//?
            width: '15%',
            align:'center',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
             <div className="custom-filter-dropdown">
               <Input
                 ref={ele => this.searchInput = ele}
                 placeholder="用户名"
                 value={selectedKeys[0]}
                 onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                 onPressEnter={this.handleSearch(selectedKeys, confirm)}
               />
               <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>搜索</Button>
               <Button onClick={this.handleReset(clearFilters)}>重置</Button>
             </div>
           ),
           filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#108ee9' : '#aaa',fontSize:'18px' }} />,
          // onFilter 用于筛选当前数据
           onFilter: (value, record) => record.name,
           onFilterDropdownVisibleChange: (visible) => {
             if (visible) {
               setTimeout(() => {
                 this.searchInput.focus();
               });
             }
           },
           render: (text) => {
             const { searchText } = this.state;
             //console.log(searchText)
             //console.log(text)
             return searchText ? (
               <span>
                 {text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((fragment, i) => (
                   fragment.toLowerCase() === searchText.toLowerCase()
                     ? <span key={i} className="highlight">{fragment}</span> : fragment // eslint-disable-line
                 ))}
               </span>
             ) : text;
           },
        },
         {
             title:'所属部门',
             dataIndex:'deparmentId',
             key:'deparmentId',
            editable:1,
             //sorter:(a, b) => a.deparmentId.id-b.deparmentId.id,
             width: '10%',
             align:'center',
             render:deparmentId =>`${deparmentId.name}`
         },{
             title:'密码',
             dataIndex:'password',
             key:'password',
             editable:1,
             width: '10%',
             align:'center',
         },{
             title:'手机号',
             dataIndex:'phoneNumber',
             key:'phoneNumber',
             editable:1,
             width: '15%',
             align:'center',
         },{
             title:'备注',
             dataIndex:'extraInfo',
             key:'extraInfo',
             editable:1,
           //width: '7%',
             align:'center',
         },{
          title: '操作',
          //dataIndex: 'type',
          key:'action',
          width: '15%',
          align:'center',
          render : (text, record) =>  {
            //console.log(record);
            const editable = this.isEditing(record);
            return (
                <span>
                    <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.key)} okText="确定" cancelText="取消" >
                    <a href="#">删除</a>
                    </Popconfirm>
                    <Divider type="vertical" />
                    <span>
                    {editable ? (
                      <span>
                        <EditableContext.Consumer>
                          {form => (
                            <a
                              href="javascript:;"
                              onClick={() => this.save(form, record.key)}
                              style={{ marginRight: 8 }}>保存</a>
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
                </span>
            );
            }
         },];
         const table_column = columns.map((col) => {
            if (!col.editable) {
              return col;
            }
            return {
              ...col,
              onCell: record => ({
                record,
                inputType: col.dataIndex === 'deparmentId' ? 'select' : 'text',
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: this.isEditing(record),
              }),
            };
          });
       return(
           <div>
               <BlockQuote name='用户管理' />
               <div className='fl'>
                    <Add />
                    <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} />
                </div>
                <WhiteSpace></WhiteSpace>
                <Table rowKey={record => record.userId} rowSelection={rowSelection} columns={table_column} dataSource={this.state.dataSource} components={components} pagination={pagination}  size="small" bordered  scroll={{ y: 400 }}/>
           </div>
       );
   }
}
export default User;