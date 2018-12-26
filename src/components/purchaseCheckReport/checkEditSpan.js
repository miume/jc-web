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
            checkData: {
                headData: [],
                tbodyData: [],
                judgement: '',
                judger: '',
                topData: {},
            },
            // detailData:{
            //     topData: {},   //头部数据
            //     judger: '',     //检验人
            //     testDTOSHead: [],// 中部头数据
            //     testDTOS: [],   //中部项目
            //     judgement: '', //总判定  //0：不合格，1：合格
            // },
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
                            data={this.state.checkData}
                            clickState ={0} //是否可以点击 0:可以点红， 其余：不可以点红
                        />
                    </div>
                </Modal>
            </span>
        )
    }

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
        let detail = this.props.record;
        console.log(detail)
        var headData = [];
        var tbodyData = [];
        var judger = '';
        var judgement = '';
        var topData = {};
        if(detail){
            topData = {
                materialName: detail.sampleDeliveringRecordDTO.repoBaseSerialNumber?detail.sampleDeliveringRecordDTO.repoBaseSerialNumber.materialName:'',
                norm: detail.purchaseReportRecord?detail.purchaseReportRecord.norm:'',
                quantity: detail.purchaseReportRecord?detail.purchaseReportRecord.quantity:'',
                sampleDeliveringDate: detail.sampleDeliveringRecordDTO.sampleDeliveringRecord?detail.sampleDeliveringRecordDTO.sampleDeliveringRecord.sampleDeliveringDate:'',
                deliveryFactory: detail.sampleDeliveringRecordDTO.deliveryFactory?detail.sampleDeliveringRecordDTO.deliveryFactory.name:'',
            };
            let detailHead = detail.testReportRecordDTOList
            for(let i=0; i<detailHead[0].testItemResultRecordDTOList.length; i++){
                headData.push({
                    id: detailHead[0].testItemResultRecordDTOList[i].testItemResultRecord.id,
                    testItem: detailHead[0].testItemResultRecordDTOList[i].testItem.name,
                    itemUnit: detailHead[0].testItemResultRecordDTOList[i].testItem.unit,
                    rawTestItemStandard: detailHead[0].testItemResultRecordDTOList[i].rawTestItemStandard,
                })
            }
            let detailTbody = detail.testReportRecordDTOList;
            // console.log('detailTbody',detailTbody)
            for(let j=0; j<detailTbody.length; j++){
                let testItemResultRecordDTOList = detailTbody[j].testItemResultRecordDTOList;
                let tbodyMiddleData = {};
                testItemResultRecordDTOList.map((e) => {
                    tbodyMiddleData[e.testItem.name] = {
                        'isValid':e.testItemResultRecord.isValid,
                        'testResult':e.testItemResultRecord.testResult,
                        'id':e.testItemResultRecord.id,
                    }
                });
                tbodyData.push({
                    index: `${j+1}`,
                    id: detailTbody[j].testReportRecord.id,
                    serialNumber: '暂定',
                    tbodyMiddleData: tbodyMiddleData,
                    isQualified: detailTbody[j].testReportRecord.isQualified
                })
            }
            judger = '待定';
            judgement = detail.purchaseReportRecord.judgement ;
            // console.log('headData',headData)
            // console.log('tbodyData',tbodyData)
            this.setState({
                checkData: {
                    headData: headData,
                    tbodyData: tbodyData,
                    judgement: judgement,
                    judger: judger,
                    topData: topData,
                }
            },()=>{
                console.log(this.state.checkData)
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