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
            // dataSource:{}
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
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
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
            // if(res&&res.testDTOS) {
            //     for(var i = 1; i<=res.testDTOS.length; i++){
            //         var e = res.testDTOS[i-1];
            //         e['index'] = i;
            //     }
            //     this.setState({
            //         dataSource:res
            //     })
            // }else{
            //     this.setState({
            //         dataSource: []
            //     })
            // }
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
                console.log('11')
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

            }
        }).catch(()=>{
            message.info('打开失败，请联系管理员！')
        })
    }

}

export default DetailSpan;