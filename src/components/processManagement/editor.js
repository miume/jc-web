import React from 'react';
import {Modal,Button,message} from 'antd';
import AddButton from '../BlockQuote/newButton'
import CancleButton from "../BlockQuote/cancleButton";
import SaveButton from "../BlockQuote/saveButton";
import axios from "axios"
import WhiteSpace from '../BlockQuote/whiteSpace';
import "./difference.css"
import EditTr from "./editTr"

class Editor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible : false,
            count : 0,
            dataSource:[],
            data:[1],
            id:this.props.value,
            name:'',
            detail:[],
            batchStatus: 0  
        }
        this.Authorization = localStorage.getItem("Authorization");
        this.server = localStorage.getItem('remote');
        this.handleDetail = this.handleDetail.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.addData = this.addData.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.handleYes = this.handleYes.bind(this);
    }
    /**处理一条编辑记录 */
    handleDetail() {
        this.fetch()
        this.setState({
          visible: true
        });
    }
    handleOk() {
        const data = {}
        data["commonBatchNumber"] = {}
        data["details"] = []

        for(var i =0;i<this.state.count;i++){
            data.details.push({})
        }

        const inputName = document.getElementsByClassName("inputName")
        const selID = document.getElementsByClassName("sleID")
        for(var i=0;i<selID.length;i++){
            data.details[i]["responsibility"] = inputName[i].value
            data.details[i]["userId"] = selID[i].value
        }

        let name = document.getElementById("name").value
        let id = this.state.id
        data.commonBatchNumber["description"] = name
        data.commonBatchNumber["id"] = id
        data.commonBatchNumber["status"] = -1

        axios({
            url:`${this.server}/jc/common/batchAuditTask`,
            method:"put",
            data:data,
            type:"json",
            headers:{
                'Authorization':this.Authorization
            }
        }).then((data)=>{
            message.info(data.data.message);
            this.props.handle();
        })

        this.setState({
        visible: false
        });
    }
    handleYes() {
        const data = {}
        data["commonBatchNumber"] = {}
        data["details"] = []

        for(var i =0;i<this.state.count;i++){
            data.details.push({})
        }

        const inputName = document.getElementsByClassName("inputName")
        const selID = document.getElementsByClassName("sleID")
        for(var i=0;i<selID.length;i++){
            data.details[i]["responsibility"] = inputName[i].value
            data.details[i]["userId"] = selID[i].value
        }

        let name = document.getElementById("name").value
        let id = this.state.id
        data.commonBatchNumber["description"] = name
        data.commonBatchNumber["id"] = id
        data.commonBatchNumber["status"] = 2

        axios({
            url:`${this.server}/jc/common/batchAuditTask`,
            method:"put",
            data:data,
            type:"json",
            headers:{
                'Authorization':this.Authorization
            }
        }).then((data)=>{
            message.info(data.data.message);
            this.props.handle();
        })

        this.setState({
        visible: false
        });
    }
    handleCancel() {
        this.setState({
        visible: false
        });
    }
    deleteRow(value){
        const {count,detail} = this.state;
        console.log(detail)
        this.setState({
            count: count-1,
            detail: detail.filter(d => d.id !== value)
        })
    }
    /**通过id获取数据 */
    fetch = ()=>{
        axios({
            url:`${this.server}/jc/common/batchAuditTask/${this.state.id}`,
            method:'get',
            headers:{
                'Authorization':this.Authorization
            },
        }).then((data)=>{
            const res = data.data.data;
            const name = res.commonBatchNumber.description
            const status = res.commonBatchNumber.status
            const detail = res.details
            const count = detail?detail.length:0;
            for(var i = 0; i < count; i++){
                detail[i].id = i+1;
            }
            this.setState({
                dataSource:res,
                name:name,
                detail:detail,
                count:count,
                batchStatus:status
            })
        })
    }
    /**编辑中新增按钮 */
    addData() {
        const {count,detail} = this.state;
        detail.push({
            id:count+1,
            procedureTestRecord:{}
        })
        this.setState({
            count: count+1,
            detail: detail
        })
    }
    render(){
        return(
            <span>
                {this.props.status === -1?<span className='blue' onClick={this.handleDetail}>编辑</span>:<span>编辑</span>}
                {/* <span className='blue' onClick={this.props.status === -1?this.handleDetail:null}>编辑</span> */}
                {/* <span className='blue' onClick={this.handleDetail}>编辑</span> */}
                <Modal title='编辑' visible={this.state.visible}
                    closable={false}
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <SaveButton key="define" handleSave={this.handleOk} style='button' className='fa fa-check' />,
                        <AddButton key="submit" handleClick={this.handleYes} name='提交' style='button' className='fa fa-check' />
                      ]}>
                      流程名称：<input id="name" defaultValue={this.state.name} placeholder="请输入名称"/>
                      <WhiteSpace />
                      <div style={{height:'400px'}}>
                        <table style={{width:'100%'}}>
                            <thead className='thead'>
                                <tr>
                                    <td>负责人</td>
                                    <td>职责</td>
                                    <td>操作</td>
                                </tr>
                            </thead>
                            <tbody>
                                <EditTr dataSource={this.state.dataSource} detail = {this.state.detail} deleteRow={this.deleteRow}/>
                            </tbody>
                        </table>
                        <WhiteSpace />
                        <Button type="primary" icon="plus" size='large' style={{width:'100%',fontSize:'15px'}} onClick={this.addData}/>
                      </div>
                      {/* <table style={{width:'100%'}}>
                            <thead className='thead'>
                                <tr>
                                    <td>负责人</td>
                                    <td>职责</td>
                                    <td>操作</td>
                                </tr>
                            </thead>
                            <tbody id="data">
                            {
                            this.state.data.map((m) => { return <Tr key={m.toString()} deleteRow={this.deleteRow} value={m.toString()}></Tr> })
                            }
                            </tbody>
                        </table>
                        <WhiteSpace />
                        <Button type="primary" icon="plus" size='large' style={{width:'100%',fontSize:'15px'}} onClick={this.addData}/> */}
                </Modal>
            </span>
        );
    }
}

export default Editor