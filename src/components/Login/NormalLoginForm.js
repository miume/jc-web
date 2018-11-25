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
    this.keyPress = this.keyPress.bind(this);
  }  
  componentWillMount() {
    //http://192.168.1.105:8080 内网  下面是外网 2p277534k9.iok.la:58718 
    localStorage.setItem("remote1", "http://192.168.1.105:8080");     //模块二的局域网
    localStorage.setItem("remote", "http://192.168.1.105:8081");      //模块一的局域网
    localStorage.setItem("remote2", "http://2p277534k9.iok.la:58718");//模块二的外网
    localStorage.setItem("remote3", "http://218.77.105.241:40080");
    localStorage.setItem('quickAccess','');
  }
  userChange(e){
    this.setState({ user : e.target.value })
    } 
  passwordChange(e){
    this.setState({ password : e.target.value })
    }
  /** */
  keyPress(e){
    if(e.keyCode == 13){
      alert('1111')
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        
      }
    });
    const history = this.props.history;
    const server = localStorage.getItem("remote3");  
    
    axios.post(`${server}/jc/login`,{username:this.state.user,password:this.state.password}).then(res => {
      //console.log(res.data)
      //将token令牌存在localStorage中，后面调接口可直接通过localStorage.getItem('Authorization')
      localStorage.setItem('Authorization',res.headers.authorization);
      localStorage.setItem('menuList',JSON.stringify(res.data))
      //console.log(localStorage.getItem('Authorization'))
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
      <Form onSubmit={this.handleSubmit} className="login-form" onKeyPress={this.keyPress}>
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
          <Button type="primary" htmlType="submit" className="login-form-button"  block  >
            登录
          </Button>
        </FormItem>
      </Form>
    );
  }
}
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default withRouter(WrappedNormalLoginForm);