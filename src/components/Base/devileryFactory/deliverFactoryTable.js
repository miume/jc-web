import React ,{Component}from 'react';
import { Button,Input,Table,Divider,Popconfirm,message,Form} from 'antd';
import '../../Home/page.css';
import axios from 'axios';


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
                      //this.form = form;
                      const { getFieldDecorator } = form;
                      return (
                          <td {...restProps}>
                              {editing ? (
                                  <FormItem style={{ margin: 0 }}>
                                      {getFieldDecorator(dataIndex, {
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
const server=localStorage.getItem('remote');
const Authorization=localStorage.getItem('Authorization');
class DeliverFactoryTable extends Component{
    constructor(props){
        super(props);
        this.state={
            editingKey:''
        };
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'id',
            //sorter:true,
            align:'center',
            width:'20%'
        },{
            title:'送样工厂名称',
            dataIndex:'name',
            key:'name',
           align:'center',
           width:'33%',
           editable:1,
        },{
            title:'操作',
           // dataIndex:'operation',
            key:'operation',
            align:'center',
           width:'33%',
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
                                        onConfirm={()=>this.cancel(record.id)}
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
                       <Popconfirm title='确定删除？' onConfirm={()=>this.handleDelete(record.id)}
                                 okText='确定' cancelText='取消'>
                         <a href='#'>删除</a>
                       </Popconfirm>
                       </span>
                   </span>
                   );
            }
        }];
    }
      /**实现初始化页面功能 */
    //   getFetch = () => {
    //     this.props.fetch();
    // };
    /**---------------------- */
    /**实现编辑功能 */ 
    isEditing(record){
        return record.id===this.state.editingKey;
     }
     edit(id){
        this.setState({editingKey:id});
     }
   //实现编辑操作
   save(form,id){
     //row代表修改后的数据，item代表原始数据
     form.validateFields((error,row)=>{//校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
          if(error){
              return;
          }
          const newdata=[...this.props.data];
          const index=newdata.findIndex(item=>id===item.id);
          if(index>-1){
             const item=newdata[index];//修改前得数据
             newdata.splice(index,1,{
                 ...item,
                 ...row
             });//splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。该方法会改变原始数组。
             /**
              * splice() 方法可删除从 index 处开始的零个或多个元素，并且用参数列表中声明的一个或多个值来替换那些被删除的元素。
              * arrayObject 中删除了元素，则返回的是含有被删除的元素的数组。
              * arrayObject.splice(index,howmany,item1,.....,itemX)
              * index	必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
               howmany	必需。要删除的项目数量。如果设置为 0，则不会删除项目。
              item1, ..., itemX	可选。向数组添加的新项目。
              */
             const data=row;//修改后的数据
             data['id']=id.toString();
             axios({
                 url:'http://2p277534k9.iok.la:58718/jc/deliveryFactory/update',
                 method:'post',
                 headers:{
                    'Authorization':Authorization
                 },
                 data:data,
                 type:'json'
             })
             .then((data)=>{
                 //console.log(data);
                 message.info(data.data.message);
                 this.props.fetch();
             })
             .catch((error)=>{
                 message.info(error.data.message);
             });
             this.props.modifyDataSource(newdata);
             this.setState({editingKey:''});
          }
          else{
              newdata.push(row);
              this.props.modifyDataSource(newdata);
              this.setState({editingKey: '' });
          }
     })
   }
   cancel = () => {
    this.setState({ editingKey: '' });
  };
 /**---------------------- */
    /**实现根据id单条记录删除功能 */
     handleDelete(id){//id代表的是这条记录的id
          const dataSource=[...this.props.data];
          axios({
            url:`http://2p277534k9.iok.la:58718/jc/deliveryFactory/${id}`,
            method:'Delete',
            headers:{
                'Authorization':Authorization
            },
           data:id,
           type:'json'
          })
          .then((data)=>{
             console.log(data);
          message.info(data.data.message);
          this.fetch();
          })
          .catch((error)=>{
            message.info(error.data.message);
          });
     }


    render(){
        const components = {
            body: {
              row: EditableFormRow,
              cell: EditableCell,
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
            <Table
              rowKey={record => record.id}
              dataSource={this.props.dataSource}
              columns={table_column}
              components={components}
              rowSelection={this.props.rowSelection}
              pagination={this.props.pagination}
              handleTableChange={this.props.handleTableChange}
              size="small"
              bordered
              scroll={{ y: 400 }}
            >
            </Table>
        );
    }
}
export default DeliverFactoryTable;