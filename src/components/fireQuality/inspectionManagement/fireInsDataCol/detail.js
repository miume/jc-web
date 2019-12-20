import React ,{Component}from 'react'
import {Modal,Input,message} from 'antd'
import CancleButton from "../../../BlockQuote/cancleButton";

import axios from "axios";
class Detail extends Component{
    constructor(props){
        super(props)
        this.state={
            visible:false,
            changeFlag:false,//监听渲染初始值还是已改变的值
        }
        this.showModal=this.showModal.bind(this);
        this.cancel=this.cancel.bind(this);
    }
    showModal(){
        this.setState({
            visible:true
        })
    }

    cancel(){
        this.setState({
            visible:false
        })

    }
    render(){
        let {visible,changeFlag}=this.state,{editflag,record}=this.props
        return(
            <span>
                <span className={'blue'} onClick={this.showModal}>详情</span>

                <Modal
                    title={'详情'}
                    visible={visible}
                    maskClosable={false}
                    closable={false}
                    centered={true}
                    width={'400px'}
                    footer={[
                        <CancleButton key={'cancel'} handleCancel={this.cancel} flag={true}/>,
                    ]}
                >
                        <div><span className='fireQua-add-span fireQua-add-span-width1'>检验项目名称 : </span><Input name={'name'} style={{width:'250px'}} placeholder={'请输入检验项目名称'} onChange={this.inputChange} defaultValue={(editflag && !changeFlag)?record.name:undefined}/></div>
                        <br/>
                        <div><span className='fireQua-add-span fireQua-add-span-width1'>单位 : </span><Input name={'unit'} style={{width:'250px'}} placeholder={'请输入单位'} onChange={this.inputChange} defaultValue={(editflag && !changeFlag)?record.unit:undefined}/></div>
                    </Modal>
                </span>
        )
    }
}
export default Detail