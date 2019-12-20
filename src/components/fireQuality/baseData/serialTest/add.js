import React ,{Component}from 'react'
import NewButton from "../../../BlockQuote/newButton";
import {Modal,Select,message} from 'antd'
import CancleButton from "../../../BlockQuote/cancleButton";
import axios from "axios";
const {Option}=Select
class Add extends Component{
    constructor(props){
        super(props)
        this.state={
            visible:false,
            changeFlag:false,//监听渲染初始值还是已改变的值
        }
        this.showModal=this.showModal.bind(this);
        this.handleCreate=this.handleCreate.bind(this);
        this.cancel=this.cancel.bind(this);
        this.selectChange=this.selectChange.bind(this);
    }
    showModal(){
        this.setState({
            visible:true
        })
    }

    selectChange(value,option){
        this.setState({
            changeFlag:true,
            // [name]:value
        })
    }
    handleCreate(){
        let {editflag,record}=this.props,{name,unit,changeFlag}=this.state
        this.setState({
            visible:false
        })
        let data={
            code: editflag?record.code:'',
            name: editflag&&!changeFlag?record.name:name,
            unit:  editflag&&!changeFlag?record.unit:unit
        }
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
        let {visible,changeFlag}=this.state,{editflag,record,showFlag}=this.props
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
                    width={'500px'}
                    footer={[
                        <CancleButton key={'cancel'} handleCancel={this.cancel} />,
                        (<NewButton key={'ok'} name={'确定'} className={'fa fa-check'} handleClick={this.handleCreate}/>)
                    ]}
                >
                    {
                        showFlag ? null:(
                         <div>
                             <div><span className='fireQua-add-span fireQua-add-span-width2'>请选择工序 : </span><Select name={'name'} style={{width:'310px'}} placeholder={'请选择工序'} onChange={this.selectChange} defaultValue={(editflag && !changeFlag)?record.name:undefined}/></div>
                             <br/>
                             <div> <span className='fireQua-add-span fireQua-add-span-width2' >请选择产品型号/厂家 : </span><Select name={'unit'} style={{width:'310px'}} placeholder={'请选择产品型号/厂家'} onChange={this.selectChange} defaultValue={(editflag && !changeFlag)?record.unit:undefined}/></div>
                             <br/>
                         </div>
                        )
                    }
                    <div> <span className='fireQua-add-span fireQua-add-span-width2' >请选择绑定检验项目 : </span></div>
                    <div className={'fireQua-add-check-group'}>

                    </div>
                </Modal>
            </span>
        )
    }
}
export default Add