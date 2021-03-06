import React from 'react';
import axios from 'axios';
import {Modal, Button, message} from 'antd';
import DrSpanModal from '../intermediateProductTest/drSpanModal';
import CancleButton from '../../../BlockQuote/cancleButton';



class DetailSpan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            detailData:{
                topData: {
                    serialNumber:'',
                    materialName:'',
                    sampleDeliveringDate:''
                },   //头部数据
                testDTOS: [],   //中部项目
                testData: {},   //检验数据
                examine: {       //审核数据
                    examineStatus: 1000,
                    examineData: []
                },
                isQualified: '', //不合格状态
            },
        };
        this.handleDetail = this.handleDetail.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.selectionOnDetail = this.selectionOnDetail.bind(this);
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    render() {
        const { visible } = this.state;
        var footer;
        if(this.props.unGenerateDate === false){
            footer = [
                <CancleButton
                    handleCancel={this.handleCancel}
                    flag = {true}
                    key="back"
                />
            ]
        }else{
            footer = [
                    <CancleButton
                        handleCancel={this.handleCancel}
                        flag = {true}
                        key="back"
                    />,
                    <Button key="publish" type="primary"  onClick={this.selectionOnDetail}><i className="fa fa-check-square-o" aria-hidden="true" style={{color:'white',fontWeight:'bolder'}}></i>&nbsp;选中</Button>
            ]}
        return (
            <span>
                <span className="blue" onClick={this.handleDetail} >详情</span>
                <Modal
                    title="数据详情"
                    visible={visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    footer={footer}
                >
                    <div style={{height:580}}>
                        <DrSpanModal
                            url={this.props.url}
                            data={this.state.detailData}
                        />
                    </div>
                </Modal>
            </span>
        )
    }
    /**实现detailSpan里的选中功能 */
    selectionOnDetail = () => {
        this.props.modifySelectedRowKeysData(this.props.batchNumberId);
        this.setState({
            visible: false,
        });

    };
    /**---------------------- */
    /**点击详情 */
    handleDetail() {
        this.getDetailData();
    }


    // getDetailData(){
    //     axios({
    //         url : `${this.props.url.productInspection.productRecord}/${this.props.batchNumberId}`,
    //         method:'get',
    //         headers:{
    //             'Authorization': this.props.url.Authorization
    //         },
    //     }).then((data)=>{
    //         const detail = data.data.data;
    //         var topData = {};  //头部数据
    //         var middleTestDTOS = [];  //中部项目
    //         var testData = {};  //检验数据
    //         var isQualified = 0;
    //         if(detail){
    //             //  子段没有
    //             isQualified = detail.testReportRecord?detail.testReportRecord.isQualified:'';
    //             topData = {
    //                 serialNumber: detail.batch?detail.batch:'无',
    //                 materialName: detail.matName?detail.matName:'无',
    //                 sampleDeliveringDate: detail.deliveringDate?detail.deliveringDate:'无'
    //             };
    //             const testDTOS = detail.testResultDTOList;
    //             if(testDTOS) {
    //                 for(var i=0; i<testDTOS.length; i++){
    //                     var e = testDTOS[i];
    //                     middleTestDTOS.push({
    //                         index:`${i+1}`,
    //                         id:e.testItemResultRecord.id,
    //                         testItemId:e.testItemResultRecord.testItemId,
    //                         testItemName:e.testItem.name?e.testItem.name:'无',
    //                         testResult:e.testItemResultRecord.testResult,
    //                         rawTestItemStandard:e.standardValue?e.standardValue:'无',
    //                         unit:e.testItem.unit?e.testItem.unit:'无',
    //                         isValid: e.testItemResultRecord.isValid,
    //                         isAudit: e.testItemResultRecord.isAudit
    //                     })
    //                 }
    //             }
    //             testData = {
    //                 tester: detail.tester?detail.tester:'无',
    //                 testTime: detail.testReportRecord?detail.testReportRecord.judgeDate:'无',
    //             };
    //             const examineStatus = this.props.checkStatus
    //             const batchNumberId = detail.testReportRecord?detail.testReportRecord.batchNumberId:'';
    //             if((examineStatus===2||examineStatus===3)&&batchNumberId){
    //                 axios({
    //                     url:`${this.props.url.toDoList}/${batchNumberId}/result`,
    //                     method:'get',
    //                     headers:{
    //                         'Authorization':this.props.url.Authorization
    //                     }
    //                 }).then((data)=>{
    //                     const res = data.data.data;
    //                     if(res===null){
    //                         this.setState({
    //                             detailData:{
    //                                 topData: topData,
    //                                 testDTOS: middleTestDTOS,
    //                                 testData: testData,
    //                                 examine: {
    //                                     examineStatus: examineStatus,
    //                                     examineData: []
    //                                 },
    //                                 isQualified: isQualified,
    //                             },
    //                             visible: true
    //                         });
    //                     }else{
    //                         this.setState({
    //                             detailData:{
    //                                 topData: topData,
    //                                 testDTOS: middleTestDTOS,
    //                                 testData: testData,
    //                                 examine: {
    //                                     examineStatus: examineStatus,
    //                                     examineData: res
    //                                 },
    //                                 isQualified: isQualified,
    //                             },
    //                             visible: true
    //                         });
    //                     }
    //                 });
    //             }else{
    //                 this.setState({
    //                     detailData:{
    //                         topData: topData,
    //                         testDTOS: middleTestDTOS,
    //                         testData: testData,
    //                         examine: {
    //                             examineStatus: examineStatus,
    //                             examineData: []
    //                         },
    //                         isQualified: isQualified,
    //                     },
    //                     visible: true
    //                 })
    //             }
    //
    //         }else{
    //             message.info('数据为空')
    //         }
    //     }).catch(()=>{
    //         message.info('打开失败，请联系管理员！')
    //     })
    // }

    /**获取该行的记录详情 */
    getDetailData(){
        axios({
            url : `${this.props.url.rawTestReport.detailsByBatchNumberId}?id=${this.props.batchNumberId}`,
            method:'get',
            headers:{
                'Authorization': this.props.url.Authorization
            },
        }).then((data)=>{
            const detail = data.data.data;
            var topData = {};  //头部数据
            var middleTestDTOS = [];  //中部项目
            var testData = {};  //检验数据
            var isQualified = 0;
            if(detail){
                //  子段没有
                isQualified = detail.testReportRecord?detail.testReportRecord.isQualified:'';
                topData = {
                    serialNumber: detail.serialNumber?detail.serialNumber:'无',
                    materialName: detail.materialName?detail.materialName:'无',
                    sampleDeliveringDate: detail.sampleDeliveringRecord?detail.sampleDeliveringRecord.sampleDeliveringDate:'无'
                };
                const testDTOS = detail.testDTOS;
                if(testDTOS) {
                    for(var i=0; i<testDTOS.length; i++){
                        var e = testDTOS[i];
                        middleTestDTOS.push({
                            index:`${i+1}`,
                            id:e.testItemResultRecord.id,
                            testItemId:e.testItemResultRecord.testItemId,
                            testItemName:e.name,
                            testResult:e.testItemResultRecord.testResult,
                            unit:'g/mL'
                        })
                    }
                }
                testData = {
                    tester: detail.tester?detail.tester:'无',
                    testTime: detail.testReportRecord?detail.testReportRecord.judgeDate:'无',
                };
                const examineStatus = detail.commonBatchNumber?detail.commonBatchNumber.status:'';
                const batchNumberId = detail.commonBatchNumber?detail.commonBatchNumber.id:'';
                if((examineStatus===2||examineStatus===3)&&batchNumberId){
                    axios({
                        url:`${this.props.url.toDoList}/${batchNumberId}/result`,
                        method:'get',
                        headers:{
                            'Authorization':this.props.url.Authorization
                        }
                    }).then((data)=>{
                        const res = data.data.data;
                        if(res===null){
                            this.setState({
                                detailData:{
                                    topData: topData,
                                    testDTOS: middleTestDTOS,
                                    testData: testData,
                                    examine: {
                                        examineStatus: examineStatus,
                                        examineData: []
                                    },
                                    isQualified: isQualified,
                                },
                                visible: true
                            });
                        }else{
                            this.setState({
                                detailData:{
                                    topData: topData,
                                    testDTOS: middleTestDTOS,
                                    testData: testData,
                                    examine: {
                                        examineStatus: examineStatus,
                                        examineData: res
                                    },
                                    isQualified: isQualified,
                                },
                                visible: true
                            });
                        }
                    });
                }else{
                    this.setState({
                        detailData:{
                            topData: topData,
                            testDTOS: middleTestDTOS,
                            testData: testData,
                            examine: {
                                examineStatus: examineStatus,
                                examineData: []
                            },
                            isQualified: isQualified,
                        },
                        visible: true
                    })
                }

            }else{
                message.info('数据为空')
            }
        }).catch(()=>{
            message.info('打开失败，请联系管理员！')
        })
    }

}

export default DetailSpan;
