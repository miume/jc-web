import React from 'react';
import axios from 'axios';
import { Button, Modal,Form, Input,message,Icon,Radio,Divider} from 'antd';
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";
import Tr from './editTr';

class Edit extends React.Component{
    url
    server
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
        if(keys.length === 1){
            return;
        }
        form.setFieldsValue({
            keys:keys.filter(key => key!==k),
        })
    };

    onChange = (e) => {
        this.setState({
            radioValue:e.target.value
        })
    }

    add = () =>{
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(++this.state.deviceSpotcheckModelsDetails.length-1);
        this.state['fileList'+`${this.state.deviceSpotcheckModelsDetails.length-1}`] = [];
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    fetch = (id) => {
        axios({
            url:`${this.url.deviceSpot.checkDetail}`,
            method:"GET",
            params:{id:id},
            headers:{
                'Authorization':this.url.Authorization
            },
        }).then((data) => {
            const res = data.data.data;
            if(res){
                const content = res.deviceSpotcheckModelsDetails
                this.setState({
                    data : res,
                    tabulateDate:res.deviceSpotcheckModelsHead.tabulateDate,
                    peopleName:res.peopleName,
                    radioValue:res.deviceSpotcheckModelsHead.modelStatus,
                    deviceSpotcheckModelsDetails:res.deviceSpotcheckModelsDetails,
                    date:res.deviceSpotcheckModelsHead.modelName.toString()
                })
                for(var i=0;i<content.length;i++){
                    var fileList = `fileList${i}`
                    let data = [{response:{}}]
                    data[0].uid = content[i].spotcheckAddress
                    data[0].url = `${this.server}/jc/common/spotCheck/model/${content[i].spotcheckAddress}`
                    data[0].name = content[i].spotcheckAddress
                    data[0].response.data = content[i].spotcheckAddress
                    this.setState({
                        [fileList]:data,
                    })
                }
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    onChangeTime = (date) =>{
        this.setState({
            date:date.target.value
        })
    }
    showModal = () => {
        this.fetch(this.props.code);
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.props.form.resetFields();
        this.setState({ visible: false });
    };

    handleCreate=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err,values)=>{
            if(err){
                return ;
            }
            let data = {};
            let deviceSpotcheckModelsDetails = [];
            let deviceSpotcheckModelsHead = {};
            let peopleName = "string";
            deviceSpotcheckModelsHead.deviceName = this.props.deviceName;
            deviceSpotcheckModelsHead.modelName = this.state.date;
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
                let file = `fileList${values.keys[i]}`
                deviceSpotcheckModelsDetails[i]["spotcheckAddress"] = this.state[file].length === 0 ? null :this.state[file][0].response.data
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
    handleChange = (fileList,k) =>{
        this.setState({
            [fileList]:k.fileList
        })
    }

    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        this.ob = JSON.parse(localStorage.getItem('menuList'));
        this.server = localStorage.getItem('server');
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        let {updateFlag}=this.props
        return(
            <span>
                <span onClick={this.showModal} className={updateFlag?'blue':'hide'}>编辑</span>
                <Modal
                    title='编辑' visible={this.state.visible}
                    closable={false} centered={true}
                    maskClosable={false}
                    width='1000px'
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <SaveButton key="define" handleSave={this.handleCreate} className='fa fa-check' />,
                    ]}
                >
                    <Form>
                        <span className="headers">所属部门：</span><span className="checkName">{this.props.deptName}</span>
                            <span className="headers">设备名称：</span><span className="checkName">{this.props.deviceName}</span>
                            <span className="headers">模板名称：</span><span><Input style={{width:'200px'}} value={this.state.date} onChange={this.onChangeTime} placeholder="请选择时间"/></span>
                            <div>
                            <span className="headers">模板状态：</span>
                            <Radio.Group onChange={this.onChange} value={this.state.radioValue} style={{width:'200px'}}>
                                <Radio value={false}>生效</Radio>
                                <Radio value={true}>失效</Radio>
                            </Radio.Group>
                            <span className="headers">制表人：</span><span className="checkName">{this.state.peopleName?this.state.peopleName:"管理员"}</span>
                            <span className="headers">制表日期：</span><span className="checkName">{this.state.tabulateDate}</span>
                            </div>
                        <Divider />
                        <div id="edit" style={{height:'360px'}}>
                            <Tr form={this.props.form} deviceSpotcheckModelsDetails={this.state.deviceSpotcheckModelsDetails} state = {this.state} handleChange={this.handleChange} remove={this.remove}/>
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
