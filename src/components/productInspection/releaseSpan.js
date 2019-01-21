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

class ReleaseSpan extends React.Component {
    Authorization;
    server;
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            subVisible: false,
            process:-1,
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
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDetail = this.handleDetail.bind(this);
        this.getDetailData = this.getDetailData.bind(this);
    }
    render() {
        const { visible } = this.state;
        return (
            <span>
                <span  className="blue" onClick={this.handleDetail}>发布</span>
                <Modal
                    title="数据发布"
                    visible={visible}
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    // width="500px"
                    footer={[
                        <Button key="back" style={{right:'330px'}}  onClick={this.handleCancel}>返回</Button>,
                        <Button style={{width:'80px',height:'35px',background:'#0079FE',color:'white'}} onClick={this.props.handleReleaseNew} ><i className="fa fa-paper-plane" style={{fontWeight:'bolder',color:'white'}}></i>&nbsp;发布</Button>
                    ]}
                >
                    <div style={{height:550}}>
                        <DrSpanModal
                            // checkStatus={'4'}
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
                            isQualified: isQualified,
                        },
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

export default ReleaseSpan;