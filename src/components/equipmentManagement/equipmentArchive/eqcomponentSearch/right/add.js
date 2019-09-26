import React, {Component} from 'react';
import {message, Modal} from 'antd';
import NewButton from '../../../../BlockQuote/newButton';
import SaveButton from '../../../../BlockQuote/saveButton';
import CancleButton from '../../../../BlockQuote/cancleButton';
import AddModal from '../modal/addModal'
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
            statusCodeInit:'',

            defaultFileList: []
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
        this.handleUploadChange = this.handleUploadChange.bind(this)
        this.handleUploadRemove = this.handleUploadRemove.bind(this)
    }

    render() {
        // 处理上传
        // const uploadProps = {
        //     onRemove: file => {
        //         this.setState(state => {
        //             const index = state.fileList.indexOf(file);
        //             const newFileList = state.fileList.slice();
        //             newFileList.splice(index, 1);
        //             console.log(newFileList)
        //             return {
        //                 fileList: newFileList,
        //             };
        //         });
        //     },
        //     action: this.props.url.equipmentArchive.upload,
        //     headers: {
        //         'Authorization': this.props.url.Authorization,
        //     },
        //     onChange: this.handleUploadChange,
        //     multiple: true,
        // };
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
                        url={this.props.url}
                        comFlag={this.props.comFlag}
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

                        // fileList={this.state.fileList}
                        // uploadProps = {uploadProps}
                        // handleUploadChange={this.handleUploadChange}
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
        if(this.props.comFlag){
            this.setState({
                addModalVisable: true,
                startdate: startdate
            })
        }else{
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
        }

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
        if(this.props.comFlag){
            deviceDocumentMain["mainCode"] = this.props.mainCode
            deviceDocumentMain["deptCode"] = this.props.deptCode
        }else{
            deviceDocumentMain["deptCode"] = this.props.deptCode
        }
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
            var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥\\\\……&*（）——|{}【】‘；：”“'。，、？]")
            for (var ii = 0; ii < deviceDocumentMain.deviceName.length; ii++) {
                if(pattern.test(deviceDocumentMain.deviceName.substr(ii, 1))){
                    if(this.props.comFlag){
                        message.info("部件名称存在非法字符，请重新输入部件名称")
                    }else{
                        message.info("设备名称存在非法字符，请重新输入设备名称")
                    }
                    return
                }
            }
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
            if (deviceDocumentMain.startdate || deviceDocumentMain.startdate === undefined) {
                deviceDocumentMain.startdate = startdate;
            }
            if(this.props.comFlag){
                var addData = {
                    arrName: packArrName,
                    arrValue: packArrValue,
                    deviceDocumentUnit: deviceDocumentMain
                };
                axios({
                    url: `${this.props.url.equipmentArchive.addUnit}`,
                    method: 'post',
                    headers: {
                        'Authorization': this.props.url.Authorization
                    },
                    data: addData,
                    // type: 'json'
                }).then((data) => {
                    if(data.data.code===0){
                        message.info(data.data.message);
                        this.props.fetch({},{});
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
                    }else{
                        message.info("请重新保存");
                        return
                    }
                    // message.info(data.data.message);
                    // this.props.fetch({},{})
                }).catch(function () {
                    message.info('新增失败，请联系管理员！');
                });
            }else{
                var addData = {
                    arrName: packArrName,
                    arrValue: packArrValue,
                    deviceDocumentMain: deviceDocumentMain
                };
                console.log(addData)
                axios({
                    url: `${this.props.url.equipmentArchive.device}`,
                    method:'post',
                    headers: {
                        'Authorization': this.props.url.Authorization
                    },
                    data: addData,
                    // type: 'json'
                }).then((data) => {
                    if(data.data.code===0){
                        message.info(data.data.message);
                        this.props.getRightData(this.props.deptCode, this.props.deviceName);
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
                    }else{
                        message.info("请重新保存");
                        return
                    }
                }).catch(function () {
                    message.info('新增失败，请联系管理员！');
                });
            }

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
    };
    handleUploadRemove = () => {
        // file => {
        //     this.setState(state => {
        //         const index = state.fileList.indexOf(file);
        //         const newFileList = state.fileList.slice();
        //         newFileList.splice(index, 1);
        //         return {
        //             fileList: newFileList,
        //         };
        //     });
        // }
    }
    handleUploadChange = (info) => {
        // const fileList =  [...info.fileList];
        // console.log(fileList)
        // this.setState({
        //     fileList: fileList
        // });
        //
        // // this.setState({
        // //     uploading: true,
        // // });
        // if (info.file.status !== 'uploading') {
        //     console.log(info.file, info.fileList);
        // }
        // if (info.file.status === 'done') {
        //     message.success(`${info.file.name} file uploaded successfully`);
        // } else if (info.file.status === 'error') {
        //     message.error(`${info.file.name} file upload failed.`);
        // }
    };
}

export default Add
