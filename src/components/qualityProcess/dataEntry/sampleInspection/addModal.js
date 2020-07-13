import React from 'react';
import { Modal, Form, Input,Select,DatePicker,TimePicker,Col,Checkbox,message } from 'antd';
import axios from "axios";
import AddButton from '../../../BlockQuote/newButton';
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";
import moment from "moment";
import BatchSelect from "./batchSelect"
import RawSelect from "./rawSelect"

const Option = Select.Option;
const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
    class extends React.Component{
        url
        userId
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
                materialsItem:[],
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
                processVis : 0,
                pointVis : 0,
                materialVis : 0,
                oldMaterial : undefined,
                batchRule:""
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
                url: `${this.url.authUser.getAll}`,
                method : 'get',
                headers:{
                    'Authorization': this.url.Authorization
                },
            }).then((data) =>{
                const res = data.data.data;
                if(res){
                    this.setState({
                        person:res
                      })
                }
            })
            axios({
                url: `${this.url.deliveryFactory.deliveryFactory}`,
                method : 'get',
                headers:{
                    'Authorization': this.url.Authorization
                },
            }).then((data) =>{
                const res = data.data.data;
                if(res){
                    this.setState({
                        factor:res
                      })
                }
            })

            axios({
                url: `${this.url.testItems.testItems}`,
                method : 'get',
                headers:{
                    'Authorization': this.url.Authorization
                },
            }).then((data) =>{
                const res = data.data.data;
                if(res){
                    this.setState({
                        items:res
                      })
                }

            })

            axios({
                url: `${this.url.rawStandard.getCurrentRawStandard}`,
                method : 'get',
                // params : {materialClass:1},
                headers:{
                    'Authorization': this.url.Authorization
                },
            }).then((data) =>{
                const res = data.data.data;
                if(res){
                    this.setState({
                        serialNumber:res
                      })
                }
            })

            axios({
                url: `${this.url.product.getAllProductCommonBatch}`,
                method : 'get',
                headers:{
                    'Authorization': this.url.Authorization
                },
            }).then((data) =>{
                const res = data.data.data;
                if(res){
                    this.setState({
                        FinalserialNumber:res
                      })
                }

            })

            axios({
                url:`${this.url.procedure.testItems}`,
                method:'get',
                params:{},
                headers:{
                    'Authorization': this.url.Authorization
                },
            }).then((data)=>{
                const res = data.data.data;
                if(res){
                    this.setState({
                        MiddleFactor:res
                    })
                }
            })
        }
        onChangeTime = (date, dateString) => {

          }

        getSampling=(value)=>{
            axios({
                url:`${this.url.procedure.testItems}`,
                method:'get',
                params:{factoryId:this.state.factoryId,procedureId:value},
                headers:{
                    'Authorization': this.url.Authorization
                },
            }).then((data)=>{
                const res = data.data.data;
                if(res){
                    this.setState({
                        sampling:res,
                        procedureId:value,
                        pointVis:1,
                    })
                }

            })
        }

        getMaterials = (value)=>{
            axios({
                url:`${this.url.procedure.testItems}`,
                method:'get',
                params:{factoryId:this.state.factoryId,procedureId:this.state.procedureId,samplePointName:value},
                headers:{
                    'Authorization': this.url.Authorization
                },
            }).then((data)=>{
                const res = data.data.data;
                const testIte = res["检测项目"];
                // console.log(res["物料"]);
                if(res){
                    this.props.onChange(testIte);
                    this.props.form.setFieldsValue({
                        serialNumberId:res["物料"].id
                    })
                    this.setState({
                        materials:res["物料"],
                        samplingPoint:value,
                        materialVis:1,
                        testItems:testIte
                    })
                }

            })
        }

        materialsItem = (value)=>{
            axios({
                url:`${this.url.rawStandard.getItemsByRawId}`,
                method:'get',
                params:{rawId:parseInt(value.split("-")[0])},
                headers:{
                    'Authorization': this.url.Authorization
                },
            }).then((data)=>{
                const res = data.data.data;
                if(res){
                    this.props.onChange(res);
                    this.setState({
                        materialsItem:res
                    })
                }else{
                    message.info("此物料没有建立标准，请去技术中心建立标准")
                }
            })
        }

        materialsProductItem = (value)=>{
            axios({
                url:`${this.url.product.getItemsByProductStandardId}`,
                method:'get',
                params:{productStandardId:parseInt(value.split("-")[1])},
                headers:{
                    'Authorization': this.url.Authorization
                },
            }).then((data)=>{
                const res = data.data.data;
                if(res){
                    this.props.onChange(res);
                    this.setState({
                        materialsItem:res
                    })
                }else{
                    message.info("此物料没有建立标准，请去技术中心建立标准")
                }
            })
        }

        getProcess=(value)=>{
            axios({
                url:`${this.url.procedure.testItems}`,
                method:'get',
                params:{factoryId:value},
                headers:{
                    'Authorization': this.url.Authorization
                },
            }).then((data)=>{
                const res = data.data.data;
                if(res){
                    this.props.form.setFieldsValue({
                        serialNumberId:undefined,
                        process:undefined,
                        samplePointName:undefined
                    })
                    this.setState({
                        process:res,
                        factoryId:value,
                        processVis:1,
                    })
                }

            })
        }
        getItems=(value)=>{
            // console.log(value)
            axios({
                url:`${this.url.procedure.testItems}`,
                method:'get',
                params:{factoryId:this.state.factoryId,procedureId:this.state.procedureId,
                    samplePointName:this.state.samplingPoint,materialId:value},
                headers:{
                    'Authorization': this.url.Authorization
                },
            }).then((data)=>{
                const res = data.data.data;
                if(res){
                    this.props.onChange(res);
                    this.setState({
                        testItems : res,
                        oldMaterial:value
                    })
                }

            })
        }

        // onMouseEnter = ()=>{
        //     this.props.form.setFieldsValue({
        //         serialNumberId:null
        //     })
        // }

        disabledDate = (current)=>{
            return current&&current<moment().startOf('day')
        }

        selectChange= (value) =>{
            if(value==='1'){
                // this.props.onChangeItem()
                this.props.form.setFieldsValue({
                    deliveryFactoryId:undefined,
                    serialNumberId:undefined
                })
                this.setState({
                    visible1 : 1,
                    materialsItem:[]
                })
            }else if(value==='2'){
                this.props.form.setFieldsValue({
                    deliveryFactoryId:undefined,
                    serialNumberId:undefined
                })
                this.setState({
                    visible1 : 2,
                    materialsItem:[]
                })
            }else if(value==="3"){
                // this.props.onChangeItem()
                this.props.form.setFieldsValue({
                    deliveryFactoryId:undefined,
                    serialNumberId:undefined
                })
                this.setState({
                    visible1 : 3,
                    materialsItem:[]
                })
            }
        }



        render(){
            this.url = JSON.parse(localStorage.getItem('url'));
            this.Authorization = localStorage.getItem("Authorization");
            this.server = localStorage.getItem('remote');
            const {visible,form,onCancel,onCreate,onChange,onCenter,} = this.props;
            const { getFieldDecorator } = form;
            return(
                <Modal
                    visible={visible}
                    closable={false}
                    title="新增"
                    width="500px"
                    // style={{zIndex:"9999"}}
                    footer={[
                        <CancleButton key='back' handleCancel={onCancel}/>,
                        <SaveButton key="define" handleSave={onCreate} className='fa fa-check' />,
                        <AddButton key="submit" handleClick={onCenter} name='提交' className='fa fa-check' />
                      ]}
                >
                    
                    <Form horizontal='true'>
                        <FormItem wrapperCol={{ span: 24 }}>
                                {getFieldDecorator('type', {
                                    rules: [{ required: true, message: '请选择样品种类' }],
                                })(
                                    <Select onChange={this.selectChange} placeholder="请选择样品种类">
                                        <Option key="1" value="1">原材料</Option>
                                        {/*<Option key="2" value="2">中间品</Option>*/}
                                        <Option key="3" value="3">成品</Option>
                                    </Select>
                                )}
                        </FormItem>
                        {
                            this.state.visible1===3?<BatchSelect batchRule={this.props.batchRule} onBatchCenter = {this.props.onBatchCenter}/>:null
                        }
                        {/*<BatchSelect batchRule={this.props.batchRule} onBatchCenter = {this.props.onBatchCenter}/>*/}
                        <Col span={12} style={{display:"block"}}>
                            <FormItem  wrapperCol={{ span: 24 }}>
                                {getFieldDecorator('date', {
                                    rules: [{ required: true, message: '请选择日期' }],
                                })(
                                    <DatePicker disabledDate={this.disabledDate} style={{width:"220px"}} onChange={this.onChangeTime} placeholder="请选择送样日期"/>
                                )}
                            </FormItem>
                            <FormItem  wrapperCol={{ span: 24 }}>
                                {getFieldDecorator('time', {
                                    rules: [{ required: true, message: '请选择时间' }],
                                })(
                                    <TimePicker style={{width:"220px"}} onChange={this.onChangeTime} placeholder="请选择时间"/>
                                )}
                            </FormItem>
                        </Col>
                        <FormItem wrapperCol={{ span: 22 }}>
                            {getFieldDecorator('id', {
                                rules: [{ required: true, message: '请选择送样人' }],
                            })(
                                <Select placeholder="请选择送样人" style={{width:"220px"}}>
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
                        {(this.state.visible1===1||this.state.visible1===3)?
                        <FormItem wrapperCol={{ span: 22 }}>
                            {getFieldDecorator('deliveryFactoryId', {
                                rules: [{ required: true, message: '请选择送样工厂' }],
                            })(
                                <Select placeholder="请选择送样工厂" style={{width:"220px"}}>
                                    {
                                        this.state.factor.map(pe=>{
                                            return(
                                                <Option key={pe.id} value={pe.id}>{pe.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem> 
                        :(
                        <div>
                        <FormItem wrapperCol={{ span: 22 }}>
                            {getFieldDecorator('deliveryFactoryId', {
                                rules: [{ required: true, message: '请选择送样工厂' }],
                            })(
                                <Select placeholder="请选择送样工厂" onChange={this.getProcess}  style={{width:"220px"}}>
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
                                rules: [{ required: true, message: '请选择中间品标准' }],
                            })(
                                <Select placeholder="请选择中间品标准">
                                    <Option key={this.state.materials.id} value={this.state.materials.id}>{this.state.materials.serialNumber+' - '+this.state.materials.materialName}</Option>
                                </Select>
                            )}
                            <div style={{ width: '460px',border:"1px solid #E4E4E4",padding:"10px",marginTop:"10px"}} className="check-box">
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
                            <div style={{ width: '460px',border:"1px solid #E4E4E4",padding:"10px"}} className="check-box">
                                <Checkbox.Group style={{ width: '100%' }} onChange={onChange} value={this.state.materialsItem}>
                                    {
                                        this.state.items.map(p=> <Col key={p.id} span={8}><Checkbox disabled value={p.id}>{p.name}</Checkbox></Col>)
                                    }
                                </Checkbox.Group>
                            </div>
                        }
                        {/*{*/}
                            {/*this.state.visible1===3?*/}
                        {/*<div style={{ width: '460px',border:"1px solid #E4E4E4",padding:"10px"}} className="check-box">*/}
                            {/*<Checkbox.Group style={{ width: '100%' }}  onChange={onChange}>*/}
                            {/*{*/}
                            {/*this.state.items.map(p=> <Col key={p.id} span={8}><Checkbox value={p.id}>{p.name}</Checkbox></Col>)*/}
                            {/*}*/}
                            {/*</Checkbox.Group></div>:this.state.visible1===1?<div style={{ width: '460px',border:"1px solid #E4E4E4",padding:"10px"}} className="check-box">*/}
                            {/*<Checkbox.Group style={{ width: '100%' }} onChange={onChange} value={this.state.materialsItem}>*/}
                            {/*{*/}
                            {/*this.state.items.map(p=> <Col key={p.id} span={8}><Checkbox disabled value={p.id}>{p.name}</Checkbox></Col>)*/}
                            {/*}*/}
                            {/*</Checkbox.Group></div>:null*/}
                        {/*}*/}
                        {
                            this.state.visible1 === 1 ?  <FormItem wrapperCol={{ span: 24 }}>
                            {getFieldDecorator('serialNumberId', {
                                rules: [{ required: true, message: '请选择原材料标准' }],
                            })(
                                <Select placeholder="请选择原材料标准" onChange={this.materialsItem}>
                                    {
                                        this.state.serialNumber.map(pe=>{
                                            // console.log(pe)
                                            return(
                                                <Option key={pe.standandId} value={pe.material.id+"-"+pe.standandId}>{pe.material.name+" - "+pe.manufacturer.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem> : this.state.visible1 === 3 ?  <FormItem wrapperCol={{ span: 24 }}>
                            {getFieldDecorator('serialNumberId', {
                                rules: [{ required: true, message: '请选择成品标准' }],
                            })(
                                <Select placeholder="请选择成品标准" onChange={this.materialsProductItem}>
                                    {
                                        this.state.FinalserialNumber.map(pe=>{
                                            return(
                                                <Option key={pe.techniqueProductNewStandardRecord.id} value={"00-" + pe.techniqueProductNewStandardRecord.id}>{pe.productName+' - '+pe.meterialClass}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem> : null
                        }
                        {
                            this.state.visible1 === 1 ?
                                <RawSelect batchRule={this.props.batchRule} onBatchCenter = {this.props.onBatchCenter}/>
                                :null
                        }
                        <FormItem wrapperCol={{ span: 24 }}>
                            {getFieldDecorator('exceptionComment', {

                            })(
                                <Input.TextArea autosize={{minRows:2}} placeholder="请输入异常备注"/>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            )
        }
    }
);

class AddModal extends React.Component{
    url
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
        batchRule:"",
        subBatchs: []
    };

    onChange = (checkedValues) =>{
        this.setState({
            testItemIds:checkedValues
        })
      }

      onBatchCenter = (batchRules)=>{
        var batchRule = "";
        var subBatchs = [];
          for (let i = 0; i < batchRules.length; i++) {
              if (batchRules[i].flag === true) {
                  batchRule = batchRules[i].number;
              } else {
                  subBatchs.push(batchRules[i].number)
              }
          }
        // console.log(batchRule);
        this.setState({
            batchRule:batchRule,
            subBatchs:subBatchs
        })
    }

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        const form = this.formRef.props.form;
        this.setState({ visible: false,batchRule:"" });
        form.resetFields();
    };

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };


    saveRawRules = (id) => {
        axios({
            url:`${this.url.sampleInspection.addBatch}`,
            method:'post',
            headers:{
                'Authorization': this.url.Authorization
            },
            data: {
                mainBatch: this.state.batchRule,
                sampleId: id,
                subBatches: this.state.subBatchs
            },
            type:'json'
        }).then((data)=>{
            // message.info(data.data.message);
        })
    }


    // 保存
    onCreate = () =>{
        const form = this.formRef.props.form;
        form.validateFields((err,value)=>{
            if(err){
                return message.info("新增失败，请正确输入数据");
            }
            let date = moment(value.date).format("YYYY-MM-DD")
            let time = moment(value.time).format("HH:mm:ss")
            let dateTime = date + " " + time
            let data = {batch:this.state.batchRule,sampleDeliveringRecord:{acceptStatus:-1,delivererId:value.id,deliveryFactoryId:value.deliveryFactoryId,exceptionComment:value.exceptionComment,
                sampleDeliveringDate:dateTime,serialNumberId:parseInt(value.serialNumberId.split("-")[1]),type:value.type},testItemIds:this.state.testItemIds}
            axios({
                url:`${this.url.sampleInspection.getAll}`,
                method:'post',
                headers:{
                    'Authorization': this.url.Authorization
                },
                data: data,
                type:'json'
            }).then((data)=>{
                message.info(data.data.message);
                const id = data.data.data.sampleDeliveringRecord.id
                this.saveRawRules(id)
                this.props.fetch({sortField: 'id',
                sortType: 'desc',});
                this.setState({ visible: false,batchRule:"" });
                form.resetFields();
            })
        })
    }

    // 提交
    onCenter = () =>{
        const form = this.formRef.props.form;
        form.validateFields((err,value)=>{
            if(err){
                return message.info("新增失败，请正确输入数据");
            }
            let date = moment(value.date).format("YYYY-MM-DD")
            let time = moment(value.time).format("HH:mm:ss")
            let dateTime = date + " " + time
            let data = {batch:this.state.batchRule,sampleDeliveringRecord:{acceptStatus:1,delivererId:value.id,deliveryFactoryId:value.deliveryFactoryId,exceptionComment:value.exceptionComment,
                sampleDeliveringDate:dateTime,serialNumberId:parseInt(value.serialNumberId.split("-")[1]),type:value.type},testItemIds:this.state.testItemIds}
            axios({
                url:`${this.url.sampleInspection.getAll}`,
                method:'post',
                headers:{
                    'Authorization': this.url.Authorization
                },
                data: data,
                type:'json'
            }).then((data)=>{
                message.info(data.data.message);
                const id = data.data.data.sampleDeliveringRecord.id
                this.saveRawRules(id)
                this.props.fetch({sortField: 'id',
                sortType: 'desc',});
                this.setState({ visible: false,batchRule:"" });
                form.resetFields();
            })
        })
    }

    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        this.Authorization = localStorage.getItem("Authorization");
        this.server = localStorage.getItem('remote');
        return(
            <span className={this.props.flag?'':'hide'}>
                <AddButton handleClick={this.showModal} name='新增' className='fa fa-plus' />&nbsp;&nbsp;&nbsp;
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.onCreate}
                    onChange={this.onChange}
                    onCenter={this.onCenter}
                    onBatchCenter={this.onBatchCenter}
                    batchRule={this.state.batchRule}
                    // onChangeItem={this.onChangeItem}
                />
            </span>
        )
    }
}

export default AddModal
