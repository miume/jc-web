import React from 'react';
import { Input,Table,Popconfirm,Form,Divider,Modal,Select,message} from 'antd';
import '../Home/page.css';
import axios from 'axios';
import BlockQuote from '../BlockQuote/blockquote';
//import Span from '../BlockQuote/span';
import DeleteByIds from '../BlockQuote/deleteByIds';
import SearchCell from '../BlockQuote/search';
import UserAddModal from './userAddModal';
import NewButton from "../BlockQuote/newButton";
import CancleButton from '../BlockQuote/cancleButton';

const Option = Select.Option;
const EditableContext = React.createContext(); // ??这个是什么作用
const FormItem = Form.Item;
const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
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
        return <Input />
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
                            {editing ? (dataIndex==='phone'?
                            (<FormItem style={{ margin: 0 }}>
                            {form.getFieldDecorator(dataIndex, {
                                rules: [{
                                    required: true,
                                    message:'请输入11位正确的手机号',
                                    pattern:new RegExp(/^[1][3,4,5,7,8][0-9]{9}$/, "g"),
                                    len:11
                                }],
                                getValueFromEvent: ((event) => {
                                    return event.target.value.replace(/\D/g,'')
                              }),
                                initialValue:record[dataIndex],
                            })(this.getInput())
                            }
                            </FormItem>):
                                (<FormItem style={{ margin: 0 }}>
                                    {form.getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: true,
                                            message:`${title}不能为空`,
                                            
                                        }],
                                        // initialValue:record[dataIndex].dataIndex?record[dataIndex].key.toString():record[dataIndex],
                                        initialValue:record[dataIndex],

                                    })(this.getInput())
                                    }
                                </FormItem>)
                            ):restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

