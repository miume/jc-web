import React from 'react';
import axios from 'axios';
import {Modal, Button, message} from 'antd';
import CancleButton from "../../BlockQuote/cancleButton";
import AddModal from "../modal/addModal";

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            newRowData: [],
            uploadData: [{
                url:'',
                name: '上传手册文件',
                code: ''
            }]
        };
        this.handleDetail = this.handleDetail.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.addRowFun = this.addRowFun.bind(this)
        this.addUplodFun = this.addUplodFun.bind(this)
        this.reduceUploadFun = this.reduceUploadFun.bind(this)
    }

    render() {
        const {visible} = this.state;
        return (
            <span>
                <span className="blue" onClick={this.handleDetail}>{this.props.name}</span>
                <Modal
                    title="数据详情"
                    visible={visible}
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
                    <AddModal
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
        const {newRowData} = this.state;
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
        const {uploadData} = this.state;
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