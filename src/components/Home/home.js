import React, { Component } from 'react';
import { Divider } from 'antd';
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
        const status = {
            '-1': '已保存未提交',
            '0' : '已提交未审核',
            '1' : '审核中',
            '2' : '审核通过',
            '3' : '审核未通过',
            '4' : '合格',
            '5' : '不合格',
            '6' : '未接单',
            '7' : '已接单',
            '8' : '已完成',
            '9' : '已评价'
        }
        const dataType = {
            '1' : '流程管理',
            '2' : '制程检测',
            '3' : '样品检测',
            '4' : '原材料出库',
            '5' : '成品出库',
            '6' : '红单申请',
            '7' : '进货检验',
            '8' : '成品检验',
            '9' : '原材料检测',
            '10': '中间品检测',
            '11': '不合格评审数据',
            '12': '不合格追踪数据',
            '13':'原材料标准',
            '14':'成品标准'
        }
        const server = localStorage.getItem('remote');
        this.Authorization = localStorage.getItem('Authorization');
        const url = {
            Authorization:this.Authorization,
            /**角色管理 */
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
            /**菜单管理 */
            menu:{
                getAll:`${server}/jc/auth/menu/getAllRecursive`,
                add:`${server}/jc/auth/menu/add`,
                deleteByIds:`${server}/jc/auth/menu/deleteByIds`,
                findByParentNameLikeByPage:`${server}/jc/auth/menu/findByParentNameLikeByPage`,
                findAllByPage:`${server}/jc/auth/menu/findAllByPage`,
                findByMenuType:`${server}/jc/auth/menu/findByMenuType`,
                findByNameLikeByPage:`${server}/jc/auth/menu/findByNameLikeByPage`,
                update:`${server}/jc/auth/menu/update`,
                findById:`${server}/jc/auth/menu`,
                deleteById:`${server}/jc/auth/menu`,
            },
            /**盘库管理 */
            libraryManage:{
                getAll:`${server}/jc/common/RepoDiffRecord`,
                getAllLikeByPage:`${server}/jc/common/RepoDiffRecord/getByMaterialNameLike`,
                getAllByPage:`${server}/jc/common/RepoDiffRecord/pages`,
                getAllPage:`${server}/jc/common/RepoStock`,
                getAllName:`${server}/jc/common/RepoStock/names`,
                oneKeyStock:`${server}/jc/common/RepoStock/oneKeyStock`,
                getAllPages:`${server}/jc/common/RepoStock/pages`
            },
            process:{
                process:`${server}/jc/common/batchAuditTask`
            },
            /**流程管理 */
            processManagement:{
                deleteByIds:`${server}/jc/common/batchAuditTask`,
                getAllByPage:`${server}/jc/common/batchAuditTask/pages`,
                getAllUseManage:`${server}/jc/common/batchAuditTask/validTasks`,
            },
            /**样品送检 */
            sampleInspection:{
                findMiddleItem:`${server}/jc/common/procedureTestRecord/testItems`,
                getAll:`${server}/jc/common/sampleDeliveringRecord`,
                accept:`${server}/jc/common/sampleDeliveringRecord/accept`,
                getAllBypages:`${server}/jc/common/sampleDeliveringRecord/pages`,
            },
            /**操作管理 */
            operation:{
                getOperationsByPage:`${server}/jc/auth/operation/getOperationsByPage`,
                deleteByIds:`${server}/jc/auth/operation/deleteByIds`,
                pagesByName:`${server}/jc/auth/operation/pagesByName`,
                update:`${server}/jc/auth/operation/update`,
                add:`${server}/jc/auth/operation/add`,
                deleteById:`${server}/jc/auth/operation`,
                getAll:`${server}/jc/auth/operation/getAll`,
            },
            /**用户管理*/
            userManage:{
                add:`${server}/jc/auth/user/signIn`,
                deleteById:`${server}/jc/auth/user/deleteById`,
                update:`${server}/jc/auth/user/update`,
                getAll:`${server}/jc/auth/user/getAll`,
                deleteByIds:`${server}/jc/auth/user/deleteByIds`,    
                getAllByPage:`${server}/jc/auth/user/getAllByPage`,
                search:`${server}/jc/auth/user/getUserByNameByPage`,
                
            },
            /**部门管理 */
            department:{
                getDepartmentsByPage:`${server}/jc/auth/department/getDepartmentsByPage`,
                deleteByIds:`${server}/jc/auth/department/deleteByIds`,
                getDepartmentsByNameLikeByPage:`${server}/jc/auth/department/getDepartmentsByNameLikeByPage`,
                update:`${server}/jc/auth/department/update`,
                add:`${server}/jc/auth/department/add`,
                deleteById:`${server}/jc/auth/department`,
                getAll:`${server}/jc/auth/department/getAll`,
            },
            /**出库管理 */
            stockOut:{
                getAll:`${server}/jc/common/RepoStock`,
                repoOut:`${server}/jc/common/repoOutApply`,
                getAllStockByPage:`${server}/jc/common/RepoStock/pages`,
                repoOutApply:`${server}/jc/common/repoOutApply/pages`,
            },
            /**待办事项 */
            toDoList:`${server}/jc/common/toDoList`,
            /**制程检验 */
            procedure:{
                procedureTestRecord:`${server}/jc/common/procedureTestRecord`,
                getAllByPage:`${server}/jc/common/procedureTestRecord/pages`,
                iteration:`${server}/jc/common/procedureTestRecord/iteration`,
                testItems:`${server}/jc/common/procedureTestRecord/testItems`,
            },
            /**送样工厂 */
            deliveryFactory:{
                deliveryFactory:`${server}/jc/common/deliveryFactory`,
                getAllByPage:`${server}/jc/common/deliveryFactory/pages`,
                search:`${server}/jc/common/deliveryFactory/pagesNameLike`
            },
            /**基础编号 */
            serialNumber:{
                serialNumber:`${server}/jc/common/repoBaseSerialNumber`,
            },
            /**检测项目 */
            testItems:{
                testItems:`${server}/jc/common/testItem`,
                getAllByPage:`${server}/jc/common/testItem/pages`,
                search:`${server}/jc/common/testItem/pagesNameLike`
            },
            /**产品工序 */
            productionProcess:{
                productionProcess:`${server}/jc/common/productionProcess`,
                getAllByPage:`${server}/jc/common/productionProcess/pages`,
                search: `${server}/jc/common/productionProcess/pagesNameLike`,
            },
             /**产品线 */
             productLine:{
                productLine:`${server}/jc/common/productLine`,
                getAllByPage:`${server}/jc/common/productLine/pages`,
                search:`${server}/jc/common/productLine/pagesNameLike`
             },
             /**进货检验 */
             purchaseCheckReport:{
                 rawPages:`${server}/jc/common/purchaseReportRecord/rawPages`,
                 purchaseReportRecord:`${server}/jc/common/purchaseReportRecord`,
                 generate:`${server}/jc/common/purchaseReportRecord/generate`,
                 releasePages:`${server}/jc/common/purchaseReportRecord/releasePages`,
                 purchasePages:`${server}/jc/common/purchaseReportRecord/purchasePages`,
             },
             /**入库管理 */
             enterStorage: {
                enterStorage:`${server}/jc/common/repoInRecord/pages`
              },
              /** 库存管理*/
              inventorManage:{
                  inventorManage:`${server}/jc/common/RepoStock/pages`
              },
              /**红单管理 */
              redList:{
                  redList:`${server}/jc/common/repoRedTables`,
                  redList1:`${server}/jc/common/repoRedTable`,
                  search:`${server}/jc/common/repoRedTables/serialNumber`
              },
              /**原材料检验 */
              rawTestReport:{
                  rawTestReport:`${server}/jc/common/rawTestReport`, 
                  getById:`${server}/jc/common/rawTestReport/details`, 
                  getAllByPage:`${server}/jc/common/rawTestReport/pages`,
                  detailsByBatchNumberId:`${server}/jc/common/rawTestReport/detailsByBatchNumberId`,
              },
              /**中间品录检 */
              intermediateProduct:`${server}/jc/common/middleProductionDetection`,
              /**成品检验 */
              productInspection:{
                  pages:`${server}/jc/common/productRecord/pages`,
                  productRecord:`${server}/jc/common/productRecord`,

              },
              /**产品检测 */
              productTestRecord:{
                getByBatchNUmberId:`${server}/jc/common/productTestRecord/batchNumberId`,
              },
              /**不合格审评表 */
              unqualifiedExamineTable:{
                  pages:`${server}/jc/common/unqualifiedTestReportRecord/pages`,
              },
              /**原材料标准*/
              rawStandard:{
                 getRaw:`${server}/jc/common/techRawStandard/raw`,
                 addRaw:`${server}/jc/common/techRawStandard/newRaw`,
                 getFactory:`${server}/jc/common/techRawStandard/manufacturers`,
                 addFactory:`${server}/jc/common/techRawStandard/newManufacturer`,
                 getStandard:`${server}/jc/common/techRawStandard`,
                 rawItems:`${server}/jc/common/techRawStandard/rawItems`,//获取原材料主成分
                 
              },
              /**产品标准 */
              productStandard:{
                  add:`${server}/jc/common/techProductStandard/newClasses`,
                  productStandard:`${server}/jc/common/techProductStandard`,
                  getAll:`${server}/jc/common/techProductStandard/allClasses`,
                  addNewClass:`${server}/jc/common/techProductStandard/newClass`,
              }
        }
        localStorage.setItem('status',JSON.stringify(status));
        localStorage.setItem('dataType',JSON.stringify(dataType));
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
        const userName = JSON.parse(localStorage.getItem('menuList')).name;
        const userId = JSON.parse(localStorage.getItem('menuList')).userId;
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
                        <div className="fr" >
                            <Exit name='退出' userId={userId}></Exit>
                        </div>
                        
                        <div className="fr userName" >
                            <i className="fa fa-user-circle-o" aria-hidden="true"></i> 
                            <span>{userName}</span>
                            <Divider type='vertical' />
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