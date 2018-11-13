import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Menu1List from './menu';
// import SonRoute from '../../routes/sonRoute';
import './home.css';
import Exit from './exit';
import Role from '../roleManagement/roleManagement';
import Menu from '../menuMangement/menu';
import ProcessInspection from '../processInspection/processInspection'
import User from '../userManage/userManage';
import Management from '../processManagement/processManagement'

import Api from '../Api/Api';
import Depart from '../departManagement/departManagement';
import InterProduct from '../intermediateProductTest/intermediateProduct';

class Home extends Component {
    render() {
        return (
            <div className="parent" >
                <div className="top">
                    <div className="top-left" >
                        <div className="top-left-image" >
                            <img src={require("../logo/logo.png")} width={30} height={30} alt=""  />
                        </div>
                        <div className="top-left-text" >
                            <span>金驰2+1</span>
                        </div>
                    </div>
                    <div className="top-right" >
                        <div className="fr" >
                            {/* <div><Icon type="login" theme="outlined" /></div> */}
                            <Exit></Exit>
                        </div>
                    </div>
                </div>
                <div className="left">
                    <div className="menu1" >
                       <Menu1List/>
                    </div>
                </div>
                <div className="rightDiv">
                <Switch>
                    <Route key='/api' path='/api' component={Api}></Route>
                    <Route key='/role' path='/role' component={Role}></Route>
                    <Route key='/menu' path='/menu' component={Menu}></Route>
                    <Route key='/user' path='/user' component={User}></Route>
                    <Route key='/departManagement' path='/departManagement' component={Depart}></Route>
                    {/* <Route key='/dataEntry' path='/user' component={DataEntry}></Route> */}
                    <Route key='/data' path='/processInspection' component={ProcessInspection}></Route>
                    <Route key='/management' path='/management' component={Management}></Route>
                    <Route key='/InterProduct' path='/InterProduct' component={InterProduct}></Route>
                </Switch>
                </div>
            </div>
        );
    }
} 
export default Home;