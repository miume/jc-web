import React from 'react';
import {withRouter} from "react-router-dom";
import axios from 'axios';
// import reqwest from 'reqwest';
import { Form, Icon, Input, Button, Checkbox,Row, Col,message } from 'antd/lib';
import './NormalLoginForm';
import store from '../redux/index'
// var express = require('express')

const FormItem = Form.Item;
class NormalLoginForm extends React.Component {
  constructor(props) { //构造函数
    super(props);
    this.state = {
    user:'',
    password:'',
    }
    this.userChange = this.userChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }  
  userChange(e){
    this.setState({ user : e.target.value })
    } 
  passwordChange(e){
    this.setState({ password : e.target.value })
    }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    const history = this.props.history;
  //   reqwest({
  //     method:'post',
  //     url:'http://218.77.105.241:40080/jc/login',
  //     type:'json',
  //     contentType:'application/json',
  //     data:JSON.stringify({username:this.state.user,password:this.state.user})
  //     ,crossOrigin: true
  //    ,success : function (resp) {
  //     console.log(resp);
  //     // console.log(resp.getResponseHeader('authorization'))
  //     history.push({pathname:'/home'});
  //     console.log("success")
  //   }
  //   ,error : function (err) {
  //     message.info('账号或密码有误，请重新输入！');
  //   }
  //  })
  let api="http://218.77.105.241:40080/jc/login";
    
    axios.post(api,{username:this.state.user,password:this.state.password}).then(res => {
      console.log(res)
      
      //将token令牌存在localStorage中，后面调接口可直接通过localStorage.getItem('Authorization')
      localStorage.setItem('Authorization',res.headers.authorization);
      // console.log(localStorage.getItem('Authorization'))
      history.push({pathname:'/home'});
      const action = {
        type: 'AUTH_SUCCESS',
        loginInfo: res
      }
      store.dispatch(action)
    })
    .catch(function (error) {
      message.info('账号或密码有误，请重新输入！');
    });
}
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" >
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名!" onChange={this.userChange} />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码!" onChange={this.passwordChange} />
          )}
        </FormItem>
        <FormItem>
          <Row>
            <Col span={8}>
              {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住密码</Checkbox>
            )}
            </Col>
            <Col span={7} offset={9}>
            <abbr className="login-form-forgot" title="请联系管理员重置密码">忘记密码？</abbr>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit" className="login-form-button" block>
            登录
          </Button>
        </FormItem>
      </Form>
    );
  }
}
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default withRouter(WrappedNormalLoginForm);