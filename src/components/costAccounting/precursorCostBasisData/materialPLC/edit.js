import React from "react";
import {Modal,Select,message } from 'antd';
import axios from 'axios';
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
        axios({
            url:`${this.url.matPlcMap.getRecordById}`,
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
                materialCode:res.materialId,
                plcCode:res.plcId
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
        var data = {code:this.props.code,materialCode:this.state.materialCode,plcCode:this.state.plcCode};
        // console.log(data)
        axios({
            url:`${this.url.matPlcMap.matPlcMap}`,
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
                <span className="blue" onClick={this.showModal}>编辑</span>
                <Modal
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    title="编辑"
                    width='500px'
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <SaveButton key="define" handleSave={this.handleCreate} className='fa fa-check' />,
                    ]}
                >
                    物料点：<Select id="material" onChange={this.materialChange} value={this.state.materialCode} style={{width:"85%"}} placeholder="请选择物料点">
                        {
                            this.state.materialPonit.map((item)=>{
                                return(
                                    <Select.Option key={item.code} value={item.code}>{item.materialName}</Select.Option>
                                )
                            })
                        }
                    </Select>
                    <br /><br />
                    plc地址：<Select id="plcAddress" onChange={this.plcChange} value={this.state.plcCode} style={{width:"84%"}} placeholder="请选择plc地址">
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
