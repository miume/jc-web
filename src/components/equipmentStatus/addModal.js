import React from 'react';
import {Modal, Form, Input,message } from 'antd';
import CancleButton from "../BlockQuote/cancleButton";
import NewButton from "../BlockQuote/newButton";
import axios from "axios";

class AddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            saveData:''
        }
        this.handleAdd = this.handleAdd.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleOk = this.handleOk.bind(this)
        this.onchange = this.onchange.bind(this)

    }

    render() {
        return (
            <span>
                <NewButton handleClick={this.handleAdd} name='新增' className='fa fa-plus' />
                <Modal
                    visible={this.state.visible}
                    title="新增"
                    closable={false}
                    width='360px'
                    centered={true}
                    className='modal'
                    maskClosable={false}
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <NewButton key="submit" handleClick={this.handleOk} name='确定' style='button' className='fa fa-check' />
                    ]}
                >
                    <Input key="input" placeholder="请输入设备状态名称" onChange={this.onchange} value={this.state.saveData}/>
                </Modal>
            </span>
        );
    }

    handleAdd = () => {
        this.setState({
            visible: true
        })
    }
    handleOk = () => {
        const saveData = this.state.saveData;
        axios({
            url : `${this.props.url.equipmentStatus.deviceStatus}`,
            method:'post',
            headers:{
                'Authorization': this.props.url.Authorization
            },
            data: {
                name: saveData
            },
        }).then((data) => {
            message.info(data.data.message);
            this.props.fetch();
        }).catch(function () {
            message.info('新增失败，请联系管理员！');
        });
        this.setState({
            visible: false,
            saveData: ''
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            saveData: ''
        })
    }
    onchange = (e) => {
        this.setState({
            saveData: e.target.value
        })
    }


}

export default AddModal