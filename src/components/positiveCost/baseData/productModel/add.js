import React,{Component} from 'react'
import NewButton from '../../../BlockQuote/newButton'
import CancleButton from '../../../BlockQuote/cancleButton'
import {Modal,Input,message,Row,Col} from 'antd'
import axios from 'axios'
import './model.css'
class Add extends Component{
    constructor(props){
        super(props)
        this.state={
            visible:false,
            name:undefined
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
        this.setState({
            visible:false
        })
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
            name:undefined
        })
       }
    }
    inputChange(e){
        let value=e.target.value,name=e.target.name
        if(name!=='name'){
            value =  value.replace(/[^\d\.]/g, "");  //只准输入数字和小数点
            // if(value[value.length-1] !== '.')
            //     value = value === '' ? '' : parseFloat(value);  //将字符串转为浮点型
        }

        this.setState({
            [name]:value
        })
    }
    render(){
        let {addFlag,updateFlag,editFlag}=this.props,{name,matchingCoefficientPrecursors,matchingCoefficientLithiumCarbonate,matchingCoefficientLithiumOh}=this.state
        return(
            <span>
                {
                    this.props.editFlag?<span  className={updateFlag?'blue':'hide'} onClick={this.showModal}>编辑</span>
                    :<span className={addFlag?'':'hide'}><NewButton  name='新增' className='fa fa-plus' handleClick={this.showModal}/></span>
                }
                <Modal
                    title={this.props.editFlag?'编辑':'新增'}
                    visible={this.state.visible}
                    width='400px'
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    footer={[
                        <CancleButton key='cancel' handleCancel={this.handleCancel}/>,
                        <NewButton key='new' handleClick={this.handleAdd} name='确定'/>
                    ]}
                >
                <div >
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
                        <Col  className='imgRequire'>氢氧化锂：</Col>
                        <Col span={18}><Input  placeholder='请输入氢氧化锂重量'  name={'matchingCoefficientLithiumOh'} value={matchingCoefficientLithiumOh} onChange={this.inputChange}/></Col>
                    </Row>
                 </div>
                </Modal>
            </span>
        )
    }
}
export default Add