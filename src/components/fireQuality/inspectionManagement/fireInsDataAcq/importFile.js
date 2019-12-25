import React ,{Component}from 'react'
import NewButton from "../../../BlockQuote/newButton";
import {Modal,message} from 'antd'
import CancleButton from "../../../BlockQuote/cancleButton";
import axios from "axios";
import ImportModal from "./importModal";
class ImportFile extends Component{
    constructor(props){
        super(props)
        this.state={
            visible:false,
            changeFlag:false,//监听渲染初始值还是已改变的值
        }
        this.showModal=this.showModal.bind(this);
        this.handleCreate=this.handleCreate.bind(this);
        this.cancel=this.cancel.bind(this);
        this.inputChange=this.inputChange.bind(this)
        this.getProcess=this.getProcess.bind(this);
        this.getModel=this.getModel.bind(this);
    }
    showModal(){
        this.setState({
            visible:true
        })
        this.getModel()
        this.getProcess()
    }
        /**获取工序*/
    getProcess(){
        axios({
            url:`${this.props.url.fireMageNumber}/detail`,
            method:'get',
            headers:{
                'Authorizaion':this.props.url.Authorizaion
            },
            params: {
                position:1
            }
        }).then(data=>{
            let res=data.data.data
            if(res){
                this.setState({
                    processData:res
                })
            }
        })
    }
    /**获取产品型号*/
    getModel(){
        axios({
            url:`${this.props.url.fireMageNumber}/detail`,
            method:'get',
            headers:{
                'Authorizaion':this.props.url.Authorizaion
            },
            params:{
                position:4
            }
        }).then(data=>{
            let res=data.data.data
            if(res){
                this.setState({
                    modelData:res
                })
            }
        })
    }
    inputChange(e){
        let name=e.target.name,value=e.target.value
        this.setState({
            changeFlag:true,
            [name]:value
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
        let {visible,processData,modelData}=this.state
        return(
            <span>
                <NewButton name={'导入'} className={'fa fa-plus'} handleClick={this.showModal}/>
                <Modal
                    title={'导入'}
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
                       <ImportModal processData={processData} modelData={modelData}/>
                    </Modal>
                </span>
        )
    }
}
export default ImportFile