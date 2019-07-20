import React from 'react';
import axios from 'axios';
import {Modal,message,Select,Input,Row,Col,Icon} from 'antd';
import Submit from '../BlockQuote/checkSubmit';
import NewButton from '../BlockQuote/newButton';
import SaveButton from '../BlockQuote/saveButton';
import CancleButton from '../BlockQuote/cancleButton';
import "./eqMaintenanceDataEntry.css"
const Option = Select.Option;
class Mmodal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            maintenanceItems: '',
            maintenanceContent: '',
            optType: '',
            maintenanceFrequency: ''
        }
        this.handleAdd = this.handleAdd.bind(this)
        this.onCanCel = this.onCanCel.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.onInputChange=this.onInputChange.bind(this)
        this.handleChange2=this.handleChange2.bind(this)
    }
    componentDidMount() {
        this.setState({
            maintenanceItems: this.props.maintenanceItems,
            maintenanceContent: this.props.maintenanceContent,
            optType: this.props.optType,
            maintenanceFrequency: this.props.maintenanceFrequency
        })
    }
    handleAdd = () => {
        this.setState({visible: true})
    }
    handleSave = (code) => {

        this.setState({visible:false})
        var ooptType=0;
        if(this.state.OptType=== '0'){
            ooptType=0;
        }else{
            ooptType=1;
        }
        if(ooptType === 1)
            var addData = {
                code:this.props.code,
                deviceName:this.props.clickdeviceName,
                maintenanceContent:this.state.maintenanceContent,
                maintenanceFrequency:this.state.maintenanceFrequency,
                maintenanceItems: this.state.maintenanceItems,
                optType :ooptType,
            }
        if(addData.maintenanceContent&&addData.maintenanceItems&&addData.optType){
            axios({
                url: `${this.props.url.eqMaintenanceDataEntry.maintenance}`,
                method: 'put',
                headers: {
                    'Authorization': this.props.url.Authorization
                },
                data: addData,
                type: 'json'
            }).then((data) => {
                this.props.ffetch(this.props.clickdeviceName)
                // this.props.fetch()
                message.info(data.data.message);
            })}
        else{
            message.info('不能有空项出现')
        }
    }
    onCanCel = () => {
        this.setState({visible: false})
    }
    handleChange=(value) => {
        this.setState({
            optType:value
        })
        console.log(`selected ${value}`);
    }
    handleChange2=(value) => {
        this.setState({
            deviceName:value
        })
        console.log(`selected ${value}`);
    }
    onInputChange=(e)=>{
        let InputName=e.target.name;
        let InputValue=e.target.value;
        this.setState({
            [InputName] : InputValue,
        })
    }
    // handleChangeproject=() =>{
    //     this.setState({Data:[{
    //         maintainceproject:
    //         }]})
    // }
    render() {
        return (
            <span>
            <span className='blue' onClick={this.handleAdd}>编辑</span>
            <Modal
                visible={this.state.visible}
                closable={false}
                centered={true}
                onCancle={this.handleCancel}
                maskClosable={false}
                width="804px"
                title="设备保养-项目录入"
                footer={[
                    <SaveButton
                        key="save"
                        handleSave={this.handleSave }
                    />,
                    <CancleButton key='cancel' handleCancel={this.onCanCel} />,

                ]}
            >

                <div className='eqMaintenance-eqblockb'>
                    <Row type="flex" justify="start" style={{paddingTop:"15px"}} >
                        <Col span={1.5} style={{paddingTop:"5px"}}>
                            设备名称:
                        </Col>
                        <Col span={10}>
                            <Select Value={this.props.clickdeviceName} defaultValue={this.props.clickdeviceName}  style={{width:"315px"}} dropdownMatchSelectWidth='false'  disabled="true">
                            </Select>
                        </Col>
                       <Col span={1.5} style={{paddingTop:"5px"}}>
                            保养项目:
                        </Col>
                        <Col span={10}>
                            <Input size="small" Value={this.props.maintenanceItems}  style={{width:"313px"}}key='2'
                                   name="maintenanceItems" onChange={this.onInputChange}/>
                        </Col>
                    </Row>


                    <Row type="flex" justify="start" style={{paddingTop:"15px"}}>
                        <Col span={1.5} style={{paddingTop:"5px"}}>
                            保养内容:
                        </Col>
                        <Col span={10} style={{paddingRight:"20px"}} >
                            <Input size="small" Value={this.props.maintenanceContent} key='3' name="maintenanceContent" onChange={this.onInputChange}/>
                        </Col>

                        <Col span={1.5} style={{paddingTop:"5px"}}>
                            操作类型:
                        </Col>
                        <Col span={10}>
                            <Select   onChange={this.handleChange} name="optType" style={{ width:"313px"}} Value={this.props.optType}>
                                <Option value='0'>勾选</Option>
                                <Option value='1'>录入</Option>
                            </Select>
                        </Col>
                    </Row>


                    <Row type="flex" justify="start" style={{paddingTop:"15px"}}>
                        <Col span={1.5} style={{paddingTop:"5px" ,paddingRight:"5px"}}>
                            &nbsp;&nbsp;&nbsp;频率:&nbsp;&nbsp;&nbsp;
                        </Col>
                        <Col span={10} style={{paddingRight:"20px"}}>
                            <Input size="small" placeholder="请输入保养内容"  key='4' name="maintenanceFrequency"onChange={this.onInputChange}
                                   Value={this.props.maintenanceFrequency}/>
                        </Col>
                    </Row>
                </div>
            </Modal>
            </span>)
    }
}
export default Mmodal
