import React from 'react';
import {Table, Input, message, Popconfirm, Form, Divider, InputNumber, Spin} from 'antd';
import '../../Home/page.css';
import axios from 'axios';
import Add from './add'
import home from '../../commom/fns';
import BlockQuote from '../../BlockQuote/blockquote';
import UserManagement from './userManagement';
import PermissionManagement from './permissionManagement';
import DeleteByIds from '../../BlockQuote/deleteByIds';
import SearchCell from '../../BlockQuote/search';
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
      record,
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

class Role extends React.Component {
    url
    operation
    componentDidMount() {
      this.fetch({
          pageNumber: 1,
          sortField: 'id',
          sortType: 'desc',
      });
    }
    /**用来解决控制台报错 */
    componentWillUnmount() {
      this.setState = () => {
        return ;
      }
    }
    constructor(props) {
        super(props);
        this.state = {
            reset:false,
            roleName: '',
            dataSource : [],
            searchText: '',
            editingKey: '',
            visible: false,
            visible1: false,
            roleDescription: '',
            selectedRowKeys: [],
            searchContent:'',
            pageChangeFlag:0,  //0表示getAllByPage分页  1 表示搜索分页
        };
        this.reset = this.reset.bind(this);
        this.fetch = this.fetch.bind(this);
        this.cancel = this.cancel.bind(this);
        this.deleteFlag = this.deleteFlag.bind(this);
        this.judgeEditor = this.judgeEditor.bind(this);
        this.roleUpdate = this.roleUpdate.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.deleteByIds = this.deleteByIds.bind(this);
        this.confrimCancel = this.confrimCancel.bind(this);
        this.userManagement = this.userManagement.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.userManagement = this.userManagement.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.handleRoleNameChange = this.handleRoleNameChange.bind(this);
        this.handleRoleDescriptionChange = this.handleRoleDescriptionChange.bind(this);
        this.pagination = {
            showTotal(total) {
                return `共${total}条记录`
            },
            showSizeChanger:true,
            pageSizeOptions: ["10","20","50","100"]
        };
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'id',
            sorter: (a, b) => a.index - b.index,
            align:'center',
            width: '10%',
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
            width: '35%',
            render : (record) =>  {
                const editable = this.isEditing(record);
                let update = home.judgeOperation(this.operation,'UPDATE')
                let deleteFlag = home.judgeOperation(this.operation,'DELETE')
                return (
                    <span>
                        {this.judgeEditor(editable,update,record)}
                        {this.deleteFlag(deleteFlag,record)}
                        <UserManagement value={record.id} Authorization={this.url.Authorization} url={this.url}/>  {/**实现给成员分配角色的功能*/}
                        <Divider type="vertical" />
                        <PermissionManagement value={record.id} Authorization={this.url.Authorization} url={this.url}/>  {/**实现角色分配权限的功能*/}
                    </span>
                );
              }
          }]
        }
      render() {
          /**这是个令牌，每次调用接口都将其放在header里 */
          // this.Authorization = localStorage.getItem('Authorization');
          /**这是服务器网址及端口 */
          this.url = JSON.parse(localStorage.getItem('url'));
          const current = JSON.parse(localStorage.getItem('current')) ;
          /**获取当前菜单的所有操作权限 */
          this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
          const {selectedRowKeys} = this.state;
          const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
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
          let flag = home.judgeOperation(this.operation,'SAVE')
        return (
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent}></BlockQuote>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <Add flag={flag} fetch={this.fetch} url={this.url} />
                    <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds} cancel={this.confrimCancel} flag={home.judgeOperation(this.operation,'DELETE')} />
                    <SearchCell name='请输入角色名称' searchEvent={this.searchEvent} searchContentChange={this.searchContentChange} fetch={this.reset} flag={home.judgeOperation(this.operation,'QUERY')} />
                    <div className='clear'></div>
                    <Table rowKey={record => record.id} dataSource={this.state.dataSource} columns={columns}
                           rowSelection={rowSelection} pagination={this.pagination} components={components}
                           onChange={this.handleTableChange} bordered size='small' />
                </Spin>
            </div>
        );
    }
    /**重置 */
    reset(){
        this.pagination.current = 1;
        this.setState({
            searchContent:'',
            pageChangeFlag:0
        });
        this.fetch();
    }
    /**获取所有数据 getAllByPage */
    handleTableChange = (pagination) => {
        this.pagination = pagination;
        const {pageChangeFlag} = this.state;
        /**区分是否是 搜索分页内容 */
        if(pageChangeFlag){
            this.fetch({
                roleName:this.state.searchContent,
                pageSize: pagination.pageSize,
                pageNumber: pagination.current,
                sortField: 'id',
                sortType: 'desc',
            });
        }else{
            this.fetch({
                pageSize: pagination.pageSize,
                pageNumber: pagination.current,
                sortField: 'id',
                sortType: 'desc',
            });
        }
    }
    /**getAllByPage 获取分页数据 */
    fetch(params){
        axios({
            url: `${this.url.role.getRolesByPage}` ,
            method: 'get',
            headers:{
                'Authorization': this.url.Authorization
            },
            params: params,
        }).then((data) => {
            const res = data.data.data;
            let dataSource = [];
            if(res&&res.list){
                this.pagination.total=res?res.total:0;
                for(let i = 1; i<=res.list.length; i++){
                    res.list[i-1]['index']=res.prePage*10+i;
                }
                dataSource = res.list;
                this.setState({
                    dataSource: dataSource,
                    selectedRowKeys:[],
                    loading: false
                });
            }
        }).catch((error)=>{
            if(error.toString().indexOf("500")>0){
                this.props.history.push({pathname:'/'});
            }
        })
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
        axios({
            url:`${this.url.role.role}/${id}`,
            method:'Delete',
            headers:{
                'Authorization':this.url.Authorization
            },
        }).then((data)=>{
            message.info(data.data.message);
            if(data.data.code===0){
                this.fetch({
                    pageSize: this.pagination.pageSize,
                    pageNumber: this.pagination.current,
                    sortField: 'id',
                    sortType: 'desc',
                });
            }
        }).catch(()=>{
            message.info('删除失败，请联系管理员！')
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
                let data = row;
                data['id']=id.toString();
                this.roleUpdate(data,newData);
                this.setState({ editingKey: '' });
            } else {
                newData.push(row);
                this.setState({ dataSource: newData, editingKey: '' });
            }
        });
    }
    roleUpdate(data,newData){
        axios({
            url:`${this.url.role.role}`,
            method:'put',
            headers:{
                'Authorization':this.url.Authorization
            },
            data:data,
            type:'json'
        }).then((data)=>{
            if(data.data.code === -1) message.info('保存失败，请联系管理员！');
            else{
                message.info(data.data.message);
            }
            this.setState({ dataSource: newData});
        }).catch(()=>{
            message.info('保存失败，请联系管理员！');
        })
    }
    /**编辑 确定取消 */
    cancel(){
        this.setState({ editingKey: '' });
    };

    /**批量删除弹出框确认函数 */
    deleteByIds() {
        const ids = this.state.selectedRowKeys;
        axios({
            url:`${this.url.role.role}`,
            method:'Delete',
            headers:{
                'Authorization':this.url.Authorization
            },
            data:ids,
            type:'json'
        }).then((data)=>{
            message.info(data.data.message);
            if(data.data.code===0){
                this.fetch({
                    pageSize: this.pagination.pageSize,
                    pageNumber: this.pagination.current,
                    sortField: 'id',
                    sortType: 'desc',
                });
            }
        }).catch(()=>{
            message.info('删除错误，请联系管理员！')
        })
    }
    /**对应于批量删除时，确认取消删除 并实现checkbox选中为空 */
    confrimCancel(){
        this.setState({
            selectedRowKeys:[]
        })
    }
    /**成员管理 */
    userManagement(){
        this.setState({
            visible1:true
        })
    }
    /**实现全选 */
    onSelectChange(selectedRowKeys) {
        this.setState({ selectedRowKeys:selectedRowKeys });
    }
    /**获取查询时角色名称的实时变化 */
    searchContentChange(e){
        const value = e.target.value;
        this.setState({searchContent:value});
    }
    /** 根据角色名称分页查询*/
    searchEvent(){
        const roleName = this.state.searchContent;
        this.setState({
            pageChangeFlag:1
        })
        this.fetch({
            roleName:roleName,
        });
    }
    /**判断编辑操作*/
    judgeEditor(editable,flag,record){
        return (
            <span className={flag?'':'hide'}>
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
                <Divider type="vertical" />
            </span>
        )
    }
    /**删除*/
    deleteFlag(flag,record){
        return (
            <span className={flag?'':'hide'}>
                <Popconfirm title="确定删除?" onConfirm={()=>this.handleDelete(record.id)} okText="确定" cancelText="取消" >
                    <span className='blue'>删除</span>
                </Popconfirm>
                <Divider type="vertical" />
      </span>
            )
    }
}
export default Role;
