import React from 'react';
import { Input, Icon, Button, Checkbox,message } from 'antd';
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import 'antd/dist/antd.css';
import './Login2.css';
class Login extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  componentWillMount() {
    //http://192.168.1.105:8080 内网  下面是外网 2p277534k9.iok.la:58718 
    localStorage.setItem("remote1", "http://192.168.1.105:8080");     //模块二的局域网
    localStorage.setItem("remote", "http://192.168.1.105:8081");      //模块一的局域网
    localStorage.setItem("remote2", "http://2p277534k9.iok.la:58718");//模块二的外网
    localStorage.setItem("remote3", "http://218.77.105.241:40080");
    const quickAccess = [{
      menuName:'菜单管理',
      path:'/menu'
    },{
      menuName:'角色管理',
      path:'/role'
    },{
      menuName:'用户管理',
      path:'/user'
    },{
      menuName:'部门管理',
      path:'/departManagement'
    },{
      menuName:'数据录入',
      path:'/dataEntry'
    },{
      menuName:'流程管理',
      path:'/management'
    }]
    localStorage.setItem('quickAccess',JSON.stringify(quickAccess));
  }

  keyPress(e){
    if(e.keyCode == 13){
      alert('1111')
    }
  }
  handleSubmit(){
    const history = this.props.history;
    const server = localStorage.getItem("remote");  
    let username = document.getElementById('userName').value;
    let password = document.getElementById('password').value;
    axios.post(`${server}/jc/login`,{username:username,password:password}).then(res => {
      //console.log(res.data)
      //将token令牌存在localStorage中，后面调接口可直接通过localStorage.getItem('Authorization')
      localStorage.setItem('Authorization',res.headers.authorization);
      localStorage.setItem('menuList',JSON.stringify(res.data));
      document.getElementById('defaultCanvas0').style.visibility='hidden';
      history.push({pathname:'/home'});
    })
    .catch(function (error) {
      message.info('账号或密码有误，请重新输入！');
    });
  }
  render() {
    
    return (
      <div className={`full-height`} id="wrapper">  
        <div className='gutter-box' style={{minWidth: '290px'}}>
              <div className='login-box'>
                <img src={require(`../Login/logo-lg.svg`)} style={{width:'25.5%'}} alt=''></img>
                <div style={{height:'10%'}}></div>
                <div style={{padding: '0px 28px 0px 28px', height:'50%'} }>
                  <Input className='login-input' size='large' id='userName' prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />} placeholder="请输入用户名称"/>
                  <div style={{height:'10%'}}></div>
                  <Input className='login-input' id='password' type='password' size='large' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入密码登录" />
                  <div style={{height:'10%'}}></div>
                  <Checkbox style={{float:'left'}}>记住登录状态</Checkbox>
                  <div style={{height:'20%'}}></div>
                  <Button size='large' type="primary" style={{width:'100%', fontSize:'14px'}} onClick={this.handleSubmit}>
                    登录
                  </Button>
                </div>
              </div>
        </div>
        <div style={{left:'0px',position:'fixed',height:'80px',width:'100%',bottom:'0px',textAlign:'center', fontSize:'11px'}} className='copy-right' id="copy-right">
          <img src={require(`../Login/logo.png`)} style={{height:'38%'}} alt=''></img>
          <br/>
          <div style={{height:'10%'}}></div>
          <span>长沙矿冶研究院智能技术研究所提供技术支持</span>
        </div>
      </div>
    );
  }
  
}

export default withRouter(Login);
