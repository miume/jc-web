import React from 'react';
import axios from 'axios';
import {message } from 'antd';
import PurchaseModal from "../purchaseCheckReport/purchaseModal";
import DrSpanModal from '../productInspection/drSpanModal';

class CheckUnqualified extends React.Component{
    componentDidMount(){
        this.getDetailData();
    }
    constructor(props){
        super(props);
        this.state = {
            type:'',    //判断是进货1,还是成品0
            checkData: {    //进货数据格式
                headData: [],
                tbodyData: [],
                judgement: '',
                judger: '',
                topData: {

                },
            },
            detailData:{    //成品数据格式
                topData: {
                    serialNumber:'',
                    materialName:'',
                    sampleDeliveringDate:'',
                    id:''
                },   //头部数据
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
        this.getDetailData = this.getDetailData.bind(this);
    }
    render() {
        const type = this.state.type;
        var modalWidth;
        if(type===0){
            modalWidth='520px'
        }else{
            modalWidth='1035px'
        }
        return(
            <div style={{width:`${modalWidth}`}}>
                {
                    this.state.type?(
                        <div style={{height:500}}>
                            <PurchaseModal
                                data={this.state.checkData}
                                clickState ={1} //是否可以点击 0:可以点红， 其余：不可以点红
                                // unClickType={1} //表示头部数据不可点击
                            />
                        </div>
                    ):(
                        <div style={{height:460}}>
                            <DrSpanModal
                                data={this.state.detailData}
                            />
                        </div>
                    )
                }
            </div>
        )
    }

    /**获取该行的记录详情 */
    getDetailData(){
        axios({
            url: `${this.props.url.unqualifiedExamineTable.unqualifiedTestReportRecord}/${this.props.dataId}`,
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
                            var standard = detail.standard[i].split(',');
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
                        }
                    }
                    testData = {
                        tester: detail.unqualifiedHead.tester?detail.unqualifiedHead.tester:'无',
                        testTime: detail.unqualifiedHead.date?detail.unqualifiedHead.date:'无',
                    };
                    // 择优数据
                    optional = {
                        // optionalStatus: detail.testReportRecord.qualityLevel?detail.testReportRecord.qualityLevel:'',
                        // optionalData: {
                        //     personer: detail.testReportRecord.ratePersonId?detail.testReportRecord.ratePersonId:'无',
                        //     personTime:detail.testReportRecord.rateDate?detail.testReportRecord.rateDate:'无',
                        // }
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
}
export default CheckUnqualified;