import React from 'react';
import axios from 'axios';
import {message, Modal} from 'antd';
import PurchaseModal from './purchaseModal';
import CancleButton from '../BlockQuote/cancleButton';
import SaveButton from '../BlockQuote/saveButton';
import Submit from '../BlockQuote/submit';

class CheckEditSpan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            subVisible: false,
            process:-1,
            checkData: {
                headData: [],
                tbodyData: [],
                judgement: '',
                judger: '',
                topData: {},
            },
            urgent:0,
        };
        this.inputSave = this.inputSave.bind(this);
        this.modifyDetailData = this.modifyDetailData.bind(this);
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

        this.inputTimeSave = this.inputTimeSave.bind(this);
    }
    render() {
        const { visible } = this.state;
        return(
            <span>
                <span className="blue" onClick={this.handleEdit} >编辑</span>
                <Modal
                    title="编辑数据"
                    visible={visible}
                    width="1035px"
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
                            modifyDetailData={this.modifyDetailData}
                            inputSave={this.inputSave}
                            inputTimeSave={this.inputTimeSave}
                            data={this.state.checkData}
                            clickState ={0} //是否可以点击 0:可以点红， 其余：不可以点红
                        />
                    </div>
                </Modal>
            </span>
        )
    }
    inputTimeSave = (value) => {
        var checkData = this.state.checkData;
        checkData.topData['receiveDate'] = value;
        this.setState({
            checkData:checkData
        })
    };
    /**input框内容变化，实现自动保存数据 */
    inputSave(e){
        const value = e.target.value;
        const name = e.target.name;
        // console.log(value)
        var checkData = this.state.checkData;
        checkData.topData[name] = value;
        this.setState({
            checkData:checkData
        })
    }
    /**修改detailData的数据 */
    modifyDetailData = (data) => {
        this.setState({
            checkData:data
        })
    }
    /**点击编辑 */
    handleEdit() {
        this.getDetailData();
        // this.setState({
        //     visible: true,
        // })
    }
    /**获取该行的记录详情 */
    getDetailData(){
        // let detail = this.props.record;
        axios({
            url: `${this.props.url.purchaseCheckReport.purchaseReportRecord}?batchNumberId=${this.props.id}`,
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
                var nowDate = new Date().toLocaleDateString().split('/');
                var nowFormDate='';
                if(nowDate[1]<10){
                    if(nowDate[2]<10){
                        nowFormDate = nowDate[0]+'-0'+nowDate[1]+ '-0' +nowDate[2]
                    }else{
                        nowFormDate = nowDate[0]+'-0'+nowDate[1]+ '-' +nowDate[2]
                    }
                }else{
                    if(nowDate[2]<10){
                        nowFormDate = nowDate[0]+'-'+nowDate[1]+ '-0' +nowDate[2]
                    }else{
                        nowFormDate = nowDate[0]+'-'+nowDate[1]+ '-' +nowDate[2]
                    }
                }
                console.log(nowFormDate)
                topData = {
                    materialName: detail.materialName,
                    norm: detail.purchaseReportRecord?detail.purchaseReportRecord.norm:'',
                    quantity: detail.purchaseReportRecord?detail.purchaseReportRecord.quantity:'',
                    receiveDate:nowFormDate,
                    manufactureName:detail.manufactureName?detail.manufactureName:'无',
                    weight:detail.purchaseReportRecord?detail.purchaseReportRecord.weight:'',
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
                judger = this.props.menuList.name;
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
            }else{
                message.info('获取数据为空，请联系管理员')
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
        var checkData = this.state.checkData;
        var validTestRecords = [];
        for(let i=0; i<checkData.tbodyData.length; i++){
            var resultRecordList = [];
            for (let j in checkData.tbodyData[i].resultRecordList) {
                resultRecordList.push(checkData.tbodyData[i].resultRecordList[j]); //属性
            }
            var validTestRecordsObj = {
                id: checkData.tbodyData[i].id,
                resultRecordList: resultRecordList
            };
            validTestRecords.push(validTestRecordsObj)
        }
        console.log(this.props.menuList.userId)
        var saveData = {
            purchaseReportRecord: {
                id: checkData.topData.id,
                norm: checkData.topData.norm,
                quantity: checkData.topData.quantity,
                receiveDate: checkData.topData.receiveDate,
                judger: this.props.menuList.userId,
                weight: checkData.topData.weight
            },
            validTestRecords: validTestRecords
        };
        // if(detailTestDTOS){
        //     for(var j=0; j<detailTestDTOS.length; j++){
        //         if(detailTestDTOS[j].testResult === ''){
        //             message.info('所有检测结果不能为空，请填写完整！');
        //             return
        //         }
        //     }
        // }
        // console.log(saveData)
        //  调用保存函数
        this.useSavaFunction(saveData,status);

    };
    /**调用保存函数 */
    useSavaFunction = (saveData,status) => {
        axios({
            url : `${this.props.url.purchaseCheckReport.purchaseReportRecord}`,
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
                this.applyReview(dataId);
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

export default CheckEditSpan;