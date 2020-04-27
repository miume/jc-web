import React from "react";
import {Modal,Select, Input,message,Checkbox } from 'antd';
import axios from 'axios';
import AddButton from '../../../BlockQuote/newButton';
import CancleButton from "../../../BlockQuote/cancleButton";
import NewButton from "../../../BlockQuote/newButton";
import '../tankValue/tank.css'
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
            metal:["Mn","Co","Ni"], //默认全都勾选
            valueType:undefined,
        }
    }
    showModal = () => {
        this.setState({ visible: true });
    };
      
    handleCancel = () =>{
        this.setState({
            visible:false,
            name:null,
            dataTypes:undefined,
            types:undefined,
            process:undefined,
            processData:[],
            metal:["Mn","Co","Ni"],
            valueType:undefined,
        })
    }
    handleCreate = () =>{
        let {dataTypes,name,process,types,valueType,metal}=this.state
        var data = {
            dataType:dataTypes,materialName:name,processCode:process,types:types,valueType:valueType,
            mn:this.state.metal.includes("Mn")?1:null,co:this.state.metal.includes("Co")?1:null,ni:this.state.metal.includes("Ni")?1:null,
            alkaliFlag:types===1&&metal.includes('碱')?1: 0,//碱
            ammoniaFlag: types===1&&metal.includes('氨')?1: 0,//氨
        };
        if((dataTypes===undefined)||!name||!process||(types===undefined)||(valueType===undefined)||metal.length===0){
            message.error('信息填写不完整!')
            return
        }
        axios({
            url:`${this.url.precursorMaterialDetails.add}`,
            method:"post",
            headers:{
                'Authorization':this.url.Authorization
            },
            data:data
        }).then((data)=>{
           if(data.data.code===0){
            message.info("新增成功");
            this.props.fetch();
           }
           else{
               message.error(data.data.message)
           }
            this.setState({
                visible:false,
                name:null,
                dataTypes:undefined,
                types:undefined,
                process:undefined,
                processData:[],
                metal:["Mn","Co","Ni"],
                valueType:undefined,
            })
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
                processData:res
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
    /**数据类型改变*/
    valueChange = (value)=>{
        this.setState({
            valueType:value
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        let {addFlag}=this.props
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
                <span className={addFlag?'':'hide'}>
                    <AddButton handleClick={this.showModal} name='新增' className='fa fa-plus' />
                </span>
                <Modal
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    title="新增"
                    width='400px'
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <NewButton key="define" handleClick={this.handleCreate} className='fa fa-check' name='确定'/>,
                    ]}
                >
                    <span className='tank-add-span'>物料点名称 :</span><Input id="name" style={{width:"250px"}} onChange={this.onChange} value={this.state.name} placeholder="请输入物料点名称"/>
                    <br />
                    <br />
                    <span className='tank-add-span'> 数据类型 :</span><Select className="selectType" value={this.state.dataTypes} onChange={this.handleChange} placeholder="请选择数据类型" style={{width:"250px"}}>
                        <Select.Option value={1}>手工输入数据</Select.Option>
                        <Select.Option value={0}>读取数据</Select.Option>
                    </Select>
                    <br />
                    <br />
                    <span className='tank-add-span'>所属类别 :</span><Select className="selectType" value={this.state.types} onChange={this.typesChange} placeholder="请选择所属类别" style={{width:"250px"}}>
                        <Select.Option value={0}>主材</Select.Option>
                        <Select.Option value={1}>辅材</Select.Option>
                    </Select>
                    <br />
                    <br />
                    <span className='tank-add-span'>所属工序 :</span><Select className="selectType" value={this.state.process} onChange={this.processChange} placeholder={this.state.types!==0&&this.state.types!==1?'请先选择所属类别':"请选择所属工序"} style={{width:"250px"}}>
                        { 
                            this.state.processData?this.state.processData.map((item)=>{
                            return <Select.Option key={item.code} value={item.code}>{item.processName}</Select.Option>
                        }):null}
                    </Select>
                    <br /><br />
                    <span className='tank-add-span'>所含元素 :</span><Checkbox.Group options={plainOptions} value={this.state.metal} onChange = {this.checkChange}></Checkbox.Group>
                    <br /><br />
                    <span className='tank-add-span'>数据类型 :</span><Select className="selectType" value={this.state.valueType} onChange={this.valueChange} placeholder="请选择数据类型" style={{width:"250px"}}>
                        <Select.Option value={0}>体积</Select.Option>
                        <Select.Option value={1}>重量</Select.Option>
                    </Select>
                </Modal>
            </span>
        )
    }
}

export default AddModal
