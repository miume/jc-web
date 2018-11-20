import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Menu1List from './menu';
// import SonRoute from '../../routes/sonRoute';
import './home.css';
import Exit from './exit';
import Role from '../roleManagement/roleManagement';
import Menu from '../menuMangement/menu';
import ProcessInspection from '../processInspection/processInspection'
import SampleInspection from '../sampleInspection/sampleInspection'
import User from '../userManage/userManage';
import Management from '../processManagement/processManagement'

import Depart from '../departManagement/departManagement';
import InterProduct from '../intermediateProductTest/intermediateProduct';
import DataEntry from '../dataEntry/dataEntry';
import RawTestReport from '../rawTestReport/rawTestReport';
import PurchaseCheckReport from '../purchaseCheckReport/purchaseCheckReport';


import BaseInfo from '../Base/baseInfo';
import DeliveryFactory from '../Base/devileryFactory';//送样工厂
import  ProductLine from '../Base/productLine';//产品线
import  ProductProcess from '../Base/productProcess';//产品工序
import  SamplePoint from '../Base/samplePoint';//取样点
import TestItem from '../Base/testItem';
import OperationManagement from "../operationManagement/operationManagement";

//检测项目
class Home extends Component {
    something;
    /**将二级菜单的path和component添加到data数组*/
    getComponentArray() {
        const data = [{
            path:'/role',
            component:Role
        },{
            path:'/menu',
            component:Menu
        },{
            path:'/user',
            component:User
        },{
            path:'/OperationManagement',
            component:OperationManagement
        },{
            path:'/departManagement',
            component:Depart
        },{
            path:'/dataEntry',
            component:DataEntry
        },{
            path:'/processInspection',
            component:ProcessInspection
        },{
            path:'/rawTestReport',
            component:RawTestReport
        },{
            path:'/management',
            component:Management
        },{
            path:'/InterProduct',
            component:InterProduct
        },{
            path:'/PurchaseCheckReport',
            component:PurchaseCheckReport
        },{
            path:'/baseInfo',
            component:BaseInfo
        },{
            path:'/deliveryFactory',
            component:DeliveryFactory
        },{
            path:'/productProcess',
            component:ProductProcess
        },{
            path:'/testItem',
            component:TestItem
        },{
            path:'/samplePoint',
            component:SamplePoint
        },{
            path:'/productLine',
            component:ProductLine
        }]  
        return data;
    }
    constructor(props) {
        super(props);
        this.getComponentArray = this.getComponentArray.bind(this);
    }
    
    render() {
        const path2Component = this.getComponentArray();    
        return (
            <div className="parent" >
                <div className="top">
                    <div className="top-left" >
                        <div className="top-left-image" >
                            <img src={require("../logo/logo.png")} width={30} height={30} alt=""  />
                        </div>
                        <div className="top-left-text" >
                            <span>金驰2+1信息管理系统</span>
                        </div>
                    </div>
                    <div >
                        <div className="fr" >
                            {/* <div><Icon type="login" theme="outlined" /></div> */}
                            <Exit name='退出'></Exit>
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
                {
                    path2Component.map(e => {
                        return (
                            <Route key={e.path} path={e.path} component={e.component}></Route>
                        ) 
                    })
                 
                }
                    {/* <Route key='/OperationManagement' path='/OperationManagement' component={OperationManagement}></Route>
                    <Route key='/role' path='/role' component={Role}></Route>
                    <Route key='/menu' path='/menu' component={Menu}></Route>
                    <Route key='/user' path='/user' component={User}></Route>
                    <Route key='/departManagement' path='/departManagement' component={Depart}></Route>
                    <Route key='/dataEntry' path='/dataEntry' component={DataEntry}></Route>
                    <Route key='/data' path='/processInspection' component={ProcessInspection}></Route>
                    <Route key='/rawTestReport' path='/rawTestReport' component={RawTestReport}></Route>
                    <Route key='/management' path='/management' component={Management}></Route>
                    <Route key='/InterProduct' path='/InterProduct' component={InterProduct}></Route>
                    <Route key='/PurchaseCheckReport' path='/PurchaseCheckReport' component={PurchaseCheckReport}></Route>
                    {/* 基本信息以及其对应的5个表 */}
                    {/* <Route key='/baseInfo' path='/baseInfo' component={BaseInfo} ></Route>
                    <Route key='/deliveryFactory' path='/deliveryFactory' component={DeliveryFactory} ></Route>
                    <Route key='/productProcess' path='/productProcess' component={ProductProcess}></Route>
                    <Route key='/testItem' path='/testItem' component={TestItem}></Route>
                    <Route key='/samplePoint' path='/samplePoint' component={SamplePoint}></Route>
                    <Route key='/productLine' path='/productLine' component={ProductLine}></Route>  */}
                    {/* <Route key='/sampleInspection' path='/sampleInspection' component={SampleInspection}></Route> */}
                    
                    
                   
                </Switch>
                </div>
            </div>
        );
    }
} 
export default Home;