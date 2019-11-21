import React from "react";
import { Modal, Input, message } from 'antd';
import axios from 'axios';
import AddButton from '../../../BlockQuote/newButton';
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";

// const format = 'HH:mm';
class AddModal extends React.Component {
    url;
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            name: null,
        }
    }
    showModal = () => {
        this.setState({ visible: true });
    };
    handleCancel = () => {
        this.setState({
            visible: false,
            name: null,
        })
    };
    handleCreate = () => {
        var data = { name: this.state.name };
        // console.log(data)
        axios({
            url: `${this.url.precursorProductionLine.add}`,
            method: "post",
            headers: {
                'Authorization': this.url.Authorization
            },
            data: data
        }).then((data) => {
            // console.log(data)
            message.info("新增成功");
            this.props.fetch();
            this.setState({
                visible: false,
                name: null,
            })
        })
    }
    change = (data) => {
        this.setState({
            name: data.target.value
        })
    }
    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        return (
            <span>
                <AddButton handleClick={this.showModal} name='新增' className='fa fa-plus' />
                <Modal
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    title="新增"
                    width='500px'
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel} />,
                        <SaveButton key="define" handleSave={this.handleCreate} className='fa fa-check' />,
                    ]}
                >
                    生产线名称：<Input id="name" style={{ width: "80%" }} onChange={this.change} value={this.state.name} placeholder="请输入生产线名称" />
                </Modal>
            </span>
        )
    }
}

export default AddModal
