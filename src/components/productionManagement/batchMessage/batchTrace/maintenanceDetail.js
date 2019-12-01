import React from "react";
import axios from "axios";
import {Table, message, Spin, Divider,Modal,Steps} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import "./batchTrace.css";


const {Step} = Steps;
class MaintenanceDetail extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state = {
            visible:false,
        }
    }
    handleDetail = () =>{
        this.setState({
            visible:true
        })
    }
    handleCancel = () =>{
        this.setState({
            visible:false
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        return(
            <span>
                <span onClick={this.handleDetail} className="blue">详情</span>
                <Modal
                    title='设备保养详情'
                    visible={this.state.visible}
                    width="1000px"
                    closable={false} centered={true}
                    maskClosable={false}
                        footer={[
                            <CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />,
                        ]}
                >
                        <div className="interDrSpanModalTop">
                            <table>
                                <thead>
                                <tr>
                                    <th>保养单号</th>
                                    <th>设备名称/编号</th>
                                    <th>所属部门</th>
                                    <th>本次计划执行日期</th>
                                    <th>接单时间</th>
                                    <th>保养完成日期</th>
                                    <th>保养人</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>联轴器</td>
                                    <td>XGT1</td>
                                    <td>1</td>
                                    <td>2019-07-01</td>
                                    <td>2019-08-01</td>
                                    <td>张三</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <br /><br/>
                        <Steps progressDot current={1}>
                            <Step title="制定计划" description="本次计划执行时间：2018年12月12日" />
                            <Step title="已接单" description="2018年12月12日 12:24：48" />
                            <Step title="已完成" description="2018年12月12日 12:24：48" />
                        </Steps>
                        <br/>
                        <div className="interDrSpanModalTop">
                            <table>
                                <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>保养项目</th>
                                    <th>保养内容</th>
                                    <th>保养情况</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>管道阀门</td>
                                    <td>畅通，不漏液</td>
                                    <td>异常</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="TBremarks">备注：1,15日白班9:20，硫酸管道阀门漏液，10:00维修好后正常使用</div>
                        <br /><br />
                        <strong>配件使用</strong>
                        <br /><br />
                        <div className="interDrSpanModalTop">
                            <table>
                                <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>配件名称</th>
                                    <th>配件规格</th>
                                    <th>配件数量</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>联轴器</td>
                                    <td>XGT1</td>
                                    <td>1</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                </Modal>
            </span>
        )
    }
}

export default MaintenanceDetail