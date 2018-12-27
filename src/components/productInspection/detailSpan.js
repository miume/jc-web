import React from 'react';
import { Modal,Button } from 'antd';
import DrSpanModal from './drSpanModal';
import './productInspection.css';
import axios from "axios";

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

class DetailSpan extends React.Component {
    server
    Authorization
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
                optionalPerson:{
                    optionalStatus: 1000,
                    optionalData: {
                        personer:'暂定',
                        personTime:'暂定'
                    }
                },
                isQualified: '', //不合格状态
            },
        };
        this.handleDetail = this.handleDetail.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.getDetailData = this.getDetailData.bind(this);
    }

    handleCancel = (e) => {
        setTimeout(() => {
            this.setState({
                visible: false,
            });
        }, 500);
    };
    render() {
        this.Authorization = localStorage.getItem("Authorization");
        this.server = localStorage.getItem('remote');
        const { visible } = this.state;
        return (
            <span>
                <span  className="blue" onClick={this.handleDetail}>详情</span>
                <Modal
                    title="数据详情"
                    visible={visible}
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    width="500px"
                    footer={[
                        <Button key="back" style={{right:'415px'}}  onClick={this.handleCancel}>返回</Button>,
                    ]}
                >
                    <div style={{height:700}}>
                        <DrSpanModal
                            // checkStatus:根据审核状态是否有审核及择优部分
                            // examine={this.state.examine}
                            data={this.state.detailData}
                        />
                    </div>
                </Modal>
            </span>
        )
    }
    /**点击详情 */
    handleDetail() {
        this.getDetailData();
        this.setState({
            visible: true,
        });
    }
    getDetailData = () =>{
        const res = this.props.record;
        var id = res.commonBatchNumberDTO.commonBatchNumber.id
        axios({
            url:`${this.server}/jc/common/productTestRecord/${id}`,
            method : 'get',
            headers:{
                'Authorization': this.Authorization
            },
        }).then((data)=>{
            const res = data.data.data
            var topData = {};  //头部数据
            var testDTOS = [];  //中部项目
            var testData = {};  //检验数据
            var isQualified = 0;
            if(res){
                isQualified = res.testReportRecordDTO.testReportRecord?res.testReportRecordDTO.testReportRecord.isQualified:'';
                topData = {
                    serialNumber: res.sampleDeliveringRecordDTO.repoBaseSerialNumber.serialNumber,
                    materialName: res.sampleDeliveringRecordDTO.repoBaseSerialNumber.materialName,
                    sampleDeliveringDate: res.sampleDeliveringRecordDTO.sampleDeliveringRecord?res.sampleDeliveringRecordDTO.sampleDeliveringRecord.sampleDeliveringDate:''
                };
                const testItemResultRecordDTOList = res.testReportRecordDTO.testItemResultRecordDTOList
                if(testItemResultRecordDTOList) {
                    for(var i=0; i<testItemResultRecordDTOList.length; i++){
                        var e = testItemResultRecordDTOList[i];
                        testDTOS.push({
                            index:`${i+1}`,
                            id:e.testItemResultRecord.id,
                            testItemId:e.testItemResultRecord.testItemId,
                            testItemName:e.testItem.name,
                            testResult:e.testItemResultRecord.testResult,
                            rawTestItemStandard:e.rawTestItemStandard,
                            unit:e.testItem.unit
                        })
                    }
                }
                testData = {
                    tester: res.testReportRecordDTO?res.testReportRecordDTO.judegrName:'',
                    testTime: res.testReportRecordDTO.testReportRecord?res.testReportRecordDTO.testReportRecord.judgeDate:'',
                };
                const examineStatus = this.props.checkStatus;
                const batchNumberId = this.props.record.commonBatchNumberDTO.commonBatchNumber?this.props.record.commonBatchNumberDTO.commonBatchNumber.id:'';
                if((examineStatus===2||examineStatus===3)&&batchNumberId){
                    axios({
                        url:`${this.props.url.toDoList}/${batchNumberId}/result`,
                        method:'get',
                        headers:{
                            'Authorization':this.props.url.Authorization
                        }
                    }).then((data)=>{
                        const res = data.data.data;
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
                            isQualified: isQualified,
                        },
                    })
                }
            }
        })
    }
}

export default DetailSpan;