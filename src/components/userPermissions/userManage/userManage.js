import React from 'react';
import {Input, Table, Popconfirm, Form, Divider, Modal, Select, message, Spin} from 'antd';
import '../../Home/page.css';
import axios from 'axios';
import BlockQuote from '../../BlockQuote/blockquote';
import DeleteByIds from '../../BlockQuote/deleteByIds';
import SearchCell from '../../BlockQuote/search';
import UserAddModal from './userAddModal';
import NewButton from "../../BlockQuote/newButton";
import CancleButton from '../../BlockQuote/cancleButton';
import Distribution from "./distribution";

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
        if (this.props.type === 'select') {
            return <Select >
              {
                this.props.departmentchildren.map(de=>{
                  return (//这个.id是根据后端部门getAll传过来的字段名称决定的
                    <Option key={de.id} value={de.id}>{de.departmentName}</Option>
                  );
                })
              }
        </Select>;
        }
        return <Input />
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
    this.setState = () => {
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
        departmentChildren:[],
        editingKey:'',
        username:'',
        reset:false,
          loading: true
      }
      this.reset = this.reset.bind(this);
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
          showSizeChanger: true,//是否可以改变 pageSize
          showTotal:(total)=>`共${total}条记录`,//显示共几条记录
          pageSizeOptions: ["10","20","50","100"]
      };
      this.columns=!this.judgeOperation(this.operation,'UPDATE')||!this.judgeOperation(this.operation,'DELETE')?[{//表头
        title:'序号',
        dataIndex:'index',//dataIndex值与字段值要匹配
        key:'id',
        sorter:(a, b) => a.id-b.id,
        width: '10%'
     },{
        title:'登录名',
        dataIndex:'username',
        key:'username',
        editable:1,
        width: '13%'
    },{
      title:'用户名',
      dataIndex:'name',
      key:'name',
      editable:1,
      width: '13%'
  },{
    title:'用户ID卡号',
    dataIndex:'idCardNumber',
    key:'idCardNumber',
    editable:1,
    width: '13%'
},{
         title:'所属部门',
         dataIndex:'departmentId',//列数据在数据项中对应的 key,dataIndex的值要是后端传过来的字段
         key:'departmentId',
         editable:1,
         width: '14%',
         render:(text,record) => {
           return `${record.departmentName}`  //渲染此条记录的部门名称

          }
     },{
         title:'手机号',
         dataIndex:'phone',
         key:'phone',
         editable:1,
         width: '14%',
     },{
      title: '操作',
      key:'operation',
      width: '18%',
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
                 <span className={this.judgeOperation(this.operation,'DELETE')?'':'hide'}>
                     <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.id)} okText="确定" cancelText="再想想" >
                        <span className='blue'>删除</span>
                     </Popconfirm>
                 </span>
                {this.judgeOperation(this.operation,'SAVE')?<Divider type='vertical' />:''}
                <span className={this.judgeOperation(this.operation,'SAVE')?'':'hide'}>
                    <Distribution userId = {record.id}/>
                </span>
                {this.judgeOperation(this.operation,'UPDATE')?<Divider type='vertical' />:''}
                <span className={this.judgeOperation(this.operation,'UPDATE')?'':'hide'}>
                     <Popconfirm title="确定重置密码?" onConfirm={() => this.handleReset(record.id)} okText="确定" cancelText="再想想" >
                        <span className='blue'>重置</span>
                     </Popconfirm>
                 </span>
            </span>
          );
        }
     },]:[{//表头
      title:'序号',
      dataIndex:'index',//dataIndex值与字段值要匹配
      key:'id',
      sorter:(a, b) => a.id-b.id,
   },{
      title:'登录名',
      dataIndex:'username',
      key:'username',
      editable:1,
      width: '15%',
  },{
    title:'用户名',
    dataIndex:'name',
    key:'name',
    editable:1,
    width: '16%',
},{
  title:'用户ID卡号',
  dataIndex:'idCardNumber',
  key:'idCardNumber',
  editable:1,
  width: '18%',
},{
       title:'所属部门',
       dataIndex:'departmentId',//列数据在数据项中对应的 key,dataIndex的值要是后端传过来的字段
       key:'departmentId',
       editable:1,
       width: '16%',
       render:(text,record) => {
         return `${record.departmentName}`  //渲染此条记录的部门名称

        }
   },{
       title:'手机号',
       dataIndex:'phone',
       key:'phone',
       editable:1,
       width: '17%'
   }];
    }

    //页面切换调用的函数
    handleTableChange(pagination) {
       this.pagination = pagination;
       this.fetch();
    }

    fetch(params = {}, flag) {
        let {searchContent} = this.state, {pageSize,current} = this.pagination;
        params = {
            name: flag ? '' : searchContent,
            size: pageSize ? pageSize : 10,
            page: current ? current : 1,
            orderField: 'id',
            orderType: 'desc'
        };
        this.setState({
            loading: true
        });
        this.getTableData(params);
    }

    getTableData(params) {
        axios({
            url: `${this.url.userManage.search}`,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            params
        }).then((data)=>{
            const res=data.data.data;
            let dataSource = [];
            if(res&&res.list) {
                this.pagination.total = res.total ? res.total : 0;
                for (let i = 1; i <= res.list.length; i++) {
                    res.list[i - 1]['index'] = (res['prePage']) * res['pageSize'] + i;
                }
                dataSource = res.list;
                this.setState({
                    dataSource: dataSource
                })
            }
            this.setState({
                loading: false
            })
        });
    }
      //显示新增弹出框
      handleAdd=()=>{
        this.setState({visible:true});
      }

      handleOk(){//处理新增一条记录
       const value=this.formRef.getItemsValue();//获取新增的表单内容
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
            this.pagination.current=1;//新增的记录要显示在第一页，
            this.fetch();
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
    handleDelete(id){
        axios({
          url:`${this.url.userManage.deleteById}?id=${id}`,
          method:'Delete',
          headers:{
            'Authorization':this.url.Authorization
          },
        })
        .then((data)=>{
          message.info(data.data.message);
          if(data.data.code===0){
            this.fetch();
          }
        })
        .catch(()=>{
         message.info('删除失败，请联系管理员！');
        });
      }

    handleReset = (id) =>{
        axios({
            url:`${this.url.userManage.reset}?id=${id}`,
            method:'post',
            headers:{
                'Authorization':this.url.Authorization
            },
        })
            .then((data)=>{
                message.info(data.data.message);
                if(data.data.code===0){
                    this.fetch();
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
          message.info(data.data.message);
          if(data.data.code===0){//即操作成功
              this.fetch();
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
            });
            var data=row;
            /**将id变成字符串,给data加id字段*/
            data['id']=id.toString();
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
    };

    /**重置操作*/
    reset() {
          this.setState({
              searchContent: ''
          });
        this.fetch({},1);
    }
      //根据用户名称分页查询
      searchEvent() {
           this.fetch();
      }
    /**获取所有部门 */
    getAllDepartment(){
        axios({
          url:`${this.url.department.getAll}`,
          method:'get',
          headers:{
            'Authorization':this.url.Authorization
        },
        }).then((data)=>{
          const res = data.data.data;
          this.setState({
              departmentChildren:res
          })
        })
      }

    /*用来判断该菜单有哪些操作权限*/
    judgeOperation(operation,operationCode){
        let flag=operation?operation.filter(e=>e.operationCode===operationCode):[];
        return flag.length>0?true:false
    }
    render(){
        this.url=JSON.parse(localStorage.getItem('url'))
        const current=JSON.parse(localStorage.getItem('current'));
        /*获取当前菜单所有权限*/
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
                type: col.dataIndex === 'departmentId' ? 'select' : 'text',
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: this.isEditing(record),
                  departmentchildren:this.state.departmentChildren
              }),
            };
          });
       return(
           <div>
               <BlockQuote name={current.menuName} menu={current.menuParent}/>
               <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                 <span className={this.judgeOperation(this.operation,'SAVE')?'':'hide'}>
                  <NewButton handleClick={this.handleAdd} name='新增'  className='fa fa-plus' />&nbsp;&nbsp;&nbsp;
                      <Modal title="新增" visible={this.state.visible} closable={false} maskClosable={false} centered={true} className='modal-sm'
                            footer={[
                              <CancleButton  key='cancel' handleCancel={() => this.handleCancel()} />,
                              <NewButton key='ok' handleClick={() => this.handleOk()} className='fa fa-check' name='确定'/>,
                            ]}>
                            <UserAddModal  key='user' deparment={this.state.departmentChildren} wrappedComponentRef={(form) => this.formRef = form} reset={this.state.reset}></UserAddModal>
                      </Modal>
                 </span>
                    <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds} cancel={this.deleteCancel} flag={this.judgeOperation(this.operation,'DELETE')}/>

                      <SearchCell name='请输入用户名称'
                      searchEvent={this.searchEvent}
                      searchContentChange={this.searchContentChange}
                      fetch={this.reset}
                      flag={this.judgeOperation(this.operation,'QUERY')}
                      />

                <div className='clear'  ></div>
                <Table rowKey={record => record.id} rowSelection={rowSelection} columns={table_column} dataSource={this.state.dataSource} components={components} pagination={this.pagination} onChange={this.handleTableChange} size="small" bordered/>
               </Spin>
           </div>
       );
   }
}
export default User;
