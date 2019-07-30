import React from 'react';
import axios from 'axios';
import {Modal, Button, message} from 'antd';
import CancleButton from "../../BlockQuote/cancleButton";
import RepairModal from "../modal/repairModal";

class Repair extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: []
        };
        this.handleRepair = this.handleRepair.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    render() {
        return (
            <span>
                <span className="blue" onClick={this.handleRepair}>维修</span>
                <Modal
                    title="数据详情"
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    width="95%"
                    footer={[
                        <CancleButton
                            handleCancel={this.handleCancel}
                            flag={true}
                            key="back"
                        />
                    ]}
                >
                    <RepairModal
                        data={this.state.data}
                    />
                </Modal>
            </span>
        )

    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    handleRepair = () => {
        // TODO 获取数据
        const data = [{
            index: 1,
            code: 1,
            a: '未接单',
            b: '气炉',
            c: '制造部',
            d: '1',
            e: '李小红',
            f: '2018年12月12日 12:12:12',
            g: '2018年12月12日 12:12:12',
            h: '2018年12月12日 12:12:12',
        }, {
            index: 2,
            code: 2,
            a: '未接单',
            b: '气炉',
            c: '制造部',
            d: '1',
            e: '李小红',
            f: '2018年12月12日 12:12:12',
            g: '2018年12月12日 12:12:12',
            h: '2018年12月12日 12:12:12',
        }];
        this.setState({
            visible: true,
            data: data
        })
    }
}

export default Repair