import React from 'react';
import {Input, Table, Popconfirm, Form, Divider, message, Spin} from 'antd';
import '../../../Home/page.css';
import axios from 'axios';
import BlockQuote from '../../../BlockQuote/blockquote';
import DeleteByIds from '../../../BlockQuote/deleteByIds';
import SearchCell from '../../../BlockQuote/search';
import DeliveryFactoryAddModal from './deliveryFactoryAddModal';
//import EditableCell from './editaleCell';

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
const current=JSON.parse(localStorage.getItem('current'));
class DeliveryFactory extends React.Component{
  url;
  operation;
  componentDidMount(){
    this.fetch();
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
          pagination:[],
          selectedRowKeys : [],//最开始一条记录也没选
          searchContent:'',
          editingKey:'',
          loading: true
      }
      this.handleDelete=this.handleDelete.bind(this);
      this.onSelectChange=this.onSelectChange.bind(this);
      this.isEditing=this.isEditing.bind(this);
      this.handleTableChange=this.handleTableChange.bind(this);
      this.searchContentChange=this.searchContentChange.bind(this);
      this.searchEvent=this.searchEvent.bind(this);
      this.cancel=this.cancel.bind(this);
      this.deleteByIds=this.deleteByIds.bind(this);
      this.returnBaseInfo=this.returnBaseInfo.bind(this);
      this.deleteCancel=this.deleteCancel.bind(this);
      this.judgeOperation=this.judgeOperation.bind(this);
      this.pagination = {
          total: this.state.dataSource.length,
          showSizeChanger: true,//是否可以改变 pageSize
          showTotal:total=>`共${total}条记录`,
          pageSizeOptions: ["10","20","50","100"]
      };
      this.operation=JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null

