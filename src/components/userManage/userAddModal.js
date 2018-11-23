import React from 'react';
import { Form, Input,Select} from 'antd';
import axios from 'axios';
const FormItem = Form.Item;
const Option = Select.Option;


class UserAddModal extends React.Component{
    constructor(props){
        super(props);
       this.state={
        confirmDirty: false,
       }
       
    }
    //'username','password','departmentId','phone'
    getItemsValue = ()=>{    //3、自定义方法，用来传递数据（需要在父组件中调用获取数据）
        const values= this.props.form.getFieldsValue(['username','password','departmentId','phone']);       //4、getFieldsValue：获取一组输入控件的值，如不传入参数，则获取全部组件的值
        return values;//用来得到新增框中填写的新值
    }
    
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
      }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('两次输入密码不一致!');
        } else {
          callback();
        }
      }
    
      validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
     /**重置组件的值 */
     resetField=()=>{
      this.props.form.resetFields();
  }

    render(){
        const { form } = this.props;
        const { getFieldDecorator } = form;    //1、将getFieldDecorator 解构出来，用于和表单进行双向绑定
        // const departmentChildren=this.state.depart;
        return(
            <Form horizontal='true' onSubmit={()=>this.handleSubmit()}>
               <FormItem label='用户名' labelCol={{span:5}} wrapperCol={{ span: 14 }} required>
                  {getFieldDecorator('username',{
                        initialValue: '',
                        rules: [{required: true, message: '用户名不能为空'}],
                     })(    //2、getFieldDecorator 的使用方法，
                            <Input placeholder='请输入用户名'></Input>
                        )}
               </FormItem>
               <FormItem label="密码" labelCol={{span:5}} wrapperCol={{ span: 14 }} require>
               {getFieldDecorator('password', {
                 rules: [{
                   required: true, message: '密码不能为空!',
                 }, {
                   validator: this.validateToNextPassword,
                 }],
               })(
                 <Input type="password" />
               )}
             </FormItem>
               <FormItem label="确认密码"  labelCol={{span:5}} wrapperCol={{ span: 14 }} required>
                    {getFieldDecorator('confirm', {
                        rules: [{
                        required: true, message: '请确认你的密码!',
                        }, {
                        validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
              </FormItem>
               <FormItem label='所属部门' labelCol={{span:5}} wrapperCol={{ span: 14 }} required>
                  {getFieldDecorator('departmentId',{
                        initialValue: '',
                        rules: [{required: true, message: '请选择所属部门'}],
                     })(    //2、getFieldDecorator 的使用方法，
                        <Select>
                           {
                               this.props.deparment.map(de=>{
                                 return(
                                <Option key={de.id} value={de.id}>{de.departmentName}</Option>
                                 );
                            })
                           }
                        </Select>
                        )}
               </FormItem>

              
               <FormItem label='手机号'labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
                    {getFieldDecorator('phone',{
                        initialValue: '',
                    })( 
                        <Input placeholder='请输入手机号' ></Input>
                    )}
                </FormItem>
               
            </Form>
        );
    }
}
export default Form.create()(UserAddModal);