import React from 'react';
import {message, Modal} from 'antd';
import PurchaseModal from '../purchaseCheckReport/purchaseModal';
import CancleButton from '../BlockQuote/cancleButton';
import SaveButton from '../BlockQuote/saveButton';
import Submit from '../BlockQuote/submit';
import './unqualifiedExamine.css';
import axios from "axios";

const topData = {
    materialName: '硫酸钴',
    norm: '25Kg/袋',
    quantity: '32',
    sampleDeliveringDate: '2018-12-27 12：20：20',
    deliveryFactory: '启东北新'
};
const headData = [];
for(let i=0; i<20; i++){
    headData.push({
        id: i,
        testItem: `Ca${i}`,
        itemUnit: '%',
        rawTestItemStandard: '>= 20.00'
    })
}
const tbodyData = [];
for(let j=0; j<20; j++){
    tbodyData.push({
        index: j+1,
        id: j,
        serialNumber: `SNS/${j}`,
        isQualified: 1,
        tbodyMiddleData: {
            Ca0:{
                isValid: 1,
                testResult: j+100,
                id: j
            }
            ,Ca1:{
                isValid: 1,
                testResult: j+100,
                id: j+1
            }
            ,Ca2:{
                isValid: 1,
                testResult: j+100,
                id: j+2
            }
            ,Ca3:{
                isValid: 1,
                testResult: j+100,
                id: j+3
            }
            ,Ca4:{
                isValid: 1,
                testResult: j+100,
                id: j+4
            }
            ,Ca5:{
                isValid: 1,
                testResult: j+100,
                id: j+5
            }
            ,Ca6:{
                isValid: 1,
                testResult: j+100,
                id: j+6
            }
            ,Ca7:{
                isValid: 1,
                testResult: j+100,
                id: j+7
            }
            ,Ca8:{
                isValid: 1,
                testResult: j+100,
                id: j+8
            }
            ,Ca9:{
                isValid: 1,
                testResult: j+100,
                id: j+9
            }
            ,Ca10:{
                isValid: 1,
                testResult: j+100,
                id: j+10
            }
            ,Ca11:{
                isValid: 1,
                testResult: j+100,
                id: j+11
            }
            ,Ca12:{
                isValid: 1,
                testResult: j+100,
                id: j+12
            }
            ,Ca13:{
                isValid: 1,
                testResult: j+100,
                id: j+13
            }
            ,Ca14:{
                isValid: 1,
                testResult: j+100,
                id: j+14
            }
            ,Ca15:{
                isValid: 1,
                testResult: j+100,
                id: j+15
            }
            ,Ca16:{
                isValid: 1,
                testResult: j+100,
                id: j+16
            }
            ,Ca17:{
                isValid: 1,
                testResult: j+100,
                id: j+17
            }
            ,Ca18:{
                isValid: 1,
                testResult: j+100,
                id: j+18
            }
            ,Ca19:{
                isValid: 1,
                testResult: j+100,
                id: j+19
            }
            ,Ca20:{
                isValid: 1,
                testResult: j+100,
                id: j+20
            }
        }
    })
}
const judgement = 1;
const judger = '周小伟';


