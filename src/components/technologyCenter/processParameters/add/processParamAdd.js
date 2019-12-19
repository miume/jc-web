import React from 'react';
import {message, Spin} from "antd";
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
            deviceData: [],    //陈化-生产设备数据
            loading: false,
            lines: [],                //净后即陈化 生产线
            productClass: undefined,  //净后即陈化 生产品种
        };
        this.saveData = this.saveData.bind(this);
        this.headChange = this.headChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.addDetail = this.addDetail.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.choiceTemplate = this.choiceTemplate.bind(this);
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
        this.hcProductionLineChange = this.hcProductionLineChange.bind(this);
        this.liquidChange = this.liquidChange.bind(this);
        this.equipmentChange = this.equipmentChange.bind(this);
        this.expiryDateChange = this.expiryDateChange.bind(this);
        this.effectiveDateChange = this.effectiveDateChange.bind(this);
        this.productionLineChange = this.productionLineChange.bind(this);
        this.productClassChange = this.productClassChange.bind(this);
        this.applySaveAndReview = this.applySaveAndReview.bind(this);
        this.intInputChange = this.intInputChange.bind(this);
        this.floatInputChange = this.floatInputChange.bind(this);
        this.saveDataProcessing = this.saveDataProcessing.bind(this);
        this.getDeviceByDeptCode = this.getDeviceByDeptCode.bind(this);
        this.hcDataProcessing = this.hcDataProcessing.bind(this);
        this.zyDataProcessing = this.zyDataProcessing.bind(this);
        this.chDataProcessing = this.chDataProcessing.bind(this);

    }

    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        this.current = JSON.parse(localStorage.getItem('current'));
        let name = this.state.code > -1 ? '编辑数据' : '新增数据',
            {processCode,detail,exceptionDisposes,mediate,components,devices, proAndLines,zyDetail,lines,productClass,productClassName,mediateMemo,processParamsMemo,
            productionData,productionLineData,head,loading,disabled,deviceData,chMoment} = this.state,
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
                              lines={lines} productClass={productClass} productClassName={productClassName} productionData={productionData} productionLineData={productionLineData} effectiveDateChange={this.effectiveDateChange} expiryDateChange={this.expiryDateChange} productClassChange={this.productClassChange}/>
                    <Synthesis code={processCode} url={this.url} detail={detail} data={data} mediateData={mediateData} proAndLines={proAndLines} memo={processParamsMemo} mediateMemo={mediateMemo}
                               addDetail={this.addDetail} addMediateItem={this.addMediateItem} inputChange={this.inputChange} deleteItem={this.deleteItem} textAreaChange={this.textAreaChange}
                               deleteMediateItem={this.deleteMediateItem} addExceptionDisposes={this.addExceptionDisposes} deleteExceptionDisposes={this.deleteExceptionDisposes} choiceTemplate={this.choiceTemplate}
                               memoChange={this.memoChange} productClassChange={this.productClassChange} linesChange={this.hcProductionLineChange} productionData={productionData} productionLineData={productionLineData}/>
                    <Liquid code={processCode} components={componentsData} zyDetail={zyDetail} inputChange={this.textAreaChange} liquidChange={this.liquidChange} add={this.addComponentsItem} deleteItems={this.deleteComponentsItem}/>
                    <AgedWashing code={processCode} deviceData={deviceData} chMoment={chMoment} inputChange={this.textAreaChange} memoChange={this.memoChange} equipmentChange={this.equipmentChange} data={devicesData} add={this.addDevicesItem} deleteItem={this.deleteDevicesItem}/>
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
                "rotateSpeedBias": 0,
                "rotateSpeedStandard": 0,
                "sizeD30Bias": 0,
                "sizeD30Standard": 0,
                "sizeD70": "0",
                "sizeD90": "0",
                "solidContainingContentBias": 0,
                "solidContainingContentStandard": 0,
                "temperatureBias": 0,
                "temperatureStandard": 0
            }, exceptionDisposesItems = {
                "phenomenon": "",
                "reason": "",
                "processMode": "",
                "relatedProductionProcess": ""
            }, mediateItem = {
                "frequency": "",
                "item": "",
                "samplePlace": "",
                "standards": ""
            }, componentsItem = {
                "coMax": 0,
                "coMin": 0,
                "mnMax": 0,
                "mnMin": 0,
                "niMax": 0,
                "niMin": 0,
            }, devicesItem = {
                "deviceCode": "",
                "techParameters": ""
            }, head = {
                "dateOfFiling": moment(date).format('YYYY-MM-DD HH:mm:ss'),
                "edition": "",
                "effectiveDate": "",
                "expiryDate": "",
                "plantCode": '',
                "preparer": userId,
                "processCode": '',
                "processNum": "",
                "statusFlag": "0"
            }, zyDetail = {
                "ca": "0",
                "cd": "0",
                "comment": "",
                "fe": "0",
                "highBias": 0,
                "highStandard": 0,
                "mg": "0",
                "stirTimeBias": 0,
                "stirTimeStandard": 0,
                "temperatureBias": 0,
                "temperatureStandard": 0,
                "zn": "0",
                "zrBias": 0,
                "zrStandard": 0
            },proAndLinesItems = {  //工艺参数（生产品种和生产线）
                lines: [],
                productClass: '',
                productClassName: ''
            }, proAndLines = [],
            detail = [],exceptionDisposes = [],mediate = [], components = [],devices = [];
        detail.push(item);                                              //合成-工艺参数表格数据
        // exceptionDisposes.push(JSON.parse(JSON.stringify(exceptionDisposesItems)));  //合成-异常处理表格数据
        // mediate.push(JSON.parse(JSON.stringify(mediateItem)));           //合成-中间品表格数据
        components.push(JSON.parse(JSON.stringify(componentsItem)));     //制液主成分表格数据
        // devices.push(JSON.parse(JSON.stringify(devicesItem)));           //陈化表格数据
        proAndLines.push(JSON.parse(JSON.stringify(proAndLinesItems)));  //合成-工艺参数（生产品种和生产线）
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
            zyDetail: zyDetail,
            proAndLines: proAndLines,
            proAndLinesItems: proAndLinesItems,
        });
    }

    /**编辑*/
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
            let res = data.data.data;
            if (data.data.code === 0) {
                let head = res['head'], {processName, processCode, plantCode} = head,
                    proAndLine = res['proAndLine'], {lines, productClass, productClassName} = proAndLine;
                head['deptName'] = res['deptName'];
                if (processName === '制液') {
                    let {components, detail} = res['zy'];
                    this.setState({
                        components: components,
                        zyDetail: detail,
                        lines: lines,
                        productClass: productClass,
                        productClassName: productClassName
                    })
                } else if (processName === '陈化洗涤') {
                    let {devices, detail} = res['ch'];
                    this.setState({
                        devices: devices,
                        chMoment: detail ? detail['comment'] : '',
                        lines: lines,
                        productClass: parseInt(productClass),
                        productClassName: productClassName
                    });
                    this.getDeviceByDeptCode(plantCode);
                } else {
                    let {gy, exceptionDisposes, zjp} = res['hc'];
                    this.setState({
                        mediate: zjp['mediate'],
                        mediateMemo: zjp['memo'],
                        exceptionDisposes: exceptionDisposes,
                        detail: gy['details'],
                        processParamsMemo: gy['memo'],
                        proAndLines: gy['proAndLines']
                    })
                }
                this.setState({
                    head: head,
                    processCode: processCode,
                    disabled: true
                })
            }
            this.setState({
                loading: false
            });
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
            const res = data.data.data ? data.data.data : [];
            if (res) {
                this.setState({
                    productionData: res
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

    /**通过车间code和工序code查询陈化-生产设备*/
    getDeviceByDeptCode(id) {
        axios({
            url: `${this.url.deviceProcess.getDeviceByDeptCode}?deptId=${id}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            }
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
            if (res) {
                this.setState({
                    deviceData: res
                })
            }
        });
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

    /**监控表头工序的变化*/
    processChange(value) {
        let {head} = this.state;
        head['processCode'] = value;
        this.setState({
            processCode: value,
            head: head
        });
        //如果使用车间code和工序code都存在，则查询陈化-生产设备
        if(value === 50) {
            if(head['plantCode']) {
                this.getDeviceByDeptCode(head['plantCode']);
            } else {
                message.info('新增陈化数据，请先选择使用车间');
            }
        }
    }

    /**监控表头使用车间的变化*/
    plantCodeChange(value) {
        let {head} = this.state, val = value.split('-');
        head['plantCode'] = val[1];
        head['deptName'] = val[0];
        this.setState({
            head: head
        });
    }

    /**新增合成-工艺参数数据（表格数据以及生产品种和生产线）*/
    addDetail() {
        let {item,detail,proAndLinesItems,proAndLines} = this.state;
        detail.push(item);
        proAndLines.push(proAndLinesItems)
        this.setState({
            detail: detail,
            proAndLines: proAndLines
        })
    }

    /**删除合成-指定一条工艺参数*/
    deleteItem(index) {
        let {detail,proAndLines} = this.state;
        detail.pop(index-1);
        proAndLines.pop(index-1);
        this.setState({
            detail: detail,
            proAndLines: proAndLines
        })
    }

    /**新增合成-异常处理数据*/
    addExceptionDisposes() {
        let {exceptionDisposesItems,exceptionDisposes} = this.state;
        exceptionDisposes.push(JSON.parse(JSON.stringify(exceptionDisposesItems)));
        this.setState({
            exceptionDisposes: exceptionDisposes
        })
    }

    /**删除合成-指定一条工艺参数*/
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

    /**新增合成中间品标准*/
    addMediateItem() {
        let {mediateItem,mediate} = this.state;
        mediate.push(JSON.parse(JSON.stringify(mediateItem)));
        this.setState({
            mediate: mediate
        })
    }

    /**删除合成-中间品标准一条数据*/
    deleteMediateItem(index) {
        let {mediate} = this.state;
        mediate.pop(index-1);
        this.setState({
            exceptionDisposes: mediate
        })
    }

    /**新增制液-主成分标准*/
    addComponentsItem() {
        let {componentsItem,components} = this.state;
        components.push(JSON.parse(JSON.stringify(componentsItem)));
        this.setState({
            components: components
        })
    }

    /**删除制液-主成分一条数据*/
    deleteComponentsItem(index) {
        let {components} = this.state;
        components.pop(index-1);
        this.setState({
            components: components
        })
    }

    /**新增陈化-表格数据*/
    addDevicesItem() {
        let {devicesItem,devices} = this.state;
        devices.push(JSON.parse(JSON.stringify(devicesItem)));
        this.setState({
            devices: devices
        })
    }

    /**删除陈化-表格一条数据*/
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
            name = tar[0], index = tar[1], type = tar[2] ? tar[2] : '', {detail} = this.state;
        if(value) {
            if(type === 'int') {
                value = this.intInputChange(value);
            } else if(type === 'float') {
                value = this.floatInputChange(value)
            }
        }
        detail[index-1][name] = value;
        this.setState({
            detail: detail
        })
    }

    /**只准输入数字*/
    intInputChange(value) {
        if(typeof value === 'number') value = value.toString();
        value =  value.replace(/[^\d]/g, "");  //只准输入数字
        return value;
    }

    /**（只准输入数字和小数点）*/
    floatInputChange(value) {
        if(typeof value === 'number') value = value.toString();
        value =  value.replace(/[^\d\.]/g, "");  //只准输入数字和小数点
        return value;
    }

    /**统一监控异常处理、中间品标准、主成分（制液）、陈化洗涤的textArea框变化*/
    textAreaChange(e) {
        let target = e.target, value = target.value,  tar = target.name.split('-'),
            obj = tar[0] ,name = tar[1], index = tar[2], type = tar[3] ? tar[3] : '',
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
            if(type === 'float') {
                value = this.floatInputChange(value);
            }
            components[index-1][name] = value;  //制液(主成分)
            this.setState({
                components: components
            })
        }
    }

    /**监控合成-中间品-memo的变化*/
    memoChange(e) {
        let target = e.target, name = target.name, value = target.value
        this.setState({
            [name]: value
        })
    }

    /**监控制液表格之外所有input框值的变化*/
    liquidChange(e) {
        let target = e.target, tar = target.name.split('-'), value = target.value, {zyDetail} = this.state,
        name = tar[0], type = tar[1] ? tar[1] : '';
        if(value && type === 'int') {
            value = this.intInputChange(value);
        }
        zyDetail[name] = value;
        this.setState({
            zyDetail: zyDetail
        })
    }

    /**监控生产线变化*/
    productionLineChange(value) {
        this.setState({
            lines: value
        })
    }

    /**监控合成-生产线的变化*/
    hcProductionLineChange(index,value) {
        let {proAndLines} = this.state;
        proAndLines[index]['lines'] = value;
        this.setState({
            proAndLines: proAndLines
        })
    }

    /**监控生产品种的变化*/
    productClassChange(value,option) {
        let val = value.split('-'), index = option.props.name;
        if(index === undefined) {
            this.setState({
                productClass: val[0],
                productClassName: val[1]
            })
        } else {  //合成-生产品种的变化
            let {proAndLines} = this.state;
            proAndLines[index]['productClass'] = val[0];
            proAndLines[index]['productClassName'] = val[1];
            this.setState({
                proAndLines: proAndLines
            })
        }
    }

    /**监控陈化洗涤-生产设备下拉框变化*/
    equipmentChange(value,option) {
        let index = option.props.name, {devices} = this.state;
        devices[index-1]['deviceCode'] = value;
        this.setState({
            devices: devices
        })
    }

    /**合成-异常处理-模版选择*/
    choiceTemplate(index,selectedRows) {
        let {exceptionDisposes} = this.state;
        exceptionDisposes.splice(index-1,1,selectedRows);
        this.setState({
            exceptionDisposes: exceptionDisposes
        })
    }

    /**点击取消新增*/
    handleCancel() {
        this.props.history.push({pathname: '/processParameters'})
    }

    /**送审*/
    applySaveAndReview(process,urgent) {
        this.saveDataProcessing(1,process,urgent);
    }

    /**点击保存新增
     * 根据所选工序来确定新增数据
     * */
    handleSave() {
        this.saveDataProcessing(0);
    }

    /**处理新增和编辑数据*/
    saveDataProcessing(flag,process,urgent) {
        let {processCode,head} = this.state, data;
        delete head['deptName'];
        if(!this.checkObj(head)) {  //不管保存新增，表头必填
            message.info('请将新增数据填写完整！');
            return
        }
        if(processCode === 48) {       //制液新增(净后)
            data = this.zyDataProcessing(head);
            if(!data) {
                return
            }
        } else if(processCode === 49) {//合成新增
            data = this.hcDataProcessing(head);
            if(!data) {
                return
            }
        } else if(processCode === 50) {//陈化洗涤新增
            data = this.zyDataProcessing(head);
            if(!data) {
                return
            }
        }
        //flag = 1 代表送审
        if(flag) {
            data['auditId'] = process;  //审核流程id
            data['isUrgent'] = urgent;  //审核是否紧急
        }
        this.saveData(data,flag);
    }

    /**合成数据处理*/
    hcDataProcessing(head) {
        let {proAndLines, exceptionDisposes,detail,processParamsMemo,mediate,mediateMemo} = this.state, data;
        head['processName'] = '合成';
        if(!this.checkArr(exceptionDisposes,1) || !this.checkArr(detail) || !this.checkArr(mediate,1) || !this.checkArr(proAndLines)) {
            message.info('将新增数据填写完整！');
            return false;
        }
        data = {
            head: head,
            processName: '合成',
            hc: {
                exceptionDisposes: exceptionDisposes,
                gy: {
                    details: detail,
                    memo: processParamsMemo,
                    proAndLines: proAndLines
                },
                zjp: {
                    mediate: mediate,
                    memo: mediateMemo
                }
            }
        };
        return data;
    }

    /**制液数据处理 - 数据都必填*/
    zyDataProcessing() {
        let {head,components,zyDetail,lines,productClass,productClassName} = this.state, data;
        delete head['deptName'];
        head['processName'] = '制液';
        if(!this.checkArr(components) || !this.checkObj(zyDetail) ||
            !productClass || !productClassName || !lines.length) {
            message.info('将新增数据填写完整！');
            return false;
        }
        data = {
            head: head,
            processName: '制液',
            zy: {
                components: components,
                detail: zyDetail
            },
            proAndLine: {
                lines: lines,
                productClass: productClass,
                productClassName: productClassName
            }
        };
        return data;
    }

    /**陈化洗涤数据处理*/
    chDataProcessing(head) {
        let {lines,productClass,productClassName,devices,chMoment} = this.state, data;
        if(!this.checkArr(devices,1) || !productClass || !productClassName || !lines.length) {
            message.info('将新增数据填写完整！');
            return
        }
        data = {
            head: head,
            processName: '陈化洗涤',
            ch: {
                devices: devices,
                detail: {
                    comment: chMoment,
                }
            },
            proAndLine: {
                lines: lines,
                productClass: productClass,
                productClassName: productClassName
            }
        };
        return data;
    }

    /**保存或送审
     * flag = 0 代表保存
     * flag = 1 代表送审
     * */
    saveData(data,flag) {
        axios({
            url: `${this.url.processParam.saveOrCommit}?flag=${flag}`,
            method: 'post',
            headers: {
                'Authorization': this.url.Authorization
            },
            data
        }).then(data => {
            message.info(data.data.message)
            if(data.data.code === 0) {
                this.handleCancel();
            }
        })
    }

    /**检验数组中属性是否有为空
     * flag === 1 表示数组可以为空
     * */
    checkArr(arr,flag) {
        if(flag && !arr.length) return true; //表示数组可以为空
        if(arr && arr.length) {
            for(let i in arr) {
                if(!this.checkObj(arr[i])) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    /**检验对象中属性值是否有为空*/
    checkObj(obj) {
        if(obj === {}) return false;
        for(let i in obj) {
            if(i !== 'comment' && (obj[i] === '' || obj[i] === undefined || (Array.isArray(obj[i]) && !obj[i].length))) {
                return false;
            }
        }
        return true;
    }

    /**销毁组件*/
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default ProcessParamAddModal
