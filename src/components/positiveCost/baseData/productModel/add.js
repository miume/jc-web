import React,{Component} from 'react'
import NewButton from '../../../BlockQuote/newButton'
import CancleButton from '../../../BlockQuote/cancleButton'
import {Modal,Input,message,Row,Col,Table,Select} from 'antd'
import axios from 'axios'
import './model.css'
const {Option}=Select
class Add extends Component{
    constructor(props){
        super(props)
        this.state={
            visible:false,
            coeA:'',
            coeB:'',
            coeC:'',
            coeD:'',
            coeE:'',
            coeF:'',
            coeG:''
        }
        this.showModal=this.showModal.bind(this);
        this.inputChange=this.inputChange.bind(this);
        this.handleAdd=this.handleAdd.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.getAllModel=this.getAllModel.bind(this);
        this.selectChange=this.selectChange.bind(this)
    }
  
    showModal(){
        let {record,editFlag}=this.props
        this.setState({
            visible:true
        })
        if(editFlag){
            this.setState({
                name:record.name
            })
        }
        this.getAllModel()
    }
    /**获取所有产品型号*/
    getAllModel(){
        axios({
            url:this.props.url.fireProductModel.all,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            },
        }).then(data=>{
            let res=data.data.data
            this.setState({
                modelData:res
            })
        })
    }
    handleAdd(){
        let {productionCode,precursors,lithiumCarbonate,premix,production,
        coeA,coeB,coeC,coeD,coeE,coeF,coeG}=this.state
        if(precursors<=0){
            message.error('前驱体的重量需要>0!')
            return
        }
        if(lithiumCarbonate<0||premix<0){
            message.error('碳酸锂和氢氧化锂的重量需要>=0!')
            return
        }
        if(productionCode===undefined||precursors===undefined||lithiumCarbonate===undefined||premix===undefined||production===undefined){
            message.error('信息填写不完整!')
            return
        }
         let  params={
            code:this.props.editFlag?this.props.record.code:'',
            production:production,
            precursors:precursors,
            lithiumCarbonate: lithiumCarbonate,
            premix: premix,
            productionCode:productionCode,
            coeA:coeA,
            coeB:coeB,
            coeC:coeC,
            coeD:coeD,
            coeE:coeE,
            coeF:coeF,
            coeG:coeG
            
        }
        axios({
            url:this.props.editFlag?this.props.url.fireCoefficientRate.update:this.props.url.fireCoefficientRate.add,
            method:this.props.editFlag?'put':'post',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            data:params
        }).then(data=>{
            if(data.data.code===0){
                message.info('操作成功!')
                this.props.getTableData()
            }
            else{
                message.error(data.data.message)
            }
           
        }).catch(()=>{
            message.error('操作失败，请联系管理员!')
        })
        this.handleCancel()
    }
    handleCancel(){
        if(this.props.editFlag){
            this.setState({
                visible:false,
                productionCode:this.props.record.productionCode,
                precursors:this.props.record.precursors,
                lithiumCarbonate: this.props.record.lithiumCarbonate,
                premix: this.props.record.premix,
                production: this.props.record.production,
                coeA:this.props.record.coeA,
                coeB:this.props.record.coeB,
                coeC:this.props.record.coeC,
                coeD:this.props.record.coeD,
                coeE:this.props.record.coeE,
                coeF:this.props.record.coeF,
                coeG:this.props.record.coeG
            })
        }
       else{
        this.setState({
            visible:false,
            productionCode:undefined,
            precursors:undefined,
            lithiumCarbonate: undefined,
            premix: undefined,
            production: undefined,
            productionCode:undefined,
            coeA:'',
            coeB:'',
            coeC:'',
            coeD:'',
            coeE:'',
            coeF:'',
            coeG:''
        })
       }
    }
    selectChange(value){
        this.setState({
            productionCode:value
        })
    }
    inputChange(e){
        let value=e.target.value,name=e.target.name,{precursors,lithiumCarbonate,
            premix,production,coeA,coeB,coeC,coeD,coeE,coeF,coeG}=this.state
        if(name!=='name'){
            value =  value.replace(/[^\d\.]/g, "");  //只准输入数字和小数点
            if(value[value.length-1] !== '.')
                value = value === '' ? '' : parseFloat(value);  //将字符串转为浮点型
        }
        if(name==='precursors'){//前驱体
            if(value&&production&&production!==0){
                coeA=(value/production)?(value/production).toFixed(4):undefined
            }
            if(value&&value!==0&&premix){
                coeC=(premix/value)?(premix/value).toFixed(4):undefined
            }
            if(value&&premix&&premix!==0){
                coeE=(value/premix)?(value/premix).toFixed(4):undefined
            }
        }
        if(name==='lithiumCarbonate'){//碳酸锂
            if(value&&production&&production!==0){
                coeB=(value/production)?(value/production).toFixed(4):undefined
            }
            if(value&&value!==0&&production){
                coeD=(production/value)?(production/value).toFixed(4):undefined
            }
            if(value&&premix&&premix!==0){
                coeF=(value/premix)?(value/premix).toFixed(4):undefined
            }
        }
        if(name==='premix'){//预混料
            if(value&&value!==0&&precursors){
                coeE=(precursors/value)?(precursors/value).toFixed(4):undefined
            }
            if(value&&value!==0&&lithiumCarbonate){
                coeF=(lithiumCarbonate/value)?(lithiumCarbonate/value).toFixed(4):undefined
            }
            if(value&&value!==0&&production){
                coeG=(production/value)?(production/value).toFixed(4):undefined
            }
        }
        if(name==='production'){//产成品
          
            if(value&&value!==0&&precursors){
                coeA=(precursors/value)?(precursors/value).toFixed(4):undefined
            }   
            if(value&&value!==0&&lithiumCarbonate){
                coeB=(lithiumCarbonate/value)?(lithiumCarbonate/value).toFixed(4):undefined
            }    
            if(value&&precursors&&precursors!==0){
                coeC=(value/precursors)?(value/precursors).toFixed(4):undefined
            } 
            if(value&&premix&&lithiumCarbonate!==0){
                coeD=(value/lithiumCarbonate)?(value/lithiumCarbonate).toFixed(4):undefined
            }   
            if(value&&premix&&premix!==0){
                coeG=(value/premix)?(value/premix).toFixed(4):undefined
            }      
        }
        this.setState({
            [name]:value,
            coeA:coeA,
            coeB:coeB,
            coeC:coeC,
            coeD:coeD,
            coeE:coeE,
            coeF:coeF,
            coeG:coeG
        })
    }
    render(){
        let {addFlag,updateFlag,editFlag}=this.props,
            {name,precursors,lithiumCarbonate,
            premix,coeA,coeB,coeC,coeD,coeE,coeF,coeG,
            production,modelData,productionCode}=this.state
        return(
            <span>
                {
                    this.props.editFlag?<span  className={updateFlag?'blue':'hide'} onClick={this.showModal}>编辑</span>
                    :<span className={addFlag?'':'hide'}><NewButton  name='新增' className='fa fa-plus' handleClick={this.showModal}/></span>
                }
                <Modal
                    title={this.props.editFlag?'编辑':'新增'}
                    visible={this.state.visible}
                    width='700px'
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    footer={[
                        <CancleButton key='cancel' handleCancel={this.handleCancel}/>,
                        <NewButton key='new' handleClick={this.handleAdd} name='确定'/>
                    ]}
                >
                <div className='showModel'>
                    <div className='leftModel'>
                            <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                                <Col className='imgRequire'>产品型号：</Col>
                                <Col span={18}>
                                   <Select placeholder='请选择产品型号' style={{width:'240px'}} name='productionCode' value={productionCode} onChange={this.selectChange} disabled={editFlag}>
                                   {
                                       modelData?modelData.map(item=>{
                                           return(
                                               <Option key={item.code}>{item.name}</Option>
                                           )
                                       }):null
                                   }
                                   </Select>
                                </Col>
                            </Row>
                            <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                                <Col className='imgRequire'>前驱体：</Col>
                                <Col span={18}><Input placeholder='请输入前驱体重量' name='precursors'  value={precursors} onChange={this.inputChange}/></Col>
                            </Row>
                            <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                                <Col  className='imgRequire'>碳酸锂：</Col>
                                <Col span={18}><Input placeholder='请输入碳酸锂重量' name='lithiumCarbonate' value={lithiumCarbonate} onChange={this.inputChange}/></Col>
                            </Row>
                            <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                                <Col  className='imgRequire'>预混料：</Col>
                                <Col span={18}><Input  placeholder='请输入预混料重量'  name={'premix'} value={premix} onChange={this.inputChange}/></Col>
                            </Row>
                            <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                                <Col  className='imgRequire'>产成品：</Col>
                                <Col span={18}><Input  placeholder='请输入产成品重量'  name={'production'} value={production} onChange={this.inputChange}/></Col>
                            </Row>
                    </div>
                    <div className='rightModel '>
                            <div className='rightModelTableLeft'>a、前驱体材料折算成产成品：<span>{coeA}</span></div>
                            <div className='rightModelTableLeft'>b、碳酸锂材料折算成产成品：<span>{coeB}</span></div>
                            <div className='rightModelTableLeft'>c、产成品折算成前驱体：<span>{coeC}</span></div>
                            <div className='rightModelTableLeft'>d、产成品折算成碳酸锂：<span>{coeD}</span></div>
                            <div className='rightModelTableLeft'>e、预混折算成前驱体：<span>{coeE}</span></div>
                            <div className='rightModelTableLeft'>f、预混折算成碳酸锂：<span>{coeF}</span></div>
                            <div className='rightModelTableLeft1'>g、预混产品折算成成品(烧损系数)：<span>{coeG}</span></div>
                    </div>
                </div>
                </Modal>
            </span>
        )
    }
}
export default Add