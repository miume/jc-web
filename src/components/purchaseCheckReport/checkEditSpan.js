import React from 'react';
import axios from 'axios';
import { Modal} from 'antd';
import PurchaseModal from './purchaseModal';
import CancleButton from '../BlockQuote/cancleButton';
import SaveButton from '../BlockQuote/saveButton';
import Submit from '../BlockQuote/submit';


class CheckEditSpan extends React.Component {
    url;
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            subVisible: false,
            process:-1,
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.subHide = this.subHide.bind(this);
        this.subOk = this.subOk.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.selectChange = this.selectChange.bind(this);
    }
    render() {
        const { visible } = this.state;
        this.url = JSON.parse(localStorage.getItem('url'));
        return(
            <span>
                <span className="blue" onClick={this.handleEdit} >编辑</span>
                <Modal
                    title="编辑数据"
                    visible={visible}
                    width="1030px"
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    // footer下的每个组件都要有唯一的key
                    footer={[
                        <CancleButton
                            handleCancel = {this.handleCancel}
                            key='cancel'
                        />,
                        <SaveButton
                            onClick={this.handleOk}
                            key='save'
                        />,
                        <Submit
                            url={this.url}
                            Authorization={this.Authorization}
                            server={this.server}
                            visible={this.state.subVisible}
                            handleCancel={this.subHide}
                            handleOk={this.subOk}
                            handleVisibleChange={this.handleVisibleChange}
                            selectChange={this.selectChange}
                            key='submit'
                            process={this.state.process}
                        />
                    ]}
                >
                    <div style={{height:500}}>
                        <PurchaseModal
                            clickState ={0}
                        />

                    </div>
                </Modal>
            </span>
        )
    }
    /**点击编辑 */
    handleEdit() {
        this.getDetailData();
        this.setState({
            visible: true,
        });
    }
    /**获取该行的记录详情 */
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
    /**监听送审select变化事件 */
    selectChange(value){
        this.setState({
            process:value
        })
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
    handleCancel = () => {
        setTimeout(() => {
            this.setState({
                visible: false,
            });
        }, 500);
    };
    subHide = () => {
        this.setState({
            subVisible: false,
        });

    };
    subOk = () => {
        console.log('ok');
    };
    handleVisibleChange = (subVisible) => {
        this.setState({ subVisible });
    };

}

export default CheckEditSpan;