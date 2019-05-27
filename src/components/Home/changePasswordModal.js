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
        this.state = {
            confirmDirty : false
        }
        this.validateToNextPassword = this.validateToNextPassword.bind(this)
        this.compareToFirstPassword = this.compareToFirstPassword.bind(this)
        this.handleConfirmBlur = this.handleConfirmBlur.bind(this)
    }
    handleConfirmBlur(e){
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    validateToNextPassword(rule,value,callback){
        const form = this.props.form
        if(value && this.state.confirmDirty){
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
                <FormItem wrapperCol={{span:24}} label={'旧密码'} required>
                    {getFieldDecorator('oldPassword',{
                        rules:[{required:true,message:'旧密码不能为空'}]
                    })(
                        <Input placeholder={'请输入旧密码'} type={'password'}/>
                    )}
                </FormItem>
                <FormItem wrapperCol={{span:24}} label={'新密码'} required>
                    {getFieldDecorator('newPassword',{
                        rules:[{required:true,message:'请输入新密码'},
                               {validator:this.validateToNextPassword}]
                    })(
                        <Input placeholder={'请输入新密码'} type={'password'}/>
                    )}
                </FormItem>
                <FormItem wrapperCol={{span:24}} label={'确定新密码'} required>
                    {getFieldDecorator('confirm',{
                        rules:[{required:true,message:'请确认新密码'},
                            {validator:this.compareToFirstPassword}]
                    })(
                        <Input placeholder={'确认新密码'} type={'password'} onBlur={this.handleConfirmBlur}/>
                    )}
                </FormItem>
            </Form>
        )
    }
}

export default Form.create()(ChangePasswordModal)