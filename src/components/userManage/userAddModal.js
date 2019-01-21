import React from 'react';
import { Form, Input,Select,message} from 'antd';
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
        //const values= this.props.form.getFieldsValue(['username','name1','password','departmentId','phone',]);       //4、getFieldsValue：获取一组输入控件的值，如不传入参数，则获取全部组件的值
        const values= this.props.form.getFieldsValue();
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
               <FormItem wrapperCol={{ span: 24 }} required>
                  {getFieldDecorator('username',{
                        initialValue: '',
                        rules: [{required: true, message: '登录名不能为空'}],
                     })(    //2、getFieldDecorator 的使用方法，
                            <Input placeholder='请输入登录名' style={{height:'40px' }}></Input>
                        )}
               </FormItem>
               <FormItem wrapperCol={{ span: 24 }} required>
               {getFieldDecorator('name',{
                     initialValue: '',
                     rules: [{required: true, message: '用户名不能为空'}],
                  })(    //2、getFieldDecorator 的使用方法，
                         <Input placeholder='请输入用户名' style={{height:'40px' }}></Input>
                     )}
            </FormItem>
               <FormItem wrapperCol={{ span: 24 }} required>
               {getFieldDecorator('password', {
                 rules: [{
                   required: true, message: '密码不能为空!',
                 }, {
                   validator: this.validateToNextPassword,
                 }],
               })(
                 <Input placeholder='请输入密码'   type="password" style={{height:'40px' }}/>
               )}
             </FormItem>
               <FormItem   wrapperCol={{ span: 24 }} required>
                    {getFieldDecorator('confirm', {
                        rules: [{
                        required: true, message: '请确认你的密码!',
                        }, {
                        validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input style={{height:'40px' }} type="password"  placeholder='请确认密码' onBlur={this.handleConfirmBlur} />
                    )}
              </FormItem>
               <FormItem   wrapperCol={{ span: 24 }} required>
                  {getFieldDecorator('departmentId',{
                        
                        rules: [{required: true, message: '请选择所属部门'}],
                     })(    //2、getFieldDecorator 的使用方法，
                        
                        <Select placeholder="请选择所属部门" style={{fontSize:"14px"}} size="large">

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
               <FormItem  wrapperCol={{ span: 24 }}>
                    {getFieldDecorator('phone',{
                        
                        rules:[{required: true, message: '请输入11位正确的手机号码',pattern:new RegExp(/^[1][3,4,5,7,8][0-9]{9}$/, "g"),
                        len:11}],
                        getValueFromEvent: (event) => {
                          return event.target.value.replace(/\D/g,'')
                      },
                    },
                  )( 
                        <Input   placeholder='请输入手机号' style={{height:'40px'}}></Input>
                        )}
               </FormItem>
            </Form>
        );
    }
}
export default Form.create()(UserAddModal);
