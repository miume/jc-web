import React from 'react';
import axios from 'axios';
import {Modal, message, Select, Input, Row, Col, Button} from 'antd';
import Submit from '../BlockQuote/checkSubmit';
import NewButton from '../BlockQuote/newButton';
import SaveButton from '../BlockQuote/saveButton';
import CancleButton from '../BlockQuote/cancleButton';
import "./eqMaintenanceDataEntry.css"
import Eqblock from "./eqblock";
const Option = Select.Option;
class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
                deviceName:'',
                maintenanceItems: '',
                maintenanceContent: '',
                optType: 0,
                maintenanceFrequency: '',
            newRowData:[],
        }
        this.handleAdd = this.handleAdd.bind(this)
        this.onCanCel = this.onCanCel.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.onInputChange=this.onInputChange.bind(this)
        this.handleChange2=this.handleChange2.bind(this)
    }
    handleAdd = () => {
        this.setState({visible: true})
    }
    handleSave = () => {
        console.log(this.state.deviceName)
        console.log(this.state.maintenanceItems)
        console.log(this.state.maintenanceContent)
        console.log(this.state.optType)
        console.log(this.state.maintenanceFrequency)
        this.setState({visible:false})
        var newRowData=this.state.newRowData;
        var newRowFlag = true;
        for (var i = 0; i < newRowData.length; i++) {
            var arr = newRowData[i]
            if (arr.name === '' || arr.value === '') {
                newRowFlag = false;
                break;
            }
        }
        var ooptType=0;
        if(this.state.OptType=== '0'){
            ooptType=0;
        }else{
            ooptType=1;
        }
        if(ooptType === 1)
        var addData = {
            code: 0,
            deviceName:this.state.deviceName,
            maintenanceContent:this.state.maintenanceContent,
            maintenanceFrequency:this.state.maintenanceFrequency,
            maintenanceItems: this.state.maintenanceItems,
            optType :ooptType,


    }

        axios({
            url: `${this.props.url.eqMaintenanceDataEntry.addOne}`,
            method: 'post',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            data: addData,
            type: 'json'
        }).then((data) => {
            this.props.ffech(this.props.clickdeviceName)
            message.info(data.data.message);
        })
    }
    onCanCel = () => {
        this.setState({visible: false})
    }
    handleChange=(value) => {
        this.setState({
            optType:value
        })
        console.log(`selected ${value}`);
    }
    handleChange2=(value) => {
        this.setState({
            deviceName:value
        })
        console.log(`selected ${value}`);
    }
    // handleChangeproject=() =>{
    //     this.setState({Data:[{
    //         maintainceproject:
    //         }]})
    // }
    onInputChange=(e)=>{
        let InputName=e.target.name;
        let InputValue=e.target.value;
        this.setState({
            [InputName] : InputValue,
        })
    }

    render() {
        return (
            <span>
            <NewButton handleClick={this.handleAdd} name='新增' className='fa fa-plus'/>
            <Modal
                visible={this.state.visible}
                closable={false}
                centered={true}
                onCancle={this.handleCancel}
                maskClosable={false}
                width="804px"
                title="设备保养-项目录入"
                footer={[
                    <SaveButton
                        key="save"
                        handleSave={this.handleSave }
                    />,
                   <CancleButton key='cancel' handleCancel={this.onCanCel} />,

                ]}
            >

                <div className='eqMaintenance-eqblockb'>
                    <Row type="flex" justify="start" style={{paddingTop:"15px"}} >
                        <Col span={1.5} style={{paddingTop:"5px"}}>
                            设备名称:
                        </Col>
                        <Col span={10}>
                            <Select style={{width:"315px"}} dropdownMatchSelectWidth='false' onChange={this.handleChange2}>
                                {
                                    this.props.deviceName.map(e => {
                                        return (<option value={e}> {e}</option>)
                                    })
                                }
                            </Select>
                        </Col>

                        <Col span={1.5} style={{paddingTop:"5px"}}>
                            保养项目:
                        </Col>
                        <Col span={10}>
                            <Input size="middle" placeholder="请输入保养项目"   style={{width:"313px"}}key='2'
                                     name="maintenanceItems" onChange={this.onInputChange}/>
                        </Col>
                    </Row>


                    <Row type="flex" justify="start" style={{paddingTop:"15px"}}>
                        <Col span={1.5} style={{paddingTop:"5px"}}>
                            保养内容:
                        </Col>
                        <Col span={10} style={{paddingRight:"20px"}} >
                            <Input size="middle" placeholder="请输入保养内容"  key='3' name="maintenanceContent" onChange={this.onInputChange}/>
                        </Col>

                        <Col span={1.5} style={{paddingTop:"5px"}}>
                            操作类型:
                        </Col>
                        <Col span={10}>
                            <Select   onChange={this.handleChange} name="optType" style={{ width:"313px"}}>
                                <Option value='0'>勾选</Option>
                                <Option value='1'>录入</Option>
                            </Select>
                        </Col>
                    </Row>


                    <Row type="flex" justify="start" style={{paddingTop:"15px"}}>
                        <Col span={1.5} style={{paddingTop:"5px" ,paddingRight:"5px"}}>
                            &nbsp;&nbsp;&nbsp;频率:&nbsp;&nbsp;&nbsp;
                        </Col>
                        <Col span={10} style={{paddingRight:"20px"}}>
                            <Input size="middle" placeholder="请输入保养内容"  key='4' name="maintenanceFrequency"onChange={this.onInputChange}/>
                        </Col>
                    </Row>
                </div>
            </Modal>
            </span>)
    }
}
export default Add
