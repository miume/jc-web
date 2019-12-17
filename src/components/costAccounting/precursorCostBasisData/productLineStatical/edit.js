import React from "react";
import {Modal,Select,message } from 'antd';
import axios from 'axios';
import CancleButton from "../../../BlockQuote/cancleButton";
import NewButton from "../../../BlockQuote/newButton";
import ProTable from "./detailTr";

class Edit extends React.Component{
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
            weightValue:[]
        }
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
            weightValue:[]
        })
    };
    handleCreate = () =>{
        var data = {code:this.props.code,materialCode:this.state.materialName,processCode:this.state.processName,types:this.state.types,weightDTOS:[]};
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
        axios({
            url:`${this.url.precursorMaterialLineWeight.update}`,
            method:"put",
            headers:{
                'Authorization':this.url.Authorization,
            },
            data:data
        }).then((data)=>{
            if(data.data.code!=0){
                message.error(data.data.message);
                return
            }
            message.info("编辑成功");
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
    };
    materialSelect=(e)=>{
        this.setState({
            materialName:e
        })
    };
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
    };
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
    };
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
    showModal = () => {
        var detail = {};
        axios({
            url:`${this.url.precursorProductionLine.all}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization,
            },
        }).then((data)=>{
            const res = data.data.data;
            for(var i=0;i<res.length;i++){
                detail[res[i].code] = {};
                detail[res[i].code]["checkbox"] = false
            }
            this.setState({
                productLine:res,
                // detail:detail,
                visible: true
            });
        })
        axios({
            url:`${this.url.precursorMaterialLineWeight.getRecordById}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization,
            },
            params:{id:this.props.code}
        }).then((data)=>{
            const res = data.data.data;
            for(var i in res.weightDTOS){
                detail[res.weightDTOS[i].lineCode]["value"] = res.weightDTOS[i].weightValue
                detail[res.weightDTOS[i].lineCode]["checkbox"] = true
            }
            axios({
                url:`${this.url.precursorMaterialDetails.getProcess}`,
                method:"get",
                headers:{
                    'Authorization':this.url.Authorization,
                },
                params:{types:res.types}
            }).then((data)=>{
                const res = data.data.data;
                this.setState({
                    processData:res,
                    detail:detail
                })
            })
            axios({
                url:`${this.url.precursorMaterialLineWeight.getMaterialName}`,
                method:"post",
                headers:{
                    'Authorization':this.url.Authorization,
                },
                params:{types:res.types,processCode:res.processCode}
            }).then((data)=>{
                const res = data.data.data;
                this.setState({
                    materialData:res,
                })
            })
            this.setState({
                types:res.types,
                materialName:res.materialCode,
                processName:res.processCode,
                weightValue:res.weightDTOS
            })
        })
    };
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
                            this.state.materialData?this.state.materialData.map((item)=>{
                                return(
                                    <Select.Option value={item.code} key={item.code}>{item.materialName}</Select.Option>
                                )
                            }):null
                        }
                    </Select>
                    </div>
                    {/* <ProTable productLine={this.state.productLine} weightValue={this.state.weightValue}/> */}
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
                                    var flag = null;
                                    var WeiValue = null;
                                    for(var i in this.state.weightValue){
                                        if(this.state.weightValue[i].lineCode == value.code){
                                            flag = "checked";
                                            WeiValue = this.state.weightValue[i].weightValue
                                        }
                                    }
                                    return(
                                        <ProTable getValue={this.getValue} getData={this.getData} weightValue={this.state.weightValue} flag={flag} WeiValue={WeiValue} value={value} key={item}/>
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

export default Edit
