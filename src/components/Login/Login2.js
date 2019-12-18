import React from 'react';
import {message, Spin, Tabs} from 'antd';
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import 'antd/dist/antd.css';
import './Login2.css';
import LoginItem from "./loginItem";
import MoreInfo from './moreInfo'
import CommonProblem from "./commonProblem";
class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading : false,
      infoFlag:false,
      infoCode:1
    };
    this.loginIn = this.loginIn.bind(this);
    this.dataProcessing = this.dataProcessing.bind(this);
    this.handleInfo=this.handleInfo.bind(this);
    this.infoShow=this.infoShow.bind(this)
  }
  componentWillMount() {
    localStorage.setItem("server", "http://47.107.237.60:3389");//外网
    //localStorage.setItem("server", "http://119.39.4.6:18080");//jcweb
    //localStorage.setItem("server", "http://192.168.190.161:8080");//Jcweb1
  }

  loginIn(username,password) {
      let history = this.props.history, server = localStorage.getItem('server');
      this.setState({
        loading : true
      });
      axios.post(`${server}/jc/auth/login`,{username:username,password:password})
          .then(res => {
              /**如果登陆成功  则屏蔽enter键 */
              if(res.data){
                window.onkeydown = undefined;
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
              });
              if(error.toString().indexOf("Network Error")>0){
                message.info("服务器未响应!");
              }else{
                message.info('账号或密码有误，请重新输入！');
              }
          });
    }

  /**登陆成功后对返回的数据进行处理 */
  dataProcessing(data){
      let i = 1, quickAccess = [],menus=[];
      data.menuList.forEach(e=>{
        e.menuList.forEach(e1=>{
          menus.push(e1)
          if(i <= 6){
            quickAccess.push({
              openKeys:e.menuId,
              menuParent:e.menuName,
              menuName:e1.menuName,
              path:e1.path
            });
            i++;
          }
        })
      });
    localStorage.setItem('menus',JSON.stringify(menus));
    localStorage.setItem('quickAccess',JSON.stringify(quickAccess));
  }
  handleInfo(infoFlag,infoCode){
    this.setState({
        infoFlag:infoFlag,
        infoCode:infoCode
    })
 }
 /**显示更多信息中的哪个界面*/
 infoShow(){
    let {infoFlag,infoCode}=this.state
    if(infoFlag && infoCode===1){//展示更多信息主界面
        return <MoreInfo infoFlag={infoFlag} handleInfo={this.handleInfo}/>
    }
    else if(infoFlag && infoCode===2){//展示常见问题界面
        return <CommonProblem infoFlag={infoFlag} handleInfo={this.handleInfo}/>
    }
 }
  render() {
    let {loading,infoFlag} = this.state;
    return (
      <div className={`full-height`} id="wrapper" onKeyDown={this.keyPress}>
      <Spin spinning={loading} >
        <div className='gutter-box'>
              {/*<MoreInfo infoFlag={infoFlag}/>*/}
              {this.infoShow()}
              <div className='login-box'>
                <img src={require(`./logo-lg.svg`)} style={{width:'25.5%'}} alt=''></img>
                <div className='login-blockquote'></div>
                <div className={'login-box-content'}>
                  <Tabs>
                    <Tabs.TabPane tab='火法' key='1'></Tabs.TabPane>
                    <Tabs.TabPane tab='湿法' key='2'></Tabs.TabPane>
                  </Tabs>
                  <LoginItem loginIn={this.loginIn} handleInfo={this.handleInfo}/>
                </div>
              </div>
        </div>
        </Spin>
        <div className='copy-right login-footer' id="copy-right">
          <img src={require(`./logo.png`)} style={{height:'38%'}} alt=''></img>
          <br/>
          <div style={{height:'10%'}}></div>
          <span>长沙矿冶研究院智能技术研究所提供技术支持</span>
        </div>
      </div>
    );
  }

}

export default withRouter(Login);
