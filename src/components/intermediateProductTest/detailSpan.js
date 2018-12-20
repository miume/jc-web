import React from 'react';
import axios from 'axios';
import { Modal,Button } from 'antd';
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
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    width="500px"
                    footer={[
                        <Button key="back" style={{right:'415px'}}  onClick={this.handleCancel}>返回</Button>,
                    ]}
                >
                    <div style={{height:580}}>
                        <DrSpanModal
                            url={this.props.url}
                            data={this.state.detailData}
                            record={this.props.record}
                        />
                    </div>
                </Modal>
            </span>
        )
    }
    /**点击详情 */
    handleDetail() {
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
            console.log('details',res)
            // this.setState({
            //     detailData:details,
            // });
            var topData = {};  //头部数据
            var testDTOS = [];  //中部项目
            var testData = {};  //检验数据
            var isQualified = 0;
            if(res){
                isQualified = res.testReportRecord?res.testReportRecord.isQualified:'';
                console.log('isQualified',isQualified)
                topData = {
                    serialNumberId: res.sampleDeliveringRecord?res.sampleDeliveringRecord.serialNumberId:'',
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
                const examineStatus = res.commonBatchNumber?res.commonBatchNumber.status:1000;
                const batchNumber = res.commonBatchNumber?res.commonBatchNumber.batchNumber:'';
                if(examineStatus==='2'||examineStatus==='3'){
                    axios({
                        url:`${this.url.toDoList}/${batchNumber}/result`,
                        method:'get',
                        headers:{
                            'Authorization':this.url.Authorization
                        }
                    }).then((data)=>{
                        const res = data.data.data;
                        console.log('pp',isQualified)
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
                                examineStatus: examineStatus,
                                examineData: []
                            },
                            isQualified: isQualified,
                        },
                        visible: true
                    })
                }
            }
        })
    }
    /**通过发布状态，判断是否有审核人 */
    // getExamineData = () => {
    //     const examineStatus = this.props.data.commonBatchNumber?this.props.data.commonBatchNumber.status:'';
    //     const batchNumber = this.props.data.commonBatchNumber?this.props.data.commonBatchNumber.batchNumber:'';
    //     if(examineStatus==='2'||examineStatus==='3'){
    //         axios({
    //             url:`${this.url.toDoList}/${batchNumber}/result`,
    //             method:'get',
    //             headers:{
    //                 'Authorization':this.url.Authorization
    //             }
    //         }).then((data)=>{
    //             const res = data.data.data;
    //             this.setState({
    //                 examineData : res
    //             })
    //         })
    //     }
    // };
}

export default DetailSpan;