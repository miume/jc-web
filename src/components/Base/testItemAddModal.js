import React from 'react';
import {Form,Input} from 'antd';
const FormItem=Form.Item;

class TestItemAddModal extends React.Component{
    getItemsValue = ()=>{    //3、自定义方法，用来传递数据（需要在父组件中调用获取数据）
        const values= this.props.form.getFieldsValue();       //4、getFieldsValue：获取一组输入控件的值，如不传入参数，则获取全部组件的值
        return values;
    }
    render(){
        const { getFieldDecorator } = this.props.form;    //1、将getFieldDecorator 解构出来，用于和表单进行双向绑定
        return(
           <Form horizontal='true' onSubmit={() => this.handleSubmit()}>
               <FormItem label='检测项目名称' labelCol={{span:5}} wrapperCol={{span:14}} required>
                 {getFieldDecorator('factoryName',{
                    initialValue: '',
                    rules:[{required:true,message:'检测项目名称不能为空'}]
                 })(
                     <Input placeholder='请输入检测项目名称'></Input>
                 )}
               </FormItem>
           </Form>
        );
    }
}
export default Form.create()(TestItemAddModal);//创建form实例