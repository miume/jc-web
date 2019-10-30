import React from "react";
import {Modal, Input,message,Select,Checkbox } from 'antd';
import axios from 'axios';
import AddButton from '../../../BlockQuote/newButton';
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";

class AddModal extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            data:null,
            productLine:undefined,
            tank:undefined,
            value:undefined
        }
    }
    showModal = () => {
        this.setState({ visible: true });
    };
    handleCancel = () =>{
        this.setState({
            visible:false,
            data:null,
            description:null
        })
    }
    handleCreate = () =>{
        this.setState({
            visible:false,
            data:null,
            description:null
        })
    }
    change = (data)=>{
        this.setState({
            productLine:data
        })
    }
    onChange = (data)=>{
        this.setState({
            tank:data
        })
    }
    valueChange = (data)=>{
        this.setState({
            value:data.target.value
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const options = [
            { label: 'Apple', value: 'Apple' },
            { label: 'Pear', value: 'Pear' },
            { label: 'Orange', value: 'Orange' },
          ];
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
                    生产线：<Select onChange={this.change} value={this.state.productLine} placeholder="请选择生产线" style={{width:"86%"}}>
                        <Select.Option value="1">1#生产线</Select.Option>
                        <Select.Option value="2">2#生产线</Select.Option>
                    </Select>
                    <br /><br />
                    合成槽号：<Select onChange={this.onChange} value={this.state.tank} placeholder="请选择合成槽号" style={{width:"83%"}}>
                        <Select.Option value="1">301</Select.Option>
                        <Select.Option value="2">302</Select.Option>
                    </Select>
                    <br /><br />
                    初始体积値：<Input value={this.state.value} placeholder="请输入初始体积値" onChange={this.valueChange} style={{width:"77%"}}/>&nbsp;m³
                </Modal>
            </span>
        )
    }
}

export default AddModal