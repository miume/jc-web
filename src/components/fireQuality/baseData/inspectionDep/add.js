import React ,{Component}from 'react'
import NewButton from "../../../BlockQuote/newButton";
import {Modal,Input,message} from 'antd'
import CancleButton from "../../../BlockQuote/cancleButton";
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
        let {record,editflag}=this.props
        this.setState({
            visible:true
        })
       if(editflag){
        this.setState({
            deptName:record.deptName,
            descr:record.descr
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
        let {editflag,record}=this.props,{deptName,descr}=this.state
        let data={
            code: editflag?record.code:'',
            deptName: deptName,
            descr: descr
        }
        if(data['deptName']===undefined||data['deptName']===''||data['descr']===undefined||data['descr']===''){
            message.error('信息填写不完整!')
            return
        }
        this.setState({
            visible:false
        })
        axios({
            url:`${this.props.url.fireMageDept.add}`,
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
                deptName:record.deptName,
                descr:record.descr
            })
        }
        else{
            this.setState({
                deptName:undefined,
                descr:undefined
            })
        }
    }
    render(){
        let {visible,deptName,descr}=this.state,{editflag,record}=this.props
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
                    width={'360px'}
                    footer={[
                        <CancleButton key={'cancel'} handleCancel={this.cancel} />,
                        (<NewButton key={'ok'} name={'确定'} className={'fa fa-check'} handleClick={this.handleCreate}/>)
                    ]}
                >
                        <div><span >部门名称 : </span><Input name={'deptName'} style={{width:'250px'}} placeholder={'请输入部门名称'} onChange={this.inputChange} value={deptName}/></div>
                        <br/>
                        <div><span >部门描述 : </span><Input name={'descr'} style={{width:'250px'}} placeholder={'请输入部门描述'} onChange={this.inputChange} value={descr}/></div>
                        <div>

                        </div>
                    </Modal>
                </span>
        )
    }
}
export default Add