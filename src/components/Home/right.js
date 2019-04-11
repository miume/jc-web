import React from 'react';
import { Route, Switch } from 'react-router-dom';
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
// import  SamplePoint from '../Base/SamplePoint/samplePoint';//取样点
import TestItem from '../Base/testItem/testItem';
import OperationManagement from "../operationManagement/operationManagement";
import StockOut from '../stockOut/stockOut';

import EnterStorage  from '../enterStorage/enterStorage';
import InventorManage from '../inventoryManage/inventorManage';
import RedListManage from '../redListManage/redListManage';
import LibraryManage from '../libraryManage/library'

import RawStandard from '../rawStandard/rawStandard';
import ProductStandard from '../productStandard/productStandard';
import ProductInspection from '../productInspection/productInspection';
import UnqualifiedExamine from '../unqualifiedExamineTable/unqualifiedExamine';
import UnqualifiedTrack from '../unqualifiedTrackTable/unqualifiedTrack';

import Equipment from "../equipmentGuidance/equipmentGuidance"
import EquipmentRepair from "../equipmentRepair/equipmentRepair"
import EquipmentArchive from '../equipmentFile/equipmentFile';
class Right extends React.Component{
    render(){
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
        },{
            path:'/productInspection',
            component:ProductInspection
        },{
            path:'/unqualifiedExamineTable',
            component:UnqualifiedExamine
        },{
            path:'/unqualifiedTrackTable',
            component:UnqualifiedTrack
        },{
            path:'/productStandard',
            component:ProductStandard
        },{
            path:'/equipmentGuidance',
            component:Equipment
        },{
            path:'/equipmentRepair',
            component:EquipmentRepair
        },{
            path:'/equipmentArchive',
            component:EquipmentArchive
        }]
        return (
            <div className="rightDiv">
                <Switch>
                    {/**默认选中快速访问界面 */}
                    <Route exact path="/home" component={QuickAccess}/>
                    {
                        data.map(e => {
                            return (
                                <Route key={e.path} path={e.path} component={e.component}></Route>
                            ) 
                        })              
                    }   
                </Switch>
            </div>
        )
    }
}
export default Right;