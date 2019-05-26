/**
 * author：yangmei
 * date : 2019-05-26
 * */
import React from 'react'
import {Divider, Modal,message} from "antd";
import CancleButton from "../BlockQuote/cancleButton";
import NewButton from "../BlockQuote/newButton";
import ChangePasswordModal from "./changePasswordModal";

class ChangePassword extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            visible : false
        }
        this.ok = this.ok.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.changePassword = this.changePassword.bind(this)
    }
    //点击修改密码，显示弹出框
    changePassword(){
        this.setState({
            visible : true
        })
    }
    //取消弹出框
    handleCancel(){
        this.setState({
            visible : false
        })
        this.formRef.props.form.resetFields()
    }
    ok(){
        let getValue = this.formRef.props.form
        console.log(getValue.getFieldsValue())
        let password = getValue.getFieldValue('password')
        let newPassword = getValue.getFieldValue('newPassword')
        let confrimPassword = getValue.getFieldValue('confirm')
        if(password==='' && newPassword==='' && confrimPassword ===''){
            message.info('信息填写不完整！')
            return
        }
        console.log(password,newPassword,confrimPassword)
        this.handleCancel()
    }
    render(){
        return (
            <div className="fr userName">
                <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                <span onClick={this.changePassword}>{this.props.userName}</span>
                <Divider type='vertical' />
                <Modal visible={this.state.visible} title={'修改密码'}
                       closable={false} maskClosable={false} centered={true} className={'modal-sm'}
                       footer={[
                           <CancleButton key='back' handleCancel={this.handleCancel} />,
                           <NewButton key={'save'} name='确定' handleClick={this.ok}/>
                       ]}
                >
                    <ChangePasswordModal wrappedComponentRef={(form) => this.formRef = form} />
                </Modal>
            </div>
        )
    }
}
export default ChangePassword