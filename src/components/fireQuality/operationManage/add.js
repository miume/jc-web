import React ,{Component}from 'react'
import NewButton from "../../BlockQuote/newButton";
import {Modal,Input,message} from 'antd'
import CancleButton from "../../BlockQuote/cancleButton";
import axios from "axios";
import './operationMessage.css'
const { TextArea } = Input;

class Add extends Component{
    constructor(props){
        super(props)
        this.state={
            visible:false,
        }
        this.showModal=this.showModal.bind(this);
        this.show=this.show.bind(this);
        this.handleCreate=this.handleCreate.bind(this);
        this.cancel=this.cancel.bind(this);
        this.showTitle=this.showTitle.bind(this);
        this.inputChange=this.inputChange.bind(this)
    }
    showModal(){
        this.setState({
            visible:true
        })
        let {record,editflag,detailFlag}=this.props
        if(editflag||detailFlag){
            this.setState({
                title:record.title,
                content:record.content
            })
        }
    }
    /**判断展示新增，详情还是编辑*/
    show() {
        let {editflag, detailFlag} = this.props
        if (detailFlag) {
            return <span className={'blue'} onClick={this.showModal}>详情</span>
        } else if (editflag) {
            return <span className={'blue'} onClick={this.showModal}>编辑</span>
        } else {
            return <NewButton name={'新增'} className={'fa fa-plus'} handleClick={this.showModal}/>
        }
    }
    showTitle(){
        let {editflag, detailFlag} = this.props
        if (detailFlag) {
            return '详情'
        } else if (editflag) {
            return '编辑'
        } else {
            return '新增'
        }
    }
    inputChange(e){
        let name=e.target.name,value=e.target.value
        this.setState({
            [name]:value
        })
    }
    handleCreate(){
        let {editflag,record}=this.props,{content,title}=this.state
        if(content===undefined||content===''||title===undefined||title===''){
            message.error('信息填写不完整!')
            return
        }
        this.setState({
            visible:false
        })
        let data={
            code: editflag?record.code:'',
            content: content,
            title:  title
        }
        axios({
            url:`${this.props.url.fireMageOperation}`,
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
                title:record.name,
                content:record.unit
            })
        }
        else{
            this.setState({
                title:undefined,
                content:undefined
            })
        }
    }
    render(){
        let {visible,title,content}=this.state,{editflag,detailFlag,record}=this.props
        return(
            <span>
                    {this.show()}
                    <Modal
                        title={this.showTitle()}
                        visible={visible}
                        maskClosable={false}
                        closable={false}
                        centered={true}
                        width={'1000px'}
                        footer={[
                            <CancleButton key={'cancel'} handleCancel={this.cancel} flag={detailFlag?true:false}/>,
                            detailFlag?null:(<NewButton key={'ok'} name={'确定'} className={'fa fa-check'} handleClick={this.handleCreate}/>)
                        ]}
                    >
                        {detailFlag?
                            <div>
                                <div>
                                    标题：&nbsp;
                                    <span className='fire-operation-detail-divTitle'>{title}</span>
                                </div>
                                <br/>
                                <div>
                                    内容：&nbsp;
                                    <span className='fire-operation-detail-divContent'>{content}</span>
                                </div>
                            </div>:
                            <div>
                                <div>标题 : <Input name={'title'} style={{width:'900px'}} placeholder={'请输入标题'} onChange={this.inputChange} value={title} /></div>
                                <br/>
                                <div>内容 : <TextArea name={'content'} rows={10} style={{width:'900px',overflowY:'auto'}} placeholder={'请输入内容'} onChange={this.inputChange} value={content} /></div>
                            </div>
                        }

                    </Modal>
                </span>
        )
    }
}
export default Add