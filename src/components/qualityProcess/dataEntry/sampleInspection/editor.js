import React from 'react';
import { Modal,Input,Select,DatePicker,TimePicker,Col,Checkbox,message  } from 'antd';
import axios from "axios";
import AddButton from '../../../BlockQuote/newButton';
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";
import moment from "moment";

const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';
const timeFormat = "HH:mm:ss";

class Editor extends React.Component{
    url
    server
    Authorization
    constructor(props){
        super(props);
        this.state = {
            visible : false,
            person : [],
            factor : [],
            items : [],
            serialNumber : [],


            type:null,
            date:'',
            time:'',
            oldperson:'',
            oldfactor:"",
            oldTestItems:[],
            oldMaterials:"",
            oldMemo:'',


            FinalserialNumber:[],

            process : [],
            sampling : [],
            MiddleFactor : [],
            materials : [],
            testItems :[],
            factoryId:null,
            procedureId : undefined,
            samplingPoint:undefined,
            materialsId : null,

            clicked: false,
            visible1: this.props.type,

            oldData:[],
            processVis : 0,
            pointVis : 0,
            materialVis : 0,
        }
        this.onChangeTime = this.onChangeTime.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.getProcess = this.getProcess.bind(this);
    }
    componentDidMount() {
        this.fetch();
    }
    componentWillUnmount() {
        this.setState = () => {
          return ;
        }
    }

