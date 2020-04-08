import React from 'react';
import {Modal, Col, Row} from 'antd';
import CancleButton from "../../../BlockQuote/cancleButton";

class DetailModal extends React.Component{
    constructor(props){
        super(props)
        this.state={
            visible:false,
            detailData:[]
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
                <Row>
                    <Col type="flex" span={1.5} style={{}}>
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
                        <Row type="flex" justify="start" style={{paddingTop:"15px",paddingLeft:"29px"}} >
                            <div>所属部门：{this.props.record.deptName}</div>
                        </Row>
                        <Row type="flex" justify="start" style={{paddingTop:"15px"}} >
                            <div>固定资产编号：{this.props.record.fixedassetsCode}</div>
                        </Row>
                        <Row type="flex" justify="start" style={{paddingTop:"15px",paddingLeft:"42px"}} >
                            <div>报修人：{this.props.record.reportPeople}</div>
                        </Row>
                    </Col>
                </Row>

                    <Row type="flex" justify="start" style={{paddingTop:"15px",paddingLeft:"20px"}} >
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
        this.setState({
            visible: true
        });
    }
}
export default DetailModal
