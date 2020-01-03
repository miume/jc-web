import React,{Component} from 'react'
import NewButton from '../../../BlockQuote/newButton'
import CancleButton from '../../../BlockQuote/cancleButton'
import {Modal,Select,Row,Col,message,Input} from 'antd'
import axios from 'axios'
const {Option}=Select
class MaterialTypePLCMeterComAdd extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            code: undefined,
            lineCode: undefined,
            materialCode: undefined,
            plcCode: undefined,
            processCode: undefined,
            lineData:[],
            processData:[],
            plcData:[],
            materialData:[]
        }
        this.showModal=this.showModal.bind(this);
        this.handleAdd=this.handleAdd.bind(this);
        this.handleAddCancel=this.handleAddCancel.bind(this);
        this.selectChange=this.selectChange.bind(this);
        this.getLine=this.getLine.bind(this);
        this.getProcess=this.getProcess.bind(this);
        this.getPlc=this.getPlc.bind(this);
        this.getMaterial=this.getMaterial.bind(this);
    }

      componentWillUnmount() {
        this.setState = () => {
          return ;
        }
      }
    getProcess(){
        axios({
            url:`${this.props.url.positiveProcess.all}`,
            method:'get',
            headers:{
              'Authorization':this.props.url.Authorization
          },
          }).then((data)=>{
            const res = data.data.data;
           if(res){
                this.setState({
                    processData:res
                })
            }
          })
    }
    getLine(){
        axios({
            url:`${this.props.url.positiveProductline.all}`,
            method:'get',
            headers:{
              'Authorization':this.props.url.Authorization
          },
          }).then((data)=>{
            const res = data.data.data;
           if(res){
                this.setState({
                    lineData:res
                })
            }
          })
    }
    getPlc(){
        axios({
            url:`${this.props.url.positivePlcSddress.all}`,
            method:'get',
            headers:{
              'Authorization':this.props.url.Authorization
          },
          }).then((data)=>{
            const res = data.data.data;
           if(res){
                this.setState({
                    plcData:res
                })
            }
          })
    }
    getMaterial(){
        axios({
            url:`${this.props.url.positiveMaterialType.all}`,
            method:'get',
            headers:{
              'Authorization':this.props.url.Authorization
          },
          }).then((data)=>{
            const res = data.data.data;
           if(res){
                this.setState({
                    materialData:res
                })
            }
          })
    }
    showModal(){
        this.setState({
            visible:true
        })
        this.getLine()
        this.getMaterial()
        this.getPlc()
        this.getProcess()
    }
    handleAdd(){
        let {lineCode,plcCode,materialCode,processCode}=this.state
        if(!lineCode||!plcCode||!materialCode||!processCode){
            message.error('信息填写不完整!')
            return
        }
        let data={
            code: this.props.editflag?this.props.code:'',
            lineCode: lineCode,
            materialCode: materialCode,
            plcCode: plcCode,
            processCode: processCode,
        }
        axios({
            url:this.props.editFlag?this.props.url.positivePlcCompare.update:this.props.url.positivePlcCompare.add,
            method:this.props.editFlag?"put":"post",
            headers:{
                'Authorization':this.props.url.Authorization,
            },
            data:data
        }).then(data=>{
            if(data.data.code===0){
                message.info('操作成功!')
                this.props.getTableData()
            }
            else{
                message.error(data.data.message)
            }
        }).catch(error=>{
            message.error('操作失败，请联系管理员!')
        })
        this.handleAddCancel()
    }
    handleAddCancel(){
        this.setState({
            visible:false,
            lineCode: undefined,
            materialCode: undefined,
            plcCode: undefined,
            processCode: undefined
        })
    }
    selectChange(value,name){
         name=name.props.name
         this.setState({
             [name]:value
         })
    }
    render(){
        let {addFlag,updateFlag}=this.props
        return(
            <span>
                  {this.props.editflag?<span className={updateFlag?'blue':'hide'} onClick={this.showModal}>编辑</span>
                :<span className={addFlag?'':'hide'}>
                    <NewButton name='新增' className='fa fa-plus' handleClick={this.showModal}/>
                </span>}
                <Modal
                    title={this.props.editflag?'编辑':'新增'}
                    visible={this.state.visible}
                    closable={false}
                    maskClosable={false}
                    width='450px'
                    footer={[
                        <CancleButton key='cancel' handleCancel={this.handleAddCancel}/>,
                        <NewButton key='ok' handleClick={this.handleAdd} className='fa fa-check' name='确定'/>
                    ]}
                >
                    <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                        <Col className='imgRequire'>产线 : </Col>
                        <Col span={18}>
                            <Select placeholder='请选择产线'value={this.state.lineCode} style={{width:307.5}} onChange={this.selectChange}>
                                {
                                    this.state.lineData?this.state.lineData.map(data=>{
                                        return(
                                            <Option key={data.code} value={data.code}  name='lineCode' >{data.name}</Option>
                                        )
                                    }):null
                                }
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                        <Col className='imgRequire'>所属工序 : </Col>
                        <Col span={18}>
                            <Select placeholder='请选择所属工序'  defaultValue={this.props.editflag?this.props.record.processCode:undefined} style={{width:307.5}} onChange={this.selectChange}>
                                {
                                    this.state.processData?this.state.processData.map(data=>{
                                        return(
                                            <Option key={data.code} value={data.code} name='processCode'>{data.processName}</Option>
                                        )
                                    }):null
                                }
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                        <Col  className='imgRequire'>物料种类 : </Col>
                        <Col span={18}>
                            <Select placeholder='请选择物料种类' defaultValue={this.props.editflag?this.props.record.materialCode:undefined}  style={{width:307.5}} onChange={this.selectChange}>
                                {
                                    this.state.materialData?this.state.materialData.map(data=>{
                                        return(
                                            <Option key={data.materialCode} name='materialCode' value={data.materialCode}>{data.materialName}</Option>
                                        )
                                    }):null
                                }
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                        <Col className='imgRequire'>DCS属性 : </Col>
                        <Col span={18}>
                            <Input placeholder='请输入物料属性' defaultValue={this.props.editflag?this.props.record.lineCode:undefined}  style={{width:307.5}} onChange={this.inputChange}/>
                        </Col>
                    </Row>
                    <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                        <Col  className='imgRequire'>PLC地址 : </Col>
                        <Col span={18}>
                            <Select placeholder='请选择PLC地址'  value={this.state.plcCode} style={{width:307.5}} onChange={this.selectChange}>
                                {
                                    this.state.plcData?this.state.plcData.map(data=>{
                                        return(
                                            <Option key={data.code} value={data.code} name='plcCode'>{data.plcAddress}</Option>
                                        )
                                    }):null
                                }
                            </Select>
                        </Col>
                    </Row>
                </Modal>
            </span>
        );
    }
}
export default MaterialTypePLCMeterComAdd