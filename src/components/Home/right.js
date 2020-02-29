import React from 'react';
import {Route, Switch} from 'react-router-dom';
import QuickAccess from '../quickAccess/quickAccess';

import Role from '../userPermissions/roleManagement/roleManagement';
import Menu from '../userPermissions/menuMangement/menu';
import User from '../userPermissions/userManage/userManage';
import Management from '../qualityProcess/processManagement/processManagement'

import ProcessInspection from '../qualityProcess/dataEntry/processInspection/processInspection'
import SampleInspection from '../qualityProcess/dataEntry/sampleInspection/sampleInspection'
import Depart from '../userPermissions/departManagement/departManagement';
import InterProduct from '../qualityProcess/dataEntry/intermediateProductTest/intermediateProduct';
import DataEntry from '../qualityProcess/dataEntry/dataEntry';
import EquipmentStatus from "../equipmentManagement/equipmentBasicData/equipmentStatus/equipmentStatus";
import BaseData from "../equipmentManagement/equipmentBasicData/baseData";
import DepartmentStruct from '../equipmentManagement/equipmentBasicData/departmentStruct/departmentStruct';
import RawTestReport from '../qualityProcess/dataEntry/rawTestReport/rawTestReport';
import PurchaseCheckReport from '../qualityProcess/dataEntry/purchaseCheckReport/purchaseCheckReport';
import TodoList from '../qualityProcess/todolist/todolist';
import PrecursorCostBasisData from "../costAccounting/precursorCostBasisData/basisData";

import BaseInfo from '../qualityProcess/Base/baseInfo';
import DeliveryFactory from '../qualityProcess/Base/devileryFactory/devileryFactory';//送样工厂
import ProductLine from '../qualityProcess/Base/productLine/productLine';//产品线
import ProductProcess from '../qualityProcess/Base/ProductProcess/productProcess';//产品工序
import StatisticAnalysis from '../equipmentManagement/statisticAnalysis/statisticAnalysis'
import CheckStatistics from '../equipmentManagement/statisticAnalysis/checkStatistics/checkStatistics'
import TestItem from '../qualityProcess/Base/testItem/testItem';
import TestMaterial from '../qualityProcess/Base/testMaterial/tastMaterial'
import OperationManagement from "../userPermissions/operationManagement/operationManagement";

import EquipmentCheck from "../equipmentManagement/equipmentCheck/equipmentCheck";
import CheckPlan from "../equipmentManagement/equipmentCheck/checkPlan/checkPlan";
import CheckQuery from "../equipmentManagement/equipmentCheck/checkQuery/checkQuery";
import CheckTemplate from "../equipmentManagement/equipmentCheck/checkTemplate/checkTemplate";

import OtherStockOut from '../smartWarehouse/stockOut/stockOut';
import OriginalRecord from '../smartWarehouse/originalRecord/originalRecord';
import DataStatistics from '../smartWarehouse/dataStatistics/dataStatistics';
import DataQuery from '../smartWarehouse/dataQuery/dataQuery';
import Suppliers from "../smartWarehouse/repoBasic/supplier/supplier";
import WorkShop from '../smartWarehouse/repoBasic/workShop/workShop';
import Category from '../smartWarehouse/repoBasic/category/category';
import SubCategory from '../smartWarehouse/repoBasic/subCategory/subCategory';
import Material from '../smartWarehouse/repoBasic/material/material';
import OutCategory from '../smartWarehouse/repoBasic/outCategory/outCategory';
import OutPoint from '../smartWarehouse/repoBasic/outPoint/outPoint';
import SafetyStock from '../smartWarehouse/repoBasic/safetyStock/safetyStock';
// import LibraryManage from '../smartWarehouse/libraryManage/library';
// import MaterialBasic from '../smartWarehouse/baseData/materialBasicInformationTable'