    fetch = () =>{
        axios({
            url: `${this.url.authUser.getAll}`,
            method : 'get',
            headers:{
                'Authorization': this.Authorization
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
                'Authorization': this.Authorization
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
                'Authorization': this.Authorization
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
            headers:{
                'Authorization': this.Authorization
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
                'Authorization': this.Authorization
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
                'Authorization': this.Authorization
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

    getProcess=(value)=>{
        axios({
            url:`${this.url.procedure.testItems}`,
            method:'get',
            params:{factoryId:value},
            headers:{
                'Authorization': this.Authorization
            },
        }).then((data)=>{
            const res = data.data.data;
            if(res){
                this.setState({
                    process:res,
                    factoryId:value,
                    oldfactor:value,
                    processVis:1,
                    procedureId:undefined,
                    samplingPoint:undefined,
                    oldMaterials:undefined
                })
            }

        })
    }

    getSampling=(value)=>{
        axios({
            url:`${this.url.procedure.testItems}`,
            method:'get',
            params:{factoryId:this.state.factoryId,procedureId:value},
            headers:{
                'Authorization': this.Authorization
            },
        }).then((data)=>{
            const res = data.data.data;
            if(res){
                this.setState({
                    sampling:res,
                    procedureId:value,
                    pointVis:1
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
                'Authorization': this.Authorization
            },
        }).then((data)=>{
            const res = data.data.data;
            if(res){
                this.setState({
                    materials:res,
                    samplingPoint:value,
                    materialVis:1
                })
            }

        })
    }

    getItems=(value)=>{
        axios({
            url:`${this.url.procedure.testItems}`,
            method:'get',
            params:{factoryId:this.state.factoryId,procedureId:this.state.procedureId,
                samplePointName:this.state.samplingPoint,materialId:value},
            headers:{
                'Authorization': this.Authorization
            },
        }).then((data)=>{
            const res = data.data.data;
            if(res){
                this.setState({
                    oldTestItems : res,
                    oldMaterials:value
                })
            }
        })
    }

    onChangeTime = (date, dateString) => {
        this.setState({
            time:dateString
        })
    }

    onChangeDate = (date, dateString) => {
        this.setState({
            date:dateString
        })
    }

    onCreate = () =>{
        let dateTime = this.state.date + " " + this.state.time
        let data = {
            sampleDeliveringRecord:{id:this.props.id,acceptStatus:-1,delivererId:this.state.oldperson,deliveryFactoryId:this.state.oldfactor,
                exceptionComment:this.state.oldMemo,sampleDeliveringDate:dateTime,serialNumberId:this.state.oldMaterials,type:this.state.visible1
            },testItemIds:this.state.oldTestItems
        }
        axios({
            url:`${this.url.sampleInspection.getAll}`,
            method:'put',
            headers:{
                'Authorization': this.state.Authorization
            },
            data: data,
            type:'json'
        }).then((data)=>{
            message.info(data.data.message);
            this.props.handleTableChange(this.props.pagination);
        })
        this.setState({ visible: false });
    }

    onCenter = () =>{
        let dateTime = this.state.date + " " + this.state.time
        let data = {
            sampleDeliveringRecord:{id:this.props.id,acceptStatus:1,delivererId:this.state.oldperson,deliveryFactoryId:this.state.oldfactor,
                exceptionComment:this.state.oldMemo,sampleDeliveringDate:dateTime,serialNumberId:this.state.oldMaterials,type:this.state.visible1
            },testItemIds:this.state.oldTestItems
        }
        axios({
            url:`${this.url.sampleInspection.getAll}`,
            method:'put',
            headers:{
                'Authorization': this.state.Authorization
            },
            data: data,
            type:'json'
        }).then((data)=>{
            message.info(data.data.message);
            this.props.handleTableChange(this.props.pagination);
        })
        this.setState({ visible: false });
    }

    showModal = () => {
        axios({
            url:`${this.url.sampleInspection.getAll}/${this.props.id}`,
            method:'get',
            headers:{
                'Authorization':this.Authorization
            },
        }).then((data)=>{
            const res = data.data.data;
            if(res.sampleDeliveringRecord.type === 2){
                this.setState({
                    oldData:res,
                    type:res.sampleDeliveringRecord.type,
                    date:res.sampleDeliveringRecord.sampleDeliveringDate.substring(0,10),
                    time:res.sampleDeliveringRecord.sampleDeliveringDate.substring(11),
                    oldperson:res.sampleDeliveringRecord.delivererId,
                    oldfactor:res.sampleDeliveringRecord.deliveryFactoryId,
                    oldTestItems:res.sampleDeliveringRecord.testItems.split(',').map(Number),
                    oldMaterials:undefined,
                    oldMemo:res.sampleDeliveringRecord.exceptionComment,
                    visible: true,
                })
            }else{
                this.setState({
                    oldData:res,
                    type:res.sampleDeliveringRecord.type,
                    date:res.sampleDeliveringRecord.sampleDeliveringDate.substring(0,10),
                    time:res.sampleDeliveringRecord.sampleDeliveringDate.substring(11),
                    oldperson:res.sampleDeliveringRecord.delivererId,
                    oldfactor:res.sampleDeliveringRecord.deliveryFactoryId,
                    oldTestItems:res.sampleDeliveringRecord.testItems.split(',').map(Number),
                    oldMaterials:res.sampleDeliveringRecord.serialNumberId,
                    oldMemo:res.sampleDeliveringRecord.exceptionComment,
                    visible: true,
                })
            }
        })
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    changePerson = (value) =>{
        this.setState({
            oldperson:value
        })
    }

    changeFactor = (value) =>{
        this.setState({
            oldfactor:value
        })
    }

    changeItems = (value) =>{
        this.setState({
            oldTestItems:value
        })
    }

    changeMaterials = (value) =>{
        axios({
            url:`${this.url.sampleInspection.rawStandard}`,
            method:'get',
            params:{serialNumberId:value},
            headers:{
                'Authorization': this.Authorization
            },
        }).then((data)=>{
            const res = data.data.data;
            if(res){
                this.setState({
                    oldTestItems:res,
                    oldMaterials:value
                })
            }
        })
    }
    materialsProductItem = (value)=>{
        axios({
            url:`${this.url.product.getItemsByProductStandardId}`,
            method:'get',
            params:{productStandardId:value},
            headers:{
                'Authorization': this.url.Authorization
            },
        }).then((data)=>{
            const res = data.data.data;
            if(res){
                // this.props.onChange(res);
                this.setState({
                    oldTestItems: res
                })
            }else{
                message.info("此物料没有建立标准，请去技术中心建立标准")
            }
        })
    }

    changeMemo = (value) =>{
        this.setState({
            oldMemo:value.target.value
        })
    }

    selectChange= (value) =>{
        if(value===1){
            this.setState({
                visible1 : 1,
                oldMaterials:undefined
            })
        }else if(value===2){
            this.setState({
                visible1 : 2,
                oldMaterials:undefined
            })
        }else if(value===3){
            this.setState({
                visible1 : 3,
                oldMaterials:undefined
            })
        }
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        this.Authorization = localStorage.getItem("Authorization");
        this.server = localStorage.getItem('remote');
        return(
            <span className={this.props.flag?'':'hide'}>
                <span onClick={this.showModal} className='blue'>编辑</span>
                <Modal title='编辑' visible={this.state.visible}
                    closable={false}
                    width="520px"
                    maskClosable={false}
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <SaveButton key="define" handleSave={this.onCreate} className='fa fa-check' />,
                        <AddButton key="submit" handleClick={this.onCenter} name='提交' className='fa fa-check' />
                      ]}
                >
                      <Select disabled onChange={this.selectChange} placeholder="请选择样品种类" defaultValue={this.state.type} style={{width:"480px"}}>
                            <Option key="1" value={1}>原材料</Option>
                            <Option key="2" value={2}>中间品</Option>
                            <Option key="3" value={3}>成品</Option>
                      </Select>
                      <Col span={12} style={{display:"block"}}>
                      <DatePicker size='large' style={{width:"220px",marginTop:"10px"}} onChange={this.onChangeDate} defaultValue={moment(this.state.date,dateFormat)} placeholder="请选择送样日期"/>
                      <TimePicker style={{width:"220px",marginTop:"10px"}} onChange={this.onChangeTime} defaultValue={moment(this.state.time,timeFormat)} placeholder="请选择时间"/>
                      </Col>
                      {(this.state.visible1===1||this.state.visible1===3)?<Select placeholder="请选择送样人" style={{width:"220px",marginTop:"10px",marginLeft:"10px"}} onChange={this.changePerson} defaultValue={this.state.oldperson}>
                            {
                                this.state.person.map(pe=>{
                                    return(
                                        <Option key={pe.id} value={pe.id}>{pe.name}</Option>
                                    )
                                })
                            }
                        </Select>:<Select placeholder="请选择送样人" style={{width:"220px",marginTop:"10px",marginLeft:"10px"}} onChange={this.changePerson} defaultValue={this.state.oldperson}>
                            {
                                this.state.person.map(pe=>{
                                    return(
                                        <Option key={pe.id} value={pe.id}>{pe.name}</Option>
                                    )
                                })
                            }
                        </Select>}
                        {(this.state.visible1===1||this.state.visible1===3)?<Select placeholder="请选择送样工厂" defaultValue={this.state.oldfactor} onChange={this.changeFactor} style={{width:"220px",marginTop:"10px",marginLeft:"10px"}}>
                                    {
                                        this.state.factor.map(pe=>{
                                            return(
                                                <Option key={pe.id} value={pe.id}>{pe.name}</Option>
                                            )
                                        })
                                    }
                        </Select>:<div><Select placeholder="请选择送样工厂" onChange={this.getProcess} value={this.state.oldfactor} defaultValue={this.state.oldfactor} style={{width:"220px",marginTop:"10px",marginLeft:"10px"}}>
                                    {
                                        this.state.MiddleFactor.map(pe=>{
                                            return(
                                                <Option key={pe.id} value={pe.id}>{pe.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                                <Select placeholder="请选择工序" onChange={this.getSampling} value={this.state.procedureId} style={{width:"460px",marginTop:"10px"}}>
                                    {
                                        this.state.process.map(pe=>{
                                            return(
                                                <Option key={pe.id} value={pe.id}>{pe.name}</Option>
                                            )
                                        })
                                    }
                                </Select>

                                <div>
                                    <Select placeholder="请选择取样点" onChange={this.getMaterials} value={this.state.samplingPoint} style={{width:"460px",marginTop:"10px"}}>
                                    {
                                        this.state.sampling.map(pe=>{
                                            return(
                                                <Option key={pe} value={pe}>{pe}</Option>
                                            )
                                        })
                                    }
                                </Select>
                                <Select placeholder="请选择受检物料" onChange={this.getItems} value={this.state.oldMaterials} style={{width:"480px",marginTop:"10px"}}>
                                    {
                                        this.state.materials.map(pe=>{
                                            return(
                                                <Option key={pe.id} value={pe.id}>{pe.serialNumber+' - '+pe.materialName}</Option>
                                            )
                                        })
                                    }
                                </Select>
                                </div>
                                    <div style={{ width: '480px',border:"1px solid #E4E4E4",padding:"10px",marginTop:"10px"}} className="check-box">
                                        <Checkbox.Group style={{ width: '100%' }} value={this.state.oldTestItems}>
                                        {
                                        this.state.items.map(p=> <Col key={p.id} span={8}><Checkbox value={p.id} disabled>{p.name}</Checkbox></Col>)
                                        }
                                        </Checkbox.Group>
                                    </div>
                                </div>}
                    {
                        <div style={{ width: '480px',border:"1px solid #E4E4E4",padding:"10px",marginTop:"10px"}} className="check-box">
                            <Checkbox.Group style={{ width: '100%' }} value={this.state.oldTestItems} onChange={this.changeItems}>
                                {
                                    this.state.items.map(p=> <Col key={p.id} span={8}><Checkbox disabled value={p.id}>{p.name}</Checkbox></Col>)
                                }
                            </Checkbox.Group>
                        </div>

                    }

                        {this.state.visible1 === 1?<Select placeholder="请选择原材料标准" onChange={this.changeMaterials} defaultValue={this.state.oldMaterials} style={{width:"480px",marginTop:"10px"}}>
                            {
                                this.state.serialNumber.map(pe=>{
                                    return(
                                        <Option key={pe.material.id} value={pe}>{pe.material.name+" - "+pe.manufacturer.name}</Option>
                                    )
                                })
                            }
                        </Select>:this.state.visible1 ===3?<Select placeholder="请选择成品标准" onChange={this.materialsProductItem} defaultValue={this.state.oldMaterials} style={{width:"480px",marginTop:"10px"}}>
                            {
                                this.state.FinalserialNumber.map(pe=>{
                                    return(
                                        <Option key={pe.techniqueProductNewStandardRecord.id} value={pe.techniqueProductNewStandardRecord.id}>{pe.productName+' - '+pe.meterialClass}</Option>
                                    )
                                })
                            }
                        </Select>:null}
                        <Input.TextArea autosize={{minRows:2}} placeholder="请输入异常备注" onChange={this.changeMemo} defaultValue={this.state.oldMemo} style={{marginTop:"10px",width:"480px"}}/>
                </Modal>
            </span>
        )
    }
}

export default Editor
