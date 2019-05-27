/*
* 1、创建Form实例
* 2、经过Form.create 包装的组件将会自带this.props.form属性
* 3、getFieldsValue(获取一组输入控件的值，如不传入参数，则获取全部组件的值)
* resetFields (重置一组输入控件的值与状态，如果不传入参数，则重置全部组件的值)
* */
import React from 'react'
import {Form,Input} from "antd";
const FormItem = Form.Item
class ChangePasswordModal extends React.Component{
    constructor(props){
        super(props)
        this.validateToNextPassword = this.validateToNextPassword.bind(this)
        this.compareToFirstPassword = this.compareToFirstPassword.bind(this)
    }
    validateToNextPassword(rule,value,callback){
        const form = this.props.form
        if(value){
            form.validateFields(['confirm'],{force:true})
        }
        callback()
    }
    //确认两次密码输入是否正确
    compareToFirstPassword(rule,value,callback){
        const form = this.props.form
        if(value & value !== form.getFieldValue('newPassword')){
            callback('前后两次输入密码不一致！')
        }
        else {
            callback()
        }
    }
    render(){
        const {getFieldDecorator} = this.props.form
        return (
            <Form horizontal={'true'}>
                <FormItem wrapperCol={{span:24}} label={'新密码'} required>
                    {getFieldDecorator('password',{
                        initialValue:'',
                        rules:[{required:true,message:'旧密码不能为空'}]
                    })(
                        <Input placeholder={'请输入旧密码'} type={'password'}/>
                    )}
                </FormItem>
                <FormItem wrapperCol={{span:24}} label={'新密码'} required>
                    {getFieldDecorator('newPassword',{
                        initialValue:'',
                        rules:[{required:true,message:'新密码不能为空'},
                               {validator:this.validateToNextPassword}]
                    })(
                        <Input placeholder={'请输入新密码'} type={'password'}/>
                    )}
                </FormItem>
                <FormItem wrapperCol={{span:24}} label={'确定新密码'} required>
                    {getFieldDecorator('confirm',{
                        initialValue:'',
                        rules:[{required:true,message:'新密码不能为空'},
                            {validator:this.compareToFirstPassword}]
                    })(
                        <Input placeholder={'请输入新密码'} type={'password'}/>
                    )}
                </FormItem>
            </Form>
        )
    }
}

export default Form.create()(ChangePasswordModal)