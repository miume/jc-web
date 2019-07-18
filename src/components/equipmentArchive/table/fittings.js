import React from 'react';
import axios from 'axios';
import {Modal, Button, message,Row,Input,Col} from 'antd';
import CancleButton from "../../BlockQuote/cancleButton";
import SaveButton from "../../BlockQuote/saveButton";
import FittingModal from "../modal/fittingModal";


class Fittings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            fittingData: [],
            saveData: {
                name: '',
                specification: '',
                counts: '',
                mainCode: ''
            },
            addVisible: false
        };
        this.handleFitting = this.handleFitting.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.addRowFun = this.addRowFun.bind(this);
        this.deleteSaveFun = this.deleteSaveFun.bind(this);

        this.handleAddSave = this.handleAddSave.bind(this);
        this.handleAddCancel = this.handleAddCancel.bind(this)
        this.onChangeAdd = this.onChangeAdd.bind(this)
        this.fetch = this.fetch.bind(this)

        this.editSave = this.editSave.bind(this)
    }

    render() {
        return (
            <span>
                <span className="blue" onClick={this.handleFitting}>配件</span>
                <Modal
                    title="配件"
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
                    <div style={{height:'400px'}}>
                        <FittingModal
                            fittingData = {this.state.fittingData}
                            editSave = {this.editSave}
                            deleteSaveFun={this.deleteSaveFun}
                        />
                        <div style={{height:'20px'}} ></div>
                        <Button type="primary" icon="plus" size='large' style={{width:'460px',fontSize:'15px'}} onClick={this.addRowFun}/>
                        <Modal
                            title="新增配件"
                            visible={this.state.addVisible}
                            closable={false}
                            centered={true}
                            maskClosable={false}
                            footer={[
                                <CancleButton
                                    handleCancel={this.handleAddCancel}
                                    flag={true}
                                    key="back"
                                />,
                                <SaveButton
                                    key="save"
                                    handleSave={this.handleAddSave}

                                />
                            ]}
                        >
                            <Row>
                                <Col span={4}>配件名称：</Col>
                                <Col span={20}>
                                    <Input
                                        placeholder="请输入配件名称"
                                        value={this.state.saveData.name}
                                        key="name"
                                        name="name"
                                        onChange={this.onChangeAdd}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>规格：</Col>
                                <Col span={20}>
                                    <Input
                                        placeholder="请输入规格"
                                        value={this.state.saveData.specification}
                                        key="specification"
                                        name="specification"
                                        onChange={this.onChangeAdd}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>数量：</Col>
                                <Col span={20}>
                                    <Input
                                        placeholder="请输入数量"
                                        value={this.state.saveData.counts}
                                        key="counts"
                                        name="counts"
                                        onChange={this.onChangeAdd}
                                    />
                                </Col>
                            </Row>
                        </Modal>
                    </div>
                </Modal>
            </span>
        )

    }
    onChangeAdd = (e) => {
        var saveData = this.state.saveData
        saveData[e.target.name] = e.target.value
        this.setState({
            saveData: saveData,
        });
    }

    handleAddCancel = () => {
        this.setState({
            addVisible: false,
            saveData: {
                name: '',
                specification: '',
                counts: '',
                mainCode: ''
            },
        });
    }
    handleAddSave = () => {
        const saveData = this.state.saveData
        console.log(saveData)
        axios({
            url: `${this.props.url.equipmentArchive.addMainAcc}`,
            method: 'post',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            data: saveData,
            // type: 'json'
        }).then((data) => {
            message.info(data.data.message);
            this.setState({
                addVisible: false,
                saveData: {
                    name: '',
                    specification: '',
                    counts: '',
                    mainCode: ''
                },
            });
            this.fetch()
        }).catch(function () {
            message.info('新增失败，请联系管理员！');
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    addRowFun = () => {
        var saveData = this.state.saveData;
        saveData.mainCode = this.props.record.code;
        this.setState({
            addVisible: true,
            saveData: saveData
        })
    };
    handleFitting = () => {
        this.fetch();
        this.setState({
            visible: true,
        })
    };
    fetch = () => {
        axios({
            url: `${this.props.url.equipmentArchive.accsMain}/${this.props.record.code}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
        }).then((data) => {
            const res = data.data.data;
            var fittingData = []
            // TODO
            if(res&&res.list){
                for(var i = 0; i< res.list.length; i++){
                    const arr = res.list[i]
                    fittingData.push({
                        name:arr.name,
                        specification:arr.specification,
                        counts:arr.counts,
                        code:arr.code
                    })
                }
                this.setState({
                    fittingData: fittingData
                })
            }else{
                for(var j = 0; j< res.length; j++){
                    const arr = res[j]
                    fittingData.push({
                        name:arr.name,
                        specification:arr.specification,
                        counts:arr.counts,
                        code:arr.code
                    })
                }
                this.setState({
                    fittingData: fittingData
                })
            }
        }).catch(() => {
            message.info('查询失败，请联系管理员！');
        });
    }
    deleteSaveFun = (code) => {
        console.log(code)
        // TODO 直接调用删除接口，改变数据
        // if (index > -1) {
        //     data.splice(index, 1);
        //
        //     this.setState({ data: data });
        // } else {
        //     this.setState({ editingKey: data });
        // }
    }

    editSave = (value) => {
        console.log(value)
        // TODO 调用更新接口
    }
}

export default Fittings