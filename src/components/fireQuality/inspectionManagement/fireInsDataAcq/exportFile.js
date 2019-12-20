import React ,{Component}from 'react'
import NewButton from "../../../BlockQuote/newButton";
import {Modal} from 'antd'
import CancleButton from "../../../BlockQuote/cancleButton";
import axios from "axios";
import ExportModal from "./exportModal";
class ExportFile extends Component{
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
        this.selectChange=this.selectChange.bind(this);
    }
    showModal(){
        this.setState({
            visible:true
        })
    }

    inputChange(e){
        let name=e.target.name,value=e.target.value
        this.setState({
            changeFlag:true,
            [name]:value
        })
    }
    selectChange(){
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
        // axios({
        //     url:`${this.props.url.fireMageTestItems}`,
        //     method:editflag?'put':'post',
        //     headers:{
        //         'Authorizaion':this.props.url.Authorizaion
        //     },
        //     data
        // }).then(data=>{
        //     if(data.data.code===0){
        //         message.info('操作成功！')
        //         this.props.getTableData()
        //     }
        //     else{
        //         message.error('操作失败，请联系管理员!')
        //     }
        // })
    }
    cancel(){
        this.setState({
            visible:false
        })

    }
    render(){
        let {visible}=this.state
        return(
            <span>
                <NewButton name={'导出'} className={'fa fa-plus'} handleClick={this.showModal}/>
                <Modal
                    title={'导出'}
                    visible={visible}
                    maskClosable={false}
                    closable={false}
                    centered={true}
                    width={'800px'}
                    footer={[
                        <CancleButton key={'cancel'} handleCancel={this.cancel} />,
                        (<NewButton key={'ok'} name={'导出'} className={'fa fa-check'} handleClick={this.handleCreate}/>)
                    ]}
                >
                        <ExportModal/>
                    </Modal>
                </span>
        )
    }
}
export default ExportFile