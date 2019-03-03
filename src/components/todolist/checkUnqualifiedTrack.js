import React from 'react';
import axios from 'axios';
import {message } from 'antd';
import PurchaseModal from "../purchaseCheckReport/purchaseModal";
class CheckUnqualifiedTrack extends React.Component{
    componentDidMount(){
        this.getDetailData();
    }
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            checkData: {    //进货数据格式
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
            <div style={{height:450}}>
                <PurchaseModal
                    data={this.state.checkData}
                    clickState ={1} //是否可以点击 0:可以点红， 其余：不可以点红
                    unTrackType={1} //追踪类型
                    unTrackModifyThead={0}  //追踪头部不可修改
                    unqualifiedType={1}
                />
            </div>
        )
    }

    /**获取该行的记录详情 */
    getDetailData(){
        axios({
            url: `${this.props.url.unqualifiedTrack.unqualifiedTracingRecord}/${this.props.dataId}`,
            method:'get',
            headers:{
                'Authorization': this.props.url.Authorization
            },
        }).then((data)=>{
            const detail = data.data.data;
            console.log(data)
            if(detail){
                //  进货数据组装
                var headData = [];
                var tbodyData = [];
                var judger = '';
                var judgement = '';
                var topData = {};
                topData = detail.details.unqualifiedHead;
                console.log(topData)
                let detailHead = detail.details.standard;
                for(var i=0; i<detailHead.length; i++){
                    var item = detailHead[i].split(',');
                    headData.push({
                        id: i,
                        testItem: item[0],
                        itemUnit: item[1],
                        rawTestItemStandard: item[2],
                    })
                }
                let detailTbody = detail.details.unqualifiedData;
                var index = 0
                for(var key in detailTbody){
                    var items = detailTbody[key];
                    var tbodyMiddleData = {};
                    items.map((e,index) => {
                        tbodyMiddleData[index] = {
                            'isValid':e.isValid,
                            'testResult':e.testResult,
                            'id':e.id,
                        }
                    });
                    tbodyData.push({
                        index: index,
                        id: key,
                        serialNumber: key,
                        resultRecordList: tbodyMiddleData,
                        decision: 0
                    });
                    index = index + 1;
                }
                judger = '';
                judgement = 0 ;
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
            }else{
                message.info('查询数据为空，请联系管理员')
            }

        }).catch(()=>{
            message.info('打开失败，请联系管理员！')
        })

    }
}
export default CheckUnqualifiedTrack;