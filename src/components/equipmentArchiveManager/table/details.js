import React from 'react';
import axios from 'axios';
import {message, Modal} from 'antd';
import CancleButton from "../../BlockQuote/cancleButton";
import DetailModal from "../modal/detailModal";

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
            newRowData: [],
            deviceDocumentMain:{},
            deviceStatus:'',
            deptName:'',
            startdate:''

        };
        this.handleDetail = this.handleDetail.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    render() {
        return (
            <span>
                <span className="blue" onClick={this.handleDetail}>详情</span>
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
                        />
                    ]}
                >
                    <DetailModal
                        comFlag={this.props.comFlag}
                        editFlag={true}
                        deviceDocumentMain={this.state.deviceDocumentMain}
                        newRowData={this.state.newRowData}
                        deviceStatus={this.state.deviceStatus}
                        deptName={this.state.deptName}
                        startdate={this.state.startdate}
                    />
                </Modal>
            </span>
        )

    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    handleDetail = () => {
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
        // TODO 获取数据
    }

}

export default Detail