import ProcessParamAddModal from '../technologyCenter/processParameters/add/processParamAdd'
import ExceptionHandling from '../technologyCenter/exceptionHandling/exceptionHandling';
import ProcessParameters from '../technologyCenter/processParameters/processParameters';
import RawStandard from '../technologyCenter/rawStandard/rawStandard';
import ProductStandard from '../technologyCenter/productStandard/productStandard';
import ProductInspection from '../qualityProcess/dataEntry/productInspection/productInspection';
import UnqualifiedExamine from '../qualityProcess/dataEntry/unqualifiedExamineTable/unqualifiedExamine';
import UnqualifiedTrack from '../qualityProcess/dataEntry/unqualifiedTrackTable/unqualifiedTrack';

import Equipment from "../equipmentManagement/equipmentGuidance/equipmentGuidance"
import EquipmentRepair from "../equipmentManagement/equipmentRepair/equipmentRepair"
import EquipmentArchive from '../equipmentManagement/equipmentArchive/equipmentArchive';
import EquipmentMaintenance from '../equipmentManagement/equipmentMaintenance/equipmentMaintenance'
import EqMaintenanceDataEntry from '../equipmentManagement/equipmentMaintenance/eqMaintenanceDataEntry/eqMaintenanceDataEntry'
import EqMaintenancePlan from '../equipmentManagement/equipmentMaintenance/eqMaintenancePlan/eqMaintenancePlan'
import EqMaintenanceQuery from '../equipmentManagement/equipmentMaintenance/eqMaintenanceQuery/eqMaintenanceQuery'
import EqupimentAssignment from '../equipmentManagement/equipmentBasicData/equpimentAssignment/equipmentProcessAssignment'

import EquipmentArchiveManager
    from '../equipmentManagement/equipmentArchive/equipmentArchiveManager/equipmentArchiveManager'
import EqcomponentSearch from '../equipmentManagement/equipmentArchive/eqcomponentSearch/eqcomponentSearch'
import EquipmentInspection from '../equipmentManagement/equipmentInspection/equipmentInspection'
import InspectionTemplate from '../equipmentManagement/equipmentInspection/inspectionTemplate/inspectionTemplate'
import InspectionPlan from '../equipmentManagement/equipmentInspection/inspectionPlan/inspectionPlan'
import InspectionQuery from '../equipmentManagement/equipmentInspection/inspectionQuery/inspectionQuery'
import LocationBasic from "../equipmentManagement/equipmentBasicData/locationBasic/locationBasic";
import EquipmentProcessName from '../equipmentManagement/equipmentBasicData/processName/processName';
import UserProcessAssignment from '../equipmentManagement/equipmentBasicData/userProcessAssignment/userProcessAssignment';

import BatchInfo from "../productionManagement/batchMessage/batchMessage"
import BatchRule from "../productionManagement/batchRule/batchRule"
import RawMaterialInput from '../technologyCenter/rawMaterialInput/rawMaterialInput'
import EqUserDepAllocation from '../equipmentManagement/equipmentBasicData/eqUserDepAllocation/eqUserDepAllocation'

import StatisticalPeriod from "../costAccounting/precursorCostBasisData/statisticalPeriod/statisticalPeriod"
import BaseProductLine from "../costAccounting/precursorCostBasisData/productLine/productLine"
import DetailItem from "../costAccounting/precursorCostBasisData/detailItem/detailItem"
import PLCaddress from "../costAccounting/precursorCostBasisData/PLCaddress/PLCaddress"
import MaterialPLC from "../costAccounting/precursorCostBasisData/materialPLC/materialPLC"
import XinsongVGA from "../costAccounting/precursorCostBasisData/xinsongVGA/xinsongVGA"
import ProductLineStatical from "../costAccounting/precursorCostBasisData/productLineStatical/productLineStatical"
import ProductLineVGA from "../costAccounting/precursorCostBasisData/productLineVGA/productLineVGA"
import ProcessName from "../costAccounting/precursorCostBasisData/processName/processName"
import ProductLineTank from "../costAccounting/precursorCostBasisData/productLineTank/productLineTank"
import RawMaterialName from "../costAccounting/precursorCostBasisData/rawMaterialName/rawMaterialName"
import RawMaterialWeight from "../costAccounting/precursorCostBasisData/rawMaterialWeight/rawMaterialWeight"
import TankValue from "../costAccounting/precursorCostBasisData/tankValue/tankValue"
import MaterialType from "../costAccounting/precursorCostBasisData/materialType/materialType"

