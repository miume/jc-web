import React from 'react';
import axios from 'axios';
import {Button, Col, DatePicker, Divider, Input, message, Row, Select, Switch} from 'antd';
import '../equipmentArchiveManager.css'
import moment from 'moment';

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
            startdate: null,
            statusCode: []

        }
        this.onChangeTime = this.onChangeTime.bind(this)
        this.changDeviceDocumentMain = this.changDeviceDocumentMain.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.handleSwitch = this.handleSwitch.bind(this)
        this.handleNewRow = this.handleNewRow.bind(this)
        this.handleDeviceStatus = this.handleDeviceStatus.bind(this)
        this.handleReduceRowData = this.handleReduceRowData.bind(this)
    }

    componentDidMount() {
        if (!this.props.editFlag) {
            this.handleDeviceStatus();
        }
    }

    render() {
        return (
            <div style={{height: '550px'}}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Input placeholder="请输入固定资产编码(必填)" key="fixedassetsCode" name="fixedassetsCode"
                               value={this.props.deviceDocumentMain.fixedassetsCode ? this.props.deviceDocumentMain.fixedassetsCode : ''}
                               onChange={this.changDeviceDocumentMain} disabled={this.props.editFlag}/>
                    </Col>
                    <Col span={12}>
                        {
                            this.props.comFlag ? <Input placeholder="请输入部件名称(必填)" key="deviceName" name="deviceName"
                                                        value={this.props.deviceDocumentMain.deviceName ? this.props.deviceDocumentMain.deviceName : ''}
                                                        onChange={this.changDeviceDocumentMain}
                                                        disabled={this.props.editFlag}/> :
                                <Input placeholder="请输入设备名称(必填)" key="deviceName" name="deviceName"
                                       value={this.props.deviceDocumentMain.deviceName ? this.props.deviceDocumentMain.deviceName : ''}
                                       onChange={this.changDeviceDocumentMain} disabled={this.props.editFlag}/>
                        }
                    </Col>
                </Row>
                {
                    this.props.comFlag?
                        <Row gutter={16}>
                            <Col span={24}>
                                <Input placeholder="请输入规格型号" key="specification" name="specification"
                                       value={this.props.deviceDocumentMain.specification ? this.props.deviceDocumentMain.specification : ''}
                                       onChange={this.changDeviceDocumentMain} disabled={this.props.editFlag}/>
                            </Col>
                        </Row>:
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
                }
                <Row gutter={16}>
                    <Col span={12}>
                        {
                            this.props.editFlag ?
                                <Input placeholder="请输入供货厂家电话" key="supplierNum" name="supplierNum"
                                       value={this.props.startdate ? this.props.startdate : ''}
                                       onChange={this.changDeviceDocumentMain} disabled={this.props.editFlag}/>
                                : <DatePicker disabled={this.props.editFlag} style={{width: "215px"}}
                                              disabledDate={this.disabledDate}
                                              defaultValue={moment(this.props.deviceDocumentMain.startdate, 'YYYY-MM-DD')}
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
                {
                    this.props.comFlag?null:
                        <Row gutter={16}>
                            <Col span={12}>
                                {
                                    this.props.editFlag ?
                                        <Input placeholder="请选择设备状态(必填)" key="deviceStatus" name="deviceStatus"
                                               value={this.props.deviceStatus ? this.props.deviceStatus : ''}
                                               onChange={this.changDeviceDocumentMain} disabled={this.props.editFlag}/>
                                        : <Select placeholder="请选择设备状态(必填)" style={{width: "215px"}} disabled={this.props.editFlag}
                                                  onChange={this.handleSelect} defaultValue={this.props.deviceStatus}>
                                            {
                                                this.state.statusCode.map(es => {
                                                    return (
                                                        <Option key={es.code} value={es.code}>{es.name}</Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                }
                            </Col>
                            <Col span={12}>
                                {
                                    this.props.editFlag ?
                                        <span style={{fontSize: '15px'}}>是否关键设备：
                                    <i style={this.props.deviceDocumentMain.keyFlag?{fontSize: '15px',color:'lawngreen'}:{fontSize: '15px',color:'grey'}} className="fa fa-circle" aria-hidden="true"></i>
                                </span>
                                        : <span style={{fontSize: '15px'}}>是否关键设备：
                                    <Switch checkedChildren="是" unCheckedChildren="否"
                                            disabled={this.props.editFlag}
                                            onChange={this.handleSwitch}
                                            checked={this.props.deviceDocumentMain.keyFlag}
                                    />
                                </span>
                                }
                            </Col>
                        </Row>
                }
                <Divider className="eq-divider"/>
                <Row gutter={16}>
                    <Col span={12}>
                        {
                            this.props.editFlag ?
                                null
                                : <Button type="primary" icon="plus" size='large'
                                          style={{width: '445px', fontSize: '15px', marginLeft: '-115px'}}
                                          onClick={this.props.addRowFun} disabled={this.props.editFlag}
                                />
                        }
                    </Col>
                </Row>
                <div className="eq-comModal-newRow">
                    {
                        this.props.newRowData ? this.props.newRowData.map((m, index) => {
                            return (
                                <Row gutter={16}>
                                    <Col span={10}>
                                        <Input placeholder="请输入属性名称(必填)" key={index + "-1"} value={m.name ? m.name : ''}
                                               name={index + "-1"} disabled={this.props.editFlag}
                                               onChange={this.handleNewRow}/>
                                    </Col>
                                    <Col span={10}>
                                        <Input placeholder="请输入属性值(必填)" key={index + "-2"} value={m.value ? m.value : ''}
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
            </div>
        )

    }

    handleReduceRowData = (e) => {
        this.props.handleReduceRow(e.target.name)
    }
    handleDeviceStatus = () => {
        // TODO 获取状态
        axios({
            url: `${this.props.url.equipmentStatus.deviceStatus}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
            var statusCode = [];
            if (res) {
                for (var i = 0; i < res.length; i++) {
                    const arr = res[i];
                    statusCode.push({
                        name: arr.name,
                        code: arr.code
                    })
                }
                this.setState({
                    statusCode: statusCode
                })
            } else {
                message.info('设备状态为空，请先添加状态！')
            }
        }).catch(() => {
            message.info('设备状态数据存在异常，请联系管理员！')
        });
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
            startdate: date
        });
        this.props.handleDeviceDocumentMain('startdate', dateString)

    };
    changDeviceDocumentMain = (e) => {
        this.props.handleDeviceDocumentMain(e.target.name, e.target.value)
    }
}

export default DetailModal