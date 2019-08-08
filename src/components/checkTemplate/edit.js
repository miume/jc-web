import React from 'react';
import axios from 'axios';
import { Button, Modal,Select,Form, Input,message,Icon,Col, Row,Upload,Radio,Divider,DatePicker } from 'antd';
import CancleButton from "../BlockQuote/cancleButton";
import SaveButton from "../BlockQuote/saveButton";
import moment from "moment";
import locale from 'antd/lib/date-picker/locale/zh_CN';

const timeFormat = "YYYY-MM-DD"

class Edit extends React.Component{
    url
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            radioValue:false,
            date:"",
            deviceSpotcheckModelsDetails:[],
            effectDate:"",
            tabulateDate:"",
            peopleName:""
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

    onChange = (e)=>{
        this.setState({
            radioValue:e.target.value
        })
    }

    add = () =>{
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(++this.state.deviceSpotcheckModelsDetails.length-1);
        // this.state['fileList'+`${id}`] = []
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    fetch = (id) => {
        // console.log(id)
        axios({
            url:`${this.url.deviceSpot.checkDetail}`,
            method:"GET",
            params:{id:id},
            headers:{
                'Authorization':this.url.Authorization
            },
        }).then((data) => {
            // console.log(data)
            const res = data.data.data;
            // console.log(res)
            if(res){
                this.setState({
                    data : res,
                    // effectDate:res.deviceSpotcheckModelsHead.effectDate,
                    tabulateDate:res.deviceSpotcheckModelsHead.tabulateDate,
                    peopleName:res.peopleName,
                    radioValue:res.deviceSpotcheckModelsHead.modelStatus,
                    deviceSpotcheckModelsDetails:res.deviceSpotcheckModelsDetails,
                    date:res.deviceSpotcheckModelsHead.effectDate.toString()
                })
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    onChangeTime = (date, dateString) =>{
        // console.log(moment(date).format('YYYY-MM-DD HH:mm:ss'))
        this.setState({
            date:moment(date).format('YYYY-MM-DD HH:mm:ss')
        })
        // console.log(moment(date).format('YYYY-MM-DD HH:mm:ss'))
    }
    showModal = () => {
        this.fetch(this.props.code)
        this.setState({ visible: true });
    };

    handleCancel = () => {
        // const form = this.formRef.props.form;
        this.props.form.resetFields();
        this.setState({ visible: false });
        // this.props.form.resetFields();
        // form.resetFields();
    };

    handleCreate=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err,values)=>{
            if(err){
                return ;
            }
            // console.log(values)
            let data = {};
            let deviceSpotcheckModelsDetails = [];
            let deviceSpotcheckModelsHead = {};
            let peopleName = "string";
            deviceSpotcheckModelsHead.deviceName = this.props.deviceName;
            deviceSpotcheckModelsHead.effectDate = this.state.date;
            deviceSpotcheckModelsHead.modelStatus = this.state.radioValue;
            deviceSpotcheckModelsHead.setPeople = parseInt(this.ob.userId);
            deviceSpotcheckModelsHead.deptCode = this.props.deptCode;
            deviceSpotcheckModelsHead.code = this.props.code;
            deviceSpotcheckModelsHead.tabulateDate = this.state.tabulateDate;
            this.setState({ visible: false});
            for(var i=0;i<values.keys.length;i++){
                deviceSpotcheckModelsDetails.push({})
            }
            for(var i=0;i<values.keys.length;i++){
                deviceSpotcheckModelsDetails[i]["spotcheckAddress"] = values.address[values.keys[i]];
                deviceSpotcheckModelsDetails[i]["spotcheckContent"] = values.content[values.keys[i]];
                deviceSpotcheckModelsDetails[i]["spotcheckItems"] = values.standard[values.keys[i]];
                deviceSpotcheckModelsDetails[i]["spotcheckPeriod"] = values.frequency[values.keys[i]];
                deviceSpotcheckModelsDetails[i]["modelCode"] = this.props.code;
            }
            data["deviceSpotcheckModelsDetails"] = deviceSpotcheckModelsDetails;
            data["deviceSpotcheckModelsHead"] = deviceSpotcheckModelsHead;
            data["peopleName"] = peopleName;

            // console.log(data)
            axios({
                url:`${this.url.deviceSpot.updateCheckModel}`,
                method:"put",
                data:data,
                type:"json"
            }).then((data)=>{
                if(data.data.code !== 0){
                    message.info('编辑失败')
                  this.setState({
                    visible:true
                  })
                }else{
                    message.info(data.data.message);
                    this.props.getTableData({
                        page:1,
                        size:10,
                        deviceName:this.props.deviceName,
                        deptId:this.props.deptmentCode,
                    });
                    this.props.form.resetFields();
                    this.setState({ visible: false});
                }
            })
        })
    }

    render(){
        const { getFieldDecorator, getFieldValue } = this.props.form;
        var array = [];
        for(var i=0;i<this.state.deviceSpotcheckModelsDetails.length;i++){
            array.push(i);
        }
        this.url = JSON.parse(localStorage.getItem('url'));
        this.ob = JSON.parse(localStorage.getItem('menuList'));
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        getFieldDecorator('keys', { initialValue: array });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k,index)=>(
            <div key={index}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                <Form.Item>
                    {getFieldDecorator(`content[${k}]`,{
                        validateTrigger: ['onChange', 'onBlur'],
                        initialValue:this.state.deviceSpotcheckModelsDetails[k]?this.state.deviceSpotcheckModelsDetails[k].spotcheckContent:undefined
                    })(
                        <Input placeholder='请输入项目名称' style={{width:'150px'}}/>
                    )}
                </Form.Item>
              
                <Form.Item>
                    {getFieldDecorator(`standard[${k}]`,{
                        validateTrigger: ['onChange', 'onBlur'],
                        initialValue:this.state.deviceSpotcheckModelsDetails[k]?this.state.deviceSpotcheckModelsDetails[k].spotcheckItems:undefined
                    })(
                        <Input placeholder='请输入点检标准' style={{width:'150px'}}/>
                    )}
                </Form.Item>
              
                <Form.Item>
                    {getFieldDecorator(`frequency[${k}]`,{
                        validateTrigger: ['onChange', 'onBlur'],
                        initialValue:this.state.deviceSpotcheckModelsDetails[k]?this.state.deviceSpotcheckModelsDetails[k].spotcheckPeriod:undefined
                    })(
                        <Input placeholder='请输入点检周期' style={{width:'150px'}}/>
                    )}
                </Form.Item>
             
                {/* <Form.Item style={{marginRight: 4 }}>
                    {
                        <Upload />
                    }
                </Form.Item> */}
              
                <Form.Item>
                    {getFieldDecorator(`address[${k}]`,{
                        validateTrigger: ['onChange', 'onBlur'],
                        initialValue:this.state.deviceSpotcheckModelsDetails[k]?this.state.deviceSpotcheckModelsDetails[k].spotcheckAddress:undefined
                    })(
                        <Input placeholder='图片' style={{width:'150px'}}/>
                    )}
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
                <span onClick={this.showModal} className="blue">编辑</span>
                <Modal 
                    title='编辑' visible={this.state.visible}
                    closable={false} centered={true}
                    maskClosable={false}
                    width='800px'
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <SaveButton key="define" handleSave={this.handleCreate} className='fa fa-check' />,
                    ]}
                >
                    <Form>
                        <span className="headers">所属部门：</span><span className="checkName">{this.props.deptName}</span>
                            <span className="headers">设备名称：</span><span className="checkName">{this.props.deviceName}</span>
                            <span className="headers">生效日期：</span><span><DatePicker format="YYYY-MM-DD" locale={locale} showTime={true} style={{width:'200px'}} value={moment(this.state.date,timeFormat)} onChange={this.onChangeTime} placeholder="请选择时间"/></span>
                            <div className="radios">
                            <span className="headers">模板状态：</span><Radio.Group onChange={this.onChange} value={this.state.radioValue}>
                                <Radio value={false}>生效</Radio>
                                <Radio value={true}>失效</Radio>
                            </Radio.Group>
                            <span className="headersPerson">制表人：</span><span className="checkName">{this.state.peopleName?this.state.name:"管理员"}</span>
                            <span className="headersDate">制表日期：</span><span className="checkName">{this.state.tabulateDate}</span>
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

const WrappedDynamicFieldSet = Form.create({ name: 'dynamic_form_item' })(Edit);

export default WrappedDynamicFieldSet