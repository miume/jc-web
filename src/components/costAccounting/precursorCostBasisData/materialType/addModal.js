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
            source:undefined,
            type:undefined
        }
    }
    showModal = () => {
        this.setState({ visible: true });
    };
    handleCancel = () =>{
        this.setState({
            visible:false,
            data:null,
            source:undefined,
            type:undefined
        })
    }
    handleCreate = () =>{
        var data = {dataType:this.state.source,materialTypeName:this.state.type};
        if(!this.state.source||!this.state.type){
            message.error('信息填写不完整!')
            return
        }
        axios({
            url:`${this.url.precursorMaterialType.add}`,
            method:"post",
            headers:{
                'Authorization':this.url.Authorization
            },
            data:data
        }).then((data)=>{
            message.info("新增成功");
            this.props.fetch();
            this.setState({
                visible:false,
                data:null,
                source:undefined,
                type:undefined
            })
        })
    }
    change = (data)=>{
        this.setState({
            source:data
        })
    }
    onChange = (data)=>{
        this.setState({
            type:data.target.value
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        // const options = [
        //     { label: 'Apple', value: 'Apple' },
        //     { label: 'Pear', value: 'Pear' },
        //     { label: 'Orange', value: 'Orange' },
        //   ];
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
                    材料类别：<Input value={this.state.type} onChange={this.onChange} placeholder="请输入材料类别" style={{width:"83%"}}/>
                    <br /><br/>
                    物料来源：<Select onChange={this.change} value={this.state.source} placeholder="请选择生产线" style={{width:"83%"}}>
                        <Select.Option value="1">补料</Select.Option>
                        <Select.Option value="0">仓库领料</Select.Option>
                    </Select>
                </Modal>
            </span>
        )
    }
}

export default AddModal