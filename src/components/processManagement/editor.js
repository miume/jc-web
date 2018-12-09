import React from 'react';
import {Modal,Button,Input} from 'antd';
import AddButton from '../BlockQuote/newButton'
import CancleButton from "../BlockQuote/cancleButton";
import SaveButton from "../BlockQuote/saveButton";
import axios from "axios"
import WhiteSpace from '../BlockQuote/whiteSpace';

class Editor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible : false,
            count : 1,
            dataSource:[],
            data:[1],
            id:this.props.value,
            name:''        
        }
        this.Authorization = localStorage.getItem("Authorization")
        this.server = localStorage.getItem('remote');
        this.handleDetail = this.handleDetail.bind(this)
        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.addData = this.addData.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
    }
    /**处理一条编辑记录 */
    handleDetail() {
        this.fetch()
        this.setState({
          visible: true
        });
    }
    handleOk() {
        this.setState({
        visible: false
        });
    }
    // defaultOption(){
    //     var osel = document.getElementById("selID");
    //     var opts = osel.getElementsByTagName("option");
        
    // }
    handleCancel() {
        this.setState({
        visible: false
        });
    }
    /**编辑中新增按钮 */
    addData() {
        const {count,data} = this.state;
        this.setState({
            count: count+1,
            data: [...data, count+1],
        })
    }
    deleteRow(value){
        const {count,data} = this.state;
        this.setState({
            count: count-1,
            data: data.filter(d => d.toString()!==value)
        })
    }
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
            this.setState({
                dataSource:res,
                name:name
            })
        })
    }
    render(){
        return(
            <span>
                <span className='blue' onClick={this.handleDetail} >编辑</span>
                <Modal title='编辑' visible={this.state.visible}
                    closable={false}
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <SaveButton key="define" handleSave={this.handleOk} style='button' className='fa fa-check' />,
                        <AddButton key="submit" handleClick={this.handleOk} name='提交' style='button' className='fa fa-check' />
                      ]}>
                      {/* 流程名称：<Input className="name" defaultValue={this.state.name} placeholder="请输入名称"/>
                      <table style={{width:'100%'}}>
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