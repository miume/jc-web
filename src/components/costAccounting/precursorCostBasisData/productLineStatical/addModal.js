import React from "react";
import { Button, Modal,Select,Form, Input,message,Icon } from 'antd';
import axios from 'axios';
import AddButton from '../../../BlockQuote/newButton';
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";
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
            // flag:(function(){return 1})()
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
    handleCreate = () =>{
        var data = {materialCode:this.state.materialName,processCode:this.state.processName,types:this.state.types,weightDTOS:[]};
        const detail = this.state.detail;
        var count = 0;
        var weightValue = [];
        for(var key in detail){
            if(detail[key].checkbox == true){
                var item = {};
                item["lineCode"] = key;
                item["weightValue"] = detail[key].value;
                weightValue.push(item);
                count+=parseFloat(detail[key].value);
            };
        };
        if(count!=1){
            message.error("所选项权值相加应等于1");
        }
        data.weightDTOS = weightValue;
        // console.log(data);
        axios({
            url:`${this.url.precursorMaterialLineWeight.add}`,
            method:"post",
            headers:{
                'Authorization':this.url.Authorization,
            },
            data:data
        }).then((data)=>{
            // console.log(data);
            if(data.data.code!=0){
                message.error(data.data.message);
                return
            }
            message.info("新增成功");
            this.props.fetch();
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
        }).catch((error)=>{
            message.error(error.data)
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
                processName:undefined,
                materialName:undefined,
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
                materialName:undefined,
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
        // console.log(this.state.flag)
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
                        <SaveButton key="define" handleSave={this.handleCreate} className='fa fa-check' />,
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