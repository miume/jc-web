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
        }
        this.handleAdd = this.handleAdd.bind(this)
        this.onCanCel = this.onCanCel.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.onInputChange=this.onInputChange.bind(this)
        this.handleChange2=this.handleChange2.bind(this)
        this.setnull = this.setnull.bind(this)
    }
    componentDidMount() {
        this.setState({deviceName:this.props.clickdeviceName})
    }

    handleAdd = () => {
        this.setState({visible: true})
    }
    handleSave = () => {
        this.setState({
            visible:false,
        })
        console.log(this.state.deviceName)
        console.log(this.state.maintenanceItems)
        console.log(this.state.maintenanceContent)
        console.log(this.state.optType)
        console.log(this.state.maintenanceFrequency)
        console.log(this.props.clickdeviceName)


    var addData = {
        deviceName: this.state.deviceName,
        maintenanceContent: this.state.maintenanceContent,
        maintenanceFrequency: this.state.maintenanceFrequency,
        maintenanceItems: this.state.maintenanceItems,
        optType: this.state.optType,
    }
        console.log(addData)
        if(addData.deviceName&&addData.maintenanceContent&&addData.maintenanceItems){
        axios({
            url: `${this.props.url.eqMaintenanceDataEntry.addOne}`,
            method: 'post',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            data: addData,
            type: 'json'
        }).then((data) => {
            // this.props.fetch()
            this.props.ffetch(this.props.clickdeviceName)
            message.info(data.data.message);
            this.setState({
                deviceName:'',
                maintenanceItems: '',
                maintenanceContent: '',
                optType: 0,
                maintenanceFrequency: '',
            })
        }).catch(()=>{
            message.info('新增失败，请联系管理员！')
        });}
        else{
            message.info('不能有空项出现')
        }
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
            [InputName] : InputValue,})
    }

    setnull=(e)=>{
        e.target.value=null;
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
                            <Select style={{width:"315px"}} dropdownMatchSelectWidth='false' onChange={this.handleChange2}  >
                                {
                                    this.props.deviceDatas.map(e => {
                                        return (<option value={e.deviceName}> {e.deviceName}</option>)
                                    })
                                }
                            </Select>
                        </Col>

                        <Col span={1.5} style={{paddingTop:"5px"}}>
                            保养项目:
                        </Col>
                        <Col span={10}>
                            <Input size="small" placeholder="请输入保养项目"   style={{width:"313px"}}key='2'
                                     name="maintenanceItems" onChange={this.onInputChange}  value={this.state.maintenanceItems}/>
                        </Col>
                    </Row>


                    <Row type="flex" justify="start" style={{paddingTop:"15px"}}>
                        <Col span={1.5} style={{paddingTop:"5px"}}>
                            保养内容:
                        </Col>
                        <Col span={10} style={{paddingRight:"20px"}} >
                            <Input size="small" placeholder="请输入保养内容"  key='3' name="maintenanceContent" onChange={this.onInputChange} value={this.state.maintenanceContent}/>
                        </Col>

                        <Col span={1.5} style={{paddingTop:"5px"}}>
                            操作类型:
                        </Col>
                        <Col span={10}>
                            <Select   defaultValue="勾选" onChange={this.handleChange} name="optType" style={{ width:"313px"}}>
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
                            <Input size="small" placeholder="请输入保养内容"  key='4' name="maintenanceFrequency"onChange={this.onInputChange} value={this.state.maintenanceFrequency}/>
                        </Col>
                    </Row>
                </div>
            </Modal>
            </span>)
    }
}
export default Add
