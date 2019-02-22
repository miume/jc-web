import React from 'react';
import '../redList.css'
import {Form,Input,Select,InputNumber} from 'antd';

const { TextArea } = Input;

const Option=Select.Option;
const FormItem=Form.Item;

    class RawMaterialRedListAddModal extends React.Component {
          constructor(props){
              super(props);
              this.state={
                materialName:'',
                materialClass:'',
              }
              this.serialNumberSelectChange=this.serialNumberSelectChange.bind(this);
          }
            //新增编号选择框变化时调用的函数
            serialNumberSelectChange(value){//下拉框得到的value是id
                const id=value;
                const res=this.props.serialNumber;
              //   console.log(res);
              //   console.log(id);
                 //console.log(res[id-1]);
                //console.log(res[id-1].materialName);
                for(var i=0;i<res.length;i++){
                       if(res[i].id===id){
                          let  type=res[i].materialClass;
                            switch(type){
                               case 1: {type='原材料';break;} 
                               case 3: {type='产品';break;}
                               default: {type='';break;}
                            }
                            
                        //console.log(type);
                            this.props.form.setFieldsValue({
                             // serialNumber:'请输入编号',

                              materialName: res[i].materialName,
                              materialClass:type
                                      
                            });
                          break;
                       };
                     
                }
              }
  
      getItemsValue = ()=>{    //3、自定义方法，用来传递数据（需要在父组件中调用获取数据）
        const values= this.props.form.getFieldsValue(['serialNumberId','quantityLoss','weightLoss','note']);       //4、getFieldsValue：获取一组输入控件的值，如不传入参数，则获取全部组件的值
        //console.log(values);
        return values;//用来得到新增框中填写的新值
    }
   
        /**重置组件的值 */
        resetField=()=>{
            this.props.form.resetFields();
        }
      render() {
       
        const { form } = this.props;
        const { getFieldDecorator } = form;
        // const quantityLoss= this.props.form.getFieldsValue(['quantityLoss']);
        // const weightLoss= this.props.form.getFieldsValue(['weightLoss']); 
        return (
         
            <Form horizontal='true' >
                <FormItem   wrapperCol={{span:24}} required>
                {getFieldDecorator('serialNumberId',{
                    
                    rules:[{required:true,message:'请选择编号'}]
                })( 
                    <Select   onChange={this.serialNumberSelectChange} placeholder='请选择编号'>
                    {
                        this.props.serialNumber.map((bat)=>{
                            return(
                                <Option key={bat.id} value={bat.id}>{bat.serialNumber}</Option>
                            );
                        })
                    }
                    </Select>
                    
                )}
                </FormItem>
                <FormItem   wrapperCol={{span:24}} required>
                {getFieldDecorator('materialName',{
                    initialValue: '',
                    
                })(
                    <Input  placeholder='物料名称'/>
                )}
                </FormItem>
                <FormItem   wrapperCol={{span:24}} required>
                {getFieldDecorator('materialClass',{
                    initialValue: '',
                    
                })(
                    <Input placeholder='物料类型'/>
                )}
                </FormItem>
                <FormItem   wrapperCol={{span:24}} required>
                {getFieldDecorator('quantityLoss',{
                    initialValue: '',
                    rules:[{required:true,message:'损失货品数量不能为空'}]
                })(
                    <InputNumber min={1} placeholder='请输入损失货品数量' style={{width:'320px'}}></InputNumber>
                )}
                </FormItem>
                <FormItem   wrapperCol={{span:24}} required>
                {getFieldDecorator('weightLoss',{
                  
                    rules:[{required:true,message:'损失货品重量不能为空'}]
                })(
                    <InputNumber min={1} placeholder='请输入损失货品重量'   style={{width:'320px'}}></InputNumber>
                  
                )}
                </FormItem>
                <FormItem  wrapperCol={{span:24}} required>
                {getFieldDecorator('note',{
                    initialValue: ''
                    
                })(
                    <TextArea  placeholder='请填写损失说明'/>
                )}
                </FormItem>
            </Form>
       
        );
      }
    }
  
export default Form.create()(RawMaterialRedListAddModal);//创建form实例