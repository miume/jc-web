import React from 'react';
import {Form,Input,Modal,message} from 'antd';
import axios from 'axios';
import NewButton from '../../../BlockQuote/newButton';
import CancleButton from '../../../BlockQuote/cancleButton';
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
           width='360px'
            footer={[
              <NewButton key='ok' handleClick={onCreate} name='确定'  className='fa fa-check'/>,
              <CancleButton  key='cancel'  handleCancel={onCancel} />
            ]}
          >
            <Form horizontal='true' >
                <FormItem  wrapperCol={{span:24}} required>
                {getFieldDecorator('name',{
                    initialValue: '',

                })(
                    <Input placeholder='请输入产品工序名称' style={{height:'40px'}}></Input>
                )}
                </FormItem>
            </Form>
          </Modal>
        );
      }
    }
  );

class  ProductProcessAddModal extends React.Component{
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
          if(!values['name']){
            message.info('产品工序名称不能为空！');
            return
         }
          axios({
            url:`${this.props.url.productionProcess.productionProcess}`,
            method:'post',
            headers:{
              'Authorization':this.props.url.Authorization
            },
            data:values,
            type:'json'
          })
          .then((data)=>{
              message.info(data.data.message);
              this.props.fetch();//
          })
          .catch(()=>{
              message.info('新增失败，请联系管理员！');
          });
          form.resetFields();//重置一组输入控件的值（为 initialValue）与状态，如不传入参数，则重置所有组件
          this.setState({ visible: false });
        });
      }
      saveFormRef = (formRef) => {
        this.formRef = formRef;
      }

    render(){
        return(
          <span className={this.props.flag?'':'hide'}>
              <NewButton handleClick={this.showModal} name='新增'  className='fa fa-plus' />&nbsp;&nbsp;&nbsp;
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
export default Form.create()( ProductProcessAddModal);//创建form实例
