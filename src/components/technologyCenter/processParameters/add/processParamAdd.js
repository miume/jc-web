import React from 'react';
import {message, Select, Spin} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";
import BlockQuote from '../../../BlockQuote/blockquote';
import axios from 'axios';
import AddModal from './addModal';
import Submit from "../../../BlockQuote/checkSubmit";
import Synthesis from "./synthesis/synthesis";
import Liquid from "./liquid/liquid";
import AgedWashing from "./agedWashing/agedWashing";
import moment from "moment";
const {Option} = Select;

class ProcessParamAddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            headVisible: false,
            data: [],
            detail: [],  //工艺参数
            exceptionDisposes: [],  //异常处理
            mediate: [],
            mediateMemo: '',
            components: [],     //主成分
            zyDetail: {},       //杂质成分和其它
            devices: [],        //陈化
            productionData: [],
            productionLineData: [],
            head: {},
            loading: false,
        };
        this.saveData = this.saveData.bind(this);
        this.headChange = this.headChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.addDetail = this.addDetail.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.getDetailById = this.getDetailById.bind(this);
        this.initialAddData = this.initialAddData.bind(this);
        this.textAreaChange = this.textAreaChange.bind(this);
        this.addMediateItem = this.addMediateItem.bind(this);
        this.processChange = this.processChange.bind(this);
        this.addDevicesItem = this.addDevicesItem.bind(this);
        this.getProduction = this.getProduction.bind(this);
        this.plantCodeChange = this.plantCodeChange.bind(this);
        this.getProductionLine = this.getProductionLine.bind(this);
        this.deleteDevicesItem = this.deleteDevicesItem.bind(this);
        this.memoChange = this.memoChange.bind(this);
        this.deleteMediateItem = this.deleteMediateItem.bind(this);
        this.addComponentsItem = this.addComponentsItem.bind(this);
        this.deleteComponentsItem = this.deleteComponentsItem.bind(this);
        this.addExceptionDisposes = this.addExceptionDisposes.bind(this);
        this.deleteExceptionDisposes = this.deleteExceptionDisposes.bind(this);
        this.processExceptionDisposes = this.processExceptionDisposes.bind(this);
        this.liquidChange = this.liquidChange.bind(this);
        this.equipmentChange = this.equipmentChange.bind(this);
        this.expiryDateChange = this.expiryDateChange.bind(this);
        this.effectiveDateChange = this.effectiveDateChange.bind(this);
        this.productionLineChange = this.productionLineChange.bind(this);
        this.productClassChange = this.productClassChange.bind(this);
        this.applySaveAndReview = this.applySaveAndReview.bind(this);
    }

    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        this.current = JSON.parse(localStorage.getItem('current'));
        let name = this.state.code > -1 ? '编辑数据' : '新增数据',
            {processCode,detail,exceptionDisposes,mediate,components,devices,productionData,productionLineData,head,loading,disabled} = this.state,
            data = this.processExceptionDisposes(exceptionDisposes),
            mediateData = this.processExceptionDisposes(mediate),
            componentsData = this.processExceptionDisposes(components),
            devicesData = this.processExceptionDisposes(devices);
        return (
            <div>
                <BlockQuote name={name} menu={this.current.menuName}
                            menu2={this.current.menuParent} returnDataEntry={this.handleCancel}/>
                <Spin spinning={loading} wrapperClassName={'rightDiv-add-content'}>
                    <AddModal head={head} code={processCode} disabled={disabled} url={this.url} headChange={this.headChange} processChange={this.processChange} plantCodeChange={this.plantCodeChange} productionLineChange={this.productionLineChange}
                              productionData={productionData} productionLineData={productionLineData} effectiveDateChange={this.effectiveDateChange} expiryDateChange={this.expiryDateChange} productClassChange={this.productClassChange}/>
                    <Synthesis code={processCode} url={this.url} detail={detail} data={data} mediateData={mediateData}
                               addDetail={this.addDetail} addMediateItem={this.addMediateItem} inputChange={this.inputChange} deleteItem={this.deleteItem} textAreaChange={this.textAreaChange}
                               deleteMediateItem={this.deleteMediateItem} addExceptionDisposes={this.addExceptionDisposes} deleteExceptionDisposes={this.deleteExceptionDisposes}
                               memoChange={this.memoChange}/>
                    <Liquid code={processCode} components={componentsData} inputChange={this.textAreaChange} liquidChange={this.liquidChange} add={this.addComponentsItem} deleteItems={this.deleteComponentsItem}/>
                    <AgedWashing code={processCode} url={this.url} inputChange={this.textAreaChange} memoChange={this.memoChange} equipmentChange={this.equipmentChange} data={devicesData} add={this.addDevicesItem} deleteItem={this.deleteDevicesItem}/>
                </Spin>

                <div className='raw-material-add-footer-bottom'>
                    <CancleButton key='back' handleCancel={this.handleCancel} flag={1}/>
                    <div>
                        <SaveButton key='save' handleSave={this.handleSave}/>
                        <Submit key='submit' url={this.url} applySaveAndReview={this.applySaveAndReview}/>
                    </div>
                </div>
            </div>
        )
    }

    /**获取路由传递的数据*/
    componentDidMount() {
        let location = this.props.location, pathname = location.pathname.split('/'), id = pathname.length > 2 ? pathname[2] : '';
        if(id) {
            this.getDetailById(id)
        } else {
            this.initialAddData();
        }

        this.getProduction();
        this.getProductionLine();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.state === nextState) return false;
        return true;
    }

    /**初始化新增数据*/
    initialAddData() {
        let date = new Date() ,userId = JSON.parse(localStorage.getItem('menuList')).userId,
            item = {
                "basicityBias": 0,
                "basicityStandard": 0,
                "comment": "",
                "flowBias1": 0,
                "flowBias2": 0,
                "flowStandard1": 0,
                "flowStandard2": 0,
                "nitrogenFlowBias": 0,
                "nitrogenFlowStandard": 0,
                "processCode": 0,
                "productionCode": 0,
                "rotateSpeedBias": 0,
                "rotateSpeedStandard": 0,
                "sizeD30Bias": 0,
                "sizeD30Standard": 0,
                "sizeD70": "",
                "sizeD90": "",
                "solidContainingContentBias": 0,
                "solidContainingContentStandard": 0,
                "temperatureBias": 0,
                "temperatureStandard": 0
            }, exceptionDisposesItems = {
                "phenomenon": "",
                "processCode": 0,
                "processMode": "",
                "reason": "",
                "relatedProductionProcess": ""
            }, mediateItem = {
                "frequency": "",
                "item": "",
                "samplePlace": "",
                "standards": ""
            }, componentsItem = {
                "coMax": 0,
                "coMin": 0,
                "code": 0,
                "mnMax": 0,
                "mnMin": 0,
                "niMax": 0,
                "niMin": 0,
            }, devicesItem = {
                "processCode": 0,
                "techParameters": ""
            }, head = {
                "dateOfFiling": moment(date).format('YYYY-MM-DD HH:mm:ss'),
                "edition": "",
                "effectiveDate": "",
                "expiryDate": "",
                "plantCode": '',
                "preparer": userId,
                "processCode": 0,
                "processNum": "",
                "statusFlag": "0"
            }, zyDetail = {
                "ca": "",
                "cd": "",
                "comment": "",
                "fe": "",
                "highBias": 0,
                "highStandard": 0,
                "mg": "",
                "stirTimeBias": 0,
                "stirTimeStandard": 0,
                "temperatureBias": 0,
                "temperatureStandard": 0,
                "zn": "",
                "zrBias": 0,
                "zrStandard": 0
            },
            detail = [],exceptionDisposes = [],mediate = [], components = [],devices = [];
        detail.push(item);
        exceptionDisposes.push(JSON.parse(JSON.stringify(exceptionDisposesItems)));
        mediate.push(JSON.parse(JSON.stringify(mediateItem)));
        components.push(JSON.parse(JSON.stringify(componentsItem)));
        devices.push(JSON.parse(JSON.stringify(devicesItem)));
        this.setState({
            item: item,
            detail: detail,
            exceptionDisposes: exceptionDisposes,
            exceptionDisposesItems: exceptionDisposesItems,
            mediate: mediate,
            mediateItem: mediateItem,
            components: components,
            componentsItem: componentsItem,
            devices: devices,
            devicesItem: devicesItem,
            head: head,
            zyDetail: zyDetail
        });
    }

    getDetailById(id) {
        this.setState({
            loading: true
        });
        axios({
            url: `${this.url.processParam.detail}?id=${id}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            }
        }).then((data) => {
            let res = data.data.data, head = res['head'];
            console.log(head)
            this.setState({
                head: head,
                processCode: head['processCode'],
                disabled: true,
                loading: false
            })
        })
    }

    /**获取生产品种*/
    getProduction() {
        axios({
            url: `${this.url.productionBatchRule.getDetail}?code=5`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            }
        }).then((data) => {
            const res = data.data.data ? data.data.data : [], productionData = [];
            if (res) {
                for(let i = 0; i < res.length; i++) {
                    let e = res[i];
                    productionData.push(
                        <Option key={e.code}>{e.ruleDesc}</Option>
                    )
                }
                this.setState({
                    productionData: productionData
                })
            }
        });
    }

    /**生产线*/
    getProductionLine() {
        axios({
            url: `${this.url.precursorProductionLine.all}?code=5`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            }
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
            if(res) {
                this.setState({
                    productionLineData: res
                })
            }
        })
    }

    /**监控新增表头的变化(编号，版次)*/
    headChange(e) {
        let target = e.target, name = target.name,
            value = target.value, {head} = this.state;
        head[name] = value;
        this.setState({
            head: head
        })
    }

    /**监控表头生效日期变化*/
    effectiveDateChange(date,dateString) {
        let {head} = this.state;
        head['effectiveDate'] = dateString;
        this.setState({
            head: head
        })
    }

    /**监控表头失效日期变化*/
    expiryDateChange(date,dateString) {
        let {head} = this.state;
        head['expiryDate'] = dateString;
        this.setState({
            head: head
        })
    }

    /**监控工序的变化*/
    processChange(value) {
        value = parseInt(value);
        let {head} = this.state;
        head['processCode'] = value;
        this.setState({
            processCode: value,
            head: head
        })
    }

    /**监控使用车间的变化*/
    plantCodeChange(value) {
        let {head} = this.state;
        head['plantCode'] = value.split('-')[1];
        this.setState({
            head: head
        })
    }

    /**新增工艺参数数据*/
    addDetail() {
        let {item,detail} = this.state;
        detail.push(item);
        this.setState({
            detail: detail
        })
    }

    /**删除指定一条工艺参数*/
    deleteItem(index) {
        let {detail} = this.state;
        detail.pop(index-1);
        this.setState({
            detail: detail
        })
    }

    /**新增异常处理数据*/
    addExceptionDisposes() {
        let {exceptionDisposesItems,exceptionDisposes} = this.state;
        exceptionDisposes.push(JSON.parse(JSON.stringify(exceptionDisposesItems)));
        this.setState({
            exceptionDisposes: exceptionDisposes
        })
    }

    /**删除指定一条工艺参数*/
    deleteExceptionDisposes(index) {
        let {exceptionDisposes} = this.state;
        exceptionDisposes.pop(index-1);
        this.setState({
            exceptionDisposes: exceptionDisposes
        })
    }

    processExceptionDisposes(data) {
        for(let i = 0; i < data.length; i++) {
            if(typeof data[i] !== 'number')
                data[i]['index'] = i + 1;
        }
        return data;
    }

    /**新增中间品标准*/
    addMediateItem() {
        let {mediateItem,mediate} = this.state;
        mediate.push(JSON.parse(JSON.stringify(mediateItem)));
        this.setState({
            mediate: mediate
        })
    }

    /**删除中间品标准一条数据*/
    deleteMediateItem(index) {
        let {mediate} = this.state;
        mediate.pop(index-1);
        this.setState({
            exceptionDisposes: mediate
        })
    }

    /**新增主成分标准*/
    addComponentsItem() {
        let {componentsItem,components} = this.state;
        components.push(JSON.parse(JSON.stringify(componentsItem)));
        this.setState({
            components: components
        })
    }

    /**删除主成分一条数据*/
    deleteComponentsItem(index) {
        let {components} = this.state;
        components.pop(index-1);
        this.setState({
            components: components
        })
    }

    /**新增主成分标准*/
    addDevicesItem() {
        let {devicesItem,devices} = this.state;
        devices.push(JSON.parse(JSON.stringify(devicesItem)));
        this.setState({
            devices: devices
        })
    }

    /**删除主成分一条数据*/
    deleteDevicesItem(index) {
        let {devices} = this.state;
        devices.pop(index-1);
        this.setState({
            devices: devices
        })
    }

    /**统一监控工艺参数的input框变化*/
    inputChange(e) {
        let target = e.target, value = target.value,  tar = target.name.split('-'),
            name = tar[0], index = tar[1], {detail} = this.state;
        if(typeof value === 'number') value = value.toString();
        value =  value.replace(/[^\d\.]/g, "");  //只准输入数字和小数点
        detail[index-1][name] = value;
        this.setState({
            detail: detail
        })
    }

    /**统一监控异常处理、中间品标准、主成分（制液）、陈化洗涤的textArea框变化*/
    textAreaChange(e) {
        let target = e.target, value = target.value,  tar = target.name.split('-'),
            obj = tar[0] ,name = tar[1], index = tar[2],
            {exceptionDisposes,mediate,components,devices} = this.state;

        if(obj === 'hc') {  //合成
            exceptionDisposes[index-1][name] = value;
            this.setState({
                exceptionDisposes: exceptionDisposes
            })
        } else if(obj === 'zjp') {   //中间品
            mediate[index-1][name] = value;
            this.setState({
                mediate: mediate
            })
        } else if(obj === 'ch') {  //陈化
            devices[index-1][name] = value;
            this.setState({
                devices: devices
            })
        } else {
            components[index-1][name] = value;  //制液
            this.setState({
                components: components
            })
        }
    }

    /**监控中间品-memo的变化*/
    memoChange(e) {
        let target = e.target, name = target.name, value = target.value
        this.setState({
            [name]: value
        })
    }

    /**监控制液表格之外所有input框值的变化*/
    liquidChange(e) {
        let target = e.target, name = target.name, value = target.value, {zyDetail} = this.state;
        zyDetail[name] = value;
        this.setState({
            zyDetail: zyDetail
        })
    }

    /**监控生产线变化*/
    productionLineChange(value) {
        let lines = [];
        for(let i = 0; i < value.length; i++) {
            let val = value[i].split('-');
            lines.push({
                code: val[0],
                name: val[1]
            })
        }
        this.setState({
            lines: lines
        })
    }

    /**监控生产品种的变化*/
    productClassChange(value) {
        this.setState({
            productClass: parseInt(value)
        })
    }

    /**监控陈化洗涤-生产设备下拉框变化*/
    equipmentChange(value,option) {
        console.log(value,option)
    }

    /**点击取消新增*/
    handleCancel() {
        this.props.history.push({pathname: '/processParameters'})
    }

    /**送审*/
    applySaveAndReview(process,urgent) {

    }

    /**点击保存新增
     * 根据所选工序来确定新增数据
     * */
    handleSave() {
        let {processCode,head,components,zyDetail,lines,productClass,
            exceptionDisposes,details,processParamsMemo,mediate,mediateMemo,
            devices,chMoment} = this.state, data = {};

        if(!this.checkObj(head)) {
            message.info('请将新增数据填写完整！');
            return
        }
        if(processCode === 47) {       //制液新增
            if(this.checkArr(components) && this.checkObj(zyDetail) && this.checkObj(lines) && productClass) {
                data = {
                    head: head,
                    zy: {
                        components: components,
                        detail: zyDetail,
                        proAndLine: {
                            lines: lines,
                            productClass: productClass
                        }
                    }
                }
            } else {
                message.info('将新增数据填写完整！');
                return
            }

        } else if(processCode === 49) {//合成新增
            if(this.checkArr(exceptionDisposes) && this.checkArr(details) && this.checkArr(mediate)) {
                data = {
                    head: head,
                    exceptionDisposes: exceptionDisposes,
                    gy: {
                        details: details,
                        memo: processParamsMemo
                    },
                    zjp: {
                        mediate: mediate,
                        memo: mediateMemo
                    }
                }
            } else {
                message.info('将新增数据填写完整！');
                return
            }

        } else if(processCode === 50) {//陈化洗涤新增
            if(this.checkArr(devices)) {
                data = {
                    head: head,
                    devices: devices,
                    detail: {
                        comment: chMoment,
                    }
                }
            } else {
                message.info('将新增数据填写完整！');
                return
            }
        }
        this.saveData(data);
        this.handleCancel();
    }

    checkArr(arr) {
        if(arr.length) {
            for(let i = 0; i < arr; i++) {
                for(let j in arr[i]) {
                    if(arr[i][j] === '') {
                        message.info('请将数据填写完整！');
                        return false;
                    }
                }
            }
            return true;
        }
        return false;
    }

    checkObj(obj) {
        if(obj === {}) return false;
        for(let i in obj) {
            if(obj[i] === '' || obj[i] === undefined) {
                return false;
            }
        }
        return true;
    }

    saveData(data) {
        axios({
            url: `${this.url.processParam.saveOrCommit}?flag=0`,
            method: 'post',
            headers: {
                'Authorization': this.url.Authorizaion
            },
            data
        }).then(data => {
            message.info(data.data.message)
        })
    }

    /**销毁组件*/
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default ProcessParamAddModal
