import React from 'react';
import {Modal, Button, Input, message} from 'antd';
import PurchaseModal from "../purchaseCheckReport/purchaseModal";
import './unqualifiedExamine.css';
import CancleButton from '../BlockQuote/cancleButton';
import DrSpanModal from '../productInspection/drSpanModal';
import axios from "axios";


class DetailSpan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,

            type:'',    //判断是进货1,还是成品0
            checkData: {    //进货数据格式
                headData: [],
                tbodyData: [],
                judgement: '',
                judger: '',
                topData: {},
            },
            detailData:{    //成品数据格式
                topData: {},   //头部数据
                testDTOS: [],   //中部项目
                testData: {},   //检验数据
                examine: {       //审核数据
                    examineStatus: '',
                    examineData: []
                },
                optional: {
                    optionalStatus: '',
                    optionalData: {
                        personer: '',
                        personTime:'',
                    }
                },   //择优数据
                isQualified: '', //不合格状态
            },
        };
        this.handleDetail = this.handleDetail.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleRelease = this.handleRelease.bind(this);
        this.getDetailData = this.getDetailData.bind(this);
    }
    render() {
        const { visible } = this.state;
        const footer = this.judgeFooter(this.props.state);
        const type = this.state.type;
        var modalWidth;
        if(type===0){
            modalWidth='520px'
        }else{
            modalWidth='1080px'
        }
        return(
            <span>
                <span className="blue" onClick={this.handleDetail} >{this.props.name}</span>
                <Modal
                    title="数据详情"
                    visible={visible}
                    width={modalWidth}
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    // footer下的每个组件都要有唯一的key
                    footer={footer}
                >
                    {
                        this.state.type?(
                            <div style={{height:500}}>
                                <PurchaseModal
                                    data={this.state.checkData}
                                    clickState ={1} //是否可以点击 0:可以点红， 其余：不可以点红
                                />
                            </div>
                        ):(
                            <div style={{height:580}}>
                                <DrSpanModal
                                    data={this.state.detailData}
                                />
                            </div>
                        )
                    }
                </Modal>
            </span>
        )
    }
    /**点击编辑 */
    handleDetail() {
        this.getDetailData();
    }
    getDetailData(){
        axios({
            url: `${this.props.url.unqualifiedExamineTable.unqualifiedTestReportRecord}/${this.props.batchNumberId}`,
            method:'get',
            headers:{
                'Authorization': this.props.url.Authorization
            },
        }).then((data)=>{
            const detail = data.data.data;
            if(detail){
                const type = detail.type;   //根据类型type来进行判断
                if(type===1){
                    //  进货数据组装
                    var headData = [];
                    var tbodyData = [];
                    var judger = '';
                    var judgement = '';
                    var topData = {};
                    topData = {
                        materialName: detail.unqualifiedHead.materialName,
                        norm: detail.unqualifiedHead.norm?detail.unqualifiedHead.norm:'无',
                        quantity: detail.unqualifiedHead.quantity?detail.unqualifiedHead.quantity:'无',
                        receiveDate:detail.unqualifiedHead.date?detail.unqualifiedHead.date:'无',
                        manufactureName:detail.unqualifiedHead.factory?detail.unqualifiedHead.factory:'无',
                        weight:detail.unqualifiedHead.weight?detail.unqualifiedHead.weight:'无',
                    };
                    let detailHead = detail.standard;
                    for(var key in detailHead){
                        var item = detailHead[key].split(",");
                        headData.push({
                            id: key,
                            testItem: item[0],
                            itemUnit: item[1],
                            rawTestItemStandard: item[2],
                        })
                    }

                    let detailTbody = detail.unqualifiedDetail;
                    for(let j=0; j<detailTbody.length; j++){
                        let testItemResults = detailTbody[j].testItemResults;
                        let tbodyMiddleData = {};
                        testItemResults.map((e,index) => {
                            tbodyMiddleData[index] = {
                                'isValid':e.isValid,
                                'testResult':e.testResult,
                                'id':e.id,
                            }
                            return testItemResults;
                        });
                        tbodyData.push({
                            index: `${j+1}`,
                            id: detailTbody[j].id,
                            serialNumber: detailTbody[j].serialNumber,
                            resultRecordList: tbodyMiddleData,
                            decision: detailTbody[j].decision
                        })
                    }
                    judger = detail.unqualifiedHead.tester?detail.unqualifiedHead.tester:'无';
                    judgement = detail.isQualified ;
                    this.setState({
                        checkData: {
                            headData: headData,
                            tbodyData: tbodyData,
                            judgement: judgement,
                            judger: judger,
                            topData: topData,
                        },
                        type:type,
                        visible: true,
                    })
                }else{
                    //成品数据组装
                    var topData = {};  //头部数据
                    var testDTOS = [];  //中部项目
                    var testData = {};  //检验数据
                    var isQualified = '';
                    var optional = {};  //择优数据
                    isQualified =  detail.isQualified?detail.isQualified:0;
                    topData = {
                        serialNumber: detail.unqualifiedDetail[0]?detail.unqualifiedDetail[0].serialNumber:'无',
                        materialName: detail.unqualifiedHead.materialName,
                        sampleDeliveringDate: detail.unqualifiedHead.date?detail.unqualifiedHead.date:'无',
                        id: detail.unqualifiedDetail[0].id
                    };
                    const testItemResults = detail.unqualifiedDetail[0].testItemResults;
                    if(testItemResults) {
                        for(var i=0; i<testItemResults.length; i++){
                            var e = testItemResults[i];
                            if(detail.standard!==null){
                                var standard = detail.standard[i].split(',');
                                console.log(standard)
                                testDTOS.push({
                                    index:`${i+1}`,
                                    id:e.id,
                                    testItemId:e.testItemId,
                                    testItemName:standard[0],
                                    testResult:e.testResult,
                                    rawTestItemStandard:standard[2],
                                    unit:standard[1],
                                    isValid: e.isValid
                                })
                            }else{
                                message.info('查询数据对象没有建立标准，请联系管理员')
                                return ;
                                // testDTOS.push({
                                //     index:`${i+1}`,
                                //     id:e.id,
                                //     testItemId:e.testItemId,
                                //     testItemName:'无',
                                //     testResult:e.testResult,
                                //     rawTestItemStandard:'无',
                                //     unit:'无',
                                //     isValid: e.isValid
                                // })
                            }

                            // var standard = detail.standard[i].split(',');
                            // testDTOS.push({
                            //     index:`${i+1}`,
                            //     id:e.id,
                            //     testItemId:e.testItemId,
                            //     testItemName:standard[0],
                            //     testResult:e.testResult,
                            //     rawTestItemStandard:standard[2],
                            //     unit:standard[1],
                            //     isValid: e.isValid
                            // })
                        }
                    }
                    testData = {
                        tester: detail.unqualifiedHead.tester?detail.unqualifiedHead.tester:'无',
                        testTime: detail.unqualifiedHead.date?detail.unqualifiedHead.date:'无',
                    };
                    // 择优数据
                    optional = {
                        optionalStatus: '',
                        optionalData: {
                            personer: '无',
                            personTime:'无',
                        }
                    };
                    const examineStatus = this.props.checkStatus;
                    const batchNumberId = detail.batchNumberId?detail.batchNumberId:'';
                    if((examineStatus===2||examineStatus===3)&&batchNumberId){
                        axios({
                            url:`${this.props.url.toDoList}/${batchNumberId}/result`,
                            method:'get',
                            headers:{
                                'Authorization':this.props.url.Authorization
                            }
                        }).then((data)=>{
                            const examine = data.data.data;
                            this.setState({
                                detailData:{
                                    topData: topData,
                                    testDTOS: testDTOS,
                                    testData: testData,
                                    examine: {
                                        examineStatus: examineStatus,
                                        examineData: examine,
                                    },
                                    optional: optional,
                                    isQualified: isQualified,
                                },
                                type:type,
                                visible: true,
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
                                optional: optional,
                                isQualified: isQualified,
                            },
                            type:type,
                            visible: true,
                        })
                    }
                }

            }else{
                message.info('查询数据为空，请联系管理员')
            }

        }).catch(()=>{
            message.info('打开失败，请联系管理员！')
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