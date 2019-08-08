import React from 'react';
import CancleButton from "../../BlockQuote/cancleButton";
import SaveButton from "../../BlockQuote/saveButton";
import {Modal,Row,Col,Input,Button} from "antd";

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
                    title="数据详情"
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
        this.handleCancel()
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