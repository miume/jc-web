import React, {Component} from 'react';
import {Modal, Form, Input, DatePicker, Select,Col,Switch} from 'antd';
import NewButton from '../../BlockQuote/newButton';
import SaveButton from '../../BlockQuote/saveButton';
import CancleButton from '../../BlockQuote/cancleButton';
import AddModal from '../modal/addModal'
import moment from "moment";

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addModalVisable: false,
            newRowData: [],
            uploadData: [{
                url:'',
                name: '上传手册文件',
                code: ''
            }]
        };
        this.handleAdd = this.handleAdd.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.addRowFun = this.addRowFun.bind(this)
        this.addUplodFun = this.addUplodFun.bind(this)
        this.reduceUploadFun = this.reduceUploadFun.bind(this)
    }
    render() {
        return (
            <span>
                <NewButton handleClick={this.handleAdd} name='新增' className='fa fa-plus'/>
                <Modal
                    title="数据详情"
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

    handleAdd = () => {
        this.setState({
            addModalVisable: true
        })
    };
    handleCancel = () => {
        this.setState({
            addModalVisable: false
        })
    };
    handleSave = () => {

    };
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

export default Add