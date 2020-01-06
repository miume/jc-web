import React from "react";
import { Modal, Input, message } from 'antd';
import axios from 'axios';
import AddButton from '../../../BlockQuote/newButton';
import CancleButton from "../../../BlockQuote/cancleButton";
import NewButton from "../../../BlockQuote/newButton";


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
        if(!this.state.name){
            message.info('信息填写不完整!')
        }
        axios({
            url: `${this.url.precursorProductionLine.add}`,
            method: "post",
            headers: {
                'Authorization': this.url.Authorization
            },
            data: data
        }).then((data) => {
            message.info(data.data.message);
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
        let {addFlag}=this.props
        return (
            <span>
                <span className={addFlag?'':'hide'}>
                    <AddButton handleClick={this.showModal} name='新增' className='fa fa-plus' />
                </span>
                <Modal
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    title="新增"
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

export default AddModal
