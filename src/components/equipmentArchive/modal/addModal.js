import React from 'react';
import axios from 'axios';
import {Button, message, Upload, Input, Col, Row, DatePicker, Select,Switch,Icon,Divider} from 'antd';
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
class AddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            eqStatus: []
        }
        this.onChangeTime = this.onChangeTime.bind(this)
    }
    render() {
        return (
            <div style={{height:'550px'}} >
                <Row gutter={16}>
                    <Col span={12}>
                        <Input placeholder="请输入固定资产编码"/>
                    </Col>
                    <Col span={12}>
                        <Input placeholder="请输入设备名称"/>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Input placeholder="请输入规格型号"/>
                    </Col>
                    <Col span={12}>
                        <Input placeholder="请输入ID卡号"/>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <DatePicker style={{width:"215px"}} disabledDate={this.disabledDate} onChange={this.onChangeTime} placeholder="请输入启用日期"/>
                    </Col>
                    <Col span={12}>
                        <Input placeholder="请输入功率"/>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Input placeholder="请输入供货厂家"/>
                    </Col>
                    <Col span={12}>
                        <Input placeholder="请输入供货厂家电话"/>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Select placeholder="请选择设备状态" style={{width:"215px"}}>
                            {
                                this.state.eqStatus.map(es=>{
                                    return(
                                        <Option key={es.id} value={es.id}>{es.name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Col>
                    <Col span={12}>
                        <span style={{fontSize:'15px'}}>是否关键设备：<Switch checkedChildren="是" unCheckedChildren="否"/></span>
                    </Col>
                </Row>
                <Divider className="eq-divider"/>
                <Row gutter={16}>
                    <Button type="primary" icon="plus" size='large' style={{width:'450px',fontSize:'15px'}} onClick={this.props.addRowFun}/>
                </Row>
                <div className="eq-addModal-newRow">
                    {
                        this.props.newRowData?this.props.newRowData.map((m,index) => {
                            return(
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Input placeholder="请输入属性名称"/>
                                    </Col>
                                    <Col span={12}>
                                        <Input placeholder="请输入属性值"/>
                                    </Col>
                                </Row>
                            )
                        }): null
                    }
                </div>
                <Divider className="eq-divider"/>
                <div className="eq-addModal-newRow">
                    {
                        this.props.uploadData?this.props.uploadData.map((m,index) => {
                            return(
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Upload {...props}>
                                            <Button>
                                                <Icon type="upload" /> {m.name}
                                            </Button>
                                        </Upload>
                                    </Col>
                                    <Col span={8}>
                                        <span style={{fontSize:'15px'}}>支持文件格式：.pdf</span>
                                    </Col>
                                    <Col span={4}>
                                        <Button type="primary" icon="plus" size='large' style={{width:'100%',fontSize:'15px'}} onClick={this.props.addUplodFun}/>
                                    </Col>
                                    <Col span={4}>
                                        <Button type="primary" icon="minus" size='large' style={{width:'100%',fontSize:'15px'}} onClick={this.props.reduceUploadFun(index)}/>
                                    </Col>
                                </Row>
                            )
                        }):null
                    }
                </div>
            </div>
        )

    }
    onChangeTime = () => {

    }
}

export default AddModal