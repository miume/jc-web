import React from 'react';
import {Form,Input,Button,Modal,message} from 'antd';
import axios from 'axios';

const FormItem=Form.Item;
const CollectionCreateForm = Form.create()(//弹出层
    class extends React.Component {
      render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        return (
          <Modal
            visible={visible}
            title="新增"
            onOk={this.props.onCreate}
            onCancel={this.props.onCancel}
            footer={[
                <Button key='submit' type='primary' size='large' onClick={this.props.onCreate}>确定</Button>,
                <Button key='back' type='ghost'size='large' onClick={this.props.onCancel}>取消</Button>
            ]}
          >
            <Form horizontal='true' >
                <FormItem label='产品线名称' labelCol={{span:5}} wrapperCol={{span:14}} required>
                {getFieldDecorator('name',{
                    initialValue: '',
                    rules:[{required:true,message:'产品线名称不能为空'}]
                })(
                    <Input placeholder='请输入产品线名称'></Input>
                )}
                </FormItem>
            </Form>
          </Modal>
        );
      }
    }
  );
  //这是个令牌，每次调接口将其放在header里面
const Authorization=localStorage.getItem('Authorization');
//通过这个获取接口地址
const server=localStorage.getItem('remote2');
class ProductLineAddModal extends React.Component{
    state = {
        visible: false,
      };
    
      showModal = () => {
        this.setState({ visible: true });
      }
     
      handleCancel = () => {
        const form = this.formRef.props.form;
        this.setState({ visible: false });
        form.resetFields();
      }
    
      handleCreate = () => {//新增一条记录
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {//校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
          if (err) {
            return;
          }
          axios({
            url:`${server}/jc/productLine/add`,
            method:'post',
            headers:{
              'Authorization':Authorization
            },
            data:values,
            type:'json'
          })
          .then((data)=>{
              //console.log(data);
              message.info(data.data.message);
              this.props.fetch();//
          })
          .catch((error)=>{
              message.info(error.data.message);
          });
         // console.log('Received values of form: ', values);//打印表单新增获得到的值
          form.resetFields();//重置一组输入控件的值（为 initialValue）与状态，如不传入参数，则重置所有组件
          this.setState({ visible: false });
        });
      }
    
      saveFormRef = (formRef) => {
        this.formRef = formRef;
      }
    
    render(){
        
        return(
          <span>
              <Button type="primary" size="small" style={{marginRight:'15px'}}  onClick={this.showModal} >新增</Button>
              <CollectionCreateForm
                wrappedComponentRef={this.saveFormRef}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                onCreate={this.handleCreate}
              />
          </span>
        );
    }
}
export default Form.create()(ProductLineAddModal);//创建form实例