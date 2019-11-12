import React from "react";
import {Modal,Input,message,TimePicker } from 'antd';
import axios from 'axios';
import AddButton from '../../../BlockQuote/newButton';
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";

// const format = 'HH:mm';
class AddModal extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            startTime:null,
            name:null,
            default:null,
            timeString:null
        }
    }
    showModal = () => {
        this.setState({ visible: true });
    };
    handleCancel = () =>{
        this.setState({
            visible:false,
            startTime:null,
            name:null,
            default:null,
            timeString:null
        })
    };
    handleCreate = () =>{
        var data = {length:this.state.default,name:this.state.name,startTime:this.state.timeString};
        axios({
            url:`${this.url.staticPeriod.add}`,
            method:"post",
            headers:{
                'Authorization':this.url.Authorization
            },
            data:data
        }).then((data)=>{
            if(this.props.data.length>7){
                message.error("数据不能大于7条")
                return;
            }
            message.info("新增成功");
            this.props.fetch();
            this.setState({
                visible:false,
                startTime:null,
                name:null,
                default:null,
                timeString:null
            })
        })
    }
    change = (data)=>{
        this.setState({
            name:data.target.value
        })
    }
    onChange = (time,timeString)=>{
        // console.log(time);
        this.setState({
            startTime:time,
            timeString:timeString
        })
    }
    description = (data)=>{
        this.setState({
            default:data.target.value
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
                    周期名称：<Input style={{width:"84%"}} id="name" onChange={this.change} value={this.state.name} placeholder="请输入周期名称"/>
                    <br /><br />
                    默认时长：<Input style={{width:"84%"}} id="default" onChange={this.description} value={this.state.default} placeholder="请输入默认时长"/>
                    <br /><br />
                    开始时刻：<TimePicker style={{width:"84%"}} id="startTime" value={this.state.startTime} onChange = {this.onChange} placeholder="请输入开始时刻"/>
                </Modal>
            </span>
        )
    }
}

export default AddModal
