import React,{Component} from 'react'
import NewButton from '../../../BlockQuote/newButton'
import CancleButton from '../../../BlockQuote/cancleButton'
import {Modal,Input,message,Row,Col,Table} from 'antd'
import axios from 'axios'
import './model.css'
class Add extends Component{
    constructor(props){
        super(props)
        this.state={
            visible:false,
            name:undefined,
            aValue:'',
            bValue:'',
            cValue:'',
            dValue:'',
            eValue:'',
            fValue:'',
            gValue:'',
        }
        this.showModal=this.showModal.bind(this);
        this.inputChange=this.inputChange.bind(this);
        this.handleAdd=this.handleAdd.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
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
    }
    handleAdd(){
        let {name,matchingCoefficientPrecursors,matchingCoefficientLithiumCarbonate,matchingCoefficientLithiumOh}=this.state
        if(matchingCoefficientPrecursors<=0){
            message.error('前驱体的重量需要>0!')
            return
        }
        if(matchingCoefficientLithiumCarbonate<0||matchingCoefficientLithiumOh<0){
            message.error('碳酸锂和氢氧化锂的重量需要>=0!')
            return
        }
        if(name===undefined||matchingCoefficientPrecursors===undefined||matchingCoefficientLithiumCarbonate===undefined||matchingCoefficientLithiumOh===undefined){
            message.error('信息填写不完整!')
            return
        }
         let  params={
            code:this.props.editFlag?this.props.record.code:'',
            name:name,
            matchingCoefficientPrecursors:matchingCoefficientPrecursors,
            matchingCoefficientLithiumCarbonate: matchingCoefficientLithiumCarbonate,
            matchingCoefficientLithiumOh: matchingCoefficientLithiumOh
        }
        axios({
            url:this.props.editFlag?this.props.url.positiveModel.update:this.props.url.positiveModel.add,
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
                name:this.props.record.name
            })
        }
       else{
        this.setState({
            visible:false,
            name:undefined,
            matchingCoefficientPrecursors:undefined,
            matchingCoefficientLithiumCarbonate: undefined,
            matchingCoefficientLithiumOh: undefined,
            matchingCoefficientLithiumPro: undefined,
            aValue:'',
            bValue:'',
            cValue:'',
            dValue:'',
            eValue:'',
            fValue:'',
            gValue:'',
        })
       }
    }
    inputChange(e){
        let value=e.target.value,name=e.target.name,{matchingCoefficientPrecursors,matchingCoefficientLithiumCarbonate,
            matchingCoefficientLithiumOh,matchingCoefficientLithiumPro,aValue,bValue,cValue,dValue,eValue,fValue,gValue}=this.state
        if(name!=='name'){
            value =  value.replace(/[^\d\.]/g, "");  //只准输入数字和小数点
            if(value[value.length-1] !== '.')
                value = value === '' ? '' : parseFloat(value);  //将字符串转为浮点型
        }
        if(name==='matchingCoefficientPrecursors'){//前驱体
            if(value&&matchingCoefficientLithiumPro&&matchingCoefficientLithiumPro!==0){
                aValue=(value/matchingCoefficientLithiumPro)?(value/matchingCoefficientLithiumPro).toFixed(4):undefined
            }
            if(value&&value!==0&&matchingCoefficientLithiumOh){
                cValue=(matchingCoefficientLithiumOh/value)?(matchingCoefficientLithiumOh/value).toFixed(4):undefined
            }
            if(value&&matchingCoefficientLithiumOh&&matchingCoefficientLithiumOh!==0){
                eValue=(value/matchingCoefficientLithiumOh)?(value/matchingCoefficientLithiumOh).toFixed(4):undefined
            }
        }
        if(name==='matchingCoefficientLithiumCarbonate'){//碳酸锂
            if(value&&matchingCoefficientLithiumPro&&matchingCoefficientLithiumPro!==0){
                bValue=(value/matchingCoefficientLithiumPro)?(value/matchingCoefficientLithiumPro).toFixed(4):undefined
            }
            if(value&&value!==0&&matchingCoefficientLithiumPro){
                dValue=(matchingCoefficientLithiumPro/value)?(matchingCoefficientLithiumPro/value).toFixed(4):undefined
            }
            if(value&&matchingCoefficientLithiumOh&&matchingCoefficientLithiumOh!==0){
                fValue=(value/matchingCoefficientLithiumOh)?(value/matchingCoefficientLithiumOh).toFixed(4):undefined
            }
        }
        if(name==='matchingCoefficientLithiumOh'){//预混料
            if(value&&value!==0&&matchingCoefficientPrecursors){
                eValue=(matchingCoefficientPrecursors/value)?(matchingCoefficientPrecursors/value).toFixed(4):undefined
            }
            if(value&&value!==0&&matchingCoefficientLithiumCarbonate){
                fValue=(matchingCoefficientLithiumCarbonate/value)?(matchingCoefficientLithiumCarbonate/value).toFixed(4):undefined
            }
            if(value&&value!==0&&matchingCoefficientLithiumPro){
                gValue=(matchingCoefficientLithiumPro/value)?(matchingCoefficientLithiumPro/value).toFixed(4):undefined
            }
        }
        if(name==='matchingCoefficientLithiumPro'){//产成品
          
            if(value&&value!==0&&matchingCoefficientPrecursors){
                aValue=(matchingCoefficientPrecursors/value)?(matchingCoefficientPrecursors/value).toFixed(4):undefined
            }   
            if(value&&value!==0&&matchingCoefficientLithiumCarbonate){
                bValue=(matchingCoefficientLithiumCarbonate/value)?(matchingCoefficientLithiumCarbonate/value).toFixed(4):undefined
            }    
            if(value&&matchingCoefficientPrecursors&&matchingCoefficientPrecursors!==0){
                cValue=(value/matchingCoefficientPrecursors)?(value/matchingCoefficientPrecursors).toFixed(4):undefined
            } 
            if(value&&matchingCoefficientLithiumOh&&matchingCoefficientLithiumCarbonate!==0){
                dValue=(value/matchingCoefficientLithiumCarbonate)?(value/matchingCoefficientLithiumCarbonate).toFixed(4):undefined
            }   
            if(value&&matchingCoefficientLithiumOh&&matchingCoefficientLithiumOh!==0){
                gValue=(value/matchingCoefficientLithiumOh)?(value/matchingCoefficientLithiumOh).toFixed(4):undefined
            }      
        }
        this.setState({
            [name]:value,
            aValue:aValue,
            bValue:bValue,
            cValue:cValue,
            dValue:dValue,
            eValue:eValue,
            fValue:fValue,
            gValue:gValue
        })
    }
    render(){
        let {addFlag,updateFlag,editFlag}=this.props,
            {name,matchingCoefficientPrecursors,matchingCoefficientLithiumCarbonate,
            matchingCoefficientLithiumOh,aValue,bValue,cValue,dValue,eValue,fValue,gValue,
            matchingCoefficientLithiumPro}=this.state
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
                                <Col span={18}><Input placeholder='请输入产品型号' name='name' value={name} onChange={this.inputChange} disabled={editFlag}/></Col>
                            </Row>
                            <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                                <Col className='imgRequire'>前驱体：</Col>
                                <Col span={18}><Input placeholder='请输入前驱体重量' name='matchingCoefficientPrecursors'  value={matchingCoefficientPrecursors} onChange={this.inputChange}/></Col>
                            </Row>
                            <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                                <Col  className='imgRequire'>碳酸锂：</Col>
                                <Col span={18}><Input placeholder='请输入碳酸锂重量' name='matchingCoefficientLithiumCarbonate' value={matchingCoefficientLithiumCarbonate} onChange={this.inputChange}/></Col>
                            </Row>
                            <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                                <Col  className='imgRequire'>预混料：</Col>
                                <Col span={18}><Input  placeholder='请输入预混料重量'  name={'matchingCoefficientLithiumOh'} value={matchingCoefficientLithiumOh} onChange={this.inputChange}/></Col>
                            </Row>
                            <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                                <Col  className='imgRequire'>产成品：</Col>
                                <Col span={18}><Input  placeholder='请输入产成品重量'  name={'matchingCoefficientLithiumPro'} value={matchingCoefficientLithiumPro} onChange={this.inputChange}/></Col>
                            </Row>
                    </div>
                    <div className='rightModel '>
                            <div className='rightModelTableLeft'>a、前驱体材料折算成产成品：<span>{aValue}</span></div>
                            <div className='rightModelTableLeft'>b、碳酸锂材料折算成产成品：<span>{bValue}</span></div>
                            <div className='rightModelTableLeft'>c、产成品折算成前驱体：<span>{cValue}</span></div>
                            <div className='rightModelTableLeft'>d、产成品折算成碳酸锂：<span>{dValue}</span></div>
                            <div className='rightModelTableLeft'>e、预混折算成前驱体：<span>{eValue}</span></div>
                            <div className='rightModelTableLeft'>f、预混折算成碳酸锂：<span>{fValue}</span></div>
                            <div className='rightModelTableLeft1'>g、预混产品折算成成品(烧损系数)：<span>{gValue}</span></div>
                    </div>
                </div>
                </Modal>
            </span>
        )
    }
}
export default Add