import React from 'react';
import { Button, Modal, Form, Input,message,Icon } from 'antd';
import axios from 'axios';
import Tr from './tr';
import WhiteSpace from '../BlockQuote/whiteSpace';
import AddButton from '../BlockQuote/newButton';
import CancleButton from "../BlockQuote/cancleButton";
import SaveButton from "../BlockQuote/saveButton";

let id = 0;

class DynamicFieldSet extends React.Component{
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

      render(){
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
          getFieldDecorator('keys', { initialValue: [] });
          const keys = getFieldValue('keys');
          const formItems = keys.map((k, index) => (
            <Form.Item
              {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
              label={index === 0 ? 'Passengers' : ''}
              required={false}
              key={k}
            >
              {getFieldDecorator(`names[${k}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{
                  required: true,
                  whitespace: true,
                  message: "Please input passenger's name or delete this field.",
                }],
              })(
                <Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />
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
          ));
          return (
            <Form onSubmit={this.handleSubmit}>
              {formItems}
              <Form.Item {...formItemLayoutWithOutLabel}>
                <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                  <Icon type="plus" /> Add field
                </Button>
              </Form.Item>
              <Form.Item {...formItemLayoutWithOutLabel}>
                <Button type="primary" htmlType="submit">Submit</Button>
              </Form.Item>
            </Form>
          );
      }
}

const WrappedDynamicFieldSet = Form.create({ name: 'dynamic_form_item' })(DynamicFieldSet);

export default WrappedDynamicFieldSet