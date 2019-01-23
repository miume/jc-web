import React from 'react';
import axios from 'axios';
import { Modal,Button,message } from 'antd';
import DrSpanModal from './drSpanModal';
import './interProduct.css';
import CancleButton from '../BlockQuote/cancleButton';


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
                    batchNumberId: '',
                    examineStatus: '',
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
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    footer={[
                        <CancleButton
                            handleCancel={this.handleCancel}
                            flag = {true}
                            key="back"
                        />,
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
                const examineStatus = res.commonBatchNumber?res.commonBatchNumber.status:1000;
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
                                    batchNumberId:batchNumberId,
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

export default DetailSpan;