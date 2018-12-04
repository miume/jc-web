import React from 'react';
import {Form,Input,Button,Modal,message} from 'antd';
import axios from 'axios';
import AddButton from '../../BlockQuote/addButton';

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
            maskClosable='false'
            onOk={onCreate}
            onCancel={onCancel}
            footer={[
                <Button key='submit' type='primary' size='large' onClick={this.props.onCreate}>确定</Button>,
                <Button key='back' type='ghost'size='large' onClick={this.props.onCancel}>取消</Button>
            ]}
          >
            <Form horizontal='true' >
                <FormItem label='工厂名称' labelCol={{span:5}} wrapperCol={{span:14}} required>
                {getFieldDecorator('name',{
                    initialValue: '',
                    rules:[{required:true,message:'送样工厂名称不能为空'}]
                })(
                    <Input placeholder='请输入送样工厂名称'></Input>
                )}
                </FormItem>
            </Form>
          </Modal>
        );
      }
    }
  );

class DeliveryFactoryAddModal extends React.Component{
  server;
  Authorization;
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
            url:`${this.server}/jc/common/deliveryFactory/add`,
            method:'post',
            headers:{
              'Authorization':this.Authorization
            },
            data:values,
            type:'json'
          })
          .then((data)=>{
              //console.log(data);
              message.info(data.data.message);
              this.props.fetch();//
          })
          .catch(()=>{
              message.info('新增失败，请联系管理员！');
          });
          console.log('Received values of form: ', values);//打印表单新增获得到的值
          form.resetFields();//重置一组输入控件的值（为 initialValue）与状态，如不传入参数，则重置所有组件
          this.setState({ visible: false });
        });
      }
    
      saveFormRef = (formRef) => {
        this.formRef = formRef;
      }
    
    render(){
          //这是个令牌，每次调接口将其放在header里面
         this.Authorization=localStorage.getItem('Authorization');
       //通过这个获取接口地址
         this.server=localStorage.getItem('remote');
        return(
          <span>
              <AddButton  handleAdd={this.showModal} />
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
export default Form.create()(DeliveryFactoryAddModal);//创建form实例