import React from 'react';
import AePopModal from './aePopModal';
import { Modal } from 'antd';

class EditSpan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ModalText: 'Content of the modal',
            visible: false,
            confirmLoading: false,
        };
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = (e) => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 1000);
    };
    handleCancel = (e) => {
        console.log('Clicked cancel button');
        setTimeout(() => {
            this.setState({
                visible: false,
            });
        }, 1000);
    };
    render() {
        const { visible, confirmLoading, ModalText } = this.state;
        return (
            <span type="primary" onClick={this.showModal} size="small"   scroll={{ y: 400 }} >
                <Modal
                    title="Modal"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    confirmLoading={confirmLoading}
                    okText="确认"
                    cancelText="取消"
                >
                    <p>Bla bla ...</p>
                    <p>Bla bla ...</p>
                    <p>Bla bla ...</p>
                </Modal>
                <a href="#">编辑</a>
            </span>
        )
    }

}

export default EditSpan;