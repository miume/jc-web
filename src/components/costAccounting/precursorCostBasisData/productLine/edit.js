import React from "react";
import { Modal, Input, message } from 'antd';
import axios from 'axios';
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";

class Edit extends React.Component {
    url;
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            name: null,
        }
    }
    showModal = () => {
        // console.log(this.props.code)
        axios({
            url: `${this.url.precursorProductionLine.getRecordById}`,
            method: "get",
            headers: {
                'Authorization': this.url.Authorization
            },
            params: { id: this.props.code }
        }).then((data) => {
            // console.log(data.data.data)
            const res = data.data.data;
            // console.log(moment(res.startTime))
            this.setState({
                visible: true,
                name: res.name,
            });
        })
    };
    handleCancel = () => {
        this.setState({
            visible: false,
            name: null,
        })
    };
    handleCreate = () => {
        var data = { code: this.props.code, name: this.state.name };
        // console.log(data)
        axios({
            url: `${this.url.precursorProductionLine.update}`,
            method: "put",
            headers: {
                'Authorization': this.url.Authorization
            },
            data: data
        }).then((data) => {
            // console.log(data)
            message.info("编辑成功");
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
                <span className="blue" onClick={this.showModal}>编辑</span>
                <Modal
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    title="编辑"
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

export default Edit
