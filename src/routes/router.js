import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../components/history/history';
 
import Home from '../components/Home/home'; 
import Login from '../components/Login/login';
 
class MRoute extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route component={Home}/>
          {/* 这是home页面,其下有很多子路由 */}
        </Switch>
      </Router>
    );
  }
}
 
export default MRoute;
