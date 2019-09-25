import React from 'react';
import {Input, message, Modal, Row} from 'antd';
import CancleButton from "../../../BlockQuote/cancleButton";
import NewButton from "../../../BlockQuote/newButton";
import axios from "axios";
import './equipmentStatus.css'
import {SketchPicker} from 'react-color';

class AddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            saveData:{
                name: '',
                color: ''
            },
            background: '',
            colorVisible: false
        }
        this.handleAdd = this.handleAdd.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleOk = this.handleOk.bind(this)
        this.onchange = this.onchange.bind(this)
        this.handleChangeColor = this.handleChangeColor.bind(this)
        this.handleColorCancel = this.handleColorCancel.bind(this)
        this.handleColorOk = this.handleColorOk.bind(this)

    }

    render() {
        return (
            <span>
                <NewButton handleClick={this.handleAdd} name='新增' className='fa fa-plus' />
                <Modal
                    visible={this.state.visible}
                    title="新增"
                    closable={false}
                    width='360px'
                    centered={true}
                    className='modal'
                    maskClosable={false}
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <NewButton key="submit" handleClick={this.handleOk} name='确定' style='button' className='fa fa-check' />
                    ]}
                >
                    <Row>
                        <Input key="input" placeholder="请输入设备状态名称" onChange={this.onchange} value={this.state.saveData.name}/>
                    </Row>
                    <Row>
                        {
                            this.state.background===''?
                                <div className="eqStatus-unSelect-color" onClick={this.handleColorSelect}>请选择颜色</div>:
                                <div className="eqStatus-inSelect-color" onClick={this.handleColorSelect} style={{background:`${this.state.background}`}}>设备已选择颜色</div>
                        }
                        <Modal
                            visible={this.state.colorVisible}
                            title="颜色选择"
                            closable={false}
                            width='259px'
                            centered={true}
                            className='modal'
                            maskClosable={false}
                            footer={[
                                <CancleButton key='back' handleCancel={this.handleColorCancel}/>,
                                <NewButton key="submit" handleClick={this.handleColorOk} name='确定' style='button' className='fa fa-check' />
                            ]}
                        >
                            <SketchPicker
                                color={ this.state.background }
                                onChangeComplete={ this.handleChangeColor }
                                disableAlpha={true}
                            />
                        </Modal>
                    </Row>

                </Modal>
            </span>
        );
    }

    // 颜色函数
    handleColorSelect = () => {
        this.setState({ colorVisible: true});
    }
    handleChangeColor = (color) => {
        console.log(color.hex)
        this.setState({ background: color.hex });
    };
    handleColorCancel = () => {
        this.setState({
            colorVisible: false,
            background: ''
        });
    }
    handleColorOk = () => {
        const background = this.state.background
        var saveData = this.state.saveData;
        saveData.color = background;
        this.setState({
            colorVisible: false,
            saveData: saveData
        });
    }






    handleAdd = () => {
        this.setState({
            visible: true
        })
    }
    handleOk = () => {
        const saveData = this.state.saveData;
        if(saveData.color === ''){
            message.info("请选择颜色")
            return
        }
        if(saveData.name === ''){
            message.info("请输入设备状态名称")
            return
        }
        console.log(saveData)
        axios({
            url : `${this.props.url.equipmentStatus.deviceStatus}`,
            method:'post',
            headers:{
                'Authorization': this.props.url.Authorization
            },
            data: saveData,
            type:'json'
        }).then((data) => {
            message.info(data.data.message);
            this.props.fetch();
        }).catch(function () {
            message.info('新增失败，请联系管理员！');
        });
        this.setState({
            visible: false,
            saveData: {
                name: '',
                color: ''
            }
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            saveData: {
                name: '',
                color: ''
            }
        })
    }
    onchange = (e) => {
        var saveData = this.state.saveData;
        saveData.name = e.target.value;
        this.setState({
            saveData: saveData
        })
    }


}

export default AddModal
