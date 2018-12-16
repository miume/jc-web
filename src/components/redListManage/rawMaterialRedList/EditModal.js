import React from 'react';
import {Form,Input,Select,InputNumber} from 'antd';
const Option=Select.Option;
const FormItem=Form.Item;
const { TextArea } = Input;


class RawMaterialRedListEditModal extends React.Component{
  constructor(props){
      super(props);
      this.state = {
        materialName:'',
        materialClass:''
      };
      this.serialNumberSelectChange=this.serialNumberSelectChange.bind(this);
  }

   //编辑编号选择框变化时调用的函数
   serialNumberSelectChange(value){//下拉框得到的value是id
     //console.log(value);
    const id=value;
    const res=this.props.serialNumber;
    
    for(var i=0;i<res.length;i++){
           if(res[i].id===id){
              
                this.props.form.setFieldsValue({
                  materialName: res[i].materialName,
                  materialClass:res[i].materialClass
                });
              break;
           };
       }
  }
  getItemsValue = ()=>{    //3、自定义方法，用来传递数据（需要在父组件中调用获取数据）
    const values= this.props.form.getFieldsValue(['serialNumberId','quantityLoss','weightLoss','note']);       //4、getFieldsValue：获取一组输入控件的值，如不传入参数，则获取全部组件的值
    console.log(values);
    return values;//用来得到新增框中填写的新值
}
    /**重置组件的值 */
    resetField=()=>{
        this.props.form.resetFields();
    }
    render(){
        
      const { form } = this.props;
      const { getFieldDecorator } = form;
        return(
         
           <Form horizontal='true' >
                <FormItem   wrapperCol={{span:24}} required>
                {getFieldDecorator('serialNumberId',{
                    initialValue: this.props.record.repoBaseSerialNumber.id,
                    rules:[{required:true,message:'编号不能为空'}]
                })(
                  <Select onChange={this.serialNumberSelectChange} >
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
                    initialValue: this.props.record.repoBaseSerialNumber.materialName,
                    
                })(
                    <Input placeholder='物料名称'/>
                )}
                </FormItem>
                <FormItem   wrapperCol={{span:24}} required>
                {getFieldDecorator('materialClass',{
                    initialValue: this.props.record.repoBaseSerialNumber.materialClass,
                    
                })(
                    <Input placeholder='物料类型'/>
                )}
                </FormItem>
                <FormItem   wrapperCol={{span:24}} required>
                {getFieldDecorator('quantityLoss',{
                    initialValue: this.props.record.repoRedTable.quantityLoss,
                    rules:[{required:true,message:'损失货品数量不能为空'}]
                })(
                    <InputNumber min={1} placeholder='请输入损失货品数量' style={{width:'320px'}}></InputNumber>
                )}
                </FormItem>
                <FormItem  wrapperCol={{span:24}} required>
                {getFieldDecorator('weightLoss',{
                    initialValue: this.props.record.repoRedTable.weightLoss,
                    rules:[{required:true,message:'损失货品重量不能为空'}]
                })(
                    <InputNumber min={1} placeholder='请输入损失货品重量' style={{width:'320px'}}></InputNumber>
                )}
                </FormItem>
                <FormItem   wrapperCol={{span:24}} required>
                {getFieldDecorator('note',{
                    initialValue: '',
                    
                })(
                    <TextArea autosize={true} />
                )}
                </FormItem>
            </Form>
          
        );
    }
}
export default Form.create()(RawMaterialRedListEditModal);//创建form实例