import RawMaterial from '../costAccounting/rawMaterial/rawMaterial';
import StatisticalPeriodCost from '../positiveCost/baseData/statisticalPeriod/statisticalPeriodCost'

import AddModal from '../costAccounting/rawMaterial/addModal/addModal';
import StatisticalAnalysis from '../costAccounting/rawMaterial/statisticalAnalysis/statisticalAnalysis';

import BatchTrace from "../productionManagement/batchTrace/batchTrace";
import BaseInfoPositiveCost from '../positiveCost/baseData/baseInfo';
import ProductLinePositiveCost from '../positiveCost/baseData/productLine/productLinePositiveCost';
import ProcessPositiveCost from '../positiveCost/baseData/process/processPositiveCost';
import MaterialTypePositive from '../positiveCost/baseData/materialType/materialTypePositive';
import PLCAddress from '../positiveCost/baseData/PLCAddressTable/PLCAddress';
import OtherBaseInfo from '../positiveCost/baseData/otherBaseInfo/otherBaseInfo'
import MaterialTypePLCMeterCom from '../positiveCost/baseData/materialTypePLCMeterCompare/materialTypePLCMeterCom'
import ProcessStatistics from '../costAccounting/processStatistics/processStatistic'
import CostAccount from '../costAccounting/costAccount/costAccount'
import PositiveCostAccount from '../positiveCost/costAccout/mainMaterial'
import PositiveProcessStatistics from '../positiveCost/positiveProcessStatistics/positiveProcessStatistics'
import CostProcessAdd from '../costAccounting/processStatistics/processAdd/add'
import ProcessStatisticalAnalysis from '../costAccounting/processStatistics/statisticalAnalysis/statisticalAnalysis'
import ModelPositiveCost from '../positiveCost/baseData/productModel/model'
import ProductStorage from "../costAccounting/productStorage/productStorage"
import ProductAddModal from "../costAccounting/productStorage/addModal/addModal"

import PositiveAdd from '../positiveCost/positiveProcessStatistics/positiveAdd/positiveAdd'
import PositiveStatistic from '../positiveCost/positiveProcessStatistics/positiveStatisAnaly/positiveStatistic'
import StorageStatistical from "../costAccounting/productStorage/statisticalAnalysis/statisticalAnalysis"

import ExcipientStatistics from "../costAccounting/excipientStatistics/excipientStatistics"
import ExcipientStatisticsAnalysis from "../costAccounting/excipientStatistics/statisticalAnalysis/statisticalAnalysis"
import ExcipientStatisticsAddModal from "../costAccounting/excipientStatistics/addModal/addModal"

import Operation from '../fireQuality/operationManage/operationManage'

import InspectionManagement from "../fireQuality/inspectionManagement/inspectionManagement";
import CheckItem from "../powerCheck/checkItem/checkItem";
import PowerCheck from "../powerCheck/powerCheck/powerCheck";
import CheckSite from "../powerCheck/checkSite/checkSite";
import PowerCheckTemplate from "../powerCheck/checkTemplate/checkTemplate";

import RepoBaseData from "../smartWarehouse/repoBasic/basisData";

