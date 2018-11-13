import React from 'react';
import {Modal} from 'antd';
class DetailSpan extends React.Component {
    state = { visible: false }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    hideModal = () => {
        this.setState({
            visible: false,
        });
    };
    render() {
        return (
            <span type="primary" onClick={this.showModal} size="small"   scroll={{ y: 400 } } >
                <Modal
                    title="Modal"
                    visible={this.state.visible}
                    onOk={this.hideModal}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                >
                    <p>Bla bla ...</p>
                    <p>Bla bla ...</p>
                    <p>Bla bla ...</p>
                </Modal>
                <a href="#">详情</a>
            </span>
        )
    }

}

export default DetailSpan;