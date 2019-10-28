import React from "react";
import {Modal,Select,message } from 'antd';
import axios from 'axios';
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";
import Tr from "./detailTr";

class Edit extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state={
            data:[],
            visible:false,
            vgaName:undefined,
            vgaData:[],
            productLine:[],
            detail:{},
            weightValue:[]
        }
    }
    showModal = () =>{
        var detail = {};
        axios({
            url:`${this.url.precursorProductionLine.all}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization,
            },
        }).then((data)=>{
            const res = data.data.data;
            // console.log(res);
            // var detail = {}
            for(var i=0;i<res.length;i++){
                detail[res[i].code] = {};
                detail[res[i].code]["checkbox"] = false
            }
            this.setState({
                productLine:res,
                // detail:detail,
                visible: true
            });
        });
        axios({
            url:`${this.url.vga.page}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization,
            },
        }).then((data)=>{
            const res = data.data.data.list;
            this.setState({
                vgaData:res
            })
        })
        axios({
            url:`${this.url.vgaMap.getInfoByVgaId}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization,
            },
            params:{vgaId:this.props.code}
        }).then((data)=>{
            const res = data.data.data;
            for(var i=0;i<res.lines.length;i++){
                detail[res.lines[i].code]["value"] = res.lines[i].value;
                detail[res.lines[i].code]["checkbox"] = true;
            }
            // console.log(detail);
            this.setState({
                detail:detail,
                vgaName:res.vgaPoint.code,
                weightValue:res.lines
            })
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
    vgaSelect=(e)=>{
        this.setState({
            vgaName:e
        })
    };
    handleCancel = () =>{
        this.setState({
            visible:false,
            vgaName:undefined,
            vgaData:[],
            productLine:[],
            detail:{},
        })
    }
    handleCreate = () =>{
        var data = [];
        var i = 0;
        for(var key in this.state.detail){
            if(this.state.detail[key].checkbox === true){
                data.push({});
                data[i].lineCode = key;
                data[i].weightValue = this.state.detail[key].value;
                data[i].vgaCode = this.state.vgaName;
                i++
            };
        };
        // console.log(data)
        var count = 0
        for(var i=0;i<data.length;i++){
            count+=parseFloat(data[i].weightValue)
        };
        // console.log(count)
        if(count != 1){
            message.error("所选项权重相加应等于1");
            return
        }
        axios({
            url:`${this.url.vgaMap.vgaMap}`,
            method:"put",
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
                vgaName:undefined,
                vgaData:[],
                productLine:[],
                detail:{},
            })
        }).catch((error)=>{
            message.error(error.data)
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        return (
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
                        <SaveButton key="define" handleSave={this.handleCreate} className='fa fa-check' />,
                    ]}
                >
                    <div>
                        VGA点名称：<Select onChange={this.vgaSelect} value={this.state.vgaName} style={{ width:"20%"}} placeholder="请选择工序">
                            {
                                this.state.vgaData.map((item)=>{
                                    return (
                                        <Select.Option value={item.code} key={item.code}>{item.vgaName}</Select.Option>
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
                                    var flag = null;
                                    var WeiValue = null;
                                    for(var i=0;i<this.state.weightValue.length;i++){
                                        if(this.state.weightValue[i].code == value.code){
                                            flag = "checked";
                                            WeiValue = this.state.weightValue[i].value
                                        }
                                    }
                                    return(
                                        <Tr weightValue={this.state.weightValue} flag={flag} WeiValue={WeiValue} getValue={this.getValue} getData={this.getData} value={value} key={item}/>
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
