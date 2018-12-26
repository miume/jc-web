import React from 'react';
import axios from 'axios';
import { Modal,Button,Input,message } from 'antd';
import PurchaseModal from "./purchaseModal";
import ReleaseNewButton from './releaseNew';
import ReleaseButton from './releaseButton';


const topData = {
    materialName: '硫酸钴',
    norm: '25Kg/袋',
    quantity: '32',
    sampleDeliveringDate: '2018-12-27 12：20：20',
    deliveryFactory: '启东北新'
};
const headData = [];
for(let i=0; i<20; i++){
    headData.push({
        id: i,
        testItem: `Ca${i}`,
        itemUnit: '%',
        rawTestItemStandard: '>= 20.00'
    })
}
const tbodyData = [];
for(let j=0; j<20; j++){
    tbodyData.push({
        index: j+1,
        id: j,
        serialNumber: `SNS/${j}`,
        isQualified: 1,
        tbodyMiddleData: {
            Ca0:{
                isValid: 1,
                testResult: j+100,
                id: j
            }
            ,Ca1:{
                isValid: 1,
                testResult: j+100,
                id: j+1
            }
            ,Ca2:{
                isValid: 1,
                testResult: j+100,
                id: j+2
            }
            ,Ca3:{
                isValid: 1,
                testResult: j+100,
                id: j+3
            }
            ,Ca4:{
                isValid: 1,
                testResult: j+100,
                id: j+4
            }
            ,Ca5:{
                isValid: 1,
                testResult: j+100,
                id: j+5
            }
            ,Ca6:{
                isValid: 1,
                testResult: j+100,
                id: j+6
            }
            ,Ca7:{
                isValid: 1,
                testResult: j+100,
                id: j+7
            }
            ,Ca8:{
                isValid: 1,
                testResult: j+100,
                id: j+8
            }
            ,Ca9:{
                isValid: 1,
                testResult: j+100,
                id: j+9
            }
            ,Ca10:{
                isValid: 1,
                testResult: j+100,
                id: j+10
            }
            ,Ca11:{
                isValid: 1,
                testResult: j+100,
                id: j+11
            }
            ,Ca12:{
                isValid: 1,
                testResult: j+100,
                id: j+12
            }
            ,Ca13:{
                isValid: 1,
                testResult: j+100,
                id: j+13
            }
            ,Ca14:{
                isValid: 1,
                testResult: j+100,
                id: j+14
            }
            ,Ca15:{
                isValid: 1,
                testResult: j+100,
                id: j+15
            }
            ,Ca16:{
                isValid: 1,
                testResult: j+100,
                id: j+16
            }
            ,Ca17:{
                isValid: 1,
                testResult: j+100,
                id: j+17
            }
            ,Ca18:{
                isValid: 1,
                testResult: j+100,
                id: j+18
            }
            ,Ca19:{
                isValid: 1,
                testResult: j+100,
                id: j+19
            }
            ,Ca20:{
                isValid: 1,
                testResult: j+100,
                id: j+20
            }
        }
    })
}
const judgement = 1;
const judger = '周小伟';

