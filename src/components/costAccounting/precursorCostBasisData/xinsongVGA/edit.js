import React from "react";
import { Button, Modal,Select,Form, Input,message,Icon } from 'antd';
import axios from 'axios';
import AddButton from '../../../BlockQuote/newButton';
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";

class Edit extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            data:null,
        }
    }
    showModal = () =>{
        axios({
            url:`${this.url.vga.getRecordById}`,
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
                data:res.vgaName,
            })
        })
    };
    handleCancel = () =>{
        this.setState({
            visible:false,
            data:null,
        })
    };
    change = (data) =>{
        this.setState({
            data:data.target.value
        })
    };
    handleCreate = () =>{
        var data = {code:this.props.code,vgaName:this.state.data};
        // console.log(data)
        axios({
            url:`${this.url.vga.vga}`,
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
            })
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        return(
            <span>
                <span className="blue" onClick={this.showModal}>编辑</span>
                <Modal
                    title='编辑' visible={this.state.visible}
                    closable={false} centered={true}
                    maskClosable={false}
                    width='500px'
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <SaveButton key="define" handleSave={this.handleCreate} className='fa fa-check' />,
                    ]}
                >
                    <Input id="name" onChange={this.change} value={this.state.data} placeholder="请输入vga点名称"/>
                </Modal>
            </span>
        )
    }
}

export default Edit