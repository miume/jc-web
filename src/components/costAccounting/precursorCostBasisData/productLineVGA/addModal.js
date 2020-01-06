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
            vgaName:undefined,
            vgaData:[],
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
        if(!this.state.vgaName){
            message.info('信息不完整!')
            return
        }
        let data = [],
            i = 0,
            count=0;
        for(var key in this.state.detail){
            if(this.state.detail[key].checkbox === true){
                data.push({});
                data[i].lineCode = key;
                data[i].weightValue = this.state.detail[key].value;//是字符串类型
                count+=parseFloat(data[i].weightValue)
                data[i].vgaCode = this.state.vgaName;
                i++
            };
        };
        if(count===0){
            message.error('未分配权重!');
            return
        }
        if(count != 1){
            message.error("所选项权重相加应等于1");
            return
        }
       
        // var data = {materialCode:this.state.materialName,processCode:this.state.processName,types:this.state.types,weightDTOS:[]};
        // const detail = this.state.detail;
        // var count = 0;
        // var weightValue = [];
        // for(var key in detail){
        //     if(detail[key].checkbox == true){
        //         var item = {};
        //         item["lineCode"] = key;
        //         item["weightValue"] = detail[key].value;
        //         weightValue.push(item);
        //         count+=parseFloat(detail[key].value);
        //     };
        // };
        // if(count!=1){
        //     message.error("所选项权值相加应等于1");
        // }
        // data.weightDTOS = weightValue;
        // // console.log(data);
        axios({
            url:`${this.url.vgaMap.vgaMap}`,
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
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        let {addFlag}=this.props
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
                    width='800px'
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <NewButton key="define" handleClick={this.handleCreate} className='fa fa-check' name='确定'/>,
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
