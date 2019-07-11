import React from 'react';
import axios from 'axios';
import {Modal, Button, message} from 'antd';
import CancleButton from "../../BlockQuote/cancleButton";
import DetailModal from "../modal/detailModal";
import SaveButton from "../../BlockQuote/saveButton";

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            uploadData: [{
                url: '',
                name: '上传手册文件',
                code: ''
            }],
            newRowData: [],
            deviceDocumentMain: {},
            deviceStatus: '',
            deptName: '',
            startdate: '',
            statusCode: [],

        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDeviceDocumentMain = this.handleDeviceDocumentMain.bind(this);
        this.addRowFun = this.addRowFun.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleReduceRow=this.handleReduceRow.bind(this)
    }

    render() {
        return (
            <span>
                <span className="blue" onClick={this.handleEdit}>编辑</span>
                    <Modal
                        title="数据详情"
                        visible={this.state.visible}
                        closable={false}
                        centered={true}
                        maskClosable={false}
                        width="500px"
                        footer={[
                            <CancleButton
                                handleCancel={this.handleCancel}
                                flag={true}
                                key="back"
                            />,
                            <SaveButton
                                key="add"
                                handleSave={this.handleSave}
                            />
                        ]}
                    >
                    <DetailModal
                        editFlag={false}
                        deviceDocumentMain={this.state.deviceDocumentMain}
                        newRowData={this.state.newRowData}
                        deviceStatus={this.state.deviceStatus}
                        deptName={this.state.deptName}
                        startdate={this.state.startdate}
                        statusCode={this.state.statusCode}
                        handleDeviceDocumentMain={this.handleDeviceDocumentMain}
                        addRowFun={this.addRowFun}
                        handleNewRowData={this.handleNewRowData}
                        url={this.props.url}
                        handleReduceRow={this.handleReduceRow}
                    />
                    </Modal>
                    </span>
        )

    }

    handleSave = () => {
        var deviceDocumentMain = this.state.deviceDocumentMain;
        var newRowData = this.state.newRowData;
        // 判断新增属性是否填写完整
        var newRowFlag = true;
        for (var i = 0; i < newRowData.length; i++) {
            var arr = newRowData[i]
            if (arr.name === '' || arr.value === '') {
                newRowFlag = false;
                break;
            }
        }

        // 判断设备属性必填项是否填写
        var deviceFlag = true;
        var returnArr = [];
        if (!deviceDocumentMain.fixedassetsCode || deviceDocumentMain.fixedassetsCode === '') {
            deviceFlag = false;
            returnArr.push("固定资产编码必填")
        }
        if (!deviceDocumentMain.deviceName || deviceDocumentMain.deviceName === '') {
            deviceFlag = false;
            returnArr.push("设备名称必填")
        }
        if (!deviceDocumentMain.statusCode || deviceDocumentMain.statusCode === '') {
            deviceFlag = false;
            returnArr.push("设备状态必选")
        }
        if (!deviceFlag) {
            var returnString = "";
            for (var j = 0; j < returnArr.length; j++) {
                returnString += returnArr[j] + ','
            }
            message.info(returnString)
        }

        if (!newRowFlag) {
            message.info("新增属性需要填写完整")
        }

        // 调用保存函数
        if (deviceFlag && newRowFlag) {
            // 组装新增数据格式
            var packArrName = [];
            var packArrValue = [];
            for (var k = 0; k < newRowData.length; k++) {
                const arrs = newRowData[k];
                packArrName.push(arrs.name);
                packArrValue.push(arrs.value)
            }
            var addData = {
                arrName: packArrName,
                arrValue: packArrValue,
                deviceDocumentMain: deviceDocumentMain
            };
            axios({
                url: `${this.props.url.equipmentArchive.device}`,
                method: 'put',
                headers: {
                    'Authorization': this.props.url.Authorization
                },
                data: addData,
                // type: 'json'
            }).then((data) => {
                const deviceName = this.props.record.deviceName.split('-')[0]
                this.props.getRightData(this.props.depCode,deviceName?deviceName:this.props.deviceName)
                message.info(data.data.message);
            }).catch(function () {
                message.info('编辑失败，请联系管理员！');
            });
            this.setState({
                visible: false,
                deviceDocumentMain: {},
                newRowData: [],
                statusCode: []
            });

        }


    };

    handleDeviceDocumentMain = (name, value) => {
        var deviceDocumentMain = this.state.deviceDocumentMain;
        deviceDocumentMain[name] = value;
        this.setState({
            deviceDocumentMain: deviceDocumentMain
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
    handleReduceRow = (index) => {
        const newRowData = this.state.newRowData;
        var newData = []
        for (var i=0; i<newRowData.length; i++){
            if(i !== parseInt(index)){
                newData.push(newRowData[i])
            }
        }
        this.setState({
            newRowData: newData
        })

    }
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
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    handleEdit = () => {
        // TODO 获取数据
        axios({
            url: `${this.props.url.equipmentArchive.detail}/${this.props.record.code}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
            if (res) {
                const arrName = res.arrName;
                const arrValue = res.arrValue
                var newRowData = []
                for (var i = 0; i < arrName.length; i++) {
                    newRowData.push({
                        name: arrName[i],
                        value: arrValue[i]
                    })
                }
                this.setState({
                    visible: true,
                    newRowData: newRowData,
                    deviceDocumentMain: res.deviceDocumentMain,
                    deviceStatus: res.deviceStatus,
                    deptName: res.deptName,
                    startdate: res.deviceDocumentMain.startdate
                })
            } else {
                message.info('设备状态为空，请先添加状态！')
            }
        }).catch(() => {
            message.info('设备状态数据存在异常，请联系管理员！')
        });
    }

}

export default Edit