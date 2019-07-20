import React from 'react';
import axios from 'axios';
import {Modal,message,Select,Input,Row,Col,Icon} from 'antd';
import Submit from '../BlockQuote/checkSubmit';
import NewButton from '../BlockQuote/newButton';
import SaveButton from '../BlockQuote/saveButton';
import CancleButton from '../BlockQuote/cancleButton';
import "./eqMaintenanceDataEntry.css"
const Option = Select.Option;
class Mmodal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            deviceName:'',
            maintenanceItems: '',
            maintenanceContent: '',
            optType: '',
            maintenanceFrequency: ''
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
        console.log(this.props.deviceName)
        console.log(this.state.maintenanceItems)
        console.log(this.state.maintenanceContent)
        console.log(this.state.optType)
        console.log(this.state.maintenanceFrequency)
        this.setState({visible:false})
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
    onInputChange=(e)=>{
        let InputName=e.target.name;
        let InputValue=e.target.value;
        this.setState({
            [InputName] : InputValue,
        })
    }
    // handleChangeproject=() =>{
    //     this.setState({Data:[{
    //         maintainceproject:
    //         }]})
    // }
    render() {
        return (
            <span>
            <span className='blue' onClick={this.handleAdd}><Icon type="edit" />编辑</span>
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
                            <Select Value={this.props.clickdeviceName} defaultValue={this.props.clickdeviceName}  style={{width:"315px"}} dropdownMatchSelectWidth='false'  disabled="true">
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
                                <Option value="勾选">勾选</Option>
                                <Option value="录入">录入</Option>
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
export default Mmodal
