import React from 'react';
import {message, Modal} from 'antd';
import CancleButton from '../BlockQuote/cancleButton';
import './unqualifiedTrack.css';
import PurchaseModal from "../purchaseCheckReport/purchaseModal";
import axios from "axios";
import SaveButton from "../BlockQuote/saveButton";
import Submit from "../BlockQuote/submit";

class EditSpan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            subVisible: false,
            process:-1,
            urgent:0,
            checkData: {    //进货数据格式
                headData: [],
                tbodyData: [],
                judgement: '',
                judger: '',
                topData: {},
            },
            // 保存的数据
            saveData : {
                details:{
                    batchNumberId:'',
                    createTime: '',
                    handler: '',
                    productionProcessId: ''
                }
            }
        };
        this.procedureChange = this.procedureChange.bind(this);
        this.inputUnTrackTimeSave = this.inputUnTrackTimeSave.bind(this);
        this.userChange = this.userChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.getDetailData = this.getDetailData.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.urgentChange = this.urgentChange.bind(this);

        this.handleCancelApply = this.handleCancelApply.bind(this);
        this.handleOkApply = this.handleOkApply.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.clickSavaButton = this.clickSavaButton.bind(this);
        this.useSavaFunction = this.useSavaFunction.bind(this);
        this.applyReview = this.applyReview.bind(this);

    }
    render() {
        const { visible } = this.state;
        return(
            <span>
                <span className="blue" onClick={this.handleEdit} >编辑</span>
                <Modal
                    title="编辑数据"
                    visible={visible}
                    width="1080px"
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
                            handleSave={this.handleSave}
                            key='save'
                        />,
                        <Submit
                            key='submit'
                            visible={this.state.subVisible}
                            handleVisibleChange={this.handleVisibleChange}
                            selectChange={this.selectChange}
                            urgentChange={this.urgentChange}
                            url={this.props.url}
                            process={this.state.process}
                            handleCancel={this.handleCancelApply}
                            handleOk={this.handleOkApply}
                        />
                    ]}
                >
                    <div style={{height:500}}>
                        <PurchaseModal
                            procedureChange={this.procedureChange}
                            userChange={this.userChange}
                            inputUnTrackTimeSave={this.inputUnTrackTimeSave}
                            url={this.props.url}
                            data={this.state.checkData}
                            clickState ={1} //是否可以点击 0:可以点红， 其余：不可以点红
                            // unClickType={1} //表示头部数据不可点击
                            unTrackType={1} //追踪类型
                            unTrackModifyThead={1}  //追踪头部可修改
                        />
                    </div>
                </Modal>
            </span>
        )
    }




    /**监控发生工艺下拉框的变化 */
    procedureChange = (e) => {
        var checkData = this.state.checkData;
        checkData.topData.process.name = e.split('-')[1];
        var saveData = this.state.saveData;
        saveData.details.productionProcessId = parseInt(e.split('-')[0]);
        this.setState({
            checkData:checkData,
            saveData:saveData
        })
    };
    inputUnTrackTimeSave = (e) => {
        var checkData = this.state.checkData;
        checkData.topData.createTime = e;
        var saveData = this.state.saveData;
        saveData.details.createTime = e;
        this.setState({
            checkData:checkData,
            saveData:saveData
        })
    };
    userChange = (e) => {
        console.log('value',e)
        var checkData = this.state.checkData;
        checkData.topData.handle = e.split('-')[1];
        var saveData = this.state.saveData;
        saveData.details.handler = e.split('-')[0];
        this.setState({
            checkData:checkData,
            saveData:saveData
        })
    }

    /**点击编辑 */
    handleEdit() {
        this.getDetailData();
        this.setState({
            visible: true,
        })
    }
    /**
     * 详情 区分进货和成品   根据某子段，对数据进行组装
     * 进货：调用进货的PurchaseModal，数据进行组装
     * 成品：调用成品的组件，数据进行组装
     * 同时要在<div>中进行子段判断，来调用哪个组件
     */
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
                    saveData : {
                        details:{
                            batchNumberId: detail.commonBatchNumber.id,
                            createTime: detail.commonBatchNumber.createTime?detail.commonBatchNumber.createTime:'',
                            handler: detail.commonBatchNumber.createPersonId?detail.commonBatchNumber.createPersonId:'',
                            //如何知道id多少
                            productionProcessId: this.props.record.details.process.id
                        }
                    },
                    visible: true,
                })
            }else{
                message.info('查询数据为空，请联系管理员')
            }

        }).catch(()=>{
            message.info('打开失败，请联系管理员！')
        })

    }


    /**监听送审select变化事件 */
    /**监控申请送审弹出框的visible */
    handleVisibleChange(visible){
        this.setState({
            subVisible:visible
        })
    }
    /**监听select变化事件 */
    selectChange(value){
        this.setState({
            process:value
        })
    }
    /**监控是否紧急 */
    urgentChange(checked){
        this.setState({
            urgent:checked?1:0
        })
    }
    /**点击取消送审 */
    handleCancelApply(){
        this.setState({
            subVisible:false,
        })
        // this.props.cancle();
    }
    /**点击确定送审 */
    handleOkApply(){
        this.clickSavaButton(1);
    }
    /**点击保存按钮 */
    handleSave(){
        this.clickSavaButton(0);
    }
    /**点击取消按钮 */
    handleCancel(){
        this.setState({
            visible:false
        })
    }

    /**实现保存按钮功能--实现保存的数据处理 */
    clickSavaButton = (status) => {
        //  实现保存的数据处理
        var saveData = this.state.saveData;
        if(saveData.details.batchNumberId===''||saveData.details.createTime===''||saveData.details.handler===''||saveData.details.productionProcessId===''){
            message.info('数据不能为空')
            return ;
        }
        console.log('saveData',saveData)
        //  调用保存函数
        this.useSavaFunction(saveData,status);

    };
    /**调用保存函数 */
    useSavaFunction = (saveData,status) => {
        axios({
            url : `${this.props.url.unqualifiedTrack.unqualifiedTracingRecord}`,
            method:'put',
            headers:{
                'Authorization': this.props.url.Authorization
            },
            data: saveData,
            type:'json'
        }).then((data)=>{
            if(status){
                const dataId = data.data.data;
                console.log('dataId',dataId)
                // this.applyReview(dataId);
            }else{
                this.setState({
                    visible: false,
                    subVisible: false,
                });
                this.props.fetch();
                message.info(data.data.message);
            }
        }).catch(()=>{
            message.info('保存失败，请联系管理员！')
        })
    };
    /**---------------------- */
    /**送审 */
    applyReview(dataId){
        console.log(this.state.process)
        axios({
            url : `${this.props.url.toDoList}/${parseInt(this.state.process)}`,
            method:'post',
            headers:{
                'Authorization': this.props.url.Authorization
            },
            params:{
                dataId:dataId,
                isUrgent:this.state.urgent
            }
        }).then((data)=>{
            this.setState({
                visible: false,
                subVisible: false,
            });
            this.props.fetch();
            message.info(data.data.message);
        }).catch(()=>{
            message.info('审核失败，请联系管理员！')
        });
    }

}

export default EditSpan;