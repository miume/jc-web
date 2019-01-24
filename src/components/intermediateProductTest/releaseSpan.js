import React from 'react';
import axios from 'axios';
import {Modal, Button, message} from 'antd';
import DrSpanModal from './drSpanModal';
import './interProduct.css';


const data = [];
for (let i = 0; i < 50; i++) {
    data.push({
        index:i,
        id: i,
        testItem: `测试`,
        testResult: '0.001',
        itemUnit: `g/mL`,
    });
}

class ReleaseSpan extends React.Component {
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
        this.handleCancel = this.handleCancel.bind(this);
        this.handleRelease = this.handleRelease.bind(this);
        this.handleReleaseButton = this.handleReleaseButton.bind(this);
    }
    render() {
        const { visible } = this.state;
        return (
            <span>
                <span className="blue" onClick={this.handleRelease}>发布</span>
                <Modal
                    title="数据发布"
                    visible={visible}
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    width="500px"
                    footer={[
                        <Button key="back" style={{right:'330px'}}  onClick={this.handleCancel}>返回</Button>,
                        <Button key="release" style={{width:'80px',height:'35px',background:'#0079FE',color:'white'}} onClick={this.handleReleaseButton} ><i className="fa fa-paper-plane" style={{fontWeight:'bolder',color:'white'}}></i>&nbsp;发布</Button>
                    ]}
                >
                    <div style={{height:580}}>
                        <DrSpanModal
                            url={this.props.url}
                            data={this.state.detailData}
                            record={this.props.record}
                            // spanStatus={0}
                        />
                    </div>
                </Modal>
            </span>
        )
    }
    handleCancel = () => {
        setTimeout(() => {
            this.setState({
                visible: false,
            });
        }, 500);
    };
    /**点击发布按钮 */
    handleReleaseButton = () => {
        axios({
            url : `${this.props.url.intermediateProduct}?id=${this.props.id}`,
            method:'post',
            headers:{
                'Authorization': this.props.url.Authorization
            }
        }).then((data)=>{
            this.setState({
                visible: false
            });
            this.props.fetch();
            message.info(data.data.message);
        }).catch(()=>{
            message.info('保存失败，请联系管理员！')
        })
    };
    /**点击发布-打开Modal */
    handleRelease() {
        this.getDetailData();
        // this.setState({
        //     visible: true,
        // });
    }
    /**通过id查询详情 */
    getDetailData(){
        axios.get(`${this.props.url.intermediateProduct}/details/${this.props.id}`,{
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then((data)=>{
            const res = data.data.data;
            var topData = {};  //头部数据
            var testDTOS = [];  //中部项目
            var testData = {};  //检验数据
            var isQualified = 0;
            if(res){
                isQualified = res.testReportRecord?res.testReportRecord.isQualified:'';
                topData = {
                    serialNumber: res.serialNumber,
                    materialName: res.materialName,
                    sampleDeliveringDate: res.sampleDeliveringRecord?res.sampleDeliveringRecord.sampleDeliveringDate:''
                };
                if(res.testDTOS) {
                    for(var i=0; i<res.testDTOS.length; i++){
                        var e = res.testDTOS[i];
                        testDTOS.push({
                            index:`${i+1}`,
                            id:e.testItemResultRecord.id,
                            testItemId:e.testItemResultRecord.testItemId,
                            testItemName:e.name,
                            testResult:e.testItemResultRecord.testResult,
                            unit:'g/ml'
                        })
                    }
                }
                testData = {
                    tester: res.tester?res.tester:'',
                    testTime: res.testReportRecord?res.testReportRecord.judgeDate:'',
                };
                const examineStatus = res.commonBatchNumber?res.commonBatchNumber.status:'';
                const batchNumberId = res.commonBatchNumber?res.commonBatchNumber.id:'';
                if(examineStatus===2||examineStatus===3){
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
                                    batchNumberId: batchNumberId,
                                    examineStatus: examineStatus,
                                    examineData: res
                                },
                                isQualified: isQualified,
                            },
                            visible: true
                        });
                    })
                }else{
                    this.setState({
                        detailData:{
                            topData: topData,
                            testDTOS: testDTOS,
                            testData: testData,
                            examine: {
                                batchNumberId:batchNumberId,
                                examineStatus: examineStatus,
                                examineData: []
                            },
                            isQualified: isQualified,
                        },
                        visible: true
                    })
                }
            }else{
                message.info('查询数据为空，请联系管理员')
            }
        })
    }
}

export default ReleaseSpan;