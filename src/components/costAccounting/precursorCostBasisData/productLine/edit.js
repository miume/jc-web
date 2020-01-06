import React from "react";
import { Modal, Input, message } from 'antd';
import axios from 'axios';
import CancleButton from "../../../BlockQuote/cancleButton";
import NewButton from "../../../BlockQuote/newButton";

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
        axios({
            url: `${this.url.precursorProductionLine.getRecordById}`,
            method: "get",
            headers: {
                'Authorization': this.url.Authorization
            },
            params: { id: this.props.code }
        }).then((data) => {
            const res = data.data.data;
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
        axios({
            url: `${this.url.precursorProductionLine.update}`,
            method: "put",
            headers: {
                'Authorization': this.url.Authorization
            },
            data: data
        }).then((data) => {
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
        let {updateFlag}=this.props
        return (
            <span>
                <span className={updateFlag?'blue':'hide'} onClick={this.showModal}>编辑</span>
                <Modal
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    title="编辑"
                    width='500px'
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel} />,
                        <NewButton key="define" handleClick={this.handleCreate} className='fa fa-check' name='确定'/>,
                    ]}
                >
                    生产线名称：<Input id="name" style={{ width: "80%" }} onChange={this.change} value={this.state.name} placeholder="请输入生产线名称" />
                </Modal>
            </span>
        )
    }
}

export default Edit
