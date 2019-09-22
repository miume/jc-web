import React from 'react';
import axios from 'axios';
import {message, Modal} from 'antd';
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
        this.getNowFormatDate = this.getNowFormatDate.bind(this)
    }

    render() {
        return (
            <span>
                <span className="blue" onClick={this.handleEdit}>编辑</span>
                    <Modal
                        title={this.props.name}
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
                        comFlag={this.props.comFlag}
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
        if(deviceDocumentMain.deviceName){
            var pattern = ['^','\'',']','[','}','{','|','\\','%','0','1','2','3','4','5','6','7','8','9']
            const deviceLenght = deviceDocumentMain.deviceName.length-1;
            if(pattern.includes(deviceDocumentMain.deviceName.substr(deviceLenght, 1))){
                if(this.props.comFlag){
                    message.info("部件名称最后一位存在非法字符：\""+ deviceDocumentMain.deviceName.substr(deviceLenght, 1) +"\"，请重新输入部件名称")
                }else{
                    message.info("设备名称最后一位存在非法字符：\""+ deviceDocumentMain.deviceName.substr(deviceLenght, 1) + "\"，请重新输入设备名称")
                }
                return
            }


            // for (var ii = 0; ii < deviceDocumentMain.deviceName.length; ii++) {
            //     if(pattern.test(deviceDocumentMain.deviceName.substr(ii, 1))){
            //         if(this.props.comFlag){
            //             message.info("部件名称存在非法字符，请重新输入部件名称")
            //         }else{
            //             message.info("设备名称存在非法字符，请重新输入设备名称")
            //         }
            //         return
            //     }
            // }
        }
        if (!deviceDocumentMain.deviceName || deviceDocumentMain.deviceName === '') {
            deviceFlag = false;
            if(this.props.comFlag){
                returnArr.push("部件名称必填")
            }else{
                returnArr.push("设备名称必填")
            }
        }
        if(!this.props.comFlag){
            if (!deviceDocumentMain.statusCode || deviceDocumentMain.statusCode === '') {
                deviceDocumentMain.statusCode = this.state.statusCodeInit;
                if (this.state.statusCodeInit === ''){
                    message.info("请选择设备状态")
                    return
                }
            }
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
        if(this.props.comFlag){
            delete deviceDocumentMain.keyFlag
        }
        const startdate = this.getNowFormatDate()
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
            if ((deviceDocumentMain.startdate&&deviceDocumentMain.startdate === undefined) || (deviceDocumentMain.startdate&&deviceDocumentMain.startdate==='')) {
                deviceDocumentMain.startdate = startdate;
            }
            if(this.props.comFlag){
                var addData = {
                    arrName: packArrName,
                    arrValue: packArrValue,
                    deviceDocumentUnit: deviceDocumentMain
                };
                axios({
                    url: `${this.props.url.equipmentArchive.updateUnit}`,
                    method: 'put',
                    headers: {
                        'Authorization': this.props.url.Authorization
                    },
                    data: addData,
                    // type: 'json'
                }).then((data) => {
                    if(data.data.code===0){
                        this.props.fetch({},{})
                        message.info(data.data.message);
                        this.setState({
                            visible: false,
                            deviceDocumentMain: {},
                            newRowData: [],
                            statusCode: []
                        });
                    }else{
                        message.info("请重新保存");
                        return
                    }
                }).catch(function () {
                    message.info('编辑失败，请联系管理员！');
                });
            }else{
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
                    if(data.data.code===0){
                        const deviceName = this.props.record.deviceName.split('-')[0]
                        this.props.getRightData(this.props.depCode,deviceName?deviceName:this.props.deviceName)
                        message.info(data.data.message);
                        this.setState({
                            visible: false,
                            deviceDocumentMain: {},
                            newRowData: [],
                            statusCode: []
                        });
                    }else{
                        message.info("请重新保存");
                        return
                    }
                }).catch(function () {
                    message.info('编辑失败，请联系管理员！');
                });
            }
        }


    };

    getNowFormatDate = () => {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }
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
        if(this.props.comFlag){
            axios({
                url: `${this.props.url.equipmentArchive.unitDetail}`,
                method: 'get',
                headers: {
                    'Authorization': this.props.url.Authorization
                },
                params:{
                    id: this.props.record.code
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
                        deviceDocumentMain: res.deviceDocumentUnit,
                        deptName: res.basicInfoDept.name,
                        startdate: res.deviceDocumentUnit.startdate
                    })
                } else {
                    // message.info('设备状态为空，请先添加状态！')
                }
            }).catch(() => {
                message.info('数据存在异常，请联系管理员！')
            });
        }else{
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

}

export default Edit