import React from 'react';
import axios from 'axios';
import {Modal, Button, message} from 'antd';
import CancleButton from "../../BlockQuote/cancleButton";

class Fittings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
        this.handleDetail = this.handleDetail.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    render() {
        const {visible} = this.state;
        return (
            <span>
                <span className="blue" onClick={this.handleDetail}>配件</span>
                <Modal
                    title="数据详情"
                    visible={visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    footer={[
                        <CancleButton
                            handleCancel={this.handleCancel}
                            flag={true}
                            key="back"
                        />
                    ]}
                >
                    待开发
                </Modal>
            </span>
        )

    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    handleDetail = () => {
        // TODO 获取数据
        this.setState({
            visible: true
        })
    }
}

export default Fittings