import React from 'react';
import axios from 'axios';
import {Modal, Button, message} from 'antd';
import DrSpanModal from '../intermediateProductTest/drSpanModal';
import CancleButton from '../BlockQuote/cancleButton';


// const data = [];
// for (let i = 0; i < 50; i++) {
//     data.push({
//         index:i,
//         id: i,
//         testItem: `测试`,
//         testResult: '0.001',
//         itemUnit: `g/mL`,
//     });
// }

class DetailSpan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            detailData:{
                topData: {},   //头部数据
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
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = () => {
        setTimeout(() => {
            this.setState({
                visible: false,
            });
        }, 500);
    };
    handleCancel = (e) => {
        setTimeout(() => {
            this.setState({
                visible: false,
            });
        }, 500);
    };
    render() {
        const { visible } = this.state;
        return (
            <span>
                <span className="blue" onClick={this.handleDetail} >详情</span>
                <Modal
                    title="数据详情"
                    visible={visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    width="500px"
                    footer={[
                        <CancleButton
                            handleCancel={this.handleCancel}
                            flag = {true}
                            key="back"
                        />,
                        <Button key="publish" type="primary"  onClick={this.selectionOnDetail}><i className="fa fa-check-square-o" aria-hidden="true" style={{color:'white',fontWeight:'bolder'}}></i>&nbsp;选中</Button>
                    ]}
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
        this.props.modifySelectedRowKeysData(this.props.id);
        setTimeout(() => {
            this.setState({
                visible: false,
            });
        }, 500);

    };
    /**---------------------- */
    /**点击详情 */
    handleDetail() {
        this.getDetailData();
        this.setState({
            visible: true,
        });
    }
    /**通过id查询详情 */
    getDetailData(){
        const detail = this.props.record;
        var topData = {};  //头部数据
        var testDTOS = [];  //中部项目
        var testData = {};  //检验数据
        var isQualified = 0;
        if(detail){
            isQualified = detail.testReportRecordDTO.testReportRecord?detail.testReportRecordDTO.testReportRecord.isQualified:'';
            topData = {
                serialNumber: detail.sampleDeliveringRecordDTO.repoBaseSerialNumber?detail.sampleDeliveringRecordDTO.repoBaseSerialNumber.serialNumber:'',
                materialName: detail.sampleDeliveringRecordDTO.repoBaseSerialNumber?detail.sampleDeliveringRecordDTO.repoBaseSerialNumber.materialName:'',
                sampleDeliveringDate: detail.sampleDeliveringRecordDTO.sampleDeliveringRecord?detail.sampleDeliveringRecordDTO.sampleDeliveringRecord.sampleDeliveringDate:''
            };
            const testItemResultRecordDTOList = detail.testReportRecordDTO.testItemResultRecordDTOList;
            if(testItemResultRecordDTOList) {
                for(var i=0; i<testItemResultRecordDTOList.length; i++){
                    var e = testItemResultRecordDTOList[i];
                    testDTOS.push({
                        index:`${i+1}`,
                        id:e.testItemResultRecord.id,
                        testItemId:e.testItemResultRecord.testItemId,
                        testItemName:e.testItem.name,
                        testResult:e.testItemResultRecord.testResult,
                        unit:e.testItem.unit
                    })
                }
            }
            testData = {
                tester: detail.testReportRecordDTO.judegrName?detail.testReportRecordDTO.judegrName:'',
                testTime: detail.testReportRecordDTO.testReportRecord?detail.testReportRecordDTO.testReportRecord.judgeDate:'',
            };
            const examineStatus = detail.commonBatchNumberDTO.commonBatchNumber?detail.commonBatchNumberDTO.commonBatchNumber.status:'';
            console.log('examineStatus',examineStatus)
            const batchNumberId = detail.commonBatchNumberDTO.commonBatchNumber?detail.commonBatchNumberDTO.commonBatchNumber.id:'';
            console.log('batchNumberId',batchNumberId)
            if(examineStatus===2||examineStatus===3){
                axios({
                    url:`${this.props.url.toDoList}/${batchNumberId}/result`,
                    method:'get',
                    headers:{
                        'Authorization':this.props.url.Authorization
                    }
                }).then((data)=>{
                    const res = data.data.data;
                    // console.log('data',data.data)
                    if(res===null){
                        this.setState({
                            detailData:{
                                topData: topData,
                                testDTOS: testDTOS,
                                testData: testData,
                                examine: {
                                    examineStatus: examineStatus,
                                    examineData: []
                                },
                                isQualified: isQualified,
                            },
                            // visible: true
                        });
                    }else{
                        this.setState({
                            detailData:{
                                topData: topData,
                                testDTOS: testDTOS,
                                testData: testData,
                                examine: {
                                    examineStatus: examineStatus,
                                    examineData: res
                                },
                                isQualified: isQualified,
                            },
                            // visible: true
                        });
                    }
                });
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
                        isQualified: isQualified,
                    },
                })
            }

        }
    }

}

export default DetailSpan;