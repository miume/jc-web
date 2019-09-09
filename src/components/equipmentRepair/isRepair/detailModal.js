import React from 'react';
import {Modal, Table, Steps, Popover, message, Col, Row,Divider} from 'antd';
import CancleButton from "../../BlockQuote/cancleButton";
import axios from "axios";

class DetailModal extends React.Component{
    constructor(props){
        super(props)
        this.state={
            visible:false,
            detailData:[],
        }
    }

    render() {
        return(
            <div style={{display:'flex'}}>
                <span className="blue" onClick={this.handleDetail}>详情</span>
                <Modal
                    title="设备维修详情"
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    width="500px"
                    footer={[
                        <CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />
                    ]}
                >
                    <div>
                        <Row>
                            <Col type="flex" span={1.5}>
                                <Row type="flex" justify="start" style={{paddingTop:"15px"}} >
                                    <div>维修单号：{this.props.record.deviceCode}</div>
                                </Row>
                                <Row type="flex" justify="start" style={{paddingTop:"15px"}} >
                                    <div>设备名称：{this.props.record.deviceName}</div>
                                </Row>
                                <Row type="flex" justify="start" style={{paddingTop:"15px"}} >
                                    <div>报修时间：{this.props.record.reportTime}</div>
                                </Row>
                            </Col>

                            <Col type="flex" span={1.5} style={{paddingLeft:"20px"}}>
                                <Row type="flex" justify="start" style={{paddingTop:"15px"}} >
                                    <div>所属部门：{this.props.record.deptName}</div>
                                </Row>
                                <Row type="flex" justify="start" style={{paddingTop:"15px"}} >
                                    <div>固定资产编号：{this.props.record.fixedassetsCode}</div>
                                </Row>
                                <Row type="flex" justify="start" style={{paddingTop:"15px"}} >
                                    <div>报修人：{this.props.record.reportPeople}</div>
                                </Row>
                            </Col>
                        </Row>

                        <Row type="flex" justify="start" style={{paddingTop:"15px",paddingLeft:"21px"}} >
                            <Col span={1.5} style={{paddingLeft:"23px"}}>
                                <div>故障描述：{this.props.record.faultContent}</div>
                            </Col>
                        </Row>

                        <Divider dashed />

                        <Row>
                            <Col type="flex" span={1.5} style={{marginLeft:'-15px'}}>
                                <Row type="flex" justify="start" style={{paddingTop:"15px",paddingLeft:"-5px"}} >
                                    <div>接单时间：{this.props.record.receiveTime}</div>
                                </Row>
                                <Row type="flex" justify="start" style={{paddingTop:"15px"}} >
                                    <div>联系电话：{this.props.record.receivePhone}</div>
                                </Row>
                            </Col>

                            <Col type="flex" span={1.5} style={{paddingLeft:"20px"}}>
                                <Row type="flex" justify="start" style={{paddingTop:"15px",marginLeft:'-15px'}} >
                                    <Col span={1.5} >
                                        <div>接单人：{this.props.record.receivePeople}</div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                    </div>

                </Modal>
            </div>
        )
    }
    handleCancel=()=>{
        this.setState({
            visible: false
        });
    }

    handleDetail = () => {
        // axios({
        //     url:`${this.props.url.equipmentRepair.deviceRepairApplication}`,
        //     method: 'get',
        //     headers: {
        //         'Authorization': this.props.url.Authorization
        //     },
        //     params:{
        //         id: this.props.code
        //     }
        // }).then((data) => {
        //     const res = data.data.data ? data.data.data : [];
        //     if (res) {
        //         const arrMes = res.deviceRepairAccessory;
        //         var newRowData = arrMes
        //         this.setState({
        //             visible: true,
        //             detailData: newRowData,
        //         })
        //     } else {
        //
        //     }
        // }).catch(() => {
        //     message.info('数据存在异常，请联系管理员！')
        // });
        this.setState({
            visible: true
        });
    }
}
export default DetailModal