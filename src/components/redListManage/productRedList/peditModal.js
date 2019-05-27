import React from 'react';
import {Form,Input,Select,Icon} from 'antd';
import '../redList.css'
const Option=Select.Option;
const FormItem=Form.Item;
const {TextArea}=Input;


class ProductRedListEditModal extends React.Component{
  constructor(props){
      super(props);
      this.state = {
        materialName:'',
        materialClass:'',
        num:this.props.record.repoRedTable.quantityLoss,
        weight:this.props.record.repoRedTable.weightLoss,
      };
      this.serialNumberSelectChange=this.serialNumberSelectChange.bind(this);
      this.inputOnchange=this.inputOnchange.bind(this);
      this.add=this.add.bind(this);
      this.subtract=this.subtract.bind(this);
      this.inputOnchange1=this.inputOnchange1.bind(this);
      this.add1=this.add1.bind(this);
      this.subtract1=this.subtract1.bind(this);
  }

  inputOnchange(e){//监控输入框
    let v1=e.target.value;
    //console.log(v1);
    for(let i=0;i<v1.length;i++){
      if(v1[i]>=0&&v1[i]<=9){//判断是否为数字
               v1=v1.substr(i);
               break;
          }
      }
      this.setState({num:v1});
  }
  add(){
     
    this.setState({num:this.state.num+1});
  }
  subtract(){
     
      this.setState({num:this.state.num-1});
  }
  inputOnchange1(e){//监控输入框
    let v1=e.target.value;
    //console.log(v1);
    for(let i=0;i<v1.length;i++){
      if(v1[i]>=0&&v1[i]<=9){//判断是否为数字
               v1=v1.substr(i);
               break;
          }
      }
      this.setState({weight:v1});
  }
  add1(){
     
    this.setState({weight:this.state.weight+1});
  }
  subtract1(){
     
      this.setState({weight:this.state.weight-1});
  }
   //编辑编号选择框变化时调用的函数
   serialNumberSelectChange(value){//下拉框得到的value是id
    const id=value;
    const res=this.props.serialNumber;
    for(var i=0;i<res.length;i++){
           if(res[i].id===id){
            let  type=res[i].materialClass;
            //console.log(type);
              switch(type){
                 case 1: {type='原材料';break;} 
                 case 3: {type='产品';break;} 
                 default:{ type='';break;}
              }
                this.props.form.setFieldsValue({
                  materialName: res[i].materialName,
                  materialClass:type
                });
              break;
           };
       }
  }
  getItemsValue = ()=>{    //3、自定义方法，用来传递数据（需要在父组件中调用获取数据）
    const values= this.props.form.getFieldsValue(['serialNumberId','weightLoss','note']);       //4、getFieldsValue：获取一组输入控件的值，如不传入参数，则获取全部组件的值
    
    let v2=values.weightLoss;
    for(let i=0;i<v2.length;i++){
     if(v2[i]>=0&&v2[i]<=9){
              v2=v2.substr(i);
              break;
         }
     }
     values.weightLoss=parseInt(v2);
    return values;//
}
    /**重置组件的值 */
    resetField=()=>{
        this.props.form.resetFields();//对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
    }
    
    render(){
      const { form } = this.props;
      const { getFieldDecorator } = form;
      let type1=this.props.record.repoBaseSerialNumber.materialClass;
     
      switch(type1){
         case 1:{ type1= '原材料';break;}
         case 3:{ type1='产品';break;}
         default:{ type1='';break;}
      }
    
        return(
         
           <Form horizontal='true' >
                <FormItem   wrapperCol={{span:24}} required>
                {getFieldDecorator('serialNumberId',{
                    initialValue: this.props.record.repoBaseSerialNumber.id,
                    rules:[{required:true,message:'物料编码不能为空'}]
                })(
                  <Select onChange={this.serialNumberSelectChange} placeholder='请选择物料编码'>
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
                    <Input disabled placeholder='物料名称'/>
                )}
                </FormItem>
                <FormItem   wrapperCol={{span:24}} required>
                {getFieldDecorator('materialClass',{
                    initialValue: type1,
                    
                })(
                    <Input disabled placeholder='物料类型'/>
                )}
                </FormItem>
            
                <FormItem  wrapperCol={{span:24}} required>
                {getFieldDecorator('weightLoss',{
                    initialValue: `损失重量${this.state.weight}`,
                    rules:[{required:true,message:'损失货品重量不能为空'}]
                })(
                    <Input  
                    suffix={
                          <div  className='reDiv' onChange={this.inputOnchange1}>
                              <div className='redListNum' id='add' onClick={this.add1}> <Icon type="up" /></div>
                              <div className='redListNum1' id='subtract' onClick={this.subtract1}> <Icon type="down" /></div>
                          </div>
                       }
                     style={{width:'410px'}}
                  />
                )}
                </FormItem>
               
                <FormItem  wrapperCol={{span:24}} required>
                {getFieldDecorator('note',{
                    initialValue: this.props.record.repoRedTable.note,
                    
                })(
                    <TextArea  placeholder='请编辑损失说明'/>
                )}
                </FormItem>
            </Form>
          
        );
    }
}
export default Form.create()(ProductRedListEditModal);//创建form实例