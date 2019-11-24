import React from "react";
import { Modal, Input, message, TimePicker } from 'antd';
import axios from 'axios';
import AddButton from '../../../BlockQuote/newButton';
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";

// const format = 'HH:mm';
class AddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            startTime: null,
            name: '',
            default: '',
            timeString: ''
        }
    }
    showModal = () => {
        this.setState({ visible: true });
    };
    handleCancel = () => {
        this.setState({
            visible: false,
            startTime: null,
            name: '',
            default: '',
            timeString: ''
        })
    };
    handleCreate = () => {
        let {name,timeString}=this.state
        if(!this.state.default||!name||!timeString){
            message.info('信息填写不完整!')
            return
        }
        if (this.props.data.length >= 7) {
            message.error("数据不能大于7条")
            return;
        }
        var data = { length: this.state.default, name:name, startTime: timeString };
      
        axios({
            url: `${this.props.url.staticPeriod.add}`,
            method: "post",
            headers: {
                'Authorization': this.props.url.Authorization
            },
            data: data
        }).then((data) => {
            message.info(data.data.message);
            this.props.fetch();
            this.setState({
                visible: false,
                startTime: null,
                name: '',
                default: '',
                timeString: ''
            })
        })
    }
    change = (data) => {
        this.setState({
            name: data.target.value
        })
    }
    onChange = (time, timeString) => {
        this.setState({
            startTime: time,
            timeString: timeString
        })
    }
    description = (data) => {
        this.setState({
            default: data.target.value
        })
    }
    render() {
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
                    周期名称：<Input style={{ width: "84%" }} id="name" onChange={this.change} value={this.state.name} placeholder="请输入周期名称" />
                    <br /><br />
                    默认时长：<Input style={{ width: "84%" }} id="default" onChange={this.description} value={this.state.default} placeholder="请输入默认时长" />
                    <br /><br />
                    开始时刻：<TimePicker style={{ width: "84%" }} id="startTime" value={this.state.startTime} onChange={this.onChange} placeholder="请输入开始时刻" />
                </Modal>
            </span>
        )
    }
}

export default AddModal
