import React from 'react';
import {Modal, Button, message} from 'antd';
import DrSpanModal from './drSpanModal';
import './productInspection.css';
import axios from "axios";
import CancleButton from '../BlockQuote/cancleButton';

class ReleaseSpan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            subVisible: false,
            detailData:{
                topData: {
                    serialNumber:'',
                    materialName:'',
                    sampleDeliveringDate:''
                },   //头部数据
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
                },
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
                    // width="500px"
                    footer={[
                        <CancleButton
                            key="back"
                            flag = {1}
                            handleCancel={this.handleCancel}
                        />,
                        <Button key="release" style={{width:'80px',height:'35px',background:'#0079FE',color:'white'}} onClick={this.handleRelease} ><i className="fa fa-paper-plane" style={{fontWeight:'bolder',color:'white'}}></i>&nbsp;发布</Button>
                    ]}
                >
                    <div style={{height:580}}>
                        <DrSpanModal
                            data={this.state.detailData}
                        />
                    </div>
                </Modal>
            </span>
        )
    }
    //  处理发布按钮功能
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
            var isQualified = '';
            var optional = {};  //择优数据
            if(res){
                isQualified =  res.testReportRecord?res.testReportRecord.isQualified:'';
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
                            rawTestItemStandard:e.standardValue?e.standardValue:'无',
                            unit:e.testItem.unit,
                            isValid: e.testItemResultRecord.isValid
                        })
                    }
                }
                testData = {
                    tester: res.tester?res.tester:'无',
                    testTime: res.testReportRecord.judgeDate?res.testReportRecord.judgeDate:'无',
                };
                // 择优数据
                optional = {
                    optionalStatus: res.testReportRecord.qualityLevel?res.testReportRecord.qualityLevel:'',
                    optionalData: {
                        personer: res.testReportRecord.ratePersonId?res.testReportRecord.ratePersonId:'无',
                        personTime:res.testReportRecord.rateDate?res.testReportRecord.rateDate:'无',
                    }
                };
                const examineStatus = this.props.checkStatus;
                const batchNumberId = res.testReportRecord?res.testReportRecord.batchNumberId:'';
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
                        visible: true,
                    })
                }
            }
        })
    };
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

}
export default ReleaseSpan