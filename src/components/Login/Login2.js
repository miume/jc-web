import React from 'react';
import { Input, Icon, Button, Checkbox,message,Spin } from 'antd';
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import 'antd/dist/antd.css';
import './Login2.css';
class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading : false
    }
    this.getDefault = this.getDefault.bind(this);
    this.beforeLogin = this.beforeLogin.bind(this);
    this.remindLogin = this.remindLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dataProcessing = this.dataProcessing.bind(this);
  }
  componentWillMount() {
    //http://192.168.1.105:8080 内网  下面是外网 2p277534k9.iok.la:58718 
    // localStorage.setItem("remote1", "http://192.168.1.105:8080");     //模块二的局域网
    // localStorage.setItem("remote2", "http://192.168.1.105:8081");      //模块一的局域网
    localStorage.setItem("server", "http://47.107.237.60:3389");//模块二的外网
    //   localStorage.setItem("server", "http://119.39.4.6:18080");//模块二的外网
      // localStorage.setItem("remote3", "http://218.77.105.241:40080");
    // localStorage.setItem("remote", "http://127.0.0.1:8085");
  }
  /**实行记住密码 */
  remindLogin(e){
    let username = document.getElementById('userName').value;
    let password = document.getElementById('password').value;
    /**点击记住密码 将登陆名和密码存入localStorage中   取消记住密码，则从localStorage中删除 */
    if(e.target.checked){
        if(username === '' && password === ''){
            message.info('请先填写用户名和密码！')
        }else{
             document.cookie = `${username}-${password}`;
        }
    }else{
      document.cookie = '';
    }
  }
  /**登陆接口调用 */
  handleSubmit(){
    const history = this.props.history;
    const server = localStorage.getItem("server");  
    let username = document.getElementById('userName').value;
    let password = document.getElementById('password').value;
    if(!this.beforeLogin(username,password)){
      return 
    }
    this.setState({
      loading : true
    })
    axios.post(`${server}/jc/auth/login`,{username:username,password:password})
      .then(res => {
      //console.log(res.data)
      /**如果登陆成功  则屏蔽enter键 */
      if(res.data){
          window.onkeydown = undefined
          if(res.data && res.data.menuList)
              this.dataProcessing(res.data)
      }
      //将token令牌存在localStorage中，后面调接口可直接通过localStorage.getItem('Authorization')
      localStorage.setItem('authorization',res.headers.authorization);
      localStorage.setItem('menuList',JSON.stringify(res.data));
      history.push({pathname:'/home'});
    })
    .catch( (error) => {
      this.setState({
        loading : false
      })
      if(error.toString().indexOf("Network Error")>0){
        message.info("服务器未响应!");
      }else{
        message.info('账号或密码有误，请重新输入！');
      }
    });
  }
  /**登陆前先对数据进行验证 */
  beforeLogin(username,password){
    if(username === '' || password === '' ){
      this.setState({
        loading : false
      })
      message.info('请先填写账号和密码！');
      return false
    }
    return true
  }
  /**登陆成功后对返回的数据进行处理 */
  dataProcessing(data){
    var i = 1;
    var quickAccess = [],menus=[];
    data.menuList.forEach(e=>{
      e.menuList.forEach(e1=>{
        menus.push(e1)
        if(i <= 6){
          quickAccess.push({
            openKeys:e.menuId,
            menuParent:e.menuName,
            menuName:e1.menuName,
            path:e1.path
          }) 
          i++; 
        }
      })
    })
  localStorage.setItem('menus',JSON.stringify(menus));
  localStorage.setItem('quickAccess',JSON.stringify(quickAccess));
  }
  /**实现记录密码和用户名 */
  getDefault(flag){
    var text = document.cookie.split('-');
    if(text.length>1&&text[flag]){
      return text[flag];
    }else{
      return '';
    }
  }
  componentDidMount() {
    /**实现enter键登陆 */
    const f = (e) => {
      if(e.keyCode===13){this.handleSubmit();}
    }
    window.onkeydown = f
  }
  render() {
    // this.keyPress();
    return (
      <div className={`full-height`} id="wrapper" onKeyDown={this.keyPress}>  
      <Spin spinning={this.state.loading}>
        <div className='gutter-box' style={{minWidth: '290px'}}>
              <div className='login-box'>
                <img src={require(`../Login/logo-lg.svg`)} style={{width:'25.5%'}} alt=''></img>
                <div style={{height:'10%'}}></div>
                <div style={{padding: '0px 28px 0px 28px', height:'50%'}}>
                  <Input className='login-input' size='large' id='userName' prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />} placeholder="请输入用户名称" defaultValue={this.getDefault(0)}/>
                  <div style={{height:'10%'}}></div>
                  <Input className='login-input' id='password' type='password' size='large' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入密码登录"  defaultValue={this.getDefault(1)} />
                  <div style={{height:'10%'}}></div>
                  <Checkbox style={{float:'left'}} onChange={this.remindLogin} defaultChecked={document.cookie?true:false}>记住登录状态</Checkbox>
                  <div style={{height:'20%'}}></div>
                  <Button size='large' type="primary" style={{width:'100%', fontSize:'14px'}} onClick={this.handleSubmit}>
                    登录
                  </Button>
                </div>
              </div>
        </div>
        </Spin>
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