class User extends React.Component{
  url;
  operation;
  componentDidMount(){
    this.fetch();
    this.getAllDepartment();
  }
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return ;
    }
  }
    constructor(props){
      super(props);
      this.state={
        dataSource : [],
        selectedRowKeys : [],//最开始一条记录也没选
        searchContent:'',
        visible:false,
        departmentchildren:[],
        editingKey:'',
        username:'',
        reset:false,
        pageChangeFlag:0,//0表示getAllByPage分页，1表示搜索分页
      }
      this.handleDelete=this.handleDelete.bind(this);
      this.onSelectChange=this.onSelectChange.bind(this);
      this.deleteByIds=this.deleteByIds.bind(this);
      this.cancel = this.cancel.bind(this);
      this.isEditing=this.isEditing.bind(this);
      this.handleTableChange=this.handleTableChange.bind(this);
      this.searchContentChange=this.searchContentChange.bind(this);
      this.searchEvent=this.searchEvent.bind(this);
      this.getAllDepartment = this.getAllDepartment.bind(this);//获取所有部门
      this.deleteCancel=this.deleteCancel.bind(this);
      this.judgeOperation=this.judgeOperation.bind(this);
      this.pagination = {
        total: this.state.dataSource.length,
        showSizeChanger: true,//是否可以改变 pageSize
        showTotal:(total)=>`共${total}条记录`,//显示共几条记录
       // 改变每页条目数
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
        width: '10%',
        align:'center',
     },{
        title:'登录名',
        dataIndex:'username',
        key:'username',
        editable:1,//?
        width: '13%',
        align:'center',
    },{
      title:'用户名',
      dataIndex:'name',
      key:'name',
      editable:1,//?
      width: '13%',
      align:'center'
  },{
    title:'用户ID卡号',
    dataIndex:'idCardNumber',
    key:'idCardNumber',
    editable:1,//?
    width: '13%',
    align:'center'
},{
         title:'所属部门',
         dataIndex:'departmentId',//列数据在数据项中对应的 key,dataIndex的值要是后端传过来的字段
         key:'departmentId',
         editable:1,
         width: '14%',
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
        width: '14%',
         align:'center',
     },{
      title: '操作',
      //dataIndex: 'type',
      key:'operation',
      width: '18%',
      align:'center',
      render : (text, record) =>  {
        const editable = this.isEditing(record);
        return (
            <span>
                <span className={this.judgeOperation(this.operation,'UPDATE')?'':'hide'}>
                {editable ? (
                  <span>
                    <EditableContext.Consumer>
                      {form => (
                        <span className='blue'
                          onClick={() => this.save(form, record.id)}
                          style={{ marginRight: 8 }}>保存</span>
                      )}
                    </EditableContext.Consumer>
                    <Popconfirm title="确定取消?" onConfirm={() => this.cancel(record.id)}  okText="确定" cancelText="取消" >
                      <span className='blue'>取消</span>
                    </Popconfirm>
                  </span>
                ) : (
                  <span className='blue' onClick={() => this.edit(record.id)}>编辑</span>
                )}
              </span>
              {this.judgeOperation(this.operation,'DELETE')?<Divider type='vertical' />:''}
             <span className={this.judgeOperation(this.operation,'DELETE')?'':'hide'}> <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.id)} okText="确定" cancelText="再想想" >
                <span className='blue'>删除</span>
                </Popconfirm>
              </span>
            </span>
          );
        }
     },];
    }
    //页面切换调用的函数
    handleTableChange=(pagination)=>{
       //console.log(pagination);
       this.pagination=pagination;
       const {pageChangeFlag}=this.state;
       if(pageChangeFlag){//为1代表搜索分页
              this.searchEvent({
                size: pagination.pageSize,
                page: pagination.current,
                orderField: 'id',
                orderType: 'desc',
              });
       }
       else{
        this.fetch({
          size:pagination.pageSize,//条目数
          page:pagination.current,//当前是第几页
          orderField: 'id',
          orderType: 'desc',
        });
       }
    }
    fetch=(params = {})=>{
      axios({
        url: `${this.url.userManage.getAllByPage}`,
        method:'get',
        headers:{
          'Authorization':this.url.Authorization
        },
        params:{
          ...params,
        },
      }).then((data)=>{
        const res=data.data.data;
       // console.log(res);
        if(res&&res.list){
          this.pagination.total=res.total?res.total:0;
          this.pagination.current=res.pageNum;//点击重置再点搜索，回到第一页，下面分页也该是第一页,pageNum代表当前在哪一页，0和1都是第一页
          for(var i=1;i<=res.list.length;i++){
            res.list[i-1]['index']=res.prePage*10+i;
        }
        this.setState({
          dataSource:res.list,//list取到的是所有符合要求的数据
          searchContent:'',
          selectedRowKeys:[],
          pageChangeFlag:0
         });
        }
      });
    }
    //新增
      //显示新增弹出框
      handleAdd=()=>{
        this.setState({visible:true});
      }
      handleOk(){//处理新增一条记录
       const value=this.formRef.getItemsValue();//获取新增的表单内容
        //value.splice(4,1);
       if(!value['username'] ||!value['name'] ||!value['idCardNumber']||!value['password'] || !value['confirm'] || !value['departmentId']||!value['phone'] ){
               message.info('信息填写不完整！');
               return
       }
        this.setState({visible:false});
        axios({
          url:`${this.url.userManage.add}`,
          method:'post',
          headers:{
            'Authorization':this.url.Authorization
          },
          data:value,
          type:'json'
        })
        .then((data)=>{
          message.info(data.data.message);
          this.fetch();
          this.pagination.current=1;//新增的记录要显示在第一页，
        }).catch(()=>{
          message.info('新增失败，请联系管理员！');
        });
        /**清空新增form组件的内容*/
        this.formRef.resetField();
      }
      handleCancel(){
        this.setState({visible:false});
        /**清空新增form组件的内容*/
        this.formRef.resetField();
      }

    //根据id处理单条记录删除
    handleDelete(id){//id代表的是这条记录的id
      //console.log(id);
        axios({
          url:`${this.url.userManage.deleteById}?id=${id}`,
          method:'Delete',
          headers:{
            'Authorization':this.url.Authorization
          },
        })
        .then((data)=>{
          message.info(data.data.message);
          //console.log(this.pagination);
          if(data.data.code===0){
            if(this.pagination.total%10===1){
               this.pagination.current=this.pagination.current-1;
            }
            this.fetch({
              size:this.pagination.pageSize,//条目数
              page:this.pagination.current,//当前是第几页
              orderField: 'id',
              orderType: 'desc',
            });
          }
        })
        .catch(()=>{
         message.info('删除失败，请联系管理员！');
        });
      }
    //实现checkbox选择
    onSelectChange(selectedRowKeys) {
        this.setState({ selectedRowKeys:selectedRowKeys });
     }
    /**批量删除弹出框确认函数 */
    deleteByIds(){
        const ids = this.state.selectedRowKeys;//删除的几行的id
        axios({
            url:`${this.url.userManage.deleteByIds}`,
            method:'Delete',
            headers:{
                  'Authorization' :this.url.Authorization
            },
            data:ids,
            type:'json'
        })
        .then((data)=>{
          //console.log(data);
          message.info(data.data.message);
          if(data.data.code===0){//即操作成功
            if(this.pagination.total%10===1){//当前页只剩一条然后删除的话，此页没有数据，则会跳到其前一页
                this.pagination.current=this.pagination.current-1;
            }
              this.fetch({//在其他页删除应该留在当前页
                size:this.pagination.pageSize,//条目数
                page:this.pagination.current,//当前是第几页
                orderField: 'id',
                orderType: 'desc',
              });
          }
          else{
              this.setState({
                selectedRowKeys:[]
              });
          }
        })//处理成功
        .catch(()=>{
          message.info('删除失败，请联系管理员！');
        });//处理异常
     }
    deleteCancel(){//批量删除的取消，要将那个checkbox置空
      this.setState({
        selectedRowKeys:[]
      });
    }
    //判断单元格是否可编辑
    edit(id) {
      this.setState({ editingKey: id });
    }
    isEditing (record)  {
        return record.id === this.state.editingKey;
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
            var data=row;
            /**将id变成字符串,给data加id字段*/
            // console.log(row);
            // console.log(data);
            data['id']=id.toString();
           // console.log(data);
            axios({
              url:`${this.url.userManage.update}`,
              method:'post',
              headers:{
                'Authorization':this.url.Authorization
              },
              data:data,
              type:'json'
            })
            .then((data)=>{
              message.info(data.data.message);
              //this.fetch();
              if(data.data.code===0){//只有返回代码是0，即操作成功的时候，才会将数据改变
                this.setState({ dataSource: newData});
              }
            })
            .catch(()=>{
              message.info('编辑失败，请联系管理员！');
            });
            this.setState({editingKey: '' });
          } else {
            newData.push(row);
            this.setState({ dataSource: newData, editingKey: '' });
          }
        });  
      }
      /**编辑的取消*/
      cancel = () => {
        this.setState({ editingKey: '' });
      };
      //获取查询时用户名称的实时变化
      searchContentChange(e){
          const value=e.target.value;
          this.setState({searchContent:value});
        }
      //根据用户名称分页查询
      searchEvent(params={}){
           const username=this.state.searchContent;
           //console.log(username);
           axios({
             url:`${this.url.userManage.search}`,//${variable}是字符串模板，es6使用反引号``创建字符串
             method:'get',
             headers:{
               'Authorization':this.url.Authorization
             },
             params:{//最开始搜索的时候不用传当前页
               size:this.pagination.pageSize,
              //  page:this.pagination.current,
               name:username
             },
           })
           .then((data)=>{
             
             const res=data.data.data;
            
             if(res&&res.list){
              this.pagination.total=res?res.total:0;
             // console.log(res&&res.list);
              this.pagination.current=res.pageNum;
              for(var i=1;i<=res.list.length;i++){
                res.list[i-1]['index']=res.prePage*10+i;
             }
             this.setState({
               dataSource:res.list,//list取到的是所有符合要求的数据
               pageChangeFlag:1,
             });
             }
           })
           .catch(()=>{
            // console.log(error);
            message.info('搜索失败，请联系管理员！')
           });
      }
    /**获取所有部门 */
    getAllDepartment(){
        //console.log(this.url.department.getAll)
        axios({
          url:`${this.url.department.getAll}`,
          method:'get',
          headers:{
            'Authorization':this.url.Authorization
        },
        }).then((data)=>{
          const res = data.data.data;
          this.setState({
            departmentchildren:res
          })
        })
      }
      /*用来判断该菜单有哪些操作权限*/
      judgeOperation(operation,operationCode){
         var flag=operation?operation.filter(e=>e.operationCode===operationCode):[];
         return flag.length>0?true:false
      }
    render(){
        this.url=JSON.parse(localStorage.getItem('url'))
        const current=JSON.parse(localStorage.getItem('current'));
        /*获取当前菜单所有权限*/
       // this.operation=JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[3].operations:null;
       this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
        const {selectedRowKeys}=this.state; 
        const rowSelection = {//checkbox
            selectedRowKeys,
            onChange:this.onSelectChange,
        };
        const components={
            body:{
                row:EditableFormRow,
                cell:EditableCell,
            },
        };
        const table_column =this.columns.map((col) => {
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
               <BlockQuote name={current.menuName} menu={current.menuParent}/>
               <div style={{padding:'15px'}}>
                 <span className={this.judgeOperation(this.operation,'SAVE')?'':'hide'}>
                  <NewButton handleClick={this.handleAdd} name='新增'  className='fa fa-plus' />&nbsp;&nbsp;&nbsp;
                      <Modal title="新增" visible={this.state.visible} closable={false} maskClosable={false} centered={true} className='modal-sm'
                            footer={[
                              <CancleButton  key='cancel' handleCancel={() => this.handleCancel()} />,
                              <NewButton key='ok' handleClick={() => this.handleOk()} className='fa fa-check' name='确定'/>,
                            ]}>
                            <UserAddModal  key='user' deparment={this.state.departmentchildren} wrappedComponentRef={(form) => this.formRef = form} reset={this.state.reset}></UserAddModal>
                      </Modal>
                 </span>
                    <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds} cancel={this.deleteCancel} flag={this.judgeOperation(this.operation,'DELETE')}/>
                   
                      <SearchCell name='请输入用户名称'
                      searchEvent={this.searchEvent}
                      searchContentChange={this.searchContentChange}
                      fetch={this.fetch}
                      flag={this.judgeOperation(this.operation,'QUERY')}
                      />
                    
                <div className='clear'  ></div>
                <Table rowKey={record => record.id} rowSelection={rowSelection} columns={table_column} dataSource={this.state.dataSource} components={components} pagination={this.pagination} onChange={this.handleTableChange} size="small" bordered  scroll={{ y: 418 }}/>
                </div>
           </div>
       );
   }
}
export default User;
