import React, {Component} from 'react';
import {Modal, Form, Input, DatePicker, Select, Col, Switch, message} from 'antd';
import NewButton from '../../BlockQuote/newButton';
import SaveButton from '../../BlockQuote/saveButton';
import CancleButton from '../../BlockQuote/cancleButton';
import AddModal from '../modal/addModal'
import moment from "moment";
import axios from "axios";

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addModalVisable: false,
            uploadData: [{
                url: '',
                name: '上传手册文件',
                code: ''
            }],
            deviceDocumentMain: {
                keyFlag: 0
            },
            newRowData: [],
            statusCode: [],
            startdate: '',
            statusCodeInit:''
        };
        this.handleAdd = this.handleAdd.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.addRowFun = this.addRowFun.bind(this)
        this.addUplodFun = this.addUplodFun.bind(this)
        this.reduceUploadFun = this.reduceUploadFun.bind(this)
        this.handleDeviceDocumentMain = this.handleDeviceDocumentMain.bind(this)
        this.handleNewRowData = this.handleNewRowData.bind(this)
        this.getNowFormatDate = this.getNowFormatDate.bind(this)
        this.handleReduceRow = this.handleReduceRow.bind(this)
    }

    render() {
        return (
            <span>
                <NewButton handleClick={this.handleAdd} name='新增' className='fa fa-plus'/>
                <Modal
                    title="新增"
                    visible={this.state.addModalVisable}
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
                    <AddModal
                        statusCode={this.state.statusCode}
                        editFlag={false}
                        newRowData={this.state.newRowData}
                        addRowFun={this.addRowFun}
                        uploadData={this.state.uploadData}
                        addUplodFun={this.addUplodFun}
                        reduceUploadFun={this.reduceUploadFun}
                        handleDeviceDocumentMain={this.handleDeviceDocumentMain}
                        deviceDocumentMain={this.state.deviceDocumentMain}
                        handleNewRowData={this.handleNewRowData}
                        startdate={this.state.startdate}
                        handleReduceRow={this.handleReduceRow}
                    />
                </Modal>
            </span>
        )
    }
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
    };
    handleDeviceDocumentMain = (key, value) => {
        var deviceDocumentMain = this.state.deviceDocumentMain;
        if (key === "power") {
            deviceDocumentMain[key] = parseInt(value)
        } else {
            deviceDocumentMain[key] = value
        }
        this.setState({
            deviceDocumentMain: deviceDocumentMain
        })
    };


    // 获取当天日期
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
    handleAdd = () => {

        // 获取当天日期
        var startdate = this.getNowFormatDate();

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
                    addModalVisable: true,
                    statusCode: statusCode,
                    startdate: startdate
                })
            } else {
                message.info('设备状态为空，请先添加状态！')
            }
        }).catch(() => {
            message.info('设备状态数据存在异常，请联系管理员！')
        });

    };
    handleCancel = () => {
        this.setState({
            addModalVisable: false,
            deviceDocumentMain: {},
            newRowData: [],
            statusCode: [],
        })
    };
    handleSave = () => {

        var deviceDocumentMain = this.state.deviceDocumentMain;
        deviceDocumentMain["deptCode"] = this.props.depCode
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
            deviceDocumentMain.statusCode = this.state.statusCodeInit
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
            if (deviceDocumentMain.startdate || deviceDocumentMain.startdate === undefined) {
                deviceDocumentMain.startdate = startdate;
            }
            var addData = {
                arrName: packArrName,
                arrValue: packArrValue,
                deviceDocumentMain: deviceDocumentMain
            };
            axios({
                url: `${this.props.url.equipmentArchive.device}`,
                method: 'post',
                headers: {
                    'Authorization': this.props.url.Authorization
                },
                data: addData,
                // type: 'json'
            }).then((data) => {
                message.info(data.data.message);
                this.props.getRightData(this.props.depCode, this.props.deviceName)
            }).catch(function () {
                message.info('新增失败，请联系管理员！');
            });
            var deviceDocumentMainInit = {
                keyFlag: 0
            };
            this.setState({
                addModalVisable: false,
                deviceDocumentMain: deviceDocumentMainInit,
                newRowData: [],
                statusCode: [],
                startdate: startdate,
                statusCodeInit: deviceDocumentMain.statusCode
            });

        }


    };
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

export default Add