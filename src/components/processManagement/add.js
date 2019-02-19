import React from 'react';
import { Button, Modal, Form, Input,message,Icon,Col } from 'antd';
import axios from 'axios';
import WhiteSpace from '../BlockQuote/whiteSpace';
import AddButton from '../BlockQuote/newButton';
import CancleButton from "../BlockQuote/cancleButton";
import SaveButton from "../BlockQuote/saveButton";

let id = 0;

class DynamicFieldSet extends React.Component{
    url
    ob
    state = {
      visible: false,
    };
    remove = (k) =>{
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        if(keys.length === 1){
            return;
        }

        form.setFieldsValue({
            keys:keys.filter(key => key!==k),
        })
    }

    add = () =>{
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(++id);
        form.setFieldsValue({
            keys: nextKeys,
          });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    }

    showModal = () => {
      this.setState({ visible: true });
    };

    handleCancel = () => {
      // const form = this.formRef.props.form;
      this.setState({ visible: false });
      // form.resetFields();
    };

      render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        this.ob = JSON.parse(localStorage.getItem('menuList'))
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 4 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 20 },
            },
          };
          const formItemLayoutWithOutLabel = {
            wrapperCol: {
              xs: { span: 24, offset: 0 },
              sm: { span: 20, offset: 4 },
            },
          };
          getFieldDecorator('keys', { initialValue: [0] });
          const keys = getFieldValue('keys');
          const formItems = keys.map((k, index) => (
            <div key={index}>
            <Form.Item
              // wrapperCol={{ span: 15 }}
            >
              {getFieldDecorator(`names[${k}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{
                  required: true,
                  message: "请选择负责人",
                }],
              })(
                <Input placeholder="请选择负责人" style={{ width: '60%'}} />
              )}
            </Form.Item>
            <Form.Item
                // wrapperCol={{ span: 15 }}
                >
              {getFieldDecorator(`description[${k}]`,{
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{
                  required: true,
                  message: "请输入职责",
                }],
              })(
                <Input placeholder="请输入职责" style={{ width: '60%', marginRight: 4 }} />
              )}
              {keys.length > 1 ? (
                <Icon
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  disabled={keys.length === 1}
                  onClick={() => this.remove(k)}
                />
              ) : null}
            </Form.Item>
            </div>
          ));
          return (
            <span>
            <AddButton handleClick={this.showModal}  name='新增' className='fa fa-plus' />
            <Modal
              visible={this.state.visible}
              closable={false}
              centered={true}
              maskClosable={false}
              width="360px"
              title="新增"
              // className='modal-md'
              footer={[
                <CancleButton key='back' handleCancel={this.handleCancel}/>,
                <SaveButton key="define" handleSave={this.handleSubmit} className='fa fa-check' />,
                <AddButton key="submit" handleClick={this.handleSubmit} name='提交' className='fa fa-check' />
              ]}
            >
              <Form horizontal='true'>
                  {formItems}
                  <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                      <Icon type="plus" /> 添加一行
                    </Button>
                  </Form.Item>
              </Form>
            </Modal>
            </span>
          );
      }
}

const WrappedDynamicFieldSet = Form.create({ name: 'dynamic_form_item' })(DynamicFieldSet);

export default WrappedDynamicFieldSet