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
        }
        this.showModal=this.showModal.bind(this);
        this.handleCreate=this.handleCreate.bind(this);
        this.cancel=this.cancel.bind(this);
        this.getProcess=this.getProcess.bind(this);
        this.getModel=this.getModel.bind(this);
        this.handleVisible=this.handleVisible.bind(this);
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

    handleCreate(){
        this.child.export()
    }
    handleVisible(value){
        this.setState({
            visible:value
        })
    }
    cancel(){
        this.child.cancel()
    }
    render(){
        let {visible,processData,modelData}=this.state
        return(
            <span>
                <NewButton name={'导出'} className={'fa fa-plus'} handleClick={this.showModal}/>
                <Modal
                    title={'导出'}
                    visible={visible}
                    maskClosable={false}
                    closable={false}
                    centered={true}
                    width={'1000px'}
                    footer={[
                        <CancleButton key={'cancel'} handleCancel={this.cancel} />,
                        (<NewButton key={'ok'} name={'导出'} className={'fa fa-check'} handleClick={this.handleCreate}/>)
                    ]}
                >
                        <ExportModal processData={processData} modelData={modelData} 
                         url={this.props.url} onRef={(ref)=>this.child=ref} handleVisible={this.handleVisible}
                        />
                    </Modal>
                </span>
        )
    }
}
export default ExportFile