import React from 'react';
import { Button,Input,Icon,Table,Popconfirm,Form,Divider,InputNumber,Modal,Select,message} from 'antd';
import '../Home/page.css';
import axios from 'axios';
import BlockQuote from '../BlockQuote/blockquote';
import Span from '../BlockQuote/span';
import DeleteByIds from './deleteByIds';
import SearchCell from '../BlockQuote/search';
import UserAddModal from './userAddModal';
//import store from '../store';


const Option = Select.Option;
const EditableContext = React.createContext(); // ??这个是什么作用
const FormItem = Form.Item;
const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);
// const data=[
//     {
//       userId:1,
//       userName:'张三',
//       deparmentId:{//部门有id和名称2个属性,数组要渲染
//           id:1,
//           name:'生产部'
//       },
      
//       password:'123456',
//       phoneNumber:'13792749',
//       extraInfo:'今天请假',
      
//     }, {
//         userId:2,
//         userName:'李四',
//         deparmentId:{//部门有id和名称2个属性,数组要渲染
//             id:2,
//             name:'测试部'
//         },
        
//         password:'090889',
//         phoneNumber:'19877872387',
//         extraInfo:'今天过生日',
        
//       } 
// ]

/**这是个令牌，每次调用接口都将其放在header里 */
const Authorization='JCeyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbi1bUk9MRV9BVVRIX1JPTEVfREVMRVRFLCBST0xFX0FVVEhfQVVUSF9ERUxFVEUsIFJPTEVfQVVUSF9BVVRIX1VQREFURSwgUk9MRV9BVVRIX1JPTEVfVVBEQVRFLCBST0xFX0FVVEhfQVVUSF9ET1dOTE9BRCwgUk9MRV9BVVRIX01FTlVfRE9XTkxPQUQsIFJPTEVfQVVUSF9NRU5VX1BSSU5ULCBST0xFX0FVVEhfUk9MRV9BVURJVCwgUk9MRV9BVVRIX01FTlVfUVVFUlksIFJPTEVfVVNFUiwgUk9MRV9BVVRIX1JPTEVfRE9XTkxPQUQsIFJPTEVfQVVUSF9BVVRIX1NBVkUsIFJPTEVfQVVUSF9BVVRIX1BSSU5ULCBST0xFX0FVVEhfUk9MRV9RVUVSWSwgUk9MRV9BVVRIX0FVVEhfVVBMT0FELCBST0xFX0FVVEhfTUVOVV9TQVZFLCBST0xFX0FVVEhfUk9MRV9TQVZFLCBST0xFX0FVVEhfTUVOVV9ERUxFVEUsIFJPTEVfQVVUSF9BVVRIX1FVRVJZLCBST0xFX0FVVEhfUk9MRV9QUklOVCwgUk9MRV9BVVRIX01FTlVfQVVESVQsIFJPTEVfQVVUSF9ST0xFX1VQTE9BRCwgUk9MRV9BVVRIX0FVVEhfQVVESVQsIFJPTEVfQVVUSF9NRU5VX1VQTE9BRCwgUk9MRV9BRE1JTiwgUk9MRV9BVVRIX01FTlVfVVBEQVRFXSIsImV4cCI6MTU0MjI1MTA5MH0.lR4oSk-0v8oabWqZ0r2fnZPAxO8zLoPGQE5hUJeHrbKepgPKdUv2A4M5jKq2yA3BNgHeMHGYSVnIN-PmkS-XRA';
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
       // console.log(record);
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
                                        
                                        initialValue:record[dataIndex].dataIndex?record[dataIndex].key.toString():record[dataIndex],
                                        //initialValue:record[dataIndex],
                                         
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
        dataSource : [],
        pagination:[],
        count:2,
        selectedRowKeys : [],//最开始一条记录也没选
        //searchText:'',
        searchContent:'',
        visible:false,
        //visible1:false,
        editingKey:'',
        username:'',
        phone:'',
         department:'',
        Authorization:Authorization,
      }
      this.handleDelete=this.handleDelete.bind(this);
      this.onSelectChange=this.onSelectChange.bind(this);
      this.deleteByIds=this.deleteByIds.bind(this);
      this.cancel = this.cancel.bind(this);
      this.showIds = this.showIds.bind(this);
      this.isEditing=this.isEditing.bind(this);
      this.handleUserNameChange=this.handleUserNameChange.bind(this);
      this.handleDepartmentChang=this.handleDepartmentChang.bind(this);
      this.handlePhoneChange=this.handlePhoneChange.bind(this);
      this.handleTableChange=this.handleTableChange.bind(this);
      this.searchContentChange=this.searchContentChange.bind(this);
      this.searchEvent=this.searchEvent.bind(this);
      this.pagination = {
        total: this.state.dataSource.length,
        showSizeChanger: true,
        onShowSizeChange(current, pageSize) {
          console.log('Current: ', current, '; PageSize: ', pageSize);
        },
        onChange(current) {
          console.log('Current: ', current);
        }
      };
      this.columns=[{//表头
        title:'用户编码',
        dataIndex:'id',//dataIndex值与字段值要匹配
        key:'id',
        sorter:true,//需要服务端排序
        width: '15%',
        align:'center',
     },{
        title:'用户名',
        dataIndex:'username',
        key:'username',
        editable:1,//?
        width: '20%',
        align:'center',

    },
     {
         title:'所属部门',
         dataIndex:'deparmentId',
         key:'deparmentId',
        editable:1,
         //sorter:(a, b) => a.deparmentId.id-b.deparmentId.id,
         width: '20%',
         align:'center',
         //render:deparmentId =>`${deparmentId.deparment_name}`
     },{
         title:'手机号',
         dataIndex:'phone',
         key:'phone',
         editable:1,
         width: '20%',
         align:'center',
     },{
      title: '操作',
      //dataIndex: 'type',
      key:'operation',
      width: '20%',
      align:'center',
      render : (text, record) =>  {
        //console.log(record);
        const editable = this.isEditing(record);
        return (
            <span>
                <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.id)} okText="确定" cancelText="取消" >
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
                          onClick={() => this.save(form, record.id)}
                          style={{ marginRight: 8 }}>保存</a>
                      )}
                    </EditableContext.Consumer>
                    <Popconfirm title="确定取消?" onConfirm={() => this.cancel(record.id)}  okText="确定" cancelText="取消" >
                      <a>取消</a>
                    </Popconfirm>
                  </span>
                ) : (
                  <a onClick={() => this.edit(record.id)}>编辑</a>
                )}
              </span>
            </span>
        );
        }
     },];
    }
    //获取所有数据getAllByPage
    handleTableChange=(pagination)=>{
       this.fetch=({
         size:pagination.size,//条目数
         page:pagination.current,//页码
         sortField:'id',//排序属性
         sortOrder:'desc'//排序方法（降序）
       });
    }
    fetch=(params = {})=>{
     // console.log('params:', params);
      this.setState({loading:true});
      axios({
        url:'http://218.77.105.241:40080/jc/user/getAllByPage',
        method:'get',
        headers:{
          'Authorization':Authorization
        },
        data:{
          ...params,
        },
        type:'json',
      }).then((data)=>{
        const res=data.data.data.list;
        this.setState({
          loading:false,
          dataSource:res,
        });
      });
    }
    componentDidMount(){
      this.fetch();
    }
    //新增
      //显示新增弹出框
      handleAdd=()=>{
        this.setState({visible:true});
      }
      handleOk(){//处理新增一条记录
        console.log(this.formRef.getItemsValue());
        this.setState({visible:false});
       //  axios({
       //    url:
       //  })
       //  .then();
      }
      handleCancel(){
        this.setState({visible:false});
      }
       //实时追踪新增弹出框，，用户名称，
    handleUserNameChange(e){//用户名称改变
      this.setState({userName:e.target.value});
    }
    handleDepartmentChang(e){//下拉框
      this.setState({deparment:e.target.value});
    }
    // handlePasswordChange(e){//密码
    //   this.setState({password:e.target.value});
    // }
    handlePhoneChange(e){//手机号
      this.setState({phone:e.target.value});
    }
    //根据d处理单条记录删除
    handleDelete(id){//id代表的是这条记录的id
      console.log(id);
        const dataSource = this.state.dataSource;
        // this.setState({ dataSource: dataSource.filter(item => item.id !== id) });
        axios({
          url:`http://218.77.105.241:40080/jc/user/deleteById/${id}`,
          method:'Delete',
          headers:{
            'Authorization':Authorization
          },
        
        })
        .then((data)=>{
          //console.log(data);
          message.info(data.data.message);
        })
        
        .catch((error)=>{
          console.log(error);
          console.log(error.data);
         // message.info(error.data.message);
        });
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
   
   
  
    //编辑
    //判断单元格是否可编辑
    isEditing (record)  {
        return record.key === this.state.editingKey;
      };
    
      edit(id) {
        this.setState({ editingKey: id });
      }
    //实现编辑操作
      save(form, id) {
      //row代表修改后的数据,item代表原始数据
        form.validateFields((error, row) => {
          if (error) {
            return;
          }
          const newData = this.state.dataSource;
          const index = newData.findIndex(item => id === item.id);
          if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, {
              ...item,
              ...row,
            });
            const data=row;
            data['id']=id.toString();
            console.log(data);
            axios({
              url:'http://218.77.105.241:40080/jc/user/update',
              method:'post',
              headers:{
                'Authorization':Authorization
              },
              data:data,
              type:'json'
            })
            .then((data)=>{
              console.log(data);
              console.log(data.data);
              message.info(data.data.message);
              this.fetch();
            })
            .catch((error)=>{
              console.log(error.data);
              message.info(error.data.message);
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
  
      //获取查询时用户名称的实时变化
      searchContentChange(e){
        const value=e.target.value;
        this.setState({searchContent:value});
      }
      //根据用户名称分页查询
      searchEvent(){
           const username=this.state.searchContent;
           console.log(username);
           axios({
             url:'http://218.77.105.241:40080/jc/user/getUserByNameByPage',
             method:'get',
             headers:{
               'Authorization':Authorization
             },
             data:{
               size:this.pagination.pageSize,
               page:this.pagination.current,
               name:username
             },
             type:'json'
           })
           .then((data)=>{
             console.log(data);
             console.log(data.data);
            //  console.log(data.data.data);
            //  const res=data.data.data.list;
            //  this.setState({
            //    dataSource:res
            //  });
           });
      }
   render(){
        const rowSelection = {//checkbox
            onChange:this.onSelectChange,
            onSelect() {
              // console.log(record, selected, selectedRows);
            },
            onSelectAll() {
              // console.log(selected, selectedRows, changeRows);
            },
        };
       
        const components={
            body:{
                row:EditableFormRow,
                cell:EditableCell,
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
               <div style={{marginTop:'10px'}}>
               <Button type="primary" size="small" style={{marginRight:'15px'}}  onClick={() => this.handleAdd()} >新增</Button>
                    <Modal title="新增" visible={this.state.visible}
                          onOk={() => this.handleOk()} onCancel={() => this.handleCancel()}
                          footer={[
                            <Button key="submit" type="primary" size="large" onClick={() => this.handleOk()}>确 定</Button>,
                            <Button key="back" type="ghost" size="large" onClick={() => this.handleCancel()}>返 回</Button>
                          ]}>
                          <UserAddModal wrappedComponentRef={(form) => this.formRef = form}></UserAddModal>
                    </Modal>
                    <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} />
                    <span style={{float:'right',paddingBottom:'8px'}}>
                      <SearchCell name='请输入用户名称' 
                      searchEvent={this.searchEvent}
                      searchContentChange={this.searchContentChange} />
                    </span>
                </div>
                <div className='clear'  ></div>
                <Table rowKey={record => record.id} rowSelection={rowSelection} columns={table_column} dataSource={this.state.dataSource} components={components} pagination={this.pagination} onChange={this.handleTableChange} size="small" bordered  scroll={{ y: 400 }}/>
           </div>
       );
   }
}
export default User;