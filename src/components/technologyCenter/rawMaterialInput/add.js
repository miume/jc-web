import React from 'react';
import NewButton from "../../BlockQuote/newButton";
import CancleButton from "../../BlockQuote/cancleButton";
import {message, Modal,Row,Input} from "antd";
import axios from "axios";

class Add extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            visible:false,
            saveData:{
                materialName:'',
                materialClass:1,
                manufacturerName:''
            }
        }
    }

    render() {
        return (
            <span>
                <NewButton
                    handleClick={this.showModal}
                    name='新增'
                    style='button'
                    className='fa fa-plus'
                />
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
                        <Input placeholder="请输入物料名称(必填)" value={this.state.saveData.materialName ? this.state.saveData.materialName : ''} key="materialName" name="materialName" onChange={this.change}/>
                    </Row>
                    <Row>
                        <Input placeholder="请输入所属工厂(必填)" value={this.state.saveData.manufacturerName ? this.state.saveData.manufacturerName : ''} key="manufacturerName" name="manufacturerName" onChange={this.change}/>
                    </Row>

                </Modal>
            </span>
        );
    }
    change = (e) => {
        var saveData = this.state.saveData;
        saveData[e.target.name] = e.target.value;
        this.setState({
            saveData:saveData
        })
    }
    showModal = () => {
        this.setState({ visible: true });
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };
    handleOk = () => {
        var saveData = this.state.saveData
        console.log(saveData)
        const materialClass = parseInt(this.props.materialClass)
        saveData['materialClass'] = materialClass
        console.log(saveData)
        axios({
            url: `${this.props.url.serialNumber.serialNumber}`,
            method: 'post',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            data: saveData,
            type: 'json'
        }).then((data) => {
            message.info(data.data.message);
            this.props.getRaw(materialClass);
            this.setState({
                visible: false,
                saveData:{
                    materialName:'',
                    materialClass:1,
                    manufacturerName:''
                }
            });
        }).catch(()=>{
            message.info('操作失败，请联系管理员！');
        });

    }

}
export default Add
