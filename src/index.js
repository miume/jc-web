import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './font-awesome/css/font-awesome.css';
import * as serviceWorker from './serviceWorker';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Auth from '../src/components/auth/Auth';
import Home from '../src/components/Home/home';
import Login from './components/Login/Login2';
ReactDOM.render(
    <BrowserRouter>
        <div>
            <Auth/>
            <Switch>
                <Route exact path="/" component={Login}/> {/* 路由下有子路又那么就不用path */}
                <Route component={Home}/> {/* 这是home页面,其下有很多子路由 */}
            </Switch>
        </div>
    </BrowserRouter>
    , document.getElementById('root'));
serviceWorker.unregister();
