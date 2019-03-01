import React from 'react';
import {message, Modal} from 'antd';
import PurchaseModal from '../purchaseCheckReport/purchaseModal';
import CancleButton from '../BlockQuote/cancleButton';
import SaveButton from '../BlockQuote/saveButton';
import Submit from '../BlockQuote/submit';
import './unqualifiedExamine.css';
import axios from "axios";
import CheckSpanModal from "../productInspection/checkSpanModal";


class EditSpan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            subVisible: false,
            process:-1,
            urgent:0,
            type:'',    //判断是进货1,还是成品0
            checkData: {    //进货数据格式
                headData: [],
                tbodyData: [],
                judgement: '',
                judger: '',
                topData: {},
            },
            detailData:{    //成品数据格式
                topData: {},   //头部数据
                testDTOS: [],   //中部项目
                testData: {},   //检验数据
                examine: {       //审核数据
                    examineStatus: '',
                    examineData: []
                },
                optional: {
                    optionalStatus: '',
                    optionalData: {
                        personer: '',
                        personTime:'',
                    }
                },   //择优数据
                isQualified: '', //不合格状态
            },
        };
        this.modifyPurchaseData = this.modifyPurchaseData.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.getDetailData = this.getDetailData.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.urgentChange = this.urgentChange.bind(this);
        this.handleCancelApply = this.handleCancelApply.bind(this);
        this.handleOkApply = this.handleOkApply.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.clickSavaButton = this.clickSavaButton.bind(this);
        this.useSavaFunction = this.useSavaFunction.bind(this);
        this.applyReview = this.applyReview.bind(this);

        this.modifyProInsData = this.modifyProInsData.bind(this);
    }
    render() {
        const { visible } = this.state;
        const type = this.state.type;
        var modalWidth;
        if(type===0){
            modalWidth='520px'
        }else{
            modalWidth='1080px'
        }

        return(
            <span>
                <span className="blue" onClick={this.handleEdit} >编辑</span>
                <Modal
                    title="编辑数据"
                    visible={visible}
                    width={modalWidth}
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    // footer下的每个组件都要有唯一的key
                    footer={[
                        <CancleButton
                            handleCancel = {this.handleCancel}
                            key='cancel'
                        />,
                        <SaveButton
                            handleSave={this.handleSave}
                            key='save'
                        />,
                        <Submit
                            key='submit'
                            visible={this.state.subVisible}
                            handleVisibleChange={this.handleVisibleChange}
                            selectChange={this.selectChange}
                            urgentChange={this.urgentChange}
                            url={this.props.url}
                            process={this.state.process}
                            handleCancel={this.handleCancelApply}
                            handleOk={this.handleOkApply}
                        />
                    ]}
                >
                    {
                        this.state.type?(
                            <div style={{height:500}}>
                                <PurchaseModal
                                    modifyDetailData={this.modifyPurchaseData}
                                    data={this.state.checkData}
                                    clickState ={0} //是否可以点击 0:可以点红， 其余：不可以点红
                                    unClickType={1} //表示头部数据不可点击
                                />
                            </div>
                        ):(
                            <div style={{height:550}}>
                                <CheckSpanModal
                                    clearButton={1}
                                    data={this.state.detailData}
                                    modifyDetailData={this.modifyProInsData}
                                    unClickCheck={1}  //中间内容数据不课修改
                                />
                            </div>
                        )
                    }
                </Modal>
            </span>
        )
    }

    /**
     * 进货相关函数部分
     * type = 1
     * 头部数据不能修改
     */
    /**1。  修改进货的数据 */
    modifyPurchaseData = (data) => {
        this.setState({
            checkData:data
        })
    };

    /**
     * 成品相关函数部分
     * type = 0
     */
    /**1. 修改进货的数据 */
    modifyProInsData = (data) => {
        this.setState({
            detailData:data
        })
    };



    /**
     * ----------------------公共接口部分----------------------
     */
    /**1.点击编辑 */
    handleEdit() {
        this.getDetailData();
        // this.setState({
        //     visible: true,
        // })
    }
    /**
     * 详情 区分进货和成品   根据某子段，对数据进行组装
     * 进货：调用进货的PurchaseModal，数据进行组装
     * 成品：调用成品的组件，数据进行组装
     * 同时要在<div>中进行子段判断，来调用哪个组件
     */
    getDetailData(){
        axios({
            url: `${this.props.url.unqualifiedExamineTable.unqualifiedTestReportRecord}/${this.props.batchNumberId}`,
            method:'get',
            headers:{
                'Authorization': this.props.url.Authorization
            },
        }).then((data)=>{
            const detail = data.data.data;
            if(detail){
                const type = detail.type;   //根据类型type来进行判断
                if(type===1){
                    //  进货数据组装
                    var headData = [];
                    var tbodyData = [];
                    var judger = '';
                    var judgement = '';
                    var topData = {};
                    topData = {
                        materialName: detail.unqualifiedHead.materialName,
                        norm: detail.unqualifiedHead.norm?detail.unqualifiedHead.norm:'无',
                        quantity: detail.unqualifiedHead.quantity?detail.unqualifiedHead.quantity:'无',
                        receiveDate:detail.unqualifiedHead.date?detail.unqualifiedHead.date:'无',
                        manufactureName:detail.unqualifiedHead.factory?detail.unqualifiedHead.factory:'无',
                        weight:detail.unqualifiedHead.weight?detail.unqualifiedHead.weight:'无',
                    };
                    let detailHead = detail.standard;
                    for(var key in detailHead){
                        var item = detailHead[key].split(",");
                        headData.push({
                            id: key,
                            testItem: item[0],
                            itemUnit: item[1],
                            rawTestItemStandard: item[2],
                        })
                    }

                    let detailTbody = detail.unqualifiedDetail;
                    for(let j=0; j<detailTbody.length; j++){
                        let testItemResults = detailTbody[j].testItemResults;
                        let tbodyMiddleData = {};
                        testItemResults.map((e,index) => {
                            tbodyMiddleData[index] = {
                                'isValid':e.isValid,
                                'testResult':e.testResult,
                                'id':e.id,
                            }
                        });
                        tbodyData.push({
                            index: `${j+1}`,
                            id: detailTbody[j].id,
                            serialNumber: detailTbody[j].serialNumber,
                            resultRecordList: tbodyMiddleData,
                            decision: detailTbody[j].decision
                        })
                    }
                    // judger = detail.unqualifiedHead.tester?detail.unqualifiedHead.tester:'无';
                    judger = this.props.menuList.name;
                    judgement = detail.isQualified ;
                    this.setState({
                        checkData: {
                            headData: headData,
                            tbodyData: tbodyData,
                            judgement: judgement,
                            judger: judger,
                            topData: topData,
                        },
                        type:type,
                        visible: true,
                    })
                }else{
                    //成品数据组装
                    var topData = {};  //头部数据
                    var testDTOS = [];  //中部项目
                    var testData = {};  //检验数据
                    var isQualified = '';
                    var optional = {};  //择优数据
                    isQualified =  detail.isQualified?detail.isQualified:0;
                    topData = {
                        serialNumber: detail.unqualifiedDetail[0]?detail.unqualifiedDetail[0].serialNumber:'无',
                        materialName: detail.unqualifiedHead.materialName,
                        sampleDeliveringDate: detail.unqualifiedHead.date?detail.unqualifiedHead.date:'无',
                        id: detail.unqualifiedDetail[0].id
                    };
                    const testItemResults = detail.unqualifiedDetail[0].testItemResults;
                    if(testItemResults) {
                        for(var i=0; i<testItemResults.length; i++){
                            var e = testItemResults[i];
                            var standard = detail.standard[i].split(',');
                            testDTOS.push({
                                index:`${i+1}`,
                                id:e.id,
                                testItemId:e.testItemId,
                                testItemName:standard[0],
                                testResult:e.testResult,
                                rawTestItemStandard:standard[2],
                                unit:standard[1],
                                isValid: e.isValid
                            })
                        }
                    }
                    testData = {
                        tester: detail.unqualifiedHead.tester?detail.unqualifiedHead.tester:'无',
                        testTime: detail.unqualifiedHead.date?detail.unqualifiedHead.date:'无',
                    };
                    // 择优数据
                    optional = {
                        // optionalStatus: detail.testReportRecord.qualityLevel?detail.testReportRecord.qualityLevel:'',
                        // optionalData: {
                        //     personer: detail.testReportRecord.ratePersonId?detail.testReportRecord.ratePersonId:'无',
                        //     personTime:detail.testReportRecord.rateDate?detail.testReportRecord.rateDate:'无',
                        // }
                        optionalStatus: '',
                        optionalData: {
                            personer: '无',
                            personTime:'无',
                        }
                    };
                    const examineStatus = this.props.checkStatus;
                    const batchNumberId = detail.batchNumberId?detail.batchNumberId:'';
                    if((examineStatus===2||examineStatus===3)&&batchNumberId){
                        axios({
                            url:`${this.props.url.toDoList}/${batchNumberId}/result`,
                            method:'get',
                            headers:{
                                'Authorization':this.props.url.Authorization
                            }
                        }).then((data)=>{
                            const examine = data.data.data;
                            this.setState({
                                detailData:{
                                    topData: topData,
                                    testDTOS: testDTOS,
                                    testData: testData,
                                    examine: {
                                        examineStatus: examineStatus,
                                        examineData: examine,
                                    },
                                    optional: optional,
                                    isQualified: isQualified,
                                },
                                type:type,
                                visible: true,
                            });
                        })
                    }else{
                        this.setState({
                            detailData:{
                                topData: topData,
                                testDTOS: testDTOS,
                                testData: testData,
                                examine: {
                                    examineStatus: examineStatus,
                                    examineData: []
                                },
                                optional: optional,
                                isQualified: isQualified,
                            },
                            type:type,
                            visible: true,
                        })
                    }
                }

            }else{
                message.info('查询数据为空，请联系管理员')
            }

        }).catch(()=>{
            message.info('打开失败，请联系管理员！')
        })

    }
    /**监听送审select变化事件 */
    /**监控申请送审弹出框的visible */
    handleVisibleChange(visible){
        this.setState({
            subVisible:visible
        })
    }
    /**监听select变化事件 */
    selectChange(value){
        this.setState({
            process:value
        })
    }
    /**监控是否紧急 */
    urgentChange(checked){
        this.setState({
            urgent:checked?1:0
        })
    }
    /**点击取消送审 */
    handleCancelApply(){
        this.setState({
            subVisible:false,
        })
        // this.props.cancle();
    }
    /**点击确定送审 */
    handleOkApply(){
        this.clickSavaButton(1);
    }
    /**点击保存按钮 */
    handleSave(){
        this.clickSavaButton(0);
    }
    /**点击取消按钮 */
    handleCancel(){
        this.setState({
            visible:false
        })
    }

    /**实现保存按钮功能--实现保存的数据处理 */
    clickSavaButton = (status) => {
        //  实现保存的数据处理
        const type =  this.state.type;
        var saveData = {};
        if(type===1){
            /**
             *实现进货数据保存
             */
            var checkData = this.state.checkData;
            var resultDTOList = [];
            for(var i=0; i<checkData.tbodyData.length; i++){
                var testItemResults = [];
                let resultRecordList = checkData.tbodyData[i].resultRecordList
                for(var key in resultRecordList){
                    var item = resultRecordList[key];
                    testItemResults.push(item);
                }
                var result = {
                    decision: checkData.tbodyData[i].decision,
                    id: checkData.tbodyData[i].id,
                    testItemResults: testItemResults
                };
                resultDTOList.push(result);
            }
            saveData = {
                resultDTOList:resultDTOList,
                testerId: this.props.menuList.userId
            };
        }else{
            /**
             *实现成品数据保存
             */
            var detailData = this.state.detailData;
            var resultDTOList = [];
            var result = {
                decision: detailData.isQualified,
                id: detailData.topData.id,
                testItemResults: detailData.testDTOS
            };
            resultDTOList.push(result);
            saveData = {
                resultDTOList:resultDTOList,
                testerId: this.props.menuList.userId
            };

        }

        // if(detailIsQualified === -1){
        //     message.info('请点击合格或者不合格！');
        //     return
        // }
        // if(detailTestDTOS){
        //     for(var j=0; j<detailTestDTOS.length; j++){
        //         if(detailTestDTOS[j].testResult === ''){
        //             message.info('所有检测结果不能为空，请填写完整！');
        //             return
        //         }
        //     }
        // }
        //  调用保存函数
        this.useSavaFunction(saveData,status);

    };
    /**调用保存函数 */
    useSavaFunction = (saveData,status) => {
        axios({
            url : `${this.props.url.unqualifiedExamineTable.unqualifiedTestReportRecord}`,
            method:'put',
            headers:{
                'Authorization': this.props.url.Authorization
            },
            data: saveData,
            type:'json'
        }).then((data)=>{
            if(status){
                const dataId = this.props.batchNumberId;
                this.applyReview(dataId);
            }else{
                this.setState({
                    visible: false,
                    subVisible: false,
                });
                // this.props.fetch();
                message.info(data.data.message);
            }
        }).catch(()=>{
            message.info('保存失败，请联系管理员！')
        })
    };
    /**---------------------- */
    /**送审 */
    applyReview(dataId){
        axios({
            url : `${this.props.url.toDoList}/${parseInt(this.state.process)}`,
            method:'post',
            headers:{
                'Authorization': this.props.url.Authorization
            },
            params:{
                dataId:dataId,
                isUrgent:this.state.urgent
            }
        }).then((data)=>{
            this.setState({
                visible: false,
                subVisible: false,
            });
            // this.props.fetch();
            message.info(data.data.message);
        }).catch(()=>{
            message.info('审核失败，请联系管理员！')
        });
    }

}

export default EditSpan;