import React,{Component} from 'react'
import NewButton from '../../../BlockQuote/newButton'
import CancleButton from '../../../BlockQuote/cancleButton'
import {Modal,Row,Col,Input,message} from 'antd'

import axios from 'axios'
class ProductLineAdd extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            productLineName:''
        }
        this.showModal=this.showModal.bind(this);
        this.handleOk=this.handleOk.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.init=this.init.bind(this);
        this.inputChange=this.inputChange.bind(this);
    }
    componentDidMount(){
        this.init();
    }
    componentWillUnmount(){
        this.setState=()=>{
            return
        }
    }
    showModal(){
        this.setState({
            visible:true
        })
    }
    handleOk(){
        this.setState({
            visible:false
        })
        let {productLineName}=this.state;
        let data={
            code:this.props.editflag?this.props.code:'',
            name:productLineName
        }
        if(!productLineName){
            message.info('信息填写不完整!')
            return
        }
        axios({
            url:this.props.editflag?this.props.url.positiveProductline.update:this.props.url.positiveProductline.add,
            method:this.props.editflag?'put':'post',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            data:data
        }).then(data=>{
            if(data.data.code===0){
                message.info('操作成功!')
                this.props.getTableData()
            }
            else{
                message.info(data.data.message)
            }
        }).catch(error=>{
            message.error('操作失败，请联系管理员!')
        })
        this.handleCancel()
    }
    handleCancel(){
        this.setState({
            visible:false
        })
        this.init()
    }
    init(){
        if(this.props.editflag){
            this.setState({
                productLineName:this.props.record.name
            })
        }
        else{
            this.setState({
                productLineName:''
            })
        }
    }
    inputChange(e){
        let name=e.target.name,value=e.target.value;
        this.setState({
            [name]:value  //增加键值对
        })
    }
    render(){
        let {productLineName}=this.state,{addFlag,updateFlag}=this.props
        return(
            <span>
                {this.props.editflag?<span className={updateFlag?'blue':'hide'} onClick={this.showModal}>编辑</span>
                :<span className={addFlag?'':'hide'}>
                    <NewButton name='新增' className='fa fa-plus' handleClick={this.showModal}/>
                </span>}
                <Modal
                    title={this.props.editflag?'编辑生产线':'新增生产线'}
                    visible={this.state.visible}
                    closable={false}
                    maskClosable={false}
                    width='450px'
                    footer={[
                        <CancleButton key='cancel' handleCancel={this.handleCancel}/>,
                        <NewButton key='ok' handleClick={this.handleOk} className='fa fa-check' name='确定'/>
                    ]}
                >
                 <div>
                    <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                        <Col className='imgRequire'>生产线名称</Col>
                        <Col span={18}><Input name='productLineName' placeholder='请输入生产线名称' value={productLineName} onChange={this.inputChange}/></Col>
                    </Row>
                  </div>
                </Modal>
            </span>
        );
    }
}
export default ProductLineAdd