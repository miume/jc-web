import React from 'react';
import { Button,Input,Icon,Table,Popconfirm,Form,Divider,Modal,Select,message} from 'antd';
import '../Home/page.css';
import axios from 'axios';
import BlockQuote from '../BlockQuote/blockquote';
//import Span from '../BlockQuote/span';
import DeleteByIds from './deleteByIds';
import SearchCell from '../BlockQuote/search';
import UserAddModal from './userAddModal';


const Option = Select.Option;
const EditableContext = React.createContext(); // ??这个是什么作用
const FormItem = Form.Item;
const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);
/** 通过localStorage可查到http://218.77.105.241:40080*/
const server = localStorage.getItem("remote"); 
/**这是个令牌，每次调用接口都将其放在header里 */
const Authorization=localStorage.getItem('Authorization');

class EditableCell extends React.Component {
  constructor(props){
    super(props);
  }
  
    getInput = () => {
      //  console.log(this.props.departmentchildren);//获取部门的data（getAll）
        if (this.props.inputType === 'select') {
            return <Select >
              {
                this.props.departmentchildren.map(de=>{
                  return (//这个.id是根据后端部门getAll传过来的字段名称决定的
                    <Option key={de.id} value={de.id}>{de.departmentName}</Option>
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
        //console.log(...restProps);
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

                                        // initialValue:record[dataIndex].dataIndex?record[dataIndex].key.toString():record[dataIndex],
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

class User extends React.Component{
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return ;
    }
  }
    constructor(props){
      super(props);
      this.state={
        dataSource : [],
        pagination:[],
        //count:2,
        selectedRowKeys : [],//最开始一条记录也没选
        searchContent:'',
        visible:false,
        departmentchildren:[],
        editingKey:'',
        username:'',
        phone:'',
        department:'',
        reset:false,
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
      this.getAllDepartment = this.getAllDepartment.bind(this);//获取所有部门
      
      this.pagination = {
        total: this.state.dataSource.length,
        showSizeChanger: true,//是否可以改变 pageSize
        showTotal:(total)=>`共${total}条记录`,//显示共几条记录
        //改变每页条目数
        onShowSizeChange(current, pageSize) {//current是当前页数，pageSize是每页条数
          //console.log('Current: ', current, '; PageSize: ', pageSize);
        },
        onChange(current) {//跳转，页码改变
          //console.log('Current: ', current);
        }
      };
      this.columns=[{//表头

        title:'序号',
        dataIndex:'index',//dataIndex值与字段值要匹配
        key:'id',
       //sorter:true,//需要服务端排序
       sorter:(a, b) => a.id-b.id,
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
         dataIndex:'departmentId',//列数据在数据项中对应的 key,dataIndex的值要是后端传过来的字段
         key:'departmentId',
         editable:1,
         width: '20%',
         align:'center',
         render:(text,record) => {
          //console.log(text);//text是dataIndex对应的字段值
          // console.log(record);//record代表的是后端传过来的一条记录的值data
           return `${record.departmentName}`  //渲染此条记录的部门名称
           
          }
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
        //console.log(text);
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
         //const pager = { ...this.state.pagination };
        //console.log( { ...this.state.pagination });
        // pager.current = pagination.current;
        // this.setState({
        //   pagination: pager,
        // });
       this.fetch=({//前端需要传的参数
         size:pagination.pageSize,//条目数
         page:pagination.current,//当前页
         sortField:'id',//排序属性
         sortOrder:'desc'//排序方法（降序）
       });
    }
    fetch=(params = {})=>{
      //console.log('params:', params);
      this.setState({loading:true});
      axios({
        url: `${server}/jc/user/getAllByPage`,
        method:'get',
        headers:{
          'Authorization':Authorization
        },
        params:{
          ...params,
        },
        //type:'json',
      }).then((data)=>{
        const res=data.data.data;
        this.pagination.total=res.total;//分页
        for(var i = 1; i<=res.list.length; i++){
          res.list[i-1]['index']=(res.pages-1)*10+i;
        }
        this.setState({
          loading:false,
          dataSource:res.list,
        });
      });
    }
    componentDidMount(){
      this.fetch();
      this.getAllDepartment();
    }
    //新增
      //显示新增弹出框
      handleAdd=()=>{
        this.setState({visible:true});
      }
      handleOk(){//处理新增一条记录
        //console.log(this.formRef.getItemsValue());
        this.setState({visible:false});
        axios({
          url:`${server}/jc/user/signIn`,
          method:'post',
          headers:{
            'Authorization':Authorization
          },
          data:this.formRef.getItemsValue(),
          type:'json'
        })
        .then((data)=>{
          message.info(data.data.message); 
          this.fetch();
        }).catch((error)=>{
          message.info(error);
        });
        /**清空新增form组件的内容*/
        this.formRef.resetField();
      }
      handleCancel(){
        this.setState({visible:false});
        /**清空新增form组件的内容*/
        this.formRef.resetField();
      }
       //实时追踪新增弹出框，，用户名称，
    handleUserNameChange(e){//用户名称改变
      this.setState({userName:e.target.value});
    }
    handleDepartmentChang(e){//下拉框
      this.setState({deparment:e.target.value});
    }
    handlePasswordChange(e){//密码
      this.setState({password:e.target.value});
    }
    handlePhoneChange(e){//手机号
      this.setState({phone:e.target.value});
    }
    //根据id处理单条记录删除
    handleDelete(id){//id代表的是这条记录的id
      //console.log(id);
        const dataSource = this.state.dataSource;
        // this.setState({ dataSource: dataSource.filter(item => item.id !== id) });
        axios({
          url:`${server}/jc/user/deleteById?id=${id}`,
          method:'Delete',
          headers:{
            'Authorization':Authorization
          },
         data:id,
         type:'json'
        })
        .then((data)=>{
          //console.log(data);
          message.info(data.data.message);
          this.fetch();
        })
        
        .catch((error)=>{
          //console.log(error);
          //console.log(error.data);
         message.info(error.data.message);
        });
      }
    //实现checkbox全选
    onSelectChange(selectedRowKeys) {
        //console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys:selectedRowKeys }); 
     } 
     rowSelected(selectedRowKeys){//？
        this.setState({
          selectedIds: selectedRowKeys
        });
      }
      showIds(event) {//?
       // console.log(event.target.value)
      }
      /**---------------------- */
    /**批量删除弹出框确认函数 */
    deleteByIds() {
        const ids = this.state.selectedRowKeys;//删除的几行的id
       // console.log(ids);
        axios({
            url:`${server}/jc/user/deleteByIds`,
            method:'Delete',
            headers:{
                  'Authorization' :Authorization
            },
            data:ids,//前端要传的参数放在data里面，
            type:'json'
        })
        .then((data)=>{
         // console.log(data);
          message.info(data.data.message);
          this.fetch();
        })//处理成功
        .catch((error)=>{
         // console.log(error);
          message.info(error.data.message)
        });//处理异常
       
     }
    cancel(){
      
    }
   
    //编辑
    //判断单元格是否可编辑
    isEditing (record)  {
        return record.id === this.state.editingKey;
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
            });//splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。该方法会改变原始数组。
              /**
              * arrayObject.splice(index,howmany,item1,.....,itemX)
              * index	必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
               howmany	必需。要删除的项目数量。如果设置为 0，则不会删除项目。
              item1, ..., itemX	可选。向数组添加的新项目。
              */
            const data=row;
            /**将id变成字符串 */
            data['id']=id.toString();
            /**根据部门名称删选得到部门id */

            let departmentId = ''; 
            
            //console.log(data);
            axios({
              url:`${server}/jc/user/update`,
              method:'post',
              headers:{
                'Authorization':Authorization
              },
              data:data,
              type:'json'
            })
            .then((data)=>{
              // console.log(data);
              // console.log(data.data);
              message.info(data.data.message);
              this.fetch();
            })
            .catch((error)=>{
             // console.log(error.data);
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
  
    

      /**---------------------- */
        //获取查询时用户名称的实时变化
        searchContentChange(e){
          const value=e.target.value;
          this.setState({searchContent:value});
        }
      //根据用户名称分页查询
      searchEvent(){
           const username=this.state.searchContent;
           //console.log(username);
           axios({
             url:`${server}/jc/user/getUserByNameByPage`,//${variable}是字符串模板，es6使用反引号``创建字符串
             method:'get',
             headers:{
               'Authorization':Authorization
             },
             params:{
               size:this.pagination.pageSize,
               page:this.pagination.current,
               name:username
             },
             type:'json'
           })
           .then((data)=>{
             //console.log(data);
            // console.log(this.pagination);
            //  console.log(data.data);
            //  console.log(data.data.data);
             const res=data.data.data;
             this.pagination.total=res.total;
             for(var i=1;i<=res.list.length;i++){
                res.list[i-1]['index']=(res.pages-1)*10+i;
             }
             this.setState({
               dataSource:res.list//list取到的是所有符合要求的数据
             });
           })
           .catch((error)=>{
            // console.log(error);
            message.info(error.data.message)
           });
      }
      /**获取所有部门 */
      getAllDepartment(){
        axios({
          url:`${server}/jc/department/getAll`,
          method:'get',
          headers:{
            'Authorization': Authorization
        },
        }).then((data)=>{ 
          const res = data.data.data;
          this.setState({
            departmentchildren:res
          })
          // console.log(res)
        })
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
                inputType: col.dataIndex === 'departmentId' ? 'select' : 'text',
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: this.isEditing(record),
                departmentchildren:this.state.departmentchildren
              }),
            };
          });
       return(
           <div>
               <BlockQuote name='用户管理' menu='用户和权限'/>
               <div style={{padding:'15px'}}>
               <Button type="primary" size="small" style={{marginRight:'15px'}}  onClick={() => this.handleAdd()} >新增</Button>
                    <Modal title="新增" visible={this.state.visible}
                          onOk={() => this.handleOk()} onCancel={() => this.handleCancel()}
                          footer={[
                            <Button key="submit" type="primary" size="large" onClick={() => this.handleOk()}>确 定</Button>,
                            <Button key="back" type="ghost" size="large" onClick={() => this.handleCancel()}>返 回</Button>
                          ]}>
                          <UserAddModal deparment={this.state.departmentchildren} wrappedComponentRef={(form) => this.formRef = form} reset={this.state.reset}></UserAddModal>
                    </Modal>
                    <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds}/>
                    <span style={{float:'right',paddingBottom:'8px'}}>
                      <SearchCell name='请输入用户名称' 
                      searchEvent={this.searchEvent}
                      searchContentChange={this.searchContentChange} 
                      fetch={this.fetch}/>
                    </span>
                
                <div className='clear'  ></div>
                <Table rowKey={record => record.id} rowSelection={rowSelection} columns={table_column} dataSource={this.state.dataSource} components={components} pagination={this.pagination} onChange={this.handleTableChange} size="small" bordered  scroll={{ y: 400 }}/>
                </div>
           </div>
       );
   }
}
export default User;