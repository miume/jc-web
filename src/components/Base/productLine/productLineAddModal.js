import React from 'react';
import {Form,Input,Button,Modal,message} from 'antd';
import axios from 'axios';
import NewButton from '../../BlockQuote/newButton';
import CancleButton from '../../BlockQuote/cancleButton';

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
            closable={false} maskClosable={false} centered={true}
            width='400px'
            footer={[
              <NewButton  handleClick={this.props.onCreate} name='确定'  className='fa fa-check'/>,
              <CancleButton        handleCancel={this.props.onCancel} />
            ]}
          >
            <Form horizontal='true' >
                <FormItem wrapperCol={{span:20}} required>
                {getFieldDecorator('name',{
                    initialValue: '',
                    rules:[{required:true,message:'产品线名称不能为空'}]
                })(
                    <Input placeholder='请输入产品线名称' style={{height:'40px'}}></Input>
                )}
                </FormItem>
            </Form>
          </Modal>
        );
      }
    }
  );

class ProductLineAddModal extends React.Component{
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
            url:`${this.server}/jc/common/productLine`,
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
         // console.log('Received values of form: ', values);//打印表单新增获得到的值
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
              <NewButton handleClick={this.showModal} name='新增' style='button' className='fa fa-plus' />&nbsp;&nbsp;&nbsp;
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