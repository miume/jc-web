import React ,{Component}from 'react'
import NewButton from "../../../BlockQuote/newButton";
import {Modal,Input,message} from 'antd'
import CancleButton from "../../../BlockQuote/cancleButton";
import './fireQua.css'
import axios from "axios";
class Add extends Component{
    constructor(props){
        super(props)
        this.state={
            visible:false,
        }
        this.showModal=this.showModal.bind(this);
        this.handleCreate=this.handleCreate.bind(this);
        this.cancel=this.cancel.bind(this);
        this.inputChange=this.inputChange.bind(this)
    }
    showModal(){
        this.setState({
            visible:true
        })
        let {record,editflag}=this.props
        if(editflag){
            this.setState({
                name:record.name,
                unit:record.unit
            })
        }
    }

    inputChange(e){
        let name=e.target.name,value=e.target.value
        this.setState({
            [name]:value
        })

    }
    handleCreate(){
        let {editflag,record}=this.props,{name,unit}=this.state   
        let data={
            code: editflag?record.code:'',
            name: name,
            unit: unit
        }
        if(data['name']===undefined||data['name']===''||data['unit']===undefined||data['unit']===''){
            message.error('信息填写不完整!')
            return
        }
        this.setState({
            visible:false
        })
        axios({
            url:`${this.props.url.fireMageTestItems}`,
            method:editflag?'put':'post',
            headers:{
                'Authorizaion':this.props.url.Authorizaion
            },
            data
        }).then(data=>{
            if(data.data.code===0){
                message.info('操作成功！')
                this.props.getTableData()
            }
            else{
                message.error('操作失败，请联系管理员!')
            }
        })
    }
    cancel(){
        let {record,editflag}=this.props
        this.setState({
            visible:false
        })
        if(editflag){
            this.setState({
                name:record.name,
                unit:record.unit
            })
        }
        else{
            this.setState({
                name:undefined,
                unit:undefined
            })
        }
    }
    render(){
        let {visible,name,unit}=this.state,{editflag,record}=this.props
        return(
            <span>
                {editflag?<span className={'blue'} onClick={this.showModal}>编辑</span>
                : <NewButton name={'新增'} className={'fa fa-plus'} handleClick={this.showModal}/>}
                <Modal
                    title={editflag?'编辑':'新增'}
                    visible={visible}
                    maskClosable={false}
                    closable={false}
                    centered={true}
                    width={'400px'}
                    footer={[
                        <CancleButton key={'cancel'} handleCancel={this.cancel} />,
                        (<NewButton key={'ok'} name={'确定'} className={'fa fa-check'} handleClick={this.handleCreate}/>)
                    ]}
                >
                        <div><span className='fireQua-add-span fireQua-add-span-width1'>检验项目名称 : </span><Input name={'name'} style={{width:'250px'}} placeholder={'请输入检验项目名称'} onChange={this.inputChange} value={name}/></div>
                        <br/>
                        <div><span className='fireQua-add-span fireQua-add-span-width1'>单位 : </span><Input name={'unit'} style={{width:'250px'}} placeholder={'请输入单位'} onChange={this.inputChange} value={unit}/></div>
                    </Modal>
                </span>
        )
    }
}
export default Add