import React from "react";
import { Modal,Select, Input,message,Checkbox } from 'antd';
import axios from 'axios';
import CancleButton from "../../../BlockQuote/cancleButton";
import NewButton from "../../../BlockQuote/newButton";

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
            metal:[],
            valueType:undefined
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
            if(res['amm']===1){
                metal.push("氨")
            }
            if(res['alk']===1){
                metal.push("碱")
            }
            this.setState({
                visible:true,
                name:res.materialName,
                types:res.types,
                dataTypes:res.dataType,
                process:res.processCode,
                metal:metal,
                valueType:res.valueType
            })
        })
        axios({
            url:`${this.url.precursorMaterialDetails.getProcess}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{types:this.props.types}
        }).then((data)=>{
            const res = data.data.data;
            this.setState({
                processData:res
            })
        })
    };
    handleCancel = () =>{
        let {types}=this.state
        this.setState({
            visible:false,
            name:null,
            dataTypes:undefined,
            types:undefined,
            process:undefined,
            processData:[],
            metal:types===1?['氨','碱']:["Mn","Co","Ni"]
        })
    }
    handleCreate = () =>{
        let {dataTypes,name,process,types,valueType,metal}=this.state
        var data = {
            code:this.props.code,dataType:this.state.dataTypes,materialName:this.state.name,processCode:this.state.process,types:this.state.types,valueType:valueType,
            mn:this.state.metal.includes("Mn")?1:0,co:this.state.metal.includes("Co")?1:0,ni:this.state.metal.includes("Ni")?1:0,
            alkaliFlag:types===1&&metal.includes('碱')?1: 0,//碱
            ammoniaFlag: types===1&&metal.includes('氨')?1: 0,//氨
        };
        if((dataTypes!==0&&dataTypes!==1)||!name||!process||(types!==0&&types!==1)||(valueType!==0&&valueType!==1)||metal.length===0){
            message.error('信息填写不完整!')
            return
        }
        axios({
            url:`${this.url.precursorMaterialDetails.update}`,
            method:"put",
            headers:{
                'Authorization':this.url.Authorization
            },
            data:data
        }).then((data)=>{
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
        if(value===1){
            this.setState({
                metal:['氨','碱']
            })
        }
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
                processData:res,
                process:undefined
            })
        })
        this.setState({
            types:value
        })
    }
    processChange = (value) =>{
        this.setState({
            process:value
        })
    }
    checkChange = (value)=>{
        this.setState({
            metal:value
        })
    };
    valueChange = (value)=>{
        this.setState({
            valueType:value
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        let {updateFlag}=this.props
        const plainOptions =this.state.types===1? [{
            label:"氨",value:"氨"
        },{
            label:"碱",value:"碱"
        }]:[{
            label:"Ni",value:"Ni"
        },{
            label:"Co",value:"Co"
        },{
            label:"Mn",value:"Mn"
        }];
        return(
            <span>
                <span className={updateFlag?'blue':'hide'} onClick={this.showModal}>编辑</span>
                <Modal
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    title="编辑"
                    width='400px'
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <NewButton key="define" handleClick={this.handleCreate} className='fa fa-check' name='确定'/>,
                    ]}
                >
                    <span className='tank-add-span'>物料名称：</span><Input id="name" style={{width:"250px"}} onChange={this.onChange} value={this.state.name} placeholder="请输入物料点名称"/>
                    <br />
                    <br />
                    <span className='tank-add-span'>数据类型：</span><Select className="selectType" value={this.state.dataTypes} onChange={this.handleChange} placeholder="请选择数据类型" style={{width:"250px"}}>
                        <Select.Option value={1}>输入</Select.Option>
                        <Select.Option value={0}>读取</Select.Option>
                    </Select>
                    <br />
                    <br />
                    <span className='tank-add-span'>所属类别：</span><Select className="selectType" value={this.state.types} onChange={this.typesChange} placeholder="请选择所属类别" style={{width:"250px"}}>
                        <Select.Option value={0}>主材</Select.Option>
                        <Select.Option value={1}>辅材</Select.Option>
                    </Select>
                    <br />
                    <br />
                    <span className='tank-add-span'>所属工序：</span><Select className="selectType" value={this.state.process} onChange={this.processChange} placeholder="请选择所属工序" style={{width:"250px"}}>
                        {this.state.processData.map((item)=>{
                            return <Select.Option key={item.code} value={item.code}>{item.processName}</Select.Option>
                        })}
                    </Select>
                    <br /><br />
                    <span className='tank-add-span'>所含金属：</span><Checkbox.Group options={plainOptions} value={this.state.metal} onChange = {this.checkChange}></Checkbox.Group>
                    <br /><br />
                    <div><span className='tank-add-span'>数据类型：</span><Select className="selectType" value={this.state.valueType} onChange={this.valueChange} placeholder="请选择数据类型" style={{width:"250px"}}>
                        <Select.Option value={0}>体积</Select.Option>
                        <Select.Option value={1}>重量</Select.Option>
                    </Select>
                    </div>
                </Modal>
            </span>
        )
    }
}

export default AddModal