      this.columns=this.judgeOperation(this.operation,'UPDATE')&&this.judgeOperation(this.operation,'DELETE')?[{//表头
        title:'序号',
        dataIndex:'index',//dataIndex值与字段值要匹配
        key:'id',
        sorter:(a, b) => a.id-b.id,
        width: '26%',
        align:'center',
     },{
        title:'送样工厂名称',
        dataIndex:'name',
        key:'name',
        editable:1,//?显示这个数据格是否可编辑
        width: '33%',
        align:'center',
    },
    {
      title: '操作',
      key:'operation',
      width: '33%',
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
              <span className={this.judgeOperation(this.operation,'DELETE')?'':'hide'}><Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.id)} okText="确定" cancelText="再想想" >
                <span className='blue'>删除</span>
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
      width: '46%',
      align:'center',
   },{
      title:'送样工厂名称',
      dataIndex:'name',
      key:'name',
      editable:1,//?显示这个数据格是否可编辑
      width: '46%',
      align:'center',
  }];
    }
    //获取所有数据getAllByPage
    handleTableChange=(pagination)=>{
       this.fetch({//前端需要传的参数
         size:pagination.pageSize,//条目数
         page:pagination.current,//当前页
       });
    }
    fetch=(params = {})=>{
      axios({
        url: `${this.url.deliveryFactory.getAllByPage}`,
        method:'get',
        headers:{
          'Authorization':this.url.Authorization
        },
        params:{
          ...params,
        },
      }).then((data)=>{
        const res=data.data.data;
        this.pagination.total=res.total?res.total:0;
        this.pagination.current=res.pageNum;
     if(res&&res.list){
      for(var i = 1; i<=res.list.length; i++){
        res.list[i-1]['index']=res.prePage*10+i;
      }//是序号从1开始
      this.setState({
        loading:false,
        dataSource:res.list,
      });
     }
      });
    }

    //根据id处理单条记录删除
    handleDelete(id){//id代表的是这条记录的id
      //console.log(id);
        //const dataSource = this.state.dataSource;
        axios({
          url:`${this.url.deliveryFactory.deliveryFactory}/${id}`,
          method:'Delete',
          headers:{
            'Authorization':this.url.Authorization
          },
         data:id,
         type:'json'
        })
        .then((data)=>{
          //console.log(data);
          message.info(data.data.message);
          this.fetch();
        })
        .catch(()=>{
         message.info('删除失败，请联系管理员');
        });
      }
    /**批量删除弹出框确认函数 */
    deleteByIds(){
      const ids =this.state.selectedRowKeys;//删除的几行的id
      axios({
          url:`${this.url.deliveryFactory.deliveryFactory}?ids=${ids}`,
          method:'Delete',
          headers:{
                'Authorization' :this.url.Authorization
          },
          data:ids,//前端要传的参数放在data里面，
          type:'json'
      })
      .then((data)=>{
       // console.log(data);
        message.info(data.data.message);
        if(data.data.code===0){
          if(this.pagination.total%10===1){
             this.pagination.current=this.pagination.current-1;
          }
          this.fetch({
            size:this.pagination.pageSize,
            page:this.pagination.current,
            orderField:'id',
            orderType:'desc'
          });//调用getAllByPage,渲染删除后的表格
        }

        this.setState({
          selectedRowKeys:[]
        });
      })//处理成功
      .catch(()=>{
       // console.log(error);
        message.info('删除失败，请联系管理员！')
      });//处理异常
   }
   deleteCancel(){//批量删除的取消，要将那个checkbox置空
    this.setState({
      selectedRowKeys:[]
    });
  }
    //实现checkbox全选
    onSelectChange(selectedRowKeys) {
        //console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys:selectedRowKeys });
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
              /** * splice() 方法可删除从 index 处开始的零个或多个元素，并且用参数列表中声明的一个或多个值来替换那些被删除的元素。
              * arrayObject 中删除了元素，则返回的是含有被删除的元素的数组。
              * arrayObject.splice(index,howmany,item1,.....,itemX)
              * index	必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
               howmany	必需。要删除的项目数量。如果设置为 0，则不会删除项目。
              item1, ..., itemX	可选。向数组添加的新项目。
              */
            const data=row;
            /**将id变成字符串 */
           data['id']=id.toString();
            //console.log(data);
            axios({
              url:`${this.url.deliveryFactory.deliveryFactory}`,
              method:'put',
              headers:{
                'Authorization':this.url.Authorization
              },
              data:data,
              type:'json'
            })
            .then((data)=>{
              // console.log(data);
              message.info(data.data.message);
             // this.fetch();
             this.setState({dataSource:newData});
            })
            .catch(()=>{
             // console.log(error.data);
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
       /**返回基础数据页面 */
      returnBaseInfo(){
        this.props.history.push({pathname:'/baseInfo'});
       }
      /**---------------------- */
        //获取查询时用户名称的实时变化
        searchContentChange(e){
          const value=e.target.value;
          this.setState({searchContent:value});
        }
      //根据用户名称分页查询
      searchEvent(){
           const name=this.state.searchContent;
           axios({
             url:`${this.url.deliveryFactory.search}`,//${variable}是字符串模板，es6使用反引号``创建字符串
             method:'get',
             headers:{
               'Authorization':this.url.Authorization
             },
             params:{
               size:this.pagination.pageSize,
               //page:this.pagination.current,
               name:name
             },
             type:'json'
           })
           .then((data)=>{
             const res=data.data.data;
             this.pagination.total=res.total?res.total:0;
             this.pagination.current=res.pageNum;
             if(res&&res.list){
              for(var i=1;i<=res.list.length;i++){
                res.list[i-1]['index']=res.prePage*10+i;
             }
             this.setState({
               dataSource:res.list,//list取到的是所有符合要求的数据
               searchContent:''
             });
             }
           })
           .catch(()=>{
            message.info('查询失败，请联系管理员！')
           });
      }
   judgeOperation(operation,operationCode){
       var flag=operation?operation.filter(e=>e.operationCode===operationCode):[];
       //console.log(flag);
       return flag.length>0?true:false
   }
   render(){
     this.url=JSON.parse(localStorage.getItem('url'));

     //获取该菜单所有操作权限
     this.operation=JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
     const {selectedRowKeys}=this.state;
     const rowSelection = {//checkbox
          onChange:this.onSelectChange,
          selectedRowKeys,
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
    const table_column =this.columns.map((col) => {
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
               <BlockQuote name='送样工厂' menu={current.menuParent} menu2='返回' returnDataEntry={this.returnBaseInfo} flag={1}/>
               <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
               <DeliveryFactoryAddModal fetch={this.fetch} url={this.url} flag={this.judgeOperation(this.operation,'SAVE')}/>
               <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds} cancel={this.deleteCancel} flag={this.judgeOperation(this.operation,'SAVE')}/>

                      <SearchCell name='请输入送样工厂'
                      searchEvent={this.searchEvent}
                      searchContentChange={this.searchContentChange}
                      fetch={this.fetch}
                      flag={this.judgeOperation(this.operation,'QUERY')}/>

               <div className='clear'  ></div>
                <Table rowKey={record => record.id}
                    rowSelection={rowSelection}
                    columns={table_column}
                    dataSource={this.state.dataSource}
                    components={components}
                    pagination={this.pagination}
                    onChange={this.handleTableChange}
                    size="small" bordered/>
               </Spin>
           </div>
       );
   }
}
export default DeliveryFactory;