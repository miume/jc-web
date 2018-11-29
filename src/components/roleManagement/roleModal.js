import React from 'react';
import { Form, Input} from 'antd';
const FormItem = Form.Item;

class RoleModal extends React.Component{
    constructor(props){
        super(props);
        // this.resetField = this.resetField.bind(this);
    }
    getItemsValue = ()=>{    //3、自定义方法，用来传递数据（需要在父组件中调用获取数据）
        const values= this.props.form.getFieldsValue();       //4、getFieldsValue：获取一组输入控件的值，如不传入参数，则获取全部组件的值
        return values;
    }
    /**重置组件的值 */
    resetField=()=>{
        this.props.form.resetFields();
    }
    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;    //1、将getFieldDecorator 解构出来，用于和表单进行双向绑定
        
        return (
            <Form horizontal='true' onSubmit={() => this.handleSubmit()}>
                <FormItem label='角色名称'labelCol={{ span: 5 }} wrapperCol={{ span: 14 }} required>
                    {getFieldDecorator('roleName',{
                        initialValue: '',
                        rules: [{required: true, message: '角色名称不能为空'}],
                    })(    //2、getFieldDecorator 的使用方法，
                            <Input placeholder='请输入角色名称'></Input>
                        )}
                </FormItem>
                <FormItem label='角色描述'labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
                    {getFieldDecorator('description',{
                        initialValue: '',
                    })( 
                        <Input placeholder='请输入角色名称' ></Input>
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