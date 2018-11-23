import React,{Component} from 'react';
import {Button,Table,Form,Input,Divider,Popconfirm} from 'antd';
import axios from 'axios';
import Blockquote from '../../BlockQuote/blockquote';
import DeleteByIds from '../../BlockQuote/deleteByIds';
import DeliveryFactoryAddModal from './deliveryFactoryAddModal';


const server=localStorage.getItem('remote');
const Authorization=localStorage.getItem('Authorization');

const EditableContext = React.createContext(); // ??这个是什么作用
const FormItem = Form.Item;
const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);
class EditableCell extends React.Component {
    constructor(props){
      super(props);
      this.state={
          editingKey:'',
      }
    }
    
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
const columns=[{
    title:'序号',
    dataIndex:'index',
    key:'id',
    sorter:true,
    align:'center'
},{
    title:'送货工厂',
    dataIndex:'name',
    key:'name',
   align:'center'
},{
    title:'操作',
    dataIndex:'operation',
    key:'operation',
    align:'center',
    render:(text,record)=>{
        const editable=this.isEditing(record);
        return(
           <span>
                <span>
                    {editable?(
                        <span>
                            <EditableContext.Consumer>
                                {form=>(
                                  <a
                                  href='javascript:;'
                                  onClick={()=>{this.save(form,record.id)}}
                                  style={{marginRight:8}}>
                                     保存
                                  </a>
                                )}
                            </EditableContext.Consumer>
                            <Popconfirm 
                                title='确定取消？' 
                                onConfirm={this.cancel(record.id)}
                                okText='确定' cancelText='取消'>
                                <a>取消</a>
                            </Popconfirm>
                        </span>
                    ):(
                        <a onClick={()=>this.edit(record.id)}>编辑</a>
                    )}
                </span>
               <Divider type='vertical'/>
               <span>
               <Popconfirm title='确定删除？' onConfirm={this.handleDelete(record.id)}
                         okText='确定' cancelText='取消'>
                 <a href='#'>删除</a>
               </Popconfirm>
               </span>
           </span>
           );
    }
}];
class DeliveryFactory extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            pagination: [],
            loading: false,
            selectedRowKeys:[],
            Authorization:Authorization,
        };
        this.pagination={
             total:this.state.data.length,//一共有几条数据
             showSizeChanger:true,
             onShowChange(current,pageSize){},
             onChange(current){}
        };
        this.handleTableChange=this.handleTableChange.bind(this);
        this.fetch=this.fetch.bind(this);
    }
    //从后台得到表格数据getAllByPage
    handleTableChange=(pagination)=>{
        // const pager = { ...this.state.pagination };
        // pager.current = pagination.current;
        // this.setState({
        //   pagination: pager,
        // });
        console.log(...this.state.pagination);
        this.fetch=({//前端需要传的参数
          page:pagination.pageSize,//页码
          size:pagination.current,//条目数
          orderField:'id',
          orderType:'desc'
        
        });
    }
    fetch = (params = {}) => {
        this.setState({ loading: true });
        axios({
          url: 'http://2p277534k9.iok.la:58718/jc/deliveryFactory/getDeliveryFactoriesByPage',
          method: 'get',
          headers:{
              'Authorization':Authorization
          },
          params: {
            ...params,
          },
          
        }).then((data) => {
           
          const res=data.data.data;
          this.pagination.total=res.total;
          for(var i=1;i<=res.list.length;i++){//实现序号从1开始
                res.list[i-1]['index']=(res.pages-1)*10+i;
            }
            this.setState({
                loading:false,
                data:res.list
            });
        });
      }
    
      componentDidMount() {
        this.fetch();
      }
    
  /**---------------------- */
    /**实现批量删除功能 */
  onSelectChange=(selectedRowKeys)=>{//选的哪几条记录
    console.log('selectedRowKeys changed: ', selectedRowKeys);
     this.setState({
        selectedRowKeys:selectedRowKeys
     });
}
//  deleteByIds=()=>{
//     const ids=this.state.selectedRowKeys;
//     console.log(ids);
//     axios({
//         url:'',
//         method:'',
//         headers:{
//             'Authorization' :Authorization
//         },
//         data:,
//         type:'json'

//     })
//     .then((data)=>{
        
//     })
//     .catch((error)=>{

//     });
// }
cancel=()=>{}
    render(){
        //const selectedRowKeys = this.state;
        const rowSelection={//监听checkbox
            //selectedRowKeys,
            onChange:this.onSelectChange,
            onSelect() {
                // console.log(record, selected, selectedRows);
              },
              onSelectAll() {
                // console.log(selected, selectedRows, changeRows);
              },
        };
        
        return(
            <div>
                <Blockquote name='送样工厂'/>
                <div style={{marginTop:'10px'}}>
                  <DeliveryFactoryAddModal fetch={this.fetch}/>
                  {/* <DeleteByIds onConfirm={this.deleteByIds} onCancel={this.cancel} okText='确定' cancelText='取消'/> */}
                </div>
                <Table
                 columns={columns}
                 rowKey={record => record.id}
                 rowSelection={rowSelection}
                 dataSource={this.state.data}
                 pagination={this.state.pagination}
                 loading={this.state.loading}
                 onChange={this.handleTableChange}></Table>
            </div>
        );}
}
export default DeliveryFactory;