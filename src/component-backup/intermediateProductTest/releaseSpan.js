import React from 'react';
import { Modal,Button,Popconfirm,Popover } from 'antd';
import DrSpanModal from './drSpanModal';

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

class ReleaseSpan extends React.Component {
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
                    title="数据发布"
                    style={{ top: 20 }}
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                    width="500px"
                    footer={[
                        <Button key="back" style={{right:'340px'}}  onClick={this.handleCancel}>返回</Button>,
                        <Button key="release" style={{left:'10px'}}  onClick={this.handleRelease}>发布</Button>
                    ]}
                >
                    <div style={{height:550}}>
                        <DrSpanModal
                            data={data}
                            record={this.props.record}
                            spanStatus={0}
                        />
                    </div>
                </Modal>
                <a  href ="#" disabled={this.props.disabled}>发布</a>
            </span>
        )
    }
    handleRelease = () => {
        setTimeout(() => {
            this.setState({
                visible: false,
            });
        }, 500);
    }

}

export default ReleaseSpan;