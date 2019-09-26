import React from "react";
import { Button, Modal,Select,Form, Input,message,Icon } from 'antd';
import axios from 'axios';
import AddButton from '../BlockQuote/newButton';
import CancleButton from "../BlockQuote/cancleButton";
import SaveButton from "../BlockQuote/saveButton";

class AddModal extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state={
            visible:false,
        }
    }
    showModal = () => {
        this.setState({ visible: true });
    };
    handleCancel = () =>{
        this.setState({
            visible:false
        })
    }
    handleCreate = () =>{
        this.setState({
            visible:true
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        return(
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
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <SaveButton key="define" handleSave={this.handleCreate} className='fa fa-check' />,
                    ]}
                >
                    <Input id="name" placeholder="请输入物料名称"/>
                    <br />
                    <br />
                    <Input id="name" placeholder="请输入PLC地址"/>
                </Modal>
            </span>
        )
    }
}

export default AddModal