import React from 'react';
import axios from 'axios';
import home from '../../../commom/fns'
import {Button, Input, message, Modal, Table} from 'antd';
import CancleButton from '../../../BlockQuote/cancleButton';
import SaveButton from '../../../BlockQuote/saveButton';
import Submit from '../../../BlockQuote/submit';
import './interProduct.css';
import CheckQualifiedModal from "../../../BlockQuote/checkQualifiedModal";

const data = [];
for (let i = 0; i < 50; i++) {
    data.push({
        index:i,
        id: i,
        testItem: `测试`,
        testResult: '0.001',
        itemUnit: `kg`,
    });
}

class CheckSpan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            subVisible: false,
            detailData:{
                topData: {
                    serialNumber:'',
                    materialName:'',
                    sampleDeliveringDate:''
                },   //头部数据
                testDTOS: [],   //中部项目
                testData: {},   //检验数据
                isQualified: '', //不合格状态
            },
            interCheckData:{
                testDTOS: [],
                sampleDeliveringRecord: {
                    id: '',
                },
                testReportRecord:{
                    isQualified: '',
                    judger: ''
                }

            },
            process:-1,
            urgent:0,         //紧急 1 正常 0
        };
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.urgentChange = this.urgentChange.bind(this);
        this.handleCancelApply = this.handleCancelApply.bind(this);
        this.handleOkApply = this.handleOkApply.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.getCheckData = this.getCheckData.bind(this);
        this.inputSave = this.inputSave.bind(this);
        this.clickIsQualified = this.clickIsQualified.bind(this);
        this.clickSavaButton = this.clickSavaButton.bind(this);
        this.useSavaFunction = this.useSavaFunction.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleClearButton = this.handleClearButton.bind(this);
        this.applyReview = this.applyReview.bind(this);
        this.getFooter = this.getFooter.bind(this);
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            align:'center',
            width: '10%',
        },{
            title: '检测项目',
            dataIndex: 'testItemName',
            key: 'testItemName',
            align:'center',
            width: '20%',
        },{
            title: '检测结果',
            dataIndex: 'testResult',
            key: 'testResult',
            align:'center',
            width: '20%',
            render: (text,record) => {
                if(record.isAudit === 1) {
                    return text;
                }
                return (
                    <Input
                        id={record.id}
                        name='testResult'
                        value = {text}
                        placeholder='输入检测结果'
                        style={{border:'0',paddingLeft:'10px'}}
                        onChange={this.inputSave}
                    />
                )

            }
        },{
            title: '计量单位',
            dataIndex: 'unit',
            key: 'unit',
            align:'center',
            width: '20%',
        },{
            title: '状态',
            dataIndex: 'isAudit',
            key: 'isAudit',
            width: '30%',
            render: (text) => {
                if(text === 0) {
                    return '最近审核未通过';
                } else if(text === 1) {
                    return '通过'
                } else {
                    return '未审核';
                }
            }
        }];
    }
    render() {
        const { visible } = this.state;
        const arr = this.state.detailData.topData.serialNumber.split('-');
        const {flag} = this.props;
        return (
            <span>
                <span className={flag ? '' : "blue"} onClick={flag ? null : this.handleCheck}>{this.props.title}</span>
                <Modal
                    title={`数据`+this.props.title}
                    visible={visible}
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    width="500px"
                    footer={this.getFooter()}
                >
                    <div style={{height:550}}>
                        <div className="interCheckModalTop">
                            <table>
                                <thead>
                                    <tr>
                                        <th>物料编码</th>
                                        <th>原材料</th>
                                        <th>送样日期</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><span title={this.state.detailData.topData.serialNumber} className="text-decoration">{arr[0]+'-'+arr[1]+'...'}</span></td>
                                        <td>{home.judgeText(this.state.detailData.topData.materialName,8)}</td>
                                        <td>{home.judgeText(this.state.detailData.topData.sampleDeliveringDate,10)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="interCheckModalMiddle">
                            <div>
                                   样品名称：<span>{this.state.detailData.topData.materialName?(this.state.detailData.topData.materialName+'样品'):''}</span>
                            </div>
                            <Button onClick={this.handleClearButton}><i className="fa  fa-trash-o" style={{fontWeight:'bolder'}}></i>&nbsp;清空</Button>
                        </div>
                        <div className="interCheckModalBottom">
                            <Table
                                className="stock-out"
                                rowKey={record => record.index}
                                columns={this.columns}
                                dataSource={this.state.detailData.testDTOS}
                                pagination={{hideOnSinglePage:true,pageSize:100}}
                                size="small"
                                scroll={{ y: 250 }}
                                bordered
                            />
                        </div>
                        <CheckQualifiedModal
                            isQualified={this.state.detailData.isQualified}
                            clickIsQualified = {this.clickIsQualified}
                        />
                    </div>
                </Modal>
            </span>
        )
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
    /**点击清空按钮 */
    handleClearButton = () => {
        let detailData = this.state.detailData;
        for(let i=0; i<detailData.testDTOS.length; i++){
            detailData.testDTOS[i].testResult = '';
        }
        this.setState({
            detailData: detailData
        })
    };

    /**---------------------- */
    /**---------------------- */
    /**点击录检 */
    handleCheck() {
        this.getCheckData();
    }
    /**通过id查询详情--点击录检 */
    getCheckData(){
        axios.get(`${this.props.url.intermediateProduct}/details/${this.props.id}`,{
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then((data)=>{
            const res = data.data.data;
            let topData = {};  //头部数据
            let testDTOS = [];  //中部项目
            let testData = {};  //检验数据
            let isQualified = 0;
            if(res){
                isQualified = res.testReportRecord?res.testReportRecord.isQualified:'';
                topData = {
                    serialNumber: res.serialNumber?res.serialNumber:'',
                    materialName: res.materialName,
                    sampleDeliveringDate: res.sampleDeliveringRecord?res.sampleDeliveringRecord.sampleDeliveringDate:''
                };
                if(res.testDTOS) {
                    for(let i=0; i<res.testDTOS.length; i++){
                        let e = res.testDTOS[i];
                        testDTOS.push({
                            index:`${i+1}`,
                            id:e.testItemResultRecord.id,
                            testItemId:e.testItemResultRecord.testItemId,
                            testItemName:e.name,
                            testResult:e.testItemResultRecord.testResult,
                            unit:e.unit,
                            isAudit: e.testItemResultRecord.isAudit
                        })
                    }
                }
                testData = {
                    tester: res.tester?res.tester:'',
                    testTime: res.testReportRecord?res.testReportRecord.judgeDate:'',
                };
                this.setState({
                    detailData:{
                        topData: topData,
                        testDTOS: testDTOS,
                        testData: testData,
                        isQualified: isQualified,
                    },
                    visible: true
                });
            }else {
                message.info('查询数据为空，请联系管理员')
            }
        })
    }
    /**---------------------- */
    /**input框内容变化，实现自动保存数据 */
    inputSave(e){
        const value = e.target.value;
        const name = e.target.name;
        const id = e.target.id;
        let newData = [...this.state.detailData.testDTOS];
        const index = newData.findIndex(item=> parseInt(id) === parseInt(item.id));
        newData[index][name] = value;
        let detailData = this.state.detailData;
        detailData.testDTOS = newData;
        this.setState({
            detailData:detailData
        })
    }
    /**---------------------- */
    /**点击合格与不合格 */
    clickIsQualified = (isQualified) => {
        let detailData = this.state.detailData;
        detailData.isQualified = isQualified;
        this.setState({
            detailData: detailData
        })
    };
    /**实现保存按钮功能--实现保存的数据处理 */
    clickSavaButton = (status) => {
        //  实现保存的数据处理
        let interCheckData = this.state.interCheckData;
        const detailTestDTOS = this.state.detailData.testDTOS;
        const interTestDTOS = [];
        const id = this.props.id;
        const detailIsQualified = this.state.detailData.isQualified;
        //  进行testDTOS数据组装
        let flag = 0;
        //console.log(detailTestDTOS)
        for(let i=0; i<detailTestDTOS.length; i++){
            if(detailTestDTOS[i].testResult !== null){
                flag = 1
            }
            interTestDTOS.push({
                testItemResultRecord:{
                    id: detailTestDTOS[i].id,
                    testResult: detailTestDTOS[i].testResult
                }
            })
        }
        if(flag === 0){
            message.info('至少填写一个检测结果！');
            return
        }
        interCheckData.testDTOS = interTestDTOS;
        interCheckData.testReportRecord.isQualified = detailIsQualified;
        interCheckData.testReportRecord.judger = this.props.menuList.userId;
        interCheckData.sampleDeliveringRecord.id = id;
        if(detailIsQualified !== 0&&detailIsQualified !== 1){
            message.info('请点击合格或者不合格！');
            return
        }
        //  调用保存函数
        this.useSavaFunction(interCheckData,status);

    };
    /**调用保存函数 */
    useSavaFunction = (interCheckData,status) => {
        axios({
            url : `${this.props.url.intermediateProduct}`,
            method:'put',
            headers:{
                'Authorization': this.props.url.Authorization
            },
            data: interCheckData,
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
                // this.props.fetch();
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
            this.props.fetch({
                pageSize:this.props.pagination.pageSize,
                pageNumber:this.props.pagination.current,
                sortField:'sample_delivering_date',
                sortType: 'desc',
            });
            message.info(data.data.message);
        }).catch(()=>{
            message.info('审核失败，请联系管理员！')
        });
    }

}

export default CheckSpan;
