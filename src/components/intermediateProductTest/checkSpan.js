import React from 'react';
import axios from 'axios';
import {Modal} from 'antd';
import CheckSpanModal from './checkSpanModal';
import CancleButton from '../BlockQuote/cancleButton';
import SaveButton from '../BlockQuote/saveButton';
import Submit from '../BlockQuote/submit';
import './interProduct.css';
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
    url;
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            subVisible: false,
            detailData:{
                topData: {},   //头部数据
                testDTOS: [],   //中部项目
                testData: {},   //检验数据
                isQualified: -1, //不合格状态
            },
            process:-1,
        };
        this.showModal = this.showModal.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.subHide = this.subHide.bind(this);
        this.subOk = this.subOk.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);

    }
    render() {
        const { visible } = this.state;
        this.url = JSON.parse(localStorage.getItem('url'));
        return (
            <span>
                <span className="blue" onClick={this.handleCheck}>录检</span>
                <Modal
                    title="数据录检"
                    visible={visible}
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    width="500px"
                    footer={[
                        <CancleButton
                            handleCancel = {this.handleCancel}
                            key='cancel'
                        />,
                        <SaveButton
                            onClick={this.handleSave}
                            key='save'
                        />,
                        <Submit
                            url={this.url}
                            visible={this.state.subVisible}
                            handleCancel={this.subHide}
                            handleOk={this.subOk}
                            handleVisibleChange={this.handleVisibleChange}
                            selectChange={this.selectChange}
                            key='submit'
                            process={this.state.process}
                        />
                    ]}
                >
                    <div style={{height:550}}>
                        <CheckSpanModal
                            url={this.props.url}
                            data={this.state.detailData}
                            record={this.props.record}
                        />
                    </div>
                </Modal>
            </span>
        )
    }
    /**监听送审select变化事件 */
    selectChange(value){
        this.setState({
            process:value
        })
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    /**处理保存功能*/
    handleSave = () => {
        setTimeout(() => {
            this.setState({
                visible: false,
            });
        }, 500);
    };
    handleCancel = () => {
        setTimeout(() => {
            this.setState({
                visible: false,
            });
        }, 500);
    };
    subHide = () => {
        this.setState({
            subVisible: false,
        });

    };
    subOk = () => {
        console.log('ok');
    };
    handleVisibleChange = (subVisible) => {
        this.setState({ subVisible });
    };

    /**---------------------- */
    /**---------------------- */
    /**点击详情 */
    handleCheck() {
        this.getCheckData();
        // this.setState({
        //     visible:true
        // })
    }
    /**通过id查询详情 */
    getCheckData(){
        axios.get(`${this.props.url.intermediateProduct}/details/${this.props.id}`,{
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then((data)=>{
            const res = data.data.data;
            var topData = {};  //头部数据
            var testDTOS = [];  //中部项目
            var testData = {};  //检验数据
            var isQualified = 0;
            if(res){
                isQualified = res.testReportRecord?res.testReportRecord.isQualified:'';
                topData = {
                    serialNumberId: res.sampleDeliveringRecord?res.sampleDeliveringRecord.serialNumberId:'',
                    materialName: res.materialName,
                    sampleDeliveringDate: res.sampleDeliveringRecord?res.sampleDeliveringRecord.sampleDeliveringDate:''
                };
                if(res.testDTOS) {
                    for(var i=0; i<res.testDTOS.length; i++){
                        var e = res.testDTOS[i];
                        testDTOS.push({
                            index:`${i+1}`,
                            id:e.testItemResultRecord.id,
                            testItemId:e.testItemResultRecord.testItemId,
                            testItemName:e.name,
                            testResult:e.testItemResultRecord.testResult,
                            unit:'g/ml'
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
            }
        })
    }
    /**---------------------- */

}

export default CheckSpan;