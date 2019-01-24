import React from 'react';
import { Modal,Button,Input } from 'antd';
import PurchaseModal from "../purchaseCheckReport/purchaseModal";
import './unqualifiedExamine.css';
import DetailModal from './detailModal';
import CancleButton from '../BlockQuote/cancleButton';


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


class DetailSpan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            // checkData: {
            //     headData: headData,
            //     tbodyData: tbodyData,
            //     judgement: judgement,
            //     judger: judger,
            //     topData: topData,
            // },
            checkData: {
                headData: [],
                tbodyData: [],
                judgement: judgement,
                judger: judger,
                topData: topData,
            }
        };
        this.handleDetail = this.handleDetail.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleRelease = this.handleRelease.bind(this);
    }
    render() {
        const { visible } = this.state;
        const footer = this.judgeFooter(this.props.state);
        // const footer = this.judgeFooter(2);
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
                            data={this.state.checkData}
                            clickState ={1}
                            unqualifiedType={true}
                        />

                        <DetailModal
                            // state={this.props.state}
                            state={1}
                        />
                    </div>
                </Modal>
            </span>
        )
    }
    /**点击编辑 */
    handleDetail() {
        // this.getDetailData();
        this.setState({
            visible: true,
        })
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });

    };
    handleRelease = () => {
        this.setState({
            visible: false,
        });
    };
    judgeFooter = (state) => {
        var footer = [];
        switch (state) {
            case 1: //审核中   --最好不用Input 用div
                footer.push(<Button className='white-button' style={{float:'left',backgroundColor:'white'}} key="back"  onClick={this.handleCancel}>返回</Button>);
                footer.push(<Input key="input" style={{width:300,color:'black',textAlign: 'center'}} disabled defaultValue="该数据审核中，审核通过后方可发布"/>);
                return footer;
            case 2: //已通过  未发布
                footer = [
                    <CancleButton
                        key="back"
                        flag = {1}
                        handleCancel={this.handleCancel}
                    />,
                    <Button key="release" style={{width:'80px',height:'35px',background:'#0079FE',color:'white'}} onClick={this.handleRelease} ><i className="fa fa-paper-plane" style={{fontWeight:'bolder',color:'white'}}></i>&nbsp;发布</Button>
                ];
                return footer;
            default:
                footer = [
                    <CancleButton
                        key="back"
                        flag = {1}
                        handleCancel={this.handleCancel}
                    />,
                ];
                return footer;
        }
    };

}
export default DetailSpan;