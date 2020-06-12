import React from "react";
import {Modal, Input,message } from 'antd';
import axios from 'axios';
import AddButton from '../../../BlockQuote/newButton';
import CancleButton from "../../../BlockQuote/cancleButton";
import NewButton from "../../../BlockQuote/newButton";

class AddModal extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state={
            visible:false,
            data:null,
        }
    }
    showModal = () => {
        this.setState({ visible: true });
    };
    handleCancel = () =>{
        this.setState({
            visible:false,
            data:null,
        })
    }
    handleCreate = () =>{
        var data = {vgaName:this.state.data};
        if(!this.state.data){
            message.info('信息填写不完整!')
            return
        }
        axios({
            url:`${this.url.vga.vga}`,
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
            })
        })

    }
    change = (data)=>{
        this.setState({
            data:data.target.value
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        let {addFlag}=this.props
        return(
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
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <NewButton key="define" handleClick={this.handleCreate} className='fa fa-check' name='确定'/>,
                    ]}
                >
                    <Input id="name" placeholder='请输入VGA点名称' onChange={this.change} value={this.state.data} placeholder="请输入vga点名称"/>
                </Modal>
            </span>
        )
    }
}

export default AddModal
