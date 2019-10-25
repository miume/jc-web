import React from "react";
import axios from "axios";
import {Table, message, Spin, Divider,Modal} from "antd";
import CancleButton from "../../BlockQuote/cancleButton";

class ServiceDetail extends React.Component{
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
                    title='设备维修详情'
                    visible={this.state.visible}
                    width="500px"
                    closable={false} centered={true}
                    maskClosable={false}
                        footer={[
                            <CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />,
                        ]}
                >
                        <div>
                            <span>维修单号：wx1234567</span>
                            <span style={{float:"right",display:"inlineBlock"}}>所属部门：制造一部</span>
                        </div>
                        <br />
                        <div>
                            <span>设备名称：反应槽</span>
                            <span style={{float:"right",display:"inlineBlock"}}>固定资产编号：00001</span>
                        </div>
                        <br />
                        <div>
                            <span>报修时间：2019-01-01 12:30:30</span>
                            <span style={{float:"right",display:"inlineBlock"}}>报修人：张三</span>
                        </div>
                        <br />
                        <div><span>紧急程度：一般</span></div>
                        <br />
                        <div><span>故障描述：故障描述故障描述</span></div>
                        <br />
                        <div><span>故障描述及原因：文字文字文字文字文字</span></div>
                        <Divider />
                        <div>
                            <span>接单时间：2019-01-01 12:30：30</span>
                            <span style={{float:"right",display:"inlineBlock"}}>接单人：张三</span>
                        </div>
                        <br />
                        <div>
                            <span>联系电话：1234567</span>
                            <span style={{float:"right",display:"inlineBlock"}}>完成时间：2019-01-01 12:30：30</span>
                        </div>
                        <Divider />
                        <strong>配件使用</strong>
                        <br />
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

export default ServiceDetail