class EditSpan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            subVisible: false,
            process:-1,
            checkData: {
                headData: headData,
                tbodyData: tbodyData,
                judgement: judgement,
                judger: judger,
                topData: topData,
            },
        };
        this.inputSave = this.inputSave.bind(this);
        this.modifyDetailData = this.modifyDetailData.bind(this);
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
    }
    render() {
        const { visible } = this.state;
        return(
            <span>
                <span className="blue" onClick={this.handleEdit} >编辑</span>
                <Modal
                    title="编辑数据"
                    visible={visible}
                    width="1030px"
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
                    <div style={{height:500}}>
                        <PurchaseModal
                            modifyDetailData={this.modifyDetailData}
                            inputSave={this.inputSave}
                            data={this.state.checkData}
                            clickState ={0} //是否可以点击 0:可以点红， 其余：不可以点红
                        />

                    </div>
                </Modal>
            </span>
        )
    }
    /**input框内容变化，实现自动保存数据 */
    inputSave(e){
        const value = e.target.value;
        const name = e.target.name;
        var detailData = this.state.detailData;
        detailData.topData[name] = value;
        this.setState({
            detailData:detailData
        })
    }
    /**修改detailData的数据 */
    modifyDetailData = (data) => {
        this.setState({
            detailData:data
        })
    }
    /**点击编辑 */
    handleEdit() {
        // this.getDetailData();
        this.setState({
            visible: true,
        })
    }
    /**获取该行的记录详情 */
    getDetailData(){
        // let detail = this.props.record;
        axios({
            url: `${this.props.url.purchaseCheckReport.purchaseReportRecord}/${this.props.id}`,
            method:'get',
            headers:{
                'Authorization': this.props.url.Authorization
            },
        }).then((data)=>{
            const detail = data.data.data;
            var headData = [];
            var tbodyData = [];
            var judger = '';
            var judgement = '';
            var topData = {};
            if(detail){
                topData = {
                    materialName: detail.materialName?detail.materialName:'',
                    norm: detail.purchaseReportRecord?detail.purchaseReportRecord.norm:'',
                    quantity: detail.purchaseReportRecord?detail.purchaseReportRecord.quantity:'',
                    sampleDeliveringDate:'',
                    deliveryFactory:''
                    // sampleDeliveringDate: detail.sampleDeliveringRecordDTO.sampleDeliveringRecord?detail.sampleDeliveringRecordDTO.sampleDeliveringRecord.sampleDeliveringDate:'',
                    // deliveryFactory: detail.sampleDeliveringRecordDTO.deliveryFactory?detail.sampleDeliveringRecordDTO.deliveryFactory.name:'',
                };
                let detailHead = detail.testReportRecordDTOList;
                for(let i=0; i<detailHead[0].testItemResultRecordDTOList.length; i++){
                    headData.push({
                        id: detailHead[0].testItemResultRecordDTOList[i].testItemResultRecord.id,
                        testItem: detailHead[0].testItemResultRecordDTOList[i].testItem.name,
                        itemUnit: detailHead[0].testItemResultRecordDTOList[i].testItem.unit,
                        rawTestItemStandard: detailHead[0].testItemResultRecordDTOList[i].rawTestItemStandard?detailHead[0].testItemResultRecordDTOList[i].rawTestItemStandard.value:'',
                    })
                }
                let detailTbody = detail.testReportRecordDTOList;
                for(let j=0; j<detailTbody.length; j++){
                    let testItemResultRecordDTOList = detailTbody[j].testItemResultRecordDTOList;
                    let tbodyMiddleData = {};
                    testItemResultRecordDTOList.map((e) => {
                        tbodyMiddleData[e.testItem.name] = {
                            'isValid':e.testItemResultRecord.isValid,
                            'testResult':e.testItemResultRecord.testResult,
                            'id':e.testItemResultRecord.id,
                        }
                    });
                    tbodyData.push({
                        index: `${j+1}`,
                        id: detailTbody[j].testReportRecord.id,
                        serialNumber: detailTbody[j].sampleDeliveringRecordDTO.repoBaseSerialNumber.serialNumber,
                        tbodyMiddleData: tbodyMiddleData,
                        isQualified: detailTbody[j].testReportRecord.isQualified
                    })
                }
                judger = this.props.menuList.username;
                judgement = detail.purchaseReportRecord.judgement ;
                this.setState({
                    checkData: {
                        headData: headData,
                        tbodyData: tbodyData,
                        judgement: judgement,
                        judger: judger,
                        topData: topData,
                    },
                    visible: true,
                })
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
        this.setState({
            subVisible: false,
            visible:false
        })
        // this.clickSavaButton(1);
    }
    /**点击保存按钮 */
    handleSave(){
        this.setState({
            visible:false
        })
        // this.clickSavaButton(0);
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
        var checkData = this.state.checkData;
        var purchaseReportRecord = {
            norm: checkData.topData.norm,
            quantity: checkData.topData.quantity,
            judgement: checkData.judgement,
        };
        var sampleDeliveringRecordDTO = {
            deliveryFactory: {
                name: checkData.topData.deliveryFactory
            },
            repoBaseSerialNumber: {
                materialName: checkData.topData.materialName
            },
            sampleDeliveringRecord: {
                sampleDeliveringDate: checkData.topData.sampleDeliveringDate
            }
        };
        var commonBatchNumberDTO = {
            commonBatchNumber: {
                createPersonId: this.props.menuList.userId
            }
        };
        var testReportRecordDTOList = [];
        for(let i=0; i<checkData.tbodyData.length; i++){
            var ItemResultList = [];
            for (let j in checkData.tbodyData[i].tbodyMiddleData) {
                ItemResultList.push(checkData.tbodyData[i].tbodyMiddleData[j]); //属性
            }
            var testReportRecordDTOListObj = {
                testReportRecord:{
                    id: checkData.tbodyData[i].id,
                    isQualified: checkData.tbodyData[i].isQualified
                },
                testItemResultRecordDTOList: ItemResultList
            };
            testReportRecordDTOList.push(testReportRecordDTOListObj)
        }
        var savaData = {
            purchaseReportRecord: purchaseReportRecord,
            sampleDeliveringRecordDTO: sampleDeliveringRecordDTO,
            commonBatchNumberDTO: commonBatchNumberDTO,
            testReportRecordDTOList: testReportRecordDTOList
        };
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
        this.useSavaFunction(savaData,status);

    };
    /**调用保存函数 */
    useSavaFunction = (savaData,status) => {
        axios({
            url : `${this.props.url.purchaseCheckReport.purchaseReportRecord}`,
            method:'put',
            headers:{
                'Authorization': this.props.url.Authorization
            },
            data: savaData,
            type:'json'
        }).then((data)=>{
            if(status){
                const dataId = data.data.data.commonBatchNumber?data.data.data.commonBatchNumber.id:null;
                this.applyReview(dataId);
            }else{
                this.setState({
                    visible: false,
                    subVisible: false,
                });
                this.props.fetch();
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
            this.props.fetch();
            message.info(data.data.message);
        }).catch(()=>{
            message.info('审核失败，请联系管理员！')
        });
    }

}

export default EditSpan;