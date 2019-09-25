import React from 'react';
import axios from 'axios';
import {Button, Col, Input, message, Modal, Row} from 'antd';
import CancleButton from "../../../../BlockQuote/cancleButton";
import SaveButton from "../../../../BlockQuote/saveButton";
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
            saveComData: {
                name: '',
                specification: '',
                counts: '',
                unitCode: ''
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
                                        value={this.props.comFlag?this.state.saveComData.name:this.state.saveData.name}
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
                                        value={this.props.comFlag?this.state.saveComData.specification:this.state.saveData.specification}
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
                                        value={this.props.comFlag?this.state.saveComData.counts:this.state.saveData.counts}
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
        if(this.props.comFlag){
            var saveComData = this.state.saveComData
            saveComData[e.target.name] = e.target.value
            this.setState({
                saveComData: saveComData,
            });
        }else{
            var saveData = this.state.saveData
            saveData[e.target.name] = e.target.value
            this.setState({
                saveData: saveData,
            });
        }
    }

    handleAddCancel = () => {
        if(this.props.comFlag){
            this.setState({
                addVisible: false,
                saveComData: {
                    name: '',
                    specification: '',
                    counts: '',
                    unitCode: ''
                },
            });
        }else{
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
    }
    handleAddSave = () => {
        var saveData = {}
        var url = ''
        if(this.props.comFlag){
            saveData = this.state.saveComData
            url=`${this.props.url.equipmentArchive.addUnitAcc}`
        }else{
            saveData = this.state.saveData
            url=`${this.props.url.equipmentArchive.addMainAcc}`
        }
        // const saveData = this.state.saveData
        axios({
            url: url,
            method: 'post',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            data: saveData,
            // type: 'json'
        }).then((data) => {
            if(data.data.code===0){
                message.info(data.data.message);
                this.handleAddCancel()
                this.fetch()
            }else{
                message.info('请重新保存')
                return
            }
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
        if(this.props.comFlag){
            var saveComData = this.state.saveComData;
            saveComData.unitCode = this.props.record.code
            this.setState({
                addVisible: true,
                saveComData: saveComData
            })
        }else{
            var saveData = this.state.saveData;
            saveData.mainCode = this.props.record.code;
            this.setState({
                addVisible: true,
                saveData: saveData
            })
        }
    };
    handleFitting = () => {
        this.fetch();
        this.setState({
            visible: true,
        })
    };
    fetch = () => {
        var url = ''
        if(this.props.comFlag){
            url=`${this.props.url.equipmentArchive.accsUnit}/${this.props.record.code}`
        }else{
            url=`${this.props.url.equipmentArchive.accsMain}/${this.props.record.code}`
        }
        axios({
            url:url,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
        }).then((data) => {
            const res = data.data.data;
            var fittingData = []
            // TODO
            if(res&&res.list){
                var datas = []
                if(res.list){
                    datas = res.list
                }else{
                    datas = res
                }
                for(var i = 0; i< datas.length; i++){
                    const arr = datas[i]
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
                this.setState({
                    fittingData: []
                })
            }
        }).catch(() => {
            message.info('查询失败，请联系管理员！');
        });
    }
    deleteSaveFun = (code) => {
        if(this.props.comFlag){
            axios({
                url:`${this.props.url.equipmentArchive.delUnitAcc}`,
                method:'Delete',
                headers:{
                    'Authorization':this.props.url.Authorization
                },
                params:{
                    id: code
                }
            }).then((data)=>{
                message.info(data.data.message);
                if(data.data.code===0){
                    this.fetch();
                }
            }).catch(()=>{
                message.info('删除失败，请联系管理员！');
            })
        }else{
            axios({
                url:`${this.props.url.equipmentArchive.delMainAcc}/${code}`,
                method:'Delete',
                headers:{
                    'Authorization':this.props.url.Authorization
                }
            }).then((data)=>{
                message.info(data.data.message);
                if(data.data.code===0){
                    this.fetch();
                }
            }).catch(()=>{
                message.info('删除失败，请联系管理员！');
            })
        }
    }

    editSave = (value) => {
        var url='';
        // TODO 调用更新接口
        if(this.props.comFlag){
            url=`${this.props.url.equipmentArchive.updateUnitAccessory}`

        }else{
            url=`${this.props.url.equipmentArchive.updateMainAccessory}`
        }
        axios({
            url:url,
            method:'put',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            data:value
        }).then((data)=>{
            if(data.data.code===0){
                message.info(data.data.message);
                this.fetch();
            }else{
                message.info("请重新保存");
                return
            }
        }).catch(()=>{
            return
            message.info('更新失败，请联系管理员！');
        })
    }
}

export default Fittings
