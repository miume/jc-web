/**
 * author：yangmei
 * date : 2019-05-26
 * */
import React from 'react';
import axios from 'axios';
import {Divider, Modal, message, Tooltip} from "antd";
import CancleButton from "../BlockQuote/cancleButton";
import NewButton from "../BlockQuote/newButton";
import ChangePasswordModal from "./changePasswordModal";
import {withRouter} from "react-router-dom";

class ChangePassword extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            visible : false
        }
        this.ok = this.ok.bind(this)
        this.click = this.click.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.changePassword = this.changePassword.bind(this)
    }
    //点击修改密码，显示弹出框
    click(){
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
        const url = JSON.parse(localStorage.getItem('url'));
        let params = getValue.getFieldsValue()
        console.log(params)
        if(params['newPassword'] !== params['confirm']){
            message.info('前后两次输入密码不一致！')
            return
        }
        if(!params['oldPassword'] || !params['newPassword'] || !params['confirm'] ){
            message.info('信息填写不完整！')
            return
        }
        params['userId'] = this.props.userId
        this.changePassword(params,url)
        this.handleCancel()
        //退出登录
        localStorage.clear()
        this.props.logout()
        this.props.history.push({pathname: '/'})
    }
    changePassword(params,url){
        axios({
            method:'put',
            url:`${url.passwordChange}`,
            headers:{
                'Authorization':url.Authorization
            },
            data:params,
            type:'json'
        }).then((data)=>{
            message.info(data.data.message)
        }).catch(error=>{
            message.info(error.message)
        })
    }
    render(){
        return (
            <div>
                <Tooltip placement="bottomLeft" title="修改密码" overlayClassName='toolTip'>
                <div className="fr userName">
                    <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                    <span onClick={this.click}>{this.props.userName}</span>
                    <Divider type='vertical' />
                </div>
                </Tooltip>
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
export default withRouter(ChangePassword)
