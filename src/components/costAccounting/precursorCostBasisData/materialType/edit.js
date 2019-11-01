import React from "react";
import {Modal,Select,message,Input } from 'antd';
import axios from 'axios';
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
        axios({
            url:`${this.url.precursorMaterialType.getRecordById}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{id:this.props.code}
        }).then((data)=>{
            const res = data.data.data;
            // console.log(res)
            this.setState({
                visible:true,
                source:res.dataType,
                type:res.materialTypeName
            })
        })
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
        var data = {code:this.props.code,dataType:this.state.source,materialTypeName:this.state.type};
        axios({
            url:`${this.url.precursorMaterialType.update}`,
            method:"put",
            headers:{
                'Authorization':this.url.Authorization
            },
            data:data
        }).then((data)=>{
            message.info("编辑成功");
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
                <span className="blue" onClick={this.showModal}>编辑</span>
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
                        <Select.Option value={1}>补料</Select.Option>
                        <Select.Option value={0}>仓库领料</Select.Option>
                    </Select>
                </Modal>
            </span>
        )
    }
}

export default AddModal