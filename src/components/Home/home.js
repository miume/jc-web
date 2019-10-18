import React, { Component } from 'react';
import './home.css';
import Top from './top';
import Left from './left';
import Right from './right';
class Home extends Component {
    componentWillMount() {
        let canvas;
        let showCanvas = setInterval(function() {
            canvas = document.getElementById('defaultCanvas0');
            if(canvas !== null && canvas !== undefined) {
                canvas.style.visibility='hidden';
                clearInterval(showCanvas);
            }
        },100)
        /**统一管理status */
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
            '9' : '未完成',
            '10':'进行中',
            '11':'已评价'
        }
        /**统一管理dataType */
        const dataType = {
            '1' : '流程管理',
            '2' : '制程检测',
            '3' : '样品检测',
            '4' : '原材料出库',
            '5' :'成品出库',
            '6' : '红单申请',
            '7' : '进货检验',
            '8' : '成品检验',
            '9' : '原材料检测',
            '10': '中间品检测',
            '11': '不合格评审数据',
            '12': '不合格追踪数据',
            '13':'原材料标准',
            '14':'成品标准',
            '15':'设备指导'
        }
        const server = localStorage.getItem('server');
        this.Authorization = localStorage.getItem('authorization');
        const url = {
            Authorization:this.Authorization,
            passwordChange:`${server}/jc/auth/passwordChange`,
            /**角色管理 */
            role:{
                role:`${server}/jc/auth/role`,
                getAll:`${server}/jc/auth/role/getAll`,
                getAuths:`${server}/jc/auth/role/getAuths`,
                getUsersOfRole:`${server}/jc/auth/role/usersOfRole`,
                getRolesByPage:`${server}/jc/auth/role/byNameLikeByPage`,
                addOneOperation:`${server}/jc/auth/role/addAuthority`,
                search:`${server}/jc/auth/role/getRolesByNameLikeByPage`,
                assignRoleToUser:`${server}/jc/auth/role/assignRoleToUser`,
                deleteOneOperation:`${server}/jc/auth/role/removeAuthority`,
            },
            /**菜单管理 */
            menu:{
                getAll:`${server}/jc/auth/menu/recursive`,
                add:`${server}/jc/auth/menu`,
                deleteByIds:`${server}/jc/auth/menu/batchDelete`,
                findByParentNameLikeByPage:`${server}/jc/auth/menu/byFatherNameLikeByPage`,
                findAllByPage:`${server}/jc/auth/menu/byNameLikeByPage`,
                findByMenuType:`${server}/jc/auth/menu/byType`,
            },
            /**盘库管理*/
            libraryManage:{
                getAll:`${server}/jc/common/RepoDiffRecord`,
                getAllLikeByPage:`${server}/jc/common/RepoDiffRecord/getByMaterialNameLike`,
                getAllByPage:`${server}/jc/common/RepoDiffRecord/pages`,
                getAllPage:`${server}/jc/common/RepoStock`,
                getAllName:`${server}/jc/common/RepoStock/names`,
                oneKeyStock:`${server}/jc/common/RepoStock/oneKeyStock`,
                getAllPages:`${server}/jc/common/RepoStock/pages`,
                realStock:`${server}/jc/common/sortout/realStock`,
                stock:`${server}/jc/common/RepoDiffRecord/stock`
            },
            process:{
                process:`${server}/jc/common/batchAuditTask/validTasks`
            },
            /**权限模块，用户 */
            authUser:{
                getAll:`${server}/jc/common/authUser/getAll`,
                getAllById:`${server}/jc/common/authUser/getById`
            },
            /**权限模块，app用户 */
            appUserAuth:{
                getAllAuth:`${server}/jc/common/appUserAuth/getAllAuth`,
                getAuthByUserId:`${server}/jc/common/appUserAuth/getAuthByUserId`,
                update:`${server}/jc/common/appUserAuth/update`,
                getUser:`${server}/jc/common/appUserAuth/getUser`,
                assign:`${server}/jc/common/appUserAuth/assign`,
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
                rawStandard:`${server}/jc/common/sampleDeliveringRecord/rawStandard`
            },
            /**设备指导 */
            instructor:{
                deletePic:`${server}/jc/common/instructor/deletePic`,
                uploadPic:`${server}/jc/common/instructor/uploadPic`,
                instructorAll:`${server}/jc/common/instructor`
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
                reset:`${server}/jc/auth/user/reset`,

            },
            /**部门管理 */
            department:{
                byNameLikeByPage:`${server}/jc/auth/department/byNameLikeByPage`,
                department:`${server}/jc/auth/department`,
                batchDelete:`${server}/jc/auth/department/batchDelete`,
                // update:`${server}/jc/auth/department/update`,
                // add:`${server}/jc/auth/department/add`,
                // deleteById:`${server}/jc/auth/department`,
                getAll:`${server}/jc/auth/department`,
            },
            /**设备保养 */
            eqmaintenance:{
                recordPage:`${server}/jc/common/maintenanceRecord/recordPage`,
                deleteByIds:`${server}/jc/common/maintenanceRecord/deleteByIds`,
                addRecord:`${server}/jc/common/maintenanceRecord/addRecord`,
                recordDetail:`${server}/jc/common/maintenanceRecord/recordDetail`,
                records: `${server}/jc/common/maintenanceRecord/records`,
                updateRecord: `${server}/jc/common/maintenanceRecord/updateRecord`,
                maintenanceRecord:`${server}/jc/common/ maintenanceRecord`,
            },
            /**设备维修*/
            equipmentRepair:{
                deviceRepairApplication:`${server}/jc/common/deviceRepair/deviceRepairApplication`,
                evaluations:`${server}/jc/common/deviceRepair/evaluations`,
                getPage:`${server}/jc/common/deviceRepair/getPage`,
            },
            /**位置基础信息*/
            locationBasic:{
                addBasicInfo:`${server}/jc/common/basicInfoLocation/addBasicInfo`,
                deleteByIds:`${server}/jc/common/basicInfoLocation/deleteByIds`,
                getPage:`${server}/jc/common/basicInfoLocation/getPage`,
                maintenanceDetailById:`${server}/jc/common/basicInfoLocation/maintenanceDetailById`,
                updateById:`${server}/jc/common/basicInfoLocation/updateById`,
                basicInfoLocation:`${server}/jc/common/basicInfoLocation`,
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
                getRaw:`${server}/jc/common/repoBaseSerialNumber/allName`,//查询物料、厂商
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
                 preview:`${server}/jc/common/purchaseReportRecord/preview`,
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
                rate: `${server}/jc/common/productRecord/rate`

            },
            /**产品检测 */
            productTestRecord:{
            getByBatchNUmberId:`${server}/jc/common/productTestRecord/batchNumberId`,
            },
            /**不合格审评表 */
            unqualifiedExamineTable:{
                unqualifiedTestReportRecord:`${server}/jc/common/unqualifiedTestReportRecord`,
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
                addNewRaw:`${server}/jc/common/techRawStandard/addRaw`,

            },
            /**产品标准 */
            productStandard:{
                add:`${server}/jc/common/techProductStandard/newClasses`,
                productStandard:`${server}/jc/common/techProductStandard`,
                getAll:`${server}/jc/common/techProductStandard/allClasses`,
                addNewClass:`${server}/jc/common/techProductStandard/newClass`,
            },
            /**成品标准 */
            product:{
                product:`${server}/jc/common/product`,
                addStandard:`${server}/jc/common/product/addStandard`,
                getAllProduct:`${server}/jc/common/product/getAllProduct`,
                getAllStandardByPIdandCId:`${server}/jc/common/product/getAllStandardByPIdandCId`,
                detailByCommonBatchId:`${server}/jc/common/product/detailByCommonBatchId`,
                updateByCommonBatchId:`${server}/jc/common/product/updateByCommonBatchId`,

                productStandard:`${server}/jc/common/techProductStandard`,
                getAll:`${server}/jc/common/techProductStandard/allClasses`,
                addNewClass:`${server}/jc/common/techProductStandard/newClass`,
            },
            /**设备基本厂商*/
            equipmentManufacture:{
                getAllEquipmentManufactute:`${server}/jc/common/equipmentBaseManufacturer/type`
            },
            /**设备基本设备*/
            equipmentBaseInstrument:{
                getAllEquipmentBaseInstrument:`${server}/jc/common/equipmentBaseInstrument`
            },
            /**不合格追踪*/
            unqualifiedTrack:{
                pages:`${server}/jc/common/unqualifiedTracingRecord/pages`,
                unqualifiedTracingRecord:`${server}/jc/common/unqualifiedTracingRecord`
            },
            /**设备管理部门管理*/
            equipmentDept:{
                dept:`${server}/jc/common/dept`
            },
            /**设备保养*/
            eqMaintenanceQuery:{
                recordDetail:`${server}/jc/common/maintenanceRecord/recordDetail`,
                recordPage:`${server}/jc/common/maintenanceRecord/recordPage`,
                recordDelete:`${server}/jc/common/maintenanceRecord`,
            },
            /**设备管理设备档案*/
            equipmentArchive:{
                device:`${server}/jc/common/device`,
                detail:`${server}/jc/common/device/detail`,
                page:`${server}/jc/common/device/page`,
                units:`${server}/jc/common/device/units`,
                accsUnit:`${server}/jc/common/device/accsUnit`,
                addUnit: `${server}/jc/common/device/addUnit`,
                accsMain: `${server}/jc/common/device/accsMain`,
                addMainAcc: `${server}/jc/common/device/addMainAcc`,
                delete: `${server}/jc/common/device/delete`,
                upload: `${server}/jc/common/device/upload`,
                deleteUnits: `${server}/jc/common/device/deleteUnits`,
                addUnitAcc: `${server}/jc/common/device/addUnitAcc`,
                unitDetail: `${server}/jc/common/device/unitDetail`,
                delMainAcc: `${server}/jc/common/device/delMainAcc`,
                delUnitAcc:`${server}/jc/common/device/delUnitAcc`,
                updateMainAccessory: `${server}/jc/common/device/updateMainAccessory`,
                updateUnitAccessory: `${server}/jc/common/device/updateUnitAccessory`,
                updateUnit: `${server}/jc/common/device/updateUnit`,
                deleteUnit: `${server}/jc/common/device/deleteUnit`,
                AccName:`${server}/jc/common/device/getDeviceByAccName`,
                UnitName:`${server}/jc/common/device/getDeviceByUnitName`,
                getAllMainByDeptCodeByDeviceName:`${server}/jc/common/device/getAllMainByDeptCodeByDeviceName`,
                duplicateDeviceAcc:`${server}/jc/common/device/duplicateDeviceAcc`,
                getAllUnitByDeptCodeByDeviceName:`${server}/jc/common/device/getAllUnitByDeptCodeByDeviceName`,
                duplicateDeviceUnit:`${server}/jc/common/device/duplicateDeviceUnit`,
                duplicateUnitAcc:`${server}/jc/common/device/duplicateUnitAcc`,
                duplicateMutipleDevice:`${server}/jc/common/device/duplicateMutipleDevice`,
    },
            /**设备管理状态*/
            equipmentStatus:{
                deviceStatus:`${server}/jc/common/deviceStatus`,
                delete:`${server}/jc/common/deviceStatus/delete`,
                getByNameLike:`${server}/jc/common/deviceStatus/getByNameLike`
            },
            /**项目录入**/
            eqMaintenanceDataEntry:{
                maintenance:`${server}/jc/common/maintenance`,
                addOne:`${server}/jc/common/maintenance/addOne`,
                getAll:`${server}/jc/common/maintenance/getAll`,
                page:`${server}/jc/common/maintenance/page`,
                queryAll:`${server}/jc/common/maintenance/queryAll`,
                deleteIds:`${server}/jc/common/maintenance/deleteIds`,
                maintenanceDetailById:`${server}/jc/common/maintenance/maintenanceDetailById`,
                getAllByDeviceName:`${server}/jc/common/maintenance/getAllByDeviceName`,
            },
            DeviceMaintenancePlan:{
                maintenanceAddPlan:`${server}/jc/common/maintenancePlan/addPlan`,
                maintenancePlanDetail:`${server}/jc/common/maintenancePlan/planDetail`,
                maintenancePlanPage:`${server}/jc/common/maintenancePlan/planPage`,
                maintenanceUpdatePlan:`${server}/jc/common/maintenancePlan/updatePlan`,
                maintenanceDeletePlan:`${server}/jc/common/maintenancePlan/`,
                maintenanceDeleteByIds:`${server}/jc/common/maintenancePlan/deleteByIds`,
                getDeviceByDeptCode:`${server}/jc/common/maintenancePlan/getDeviceByDeptCode`,
                generatorMaint:`${server}/jc/common//maintenancePlan/generatorMaint`,

            },
            /**点检查询**/
            checkQuery:{
                deviceDetailPage:`${server}/jc/common/deviceSpotCheckQuery/deviceDetailPage`,
                deviceDetail:`${server}/jc/common/deviceSpotCheckQuery/deviceRecordDetail`
            },
            /**点检计划**/
            SpotcheckPlan:{
                SpotcheckPlan1:`${server}/jc/common/SpotcheckPlan`,
                update:`${server}/jc/common/SpotcheckPlan/update`,
                deleteByCode:`${server}/jc/common/SpotcheckPlan/deleteByCode`,
                getAddMsg:`${server}/jc/common/SpotcheckPlan/getAddMsg`,
                page:`${server}/jc/common/SpotcheckPlan/page`,
                getDeviceCount:`${server}/jc/common/SpotcheckPlan/getDeviceCount`,
            },
            /**巡检模板**/
            devicePatrolModel:{
                add:`${server}/jc/common/devicePatrolModel/add`,
                deleteByIds:`${server}/jc/common/devicePatrolModel/deleteByIds`,
                detail:`${server}/jc/common/devicePatrolModel/detail`,
                page:`${server}/jc/common/devicePatrolModel/page`,
                update:`${server}/jc/common/devicePatrolModel/update`,
                delete:`${server}/jc/common/devicePatrolModel/{id}`,
                position:`${server}/jc/common/basicInfoLocation/getPage`,
                getAllByDeptCode:`${server}/jc/common/devicePatrolModel/getAllByDeptCode`
            },
            devicePatrolQuery:{
                PatrolQueryDetail:`${server}/jc/common/devicePatrolQuery/detail`,
                PatrolQueryPage:`${server}/jc/common/devicePatrolQuery/page`
            },
            /**点检模板**/
            deviceSpot:{
                addCheck:`${server}/jc/common/deviceSpotCheck/addCheckModel`,
                checkDetail:`${server}/jc/common/deviceSpotCheck/checkModelDetail`,
                deleteDetailId:`${server}/jc/common/deviceSpotCheck/deleteDetailId`,
                deleteByIds:`${server}/jc/common/deviceSpotCheck/deleteByIds`,
                getAllDevices:`${server}/jc/common/deviceSpotCheck/getAllDevices`,
                planPage:`${server}/jc/common/deviceSpotCheck/getPage`,
                updateCheckModel:`${server}/jc/common/deviceSpotCheck/updateCheckModel`,
                upload:`${server}/jc/common/deviceSpotCheck/upload`,
                delete:`${server}/jc/common/deviceSpotCheck`,
                getAllByDeviceName:`${server}/jc/common/deviceSpotCheck/getAllByDeviceName`,
                cancelLoad:`${server}/jc/common/deviceSpotCheck/cancelLoad`,
                getModelByDeviceName:`${server}/jc/common/deviceSpotCheck/getModelByDeviceName`
            },
            /**巡检计划 */
            devicePatrolPlan:{
                add:`${server}/jc/common/devicePatrolPlan/add`,
                detail:`${server}/jc/common/devicePatrolPlan/detail`,
                page:`${server}/jc/common/devicePatrolPlan/page`,
                update:`${server}/jc/common/devicePatrolPlan/update`,
                delete:`${server}/jc/common/devicePatrolPlan/delete`,
                deleteByIds:`${server}/jc/common/devicePatrolPlan/deleteByIds`
            },
            deviceRepair:{
                getRepairTable:`${server}/jc/common/deviceRepair/getRepairByDeptCodeAndDeviceId`,
                getRepairDetail:`${server}/jc/common/deviceRepair/deviceRepairApplication`,
            },

            productionBatchInfo:{
                getAll:`${server}/jc/common/productionBatchInfo/getAllInfo`,
                deleteOne:`${server}/jc/common/productionBatchInfo/delOneByCode`,
                deletes:`${server}/jc/common/productionBatchInfo/delSomeByCodes`,
                addOne:`${server}/jc/common/productionBatchInfo/addOne`,
                updateOne:`${server}/jc/common/productionBatchInfo/updateByCode`,
                getAddRule:`${server}/jc/common/productionBatchRule/getAllInfos`,
                getAllRule:`${server}/jc/common/productionBatchRule/getAll`
            },

            /**批次规则 */
            productionBatchRule:{
                getAll:`${server}/jc/common/productionBatchRule/getAll`,
                getDetail:`${server}/jc/common/productionBatchRule/getDetail`,
                updateAll:`${server}/jc/common/productionBatchRule/updateAll`,
                updateState:`${server}/jc/common/productionBatchRule/UpdateState`,
                getAllInfos: `${server}/jc/common/productionBatchRule/getAllInfos`
            },
            /**统计周期 */
            staticPeriod:{
                add:`${server}/jc/common/precursorBasicDataStatPeriod/add`,
                all:`${server}/jc/common/precursorBasicDataStatPeriod/all`,
                delete:`${server}/jc/common/precursorBasicDataStatPeriod/delete`,
                page:`${server}/jc/common/precursorBasicDataStatPeriod/page`,
                update:`${server}/jc/common/precursorBasicDataStatPeriod/update`,
                getRecordById:`${server}/jc/common/precursorBasicDataStatPeriod/getRecordById`
            },
            /**生产线 */
            precursorProductionLine:{
                add:`${server}/jc/common/precursorProductionLine/add`,
                all:`${server}/jc/common/precursorProductionLine/all`,
                delete:`${server}/jc/common/precursorProductionLine/delete`,
                page:`${server}/jc/common/precursorProductionLine/page`,
                update:`${server}/jc/common/precursorProductionLine/update`,
                getRecordById:`${server}/jc/common/precursorProductionLine/getRecordById`
            },
            /**工序名称 */
            precursorProcessType:{
                add:`${server}/jc/common/precursorProcessType/add`,
                all:`${server}/jc/common/precursorProcessType/all`,
                delete:`${server}/jc/common/precursorProcessType/delete`,
                page:`${server}/jc/common/precursorProcessType/page`,
                update:`${server}/jc/common/precursorProcessType/update`
            },
            /**物料产线权重分配 */
            precursorMaterialLineWeight:{
                add:`${server}/jc/common/precursorMaterialLineWeight/add`,
                delete:`${server}/jc/common/precursorMaterialLineWeight/delete`,
                ids:`${server}/jc/common/precursorMaterialLineWeight/ids`,
                page:`${server}/jc/common/precursorMaterialLineWeight/page`,
                update:`${server}/jc/common/precursorMaterialLineWeight/update`
            },
            /**物料名称 */
            precursorMaterialDetails:{
                add:`${server}/jc/common/precursorMaterialDetails/add`,
                delete:`${server}/jc/common/precursorMaterialDetails/delete`,
                ids:`${server}/jc/common/precursorMaterialDetails/ids`,
                page:`${server}/jc/common/precursorMaterialDetails/page`,
                update:`${server}/jc/common/precursorMaterialDetails/update`,
                getProcess:`${server}/jc/common/precursorMaterialDetails/getProcess`,
                getRecordById:`${server}/jc/common/precursorMaterialDetails/getRecordById`
            },
            /**物料plc映射 */
            matPlcMap:{
                matPlcMap:`${server}/jc/common/matPlcMap`,
                ids:`${server}/jc/common/matPlcMap/ids`,
                page:`${server}/jc/common/matPlcMap/page`,
                getRecordById:`${server}/jc/common/matPlcMap/getRecordById`
            },
            /**PLC地址 */
            plcAddress:{
                plcAddress:`${server}/jc/common/plcAddress`,
                ids:`${server}/jc/common/plcAddress/ids`,
                getRecordById:`${server}/jc/common/plcAddress/getRecordById`
            },
            /**VGA */
            vga:{
                vga:`${server}/jc/common/vga`,
                ids:`${server}/jc/common/vga/ids`,
                page:`${server}/jc/common/vga/page`,
                getRecordById:`${server}/jc/common/vga/getRecordById`
            },
            /**VGA权重分配 */
            vgaMap:{
                vgaMap:`${server}/jc/common/vgaMap`,
                ids:`${server}/jc/common/vgaMap/ids`,
                page:`${server}/jc/common/vgaMap/page`
            },
            /**设备工序*/
            deviceProcess: {
                getAll: `${server}/jc/common/deviceProcess/getAllProcedure`,
                getDeviceByProIdByPage: `${server}/jc/common/deviceProcess/getDeviceByProIdByPage`,
                getDeviceAssignment: `${server}/jc/common/deviceProcess/getDeviceAssignment`,
                assign: `${server}/jc/common/deviceProcess/assign`
            }
        }
        localStorage.setItem('status',JSON.stringify(status));
        localStorage.setItem('dataType',JSON.stringify(dataType));
        localStorage.setItem('url',JSON.stringify(url))
    }
    /**控制登陆背景图 */
    componentDidMount() {
        let showFrame = setInterval(function() {
            let frame = window.frame;
            if(frame !== undefined && frame !== null) {
                frame(0);   //消除帧
                clearInterval(showFrame);
            }
        },500)
    }
    /**登出时，使登陆背景动图显示 */
    render() {
        const userName = JSON.parse(localStorage.getItem('menuList'))?JSON.parse(localStorage.getItem('menuList')).name:null;
        const userId = JSON.parse(localStorage.getItem('menuList'))?JSON.parse(localStorage.getItem('menuList')).userId:null;
        return (
                <div className="parent" >
                    <Top userId={userId} userName={userName}/>
                    <Left />
                    <Right />
                </div>
        );
    }
}
export default Home;
