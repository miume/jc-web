import React from 'react';
import { Modal,Button,Popconfirm,Popover } from 'antd';
import CheckSpanModal from './checkSpanModal';

const data = [];
for (let i = 0; i < 50; i++) {
    data.push({
        index:i,
        id: i,
        testItem: `测试`,
        testResult: '0.001',
        itemUnit: `kg`,
    });
}

class CheckSpan extends React.Component {
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
    render() {
        const { visible } = this.state;
        return (
            <span type="primary" onClick={this.showModal} size="small"    >
                <Modal
                    title="数据录检"
                    style={{ top: 20 }}
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                    width="500px"
                    footer={[
                        <Button key="back" style={{right:'400px'}}  onClick={this.handleCancel}>返回</Button>,
                        <Button key="keep" style={{right:'400px'}}  onClick={this.handleKeep}>保存</Button>,
                        <Button key="submit" style={{right:'400px'}}  onClick={this.handleSubmit}>送审</Button>
                    ]}
                >
                    <div style={{height:550}}>
                        <CheckSpanModal
                            data={data}
                            record={this.props.record}
                        />
                    </div>
                </Modal>
                <a  href ="#" disabled={this.props.disabled}>录检</a>
            </span>
        )
    }
    /**实现Button返回，保存,送审功能 */
    handleKeep = () => {

    };
    handleSubmit = () => {

    };
    handleCancel = (e) => {
        setTimeout(() => {
            this.setState({
                visible: false,
            });
        }, 500);
    };
    /**---------------------- */
    /**实现字段搜索功能 */
    /**---------------------- */

}

export default CheckSpan;