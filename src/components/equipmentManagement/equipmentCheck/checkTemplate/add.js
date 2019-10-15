import React from 'react';
import { Button, Modal,Select,Form, Input,message,Icon,Col, Row,Upload,Radio,Divider,DatePicker } from 'antd';
import axios from 'axios';
import AddButton from '../../../BlockQuote/newButton';
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";
import "./checkTemplate.css";
import moment from "moment";
import locale from 'antd/lib/date-picker/locale/zh_CN';
import PictureUp from './upload';

let id = 0;

class AddBut extends React.Component{
    url
    ob
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            radioValue:false,
            date:"",
            fileList0:[],
        }

    };

    remove = (k) =>{
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        // const fileList = `fileList${k}`;
        // if(this.state[fileList][0] !== undefined){
        //     var list = []
        //     list.push(this.state[fileList][0].response.data)
        //     // if(this.state[fileList] != false){
        //     //     axios({
        //     //         url: `${this.url.instructor.deletePic}`,
        //     //         method:'delete',
        //     //         headers:{
        //     //             'Authorization': this.url.Authorization
        //     //         },
        //     //         data:list,
        //     //         type:'json'
        //     //     }).then((data)=>{
        //     //         message.info(data.data.message);
        //     //     })
        //     // }
        // }
        if(keys.length === 1){
            return;
        }
        form.setFieldsValue({
            keys:keys.filter(key => key!==k),
        })
    };

    add = () =>{
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(++id);
        this.state['fileList'+`${id}`] = [];
        form.setFieldsValue({
            keys: nextKeys,
        });
    };
    onChange = (e)=>{
        this.setState({
            radioValue:e.target.value
        })
    }
    onChangeTime = (date) =>{
        // console.log(date.target.value)
        // console.log(moment(date).format('YYYY-MM-DD HH:mm:ss'))
        this.setState({
            date:date.target.value
        })
        // console.log(moment(date).format('YYYY-MM-DD HH:mm:ss'))
    }
    showModal = () => {
        this.setState({ visible: true });
    };

    handleChange = (fileList,k) =>{
        // console.log(k.fileList)
        this.setState({
            [fileList]:k.fileList
        })
    }

    handleCancel = () => {
    // const form = this.formRef.props.form;
    const keys = this.props.form.getFieldValue('keys');
    for(var i =0;i<keys.length;i++){
        let file = `fileList${keys[i]}`
        this.setState({
            [file]:[]
        })
    };
    this.props.form.resetFields();
    this.setState({ visible: false });
    // this.props.form.resetFields();
    // form.resetFields();
    };
    handleCreate = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values)=>{
            if(err){
                return ;
            }
            // console.log(values)
            let data = {};
            let deviceSpotcheckModelsDetails = [];
            let deviceSpotcheckModelsHead = {};
            let peopleName = "string";
            deviceSpotcheckModelsHead.deviceName = this.props.deviceName;
            deviceSpotcheckModelsHead.modelName = this.state.date;
            deviceSpotcheckModelsHead.modelStatus = this.state.radioValue;
            deviceSpotcheckModelsHead.setPeople = parseInt(this.ob.userId);
            deviceSpotcheckModelsHead.deptCode = this.props.deptCode;
            deviceSpotcheckModelsHead.tabulateDate = moment().locale('zh-cn').format('YYYY-MM-DD HH:mm:ss');
            this.setState({ visible: false});
            for(var i=0;i<values.keys.length;i++){
                deviceSpotcheckModelsDetails.push({})
            }
            for(var i=0;i<values.keys.length;i++){
                let file = `fileList${values.keys[i]}`
                deviceSpotcheckModelsDetails[i]["spotcheckAddress"] = this.state[file].length === 0 ? null :this.state[file][0].response.data
                deviceSpotcheckModelsDetails[i]["spotcheckContent"] = values.content[values.keys[i]];
                deviceSpotcheckModelsDetails[i]["spotcheckItems"] = values.standard[values.keys[i]];
                deviceSpotcheckModelsDetails[i]["spotcheckPeriod"] = values.frequency[values.keys[i]];
            }
            data["deviceSpotcheckModelsDetails"] = deviceSpotcheckModelsDetails;
            data["deviceSpotcheckModelsHead"] = deviceSpotcheckModelsHead;
            data["peopleName"] = peopleName;

            // console.log(data)
            if(this.state.date==""){
                message.info("新增失败,时间不能为空");
                return
            }
            axios({
                url:`${this.url.deviceSpot.addCheck}`,
                method:"post",
                data:data,
                type:"json"
            }).then((data)=>{
                if(data.data.code !== 0){
                    message.info('新增失败')
                  this.setState({
                    visible:true
                  })
                }else{
                    message.info(data.data.message);
                    this.props.getTableData({
                        page:1,
                        size:10,
                        deviceName:this.props.deviceName,
                        deptId:this.props.deptCode,
                    });
                    const keys = this.props.form.getFieldValue('keys');
                    for(var i =0;i<keys.length;i++){
                        let file = `fileList${keys[i]}`
                        this.setState({
                            [file]:[]
                        })
                    };
                    this.props.form.resetFields();
                    this.setState({ visible: false});
                }
            })
        })

    };

    render(){
        const { getFieldDecorator, getFieldValue } = this.props.form;
        this.url = JSON.parse(localStorage.getItem('url'));
        this.ob = JSON.parse(localStorage.getItem('menuList'));
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        getFieldDecorator('keys', { initialValue: [0] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k,index)=>(
            <div key={index}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                <Form.Item label="项目名称">
                    {getFieldDecorator(`content[${k}]`,{
                        validateTrigger: ['onChange', 'onBlur'],
                    })(
                        <Input placeholder='请输入项目名称' style={{width:'150px'}}/>
                    )}
                </Form.Item>

                <Form.Item label="点检标准">
                    {getFieldDecorator(`standard[${k}]`,{
                        validateTrigger: ['onChange', 'onBlur'],
                    })(
                        <Input placeholder='请输入点检标准' style={{width:'150px'}}/>
                    )}
                </Form.Item>

                <Form.Item label="点检周期">
                    {getFieldDecorator(`frequency[${k}]`,{
                        validateTrigger: ['onChange', 'onBlur'],
                    })(
                        <Input placeholder='请输入点检周期' style={{width:'150px'}}/>
                    )}
                </Form.Item>

                {/* <Form.Item style={{marginRight: 4 }}>
                    {
                        <Upload />
                    }
                </Form.Item> */}

                <Form.Item style={{marginRight: 4 }}>
                    {
                        <PictureUp k={k} handleChange={this.handleChange} fileList={this.state[`fileList${k}`]}/>
                    }
                </Form.Item>

                <Form.Item>
                {keys.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        disabled={keys.length === 1}
                        onClick={() => this.remove(k)}
                    />
                ) : null}
                </Form.Item>
                </div>
            </div>
        ))
        return(
            <span>
                <AddButton handleClick={this.showModal} name='新增' className='fa fa-plus' />
                <Modal
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    title="新增"
                    width='1000px'
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <SaveButton key="define" handleSave={this.handleCreate} className='fa fa-check' />,
                    ]}
                >
                    <Form>
                        <span className="headers">所属部门：</span><span className="checkName">{this.props.deptName}</span>
                        <span className="headers">设备名称：</span><span className="checkName">{this.props.deviceName}</span>
                        <span className="headers">模板名称：</span><span><Input style={{width:'200px'}} onChange={this.onChangeTime} placeholder="请输入名称"/></span>
                        <div className="radios">
                            模板状态：<Radio.Group onChange={this.onChange} value={this.state.radioValue}>
                            <Radio value={false}>生效</Radio>
                            <Radio value={true}>失效</Radio>
                        </Radio.Group>
                        </div>
                        <Divider />
                        <div id="edit" style={{height:'360px'}}>
                            {formItems}
                            <Form.Item {...formItemLayoutWithOutLabel}>
                                <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                                <Icon type="plus" /> 添加一行
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
            </Modal>
            </span>
        )
    }
}

const WrappedDynamicFieldSet = Form.create({ name: 'dynamic_form_item' })(AddBut);

export default WrappedDynamicFieldSet
