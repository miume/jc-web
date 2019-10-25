import React from 'react';
import {Modal, Table, message, Col, Row, Divider} from 'antd';
import CancleButton from "../../../BlockQuote/cancleButton";
import axios from "axios";

class DetailModal extends React.Component{
    constructor(props){
        super(props)
        this.state={
            visible:false,
            detailData:[],
        }
    }
    columns=[{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        sorter: (a, b) => a.index - b.index,
        align:'center',
        width: '80px',
    },{
        title: '配件名称',
        dataIndex: 'name',
        key: 'name',
        align:'center',
        width: '150px',
    },{
        title: '配件规格',
        dataIndex: 'specification',
        key: 'specification',
        align:'center',
        width: '150px',
    },{
        title: '配件数量',
        dataIndex: 'counts',
        key: 'counts',
        align:'center',
        width: '120px',
    }]

    dataSource=[{
        code:'1',
        name:'螺丝',
        specification:'big',
        counts:6
    },{
        code:'2',
        name:'螺丝',
        specification:'big',
        counts:6
    },{
        code:'3',
        name:'螺丝',
        specification:'big',
        counts:6
    }]
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
                        <Col span={1.5} style={{}}>
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

                        <Col span={1.5} style={{paddingLeft:"20px"}}>
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

                    <Row type="flex" justify="start" style={{paddingTop:"15px",paddingLeft:"20px",paddingRight:"20px"}} >
                        <Col span={1.5} style={{paddingLeft:"40px"}}>
                            <div>故障描述：{this.props.record.faultContent}</div>
                        </Col>
                    </Row>

                    <Divider dashed />

                    <Row>
                        <Col type="flex" span={1.5} style={{paddingLeft:"20px"}}>
                            <Row type="flex" justify="start" style={{paddingTop:"15px"}} >
                                <div>接单时间：{this.props.record.receiveTime}</div>
                            </Row>
                            <Row type="flex" justify="start" style={{paddingTop:"15px"}} >
                                <div>联系电话：{this.props.record.receivePhone}</div>
                            </Row>
                        </Col>

                        <Col type="flex" span={1.5} style={{paddingLeft:"20px"}}>
                            <Row type="flex" justify="start" style={{paddingTop:"15px",paddingLeft:"12px"}} >
                                <div>接单人：{this.props.record.receivePeople}</div>
                            </Row>
                            <Row type="flex" justify="start" style={{paddingTop:"15px"}} >
                                <div>完成时间：{this.props.record.finishTime}</div>
                            </Row>
                        </Col>
                    </Row>

                    <Divider dashed />

                    <Row type="flex" justify="start" style={{height: 150}} >
                        <Col span={1.5} style={{paddingLeft:"30px",paddingRight:"30px"}}>
                            <div>
                                <h4>配件使用</h4>
                                <Table
                                    columns={this.columns}
                                    dataSource={this.state.detailData}
                                    rowKey={record => record.code}
                                    size="small"
                                    bordered
                                    pagination={false}
                                    scroll={{y:100}}
                                />
                            </div>
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
            url:`${this.props.url.equipmentRepair.deviceRepairApplication}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params:{
                id: this.props.code
            }
        }).then((data) => {
            const res = data.data.data.deviceRepairAccessory ? data.data.data.deviceRepairAccessory: [];
            if (res) {
                for(let i = 0; i < res.length; i++) {
                    res[i]['index'] = i + 1;
                }
                this.setState({
                    visible: true,
                    detailData: res,
                })
            } else {

            }
        }).catch(() => {
            message.info('数据存在异常，请联系管理员！')
        });
        this.setState({
            visible: true
        });
    }
}
export default DetailModal
