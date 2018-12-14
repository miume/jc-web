import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Menu1List from './menu';
import './home.css';
import Exit from './exit';
import QuickAccess from '../quickAccess/quickAccess';

import Role from '../roleManagement/roleManagement';
import Menu from '../menuMangement/menu';
import User from '../userManage/userManage';
import Management from '../processManagement/processManagement'

import ProcessInspection from '../processInspection/processInspection'
import SampleInspection from '../sampleInspection/sampleInspection'
import Depart from '../departManagement/departManagement';
import InterProduct from '../intermediateProductTest/intermediateProduct';
import DataEntry from '../dataEntry/dataEntry';
import RawTestReport from '../rawTestReport/rawTestReport';
import PurchaseCheckReport from '../purchaseCheckReport/purchaseCheckReport';
import TodoList from '../todolist/todolist';

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
import RedListManage from '../redListManage/redListManage';
import LibraryManage from '../libraryManage/library'

import RawStandard from '../rawStandard/rawStandard';

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
        },{
            path:'/redListManage',
            component:RedListManage
        },{
            path:'/libraryManage',
            component:LibraryManage
        },{
            path:'/todoList',
            component:TodoList
        },{
            path:'/rawStandard',
            component:RawStandard
        }]  
        return data;
    }
    constructor(props) {
        super(props);
        this.getComponentArray = this.getComponentArray.bind(this);
    }

    componentWillMount() {
        var canvas;
        var showCanvas = setInterval(function() {
            canvas = document.getElementById('defaultCanvas0');
            if(canvas !== null && canvas !== undefined) {
                canvas.style.visibility='hidden';
                clearInterval(showCanvas);
            }    
        },100)
        const server = localStorage.getItem('remote');
        const url = {
            role:{
                add:`${server}/jc/auth/role/add`,
                deleteById:`${server}/jc/auth/role`,
                update:`${server}/jc/auth/role/update`,
                getAll:`${server}/jc/auth/role/getAll`,
                getAuths:`${server}/jc/auth/role/getAuths`,
                deleteByIds:`${server}/jc/auth/role/deleteByIds`,
                getUsersOfRole:`${server}/jc/auth/role/getUsersOfRole`,
                getRolesByPage:`${server}/jc/auth/role/getRolesByPage`,
                addOneOperation:`${server}/jc/auth/role/addOneOperation`,
                search:`${server}/jc/auth/role/getRolesByNameLikeByPage`,
                assignRoleToUser:`${server}/jc/auth/role/assignRoleToUser`,
                deleteOneOperation:`${server}/jc/auth/role/deleteOneOperation`,
            },
            menu:{
                getAll:`${server}/jc/auth/menu/getAllRecursive`
            },
            operation:{
                getAll:`${server}/jc/auth/operation/getAll`
            },
            stockOut:{
                getAll:`${server}/jc/common/RepoStock`,
                repoOut:`${server}/jc/common/repoOutApply`,
                RepoStock:`${server}/jc/common/RepoStock/pages`,
                repoOutApply:`${server}/jc/common/repoOutApply/pages`,
            }

        }
        localStorage.setItem('url',JSON.stringify(url))
    }
    /**控制登陆背景图 */
    componentDidMount() {
        var showFrame = setInterval(function() {
            var frame = window.frame;
            if(frame !== undefined && frame !== null) {
                frame(0);   //消除帧
                clearInterval(showFrame);
            }
        },500)
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