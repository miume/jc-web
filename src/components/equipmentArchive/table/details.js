import React from 'react';
import axios from 'axios';
import {Modal, Button, message} from 'antd';
import CancleButton from "../../BlockQuote/cancleButton";
import AddModal from "../modal/addModal";
import SaveButton from "../../BlockQuote/saveButton";

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            uploadData: [{
                url:'',
                name: '上传手册文件',
                code: ''
            }],
            deviceDocumentMain: {
                keyFlag: 0,
                deptCode: ''
            },
            newRowData: [],
            statusCode: []
        };
        this.handleDetail = this.handleDetail.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.addRowFun = this.addRowFun.bind(this)
        this.addUplodFun = this.addUplodFun.bind(this)
        this.reduceUploadFun = this.reduceUploadFun.bind(this)
        this.handleFooter = this.handleFooter.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleDeviceDocumentMain = this.handleDeviceDocumentMain.bind(this)
        this.handleNewRowData = this.handleNewRowData.bind(this)
    }

    render() {
        const footer = this.handleFooter()
        return (
            <span>
                <span className="blue" onClick={this.handleDetail}>{this.props.name}</span>
                <Modal
                    title="数据详情"
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    width="500px"
                    footer={footer}
                >
                    <AddModal
                        statusCode={this.state.statusCode}
                        handleDeviceDocumentMain={this.handleDeviceDocumentMain}
                        deviceDocumentMain={this.state.deviceDocumentMain}
                        handleNewRowData={this.handleNewRowData}

                        editFlag={this.props.editFlag}
                        newRowData = {this.state.newRowData}
                        addRowFun = {this.addRowFun}
                        uploadData = {this.state.uploadData}
                        addUplodFun = {this.addUplodFun}
                        reduceUploadFun = {this.reduceUploadFun}
                    />
                </Modal>
            </span>
        )

    }
    handleDeviceDocumentMain = (key, value) => {
        var deviceDocumentMain = this.state.deviceDocumentMain;
        if(key === "power"){
            deviceDocumentMain[key] = parseInt(value)
        }else{
            deviceDocumentMain[key] = value
        }
        this.setState({
            deviceDocumentMain: deviceDocumentMain
        })
    };
    handleNewRowData = (name, value) => {
        var newRowData = this.state.newRowData;
        const index = parseInt(name.split('-')[0]);
        const flag = parseInt(name.split('-')[1]);
        if (flag === 1) {
            newRowData[index].name = value
        } else {
            newRowData[index].value = value
        }
        this.setState({
            newRowData: newRowData
        })
    };
    handleFooter = () => {
        var footer = [];
        if(this.props.editFlag) {
            footer = [
                <CancleButton
                    handleCancel={this.handleCancel}
                    flag={true}
                    key="back"
                />
            ];
            return footer
        }else{
            footer = [
                <CancleButton
                    handleCancel={this.handleCancel}
                    flag={true}
                    key="back"
                />,
                <SaveButton
                    key="add"
                    handleSave={this.handleSave}
                />
            ]
            return footer
        }
    }
    handleSave = () => {
        this.setState({
            visible: false,
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    handleDetail = () => {
        // TODO 获取数据
        this.setState({
            visible: true
        })
    }

    addRowFun = () => {
        var newRowData = this.state.newRowData;
        newRowData.push({
            name: '',
            value: ''
        });
        this.setState({
            data: newRowData,
        })
    };
    addUplodFun = () => {
        // TODO 先增加记录，再调用接口获得数据
        var uploadData = this.state.uploadData;
        uploadData.push({
            url: '',
            name: '上传手册文件',
            code: ''
        });
        this.setState({
            data: uploadData,
        })
    };
    reduceUploadFun = (index) => {
        // TODO 先根据code删除记录，再调用接口获得数据
        // const {uploadData} = this.state;
        // uploadData.splice(index,1);
        // this.setState({
        //     data: uploadData,
        // })
    }
}

export default Detail