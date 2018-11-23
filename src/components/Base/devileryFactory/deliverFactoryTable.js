import React ,{Component}from 'react';
import { Button,Input,Table,Divider,Popconfirm,message} from 'antd';
import '../Home/page.css';
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
                    ):()}
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
class DeliverFactoryTable extends Component{
    constructor(props){
        super(props);
        this.state={};
    }
    //判断单元格是否可编辑
    isEditing(record){
        return record.id===this.state.editingKey;
    }
    render(){
        return(
            <Table
              columns={columns}
            >
            </Table>
        );
    }
}