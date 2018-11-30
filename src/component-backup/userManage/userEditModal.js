import React from 'react';
import { Form, Input,Select} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class UserEditModal extends React.Component{
    getItemsValue = ()=>{    //3、自定义方法，用来传递数据（需要在父组件中调用获取数据）
        const values= this.props.form.getFieldsValue();       //4、getFieldsValue：获取一组输入控件的值，如不传入参数，则获取全部组件的值
        return values;
    }
    render(){

        const { form } = this.props;
        const { getFieldDecorator } = form;    //1、将getFieldDecorator 解构出来，用于和表单进行双向绑定
       console.log(this.props.record);
        return(
            <Form horizontal='true' onSubmit={()=>this.handleSubmit()}>
               <FormItem label='用户名' labelCol={{span:5}} wrapperCol={{ span: 14 }} >
                  {getFieldDecorator('userName',{
                        initialValue:this.props.record.userName,
                        
                     })(    //2、getFieldDecorator 的使用方法，
                            <Input placeholder='请输入用户名' ></Input>
                        )}
                 
               </FormItem>
               <FormItem label='所属部门' labelCol={{span:5}} wrapperCol={{ span: 14 }} >
                  {getFieldDecorator('deparmentId',{
                        initialValue: this.props.record.deparmentId.name,
                        
                     })(    //2、getFieldDecorator 的使用方法，
                        <Select>
                            <Option value="product">生产部门</Option>
                            <Option value="test">测试部门</Option>
                        </Select>
                        )}
               </FormItem>

               <FormItem label='密码' labelCol={{span:5}} wrapperCol={{ span: 14 }} >
                  {getFieldDecorator('password',{
                        initialValue: this.props.record.password,
                       
                     })(    //2、getFieldDecorator 的使用方法，
                            <Input placeholder='请输入密码'></Input>
                        )}
               </FormItem>
               <FormItem label='手机号'labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
                    {getFieldDecorator('phoneNumber',{
                        initialValue: this.props.record.phoneNumber,
                    })( 
                        <Input placeholder='请输入手机号' ></Input>
                    )}
                </FormItem>
                <FormItem label='备注'labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
                    {getFieldDecorator('extraInfo',{
                        initialValue: this.props.record.extraInfo,
                    })( 
                        <Input placeholder='备注' ></Input>
                    )}
                </FormItem>
            </Form>
        );
    }
}
export default Form.create()(UserEditModal);
