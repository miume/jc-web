import React, { Component } from 'react';
import WrappedNormalLoginForm from './NormalLoginForm'
import './login.css';
import background from '../logo/login.jpg';
import Auth from '../auth/Auth'
class Login extends Component {
    render() {
      return (
        <div className="Login-div">
          <Auth/>
          <img className="Login-background" src={background} alt="login" />
          <div className="Login" >
            <h2 className="center">用户登录</h2>
            <div className="Login-form">
               <WrappedNormalLoginForm/>
            </div>
          </div>
        </div>
        

      );
    }
  }
  export default Login;