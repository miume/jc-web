import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Router, Route, Switch,BrowserRouter} from 'react-router-dom'
import MRoute from '../src/routes/router'
import Auth from '../src/components/auth/Auth'

import Home from '../src/components/Home/home'; 
import Login from '../src/components/Login/login';
// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
        // <MRoute/>
        <BrowserRouter>
        <div>
          <Auth/>
          {/* <Router history={history}> */}
            <Switch>
              <Route exact path="/" component={Login}/>
              {/* 路由下有子路又那么就不用path */}
              <Route component={Home}/>
              {/* 这是home页面,其下有很多子路由 */}
            </Switch>
          {/* </Router> */}
          </div>
        </BrowserRouter>
,document.getElementById('root'));

serviceWorker.unregister();
