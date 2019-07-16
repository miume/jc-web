import React from 'react';
import {Table, Input, InputNumber, Popconfirm, Form, message, Modal, Row} from 'antd';
class Edit extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <span>
                <span className="blue" onClick={this.handleEdit}>编辑</span>
                <Modal
                >

                </Modal>
            </span>
        );
    }


}

export default Edit