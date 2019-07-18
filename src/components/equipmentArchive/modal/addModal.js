import React from 'react';
import axios from 'axios';
import {Button, message, Input, Col, Row, DatePicker, Select, Switch, Divider} from 'antd';
import '../equipmentArchive.css'
import moment from 'moment';

const Option = Select.Option;
const uploads = {
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

class AddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            eqStatus: [],
            startDate: null
        }
        this.onChangeTime = this.onChangeTime.bind(this)
        this.changDeviceDocumentMain = this.changDeviceDocumentMain.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.handleSwitch = this.handleSwitch.bind(this)
        this.handleNewRow = this.handleNewRow.bind(this)
        this.handleReduceRowData = this.handleReduceRowData.bind(this)
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
                        {
                            this.props.comFlag ? <Input placeholder="请输入部件名称" key="deviceName" name="deviceName"
                                                        value={this.props.deviceDocumentMain.deviceName ? this.props.deviceDocumentMain.deviceName : ''}
                                                        onChange={this.changDeviceDocumentMain}
                                                        disabled={this.props.editFlag}/> :
                                <Input placeholder="请输入设备名称" key="deviceName" name="deviceName"
                                       value={this.props.deviceDocumentMain.deviceName ? this.props.deviceDocumentMain.deviceName : ''}
                                       onChange={this.changDeviceDocumentMain} disabled={this.props.editFlag}/>
                        }
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
                        <DatePicker disabled={this.props.editFlag} style={{width: "215px"}}
                                    defaultValue={moment(this.props.startdate, 'YYYY-MM-DD')}
                                    onChange={this.onChangeTime} placeholder="请输入启用日期"/>
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
                {
                    this.props.comFlag ? null :
                        <Row gutter={16}>
                            <Col span={12}>
                                <Select placeholder="请选择设备状态" style={{width: "215px"}} disabled={this.props.editFlag}
                                        onChange={this.handleSelect}>
                                    {
                                        this.props.statusCode.map(es => {
                                            return (
                                                <Option key={es.code} value={es.code}>{es.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Col>
                            <Col span={12}>
                        <span style={{fontSize: '15px'}}>是否关键设备：<Switch checkedChildren="是" unCheckedChildren="否"
                                                                        disabled={this.props.editFlag}
                                                                        onChange={this.handleSwitch}/></span>
                            </Col>
                        </Row>
                }
                <Divider className="eq-divider"/>
                <Row gutter={16}>
                    <Button type="primary" icon="plus" size='large' style={{width: '450px', fontSize: '15px'}}
                            onClick={this.props.addRowFun} disabled={this.props.editFlag}/>
                </Row>
                <div className="eq-addModal-newRow">
                    {
                        this.props.newRowData ? this.props.newRowData.map((m, index) => {
                            return (
                                <Row gutter={16}>
                                    <Col span={10}>
                                        <Input placeholder="请输入属性名称" key={index + "-1"} value={m.name ? m.name : ''}
                                               name={index + "-1"} disabled={this.props.editFlag}
                                               onChange={this.handleNewRow}/>
                                    </Col>
                                    <Col span={10}>
                                        <Input placeholder="请输入属性值" key={index + "-2"} value={m.value ? m.value : ''}
                                               name={index + "-2"} disabled={this.props.editFlag}
                                               onChange={this.handleNewRow}/>
                                    </Col>
                                    <Col span={4}>
                                        <Button type="primary" icon="minus" size='large'
                                                style={{width: '60px', fontSize: '15px'}}
                                                key={index} name={index}
                                                onClick={this.handleReduceRowData} disabled={this.props.editFlag}
                                        />
                                    </Col>
                                </Row>
                            )
                        }) : null
                    }
                </div>
                {/*<Divider className="eq-divider"/>*/}
                {/*<Row gutter={16}>*/}
                {/*<Col span={14}>*/}
                {/*<Upload {...this.props.uploadProps} fileList={this.props.fileList}>*/}
                {/*<Button>*/}
                {/*<Icon type="upload"/> 请选择上传文件，可多次选择*/}
                {/*</Button>*/}
                {/*</Upload>*/}
                {/*</Col>*/}
                {/*<Col span={14}>*/}
                {/*<span style={{fontSize: '15px',paddingLeft:'10px'}}>支持文件格式：.pdf</span>*/}
                {/*</Col>*/}
                {/*</Row>*/}
                {/*<Row gutter={16}>*/}
                {/*<Col span={8}>*/}
                {/*<Button disabled={this.props.editFlag} type="primary" icon="minus" size='large'*/}
                {/*style={{width: '100%', fontSize: '15px'}}*/}
                {/*onClick={this.props.reduceUploadFun()}/>*/}
                {/*</Col>*/}
                {/*</Row>*/}
                {/*<div className="eq-addModal-newRow">*/}
                {/*{*/}
                {/*this.props.uploadData ? this.props.uploadData.map((m, index) => {*/}
                {/*return (*/}
                {/*<Row gutter={16}>*/}
                {/*<Col span={8}>*/}
                {/*<Upload {...uploads} disabled={this.props.editFlag}>*/}
                {/*<Button>*/}
                {/*<Icon type="upload"/> {m.name}*/}
                {/*</Button>*/}
                {/*</Upload>*/}
                {/*</Col>*/}
                {/*<Col span={8}>*/}
                {/*<span style={{fontSize: '15px'}}>支持文件格式：.pdf</span>*/}
                {/*</Col>*/}
                {/*<Col span={4}>*/}
                {/*<Button disabled={this.props.editFlag} type="primary" icon="minus" size='large'*/}
                {/*style={{width: '100%', fontSize: '15px'}}*/}
                {/*onClick={this.props.reduceUploadFun(index)}/>*/}
                {/*</Col>*/}
                {/*</Row>*/}
                {/*)*/}
                {/*}) : null*/}
                {/*}*/}
                {/*</div>*/}
                {/*<Row gutter={16}>*/}
                {/*<Button disabled={this.props.editFlag} type="primary" icon="plus" size='large'*/}
                {/*style={{width: '450px', fontSize: '15px'}}*/}
                {/*onClick={this.props.addUplodFun}/>*/}
                {/*</Row>*/}
            </div>
        )

    }

    handleReduceRowData = (e) => {
        this.props.handleReduceRow(e.target.name)
    }
    handleNewRow = (e) => {
        this.props.handleNewRowData(e.target.name, e.target.value)
    }

    handleSwitch = (checked) => {
        if (checked) {
            this.props.handleDeviceDocumentMain('keyFlag', 1)
        } else {
            this.props.handleDeviceDocumentMain('keyFlag', 0)
        }
    };
    handleSelect = (value) => {
        this.props.handleDeviceDocumentMain('statusCode', value)
    };
    onChangeTime = (date, dateString) => {
        this.setState({
            startDate: date
        })
        this.props.handleDeviceDocumentMain('startdate', dateString)
    };

    changDeviceDocumentMain = (e) => {
        this.props.handleDeviceDocumentMain(e.target.name, e.target.value)
    }
}

export default AddModal