import React from 'react';
import axios from 'axios';
import {message } from 'antd';
import PurchaseModal from "../../dataEntry/purchaseCheckReport/purchaseModal";

class CheckPurchase extends React.Component{
    componentDidMount(){
        this.getDetailData();
    }
    constructor(props){
        super(props);
        this.state = {
            checkData: {
                headData: [],
                tbodyData: [],
                judgement: '',
                judger: '',
                topData: {},
            },
        };
        this.getDetailData = this.getDetailData.bind(this);
    }
    render() {
        return(
            <div style={{width:1100,height:450}}>
                <PurchaseModal
                    clickState ={1}
                    data={this.state.checkData}
                />
            </div>
        )
    }

    /**获取该行的记录详情 */
    getDetailData(){
        axios({
            url: `${this.props.url.purchaseCheckReport.purchaseReportRecord}?batchNumberId=${this.props.dataId}`,
            method:'get',
            headers:{
                'Authorization': this.props.url.Authorization
            },
        }).then((data)=>{
            const detail = data.data.data;
            // console.log('detail',detail)
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
                    receiveDate:detail.purchaseReportRecord.receiveDate?detail.purchaseReportRecord.receiveDate:'无',
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
                    // visible: true,
                })
            }

        }).catch(()=>{
            message.info('查看失败，请联系管理员！')
        })

    }
}
export default CheckPurchase;
