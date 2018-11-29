import React, { Component } from 'react';
import { Route, Switch,BrowserRouter } from 'react-router-dom';
import Menu1List from './menu';
// import SonRoute from '../../routes/sonRoute';
import './home.css';
import Exit from './exit';
import QuickAccess from '../quickAccess/quickAccess';
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
import DeliveryFactory from '../Base/devileryFactory/devileryFactory';//送样工厂
import  ProductLine from '../Base/productLine/productLine';//产品线
import  ProductProcess from '../Base/ProductProcess/productProcess';//产品工序
//import  SamplePoint from '../Base/SamplePoint/samplePoint';//取样点
import TestItem from '../Base/testItem/testItem';
import OperationManagement from "../operationManagement/operationManagement";
import StockOut from '../stockOut/stockOut';

import EnterStorage  from '../enterStorage/enterStorage';
import InventorManage from '../inventoryManage/inventorManage';
//检测项目
class Home extends Component {
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
        },
        {
            path:'/productLine',
            component:ProductLine
        },{
            path:'/sampleInspection',
            component:SampleInspection
        },{
            path:'/stockOut',
            component:StockOut
        },{
            path:'/enterStorage',
            component:EnterStorage
        },{
            path:'/inventorManage',
            component:InventorManage
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
                        {/**默认选中快速访问界面 */}
                        <Route exact path="/home" component={QuickAccess}/>
                    {
                        
                        path2Component.map(e => {
                            return (
                                <Route key={e.path} path={e.path} component={e.component}></Route>
                            ) 
                        })              
                    }   
                    </Switch>
                    </div>
                </div>
        );
    }
} 
export default Home;