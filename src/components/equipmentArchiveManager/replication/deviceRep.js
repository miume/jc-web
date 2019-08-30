import React from 'react';
import CancleButton from "../../BlockQuote/cancleButton";
import SaveButton from "../../BlockQuote/saveButton";
import {Modal, Row, Col, Input, Button, message} from "antd";
import axios from "axios";

class DeviceRep extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            number:1
        }

        this.deviceReplication = this.deviceReplication.bind(this)

    }

    render() {
        return (
            <span>
                <span className="blue" onClick={this.deviceReplication}>主设备复制</span>
                <Modal
                    title="主设备复制"
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    width="500px"
                    footer={[
                        <CancleButton
                            handleCancel={this.handleCancel}
                            flag={true}
                            key="back"
                        />,
                        <Button key="save" onClick={this.handleSave} className='green-button'><i className="fa fa-floppy-o" aria-hidden="true" style={{color:'white'}}></i>&nbsp;&nbsp;复制</Button>
                    ]}
                >
                    <Row>
                        <Col span={18} push={6}>
                            <Input placeholder="请输入复制数量(必填)" value={this.state.number} onChange={this.inputChange}/>
                        </Col>
                        <Col span={6} pull={18}>
                            <div style={{marginTop:'8px'}}>复制数量：</div>
                        </Col>
                    </Row>
                </Modal>
            </span>
        );
    }
    handleSave = () => {
        console.log(this.props.depCode)
        console.log(this.props.deviceName)
        console.log(this.props.record.code)
        console.log(this.state.number)
        axios({
            url:`${this.props.url.equipmentArchive.duplicateMutipleDevice}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params:{
                deviceId:this.props.record.code,
                cnt:this.state.number
            }
        }).then((data) => {
            message.info('复制成功');
            this.props.getTableData({
                deptId: parseInt(this.props.depCode),
                deviceName: this.props.deviceName
            })
            this.handleCancel()
        }).catch(() => {
            message.info('复制失败，请联系管理员！');
        });
    }
    inputChange = (e) => {
        this.setState({
            number: e.target.value,
        });
    }

    deviceReplication = () => {
        this.setState({
            visible: true,
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            number:1
        });
    };

}

export default DeviceRep