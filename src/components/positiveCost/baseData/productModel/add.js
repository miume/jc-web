import React,{Component} from 'react'
import NewButton from '../../../BlockQuote/newButton'
import CancleButton from '../../../BlockQuote/cancleButton'
import {Modal,Input,message} from 'antd'
import axios from 'axios'
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
    componentDidMount(){
        //console.log(this.props.record)
    }
    showModal(){
        this.setState({
            visible:true
        })
    }
    handleAdd(){
        let {name}=this.state,
            params={
            code:this.props.editFlag?this.props.record.code:'',
            name:name
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
        let value=e.target.value
        this.setState({
            name:value
        })
    }
    render(){
        return(
            <span>
                {this.props.editFlag?<span className='blue' onClick={this.showModal}>编辑</span>
                :<NewButton name='新增产品线' handleClick={this.showModal}/>}
                <Modal
                    title={this.props.editFlag?'编辑':'新增'}
                    visible={this.state.visible}
                    width='350px'
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    footer={[
                        <CancleButton key='cancel' handleCancel={this.handleCancel}/>,
                        <NewButton key='new' handleClick={this.handleAdd} name='确定'/>
                    ]}
                >
                <div>
                    <span>产线型号 : </span>
                    <Input placeholder='请输入产线型号' defaultValue={this.props.record&&this.props.record.name&&this.props.editFlag?this.props.record.name:undefined}  onChange={this.inputChange} style={{width:'200px'}}/>
                </div>
                </Modal>
            </span>
        )
    }
}
export default Add