import React from 'react';
import {Modal,message} from 'antd';
import CancleButton from "../BlockQuote/cancleButton";
import SaveButton from "../BlockQuote/saveButton";
import Submit from "../BlockQuote/submit";
import NewButton from "../BlockQuote/newButton";
import PurchaseModal from './purchaseModal';
import axios from 'axios';
class PackGenerateModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            subVisible: false,
            visible: false,
            process:-1,
            urgent: 0,
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
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.urgentChange = this.urgentChange.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.handleCancelApply = this.handleCancelApply.bind(this);
        this.handleOkApply = this.handleOkApply.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.clickSavaButton = this.clickSavaButton.bind(this);
        this.useSavaFunction = this.useSavaFunction.bind(this);
        this.applyReview = this.applyReview.bind(this);
        this.inputSave = this.inputSave.bind(this);

    }
    render() {
        console.log('selectedRowKeys',this.props.selectedRowKeys)
        return(
            <span>
                <NewButton handleClick={this.handlePack} name='生成' className='fa fa-cube' />
                <Modal
                    title="打包数据"
                    visible={this.state.visible}
                    width="1030px"
                    centered={true}
                    closable={false}
                    maskClosable={false}
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
                            inputSave={this.inputSave}
                            modifyDetailData={this.modifyDetailData}
                            clickState ={0}
                            data={this.state.checkData}
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
    };
    handlePack = () => {
        const batchNumberIds = this.props.selectedRowKeys.toString();
        const params = {
            batchNumberIds:batchNumberIds,
            createPersonId:this.props.menuList.userId,
        };
        if(batchNumberIds.length===0){
            message.info('请选择记录！')
        }else{
            axios({
                url: `${this.props.url.purchaseCheckReport.generate}`,
                method:'post',
                headers:{
                    'Authorization':this.props.url.Authorization
                },
                params:params
                // type:'json'
            }).then((data)=>{
                console.log(data)
                // const detail = data.data.data;
                // var headData = [];
                // var tbodyData = [];
                // var judger = '';
                // var judgement = '';
                // var topData = {};
                // if(detail){
                //     topData = {
                //         materialName: '',
                //         norm: '',
                //         quantity: '',
                //         sampleDeliveringDate:'',
                //         deliveryFactory:''
                //         // sampleDeliveringDate: detail.sampleDeliveringRecordDTO.sampleDeliveringRecord?detail.sampleDeliveringRecordDTO.sampleDeliveringRecord.sampleDeliveringDate:'',
                //         // deliveryFactory: detail.sampleDeliveringRecordDTO.deliveryFactory?detail.sampleDeliveringRecordDTO.deliveryFactory.name:'',
                //     };
                //     let detailHead = detail[0].testReportRecordDTO.testItemResultRecordDTOList;
                //     for(let i=0; i<detailHead.length; i++){
                //         headData.push({
                //             id: detailHead[i].testItemResultRecord.id,
                //             testItem: detailHead[i].testItem.name,
                //             itemUnit: detailHead[i].testItem.unit,
                //             rawTestItemStandard: detailHead[i].rawTestItemStandard?detailHead[i].rawTestItemStandard.value:'',
                //         })
                //     }
                //     let detailTbody = detail;
                //     for(let j=0; j<detailTbody.length; j++){
                //         let testItemResultRecordDTOList = detailTbody[j].testReportRecordDTO.testItemResultRecordDTOList;
                //         let tbodyMiddleData = {};
                //         testItemResultRecordDTOList.map((e) => {
                //             tbodyMiddleData[e.testItem.name] = {
                //                 'isValid':e.testItemResultRecord.isValid,
                //                 'testResult':e.testItemResultRecord.testResult,
                //                 'id':e.testItemResultRecord.id,
                //             }
                //         });
                //         tbodyData.push({
                //             index: `${j+1}`,
                //             id: detailTbody[j].testReportRecordDTO.testReportRecord.id,
                //             serialNumber: detailTbody[j].testReportRecordDTO.sampleDeliveringRecordDTO.repoBaseSerialNumber.serialNumber,
                //             tbodyMiddleData: tbodyMiddleData,
                //             isQualified: detailTbody[j].testReportRecordDTO.testReportRecord.isQualified
                //         })
                //     }
                //     judger = this.props.menuList.username;
                //     judgement = '' ;
                //     this.setState({
                //         checkData: {
                //             headData: headData,
                //             tbodyData: tbodyData,
                //             judgement: judgement,
                //             judger: judger,
                //             topData: topData,
                //         },
                //         visible: true,
                //     })
                // }

            }).catch(()=>{
                message.info('生成失败，请联系管理员！')
            });
        }
    };
    handleCancel() {
        this.setState({
            visible: false,
        });
    }
    /** 送审*/
    /**监控送审界面的visible */
    handleVisibleChange(visible){
        this.setState({
            subVisible:visible
        })
    }
    /**监控是否紧急 */
    urgentChange(checked){
        this.setState({
            urgent:checked?0:-1
        })
    }
    /**监听送审select变化事件 */
    selectChange(value){
        this.setState({
            process:value
        })
    }
    /**点击取消送审 */
    handleCancelApply(){
        this.setState({
            subVisible:false
        })
    }
    /**点击送审 */
    handleOkApply(){
        this.clickSavaButton(1);
    }
    /**点击保存 */
    handleSave(){
        this.clickSavaButton(0);
    }
    /**实现保存按钮功能--实现保存的数据处理 */
    clickSavaButton = (status) => {
        //  实现保存的数据处理
        var checkData = this.state.checkData;
        var purchaseReportRecord = {
            norm: checkData.topData.norm,
            quantity: checkData.topData.quantity,
            judgement: checkData.judgement,
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
        var commonBatchNumberDTO = {
            commonBatchNumber: {
                createPersonId: this.props.menuList.userId
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
            commonBatchNumberDTO: commonBatchNumberDTO,
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
        //  status:1 -送审  0-保存
        if(status){
            console.log('savaData',savaData)
            //  送审
            axios({
                url : `${this.props.url.purchaseCheckReport.purchaseReportRecord}?isDeployNewMaterial=-1`,
                method:'put',
                headers:{
                    'Authorization': this.props.url.Authorization
                },
                data: savaData,
                type:'json'
            }).then((data)=>{
                console.log('datadata',data)
                console.log('此时commonBatchNumberDTO不存在，所以报错')
                const dataId = data.data.data.commonBatchNumberDTO.commonBatchNumber?data.data.data.commonBatchNumberDTO.commonBatchNumber.id:null;
                // this.applyReview(dataId);
            }).catch(()=>{
                this.setState({
                    visible: false,
                    subVisible: false,
                },()=>{
                    this.props.fetch();
                    message.info('保存失败，请联系管理员！')
                });
            })
        }
        axios({
            url : `${this.props.url.purchaseCheckReport.purchaseReportRecord}?isDeployNewMaterial=-1`,
            method:'post',
            headers:{
                'Authorization': this.props.url.Authorization
            },
            data: savaData,
            type:'json'
        }).then((data)=>{
            if(status){
                console.log('此时commonBatchNumberDTO不存在，所以报错')
                const dataId = data.data.data.commonBatchNumberDTO.commonBatchNumber?data.data.data.commonBatchNumberDTO.commonBatchNumber.id:null;
                this.applyReview(dataId);
            }else{
                this.setState({
                    visible: false,
                    subVisible: false,
                },()=>{
                    this.props.fetch();
                    message.info(data.data.message);
                });
            }
        }).catch(()=>{
            this.setState({
                visible: false,
                subVisible: false,
            },()=>{
                this.props.fetch();
                message.info('保存失败，请联系管理员！')
            });
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
            message.info('送审失败，请联系管理员！')
        });
    }
}

export default PackGenerateModal;