class CheckReleaseSpan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            pvisivle: false,
            // checkData: {
            //     headData: [],
            //     tbodyData: [],
            //     judgement: '',
            //     judger: '',
            //     topData: {},
            // },
            checkData: {
                headData: headData,
                tbodyData: tbodyData,
                judgement: judgement,
                judger: judger,
                topData: topData,
            },
        };
        this.handleReleaseNew = this.handleReleaseNew.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleRelease = this.handleRelease.bind(this);
        this.handleDetail = this.handleDetail.bind(this);
    }
    render() {
        const { visible } = this.state;
        const footer = this.judgeFooter(this.props.state);
        return(
            <span>
                <span className="blue" onClick={this.handleDetail} >{this.props.name}</span>
                <Modal
                    title="数据详情"
                    visible={visible}
                    width="1050px"
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    // footer下的每个组件都要有唯一的key
                    footer={footer}
                >
                    <div style={{height:500}}>
                        <PurchaseModal
                            clickState ={1}
                            data={this.state.checkData}
                        />
                    </div>
                </Modal>
            </span>
        )
    }
    judgeFooter = (state) => {
        var footer = [];
        switch (state) {
            case '1': //审核中   --最好不用Input 用div
                footer.push(<Button className='white-button' style={{float:'left',backgroundColor:'white'}} key="back"  onClick={this.handleCancel}>返回</Button>);
                footer.push(<Input key="input" style={{width:300,color:'black',textAlign: 'center'}} disabled defaultValue="该数据审核中，审核通过后方可发布"/>);
                return footer;
            case '2': //已通过  未发布
                footer = [
                    <Button className='white-button' style={{float:'left',backgroundColor:'white',width:'80px',height:'35px'}} key="back"  onClick={this.handleCancel}>返回</Button>,
                    <Input key="input" style={{width:'300px',height:'35px',color:'black',textAlign: 'center',cursor:'default'}} disabled defaultValue="该数据审核通过，请发布"/>,
                    <ReleaseNewButton  key="releaseNew" handleReleaseNew={this.handleReleaseNew}/>,
                    <ReleaseButton key="releaseNew" handleRelease={this.handleRelease}/>
                ];
                return footer;
            case '3': //不通过
                footer = [
                    <Button className='white-button' style={{float:'left',backgroundColor:'white',width:'80px',height:'35px'}} key="back"  onClick={this.handleCancel}>返回</Button>,
                    <Input key="input" style={{width:'300px',height:'35px',color:'black',textAlign: 'center',cursor:'default',right:'6px'}} disabled defaultValue="该数据审核不通过，请改正后再次申请审核"/>,
                ];
                return footer;
            case '0': //待审核
                footer = [
                    <Button className='white-button' style={{float:'left',backgroundColor:'white',width:'80px',height:'35px'}} key="back"  onClick={this.handleCancel}>返回</Button>,
                    <Input key="input" style={{width:'300px',height:'35px',color:'black',textAlign: 'center',cursor:'default',right:'6px'}} disabled defaultValue="该数据待审核，审核通过后方可发布"/>,
                ];
                return footer;
            default:
                footer = [
                    <Button className='white-button' style={{float:'left',backgroundColor:'white',width:'80px',height:'35px'}} key="back"  onClick={this.handleCancel}>返回</Button>,
                ];
                return footer;
        }
    };
    handleClick = () => {
        console.log('handleClick')
    }
    //  处理发布新材料
    handleReleaseNew = () => {
        console.log('releaseNew')
    };
    // 处理发布
    handleRelease = () => {
        console.log('handleRelease')
    };
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
    hide = () => {
        this.setState({
            pvisivle: false,
        });
    };
    handleVisibleChange = (pvisivle) => {
        this.setState({ pvisivle });
    };

    /**点击编辑 */
    handleDetail() {
        this.setState({
            visible: true,
        })
        // this.getDetailData();
    }
    /**获取该行的记录详情 */
    getDetailData(){
        // let detail = this.props.record;
        axios({
            url: `${this.props.url.purchaseCheckReport.purchaseReportRecord}/${this.props.id}`,
            method:'get',
            headers:{
                'Authorization': this.props.url.Authorization
            },
        }).then((data)=>{
            const detail = data.data.data;
            console.log('detail',detail)
            var headData = [];
            var tbodyData = [];
            var judger = '';
            var judgement = '';
            var topData = {};
            if(detail){
                console.log('------')
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
                judger = this.props.menuList.username;
                judgement = detail.purchaseReportRecord.judgement ;
                this.setState({
                    checkData: {
                        headData: headData,
                        tbodyData: tbodyData,
                        judgement: judgement,
                        judger: judger,
                        topData: topData,
                    },
                    visible: true,
                },()=>{
                    console.log(this.state.checkData)
                })
            }

        }).catch(()=>{
            message.info('保存失败，请联系管理员！')
        })

    }


}
export default CheckReleaseSpan;