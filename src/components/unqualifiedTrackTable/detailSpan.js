import React from 'react';
import {message, Modal} from 'antd';
import CancleButton from '../BlockQuote/cancleButton';
import NewButton from '../BlockQuote/newButton';
import './unqualifiedTrack.css';
import EdSpanModal from './edSpanModal';
import PurchaseModal from "../purchaseCheckReport/purchaseModal";
import axios from "axios";


class EditSpan extends React.Component {
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
        this.handleDetail = this.handleDetail.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    render() {
        const { visible } = this.state;
        return(
            <span>
                <span className="blue" onClick={this.handleDetail} >详情</span>
                <Modal
                    title="详情"
                    visible={visible}
                    width="1080px"
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    // footer下的每个组件都要有唯一的key
                    footer={[
                        <CancleButton
                            flag={1}
                            handleCancel = {this.handleCancel}
                            key='cancel'
                        />,
                    ]}
                >
                    <div style={{height:500}}>
                        <PurchaseModal
                            data={this.state.checkData}
                            clickState ={1} //是否可以点击 0:可以点红， 其余：不可以点红
                            unTrackType={1} //追踪类型
                            unTrackModifyThead={0}  //追踪头部可修改
                        />
                    </div>
                </Modal>
            </span>
        )
    }

    handleDetail = () => {
        this.getDetailData();
        // this.setState({
        //     visible: true,
        // });
    };
    getDetailData(){
        axios({
            url: `${this.props.url.unqualifiedTrack.unqualifiedTracingRecord}/${this.props.batchNumberId}`,
            method:'get',
            headers:{
                'Authorization': this.props.url.Authorization
            },
        }).then((data)=>{
            const detail = data.data.data;
            if(detail){
                //  进货数据组装
                var headData = [];
                var tbodyData = [];
                var judger = '';
                var judgement = '';
                var topData = {};
                topData = this.props.record.details;
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


    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

}

export default EditSpan;