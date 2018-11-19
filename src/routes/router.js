import React, { Component } from 'react';
import { Router, Route, Switch,BrowserRouter } from 'react-router-dom';
import history from '../components/history/history';
 
import Home from '../components/Home/home'; 
import Login from '../components/Login/login';
// import store from '../components/redux/index';
// import { Provider } from 'react-redux';
 
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
