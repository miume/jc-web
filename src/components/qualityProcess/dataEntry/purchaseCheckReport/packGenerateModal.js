import React from 'react';
import {Modal,message,Button} from 'antd';
import CancleButton from "../../../BlockQuote/cancleButton";
import NewButton from "../../../BlockQuote/newButton";
import PurchaseModal from './purchaseModal';
import axios from 'axios';
class PackGenerateModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            checkData: {
                headData: [],
                tbodyData: [],
                judgement: '',
                judger: '',
                topData: {},
            },
        };
        this.modifyDetailData = this.modifyDetailData.bind(this);
        this.handlePack = this.handlePack.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleGenerate = this.handleGenerate.bind(this);

    }
    render() {
        return(
            <span className={this.props.flag?'':'hide'}>
                <NewButton handleClick={this.handlePack} name='生成' className='fa fa-cube' />
                <Modal
                    title="打包数据"
                    visible={this.state.visible}
                    width="1080px"
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    footer={[
                        <CancleButton
                            handleCancel = {this.handleCancel}
                            key='cancel'
                            flag={1}
                        />,
                        <Button
                            key='generate'
                            onClick={this.handleGenerate}
                            style={{width:'80px',height:'35px',background:'#0079FE',color:'white'}}
                        ><i className="fa fa-cubes" style={{fontWeight:'bolder',color:'white'}}></i>&nbsp;生成</Button>
                    ]}
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
    handleGenerate = () => {
        const batchNumberIds = this.props.selectedRowKeys.toString();
        const params = {
            batchNumberIds:batchNumberIds,
            createPersonId:this.props.menuList.userId,
        };
        axios({
            url: `${this.props.url.purchaseCheckReport.generate}`,
            method:'post',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:params
        }).then((data)=>{
            const res = data.data.data;
            this.setState({
                visible: false
            });
            message.info(res);
            this.props.fetch({
                pageSize:10,
                pageNumber:1,
            });
        }).catch(()=>{
            message.info('操作失败，请联系管理员')
        })
    };

    /**修改detailData的数据 */
    modifyDetailData = (data) => {
        this.setState({
            checkData:data
        })
    };
    handlePack = () => {
        const batchNumberIds = this.props.selectedRowKeys.toString();
        const params = {
            batchNumberIds:batchNumberIds,
        };
        if(batchNumberIds.length===0){
            message.info('请选择记录！')
        }else{
            axios({
                url: `${this.props.url.purchaseCheckReport.preview}`,
                method:'post',
                headers:{
                    'Authorization':this.props.url.Authorization
                },
                params:params
            }).then((data)=>{
                if(data.data.code===0){
                    const detail = data.data.data;
                    var headData = [];
                    var tbodyData = [];
                    var judger = '';
                    var judgement = '';
                    var topData = {};
                    if(detail){
                        topData = {
                            materialName: detail.materialName?detail.materialName:'无',
                            norm: detail.purchaseReportRecord?detail.purchaseReportRecord.norm:'无',
                            quantity: detail.purchaseReportRecord?detail.purchaseReportRecord.quantity:'无',
                            receiveDate:detail.receiveDate?detail.receiveDate:'无',
                            manufactureName:detail.manufactureName?detail.manufactureName:'无',
                            weight: detail.weight?detail.weight:'无',
                            id:detail.purchaseReportRecord?detail.purchaseReportRecord.id:''
                        };
                        let detailHead = detail.standard;
                        for(var i=0; i<detailHead.length; i++){
                            var item = detailHead[i].split(',');
                            headData.push({
                                id: i+1,
                                testItem: item[0],
                                itemUnit: item[1],
                                rawTestItemStandard: item[2],
                            })
                        }
                        let detailTbody = detail.value;
                        var index ;
                        for(var key in detailTbody){
                            index = 1;
                            var tbodyItem = detailTbody[key].split(',');
                            var tbodyMiddleData = {};
                            for(var j=1; j<tbodyItem.length; j++){
                                tbodyMiddleData[j] = {
                                    'isValid':1,
                                    'testResult':tbodyItem[j],
                                    'id':j,
                                }
                            }
                            tbodyData.push({
                                index: index,
                                id: key,
                                serialNumber: tbodyItem[0],
                                resultRecordList: tbodyMiddleData,
                                decision: 1
                            });
                            index = index + 1;
                        }
                        // judger = this.props.menuList.name;
                        judger = '无';
                        judgement = 1 ;
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
                    }else{
                        message.info('数据为空，请联系管理员')
                    }
                }else {
                    message.info(data.data.message)
                }
            });
        }
    };
    handleCancel() {
        this.setState({
            visible: false,
        });
    }
}

export default PackGenerateModal;
