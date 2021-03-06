import React from 'react';
import axios from 'axios';
import { Modal,Button,Input,message } from 'antd';
import PurchaseModal from "./purchaseModal";
import ReleaseNewButton from './releaseNew';
import ReleaseButton from './releaseButton';
import CancleButton from '../../../BlockQuote/cancleButton';

class CheckReleaseSpan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            pvisivle: false,
            checkData: {
                headData: [],
                tbodyData: [],
                judgement: '',
                judger: '',
                topData: {},
            },
        };
        this.handleReleaseNew = this.handleReleaseNew.bind(this);
        this.handleRelease = this.handleRelease.bind(this);
        this.handleDetail = this.handleDetail.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    render() {
        const { visible } = this.state;
        const footer = this.judgeFooter(this.props.state);
        const titleName = "数据"+this.props.name;
        return(
            <span>
                <span className="blue" onClick={this.handleDetail} >{this.props.name}</span>
                <Modal
                    title={titleName}
                    visible={visible}
                    width="1080px"
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
            case 1: //审核中   --最好不用Input 用div
                footer.push(<Button className='white-button' style={{float:'left',backgroundColor:'white'}} key="back"  onClick={this.handleCancel}>返回</Button>);
                footer.push(<Input key="input" style={{width:300,color:'black',textAlign: 'center'}} disabled defaultValue="该数据审核中，审核通过后方可发布"/>);
                return footer;
            case 2: //已通过  未发布
                footer = [
                    <Button className='white-button' style={{float:'left',backgroundColor:'white',width:'80px',height:'35px'}} key="back"  onClick={this.handleCancel}>返回</Button>,
                    <Input key="input" style={{width:'300px',height:'35px',color:'black',textAlign: 'center',cursor:'default'}} disabled defaultValue="该数据审核通过，请发布"/>,
                    <ReleaseNewButton  key="releaseNew" handleReleaseNew={this.handleReleaseNew}/>,
                    <ReleaseButton key="release" handleRelease={this.handleRelease}/>
                ];
                return footer;
            case 3: //不通过
                footer = [
                    <Button className='white-button' style={{float:'left',backgroundColor:'white',width:'80px',height:'35px'}} key="back"  onClick={this.handleCancel}>返回</Button>,
                    <Input key="input" style={{width:'300px',height:'35px',color:'black',textAlign: 'center',cursor:'default',right:'6px'}} disabled defaultValue="该数据审核不通过，请改正后再次申请审核"/>,
                ];
                return footer;
            case 0: //待审核
                footer = [
                    <Button className='white-button' style={{float:'left',backgroundColor:'white',width:'80px',height:'35px'}} key="back"  onClick={this.handleCancel}>返回</Button>,
                    <Input key="input" style={{width:'300px',height:'35px',color:'black',textAlign: 'center',cursor:'default',right:'6px'}} disabled defaultValue="该数据待审核，审核通过后方可发布"/>,
                ];
                return footer;
            default:    //返回
                footer = [
                    <CancleButton flag={1} handleCancel={this.handleCancel}/>
                ];
                return footer;
        }
    };
    //  处理发布新材料
    handleReleaseNew = (handleData) => {
        message.info('暂无此功能')
    };
    // 处理发布
    handleRelease = () => {
        axios({
            url:`${this.props.url.purchaseCheckReport.purchaseReportRecord}/${this.props.id}`,
            method:'put',
            headers:{
                'Authorization':this.props.url.Authorization
            },
        }).then((data)=>{
            this.props.fetch();
            message.info(data.data.message);
        }).catch(()=>{
            message.info('发布失败，请联系管理员！');
        });
        this.setState({
            visible: false,
        });
    };
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    };
    /**点击详情 */
    handleDetail() {
        this.getDetailData();
    }
    /**获取该行的记录详情 */
    getDetailData(){
        axios({
            url: `${this.props.url.purchaseCheckReport.purchaseReportRecord}?batchNumberId=${this.props.id}`,
            method:'get',
            headers:{
                'Authorization': this.props.url.Authorization
            },
        }).then((data)=>{
            const detail = data.data.data;
            var headData = [];
            var tbodyData = [];
            var judger = '';
            var judgement = '';
            var topData = {};
            if(detail){
                topData = {
                    materialName: detail.materialName,
                    norm: detail.purchaseReportRecord.norm?detail.purchaseReportRecord.norm:'无',
                    quantity: detail.purchaseReportRecord.quantity?detail.purchaseReportRecord.quantity:'无',
                    receiveDate:detail.purchaseReportRecord?detail.purchaseReportRecord.receiveDate:'无',
                    manufactureName:detail.manufactureName?detail.manufactureName:'无',
                    weight:detail.purchaseReportRecord.weight?detail.purchaseReportRecord.weight:'无',
                    id:detail.purchaseReportRecord.id
                };
                let detailHead = detail.standards;
                for(var key in detailHead){
                    var item = detailHead[key].split(",");
                    headData.push({
                        id: key,
                        testItem: item[0],
                        itemUnit: item[1],
                        rawTestItemStandard: item[2],
                    })
                }
                let detailTbody = detail.validTestRecords;
                for(let j=0; j<detailTbody.length; j++){
                    let resultRecordList = detailTbody[j].resultRecordList;
                    let tbodyMiddleData = {};
                    resultRecordList.map((e,index) => {
                        tbodyMiddleData[index] = {
                            'isValid':e.isValid,
                            'testResult':e.testResult,
                            'id':e.id,
                        }
                        return resultRecordList;
                    });
                    tbodyData.push({
                        index: `${j+1}`,
                        id: detailTbody[j].id,
                        serialNumber: detailTbody[j].serialNumber,
                        resultRecordList: tbodyMiddleData,
                        // 修改
                        decision: detailTbody[j].decision
                    })
                }
                judger = detail.tester;
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
                })
            }

        }).catch(()=>{
            message.info('获取失败，请联系管理员！')
        })

    }


}
export default CheckReleaseSpan;
