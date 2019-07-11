import React from 'react';
import axios from 'axios';
import {Modal, Button, message} from 'antd';
import CancleButton from "../../BlockQuote/cancleButton";
import DetailModal from "../modal/detailModal";
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
                        />
                    ]}
                >
                    <DetailModal
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
                console.log(res)
                const arrName = res.arrName;
                const arrValue = res.arrValue
                var newRowData = []
                for (var i = 0; i < arrName.length; i++) {
                    newRowData.push({
                        name: arrName[i],
                        value: arrValue[i]
                    })
                }
                console.log(res.startdate)
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

export default Detail