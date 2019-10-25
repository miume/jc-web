import React from "react";
import { Button, Modal,Select,Form, Input,message,Icon } from 'antd';
import axios from 'axios';
import AddButton from '../../../BlockQuote/newButton';
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";

class AddModal extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state={
            visible:false,
            materialPonit:[],
            plcAddress:[],
            materialCode:undefined,
            plcCode:undefined
        }
    }
    showModal = () => {
        axios({
            url:`${this.url.precursorMaterialDetails.page}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization
            },
        }).then((data)=>{
            const res = data.data.data.list;
            // console.log(res)
            this.setState({
                materialPonit:res
            })
        });
        axios({
            url:`${this.url.plcAddress.plcAddress}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization
            },
        }).then((data)=>{
            const res = data.data.data.list;
            // console.log(res)
            this.setState({
                plcAddress:res
            })
        })
        this.setState({ visible: true });
    };
    handleCancel = () =>{
        this.setState({
            visible:false,
            materialPonit:[],
            plcAddress:[],
            materialCode:undefined,
            plcCode:undefined
        })
    }
    handleCreate = () =>{
        var data = {materialCode:this.state.materialCode,plcCode:this.state.plcCode};
        // console.log(data)
        axios({
            url:`${this.url.matPlcMap.matPlcMap}`,
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
                materialPonit:[],
                plcAddress:[],
                materialCode:undefined,
                plcCode:undefined
            })
        })
        
    }
    materialChange = (data)=>{
        this.setState({
            materialCode:data
        })
    }
    plcChange = (data)=>{
        this.setState({
            plcCode:data
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
                    物料点：<Select id="material" style={{width:"85%"}} onChange={this.materialChange} value={this.state.materialCode} placeholder="请选择物料点">
                        {
                            this.state.materialPonit.map((item)=>{
                                return(
                                    <Select.Option key={item.code} value={item.code}>{item.materialName}</Select.Option>
                                )
                            })
                        }
                    </Select>
                    <br /><br />
                    plc地址：<Select id="plcAddress" style={{width:"84%"}} onChange={this.plcChange} value={this.state.plcCode} placeholder="请选择plc地址">
                        {
                            this.state.plcAddress.map((item)=>{
                                return(
                                    <Select.Option key={item.code} value={item.code}>{item.address}</Select.Option>
                                )
                            })
                        }
                    </Select>
                </Modal>
            </span>
        )
    }
}

export default AddModal