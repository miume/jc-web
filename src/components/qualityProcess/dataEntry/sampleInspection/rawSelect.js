import React from "react";
import {Modal, Button, Select, Table, Radio, Input, Icon,message} from "antd";
import axios from "axios";
import CancleButton from "../../../BlockQuote/cancleButton";
import AddButton from '../../../BlockQuote/newButton';
import DeleteAddTable from "./deleteAddTable";

class RawSelect extends React.Component{
    url
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            dataSource:[],
            batchRule:"",
            inputValue: ""
        }
    }
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        align:'center',
        width: '10%',
    },{
        title: '编号',
        dataIndex: 'number',
        key: 'number',
        align:'center',
        width: '70%'
    },{
        title: '主检记录',
        dataIndex: 'flag',
        key: 'flag',
        align:'center',
        width: '10%',
        render:(flag,record)=>{
            return <Radio onChange={this.flagChange} id={record.index} checked={flag} className="defaultRadio" />
        }
    },{
        title:'操作',
        key:'index',
        dataIndex:'index',
        width: '10%',
        render:((text,record) => {
            return (
                <DeleteAddTable record={record} deleteTableData={this.deleteTableData}/>
            )
        })
    }]

    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        return(
            <div style={{zIndex:"999"}}>
                <Button onClick={this.batchClick} style={{width:"100%"}}>{this.props.batchRule==""?"多批送检":this.props.batchRule}</Button>
                <Modal
                    visible={this.state.visible}
                    closable={false}
                    title="多批送检"
                    width="800px"
                    footer={[
                        <CancleButton key='back' handleCancel={this.onCancel}/>,
                        <AddButton key="submit" handleClick={this.onCenter} name='确定' className='fa fa-check' />
                    ]}
                >
                    <div className="rawSelectTop">
                        <Input  placeholder="请输入编号" onChange={this.getNumber} value={this.state.inputValue}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button onClick={this.selButton} style={{width:"15%"}}>确认</Button>
                    </div>
                    <div className="rawSelectTable">
                        <Table
                            columns={this.columns}
                            dataSource={this.state.dataSource}
                            size="small"
                            bordered
                            rowKey={record => record.index}
                            // onChange={this.handleTableChange}
                            scroll={{ y: 400 }}
                            pagination={false}
                        />
                    </div>
                </Modal>
            </div>
        )
    }

    deleteTableData = (index) => {
        var dataSource = this.state.dataSource;
        dataSource.splice(index-1,1)
        for (var i = 0; i < dataSource.length; i++) {
            dataSource[i].index = i+1
        }
        this.setState({
            dataSource:dataSource
        })
    }
    getNumber = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }
    selButton = () => {
        const inputValue = this.state.inputValue;
        var dataSource = this.state.dataSource;
        const len = this.state.dataSource.length;
        for (let i = 0; i < len; i++) {
            if(dataSource[i].number === inputValue){
                message.info("列表中已存在相同的编号")
                return
            }
        }
        dataSource.push({
            index: len+1,
            number: inputValue,
            flag: false
        })
        this.setState({
            dataSource: dataSource,
            inputValue: ""
        })
    }


    flagChange = (e)=>{
        this.getRadio(e.target.id,e.target.checked);
    }
    getRadio = (index) => {
        var dataSource = this.state.dataSource;
        for (let i = 0; i < dataSource.length; i++) {
            if (i === index-1) {
                dataSource[i].flag = true;
            } else {
                dataSource[i].flag = false;
            }
        }
        this.setState({
            dataSource: dataSource,
        })
    }



    batchClick = ()=>{
        this.setState({
            visible:true
        })
    }

    onCancel = ()=>{
        this.setState({
            visible:false,
            dataSource:[],
            inputValue:""
        })
    }
    onCenter = ()=>{

        this.props.onBatchCenter(this.state.dataSource)
        this.setState({
            visible:false,
            inputValue:""
        })
    }

}

export default RawSelect