import FireLabelTest from "../fireQuality/baseData/labelTest/labelTest";
import FireSerialRule from "../fireQuality/baseData/serialRule/serialRule";
import FireSerialTest from "../fireQuality/baseData/serialTest/seriaTest";
import FireInspecDep from "../fireQuality/baseData/inspectionDep/inspectionDep";
import FireQuaBase from '../fireQuality/baseData/baseData'
import FireTestItem from "../fireQuality/baseData/testItem/testItem";
import FireInsRegister from "../fireQuality/inspectionManagement/fireInsRegister/fireInsRegister";
import FireInsSamRec from '../fireQuality/inspectionManagement/fireInsSamRec/fireInsSamRec'
import FireInsDataAcq from '../fireQuality/inspectionManagement/fireInsDataAcq/fireInsDataAcq'
import FireInsDataCol from '../fireQuality/inspectionManagement/fireInsDataCol/fireInsDataCol'
import BaseConfigure from '../costAccounting/precursorCostBasisData/other/other'

import RepoRecordWater from '../smartWarehouse/originalRecord/repoRecordWater/repoRecordWater'
import RepoRecordAccount from '../smartWarehouse/originalRecord/repoRecordAccount/repoRecordAccount'
import RepoQueryInOutDaily from '../smartWarehouse/dataQuery/repoQueryInOutDaily/repoQueryInOutDaily'
import RepoQueryInventoryDaily from "../smartWarehouse/dataQuery/repoQueryInventoryDaily/repoQueryInventoryDaily"
import RepoQueryInventoryQuery from "../smartWarehouse/dataQuery/repoQueryInventoryQuery/repoQueryInventoryQuery"
import RepoQueryInOutQuery from "../smartWarehouse/dataQuery/repoQueryInOutQuery/repoQueryInOutQuery"
import RepoQueryInOutAccount from "../smartWarehouse/dataQuery/repoQueryInOutAccount/repoQueryInOutAccount"
import Unit from "../smartWarehouse/repoBasic/unit/unit";
import SluggishPeriod from "../smartWarehouse/repoBasic/sluggishPeriod/sluggishPeriod";
import RepoStatisticsDull from "../smartWarehouse/dataStatistics/repoStatisticsDull/repoStatisticsDull";
import RepoStatisticsFlow from "../smartWarehouse/dataStatistics/repoStatisticsFlow/repoStatisticsFlow";
import RepoStatisticsAge from '../smartWarehouse/dataStatistics/repoStatisticsAge/repoStatisticsAge'

