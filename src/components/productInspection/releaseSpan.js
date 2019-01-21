import React from 'react';
import {Modal, Button, message} from 'antd';
import DrSpanModal from './drSpanModal';
import './productInspection.css';
import axios from "axios";
import CancleButton from '../BlockQuote/cancleButton';
<<<<<<< HEAD
const data = [];
for (let i = 0; i < 50; i++) {
    data.push({
        index:i,
        id: i,
        testItem: `测试`,
        testResult: '0.001',
        a: '0.002',
        itemUnit: `g/mL`,
    });
}
=======

>>>>>>> ce81f1fdc8a64eaf25311684a3fdde015a32ce12

class ReleaseSpan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            subVisible: false,
            checkData:{
                topData: {},   //头部数据
                testDTOS: [],   //中部项目
                testData: {},   //检验数据
                isQualified: '', //不合格状态
            },
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDetail = this.handleDetail.bind(this);
        this.getDetailData = this.getDetailData.bind(this);
        this.handleRelease = this.handleRelease.bind(this);
    }
    render() {
        const { visible } = this.state;
        return (
            <span>
                <span className="blue"  onClick={this.handleDetail}>发布</span>
                <Modal
                    title="数据发布"
                    visible={visible}
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    width="500px"
                    footer={[
                        <CancleButton
                            key="back"
                            flag = {1}
                            handleCancel={this.handleCancel}
                        />,
                        <Button style={{width:'80px',height:'35px',background:'#0079FE',color:'white'}} onClick={this.props.handleRelease} ><i className="fa fa-paper-plane" style={{fontWeight:'bolder',color:'white'}}></i>&nbsp;发布</Button>
                    ]}
                >
                    <div style={{height:640}}>
                        <DrSpanModal
                            data={this.state.checkData}
                        />
                    </div>
                </Modal>
            </span>
        )
    }
    handleRelease = () => {
        axios({
            url:`${this.props.url.purchaseCheckReport.purchaseReportRecord}/${this.props.batchNumberId}`,
            method:'put',
            headers:{
                'Authorization':this.props.url.Authorization
            },
        }).then((data)=>{
            this.props.fetch();
            message.info(data.data.message);
        }).catch(()=>{
            message.info('发布失败，请联系管理员！');
        });
        this.setState({
            visible: false,
        });
    };
    /**点击详情 */
    handleDetail() {
        this.getDetailData();
    }
<<<<<<< HEAD
    showModal = () => {
=======
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
    handleCancel = () => {
>>>>>>> ce81f1fdc8a64eaf25311684a3fdde015a32ce12
        this.setState({
            visible: false,
        });
    };

}
export default ReleaseSpan