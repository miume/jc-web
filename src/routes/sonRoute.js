import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../components/history/history';
 
import ProcessInspection from '../components/processInspection/processInspection';
import Role from '../components/roleManagement/roleManagement';
 
class DataRoute extends Component {
  render() {
    return (
      // <Router history={history}>
        <Switch>
          <Route path="/processInspection" component={ProcessInspection}/>
          <Route path="/role" component={Role}/>
          {/* 这是home页面,其下有很多子路由 */}
        </Switch>
      // </Router>
    );
  }
}
 
export default DataRoute;