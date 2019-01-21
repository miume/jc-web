import React from 'react';
import {Modal, message} from 'antd';
import CheckSpanModal from './checkSpanModal';
import CancleButton from '../BlockQuote/cancleButton';
import SaveButton from '../BlockQuote/saveButton';
import Submit from '../BlockQuote/submit';
import axios from "axios";
import PurchaseModal from "../purchaseCheckReport/purchaseModal";

const data = [];
for (let i = 0; i < 50; i++) {
    data.push({
        index:i,
        id: i,
        testItem: `测试`,
        testResult: '0.001',
        a: '0.002',
        itemUnit: `kg`,
    });
}

class CheckSpan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            subVisible: false,
            process:-1,
            checkData:{
                topData: {},   //头部数据
                testDTOS: [],   //中部项目
                testData: {},   //检验数据
                isQualified: '', //不合格状态
            },
        };

        this.handleCheck = this.handleCheck.bind(this);
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
        this.modifyDetailData = this.modifyDetailData.bind(this);
        this.inputSave = this.inputSave.bind(this);
    }
    render() {
        const { visible } = this.state;
        return (
            <span>
                <span  className="blue" onClick={this.handleCheck}>录检</span>
                <Modal
                    title="数据录检"
                    visible={visible}
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    // width="500px"
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
                    <div style={{height:550}}>
                        <CheckSpanModal
                            data={this.state.checkData}
                            modifyDetailData={this.modifyDetailData}
                            inputSave={this.inputSave}
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
        var checkData = this.state.checkData;
        checkData.testDTOS[name].testResult = value;
        this.setState({
            checkData:checkData
        })
    }
    /**修改checkData的数据--专用于表格判定事件 */
    modifyDetailData = (data) => {
        this.setState({
            checkData:data
        })
    };
    /**点击编辑 */
    handleCheck = () => {
        this.getDetailData();
        this.setState({
            visible: true,
        });
    };

    getDetailData = () =>{
        axios({
            url:`${this.props.url.productInspection.productRecord}/${this.props.batchNumberId}`,
            method : 'get',
            headers:{
                'Authorization': this.props.url.Authorization
            },
        }).then((data)=>{
            const res = data.data.data;
            var topData = {};  //头部数据
            var testDTOS = [];  //中部项目
            var testData = {};  //检验数据
            var isQualified = 0;
            if(res){
                isQualified = res.isPublished;
                topData = {
                    serialNumber: res.repoBaseSerialNumber.serialNumber,
                    materialName: res.repoBaseSerialNumber.materialName,
                    sampleDeliveringDate: res.deliveringDate
                };
                const testResultDTOList = res.testResultDTOList;
                if(testResultDTOList) {
                    for(var i=0; i<testResultDTOList.length; i++){
                        var e = testResultDTOList[i];
                        testDTOS.push({
                            index:`${i+1}`,
                            id:e.testItemResultRecord.id,
                            testItemId:e.testItemResultRecord.testItemId,
                            testItemName:e.testItem.name,
                            testResult:e.testItemResultRecord.testResult,
                            rawTestItemStandard:e.standardValue,
                            unit:e.testItem.unit
                        })
                    }
                }
                testData = {
                    tester: res.testReportRecord?res.testReportRecord.judger:'',
                    testTime: res.testReportRecord?res.testReportRecord.judgeDate:'',
                };
                this.setState({
                    checkData:{
                        topData: topData,
                        testDTOS: testDTOS,
                        testData: testData,
                        isQualified: isQualified,
                    },
                });
            }
        })
    }
    /**监听送审select变化事件 */
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
        var checkData = this.state.checkData;
        var validTestRecords = [];
        for(let i=0; i<checkData.tbodyData.length; i++){
            var resultRecordList = [];
            for (let j in checkData.tbodyData[i].resultRecordList) {
                resultRecordList.push(checkData.tbodyData[i].resultRecordList[j]); //属性
            }
            var validTestRecordsObj = {
                id: checkData.tbodyData[i].id,
                resultRecordList: resultRecordList
            };
            validTestRecords.push(validTestRecordsObj)
        }
        //组装testResultDTOList格式
        var testResultDTOLists = [];
        for(var j=0; j<checkData.testDTOS.length; j++){
            const e = checkData.testDTOS[j];
            var testResultDTOList = {
                testItemResultRecord: {
                    id: e.id,
                    testResult: e.testResult
                }
            }
            testResultDTOLists.push(testResultDTOList)
        }

        //  需要知道保存的格式
        var saveData = {
            batchNumberId: this.props.batchNumberId,
            deliveringDate: checkData.topData.sampleDeliveringDate,
            repoBaseSerialNumber: {
                serialNumber: checkData.topData.serialNumber,
                materialName: checkData.topData.materialName
            },
            testResultDTOLists: testResultDTOLists,
            testReportRecord: {
                isQualified: checkData.isQualified
            },

        };
        console.log('saveData',saveData)

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
            url : `${this.props.url.productInspection.productRecord}`,
            method:'put',
            headers:{
                'Authorization': this.props.url.Authorization
            },
            data: saveData,
            type:'json'
        }).then((data)=>{
            console.log('data',data.data.data)
            if(status){
                const dataId = data.data.data;
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

    /**---------------------- */
    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */

}

export default CheckSpan;