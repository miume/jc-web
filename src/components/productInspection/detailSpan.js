import React from 'react';
import { Modal,Button } from 'antd';
import DrSpanModal from './drSpanModal';
import './productInspection.css';
import CancleButton from '../BlockQuote/cancleButton'
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
                optional: {},   //择优数据
                isQualified: '', //不合格状态
            },
        };
        this.handleDetail = this.handleDetail.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.getDetailData = this.getDetailData.bind(this);
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    render() {
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
                    // width="500px"
                    footer={[
                        <CancleButton
                            handleCancel = {this.handleCancel}
                            flag = {1}
                        />
                    ]}
                >
                    <div style={{height:550}}>
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
        axios({
            url:`${this.props.url.productInspection.productRecord}/${this.props.batchNumberId}`,
            method : 'get',
            headers:{
                'Authorization': this.props.url.Authorization
            },
        }).then((data)=>{
            const res = data.data.data
            var topData = {};  //头部数据
            var testDTOS = [];  //中部项目
            var testData = {};  //检验数据
            var isQualified = 0;
            var optional = {};  //择优数据
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
                // 择优数据
                optional = {
                    optionalStatus: 1000,
                    optionalData: {
                        personer:'暂定',
                        personTime:'暂定'
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
                    })
                }
            }
        })
    }
}

export default DetailSpan;