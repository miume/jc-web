import React from "react";
import {Modal,Select,message } from 'antd';
import axios from 'axios';
import AddButton from '../../../BlockQuote/newButton';
import CancleButton from "../../../BlockQuote/cancleButton";
import NewButton from "../../../BlockQuote/newButton";
import Tr from "./tr";

class AddModal extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state={
            visible:false,
            types:undefined,
            processName:undefined,
            processData:[],
            materialName:undefined,
            materialData:[],
            productLine:[],
            detail:{},
        }
    }
    showModal = () => {
        axios({
            url:`${this.url.precursorProductionLine.all}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization,
            },
        }).then((data)=>{
            const res = data.data.data;
            // console.log(res);
            var detail = {}
            for(var i=0;i<res.length;i++){
                detail[res[i].code] = {};
                detail[res[i].code]["checkbox"] = false
            }
            this.setState({
                productLine:res,
                detail:detail,
                visible: true
            });
        })
    };
    handleCancel = () =>{
        this.setState({
            visible:false,
            types:undefined,
            processName:undefined,
            processData:[],
            materialName:undefined,
            materialData:[],
            productLine:[],
            detail:{},
        })
    }
    handleCreate = () =>{//新增确定
        let {materialName,processName,types,detail}=this.state
        if(materialName===''||processName===''||types===''){
            message.info('信息填写不完整!')
            return
        }
        var data = {materialCode:materialName,processCode:processName,types:types,weightDTOS:[]};
        let count = 0;
        let weightValue = [];
        for(let key in detail){
            if(detail[key].checkbox == true){
                let item = {};
                item["lineCode"] = key;
                item["weightValue"] = detail[key].value;
                weightValue.push(item);
                count+=parseFloat(detail[key].value);
            };
        };
        if(count!=1){
            message.error("所选项权值相加应等于1");
        }
        if(count===0){
            message.info('信息填写不完整!')
            return
        }
        data.weightDTOS = weightValue;
        axios({
            url:`${this.url.precursorMaterialLineWeight.add}`,
            method:"post",
            headers:{
                'Authorization':this.url.Authorization,
            },
            data:data
        }).then((data)=>{
            if(data.data.code!=0){
                message.error(data.data.message);
                return
            }
            message.info("新增成功!");
            this.props.fetch();
            this.handleCancel()
        }).catch((error)=>{
            message.error('新增失败，请联系管理员!')
        })
    }
    handleChange=(e)=>{
        axios({
            url:`${this.url.precursorMaterialDetails.getProcess}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization,
            },
            params:{types:e}
        }).then((data)=>{
            const res = data.data.data;
            this.setState({
                processData:res,
                processName:'',
                materialName:'',
                materialData:[],
            })
        })
        this.setState({
            types:e
        })
    }
    getData = (data)=>{
        let detail = this.state.detail;
        detail[data.target.value]["checkbox"] = data.target.checked;
        this.setState({
            detail:detail
        })
    }
    getValue = (data)=>{
        let detail = this.state.detail;
        detail[data.target.name]["value"] = data.target.value;
        this.setState({
            detail:detail
        })
    }
    processSelect=(e)=>{
        axios({
            url:`${this.url.precursorMaterialLineWeight.getMaterialName}`,
            method:"post",
            headers:{
                'Authorization':this.url.Authorization,
            },
            params:{types:this.state.types,processCode:e}
        }).then((data)=>{
            const res = data.data.data;
            this.setState({
                materialData:res,
                materialName:'',
            })
        })
        this.setState({
            processName:e
        })
    }

    materialSelect=(e)=>{
        this.setState({
            materialName:e
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
                    width='800px'
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <NewButton key="define" handleClick={this.handleCreate} className='fa fa-check' name='确定'/>,
                    ]}
                >
                    <div>
                    所属类别：<Select onChange={this.handleChange} value={this.state.types} style={{ width:"20%"}} placeholder="请选择类别">
                        <Select.Option value={0}>主材</Select.Option>
                        <Select.Option value={1}>辅材</Select.Option>
                    </Select>&nbsp;&nbsp;
                    工序名称：<Select onChange={this.processSelect} value={this.state.processName} style={{ width:"20%"}} placeholder="请选择工序">
                        {
                            this.state.processData.map((item)=>{
                                return (
                                    <Select.Option value={item.code} key={item.code}>{item.processName}</Select.Option>
                                )
                            })
                        }
                    </Select>&nbsp;&nbsp;
                    物料点名称：<Select onChange={this.materialSelect} value={this.state.materialName} style={{ width:"20%"}} placeholder="请选择物料点">
                        {
                            this.state.materialData.map((item)=>{
                                return(
                                    <Select.Option value={item.code} key={item.code}>{item.materialName}</Select.Option>
                                )
                            })
                        }
                    </Select>
                    </div>
                    <table className="productLine">
                        <thead className="productHead">
                            <tr>
                                <th>产线名称</th>
                                <th>是否所属</th>
                                <th>权值</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.productLine.length!==0?this.state.productLine.map((value,item)=>{
                                    return(
                                        <Tr getValue={this.getValue} getData={this.getData} value={value} key={item}/>
                                    )
                                }):null
                            }
                        </tbody>
                    </table>
                </Modal>
            </span>
        )
    }
}

export default AddModal
