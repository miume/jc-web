import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history/history';

import ProcessInspection from '../components/qualityProcess/dataEntry/processInspection/processInspection';
import Role from '../components/userPermissions/roleManagement/roleManagement';
import RawTestReport from '../rawTestReport/rawTestReport';
class DataRoute extends Component {
  render() {
    return (
      // <Router history={history}>
        <Switch>
          <Route path="/processInspection" component={ProcessInspection}/>
          <Route path="/role" component={Role}/>
          <Route key='/rawTestReport' path='rawTestReport' component={RawTestReport}></Route>
          {/* 这是home页面,其下有很多子路由 */}
        </Switch>
      // </Router>
    );
  }
}

export default DataRoute;
