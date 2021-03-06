import React from "react";
import {Modal, Input,message,Select,Checkbox } from 'antd';
import axios from 'axios';
import CancleButton from "../../../BlockQuote/cancleButton";
import NewButton from "../../../BlockQuote/newButton";
import '../tankValue/tank.css'
const {Option}=Select
class AddModal extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            dataType:undefined,//物料来源,0:默认，仓库领料，1：补料
            materialName:undefined,//原材料名称
            materialPhase:undefined,//物相 0：默认，溶液，1：晶体
            materialTypeData:[],
            materialType:undefined,//材料类别
            pickingType:undefined,//领料方式 0：默认，手工领料，1：AGV叫料
            metal:[],//所含金属
            method:undefined,
        }
        this.getEditData=this.getEditData.bind(this);
    }

    getEditData(){
        axios({
            url:this.url.precursorRawMaterial.getOne,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{
                id:this.props.code
            }
        }).then(data=>{
            let res=data.data.data
            if(res){
                let metal=[]
                if(res.coFlag){
                    metal.push('Co')
                }
                if(res.mnFlag){
                    metal.push('Mn')
                }
                if(res.niFlag){
                    metal.push('Ni')
                }
                this.setState({
                    dataType:res.dataType,
                    materialName:res.materialName,
                    materialPhase:res.phaseType,
                    materialType:res.typesCode,
                    pickingType:res.pickingType,
                    metal:metal
                })
            }
        })
    }
  
    showModal = () => {
        this.setState({ visible: true });
        if(this.props.editFlag){
            this.getEditData()
        }
    };
    handleCancel = () =>{
        this.setState({
            visible:false,
            materialName:undefined,
            dataType:undefined,
            materialPhase:undefined,
            materialType:undefined,
            metal:[],
            pickingType:undefined
        })
    }
    handleCreate = () =>{
        let {materialName,dataType,materialPhase,pickingType,materialType,metal}=this.state
        if(!materialName||(dataType!==0&&dataType!==1)||(materialPhase!==0&&materialPhase!==1)||(pickingType!==0&&pickingType!==1)||(!materialType)||metal.length===0){
            message.error('信息填写不完整!')
            return
        }
        let data={
            coFlag:metal.includes('Co')?1:0,
            code: this.props.editFlag?this.props.code:'',
            dataType: dataType,
            materialName: materialName,
            mnFlag: metal.includes('Mn')?1:0,
            niFlag: metal.includes('Ni')?1:0,
            phaseType: materialPhase,
            pickingType: pickingType,
            typesCode: materialType
          }
          axios({
            url:this.props.editFlag?this.url.precursorRawMaterial.update:this.url.precursorRawMaterial.add,
            method:this.props.editFlag?"put":"post",
            headers:{
                'Authorization':this.url.Authorization,
            },
            data:data
        }).then(data=>{
            if(data.data.code===0){
                message.info('操作成功!')
                this.props.fetch()
            }
            else{
                message.error(data.data.message)
            }
        }).catch(error=>{
            message.error('操作失败，请联系管理员!')
        })
        this.setState({
            visible:false,
            materialName:undefined,
            materialPhase:undefined,
            materialType:undefined,
            metal:[],
            pickingType:undefined,
            dataType:undefined
        })
    }
    change = (data)=>{
        axios({
            url:this.url.precursorMaterialType.getRecordsByTypes,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization,
            },
            params:{
                dataType:data
            }
        }).then(data=>{
            let res=data.data.data
            if(res){
                this.setState({
                    materialTypeData:res
                })
            }
        })
        this.setState({
            dataType:data
        })
    }
    PhaChange = (data)=>{
        this.setState({
            materialPhase:data
        })
    }
    typeChange=(data)=>{
        let {dataType}=this.state
        
        this.setState({
            materialType:data
        })
    }
    metChange=(data)=>{
        this.setState({
            pickingType:data
        })
    }
    nameChange=(data)=>{
        this.setState({
            materialName:data.target.value
        })
    }
    onChange = (data)=>{//所含金属
        this.setState({
            metal:data
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        let {addFlag,updateFlag}=this.props
        const options = [
            { label: 'Ni', value: 'Ni' },
            { label: 'Co', value: 'Co' },
            { label: 'Mn', value: 'Mn' },
          ];
        return(
            <span>
                {this.props.editflag?<span className={updateFlag?'blue':'hide'} onClick={this.showModal}>编辑</span>
                :<span className={addFlag?'':'hide'}>
                    <NewButton name='新增' className='fa fa-plus' handleClick={this.showModal}/>
                </span>}
                <Modal
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    title={this.props.editFlag?"编辑":"新增"}
                    width='400px'
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <NewButton key="define" handleClick={this.handleCreate} className='fa fa-check' name='确定'/>
                    ]}
                >
                   <span className='tank-add-span'>原材料名称：</span>
                   <Input value={this.state.materialName} onChange={this.nameChange} placeholder="请输入原材料名称" style={{width:"250px"}}/>
                    <br /><br />
                    <span className='tank-add-span'>物料来源：</span>
                    <Select onChange={this.change} value={this.state.dataType} placeholder="请选择物料来源" style={{width:"250px"}}>
                        <Select.Option value={0}>仓库领料</Select.Option>
                        <Select.Option value={1}>补料</Select.Option>
                    </Select>
                    <br /><br />
                    <span className='tank-add-span'>材料物相：</span>
                    <Select onChange={this.PhaChange} value={this.state.materialPhase} placeholder="请选择材料物相" style={{width:"250px"}}>
                        <Select.Option value={0}>溶液</Select.Option>
                        <Select.Option value={1}>晶体</Select.Option>
                    </Select>
                    <br /><br />
                    <span className='tank-add-span'>材料类别：</span><Select onChange={this.typeChange} value={this.state.materialType} placeholder="请选择材料类别" style={{width:"250px"}}>
                        {
                            this.state.materialTypeData?this.state.materialTypeData.map((data)=>{
                                return(
                                    <Option key={data.code} value={data.code}>{data.materialTypeName}</Option>
                                )
                            }):null
                        }
                    </Select>
                    <br /><br />
                    <span className='tank-add-span'>所含金属：</span><Checkbox.Group options={options} onChange={this.onChange} value={this.state.metal} style={{width:'250px'}}></Checkbox.Group>
                    <br /><br />
                    <span className='tank-add-span'>领料方式: </span>
                    <Select onChange={this.metChange} value={this.state.pickingType} placeholder="请选择领料方式" style={{width:"250px"}}>
                        <Select.Option value={0}>手工领料</Select.Option>
                        <Select.Option value={1}>VGA叫点</Select.Option>
                    </Select>
                </Modal>
            </span>
        )
    }
}

export default AddModal