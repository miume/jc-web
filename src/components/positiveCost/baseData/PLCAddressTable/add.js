import React,{Component} from 'react'
import NewButton from '../../../BlockQuote/newButton'
import CancleButton from '../../../BlockQuote/cancleButton'
import {Modal,Row,Col,Input,message} from 'antd'
import axios from 'axios'

class PLCAddressAdd extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            plcAddress:undefined,
            description:undefined
        }
        this.showModal=this.showModal.bind(this);
        this.handleAdd=this.handleAdd.bind(this);
        this.handleAddCancel=this.handleAddCancel.bind(this);
        this.inputChange=this.inputChange.bind(this);
        this.getEditData=this.getEditData.bind(this);
    }
    getEditData(){
        axios({
            url:`${this.props.url.positivePlcSddress.getRecordById}`,
            method:'get',
            headers:{
              'Authorization':this.props.url.Authorization
          },
          params:{
              id:this.props.code
          }
        }).then(data=>{
            let res=data.data.data
            if(res){
                this.setState({
                    plcAddress:res.plcAddress,
                    description:res.description
                })
            }
        })
    }
    showModal(){
        if(this.props.editflag){
            this.getEditData()
        }
        this.setState({
            visible:true
        })
    }
    handleAdd(){
        let {plcAddress,description}=this.state
        if(!plcAddress||!description){
            message.error('信息填写不完整!')
            return
        }
        let data={
            plcAddress:plcAddress,
            description:description
        }
        axios({
            url:this.props.editFlag?this.props.url.positivePlcSddress.update:this.props.url.positivePlcSddress.add,
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
            plcAddress:undefined,
            description:undefined
        })
    }
    inputChange(e){
        let name=e.target.name,
            value=e.target.value
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
                        <Col className='imgRequire'>PLC地址
                        </Col>
                        <Col span={18}><Input placeholder='请输入PLC地址' onChange={this.inputChange} name='plcAddress' value={this.state.plcAddress}/></Col>
                    </Row>
                    <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                        <Col className='imgRequire'>地址说明</Col>
                        <Col span={18}><Input placeholder='请输入地址说明' onChange={this.inputChange} name='description' value={this.state.description}/></Col>
                    </Row>
                </Modal>
            </span>
        );
    }
}
export default PLCAddressAdd