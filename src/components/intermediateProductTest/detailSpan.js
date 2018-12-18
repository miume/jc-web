import React from 'react';
import { Modal,Button } from 'antd';
import DrSpanModal from './drSpanModal';
import './interProduct.css';

const data = [];
for (let i = 0; i < 50; i++) {
    data.push({
        index:i,
        id: i,
        testItem: `测试`,
        testResult: '0.001',
        itemUnit: `g/mL`,
    });
}

class DetailSpan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
        };
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = () => {
        setTimeout(() => {
            this.setState({
                visible: false,
            });
        }, 500);
    };
    handleCancel = (e) => {
        setTimeout(() => {
            this.setState({
                visible: false,
            });
        }, 500);
    };
    render() {
        const { visible } = this.state;
        return (
            <span type="primary" onClick={this.showModal} size="small"    >
                <Modal
                    title="数据详情"
                    visible={visible}
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    width="500px"
                    footer={[
                        <Button key="back" style={{right:'415px'}}  onClick={this.handleCancel}>返回</Button>,
                    ]}
                >
                    <div style={{height:580}}>
                        <DrSpanModal
                            data={data}
                            record={this.props.record}
                        />
                    </div>
                </Modal>
                <span className="blue interCursorPointer" >详情</span>
            </span>
        )
    }

}

export default DetailSpan;