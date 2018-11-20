import React, { Component } from 'react';
import WrappedNormalLoginForm from './NormalLoginForm'
import './login.css';
import background from '../logo/login.jpg';

// var http = require('http');
// http.get('http://218.77.105.241:40080/fk/sectionUseElec/getAll',function(req,res){
// 	var html='';
// 	req.on('data',function(data){
// 		html+=data;
// 	});
// 	req.on('end',function(){
// 		console.info(html);
// 	});
// });
class Login extends Component {
    render() {
      return (
        <div className="Login-div">
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