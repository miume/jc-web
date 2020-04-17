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
            helpPeoples: ''
        }
    }
    columns=[{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        sorter: (a, b) => a.index - b.index,
        width: '10%',
    },{
        title: '配件名称',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
    },{
        title: '配件规格',
        dataIndex: 'specification',
        key: 'specification',
        width: '30%',
    },{
        title: '配件数量',
        dataIndex: 'counts',
        key: 'counts',
        width: '30%',
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
                        <Col span={12}>维修单号: {this.props.record.deviceCode}</Col>
                        <Col span={12}>所属部门：{this.props.record.deptName}</Col>
                    </Row>
                    <Row>
                        <Col span={12}>设备名称：{this.props.record.deviceName}</Col>
                        <Col span={12}>固定资产编号：{this.props.record.fixedassetsCode}</Col>
                    </Row>
                    <Row>
                        <Col span={12}>报修时间：{this.props.record.reportTime}</Col>
                        <Col span={12}>报修人：{this.props.record.reportPeople}</Col>
                    </Row>
                    <div style={{padding: '6px 0'}}>协作人：{this.state.helpPeoples}</div>
                    <div style={{padding: '6px 0'}}>故障描述：{this.props.record.faultContent}</div>
                    <div style={{padding: '6px 0'}}>故障处理及原因分析：{this.props.record.faultReason}</div>

                    <Divider dashed />
                    <Row>
                        <Col span={12}>接单时间：{this.props.record.receiveTime}</Col>
                        <Col span={12}>接单人：{this.props.record.receivePeople}</Col>
                    </Row>
                    <Row>
                        <Col span={12}>联系电话：{this.props.record.receivePhone}</Col>
                        <Col span={12}>完成时间：{this.props.record.finishTime}</Col>
                    </Row>

                    <Divider dashed />
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
                    helpPeoples: data.data.data.helpPeoples || ''
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
