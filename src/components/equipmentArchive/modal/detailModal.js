import React from 'react';
import axios from 'axios';
import {Button, message, Upload, Input, Col, Row, DatePicker, Select, Switch, Icon, Divider} from 'antd';
import CancleButton from "../../BlockQuote/cancleButton";
import '../equipmentArchive.css'

const Option = Select.Option;
const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

class DetailModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            eqStatus: [],
            startdate: null

        }
    }

    render() {
        return (
            <div style={{height: '550px'}}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Input placeholder="请输入固定资产编码" key="fixedassetsCode" name="fixedassetsCode"
                               value={this.props.deviceDocumentMain.fixedassetsCode ? this.props.deviceDocumentMain.fixedassetsCode : ''}
                               onChange={this.changDeviceDocumentMain} disabled={this.props.editFlag}/>
                    </Col>
                    <Col span={12}>
                        <Input placeholder="请输入设备名称" key="deviceName" name="deviceName"
                               value={this.props.deviceDocumentMain.deviceName ? this.props.deviceDocumentMain.deviceName : ''}
                               onChange={this.changDeviceDocumentMain} disabled={this.props.editFlag}/>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Input placeholder="请输入规格型号" key="specification" name="specification"
                               value={this.props.deviceDocumentMain.specification ? this.props.deviceDocumentMain.specification : ''}
                               onChange={this.changDeviceDocumentMain} disabled={this.props.editFlag}/>
                    </Col>
                    <Col span={12}>
                        <Input placeholder="请输入ID卡号" key="idCode" name="idCode"
                               value={this.props.deviceDocumentMain.idCode ? this.props.deviceDocumentMain.idCode : ''}
                               onChange={this.changDeviceDocumentMain} disabled={this.props.editFlag}/>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        {
                            this.props.editFlag ?
                                <Input placeholder="请输入供货厂家电话" key="supplierNum" name="supplierNum"
                                       value={this.props.startdate ? this.props.startdate : ''}
                                       onChange={this.changDeviceDocumentMain} disabled={this.props.editFlag}/>
                                : <DatePicker disabled={this.props.editFlag} style={{width: "215px"}}
                                              disabledDate={this.disabledDate} defaultValue={this.props.startdate}
                                              onChange={this.onChangeTime} placeholder="请输入启用日期"/>
                        }
                    </Col>
                    <Col span={12}>
                        <Input placeholder="请输入功率" key="power" name="power"
                               value={this.props.deviceDocumentMain.power ? this.props.deviceDocumentMain.power : ''}
                               onChange={this.changDeviceDocumentMain} disabled={this.props.editFlag}/>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Input placeholder="请输入供货厂家" key="supplier" name="supplier"
                               value={this.props.deviceDocumentMain.supplier ? this.props.deviceDocumentMain.supplier : ''}
                               onChange={this.changDeviceDocumentMain} disabled={this.props.editFlag}/>
                    </Col>
                    <Col span={12}>
                        <Input placeholder="请输入供货厂家电话" key="supplierNum" name="supplierNum"
                               value={this.props.deviceDocumentMain.supplierNum ? this.props.deviceDocumentMain.supplierNum : ''}
                               onChange={this.changDeviceDocumentMain} disabled={this.props.editFlag}/>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        {
                            this.props.editFlag ?
                                <Input placeholder="请输入供货厂家电话" key="supplierNum" name="supplierNum"
                                       value={this.props.deviceStatus ? this.props.deviceStatus : ''}
                                       onChange={this.changDeviceDocumentMain} disabled={this.props.editFlag}/>
                                : <Select placeholder="请选择设备状态" style={{width: "215px"}} disabled={this.props.editFlag}
                                          onChange={this.handleSelect}>
                                    {
                                        this.props.statusCode.map(es => {
                                            return (
                                                <Option key={es.code} value={es.code}>{es.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                        }
                    </Col>
                    <Col span={12}>
                        <span style={{fontSize: '15px'}}>是否关键设备：
                            <Switch checkedChildren="是" unCheckedChildren="否"
                                    disabled={this.props.editFlag}
                                    onChange={this.handleSwitch}
                                    checked={this.props.deviceDocumentMain.keyFlag}
                            /></span>
                    </Col>
                </Row>
                <Divider className="eq-divider"/>
                <Row gutter={16}>
                    <Col span={12}>
                        {
                            this.props.editFlag ?
                                null
                                : <Button type="primary" icon="plus" size='large'
                                          style={{width: '450px', fontSize: '15px'}}
                                          onClick={this.props.addRowFun} disabled={this.props.editFlag}/>
                        }
                    </Col>
                </Row>
                <div className="eq-addModal-newRow">
                    {
                        this.props.newRowData ? this.props.newRowData.map((m, index) => {
                            return (
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Input placeholder="请输入属性名称" key={index + "-1"} value={m.name ? m.name : ''}
                                               name={index + "-1"} disabled={this.props.editFlag}
                                               onChange={this.handleNewRow}/>
                                    </Col>
                                    <Col span={12}>
                                        <Input placeholder="请输入属性值" key={index + "-2"} value={m.value ? m.value : ''}
                                               name={index + "-2"} disabled={this.props.editFlag}
                                               onChange={this.handleNewRow}/>
                                    </Col>
                                </Row>
                            )
                        }) : null
                    }
                </div>
            </div>
        )

    }
}

export default DetailModal