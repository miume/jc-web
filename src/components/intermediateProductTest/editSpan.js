import React from 'react';
import AePopModal from './aePopModal';
import { Modal } from 'antd';

const data = [];
for (let i = 0; i < 50; i++) {
    data.push({
        id: i,
        a: `b`,
        b: 'a',
        c: `c`,
    });
}

class EditSpan extends React.Component {
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
            <span type="primary" onClick={this.showModal} size="small"   scroll={{ y: 400 }} >
                <Modal
                    title="Modal"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                    width="650px"
                >
                    <AePopModal data={data}/>
                </Modal>
                <a href="#">编辑</a>
            </span>
        )
    }

}

export default EditSpan;