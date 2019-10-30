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
            materialName:undefined,
            source:undefined,
            materialPhase:undefined,
            materialType:undefined,
            metal:[],
            method:undefined,
        }
    }
    showModal = () => {
        this.setState({ visible: true });
    };
    handleCancel = () =>{
        this.setState({
            visible:false,
            data:null,
            materialName:undefined,
            source:undefined,
            materialPhase:undefined,
            materialType:undefined,
            metal:[],
            method:undefined
        })
    }
    handleCreate = () =>{
        this.setState({
            visible:false,
            data:null,
            materialName:undefined,
            source:undefined,
            materialPhase:undefined,
            materialType:undefined,
            metal:[],
            method:undefined
        })
    }
    change = (data)=>{
        this.setState({
            source:data
        })
    }
    PhaChange = (data)=>{
        this.setState({
            materialPhase:data
        })
    }
    typeChange=(data)=>{
        this.setState({
            materialType:data
        })
    }
    metChange=(data)=>{
        this.setState({
            method:data
        })
    }
    nameChange=(data)=>{
        this.setState({
            materialName:data.target.value
        })
    }
    onChange = (data)=>{
        this.setState({
            metal:data
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
                    原材料名称：<Input value={this.state.materialName} onChange={this.nameChange} placeholder="请输入原材料名称" style={{width:"80%"}}/>
                    <br /><br />
                    物料来源：<Select onChange={this.change} value={this.state.source} placeholder="请选择物料来源" style={{width:"83%"}}>
                        <Select.Option value="1">仓库领料</Select.Option>
                        <Select.Option value="2">补料</Select.Option>
                    </Select>
                    <br /><br />
                    材料物相：<Select onChange={this.PhaChange} value={this.state.materialPhase} placeholder="请选择物料来源" style={{width:"83%"}}>
                        <Select.Option value="1">溶液</Select.Option>
                        <Select.Option value="2">晶体</Select.Option>
                    </Select>
                    <br /><br />
                    材料类别：<Select onChange={this.typeChange} value={this.state.materialType} placeholder="请选择物料来源" style={{width:"83%"}}>
                        <Select.Option value="1">溶液</Select.Option>
                        <Select.Option value="2">晶体</Select.Option>
                    </Select>
                    <br /><br />
                    所含金属：<Checkbox.Group options={options} onChange={this.onChange}></Checkbox.Group>
                    <br /><br />
                    领料方式：<Select onChange={this.metChange} value={this.state.method} placeholder="请选择物料来源" style={{width:"83%"}}>
                        <Select.Option value="1">手工领料</Select.Option>
                        <Select.Option value="2">VGA叫点</Select.Option>
                    </Select>
                </Modal>
            </span>
        )
    }
}

export default AddModal