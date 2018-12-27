import React from 'react';
import { Modal, Form, Input,Select,DatePicker,TimePicker,Col,Checkbox,message  } from 'antd';
import axios from "axios";
import AddButton from '../BlockQuote/newButton';
import CancleButton from "../BlockQuote/cancleButton";
import SaveButton from "../BlockQuote/saveButton";
import moment from "moment";

const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';
const timeFormat = "HH:mm:ss";

class Editor extends React.Component{
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
            procedureId : null,
            samplingPoint:null,
            materialsId : null,

            clicked: false,
            visible1: this.props.type,

            oldData:[],
        }
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

    fetch = () =>{
        axios({
            url: `${this.server}/jc/common/authUser/getAll`,
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
            url: `${this.server}/jc/common/deliveryFactory`,
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
            url: `${this.server}/jc/common/testItem`,
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
            url: `${this.server}/jc/common/repoBaseSerialNumber`,
            method : 'get',
            params : {materialClass:1},
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
            url: `${this.server}/jc/common/repoBaseSerialNumber`,
            method : 'get',
            params : {materialClass:3},
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
            url:`${this.server}/jc/common/procedureTestRecord/testItems`,
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
            url:`${this.server}/jc/common/procedureTestRecord/testItems`,
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
                    oldfactor:value
                })
            }
            
        })
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
            if(res){
                this.setState({
                    sampling:res,
                    procedureId:value
                })
            }
            
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
            if(res){
                this.setState({
                    materials:res,
                    samplingPoint:value
                })
            }
            
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
            url:`${this.server}/jc/common/sampleDeliveringRecord`,
            method:'put',
            headers:{
                'Authorization': this.state.Authorization
            },
            data: data,
            type:'json'
        }).then((data)=>{
            message.info(data.data.message);
            this.props.fetch();
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
            url:`${this.server}/jc/common/sampleDeliveringRecord`,
            method:'put',
            headers:{
                'Authorization': this.state.Authorization
            },
            data: data,
            type:'json'
        }).then((data)=>{
            message.info(data.data.message);
            this.props.fetch();
        })
        this.setState({ visible: false });
    }    

    showModal = () => {
        axios({
            url:`${this.server}/jc/common/sampleDeliveringRecord/${this.props.id}`,
            method:'get',
            headers:{
                'Authorization':this.Authorization
            },
        }).then((data)=>{
            const res = data.data.data;
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
                visible: true
            })
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
        this.setState({
            oldMaterials:value
        })
    }

    changeMemo = (value) =>{
        this.setState({
            oldMemo:value
        })
    }

    selectChange= (value) =>{
        if(value===1){
            this.setState({
                visible1 : 1,
                oldMaterials:null
            })
        }else if(value===2){
            this.setState({
                visible1 : 2,
                oldMaterials:null
            })
        }else if(value===3){
            this.setState({
                visible1 : 3,
                oldMaterials:null
            })
        }
    }
    render(){
        this.Authorization = localStorage.getItem("Authorization");
        this.server = localStorage.getItem('remote');
        return(
            <span>
                <span onClick={this.showModal} className='blue'>编辑</span>
                <Modal title='编辑' visible={this.state.visible}
                    closable={false}
                    width="360px"
                    maskClosable={false}
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <SaveButton key="define" handleSave={this.onCreate} style='button' className='fa fa-check' />,
                        <AddButton key="submit" handleClick={this.onCenter} name='提交' style='button' className='fa fa-check' />
                      ]}
                >
                      <Select disabled onChange={this.selectChange} placeholder="请选择样品种类" defaultValue={this.state.type} style={{width:"320px"}}>
                            <Option key="1" value={1}>原材料</Option>
                            <Option key="2" value={2}>中间品</Option>
                            <Option key="3" value={3}>成品</Option>
                      </Select>
                      <DatePicker  style={{width:"153px",marginTop:"10px"}} onChange={this.onChangeDate} defaultValue={moment(this.state.date,dateFormat)} placeholder="请选择送样日期"/>
                      <TimePicker style={{width:"153px",marginTop:"10px",marginLeft:"12px"}} onChange={this.onChangeTime} defaultValue={moment(this.state.time,timeFormat)} placeholder="请选择时间"/>
                      {(this.state.visible1===1||this.state.visible1===3)?<Select placeholder="请选择送样人" style={{width:"153px",marginTop:"10px"}} onChange={this.changePerson} defaultValue={this.state.oldperson}>
                            {
                                this.state.person.map(pe=>{
                                    return(
                                        <Option key={pe.id} value={pe.id}>{pe.name}</Option>
                                    )
                                })
                            }
                        </Select>:<Select placeholder="请选择送样人" style={{width:"320px",marginTop:"10px"}} onChange={this.changePerson} defaultValue={this.state.oldperson}>
                            {
                                this.state.person.map(pe=>{
                                    return(
                                        <Option key={pe.id} value={pe.id}>{pe.name}</Option>
                                    )
                                })
                            }
                        </Select>}
                      
                        {(this.state.visible1===1||this.state.visible1===3)?<Select placeholder="请选择送样工厂" defaultValue={this.state.oldfactor} onChange={this.changeFactor} style={{width:"153px",marginTop:"10px",marginLeft:"12px"}}>
                                    {
                                        this.state.factor.map(pe=>{
                                            return(
                                                <Option key={pe.id} value={pe.id}>{pe.name}</Option>
                                            )
                                        })
                                    }
                        </Select>:<div><Select placeholder="请选择送样工厂" onChange={this.getProcess}  style={{width:"153px",marginTop:"10px"}}>
                                    {
                                        this.state.MiddleFactor.map(pe=>{
                                            return(
                                                <Option key={pe.id} value={pe.id}>{pe.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                                <Select placeholder="请选择工序" onChange={this.getSampling} style={{width:"153px",marginTop:"10px",marginLeft:"12px"}}>
                                    {
                                        this.state.process.map(pe=>{
                                            return(
                                                <Option key={pe.id} value={pe.id}>{pe.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                                <div>
                                <Select placeholder="请选择取样点" onChange={this.getMaterials} style={{width:"153px",marginTop:"10px"}}>
                                    {
                                        this.state.sampling.map(pe=>{
                                            return(
                                                <Option key={pe} value={pe}>{pe}</Option>
                                            )
                                        })
                                    }
                                </Select>
                                <Select placeholder="请选择受检物料" onChange={this.getItems} style={{width:"153px",marginTop:"10px",marginLeft:"12px"}}>
                                    {
                                        this.state.materials.map(pe=>{
                                            return(
                                                <Option key={pe.id} value={pe.id}>{pe.materialName}</Option>
                                            )
                                        })
                                    }
                                </Select>
                                </div>
                                    <div style={{ width: '320px',border:"1px solid #E4E4E4",padding:"10px",marginTop:"10px"}}>
                                        <Checkbox.Group style={{ width: '100%' }} value={this.state.oldTestItems}>
                                        {
                                        this.state.items.map(p=> <Col key={p.id} span={8}><Checkbox value={p.id} disabled>{p.name}</Checkbox></Col>)
                                        }
                                        </Checkbox.Group>
                                    </div>
                                </div>}

                        {(this.state.visible1===1||this.state.visible1===3)?<div style={{ width: '320px',border:"1px solid #E4E4E4",padding:"10px",marginTop:"10px"}} >
                            <Checkbox.Group style={{ width: '100%' }} defaultValue={this.state.oldTestItems} onChange={this.changeItems}>
                            {
                            this.state.items.map(p=> <Col key={p.id} span={8}><Checkbox value={p.id}>{p.name}</Checkbox></Col>)
                            }
                        </Checkbox.Group></div>:null}
                        
                        {this.state.visible1 === 1?<Select placeholder="请选择受检物料" onChange={this.changeMaterials} value={this.state.oldMaterials} style={{width:"320px",marginTop:"10px"}}>
                            {
                                this.state.serialNumber.map(pe=>{
                                    return(
                                        <Option key={pe.id} value={pe.id}>{pe.materialName+" - "+pe.manufacturerName}</Option>
                                    )
                                })
                            }
                        </Select>:this.state.visible1 ===3?<Select placeholder="请选择受检物料" onChange={this.changeMaterials} value={this.state.oldMaterials} style={{width:"320px",marginTop:"10px"}}>
                            {
                                this.state.FinalserialNumber.map(pe=>{
                                    return(
                                        <Option key={pe.id} value={pe.id}>{pe.materialName}</Option>
                                    )
                                })
                            }
                        </Select>:null}
                        <Input placeholder="请输入异常备注" onChange={this.changeMemo} defaultValue={this.state.oldMemo} style={{marginTop:"10px"}}/>
                </Modal>
            </span>
        )
    }
}

export default Editor