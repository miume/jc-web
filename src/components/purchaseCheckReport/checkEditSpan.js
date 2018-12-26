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
    }
    render() {
        const { visible } = this.state;
        return(
            <span>
                <span className="blue" onClick={this.handleEdit} >编辑</span>
                <Modal
                    title="编辑数据"
                    visible={visible}
                    width="1030px"
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
                            data={this.state.checkData}
                            clickState ={0} //是否可以点击 0:可以点红， 其余：不可以点红
                        />
                    </div>
                </Modal>
            </span>
        )
    }

    /**input框内容变化，实现自动保存数据 */
    inputSave(e){
        const value = e.target.value;
        const name = e.target.name;
        var detailData = this.state.detailData;
        detailData.topData[name] = value;
        this.setState({
            detailData:detailData
        })
    }
    /**修改detailData的数据 */
    modifyDetailData = (data) => {
        this.setState({
            detailData:data
        })
    }
    /**点击编辑 */
    handleEdit() {
        this.getDetailData();
    }
    /**获取该行的记录详情 */
    getDetailData(){
        // let detail = this.props.record;
        axios({
            url: `${this.props.url.purchaseCheckReport.purchaseReportRecord}/${this.props.id}`,
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
                console.log('------')
                topData = {
                    materialName: detail.sampleDeliveringRecordDTO.repoBaseSerialNumber?detail.sampleDeliveringRecordDTO.repoBaseSerialNumber.materialName:'',
                    norm: detail.purchaseReportRecord?detail.purchaseReportRecord.norm:'',
                    quantity: detail.purchaseReportRecord?detail.purchaseReportRecord.quantity:'',
                    sampleDeliveringDate: detail.sampleDeliveringRecordDTO.sampleDeliveringRecord?detail.sampleDeliveringRecordDTO.sampleDeliveringRecord.sampleDeliveringDate:'',
                    deliveryFactory: detail.sampleDeliveringRecordDTO.deliveryFactory?detail.sampleDeliveringRecordDTO.deliveryFactory.name:'',
                };
                let detailHead = detail.testReportRecordDTOList
                for(let i=0; i<detailHead[0].testItemResultRecordDTOList.length; i++){
                    headData.push({
                        id: detailHead[0].testItemResultRecordDTOList[i].testItemResultRecord.id,
                        testItem: detailHead[0].testItemResultRecordDTOList[i].testItem.name,
                        itemUnit: detailHead[0].testItemResultRecordDTOList[i].testItem.unit,
                        rawTestItemStandard: detailHead[0].testItemResultRecordDTOList[i].rawTestItemStandard,
                    })
                }
                let detailTbody = detail.testReportRecordDTOList;
                for(let j=0; j<detailTbody.length; j++){
                    let testItemResultRecordDTOList = detailTbody[j].testItemResultRecordDTOList;
                    let tbodyMiddleData = {};
                    testItemResultRecordDTOList.map((e) => {
                        tbodyMiddleData[e.testItem.name] = {
                            'isValid':e.testItemResultRecord.isValid,
                            'testResult':e.testItemResultRecord.testResult,
                            'id':e.testItemResultRecord.id,
                        }
                    });
                    tbodyData.push({
                        index: `${j+1}`,
                        id: detailTbody[j].testReportRecord.id,
                        serialNumber: '暂定',
                        tbodyMiddleData: tbodyMiddleData,
                        isQualified: detailTbody[j].testReportRecord.isQualified
                    })
                }
                judger = '待定';
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
                },()=>{
                    console.log(this.state.checkData)
                })
            }

        }).catch(()=>{
            message.info('保存失败，请联系管理员！')
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
        var purchaseReportRecord = {
            norm: checkData.topData.norm,
            quantity: checkData.topData.quantity,
            judgement: checkData.judgement,
            judgerId: this.props.userId
        };
        var sampleDeliveringRecordDTO = {
            deliveryFactory: {
                name: checkData.topData.deliveryFactory
            },
            repoBaseSerialNumber: {
                materialName: checkData.topData.materialName
            },
            sampleDeliveringRecord: {
                sampleDeliveringDate: checkData.topData.sampleDeliveringDate
            }
        };
        var testReportRecordDTOList = [];
        for(let i=0; i<checkData.tbodyData.length; i++){
            var ItemResultList = [];
            for (let j in checkData.tbodyData[i].tbodyMiddleData) {
                ItemResultList.push(checkData.tbodyData[i].tbodyMiddleData[j]); //属性
            }
            var testReportRecordDTOListObj = {
                testReportRecord:{
                    id: checkData.tbodyData[i].id,
                    isQualified: checkData.tbodyData[i].isQualified
                },
                testItemResultRecordDTOList: ItemResultList
            };
            testReportRecordDTOList.push(testReportRecordDTOListObj)
        }
        var savaData = {
            purchaseReportRecord: purchaseReportRecord,
            sampleDeliveringRecordDTO: sampleDeliveringRecordDTO,
            testReportRecordDTOList: testReportRecordDTOList
        };
        // if(detailIsQualified === -1){
        //     message.info('请点击合格或者不合格！');
        //     return
        // }
        // if(detailTestDTOS){
        //     for(var j=0; j<detailTestDTOS.length; j++){
        //         if(detailTestDTOS[j].testResult === ''){
        //             message.info('所有检测结果不能为空，请填写完整！');
        //             return
        //         }
        //     }
        // }
        //  调用保存函数
        this.useSavaFunction(savaData,status);

    };
    /**调用保存函数 */
    useSavaFunction = (savaData,status) => {
        axios({
            url : `${this.props.url.purchaseCheckReport.purchaseReportRecord}`,
            method:'put',
            headers:{
                'Authorization': this.props.url.Authorization
            },
            data: savaData,
            type:'json'
        }).then((data)=>{
            if(status){
                const dataId = data.data.data.commonBatchNumber?data.data.data.commonBatchNumber.id:null;
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