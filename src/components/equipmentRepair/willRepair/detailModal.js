import React from 'react';
import {Modal, Table, Steps, Popover, message, Col, Row} from 'antd';
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
                    <Row type="flex" justify="start" style={{paddingTop:"15px"}} >
                        <Col span={1.5} style={{paddingLeft:"20px"}}>
                            <div>维修单号：{this.props.record.deviceCode}</div>
                        </Col>
                        <Col span={1.5} style={{paddingLeft:"100px"}}>
                            <div>所属部门：{this.props.record.deviceCode}</div>
                        </Col>
                    </Row>

                    <Row type="flex" justify="start" style={{paddingTop:"15px"}} >
                        <Col span={1.5} style={{paddingLeft:"20px"}}>
                            <div>设备名称：{this.props.record.deviceName}</div>
                        </Col>
                        <Col span={1.5} style={{paddingLeft:"100px"}}>
                            <div>固定资产编号：{this.props.record.fixedassetsCode}</div>
                        </Col>
                    </Row>

                    <Row type="flex" justify="start" style={{paddingTop:"15px"}} >
                        <Col span={1.5} style={{paddingLeft:"20px"}}>
                            <div>报修时间：{this.props.record.reportTime}</div>
                        </Col>
                        <Col span={1.5} style={{paddingLeft:"100px"}}>
                            <div>报修人：{this.props.record.reportPeople}</div>
                        </Col>
                    </Row>

                    <Row type="flex" justify="start" style={{paddingTop:"15px"}} >
                        <Col span={1.5} style={{paddingLeft:"20px"}}>
                            <div>故障描述：{this.props.record.faultContent}</div>
                        </Col>
                    </Row>
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
        axios({
            url: `http://192.168.1.103:8082/deviceRepair/deviceRepairApplication?`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params:{
                id: this.props.code
            }
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
            if (res) {
                const arrMes = res.deviceRepairAccessory;
                var newRowData = arrMes
                this.setState({
                    visible: true,
                    detailData: newRowData,
                })
            } else {

            }
        }).catch(() => {
            message.info('数据存在异常，请联系管理员！')
        });
    }
}
export default DetailModal