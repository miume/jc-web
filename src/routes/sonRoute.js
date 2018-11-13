import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Role from '../Home/roleManagement';
import Api from '../Home/Api'; 
 
class SonRoute extends Component {
  render() {
    return (
      <Switch>
          <Route path="/Api" component={Api}></Route>
          <Route path="/role" component={Role}></Route>
      </Switch>
    );
  }
}
 
export default SonRoute;