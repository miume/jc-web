import React from 'react';
import {Route, Switch} from 'react-router-dom';
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
import EquipmentStatus from "../equipmentStatus/equipmentStatus";
import BaseData from "../equipmentBasicData/baseData";
import DepartmentStruct from '../departmentStruct/departmentStruct';
import RawTestReport from '../rawTestReport/rawTestReport';
import PurchaseCheckReport from '../purchaseCheckReport/purchaseCheckReport';
import TodoList from '../todolist/todolist';

import BaseInfo from '../Base/baseInfo';
import DeliveryFactory from '../Base/devileryFactory/devileryFactory';//送样工厂
import ProductLine from '../Base/productLine/productLine';//产品线
import ProductProcess from '../Base/ProductProcess/productProcess';//产品工序
import StatisticAnalysis from '../statisticAnalysis/statisticAnalysis'
import CheckStatistics from '../checkStatistics/checkStatistics'
// import  SamplePoint from '../Base/SamplePoint/samplePoint';//取样点
import TestItem from '../Base/testItem/testItem';
import OperationManagement from "../operationManagement/operationManagement";
import StockOut from '../stockOut/stockOut';
import EquipmentCheck from "../equipmentCheck/equipmentCheck";
import CheckPlan from "../checkPlan/checkPlan";
import CheckQuery from "../checkQuery/checkQuery";
import CheckTemplate from "../checkTemplate/checkTemplate";

import EnterStorage from '../enterStorage/enterStorage';
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
import EquipmentArchive from '../equipmentArchive/equipmentArchive';
import EquipmentMaintenance from '../equipmentMaintenance/equipmentMaintenance'
import EqMaintenanceDataEntry from '../eqMaintenanceDataEntry/eqMaintenanceDataEntry'
import EqMaintenancePlan from '../eqMaintenancePlan/eqMaintenancePlan'
import EqMaintenanceQuery from '../eqMaintenanceQuery/eqMaintenanceQuery'
import EqupimentAssignment from '../equpimentAssignment/equpimentAssignment'

import EquipmentArchiveManager from '../equipmentArchiveManager/equipmentArchiveManager'
import EqcomponentSearch from '../eqcomponentSearch/eqcomponentSearch'
import EquipmentInspection from '../equipmentInspection/equipmentInspection'
import InspectionTemplate from '../inspectionTemplate/inspectionTemplate'
import InspectionPlan from '../inspectionPlan/inspectionPlan'
import InspectionQuery from '../inspectionQuery/inspectionQuery'
import LocationBasic from "../locationBasic/locationBasic";

import BatchInfo from "../batchInfo/batchInfo"
import BatchSearch from "../batchSearch/batchSearch"
import BatchRule from  "../batchRule/batchRule"

class Right extends React.Component {
    render() {
        const data = [{
            path: '/role',
            component: Role
        }, {
            path: '/menu',
            component: Menu
        }, {
            path: '/user',
            component: User
        }, {
            path: '/OperationManagement',
            component: OperationManagement
        }, {
            path: '/departManagement',
            component: Depart
        }, {
            path: '/dataEntry',
            component: DataEntry
        }, {
            path: '/processInspection',
            component: ProcessInspection
        }, {
            path: '/rawTestReport',
            component: RawTestReport
        }, {
            path: '/management',
            component: Management
        }, {
            path: '/InterProduct',
            component: InterProduct
        }, {
            path: '/PurchaseCheckReport',
            component: PurchaseCheckReport
        }, {
            path: '/baseInfo',
            component: BaseInfo
        }, {
            path: '/deliveryFactory',
            component: DeliveryFactory
        }, {
            path: '/productProcess',
            component: ProductProcess
        }, {
            path: '/testItem',
            component: TestItem
        },
            {
                path: '/productLine',
                component: ProductLine
            }, {
                path: '/sampleInspection',
                component: SampleInspection
            }, {
                path: '/stockOut',
                component: StockOut
            }, {
                path: '/enterStorage',
                component: EnterStorage
            }, {
                path: '/inventorManage',
                component: InventorManage
            }, {
                path: '/redListManage',
                component: RedListManage
            }, {
                path: '/libraryManage',
                component: LibraryManage
            }, {
                path: '/todoList',
                component: TodoList
            }, {
                path: '/rawStandard',
                component: RawStandard
            }, {
                path: '/productInspection',
                component: ProductInspection
            }, {
                path: '/unqualifiedExamineTable',
                component: UnqualifiedExamine
            }, {
                path: '/unqualifiedTrackTable',
                component: UnqualifiedTrack
            }, {
                path: '/productStandard',
                component: ProductStandard
            }, {
                path: '/equipmentGuidance',
                component: Equipment
            }, {
                path: '/equipmentRepair',
                component: EquipmentRepair
            }, {
                path: '/equipmentArchive',
                component: EquipmentArchive
            }, {
                path: '/equipmentBasicData',
                component: BaseData
            }, {
                path: '/departmentStruct',
                component: DepartmentStruct
            }, {
                path: "/equipmentStatus",
                component: EquipmentStatus
            }, {
                path: "/equipmentMaintenance",
                component: EquipmentMaintenance
            }, {
                path: "/maintenanceDataEntry",
                component: EqMaintenanceDataEntry
            }, {
                path: "/maintenancePlan",
                component: EqMaintenancePlan
            }, {
                path: "/maintenanceQuery",
                component: EqMaintenanceQuery
            },{
                path:"/equipmentCheck",
                component:EquipmentCheck
            },{
                path:"/checkPlan",
                component:CheckPlan
            },{
                path:"/checkQuery",
                component:CheckQuery
            },{
                path:"/checkTemplate",
                component:CheckTemplate
            },{
                path:"/equipmentArchiveManager",
                component:EquipmentArchiveManager
            },{
                path:"/eqcomponentSearch",
                component:EqcomponentSearch
            },{
                path:"/equipmentInspection",
                component:EquipmentInspection
            },{
                path:"/inspectionTemplate",
                component:InspectionTemplate
            },{
                path:"/inspectionPlan",
                component:InspectionPlan
            },{
                path:"/inspectionQuery",
                component:InspectionQuery
            },{
                path:"/locationBasic",
                component:LocationBasic
            },{
                path:"/batchRule",
                component:BatchRule
            },{
                path:"/batchInfo",
                component:BatchInfo
            },{
                path:"/batchSearch",
                component:BatchSearch
            },{
                path:"/equpimentAssignment",
                component:EqupimentAssignment
            },{
                path:"/statisticAnalysis",
                 component:StatisticAnalysis
            },{
                path:"/checkStatistics",
                 component:CheckStatistics
            }
            ]
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