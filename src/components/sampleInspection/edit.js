import React from 'react';
import { Modal, Form, Input,Select,DatePicker,TimePicker,Col,Checkbox,message  } from 'antd';
import axios from "axios";
import AddButton from '../BlockQuote/newButton';
import CancleButton from "../BlockQuote/cancleButton";
import SaveButton from "../BlockQuote/saveButton";
import moment from "moment";

const Option = Select.Option;
const FormItem = Form.Item;

// const userId = localStorage.getItem('menuList')
// let ob = JSON.parse(userId)

const CollectionCreateForm = Form.create()(
    class extends React.Component{
        // userId
        server
        Authorization
        constructor(props){
            super(props)
            this.state = {
                visible : false,
                person : [],
                factor : [],
                items : [],
                serialNumber : [],
                // MiddleserialNumber : [],
                FinalserialNumber:[],

                process : [],
                sampling : [],
                MiddleFactor : [],
                materials : [],
                testItems :[],
                factoryId:null,
                procedureId : null,
                samplingPoint:null,
                materialsId : null,

                clicked: false,
                visible1: 1,

                oldData:[],
            }
            // this.handleClickChange = this.handleClickChange.bind(this);
            this.onChangeTime = this.onChangeTime.bind(this);
            this.selectChange = this.selectChange.bind(this);
            this.getProcess = this.getProcess.bind(this);
        }
        componentDidMount() {
            this.fetch();
        }
        componentWillUnmount() {
            this.setState = (state, callback) => {
              return ;
            }
        }
        // handleClickChange(visible){
        //     this.setState({clicked:visible})
        // }
        fetch = () =>{
            axios({
                url: `${this.server}/jc/common/authUser/getAll`,
                method : 'get',
                headers:{
                    'Authorization': this.Authorization
                },
            }).then((data) =>{
                const res = data.data.data;
                this.setState({
                    person:res
                  })
            })

            axios({
                url: `${this.server}/jc/common/deliveryFactory`,
                method : 'get',
                headers:{
                    'Authorization': this.Authorization
                },
            }).then((data) =>{
                const res = data.data.data;
                this.setState({
                    factor:res
                  })
            })

            axios({
                url: `${this.server}/jc/common/testItem`,
                method : 'get',
                headers:{
                    'Authorization': this.Authorization
                },
            }).then((data) =>{
                const res = data.data.data;
                this.setState({
                    items:res
                  })
            })

            axios({
                url: `${this.server}/jc/common/repoBaseSerialNumber`,
                method : 'get',
                params : {materialClass:1},
                headers:{
                    'Authorization': this.Authorization
                },
            }).then((data) =>{
                const res = data.data.data;
                this.setState({
                    serialNumber:res
                  })
            })

            axios({
                url: `${this.server}/jc/common/repoBaseSerialNumber`,
                method : 'get',
                params : {materialClass:3},
                headers:{
                    'Authorization': this.Authorization
                },
            }).then((data) =>{
                const res = data.data.data;
                this.setState({
                    FinalserialNumber:res
                  })
            })

            axios({
                url:`${this.server}/jc/common/procedureTestRecord/testItems`,
                method:'get',
                params:{},
                headers:{
                    'Authorization': this.Authorization
                },
            }).then((data)=>{
                const res = data.data.data;
                this.setState({
                    MiddleFactor:res
                })
            })
        }
        onChangeTime = (date, dateString) => {

          }

        getSampling=(value)=>{
            axios({
                url:`${this.server}/jc/common/procedureTestRecord/testItems`,
                method:'get',
                params:{factoryId:this.state.factoryId,procedureId:value},
                headers:{
                    'Authorization': this.Authorization
                },
            }).then((data)=>{
                const res = data.data.data;
                this.setState({
                    sampling:res,
                    procedureId:value
                })
            })
        }

        getMaterials = (value)=>{
            axios({
                url:`${this.server}/jc/common/procedureTestRecord/testItems`,
                method:'get',
                params:{factoryId:this.state.factoryId,procedureId:this.state.procedureId,samplePointName:value},
                headers:{
                    'Authorization': this.Authorization
                },
            }).then((data)=>{
                const res = data.data.data;
                this.setState({
                    materials:res,
                    samplingPoint:value
                })
            })
        }

        getProcess=(value)=>{
            axios({
                url:`${this.server}/jc/common/procedureTestRecord/testItems`,
                method:'get',
                params:{factoryId:value},
                headers:{
                    'Authorization': this.Authorization
                },
            }).then((data)=>{
                const res = data.data.data;
                this.setState({
                    process:res,
                    factoryId:value
                })
            })
        }
        getItems=(value)=>{
            axios({
                url:`${this.server}/jc/common/procedureTestRecord/testItems`,
                method:'get',
                params:{factoryId:this.state.factoryId,procedureId:this.state.procedureId,
                    samplePointName:this.state.samplingPoint,materialId:value},
                headers:{
                    'Authorization': this.Authorization
                },
            }).then((data)=>{
                const res = data.data.data;
                this.props.onChange(res);
                this.setState({
                    testItems : res
                })
            })
        }
        selectChange= (value) =>{
            if(value==='1'){
                this.setState({
                    visible1 : 1
                })
            }else if(value==='2'){
                this.setState({
                    visible1 : 2
                })
            }else if(value==="3"){
                this.setState({
                    visible1 : 3
                })
            }
        }

        render(){
            console.log(this.props.data);
            this.Authorization = localStorage.getItem("Authorization");
            this.server = localStorage.getItem('remote');
            const {visible,form,onCancel,onCreate,onChange,onCenter} = this.props;
            const { getFieldDecorator } = form;
            return(
                <Modal
                    visible={visible}
                    closable={false}
                    title="新增"
                    width="360px"
                    footer={[
                        <CancleButton key='back' handleCancel={onCancel}/>,
                        <SaveButton key="define" handleSave={onCreate} style='button' className='fa fa-check' />,
                        <AddButton key="submit" handleClick={onCenter} name='提交' style='button' className='fa fa-check' />
                      ]}
                >
                    <Form horizontal='true'>
                        <FormItem wrapperCol={{ span: 24 }}>
                                {getFieldDecorator('type', {
                                    rules: [{ required: true, message: '请选择样品种类' }],
                                    initialValue:this.props.data.sampleDeliveringRecord.type
                                })(
                                    <Select  onChange={this.selectChange} placeholder="请选择样品种类">
                                        <Option key="1" value={1}>原材料</Option>
                                        <Option key="2" value={2}>中间品</Option>
                                        <Option key="3" value={3}>成品</Option>
                                    </Select>
                                )}
                        </FormItem>
                        <Col span={12} style={{display:"block"}}>
                            <FormItem  wrapperCol={{ span: 24 }}>
                                {getFieldDecorator('date', {
                                    rules: [{ required: true, message: '请选择送样日期' }],
                           
                                })(
                                    <DatePicker style={{width:"153px"}} onChange={this.onChangeTime} placeholder="请选择送样日期"/>
                                )}
                            </FormItem>
                            <FormItem  wrapperCol={{ span: 24 }}>
                                {getFieldDecorator('time', {
                                    rules: [{ required: true, message: '请选择送样时间' }],
                               
                                })(
                                    <TimePicker style={{width:"153px"}} onChange={this.onChangeTime} placeholder="请选择时间"/>
                                )}
                            </FormItem>
                        </Col>
                        <FormItem wrapperCol={{ span: 22 }}>
                            {getFieldDecorator('id', {
                                rules: [{ required: true, message: '请选择送样人' }],
                            })(
                                <Select placeholder="请选择送样人" style={{width:"153px"}}>
                                    {
                                        this.state.person.map(pe=>{
                                            return(
                                                <Option key={pe.id} value={pe.id}>{pe.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>
                        {(this.state.visible1===1||this.state.visible1===3)?<FormItem wrapperCol={{ span: 22 }}>
                            {getFieldDecorator('deliveryFactoryId', {
                                rules: [{ required: true, message: '请选择送样工厂' }],
                            })(
                                <Select placeholder="请选择送样工厂" style={{width:"153px"}}>
                                    {
                                        this.state.factor.map(pe=>{
                                            return(
                                                <Option key={pe.id} value={pe.id}>{pe.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem> : (
                        <div>
                        <FormItem wrapperCol={{ span: 22 }}>
                            {getFieldDecorator('deliveryFactoryId', {
                                rules: [{ required: true, message: '请选择送样工厂' }],
                            })(
                                <Select placeholder="请选择送样工厂" onChange={this.getProcess}  style={{width:"153px"}}>
                                    {
                                        this.state.MiddleFactor.map(pe=>{
                                            return(
                                                <Option key={pe.id} value={pe.id}>{pe.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>
                        <FormItem wrapperCol={{ span: 24 }}>
                            {getFieldDecorator('process', {
                                rules: [{ required: true, message: '请选择工序' }],
                            })(
                                <Select placeholder="请选择工序" onChange={this.getSampling}>
                                    {
                                        this.state.process.map(pe=>{
                                            return(
                                                <Option key={pe.id} value={pe.id}>{pe.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>
                        <FormItem wrapperCol={{ span: 24 }}>
                            {getFieldDecorator('samplePointName', {
                                rules: [{ required: true, message: '请选择取样点' }],
                            })(
                                <Select placeholder="请选择取样点" onChange={this.getMaterials}>
                                    {
                                        this.state.sampling.map(pe=>{
                                            return(
                                                <Option key={pe} value={pe}>{pe}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>
                        <FormItem wrapperCol={{ span: 24 }}>
                            {getFieldDecorator('serialNumberId', {
                                rules: [{ required: true, message: '请选择受检物料' }],
                            })(
                                <Select placeholder="请选择受检物料" onChange={this.getItems}>
                                    {
                                        this.state.materials.map(pe=>{
                                            return(
                                                <Option key={pe.id} value={pe.id}>{pe.materialName}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                            <div style={{ width: '320px',border:"1px solid #E4E4E4",padding:"10px",marginTop:"10px"}}>
                            <Checkbox.Group style={{ width: '100%' }} value={this.state.testItems}>
                            {
                            this.state.items.map(p=> <Col key={p.id} span={8}><Checkbox value={p.id} disabled>{p.name}</Checkbox></Col>)
                            }
                            </Checkbox.Group></div>
                        </FormItem>
                        </div>
                        )
                        }
                        {
                            (this.state.visible1===1||this.state.visible1===3)?
                        <div style={{ width: '320px',border:"1px solid #E4E4E4",padding:"10px"}} >
                            <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                            {
                            this.state.items.map(p=> <Col key={p.id} span={8}><Checkbox value={p.id}>{p.name}</Checkbox></Col>)
                            }
                            </Checkbox.Group></div>: null
                        }
                        {
                            this.state.visible1 === 1 ?  <FormItem wrapperCol={{ span: 24 }}>
                            {getFieldDecorator('serialNumberId', {
                                rules: [{ required: true, message: '请选择受检物料' }],
                            })(
                                <Select placeholder="请选择受检物料">
                                    {
                                        this.state.serialNumber.map(pe=>{
                                            return(
                                                <Option key={pe.id} value={pe.id}>{pe.materialName}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem> : this.state.visible1 === 3 ?  <FormItem wrapperCol={{ span: 24 }}>
                            {getFieldDecorator('serialNumberId', {
                                rules: [{ required: true, message: '请选择受检物料' }],
                            })(
                                <Select placeholder="请选择受检物料">
                                    {
                                        this.state.FinalserialNumber.map(pe=>{
                                            return(
                                                <Option key={pe.id} value={pe.id}>{pe.materialName}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem> : null
                        }
                        <FormItem wrapperCol={{ span: 24 }}>
                            {getFieldDecorator('exceptionComment', {
                                rules: [{ required: true, message: '请输入异常备注' }],
                            })(
                                <Input placeholder="请输入异常备注"/>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            )
        }
    }
);

class Edit extends React.Component{
    server
    Authorization
    state = {
        visible: false,
        // createPersonId:ob.userId,
        status:null,
        id:null,
        acceptStatus:null,
        deliveryFactoryId:null,
        exceptionComment:'',
        sampleDeliveringDate:'',
        serialNumberId:null,
        testItemIds:[],
        type:null,
    };

    onChange = (checkedValues) =>{
        console.log(checkedValues)
        this.setState({
            testItemIds:checkedValues
        })
      }
    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        const form = this.formRef.props.form;
        this.setState({ visible: false });
        // form.resetFields();
    };

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    onCreate = () =>{
        const form = this.formRef.props.form;
        form.validateFields((err,value)=>{
            if(err){
                return;
            }
            let date = moment(value.date).format("YYYY-MM-DD")
            let time = moment(value.time).format("HH:mm:ss")
            let dateTime = date + " " + time
            let data = {sampleDeliveringRecord:{id:this.props.id,acceptStatus:-1,delivererId:value.id,deliveryFactoryId:value.deliveryFactoryId,exceptionComment:value.exceptionComment,
                sampleDeliveringDate:dateTime,serialNumberId:value.serialNumberId,type:value.type},testItemIds:this.state.testItemIds}
            axios({
                url:`${this.server}/jc/common/sampleDeliveringRecord`,
                method:'PUT',
                headers:{
                    'Authorization': this.state.Authorization
                },
                data: data,
                type:'json'
            }).then((data)=>{
                message.info(data.data.message);
                this.props.fetch();
            })
        })
        this.setState({ visible: false });
        form.resetFields();
    }

    onCenter = () =>{
        const form = this.formRef.props.form;
        form.validateFields((err,value)=>{
            if(err){
                return;
            }
            let date = moment(value.date).format("YYYY-MM-DD")
            let time = moment(value.time).format("HH:mm:ss")
            let dateTime = date + " " + time
            let data = {sampleDeliveringRecord:{id:this.props.id,acceptStatus:1,delivererId:value.id,deliveryFactoryId:value.deliveryFactoryId,exceptionComment:value.exceptionComment,
                sampleDeliveringDate:dateTime,serialNumberId:value.serialNumberId,type:value.type},testItemIds:this.state.testItemIds}
            axios({
                url:`${this.server}/jc/common/sampleDeliveringRecord`,
                method:'PUT',
                headers:{
                    'Authorization': this.state.Authorization
                },
                data: data,
                type:'json'
            }).then((data)=>{
                message.info(data.data.message);
                this.props.fetch();
            })
        })
        this.setState({ visible: false });
        form.resetFields();
    }

    render(){
        this.Authorization = localStorage.getItem("Authorization");
        this.server = localStorage.getItem('remote');
        return(
            <span>
                <span onClick={this.showModal} className='blue'>编辑</span>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.onCreate}
                    onChange={this.onChange}
                    onCenter={this.onCenter}
                    data={this.props.data}
                />
            </span>
        )
    }
}

export default Edit