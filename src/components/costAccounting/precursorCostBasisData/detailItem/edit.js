import React from "react";
import { Button, Modal,Select,Form, Input,message,Icon,Checkbox } from 'antd';
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
            name:null,
            dataTypes:undefined,
            types:undefined,
            process:undefined,
            processData:[],
            mn:null,
            co:null,
            ni:null,
            metal:[]
        }
    }
    showModal = () => {
        axios({
            url:`${this.url.precursorMaterialDetails.getRecordById}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{id:this.props.code}
        }).then((data)=>{
            const res = data.data.data;
            // console.log(res)
            var metal = [];
            if(res["mn"]===1){
                metal.push("Mn")
            }
            if(res["co"]===1){
                metal.push("Co")
            }
            if(res["ni"]===1){
                metal.push("Ni")
            }
            this.setState({
                visible:true,
                name:res.materialName,
                types:res.types,
                dataTypes:res.dataType,
                process:res.processCode,
                metal:metal
            })
        })
        axios({
            url:`${this.url.precursorMaterialDetails.getProcess}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{types:this.props.processCode}
        }).then((data)=>{
            const res = data.data.data;
            this.setState({
                processData:res
            })
        })
    };
    handleCancel = () =>{
        this.setState({
            visible:false,
            name:null,
            dataTypes:undefined,
            types:undefined,
            process:undefined,
            processData:[],
            metal:["Mn","Co","Ni"]
        })
    }
    handleCreate = () =>{
        var data = {
            code:this.props.code,dataType:this.state.dataTypes,materialName:this.state.name,processCode:this.state.process,types:this.state.types,
            mn:this.state.metal.includes("Mn")?1:0,co:this.state.metal.includes("Co")?1:0,ni:this.state.metal.includes("Ni")?1:0
        };
        // console.log(data)
        axios({
            url:`${this.url.precursorMaterialDetails.update}`,
            method:"put",
            headers:{
                'Authorization':this.url.Authorization
            },
            data:data
        }).then((data)=>{
            // console.log(data)
            message.info(data.data.message);
            this.props.fetch();
            this.setState({
                visible:false,
                name:null,
                dataTypes:undefined,
                types:undefined,
                process:undefined,
                processData:[],
                metal:["Mn","Co","Ni"]
            })
        }).catch((error)=>{
            message.info(error.data)
        })
    }
    onChange = (data)=>{
        this.setState({
            name:data.target.value,
        })
    }
    handleChange = (value)=>{
        this.setState({
            dataTypes:value
        })
    }
    typesChange = (value) =>{
        axios({
            url:`${this.url.precursorMaterialDetails.getProcess}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{types:value}
        }).then((data)=>{
            const res = data.data.data;
            this.setState({
                processData:res
            })
        })
        this.setState({
            types:value
        })
    }
    processChange = (value) =>{
        // console.log(value)
        this.setState({
            process:value
        })
    }
    checkChange = (value)=>{
        // console.log(value)
        this.setState({
            metal:value
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const plainOptions = [{
            label:"Ni",value:"Ni"
        },{
            label:"Co",value:"Co"
        },{
            label:"Mn",value:"Mn"
        }];
        // const defaultCheckList = ["Ni","Co","Mn"]
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
                    <Input id="name" onChange={this.onChange} value={this.state.name} placeholder="请输入物料点名称"/>
                    <br />
                    <br />
                    <Select className="selectType" value={this.state.dataTypes} onChange={this.handleChange} placeholder="请选择数据类型" style={{width:"100%"}}>
                        <Select.Option value={1}>输入</Select.Option>
                        <Select.Option value={0}>读取</Select.Option>
                    </Select>
                    <br />
                    <br />
                    <Select className="selectType" value={this.state.types} onChange={this.typesChange} placeholder="请选择所属类别" style={{width:"100%"}}>
                        <Select.Option value={0}>主材</Select.Option>
                        <Select.Option value={1}>辅材</Select.Option>
                    </Select>
                    <br />
                    <br />
                    <Select className="selectType" value={this.state.process} onChange={this.processChange} placeholder="请选择所属工序" style={{width:"100%"}}>
                        {this.state.processData.map((item)=>{
                            return <Select.Option key={item.code} value={item.code}>{item.processName}</Select.Option>
                        })}
                    </Select>
                    <br /><br />
                    所含金属：<Checkbox.Group options={plainOptions} value={this.state.metal} onChange = {this.checkChange}></Checkbox.Group>
                </Modal>
            </span>
        )
    }
}

export default AddModal