import BaseProduct from '../productionManagement/baseData/baseData'
import ProductCalculationBase from '../productionManagement/baseData/calculationBase/calculationBase'
import ProductLastIntial from '../productionManagement/baseData/lastIntial/lastIntial'
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
        }, {
            path: '/productLine',
            component: ProductLine
        }, {
            path: '/testMaterial',
            component: TestMaterial
        }, {
            path: '/sampleInspection',
            component: SampleInspection
        }
            , {
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
                path: "/equipmentProcessName",
                component: EquipmentProcessName
            }, {
                path: "/userProcessAssignment",
                component: UserProcessAssignment
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
            }, {
                path: "/equipmentCheck",
                component: EquipmentCheck
            }, {
                path: "/checkPlan",
                component: CheckPlan
            }, {
                path: "/checkQuery",
                component: CheckQuery
            }, {
                path: "/checkTemplate",
                component: CheckTemplate
            }, {
                path: "/equipmentArchiveManager",
                component: EquipmentArchiveManager
            }, {
                path: "/eqcomponentSearch",
                component: EqcomponentSearch
            }, {
                path: "/equipmentInspection",
                component: EquipmentInspection
            }, {
                path: "/inspectionTemplate",
                component: InspectionTemplate
            }, {
                path: "/inspectionPlan",
                component: InspectionPlan
            }, {
                path: "/inspectionQuery",
                component: InspectionQuery
            }, {
                path: "/locationBasic",
                component: LocationBasic
            }, {
                path: "/batchRule",
                component: BatchRule
            }, {
                path: "/batchInfo",
                component: BatchInfo
            }, {
                path: "/equpimentAssignment",
                component: EqupimentAssignment
            }, {
                path: "/statisticAnalysis",
                component: StatisticAnalysis
            }, {
                path: "/checkStatistics",
                component: CheckStatistics
            }, {
                path: "/rawMaterialInput",
                component: RawMaterialInput
            }, {
                path: "/eqUserDepAllocation",
                component: EqUserDepAllocation
            }, {
                path: "/precursorCostBasisData",
                component: PrecursorCostBasisData
            }, {
                path: "/statisticalPeriod",
                component: StatisticalPeriod
            }, {
                path: "/BaseproductLine",
                component: BaseProductLine
            }, {
                path: "/detailItem",
                component: DetailItem
            }, {
                path: "/PLCaddress",
                component: PLCaddress
            }, {
                path: "/materialPLC",
                component: MaterialPLC
            }, {
                path: "/xinsongVGA",
                component: XinsongVGA
            }, {
                path: "/productLineStatical",
                component: ProductLineStatical
            }, {
                path: "/productLineVGA",
                component: ProductLineVGA
            }, {
                path: "/processName",
                component: ProcessName
            }
            , {
                path: '/productLine',
                component: ProductLine
            }, {
                path: '/sampleInspection',
                component: SampleInspection
            }
            , {
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
                path: '/equipmentBasicData',
                component: BaseData
            }, {
                path: '/departmentStruct',
                component: DepartmentStruct
            }, {
                path: "/equipmentStatus",
                component: EquipmentStatus
            }, {
                path: "/equipmentCheck",
                component: EquipmentCheck
            }, {
                path: "/checkPlan",
                component: CheckPlan
            }, {
                path: "/checkQuery",
                component: CheckQuery
            }, {
                path: "/checkTemplate",
                component: CheckTemplate
            }, {
                path: "/eqcomponentSearch",
                component: EqcomponentSearch
            }, {
                path: "/locationBasic",
                component: LocationBasic
            }, {
                path: "/batchSearch",
                component: BatchTrace
            }, {
                path: '/rawMaterial',
                component: RawMaterial
            }, {
                path: '/baseDataPositiveCost',
                component: BaseInfoPositiveCost
            }, {
                path: '/statisticalPeriodCost',
                component: StatisticalPeriodCost
            }, {
                path: '/productLinePositiveCost',
                component: ProductLinePositiveCost
            }, {
                path: '/processPositiveCost',
                component: ProcessPositiveCost
            }, {
                path: '/modelPositiveCost',
                component: ModelPositiveCost
            }, {
                path: '/materialTypePositive',
                component: MaterialTypePositive
            }, {
                path: '/PLCAddressTable',
                component: PLCAddress
            }, {
                path: '/otherBaseInfo',
                component: OtherBaseInfo
            }, {
                path: '/materialTypePLCMeterCom',
                component: MaterialTypePLCMeterCom
            }, {
                path: '/addModal',
                component: AddModal
            }, {
                path: '/statisticalAnalysis',
                component: StatisticalAnalysis
            }, {
                path: '/exceptionHandling',
                component: ExceptionHandling
            }, {
                path: '/processParameters',
                component: ProcessParameters

            }, {
                path: '/productLineTank',
                component: ProductLineTank
            }, {
                path: '/rawMaterialName',
                component: RawMaterialName
            }, {
                path: '/materialType',
                component: MaterialType
            }, {
                path: '/rawMaterialWeight',
                component: RawMaterialWeight
            }, {
                path: '/tankValue',
                component: TankValue
            }, {
                path: '/processStatistics',
                component: ProcessStatistics
            }, {
                path: '/productAccounting',
                component: CostAccount
            }, {
                path: '/positiveProductAccount',
                component: PositiveCostAccount
            }, {
                path: '/positiveProcess',
                component: PositiveProcessStatistics
            }, {
                path: '/costProcessAdd',
                component: CostProcessAdd
            }, {
                path: '/processStatisticalAnalysis',
                component: ProcessStatisticalAnalysis
            }, {
                path: "/productStorage",
                component: ProductStorage
            }, {
                path: '/productAddModal',
                component: ProductAddModal
            }, {
                path: '/positiveAdd',
                component: PositiveAdd
            }, {
                path: "/storageStatistical",
                component: StorageStatistical
            }, {
                path: "/excipientStatistics",
                component: ExcipientStatistics
            }, {
                path: "/excipientStatisticsAnalysis",
                component: ExcipientStatisticsAnalysis
            }, {
                path: "/excipientStatisticsAddModal",
                component: ExcipientStatisticsAddModal
            }, {
                path: '/positiveStatistic',
                component: PositiveStatistic
            }, {
                path: '/processParamsAdd',
                component: ProcessParamAddModal
            }, {
                path: '/operationManual',
                component: Operation
            }, {
                path: '/checkItem',
                component: CheckItem
            }, {
                path: '/powerCheck',
                component: PowerCheck
            }, {
                path: '/powerCheckTemplate',
                component: PowerCheckTemplate
            }, {
                path: '/inspectionManagement',
                component: InspectionManagement
            }, {
                path: '/otherStockOut',
                component: OtherStockOut
            }, {
                path: '/repoBasic',
                component: RepoBaseData
            }, {
                path: '/fireBasicData',
                component: FireQuaBase
            },
            {
                path: '/fireLabelTest',
                component: FireLabelTest
            }, {
                path: '/fireSeriRule',
                component: FireSerialRule
            }, {
                path: '/fireInspecDep',
                component: FireInspecDep
            }, {
                path: '/fireSerialTest',
                component: FireSerialTest
            }, {
                path: '/fireTestItem',
                component: FireTestItem
            }, {
                path: '/fireInsRegister',
                component: FireInsRegister
            }, {
                path: '/fireInsSamRec',
                component: FireInsSamRec
            }, {
                path: '/fireInsDataAcq',
                component: FireInsDataAcq
            }, {
                path: '/fireInsDataCol',
                component: FireInsDataCol
            },{
                path:'/baseConfigure',
                component:BaseConfigure
            }, {
                path: '/checkSite',
                component: CheckSite
            }, {
                path: '/repoRecord',
                component: OriginalRecord
            }, {
                path: '/repoStatistics',
                component: DataStatistics
            }, {
                path: '/repoQuery',
                component: DataQuery
            }, {
                path: '/repoBasicSupplier',
                component: Suppliers
            }, {
                path: '/repoBasicWorkshop',
                component: WorkShop
            }, {
                path: '/repoBasicCategory',
                component: Category
            }, {
                path: '/repoBasicSubcategory',
                component: SubCategory
            }, {
                path: '/repoBasicMaterial',
                component: Material
            }, {
                path: '/repoBasicOutCategory',
                component: OutCategory
            }, {
                path: '/repoBasicOutPoint',
                component: OutPoint
            }, {
                path: '/repoBasicSafety',
                component: SafetyStock
            }, {
                path: '/unit',
                component: Unit
            }, {
                path: '/sluggishPeriod',
                component: SluggishPeriod
            },{
                path: '/repoRecordWater',
                component: RepoRecordWater
            },{
                path: '/repoRecordAccount',
                component: RepoRecordAccount
            },{
                path: '/repoQueryInOutDaily',
                component: RepoQueryInOutDaily
            },{
                path: '/repoQueryInventoryDaily',
                component: RepoQueryInventoryDaily
            },{
                path: '/repoQueryInventoryQuery',
                component: RepoQueryInventoryQuery
            },{
                path: '/repoQueryInOutQuery',
                component: RepoQueryInOutQuery
            },{
                path: '/repoQueryInOutAccount',
                component: RepoQueryInOutAccount
            },{
                path: '/repoStatisticsDull',
                component: RepoStatisticsDull
            },{
                path: '/repoStatisticsFlow',
                component: RepoStatisticsFlow
            },{
                path:'/repoStatisticsAge',
                component:RepoStatisticsAge
            },{
                path:'/baseProduct',
                component:BaseProduct
            },{
                path:'/productCalculationBase',
                component:ProductCalculationBase
            },{
                path:'/productLastIntial',
                component:ProductLastIntial
            }];
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
