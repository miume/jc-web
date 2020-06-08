import React from 'react';
import {Modal, message} from 'antd';
import CheckSpanModal from './checkSpanModal';
import CancleButton from '../../../BlockQuote/cancleButton';
import SaveButton from '../../../BlockQuote/saveButton';
import Submit from '../../../BlockQuote/submit';
import axios from "axios";


class CheckSpan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            subVisible: false,
            process:-1,
            urgent: 0,
            checkData:{
                topData: {
                    serialNumber:'',
                    materialName:'',
                    sampleDeliveringDate:''
                },   //头部数据
                testDTOS: [],   //中部项目
                testData: {},   //检验数据
                isQualified: '', //不合格状态
            },
        };

        this.handleCheck = this.handleCheck.bind(this);
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
        this.modifyDetailData = this.modifyDetailData.bind(this);
        this.inputSave = this.inputSave.bind(this);
        this.getFooter = this.getFooter.bind(this);
    }
    render() {
        const { visible } = this.state;
        return (
            <span>
                <span  className="blue" onClick={this.handleCheck}>{this.props.title}</span>
                <Modal
                    title={`数据`+this.props.title}
                    visible={visible}
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    footer={this.getFooter()}
                >
                    <div style={{height:550}}>
                        <CheckSpanModal
                            data={this.state.checkData}
                            modifyDetailData={this.modifyDetailData}
                            inputSave={this.inputSave}
                        />
                    </div>
                </Modal>
            </span>
        )
    }
    /**input框内容变化，实现自动保存数据 */
    inputSave(e){
        const value = e.target.value;
        const index = e.target.name;
        var checkData = this.state.checkData;
        checkData.testDTOS[index].testResult = value;
        this.setState({
            checkData:checkData
        })
    }
    /**修改checkData的数据--专用于表格判定事件 */
    modifyDetailData = (data) => {
        this.setState({
            checkData:data
        })
    };
    /**点击编辑 */
    handleCheck = () => {
        this.getDetailData();
    };

    getDetailData = () =>{
        axios({
            url:`${this.props.url.productInspection.productRecord}/${this.props.batchNumberId}`,
            method : 'get',
            headers:{
                'Authorization': this.props.url.Authorization
            },
        }).then((data)=>{
            const res = data.data.data;
            var topData = {};  //头部数据
            var testDTOS = [];  //中部项目
            var testData = {};  //检验数据
            var isQualified = '';
            if(res){
                isQualified = res.testReportRecord?res.testReportRecord.isQualified:1;
                topData = {
                    serialNumber: res.batch?res.batch:null,
                    // TODO
                    // 应该返回标准名称
                    materialName: res.materialName?res.materialName:null,
                    sampleDeliveringDate: res.deliveringDate
                };
                const testResultDTOList = res.testResultDTOList;
                if(testResultDTOList) {
                    for(var i=0; i<testResultDTOList.length; i++){
                        var e = testResultDTOList[i];
                        testDTOS.push({
                            index:`${i+1}`,
                            id:e.testItemResultRecord.id,
                            testItemId:e.testItemResultRecord.testItemId,
                            testItemName:e.testItem.name,
                            testResult:e.testItemResultRecord.testResult,
                            rawTestItemStandard:e.standardValue?e.standardValue:'无',
                            unit:e.testItem.unit,
                            isValid: e.testItemResultRecord.isValid?e.testItemResultRecord.isValid:1
                        })
                    }
                }
                testData = {
                    tester: this.props.menuList.name,
                    testTime: res.testReportRecord?res.testReportRecord.judgeDate:'无',
                };
                this.setState({
                    checkData:{
                        topData: topData,
                        testDTOS: testDTOS,
                        testData: testData,
                        isQualified: isQualified,
                    },
                    visible: true,
                });
            }else{
                message.info('查询失败，请联系管理员')
            }
        }).catch(()=>{
            message.info('查询失败，请联系管理员')
        })
    }
    /**监听送审select变化事件 */
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

        var flag = 0;
        for(var i=0; i<checkData.testDTOS.length; i++){
            if(checkData.testDTOS[i].testResult === null){
                flag=1;
                break;
            }
        }
        if(flag === 1){
            message.info('所有检测结果不能为空，请填写完整！');
            return;
        }

        //组装testResultDTOList格式
        var testResultDTOLists = [];
        for(var j=0; j<checkData.testDTOS.length; j++){
            const e = checkData.testDTOS[j];
            var testResultDTOList = {
                testItemResultRecord: {
                    id: e.id,
                    testResult: e.testResult,
                    isValid: e.isValid
                }
            };
            testResultDTOLists.push(testResultDTOList)
        }

        //  需要知道保存的格式
        var nowDate = new Date().toLocaleDateString().split('/');
        if(nowDate[1] < '10'){
            nowDate[1] = '0'+ nowDate[1];
        }
        var judgeDate = nowDate[0]+ '-' + nowDate[1] + '-' +nowDate[2];

        var saveData = {
            batchNumberId: this.props.batchNumberId,
            testResultDTOList: testResultDTOLists,
            testReportRecord: {
                isQualified: checkData.isQualified,
                judger: this.props.menuList.userId,
                judgeDate: judgeDate
            },

        };
        //  调用保存函数
        this.useSavaFunction(saveData,status);

    };
    /**调用保存函数 */
    useSavaFunction = (saveData,status) => {
        axios({
            url : `${this.props.url.productInspection.productRecord}`,
            method:'put',
            headers:{
                'Authorization': this.props.url.Authorization
            },
            data: saveData,
            type:'json'
        }).then((data)=>{
            if(status){
                const dataId = data.data.data.batchNumberId;
                this.applyReview(dataId);
            }else{
                this.setState({
                    visible: false,
                    subVisible: false,
                });
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

    /**修改和录检见面 footer不一样*/
    getFooter() {
        let title = this.props.title;
        if(title === '修改') {
            return [
                <CancleButton handleCancel = {this.handleCancel} key='cancel'
                />,
                <SaveButton handleSave={this.handleSave} key='save'
                />
            ]
        } else {
            return (
                [
                    <CancleButton handleCancel = {this.handleCancel} key='cancel'/>,
                    <SaveButton handleSave={this.handleSave} key='save'/>,
                    <Submit key='submit' visible={this.state.subVisible}
                            handleVisibleChange={this.handleVisibleChange} selectChange={this.selectChange}
                            urgentChange={this.urgentChange} url={this.props.url}
                            process={this.state.process} handleCancel={this.handleCancelApply}
                            handleOk={this.handleOkApply}/>
                ]
            )
        }
    }

}

export default CheckSpan;
