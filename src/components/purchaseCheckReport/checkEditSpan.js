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
            detailData:{
                topData: {},   //头部数据
                judger: '',     //检验人
                testDTOS: [],   //中部项目
                judgement: '', //总判定  //0：不合格，1：合格
            },
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.subHide = this.subHide.bind(this);
        this.subOk = this.subOk.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.modifyDetailData = this.modifyDetailData.bind(this);
        this.inputSave = this.inputSave.bind(this);
        // this.handleJudgePass = this.handleJudgePass.bind(this);
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
                            modifyDetailData={this.modifyDetailData}
                            inputSave={this.inputSave}
                            data={this.state.detailData}
                            clickState ={0} //是否可以点击 0:可以点红， 其余：不可以点红
                        />
                    </div>
                </Modal>
            </span>
        )
    }
    /**表格合格判定点击事件*/
    // handleJudgePass = (index) => {
    //     var detailData = this.state.detailData;
    //     // detailData.testDTOS[index].isQualified = 1;
    //     for(var i=0; i<detailData.testDTOS[index].testDTOSItem.length; i++){
    //         detailData.testDTOS[index].testDTOSItem[i].isQualified = 0;
    //     }
    //     this.setState({
    //         detailData:detailData
    //     })
    // };
    /**input框内容变化，实现自动保存数据 */
    inputSave(e){
        console.log(e.target.value)
        console.log(e.target.name)
        const value = e.target.value;
        const name = e.target.name;
        var detailData = this.state.detailData;
        detailData.topData[name] = value;
        this.setState({
            detailData:detailData
        })
    }
    /**修改detailData的数据 */
    modifyDetailData = (data) => {
        this.setState({
            detailData:data
        })
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
        var judger = '';    //检验人
        var testDTOS = [];  //中部项目-表-总数据
        var testDTOSItem = [];  //中部-表-每列数据
        var judgement = 0;
        if(detail){
            judgement = detail.purchaseReportRecord?detail.purchaseReportRecord.judgement:'';
            topData = {
                materialName: detail.sampleDeliveringRecordDTO.repoBaseSerialNumber?detail.sampleDeliveringRecordDTO.repoBaseSerialNumber.materialName:'',
                norm: detail.purchaseReportRecord?detail.purchaseReportRecord.norm:'',
                quantity: detail.purchaseReportRecord?detail.purchaseReportRecord.quantity:'',
                sampleDeliveringDate: detail.sampleDeliveringRecordDTO.sampleDeliveringRecord?detail.sampleDeliveringRecordDTO.sampleDeliveringRecord.sampleDeliveringDate:'',
                deliveryFactory: detail.sampleDeliveringRecordDTO.deliveryFactory?detail.sampleDeliveringRecordDTO.deliveryFactory.name:'',
            };
            judger = detail.testReportRecordDTOList.judegrName?detail.testReportRecordDTOList.judegrName:''
            //  总数据
            const testReportRecordDTOList = detail.testReportRecordDTOList;
            if(testReportRecordDTOList) {
                for(var i=0; i<testReportRecordDTOList.length; i++){
                    //  行数据
                    var e = testReportRecordDTOList[i];
                    var itemList = e.testItemResultRecordDTOList;
                    for(var j=0; j<itemList.length; j++){
                        //  行中列数据--
                        testDTOSItem.push({
                            id:itemList[j].testItemResultRecord.id,
                            testResult:itemList[j].testItemResultRecord.testResult,
                            isValid:itemList[j].testItemResultRecord.isValid,
                            rawTestItemStandard:itemList[j].rawTestItemStandard,
                            name:itemList[j].testItem.name,
                            unit:itemList[j].testItem.unit
                        })
                    }
                    //  将列数据push到总数据中
                    testDTOS.push({
                        index:`${i+1}`,
                        id:e.testReportRecord.id,
                        serialNumber:`暂定${i}`,
                        testDTOSItem:testDTOSItem,
                        isQualified:e.testReportRecord.isQualified
                    })
                }
            }
            this.setState({
                detailData:{
                    topData: topData,
                    judger: judger,     //检验人
                    testDTOS: testDTOS,   //中部项目
                    judgement: judgement, //总判定  //0：不合格，1：合格
                }
            },()=>{
                console.log(this.state.detailData)
            })
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