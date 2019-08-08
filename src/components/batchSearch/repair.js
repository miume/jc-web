import React from 'react';
import {Modal} from 'antd';
import CancleButton from "../BlockQuote/cancleButton";
import RepairModal from "./repairModal";

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
                    width="1150px"
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
            a: '2',
            b: '紧急',
            c: '2018年12月12日 12:12:12',
            d: '李小红',
            e: '2018年12月12日 12:12:12',
            f: '李小红',
            h: '2018年12月12日 12:12:12',
        },{
            index: 1,
            code: 1,
            a: '2',
            b: '紧急',
            c: '2018年12月12日 12:12:12',
            d: '李小红',
            e: '2018年12月12日 12:12:12',
            f: '李小红',
            h: '2018年12月12日 12:12:12',
        },{
            index: 1,
            code: 1,
            a: '2',
            b: '紧急',
            c: '2018年12月12日 12:12:12',
            d: '李小红',
            e: '2018年12月12日 12:12:12',
            f: '李小红',
            h: '2018年12月12日 12:12:12',
        }];
        this.setState({
            visible: true,
            data: data
        })
    }
}

export default Repair