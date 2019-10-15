import React from 'react';
import axios from 'axios';
import {Col, Input, message, Modal, Row, Select} from 'antd';
import NewButton from '../../../BlockQuote/newButton';
import SaveButton from '../../../BlockQuote/saveButton';
import CancleButton from '../../../BlockQuote/cancleButton';
import "./eqMaintenanceDataEntry.css"

const Option = Select.Option;
class Add extends React.Component {
    componentWillUnmount() {
        this.setState = () => {
            return;
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
                deviceName:'',
                maintenanceItems: '',
                maintenanceContent: '',
                optType: 0,
                maintenanceFrequency: '',
        };
    }

    handleAdd = () => {
        this.setState({
            visible: true
        })
    }
    handleSave = () => {
        const {deviceName, maintenanceContent, maintenanceFrequency, maintenanceItems, optType} = this.state;
        let addData = {
            code: this.props.code,
            deviceName: deviceName ? deviceName : this.props.deviceName,
            maintenanceContent: maintenanceContent ? maintenanceContent : this.props.maintenanceContent,
            maintenanceFrequency: maintenanceFrequency ? maintenanceFrequency : this.props.maintenanceFrequency,
            maintenanceItems: maintenanceItems ? maintenanceItems : this.props.maintenanceItems,
            optType: optType ? optType : this.props.optType
        };
        if(!addData.deviceName && !addData.maintenanceContent && !addData.maintenanceItems) {
            message.info('保养内容、保养项目不能为空！');
            return
        }
        this.addOneContent(addData);
    }

    /**新增一条记录*/
    addOneContent = (data) => {
        let url = `${this.props.url.eqMaintenanceDataEntry.addOne}`, method = 'post';
        if(this.props.editorFlag) {
            url = `${this.props.url.eqMaintenanceDataEntry.maintenance}`;
            method = 'put';
        }
        axios({
            url: url,
            method: method,
            headers: {
                'Authorization': this.props.url.Authorization
            },
            data: data,
            type: 'json'
        }).then((data) => {
            message.info(data.data.message);
            this.setState({
                deviceName:'',
                maintenanceItems: '',
                maintenanceContent: '',
                optType: 0,
                maintenanceFrequency: '',
                visible:false
            })
            if(data.data.code === 0) {
                this.props.getTableData({
                    deviceName: this.props.deviceName
                })
            }
        }).catch(()=>{
            message.info('新增失败，请联系管理员！')
        });
    }

    /**点击取消按钮，隐藏新增弹框*/
    onCanCel = () => {
        this.setState({visible: false})
    }

    /**监控操作类型变化*/
    handleOptTypeChange = (value) => {
        this.setState({
            optType:value
        })
    }

    /**监控设备名称变化*/
    handleDeviceNameChange = (value) => {
        this.setState({
            deviceName:value,
        })
    }

    /**分别监控保养项目、保养内容、频率输入内容的变化*/
    onInputChange = (e) => {
        let InputName=e.target.name;
        let InputValue=e.target.value;
        this.setState({
            [InputName] : InputValue,})
    }

    render() {
        return (
            <span className={this.props.flag ? '' : 'hide'}>
                {
                    this.props.editorFlag ?
                        <span className='blue' onClick={this.handleAdd}>编辑</span>:
                        <NewButton handleClick={this.handleAdd} name='新增' className='fa fa-plus'/>
                }
                <Modal
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    onCancle={this.handleCancel}
                    maskClosable={false}
                    width="804px"
                    title="设备保养-项目录入"
                    footer={[
                        <SaveButton key="save" handleSave={this.handleSave }/>,
                       <CancleButton key='cancel' handleCancel={this.onCanCel} />
                    ]}
                >
                    <div className='eqMaintenance-eqblockb'>
                        <Row type="flex" justify="start" style={{paddingTop:"15px"}} >
                            <Col span={2} style={{paddingTop:"5px"}}>
                                设备名称:
                            </Col>
                            <Col span={10}>
                                {
                                    this.props.editorFlag ?
                                        <Input size="small" disabled={true}  style={{width:"280px"}} value={this.props.deviceName}/> :
                                        <Select style={{width:"280px"}}  onChange={this.handleDeviceNameChange}  defaultValue={this.props.deviceName}>
                                            {
                                                this.props.deviceData ? this.props.deviceData.map(e => {
                                                    return (<Option key={e} value={e}> {e}</Option>)
                                                }) : ''
                                            }
                                        </Select>
                                }
                            </Col>

                            <Col span={2} style={{paddingTop:"5px"}}>
                                保养项目:
                            </Col>
                            <Col span={10}>
                                <Input size="small" placeholder="请输入保养项目" key='2'  style={{width:"280px"}}
                                       name="maintenanceItems" onChange={this.onInputChange}  value={this.props.maintenanceItems}/>
                            </Col>
                        </Row>


                        <Row type="flex" justify="start" style={{paddingTop:"15px"}}>
                            <Col span={2} style={{paddingTop:"5px"}}>
                                保养内容:
                            </Col>
                            <Col span={10} style={{paddingRight:"20px"}} >
                                <Input size="small" placeholder="请输入保养内容"  key='3' name="maintenanceContent"
                                       style={{width:"280px"}} onChange={this.onInputChange} value={this.props.maintenanceContent}/>
                            </Col>

                            <Col span={2} style={{paddingTop:"5px"}}>
                                操作类型:
                            </Col>
                            <Col span={10}>
                                <Select  defaultValue={this.props.optType ? this.props.optType : '勾选'} onChange={this.handleOptTypeChange} name="optType" style={{ width:"280px"}}>
                                    <Option value='0'>勾选</Option>
                                    <Option value='1'>录入</Option>
                                </Select>
                            </Col>
                        </Row>

                        <Row type="flex" justify="start" style={{paddingTop:"15px"}}>
                            <Col span={2} style={{paddingTop:"5px" ,paddingRight:"5px"}}>
                                &nbsp;&nbsp;&nbsp;频率:&nbsp;&nbsp;&nbsp;
                            </Col>
                            <Col span={10} style={{paddingRight:"20px"}}>
                                <Input size="small" placeholder="请输入保养频率"  key='4' name="maintenanceFrequency"
                                       style={{width:"280px"}} onChange={this.onInputChange} value={this.props.maintenanceFrequency}/>
                            </Col>
                        </Row>
                    </div>
                </Modal>
            </span>)
    }
}
export default Add
