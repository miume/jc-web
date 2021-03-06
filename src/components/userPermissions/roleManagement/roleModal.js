import React from 'react';
import { Form, Input} from 'antd';
const FormItem = Form.Item;

class RoleModal extends React.Component{
    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;    //1、将getFieldDecorator 解构出来，用于和表单进行双向绑定

        return (
            /**label='角色名称'labelCol={{ span: 5 }}   label='角色描述'labelCol={{ span: 5 }}  */
            <Form horizontal='true' onSubmit={() => this.handleSubmit()}>
                <FormItem wrapperCol={{ span: 24 }} required>
                    {getFieldDecorator('roleName',{
                        initialValue: '',
                        rules: [{required: true, message: '角色名称不能为空'}],
                    })(    //2、getFieldDecorator 的使用方法，
                            <Input placeholder='请输入角色名称' style={{height:40}}></Input>
                        )}
                </FormItem>
                <FormItem wrapperCol={{ span: 24 }}>
                    {getFieldDecorator('description',{
                        initialValue: '',
                    })(
                        <Input placeholder='请输入角色描述' style={{height:40}}></Input>
                    )}
                </FormItem>
            </Form>
        );
    }
}
export default Form.create()(RoleModal);
//创建form实例
//经过 Form.create 包装的组件将会自带 this.props.form 属性
//API getFieldsValue(获取一组输入控件的值，如不传入参数，则获取全部组件的值)
//resetFields (重置一组输入控件的值与状态，如果不传入参数，则重置全部组件的值)
