import React from 'react';
import {Table, Button,Input,message,Popconfirm,Form,Divider,InputNumber,Modal } from 'antd';
import '../Home/page.css';
import axios from 'axios';
// import WhiteSpace from '../BlockQuote/whiteSpace';
// import RoleTable from './roleTable';
import RoleModal from './roleModal';
import BlockQuote from '../BlockQuote/blockquote';
import UserManagement from './userManagement';
import PermissionManagement from './permissionManagement';
import DeleteByIds from './deleteByIds';
import SearchCell from '../BlockQuote/search';
import { stat } from 'fs';
//import store from '../store';
// import reqwest from 'reqwest';
// import EditableCell from '../Home/editableCell';
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
//  编辑 权限
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

const EditableFormRow = Form.create()(EditableRow);
/*假数据 */
// const data = [];
// for (let i = 0; i < 46; i++) {
//   data.push({
//     key: i.toString(),
//     operation:i,
//     name: `管理员${i}`,
//     description: `权限${i}`
// })}
/**这是个令牌，每次调用接口都将其放在header里 */
const Authorization = localStorage.getItem('Authorization');
/**这是服务器网址及端口 */
const server = localStorage.getItem('remote');
class Role extends React.Component {

    componentDidMount() {
      this.fetch();
    }
    componentWillUnmount() {
      this.setState = (state, callback) => {
        return ;
      }
    }
    constructor(props) {
        super(props);
        // const da = store.getState();
        // console.log(da)
        this.state = {
            dataSource : [],
            searchText: '',
            editingKey: '',
            visible: false,
            visible1: false,
            roleDescription: '',
            roleName: '',
            selectedRowKeys: [],
            searchContent:'',
            Authorization:Authorization,
            reset:false
            
        };
        this.cancel = this.cancel.bind(this);
        this.showIds = this.showIds.bind(this);
        this.deleteByIds = this.deleteByIds.bind(this);
        this.userManagement = this.userManagement.bind(this);
        this.handleRoleNameChange = this.handleRoleNameChange.bind(this);
        this.handleRoleDescriptionChange = this.handleRoleDescriptionChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.pagination = {
          total: this.state.dataSource.length,
          showTotal(total) {
            return `共${total}条记录`
          } ,
          showSizeChanger: true,
          onShowSizeChange(current, pageSize) {
            // console.log('Current: ', current, '; PageSize: ', pageSize);
          },
          onChange(current) {
            // console.log('Current: ', current);
          }
        }
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            // render:id =>index },
            align:'center',
            width: '20%',
          }, {
            title: '角色名称',
            dataIndex: 'roleName',
            key: 'roleName',
            align:'center',
            editable: 1,
            width: '25%',
          }, {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
            align:'center',
            editable: 1,
            width: '25%',
          }, {
            title: '操作',
            key: 'operation',
            align:'center',
            width: '25%',
            render : (text, record) =>  {
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
                      <Divider type="vertical" />
                      <Popconfirm title="确定删除?" onConfirm={()=>this.handleDelete(record.id)} okText="确定" cancelText="取消" >
                          <a href="#">删除</a>
                      </Popconfirm>
                      <Divider type="vertical" />
                      <span>
                          <UserManagement value={record.id} Authorization={this.state.Authorization} server={server}/>  {/**实现给成员分配角色的功能*/}
                      </span>
                      <Divider type="vertical" />
                      <span>
                          <PermissionManagement value={record.id} Authorization={this.state.Authorization} server={server}/>  {/**实现角色分配权限的功能*/}
                      </span>
                    </span>
                );
              }
          }]
    }
    /**获取所有数据 getAllByPage */
    handleTableChange = (pagination) => {
      this.fetch({
        size: pagination.pageSize,
        page: pagination.current,
        orderField: 'id',
        orderType: 'desc',
        
      });
    }
    fetch = (params = {}) => {
      //console.log('params:', params);
      //this.setState({ loading: true });
      axios({
        url: `${server}/jc/role/getRolesByPage`,
        method: 'get',
        headers:{
        'Authorization': Authorization
      },
       params: params,
        // type: 'json',
      }).then((data) => {
        const res = data.data.data;
        this.pagination.total=res.total;
        for(var i = 1; i<=res.list.length; i++){
          res.list[i-1]['index']=res.prePage*10+i;
        }
        // console.log(res.list)
        this.setState({
          dataSource: res.list,
        });
      });
    }

    /**实时追踪新增弹出框 角色名称和角色描述的变化 */
    handleRoleNameChange(e) {
      this.setState({roleName : e.target.value})
    }
    handleRoleDescriptionChange(e) {
      this.setState({roleDescription : e.target.value})
    }
     /**根据id处理单条记录删除 */
     handleDelete(id){
       //console.log(id)
        axios({
          url:`${server}/jc/role/${id}`,
          method:'Delete',
          headers:{
            'Authorization':Authorization
          },
        }).then((data)=>{
          message.info(data.data.message);
          this.fetch();
        }).catch((error)=>{
          message.info(error.data.message)
        })

      }
      /**判断单元格td是否可编辑 */
      isEditing = (record) => {
        return record.id === this.state.editingKey;
      };
    
      edit(id) {
        this.setState({ editingKey: id });
      }
      /**实现编辑操作 */
      save(form, id) {
        /**row代表修改后的数据  item 代表原始数据 */
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
            const data = row;
            data['id'] = id.toString()
            //console.log(data)
            axios({
              url:`${server}/jc/role/update`,
              method:'post',
              headers:{
                'Authorization':Authorization
              },
              data:data,
              type:'json'
            }).then((data)=>{
              message.info(data.data.message); 
              this.fetch();
            }).catch((error)=>{
              message.info(error);
            })
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
   
       /**显示新增弹出框 */
      handleAdd = () => {
        this.setState({
          visible: true
        });
      }
      /**新增一条记录 */
      handleOk() {
        //console.log(this.formRef.getItemsValue());
        this.setState({
          visible: false,
        });
        axios({
          url : `${server}/jc/role/add`,
          method:'post',
          headers:{
            'Authorization':Authorization
          },
          data:this.formRef.getItemsValue(),
          type:'json'
        }).then((data) => {
          // console.log(data)
          message.info(data.data.message); 
          this.fetch();
        })
        .catch(function (error) {
          // console.log(error)
          message.info(error);
        }); 
        /**清空新增form组件的内容 */
        this.formRef.resetField()
      }
      handleCancel() {
        this.setState({
          visible: false
        });
        
        this.formRef.resetField()
      }
      
      rowSelected(selectedRowKeys){
        this.setState({
          selectedIds: selectedRowKeys
        });
      }
      showIds(event) {
        //console.log(event.target.value)
      }
      /**批量删除弹出框确认函数 */
      deleteByIds() {
        const ids = this.state.selectedRowKeys;
        // console.log(ids)
        axios({
          url:`${server}/jc/role/deleteByIds`,
          method:'Delete',
          headers:{
            'Authorization':Authorization
          },
          data:ids,
          type:'json'
        }).then((data)=>{
          message.info(data.data.message);
          this.fetch();
        }).catch((error)=>{
          message.info(error.data.message)
        })
        
     }
     cancel() {
     }
 
      /**成员管理 */
      userManagement(){
          this.setState({
            visible1:true
          })
      }
      /**实现全选 */
      onSelectChange(selectedRowKeys) {
          //console.log('selectedRowKeys changed: ', selectedRowKeys);
          this.setState({ selectedRowKeys:selectedRowKeys }); 
      }
      /**获取查询时角色名称的实时变化 */
      searchContentChange(e){
        const value = e.target.value;
        this.setState({searchContent:value});
        // console.log(this.state.searchContent)
      }
      /** 根据角色名称分页查询*/
      searchEvent(){
        const role_name = this.state.searchContent;
        //console.log(role_name)
        axios({
          url:`${server}/jc/role/getRolesByNameLikeByPage`,
          method:'get',
          headers:{
            'Authorization':Authorization
          },
          params:{
            size: this.pagination.pageSize,
            page: this.pagination.current,
            roleName:role_name
          },
          type:'json',
        }).then((data)=>{
          const res = data.data.data;
          this.pagination.total=res.total;
          for(var i = 1; i<=res.list.length; i++){
            res.list[i-1]['index']=(res.pages-1)*10+i;
          }
          // console.log(res.list)
          this.setState({
            dataSource: res.list,
          });
        })
        .catch((error)=>{
          message.info(error.data.message)
        })
        
      }
      render() {
          const rowSelection = {
            onChange: this.onSelectChange,
            onSelect() {
                // console.log(record, selected, selectedRows);
            },
            onSelectAll() {
                // console.log(selected, selectedRows, changeRows);
            },
          };
        
        const components = {
          body: {
            row: EditableFormRow,
            cell: EditableCell,
          },
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
        return (
            <div>
                <BlockQuote name="角色管理" menu='用户与权限'></BlockQuote>
                <div style={{padding:'15px'}}>
                  <Button type="primary" size="small" style={{marginRight:'15px'}}  onClick={() => this.handleAdd()} >新增</Button>
                      <Modal title="新增" visible={this.state.visible}
                            footer={[
                              <Button key="submit" type="primary" size="large" onClick={() => this.handleOk()}>确 定</Button>,
                              <Button key="back" type="ghost" size="large" onClick={() => this.handleCancel()}>返 回</Button>
                            ]}>
                            <RoleModal wrappedComponentRef={(form) => this.formRef = form} reset={this.state.reset}></RoleModal>
                      </Modal>
                      <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds} />
                      <span style={{float:'right',paddingBottom:'8px'}}>
                          <SearchCell name='请输入角色名称' searchEvent={this.searchEvent} searchContentChange={this.searchContentChange} fetch={this.fetch} />
                      </span>
                  
                  <div className='clear'  ></div>
                  <Table rowKey={record => record.id} dataSource={this.state.dataSource} columns={columns} rowSelection={rowSelection} pagination={this.pagination} components={components} onChange={this.handleTableChange} bordered size='small' scroll={{ y: 400 }}></Table>
                </div>
            </div>

        );
    }
}
export default Role;