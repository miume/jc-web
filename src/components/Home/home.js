import React, {Component} from 'react';
import './home.css';
import Top from './top';
import Left from './left';
import Right from './right';

class Home extends Component {
    componentWillMount() {
        let canvas;
        let showCanvas = setInterval(function () {
            canvas = document.getElementById('defaultCanvas0');
            if (canvas !== null && canvas !== undefined) {
                canvas.style.visibility = 'hidden';
                clearInterval(showCanvas);
            }
        }, 100)
        /**统一管理status */
        const status = {
            '-1': '已保存未提交',
            '0': '已提交未审核',
            '1': '审核中',
            '2': '审核通过',
            '3': '审核未通过',
            '4': '合格',
            '5': '不合格',
            '6': '未接单',
            '7': '已接单',
            '8': '已完成',
            '9': '未完成',
            '10': '进行中',
            '11': '已评价'
        }
        /**统一管理dataType */
        const dataType = {
            '1': '流程管理',
            '2': '制程检测',
            '3': '样品检测',
            '4': '原材料出库',
            '5': '成品出库',
            '6': '红单申请',
            '7': '进货检验',
            '8': '成品检验',
            '9': '原材料检测',
            '10': '中间品检测',
            '11': '不合格评审数据',
            '12': '不合格追踪数据',
            '13': '原材料标准',
            '14': '成品标准',
            '15': '设备指导',
            '16': '工艺参数'
        };
        const server = localStorage.getItem('server');
        this.Authorization = localStorage.getItem('authorization');
        const url = {
            Authorization: this.Authorization,
            passwordChange: `${server}/jc/auth/passwordChange`,
            /**角色管理 */
            role: {
                role: `${server}/jc/auth/role`,
                getAll: `${server}/jc/auth/role/getAll`,
                getAuths: `${server}/jc/auth/role/getAuths`,
                getUsersOfRole: `${server}/jc/auth/role/usersOfRole`,
                getRolesByPage: `${server}/jc/auth/role/byNameLikeByPage`,
                addOneOperation: `${server}/jc/auth/role/addAuthority`,
                search: `${server}/jc/auth/role/getRolesByNameLikeByPage`,
                assignRoleToUser: `${server}/jc/auth/role/assignRoleToUser`,
                deleteOneOperation: `${server}/jc/auth/role/removeAuthority`,
            },
            /**菜单管理 */
            menu: {
                getAll: `${server}/jc/auth/menu/recursive`,
                add: `${server}/jc/auth/menu`,
                deleteByIds: `${server}/jc/auth/menu/batchDelete`,
                findByParentNameLikeByPage: `${server}/jc/auth/menu/byFatherNameLikeByPage`,
                findAllByPage: `${server}/jc/auth/menu/byNameLikeByPage`,
                findByMenuType: `${server}/jc/auth/menu/byType`,
            },
            /**盘库管理*/
            libraryManage: {
                getAll: `${server}/jc/common/RepoDiffRecord`,
                getAllLikeByPage: `${server}/jc/common/RepoDiffRecord/getByMaterialNameLike`,
                getAllByPage: `${server}/jc/common/RepoDiffRecord/pages`,
                getAllPage: `${server}/jc/common/RepoStock`,
                getAllName: `${server}/jc/common/RepoStock/names`,
                oneKeyStock: `${server}/jc/common/RepoStock/oneKeyStock`,
                getAllPages: `${server}/jc/common/RepoStock/pages`,
                realStock: `${server}/jc/common/sortout/realStock`,
                stock: `${server}/jc/common/RepoDiffRecord/stock`
            },
            process: {
                process: `${server}/jc/common/batchAuditTask/validTasks`
            },
            /**权限模块，用户 */
            authUser: {
                getAll: `${server}/jc/common/authUser/getAll`,
                getAllById: `${server}/jc/common/authUser/getById`
            },
            /**权限模块，app用户 */
            appUserAuth: {
                getAllAuth: `${server}/jc/common/appUserAuth/getAllAuth`,
                getAuthByUserId: `${server}/jc/common/appUserAuth/getAuthByUserId`,
                update: `${server}/jc/common/appUserAuth/update`,
                getUser: `${server}/jc/common/appUserAuth/getUser`,
                assign: `${server}/jc/common/appUserAuth/assign`,
            },
            /**流程管理 */
            processManagement: {
                deleteByIds: `${server}/jc/common/batchAuditTask`,
                getAllByPage: `${server}/jc/common/batchAuditTask/pages`,
                getAllUseManage: `${server}/jc/common/batchAuditTask/validTasks`,
            },
            /**样品送检 */
            sampleInspection: {
                findMiddleItem: `${server}/jc/common/procedureTestRecord/testItems`,
                getAll: `${server}/jc/common/sampleDeliveringRecord`,
                accept: `${server}/jc/common/sampleDeliveringRecord/accept`,
                getAllBypages: `${server}/jc/common/sampleDeliveringRecord/pages`,
                rawStandard: `${server}/jc/common/sampleDeliveringRecord/rawStandard`,
                getPageByBatch: `${server}/jc/common/sampleDeliveringRecord/getPageByBatch`
            },
            /**设备指导 */
            instructor: {
                deletePic: `${server}/jc/common/instructor/deletePic`,
                uploadPic: `${server}/jc/common/instructor/uploadPic`,
                instructorAll: `${server}/jc/common/instructor`
            },
            /**操作管理 */
            operation: {
                getOperationsByPage: `${server}/jc/auth/operation/getOperationsByPage`,
                deleteByIds: `${server}/jc/auth/operation/deleteByIds`,
                pagesByName: `${server}/jc/auth/operation/pagesByName`,
                update: `${server}/jc/auth/operation/update`,
                add: `${server}/jc/auth/operation/add`,
                deleteById: `${server}/jc/auth/operation`,
                getAll: `${server}/jc/auth/operation/getAll`,
            },
            /**用户管理*/
            userManage: {
                add: `${server}/jc/auth/user/signIn`,
                deleteById: `${server}/jc/auth/user/deleteById`,
                update: `${server}/jc/auth/user/update`,
                getAll: `${server}/jc/auth/user/getAll`,
                deleteByIds: `${server}/jc/auth/user/deleteByIds`,
                getAllByPage: `${server}/jc/auth/user/getAllByPage`,
                search: `${server}/jc/auth/user/getUserByNameByPage`,
                reset: `${server}/jc/auth/user/reset`,

            },
            /**部门管理 */
            department: {
                byNameLikeByPage: `${server}/jc/auth/department/byNameLikeByPage`,
                department: `${server}/jc/auth/department`,
                batchDelete: `${server}/jc/auth/department/batchDelete`,
                // update:`${server}/jc/auth/department/update`,
                // add:`${server}/jc/auth/department/add`,
                // deleteById:`${server}/jc/auth/department`,
                getAll: `${server}/jc/auth/department`,
            },
            /**设备保养 */
            eqmaintenance: {
                recordPage: `${server}/jc/common/maintenanceRecord/recordPage`,
                deleteByIds: `${server}/jc/common/maintenanceRecord/deleteByIds`,
                addRecord: `${server}/jc/common/maintenanceRecord/addRecord`,
                recordDetail: `${server}/jc/common/maintenanceRecord/recordDetail`,
                records: `${server}/jc/common/maintenanceRecord/records`,
                updateRecord: `${server}/jc/common/maintenanceRecord/updateRecord`,
                maintenanceRecord: `${server}/jc/common/ maintenanceRecord`,
                byConditions: `${server}/jc/common/maintenanceRecord/byConditions`
            },
            /**设备维修*/
            equipmentRepair: {
                deviceRepairApplication: `${server}/jc/common/deviceRepair/deviceRepairApplication`,
                evaluations: `${server}/jc/common/deviceRepair/evaluations`,
                getPage: `${server}/jc/common/deviceRepair/getPage`,
                export: `${server}/jc/common/deviceRepair/export`,
                download: `${server}/jc/common`,
                byConditions: `${server}/jc/common/deviceRepair/byConditions`
            },
            /**位置基础信息*/
            locationBasic: {
                addBasicInfo: `${server}/jc/common/basicInfoLocation/addBasicInfo`,
                deleteByIds: `${server}/jc/common/basicInfoLocation/deleteByIds`,
                getPage: `${server}/jc/common/basicInfoLocation/getPage`,
                maintenanceDetailById: `${server}/jc/common/basicInfoLocation/maintenanceDetailById`,
                updateById: `${server}/jc/common/basicInfoLocation/updateById`,
                basicInfoLocation: `${server}/jc/common/basicInfoLocation`,
            },
            /**出库管理 */
            stockOut: {
                pages: `${server}/jc/repo/outRecord/pages`,
                save: `${server}/jc/repo/outRecord/out`,
                detail: `${server}/jc/repo/outRecord`
            },
            /**待办事项 */
            toDoList: `${server}/jc/common/toDoList`,
            /**制程检验 */
            procedure: {
                procedureTestRecord: `${server}/jc/common/procedureTestRecord`,
                getAllByPage: `${server}/jc/common/procedureTestRecord/pages`,
                iteration: `${server}/jc/common/procedureTestRecord/iteration`,
                testItems: `${server}/jc/common/procedureTestRecord/testItems`,
            },
            /**送样工厂 */
            deliveryFactory: {
                deliveryFactory: `${server}/jc/common/deliveryFactory`,
                getAllByPage: `${server}/jc/common/deliveryFactory/pages`,
                search: `${server}/jc/common/deliveryFactory/pagesNameLike`
            },
            /**基础编号 */
            serialNumber: {
                serialNumber: `${server}/jc/common/repoBaseSerialNumber`,
                getRaw: `${server}/jc/common/repoBaseSerialNumber/allName`,//查询物料、厂商
            },
            /**检测项目 */
            testItems: {
                testItems: `${server}/jc/common/testItem`,
                getAllByPage: `${server}/jc/common/testItem/pages`,
                search: `${server}/jc/common/testItem/pagesNameLike`
            },
            /**产品工序 */
            productionProcess: {
                productionProcess: `${server}/jc/common/productionProcess`,
                getAllByPage: `${server}/jc/common/productionProcess/pages`,
                search: `${server}/jc/common/productionProcess/pagesNameLike`,
            },
            /**产品线 */
            productLine: {
                productLine: `${server}/jc/common/productLine`,
                getAllByPage: `${server}/jc/common/productLine/pages`,
                search: `${server}/jc/common/productLine/pagesNameLike`
            },
            /**进货检验 */
            purchaseCheckReport: {
                rawPages: `${server}/jc/common/purchaseReportRecord/rawPages`,
                purchaseReportRecord: `${server}/jc/common/purchaseReportRecord`,
                generate: `${server}/jc/common/purchaseReportRecord/generate`,
                releasePages: `${server}/jc/common/purchaseReportRecord/releasePages`,
                purchasePages: `${server}/jc/common/purchaseReportRecord/purchasePages`,
                preview: `${server}/jc/common/purchaseReportRecord/preview`,
            },
            /**入库管理 */
            enterStorage: {
                enterStorage: `${server}/jc/repo/inRecord/pages`
            },
            /** 库存管理*/
            inventorManage: {
                inventorManage: `${server}/jc/repo/stock/conditions`
            },
            /**红单管理 */
            redList: {
                redList: `${server}/jc/common/repoRedTables`,
                redList1: `${server}/jc/common/repoRedTable`,
                search: `${server}/jc/common/repoRedTables/serialNumber`
            },
            /**原材料检验 */
            rawTestReport: {
                rawTestReport: `${server}/jc/common/rawTestReport`,
                getById: `${server}/jc/common/rawTestReport/details`,
                getAllByPage: `${server}/jc/common/rawTestReport/pages`,
                detailsByBatchNumberId: `${server}/jc/common/rawTestReport/detailsByBatchNumberId`,
            },
            /**中间品录检 */
            intermediateProduct: `${server}/jc/common/middleProductionDetection`,

            /**成品检验 */
            productInspection: {
                pages: `${server}/jc/common/productRecord/pages`,
                productRecord: `${server}/jc/common/productRecord`,
                rate: `${server}/jc/common/productRecord/rate`

            },
            /**产品检测 */
            productTestRecord: {
                getByBatchNUmberId: `${server}/jc/common/productTestRecord/batchNumberId`,
            },
            /**不合格审评表 */
            unqualifiedExamineTable: {
                unqualifiedTestReportRecord: `${server}/jc/common/unqualifiedTestReportRecord`,
                pages: `${server}/jc/common/unqualifiedTestReportRecord/pages`,
            },
            /**原材料标准*/
            rawStandard: {
                getRaw: `${server}/jc/common/techRawStandard/raw`,
                addRaw: `${server}/jc/common/techRawStandard/newRaw`,
                getFactory: `${server}/jc/common/techRawStandard/manufacturers`,
                addFactory: `${server}/jc/common/techRawStandard/newManufacturer`,
                getStandard: `${server}/jc/common/techRawStandard`,
                rawItems: `${server}/jc/common/techRawStandard/rawItems`,//获取原材料主成分
                addNewRaw: `${server}/jc/common/techRawStandard/addRaw`,

                getCurrentRawStandard: `${server}/jc/common/techRawStandard/getCurrentRawStandard`,
                getItemsByRawId: `${server}/jc/common/techRawStandard/getItemsByRawId`
            },
            /**产品标准 */
            productStandard: {
                add: `${server}/jc/common/techProductStandard/newClasses`,
                productStandard: `${server}/jc/common/techProductStandard`,
                getAll: `${server}/jc/common/techProductStandard/allClasses`,
                addNewClass: `${server}/jc/common/techProductStandard/newClass`,
            },
            /**成品标准 */
            product: {
                product: `${server}/jc/common/product`,
                addStandard: `${server}/jc/common/product/addStandard`,
                getAllProduct: `${server}/jc/common/product/getAllProduct`,
                getAllStandardByPIdandCId: `${server}/jc/common/product/getAllStandardByPIdandCId`,
                detailByCommonBatchId: `${server}/jc/common/product/detailByCommonBatchId`,
                updateByCommonBatchId: `${server}/jc/common/product/updateByCommonBatchId`,

                productStandard: `${server}/jc/common/techProductStandard`,
                getAll: `${server}/jc/common/techProductStandard/allClasses`,
                addNewClass: `${server}/jc/common/techProductStandard/newClass`,

                getAllProductCommonBatch: `${server}/jc/common/product/getAllProductCommonBatch`,
            },
            /**设备基本厂商*/
            equipmentManufacture: {
                getAllEquipmentManufactute: `${server}/jc/common/equipmentBaseManufacturer/type`
            },
            /**设备基本设备*/
            equipmentBaseInstrument: {
                getAllEquipmentBaseInstrument: `${server}/jc/common/equipmentBaseInstrument`
            },
            /**不合格追踪*/
            unqualifiedTrack: {
                pages: `${server}/jc/common/unqualifiedTracingRecord/pages`,
                unqualifiedTracingRecord: `${server}/jc/common/unqualifiedTracingRecord`
            },
            /**设备管理部门管理*/
            equipmentDept: {
                dept: `${server}/jc/common/dept`
            },
            /**设备保养*/
            eqMaintenanceQuery: {
                recordDetail: `${server}/jc/common/maintenanceRecord/recordDetail`,
                recordPage: `${server}/jc/common/maintenanceRecord/recordPage`,
                recordDelete: `${server}/jc/common/maintenanceRecord`,
            },
            /**设备管理设备档案*/
            equipmentArchive: {
                device: `${server}/jc/common/device`,
                detail: `${server}/jc/common/device/detail`,
                page: `${server}/jc/common/device/page`,
                units: `${server}/jc/common/device/units`,
                accsUnit: `${server}/jc/common/device/accsUnit`,
                addUnit: `${server}/jc/common/device/addUnit`,
                accsMain: `${server}/jc/common/device/accsMain`,
                addMainAcc: `${server}/jc/common/device/addMainAcc`,
                delete: `${server}/jc/common/device/delete`,
                upload: `${server}/jc/common/device/upload`,
                deleteUnits: `${server}/jc/common/device/deleteUnits`,
                addUnitAcc: `${server}/jc/common/device/addUnitAcc`,
                unitDetail: `${server}/jc/common/device/unitDetail`,
                delMainAcc: `${server}/jc/common/device/delMainAcc`,
                delUnitAcc: `${server}/jc/common/device/delUnitAcc`,
                updateMainAccessory: `${server}/jc/common/device/updateMainAccessory`,
                updateUnitAccessory: `${server}/jc/common/device/updateUnitAccessory`,
                updateUnit: `${server}/jc/common/device/updateUnit`,
                deleteUnit: `${server}/jc/common/device/deleteUnit`,
                AccName: `${server}/jc/common/device/getDeviceByAccName`,
                UnitName: `${server}/jc/common/device/getDeviceByUnitName`,
                getAllMainByDeptCodeByDeviceName: `${server}/jc/common/device/getAllMainByDeptCodeByDeviceName`,
                duplicateDeviceAcc: `${server}/jc/common/device/duplicateDeviceAcc`,
                getAllUnitByDeptCodeByDeviceName: `${server}/jc/common/device/getAllUnitByDeptCodeByDeviceName`,
                duplicateDeviceUnit: `${server}/jc/common/device/duplicateDeviceUnit`,
                duplicateUnitAcc: `${server}/jc/common/device/duplicateUnitAcc`,
                duplicateMutipleDevice: `${server}/jc/common/device/duplicateMutipleDevice`,
            },
            /**设备管理状态*/
            equipmentStatus: {
                deviceStatus: `${server}/jc/common/deviceStatus`,
                delete: `${server}/jc/common/deviceStatus/delete`,
                getByNameLike: `${server}/jc/common/deviceStatus/getByNameLike`
            },
            /**项目录入**/
            eqMaintenanceDataEntry: {
                maintenance: `${server}/jc/common/maintenance`,
                addOne: `${server}/jc/common/maintenance/addOne`,
                getAll: `${server}/jc/common/maintenance/getAll`,
                page: `${server}/jc/common/maintenance/page`,
                queryAll: `${server}/jc/common/maintenance/queryAll`,
                deleteIds: `${server}/jc/common/maintenance/deleteIds`,
                maintenanceDetailById: `${server}/jc/common/maintenance/maintenanceDetailById`,
                getAllByDeviceName: `${server}/jc/common/maintenance/getAllByDeviceName`,
            },
            DeviceMaintenancePlan: {
                maintenanceAddPlan: `${server}/jc/common/maintenancePlan/addPlan`,
                maintenancePlanDetail: `${server}/jc/common/maintenancePlan/planDetail`,
                maintenancePlanPage: `${server}/jc/common/maintenancePlan/planPage`,
                maintenanceUpdatePlan: `${server}/jc/common/maintenancePlan/updatePlan`,
                maintenanceDeletePlan: `${server}/jc/common/maintenancePlan/`,
                maintenanceDeleteByIds: `${server}/jc/common/maintenancePlan/deleteByIds`,
                getDeviceByDeptCode: `${server}/jc/common/maintenancePlan/getDeviceByDeptCode`,
                generatorMaint: `${server}/jc/common//maintenancePlan/generatorMaint`,

            },
            /**点检查询**/
            checkQuery: {
                deviceDetailPage: `${server}/jc/common/deviceSpotCheckQuery/deviceDetailPage`,
                deviceDetail: `${server}/jc/common/deviceSpotCheckQuery/deviceRecordDetail`
            },
            /**点检计划**/
            SpotcheckPlan: {
                SpotcheckPlan1: `${server}/jc/common/SpotcheckPlan`,
                update: `${server}/jc/common/SpotcheckPlan/update`,
                deleteByCode: `${server}/jc/common/SpotcheckPlan/deleteByCode`,
                getAddMsg: `${server}/jc/common/SpotcheckPlan/getAddMsg`,
                page: `${server}/jc/common/SpotcheckPlan/page`,
                getDeviceCount: `${server}/jc/common/SpotcheckPlan/getDeviceCount`,
            },
            /**巡检模板**/
            devicePatrolModel: {
                add: `${server}/jc/common/devicePatrolModel/add`,
                deleteByIds: `${server}/jc/common/devicePatrolModel/deleteByIds`,
                detail: `${server}/jc/common/devicePatrolModel/detail`,
                page: `${server}/jc/common/devicePatrolModel/page`,
                update: `${server}/jc/common/devicePatrolModel/update`,
                delete: `${server}/jc/common/devicePatrolModel/{id}`,
                position: `${server}/jc/common/basicInfoLocation/getPage`,
                getAllByDeptCode: `${server}/jc/common/devicePatrolModel/getAllByDeptCode`
            },
            devicePatrolQuery: {
                PatrolQueryDetail: `${server}/jc/common/devicePatrolQuery/detail`,
                PatrolQueryPage: `${server}/jc/common/devicePatrolQuery/page`
            },
            /**点检模板**/
            deviceSpot: {
                addCheck: `${server}/jc/common/deviceSpotCheck/addCheckModel`,
                checkDetail: `${server}/jc/common/deviceSpotCheck/checkModelDetail`,
                deleteDetailId: `${server}/jc/common/deviceSpotCheck/deleteDetailId`,
                deleteByIds: `${server}/jc/common/deviceSpotCheck/deleteByIds`,
                getAllDevices: `${server}/jc/common/deviceSpotCheck/getAllDevices`,
                planPage: `${server}/jc/common/deviceSpotCheck/getPage`,
                updateCheckModel: `${server}/jc/common/deviceSpotCheck/updateCheckModel`,
                upload: `${server}/jc/common/deviceSpotCheck/upload`,
                delete: `${server}/jc/common/deviceSpotCheck`,
                getAllByDeviceName: `${server}/jc/common/deviceSpotCheck/getAllByDeviceName`,
                cancelLoad: `${server}/jc/common/deviceSpotCheck/cancelLoad`,
                getModelByDeviceName: `${server}/jc/common/deviceSpotCheck/getModelByDeviceName`
            },
            /**巡检计划 */
            devicePatrolPlan: {
                add: `${server}/jc/common/devicePatrolPlan/add`,
                detail: `${server}/jc/common/devicePatrolPlan/detail`,
                page: `${server}/jc/common/devicePatrolPlan/page`,
                update: `${server}/jc/common/devicePatrolPlan/update`,
                delete: `${server}/jc/common/devicePatrolPlan/delete`,
                deleteByIds: `${server}/jc/common/devicePatrolPlan/deleteByIds`
            },
            deviceRepair: {
                getRepairTable: `${server}/jc/common/deviceRepair/getRepairByDeptCodeAndDeviceId`,
                getRepairDetail: `${server}/jc/common/deviceRepair/deviceRepairApplication`,
            },
            /**批次信息 */
            productionBatchInfo: {
                getAll: `${server}/jc/common/productionBatchInfo/getAllInfo`,
                deleteOne: `${server}/jc/common/productionBatchInfo/delOneByCode`,
                deletes: `${server}/jc/common/productionBatchInfo/delSomeByCodes`,
                addOne: `${server}/jc/common/productionBatchInfo/addOne`,
                updateOne: `${server}/jc/common/productionBatchInfo/updateByCode`,
                getAddRule: `${server}/jc/common/productionBatchRule/getAllInfos`,
                getAllRule: `${server}/jc/common/productionBatchRule/getAll`,
                save: `${server}/jc/common/productionBatchInfo/save`,
                getAllInfoByCondition: `${server}/jc/common/productionBatchInfo/getAllInfoByCondition`,
                ByCode: `${server}/jc/common/productionBatchInfo/ByCode`,
                preview: `${server}/jc/common/productionBatchInfo/preview`,
                getDetail: `${server}/jc/common/productionBatchInfo/getDetail`,
                getInstrument: `${server}/jc/common/productionBatchInfo/getInstrument`,
                getInstrumentChart: `${server}/jc/common/productionBatchInfo/getInstrumentChart`,
                getBatchNumber: `${server}/jc/common/productionBatchInfo/getBatchNumber`
            },

            /**批次追溯*/
            productionBatchRetrospect: {
                page: `${server}/jc/common/productionBatchRetrospect/page`
            },
            /**批次规则 */
            productionBatchRule: {
                getAll: `${server}/jc/common/productionBatchRule/getAll`,
                getDetail: `${server}/jc/common/productionBatchRule/getDetail`,
                updateAll: `${server}/jc/common/productionBatchRule/updateAll`,
                updateState: `${server}/jc/common/productionBatchRule/UpdateState`,
                getAllInfos: `${server}/jc/common/productionBatchRule/getAllInfos`

            },
            /**统计周期 */
            staticPeriod: {
                add: `${server}/jc/common/precursorBasicDataStatPeriod/add`,
                all: `${server}/jc/common/precursorBasicDataStatPeriod/all`,
                delete: `${server}/jc/common/precursorBasicDataStatPeriod/delete`,
                page: `${server}/jc/common/precursorBasicDataStatPeriod/page`,
                update: `${server}/jc/common/precursorBasicDataStatPeriod/update`,
                getRecordById: `${server}/jc/common/precursorBasicDataStatPeriod/getRecordById`
            },
            /**生产线 */
            precursorProductionLine: {
                add: `${server}/jc/common/precursorProductionLine/add`,
                all: `${server}/jc/common/precursorProductionLine/all`,
                delete: `${server}/jc/common/precursorProductionLine/delete`,
                page: `${server}/jc/common/precursorProductionLine/page`,
                update: `${server}/jc/common/precursorProductionLine/update`,
                getRecordById: `${server}/jc/common/precursorProductionLine/getRecordById`
            },
            /**工序名称 */
            precursorProcessType: {
                add: `${server}/jc/common/precursorProcessType/add`,
                all: `${server}/jc/common/precursorProcessType/all`,
                delete: `${server}/jc/common/precursorProcessType/delete`,
                page: `${server}/jc/common/precursorProcessType/page`,
                update: `${server}/jc/common/precursorProcessType/update`,
                getByType: `${server}/jc/common/precursorProcessType/getByType`//根据主材辅材选择工序
            },
            /**物料产线权重分配 */
            precursorMaterialLineWeight: {
                add: `${server}/jc/common/precursorMaterialLineWeight/add`,
                delete: `${server}/jc/common/precursorMaterialLineWeight/delete`,
                ids: `${server}/jc/common/precursorMaterialLineWeight/ids`,
                page: `${server}/jc/common/precursorMaterialLineWeight/page`,
                update: `${server}/jc/common/precursorMaterialLineWeight/update`,
                getMaterialName: `${server}/jc/common/precursorMaterialLineWeight/getMaterialName`,
                getRecordById: `${server}/jc/common/precursorMaterialLineWeight/getRecordById`
            },
            /**物料名称 */
            precursorMaterialDetails: {
                add: `${server}/jc/common/precursorMaterialDetails/add`,
                delete: `${server}/jc/common/precursorMaterialDetails/delete`,
                ids: `${server}/jc/common/precursorMaterialDetails/ids`,
                page: `${server}/jc/common/precursorMaterialDetails/page`,
                update: `${server}/jc/common/precursorMaterialDetails/update`,
                getProcess: `${server}/jc/common/precursorMaterialDetails/getProcess`,
                getRecordById: `${server}/jc/common/precursorMaterialDetails/getRecordById`,
                all: `${server}/jc/common/precursorMaterialDetails/all`,
                getMaterialByProcessType: `${server}/jc/common/precursorMaterialDetails/getMaterialByProcessType`,
                byTypes: `${server}/jc/common/precursorMaterialDetails/byTypes`
            },
            /**物料plc映射 */
            matPlcMap: {
                matPlcMap: `${server}/jc/common/matPlcMap`,
                ids: `${server}/jc/common/matPlcMap/ids`,
                page: `${server}/jc/common/matPlcMap/page`,
                getRecordById: `${server}/jc/common/matPlcMap/getRecordById`
            },
            /**PLC地址 */
            plcAddress: {
                plcAddress: `${server}/jc/common/plcAddress`,
                ids: `${server}/jc/common/plcAddress/ids`,
                getRecordById: `${server}/jc/common/plcAddress/getRecordById`,
                all: `${server}/jc/common/plcAddress/all`
            },
            /**VGA */
            vga: {
                vga: `${server}/jc/common/vga`,
                ids: `${server}/jc/common/vga/ids`,
                page: `${server}/jc/common/vga/page`,
                getRecordById: `${server}/jc/common/vga/getRecordById`
            },
            /**VGA权重分配 */
            vgaMap: {
                vgaMap: `${server}/jc/common/vgaMap`,
                ids: `${server}/jc/common/vgaMap/ids`,
                page: `${server}/jc/common/vgaMap/page`,
                getInfoByVgaId: `${server}/jc/common/vgaMap/getInfoByVgaId`
            },
            /**设备工序*/
            deviceProcess: {
                getAll: `${server}/jc/common/deviceProcess/getAllProcedure`,
                getPageByProcessDeptId: `${server}/jc/common/deviceProcess/getPageByProcessDeptId`,
                getDeviceAssignment: `${server}/jc/common/deviceProcess/getDeviceAssign`,
                assign: `${server}/jc/common/deviceProcess/assign`,
                getAllByDept: `${server}/jc/common/deptProcess/getAllByDept`,
                getDeviceByDeptCode: `${server}/jc/common/deviceProcess/getDeviceByDeptCode`,
            },
            /**出库点*/
            endPosition: {
                getAllByOutType: `${server}/jc/common/endPosition`
            },
            /**材料类别 */
            precursorMaterialType: {
                add: `${server}/jc/common/precursorMaterialType/add`,
                all: `${server}/jc/common/precursorMaterialType/all`,
                delete: `${server}/jc/common/precursorMaterialType/delete`,
                getRecordById: `${server}/jc/common/precursorMaterialType/getRecordById`,
                getRecordsByTypes: `${server}/jc/common/precursorMaterialType/getRecordsByTypes`,
                ids: `${server}/jc/common/precursorMaterialType/ids`,
                page: `${server}/jc/common/precursorMaterialType/page`,
                update: `${server}/jc/common/precursorMaterialType/update`,
            },
            /**生产线合成槽对照表 */
            techLineCellMap: {
                add: `${server}/jc/common/techLineCellMap/add`,
                delete: `${server}/jc/common/techLineCellMap/delete`,
                getRecordById: `${server}/jc/common/techLineCellMap/getRecordById`,
                ids: `${server}/jc/common/techLineCellMap/ids`,
                page: `${server}/jc/common/techLineCellMap/page`,
                update: `${server}/jc/common/techLineCellMap/update`,
                byIds: `${server}/jc/common/techLineCellMap/byIds`
            },
            /**原材料名称 */
            precursorRawMaterial: {
                add: `${server}/jc/common/precursorRawMaterial/add`,
                deleteById: `${server}/jc/common/precursorRawMaterial/deleteById`,
                deleteByIds: `${server}/jc/common/precursorRawMaterial/deleteByIds`,
                getOne: `${server}/jc/common/precursorRawMaterial/getOne`,
                page: `${server}/jc/common/precursorRawMaterial/page`,
                update: `${server}/jc/common/precursorRawMaterial/update`,
                all: `${server}/jc/common/precursorRawMaterial/all`,
                byType: `${server}/jc/common/precursorRawMaterial/byType`,
                byDataType: `${server}/jc/common/precursorRawMaterial/getByDatatype`
            },
            /**原材料产线权重分配*/
            precursorRawmaterialLineWeight: {
                page: `${server}/jc/common/precursorRawmaterialLineWeight/page`,
                ids: `${server}/jc/common/precursorRawmaterialLineWeight/ids`,
                delete: `${server}/jc/common/precursorRawmaterialLineWeight/delete`,
                add: `${server}/jc/common/precursorRawmaterialLineWeight/add`,
                getRecordById: `${server}/jc/common/precursorRawmaterialLineWeight/getRecordById`,
                update: `${server}/jc/common/precursorRawmaterialLineWeight/update`
            },
            /**合成槽体积値*/
            precursorCompoundCellVolumes: {
                page: `${server}/jc/common/precursorCompoundCellVolumes/page`,
                ids: `${server}/jc/common/precursorCompoundCellVolumes/ids`,
                delete: `${server}/jc/common/precursorCompoundCellVolumes/delete`,
                getRecordById: `${server}/jc/common/precursorCompoundCellVolumes/getRecordById`,
                update: `${server}/jc/common/precursorCompoundCellVolumes/update`,
                add: `${server}/jc/common/precursorCompoundCellVolumes/add`,
                getHC: `${server}/jc/common/precursorMaterialDetails/getHC`
            },
            /**前驱体在制品统计*/
            precursorGoodIn: {
                getPendSubmit: `${server}/jc/common/goodIn/page`,
                getStatisticPage: `${server}/jc/common/goodIn/statisticPage`,
                getAnalysisProcess: `${server}/jc/common/goodIn/analysisProcess`,//获取统计分析的工序分析
                getAnalysisLine: `${server}/jc/common/goodIn/analysisLine`,//获取统计分析的产线分析
                getLineNameByPeriod: `${server}/jc/common/goodIn/getLineNameByPeriod`,//获取期数
                addComfirm: `${server}/jc/common/goodIn/addComfirm`,//新增确认
                afterComfirm: `${server}/jc/common/goodIn/afterComfirm`,//新增确认后
                getLastPotencyByProcessId: `${server}/jc/common/goodIn/getLastPotencyByProcessId`,//获取上期浓度
                statisticDetail: `${server}/jc/common/goodIn/statisticDetail`,
                saveOrCommit: `${server}/jc/common/goodIn/saveOrCommit`,//点击保存提交
                commitDetail: `${server}/jc/common/goodIn/commitDetail`,//待提交编辑详情
                delete: `${server}/jc/common/goodIn`,
                getStartTime: `${server}/jc/common/goodIn/getStartTime`,
                processCompare: `${server}/jc/common/goodIn/processCompare`,
                lineCompare: `${server}/jc/common/goodIn/lineCompare`,
                getVolume: `${server}/jc/common/goodIn/getVolumeWeight` //获取体积
            },

            /**异常处理模块*/
            techException: {
                getAll: `${server}/jc/common/techException/getAll`,
                page: `${server}/jc/common/techException/page`,
                techException: `${server}/jc/common/techException`,
                deleteByIds: `${server}/jc/common/techException/ids`,
            },
            /**物料基础*/
            materialInfo: {
                page: `${server}/jc/repo/materialInfo/pages`,
                add: `${server}/jc/repo/materialInfo/add`,
                materialInfo: `${server}/jc/repo/materialInfo`,
                all: `${server}/jc/repo/materialInfo/all`,
            },
            /**物料类型*/
            materialType: {
                all: `${server}/jc/repo/type/tree`,
            },
            /**前驱体原料领用*/
            rawMaterial: {
                detail: `${server}/jc/common/materialDeliveryStatistic/detail`,
                getDate: `${server}/jc/common/materialDeliveryStatistic/getDate`,
                byLineStat: `${server}/jc/common/materialDeliveryStatistic/byLineStat`,
                statDetail: `${server}/jc/common/materialDeliveryStatistic/statDetail`,
                saveOrCommit: `${server}/jc/common/materialDeliveryStatistic/save`,
                getUncommittedData: `${server}/jc/common/materialDeliveryStatistic/uncommitted`,
                getCommittedData: `${server}/jc/common/materialDeliveryStatistic/statistic`,
                deleteById: `${server}/jc/common/materialDeliveryStatistic/deleteByStatCode`,
                period: `${server}/jc/common/materialDeliveryStatistic/period`,
                getAddData: `${server}/jc/common/materialDeliveryStatistic/add`,
                periodCompare: `${server}/jc/common/materialDeliveryStatistic/periodCompare`,
                lineCompare: `${server}/jc/common/materialDeliveryStatistic/lineCompare`,
                supplementary: `${server}/jc/common/materialDeliveryStatistic/supplementary`,
                getStockOutData: `${server}/jc/common/materialDeliveryStatistic/stockOutData`,
                getPeriodAndTime: `${server}/jc/common/materialDeliveryStatistic/getPeriodAndTime`,
                lastPeriodConcentrations: `${server}/jc/common/materialDeliveryStatistic/lastPeriodConcentrations`,
            },
            /**部门分配工序（工序名称）*/
            equipmentProcessName: {
                deptProcess: `${server}/jc/common/deptProcess`,
                page: `${server}/jc/common/deptProcess/page`,
                deleteByIds: `${server}/jc/common/deptProcess/ids`
            },
            /**用户工序名称*/
            userProcessName: {
                userProcess: `${server}/jc/common/userProcess`,
            },
            /**工艺参数*/
            processParam: {
                page: `${server}/jc/common/processParam/page`,
                delete: `${server}/jc/common/processParam/delete`,
                detail: `${server}/jc/common/processParam/detail`,
                publish: `${server}/jc/common/processParam/publish`,
                detailByBatch: `${server}/jc/common/processParam/detailByBatch`,
                saveOrCommit: `${server}/jc/common/processParam/saveOrcommit`,
                deleteByIds: `${server}/jc/common/processParam/deleteByIds`,
                mixRecipe: `${server}/jc/common/processParam/mixRecipeList`, //混合盐读取配方
                compoundRecipe: `${server}/jc/common/processParam/compoundRecipeList`,
            },
            /**正极基础统计周期*/
            positiveStatic: {
                all: `${server}/jc/common/anodeBasicDataStatPeriod/all`,
                add: `${server}/jc/common/anodeBasicDataStatPeriod/add`,
                update: `${server}/jc/common/anodeBasicDataStatPeriod/update`,
                delete: `${server}/jc/common/anodeBasicDataStatPeriod/delete`
            },
            /**正极基础生产线*/
            positiveProductline: {
                all: `${server}/jc/common/anodeProductionLine/all`,
                add: `${server}/jc/common/anodeProductionLine/add`,
                update: `${server}/jc/common/anodeProductionLine/update`,
                delete: `${server}/jc/common/anodeProductionLine/delete`,
                byFlag:`${server}/jc/common/anodeProductionLine/byFlag`
            },
            /**正极基础工序*/
            positiveProcess: {
                all: `${server}/jc/common/anodeProcessType/all`,
                add: `${server}/jc/common/anodeProcessType/add`,
                update: `${server}/jc/common/anodeProcessType/update`,
                delete: `${server}/jc/common/anodeProcessType/delete`,
                page: `${server}/jc/common/anodeProcessType/page`
            },
            /**正极基础物料种类*/
            positiveMaterialType: {
                all: `${server}/jc/common/anodeMaterialTypes/all`,
                add: `${server}/jc/common/anodeMaterialTypes/add`,
                update: `${server}/jc/common/anodeMaterialTypes/update`,
                delete: `${server}/jc/common/anodeMaterialTypes/delete`,
                page: `${server}/jc/common/anodeMaterialTypes/page`
            },
            /**正极基础plc地址*/
            positivePlcSddress: {
                all: `${server}/jc/common/anodePlcAddress/all`,
                add: `${server}/jc/common/anodePlcAddress/add`,
                update: `${server}/jc/common/anodePlcAddress/update`,
                delete: `${server}/jc/common/anodePlcAddress/delete`,
                page: `${server}/jc/common/anodePlcAddress/page`,
                ids: `${server}/jc/common/anodePlcAddress/ids`,
                getRecordById: `${server}/jc/common/anodePlcAddress/getRecordById`
            },
            /**正及基础物料种类plc仪表对照*/
            positivePlcCompare: {
                all: `${server}/jc/common/anodeMatPlcMap/all`,
                add: `${server}/jc/common/anodeMatPlcMap/add`,
                update: `${server}/jc/common/anodeMatPlcMap/update`,
                delete: `${server}/jc/common/anodeMatPlcMap/delete`,
                page: `${server}/jc/common/anodeMatPlcMap/page`,
                ids: `${server}/jc/common/anodeMatPlcMap/ids`
            },
            /**正极产品型号*/
            positiveModel: {
                all: `${server}/jc/common/anodeProductionType/all`,
                add: `${server}/jc/common/anodeProductionType/add`,
                delete: `${server}/jc/common/anodeProductionType/delete`,
                update: `${server}/jc/common/anodeProductionType/update`
            },
            /**正极其他数据*/
            positiveOther: {
                getCurrent: `${server}/jc/common/anodeOthers/getCurrent`,
                add: `${server}/jc/common/anodeOthers/add`,
                update: `${server}/jc/common/anodeOthers/update`
            },
            /**前驱体辅料统计*/
            auxiliary: {
                getDate: `${server}/jc/common/auxiliary/getDate`,
                auxiliary: `${server}/jc/common/auxiliary`,
                detail: `${server}/jc/common/auxiliary/detail`,
                getPageUnCommit: `${server}/jc/common/auxiliary/getPageUnCommit`,
                getPageCommit: `${server}/jc/common/auxiliary/getPageCommit`,
                nextPeroidNumber: `${server}/jc/common/auxiliary/nextPeroidNumber`,
                addConfirm: `${server}/jc/common/auxiliary/addComfirm`,
                afterConfirm: `${server}/jc/common/auxiliary/afterComfirm`,
                lineCur: `${server}/jc/common/auxiliary/lineCur`,
                processCur: `${server}/jc/common/auxiliary/processCur`,
                saveOrCommit: `${server}/jc/common/auxiliary/saveOrCommit`,
                stasticByLine: `${server}/jc/common/auxiliary/stasticByLine`,
                stasticByProcess: `${server}/jc/common/auxiliary/stasticByProcess`,
                getVolumeWeight: `${server}/jc/common/goodIn/getVolumeWeight`
            },
            /**成品入库*/
            productStorage: {
                getDate: `${server}/jc/common/productStorage/getDate`,
                delete: `${server}/jc/common/productStorage/delete`,
                getAllBatch: `${server}/jc/common/productStorage/getAllBatch`,
                detail: `${server}/jc/common/productStorage/detail`,
                periodCur: `${server}/jc/common/productStorage/periodCur`,
                editDetail: `${server}/jc/common/productStorage/editDetail`,
                getPageUnCommit: `${server}/jc/common/productStorage/pageUnCommit`,
                getPageCommit: `${server}/jc/common/productStorage/pageCommit`,
                nextPeriod: `${server}/jc/common/productStorage/nextPeriod`,
                addConfirm: `${server}/jc/common/productStorage/addComfirm`,
                afterConfirm: `${server}/jc/common/productStorage/afterComfirm`,
                lineCur: `${server}/jc/common/productStorage/lineCur`,
                processCur: `${server}/jc/common/productStorage/processCur`,
                saveOrCommit: `${server}/jc/common/productStorage/saveOrCommit`,
                stasticByLine: `${server}/jc/common/productStorage/stasticByLine`,
                getPeriodAndTime: `${server}/jc/common/productStorage/getPeriodAndTime`,
                stasticByProcess: `${server}/jc/common/productStorage/stasticByProcess`,
            },
            /**质量基础受检物料*/
            testMaterial: {
                page: `${server}/jc/common/detectItem/page`,
                add: `${server}/jc/common/detectItem`,
                ids: `${server}/jc/common/detectItem/deleteByIds`,
                all: `${server}/jc/common/detectItem/all`
            },
            /**前驱体成本核算*/
            costAccount: {
                getDate: `${server}/jc/common/precursorCostAccount/getStartDate`,
                mainMatConfirm: `${server}/jc/common/precursorCostAccount/mainMatConfirm`,
                auxMatConfirm: `${server}/jc/common/precursorCostAccount/auxMatConfirm`
            },
            /**火法质量基础-编号规则*/
            fireMageNumber:`${server}/jc/common/fireMageNumber`,

            /**火法质量操作手册*/
            fireMageOperation:`${server}/jc/common/fireMageOperation`,

            /**火法质量检验项目*/
            fireMageTestItems:`${server}/jc/common/fireMageTestItems`,

            /**批次基础数据*/
            batchConfig: `${server}/jc/common/batchConfig`,

            /**火法质量基础数据送检部门*/
            fireMageDept: {
                page: `${server}/jc/common/fireMageDept/page`,
                add: `${server}/jc/common/fireMageDept`,
                ids: `${server}/jc/common/fireMageDept/ids`,
                getAll: `${server}/jc/common/fireMageDept/getAll`
            },
            /** 送检登记 */
            fireInsRegister: {
                add: `${server}/jc/common/fireMageCheck/add`,
                check: `${server}/jc/common/fireMageCheck/check`,
                detail: `${server}/jc/common/fireMageCheck/detail`,
                page: `${server}/jc/common/fireMageCheck/page`,
                getAllInfos: `${server}/jc/common/fireMageNumber/getAllInfos`,
                getAllItems: `${server}/jc/common/fireMageTestItems/getAll`,
                getAllDepts: `${server}/jc/common/fireMageDept/getAll`,
                getItemsByCode: `${server}/jc/common/fireMageTestItems/getAllByProcessByProdut`,
            },
            /** 样品接收 */
            fireInsSamRec: {
                page: `${server}/jc/common/sampleReceive/page`,
                deleteIds: `${server}/jc/common/sampleReceive/ids`,
                detail: `${server}/jc/common/sampleReceive/detail`,
                sampleReceive: `${server}/jc/common/sampleReceive`,
                print: `${server}/jc/common/sampleReceive/print`,
            },
            /**批号与检测项目*/
            fireMageBatchItems:`${server}/jc/common/fireMageBatchItems`,

            /**标签与检测项目*/
            fireMageLabel:`${server}/jc/common/fireMageLabel`,

            /**正极前驱体在制品*/
            positiveProcessStatis:{
                addComfirm:`${server}/jc/common/anodeGoodin/addComfirm`,
                afterComfirm:`${server}/jc/common/anodeGoodin/afterComfirm`,
                getNextPeriods:`${server}/jc/common/anodeGoodin/getNextPeriods`,
                unCommitPage:`${server}/jc/common/anodeGoodin/unCommitPage`,
                commitPage:`${server}/jc/common/anodeGoodin/commitPage`,
                saveOrCommit:`${server}/jc/common/anodeGoodin/saveOrCommit`,
                delete:`${server}/jc/common/anodeGoodin`,
                statisticLine:`${server}/jc/common/anodeGoodin/statisticLine`,
                statisticProcess:`${server}/jc/common/anodeGoodin/statisticProcess`,
                commitDetail:`${server}/jc/common/anodeGoodin/commitDetail`,
                getDateByPeriodId:`${server}/jc/common/anodeGoodin/getDateByPeriodId`,
                lineCompare:`${server}/jc/common/anodeGoodin/lineCompare`,
                processCompare:`${server}/jc/common/anodeGoodin/processCompare`
            },

            /**动力点检-点检项目*/
            checkItem: {
                add: `${server}/jc/common/checkItem/add`,
                pages: `${server}/jc/common/checkItem/page`,
                update: `${server}/jc/common/checkItem/update`,
                byId: `${server}/jc/common/checkItem/byId`,
                byIds: `${server}/jc/common/checkItem/byIds`,
                delete: `${server}/jc/common/checkItem/delete`,
                deletes: `${server}/jc/common/checkItem/deletes`,
                getItems: `${server}/jc/common/checkItem/getItems`,
                getPlace: `${server}/jc/common/checkItem/getPlace`,
            },

            /**动力点检-点检站点*/
            checkSite: {
                all: `${server}/jc/common/checkSite/all`,
                page: `${server}/jc/common/checkSite/page`,
                add: `${server}/jc/common/checkSite/add`,
                update: `${server}/jc/common/checkSite/update`,
                delete: `${server}/jc/common/checkSite/delete`,
                deletes: `${server}/jc/common/checkSite/deletes`,
                detail: `${server}/jc/common/checkSite/detail`,
            },
            /**动力点检-动力点检*/
            checkRecord: {
                page: `${server}/jc/common/checkRecord/page`,
                add: `${server}/jc/common/checkRecord/add`,
                update: `${server}/jc/common/checkRecord/update`,
                delete: `${server}/jc/common/checkRecord/delete`,
                deletes: `${server}/jc/common/checkRecord/deletes`,
                detail: `${server}/jc/common/checkRecord/detail`,
                getOperator: `${server}/jc/common/checkRecord/getOperator`,
            },

            /**动力点检-点检模版*/
            checkModel: {
                page: `${server}/jc/common/checkModel/page`,
                add: `${server}/jc/common/checkModel/add`,
                update: `${server}/jc/common/checkModel/update`,
                delete: `${server}/jc/common/checkModel/delete`,
                deletes: `${server}/jc/common/checkModel/deletes`,
                detail: `${server}/jc/common/checkModel/detail`,
                bySiteCode: `${server}/jc/common/checkModel/bySiteCode`,
            },
            /**火法质量-检验管理-数据采集*/
            dateConllection:{
                page:`${server}/jc/common/dateConllection/page`,
                getByProcessByProduct:`${server}/jc/common/dateConllection/getByProcessByProduct`,
                export:`${server}/jc/common/dateConllection/export`,
                import1:`${server}/jc/common/dateConllection/import`,
                import:`${server}/jc/common/dateConllection/import`
            },

            /**火法质量-检验管理-数据整理*/
            dataReorganize:{
                page:`${server}/jc/common/dataReorganize/page`,
                detail: `${server}/jc/common/dataReorganize/detail`,
                import: `${server}/jc/common/dataReorganize/import`,
                export: `${server}/jc/common/dataReorganize/export`,
            },
            /**正极成本核算*/
            anodeCostAccount:{
                getDate:`${server}/jc/common/anodeCostAccount/getDate`,
                confirm:`${server}/jc/common/anodeCostAccount/confirm`
            },
            /**进出流水*/
            repoRecordWater:{
                inPages:`${server}/jc/repo/SwmsStockInJournalAccount/pages`,
                outPages:`${server}/jc/repo/SwmsStockOutJournalAccount/pages`
            },
            /**进出台帐*/
            repoRecordAccount:{
                inPages:`${server}/jc/repo/SwmsStockInLedgers/pages`,
                outPages:`${server}/jc/repo/SwmsStockOutLedgers/pages`
            },
            /**进出日报*/
            repoQueryInOutDaily:{
                pagesIn:`${server}/jc/repo/SwmsStockInOutLedgersDayReports/pagesIn`,
                pagesOut:`${server}/jc/repo/SwmsStockInOutLedgersDayReports/pagesOut`
            },
            /**智能仓库-基础数据-供应商 */
            supplier: {
                pages: `${server}/jc/repo/SwmsBasicSupplierInfo/pages`,
                supplier: `${server}/jc/repo/SwmsBasicSupplierInfo`,
                getAll: `${server}/jc/repo/SwmsBasicSupplierInfo/getAll`
            },
            /**智能仓库-基础数据-车间信息 */
            plant: {
                pages: `${server}/jc/repo/swmsBasicPlanInfo/pages`,
                plant: `${server}/jc/repo/swmsBasicPlanInfo`
            },
            /**智能仓库-基础数据-物料大类 */
            material: {
                pages: `${server}/jc/repo/swmsBasicMaterialType/pages`,
                material: `${server}/jc/repo/swmsBasicMaterialType`,
                getAll: `${server}/jc/repo/swmsBasicMaterialType/getAll`
            },
            /**智能仓库-基础数据-物料小类 */
            subMaterial: {
                pages: `${server}/jc/repo/swmsBasicMaterialSubType/pages`,
                subMaterial: `${server}/jc/repo/swmsBasicMaterialSubType`,
                getAll: `${server}/jc/repo/swmsBasicMaterialSubType/getAll`
            },
            /**智能仓库-基础数据-物料信息 */
            materialInfoSto: {
                pages: `${server}/jc/repo/SwmsBasicMaterialInfo/pages`,
                materialInfo: `${server}/jc/repo/SwmsBasicMaterialInfo`
            },
            /**智能仓库-基础数据-计量单位 */
            unit: {
                pages: `${server}/jc/repo/SwmsBasicMeasureUnit/pages`,
                unit: `${server}/jc/repo/SwmsBasicMeasureUnit`
            },
            /**仓库-基础-出库点*/
            swmsBasicDeliveryAddressInfo:`${server}/jc/repo/swmsBasicDeliveryAddressInfo`,
             /**仓库-基础-出库类别*/
            swmsBasicDeliveryTypeInfo:`${server}/jc/repo/swmsBasicDeliveryTypeInfo`,
            /**仓库-基础-安全库存*/
            swmsBasicSafetyStock:`${server}/jc/repo/swmsBasicSafetyStock`,
            /**仓库-基础-计量单位*/
            SwmsBasicMeasureUnit:`${server}/jc/repo/SwmsBasicMeasureUnit`,
            /**仓库-基础-呆滞期限*/
            swmsBasicInactionStockDeadline:`${server}/jc/repo/swmsBasicInactionStockDeadline`,
            swmsStockAgeStatistic:{
                distribution:`${server}/jc/repo/swmsStockAgeStatistic/distribution`,
                turnoverRate:`${server}/jc/repo/swmsStockAgeStatistic/turnoverRate`
            }
    };

        localStorage.setItem('status', JSON.stringify(status));
        localStorage.setItem('dataType', JSON.stringify(dataType));
        localStorage.setItem('url', JSON.stringify(url))
    }

    /**控制登陆背景图 */
    componentDidMount() {
        let showFrame = setInterval(function () {
            let frame = window.frame;
            if (frame !== undefined && frame !== null) {
                frame(0);   //消除帧
                clearInterval(showFrame);
            }
        }, 500)
    }

    /**登出时，使登陆背景动图显示 */
    render() {
        const userName = JSON.parse(localStorage.getItem('menuList')) ? JSON.parse(localStorage.getItem('menuList')).name : null;
        const userId = JSON.parse(localStorage.getItem('menuList')) ? JSON.parse(localStorage.getItem('menuList')).userId : null;
        return (
            <div className="parent">
                <Top userId={userId} userName={userName}/>
                <Left/>
                <Right/>
            </div>
        );
    }
}

export default Home;
