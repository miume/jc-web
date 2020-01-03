/**
 * author：yangmei
 * date : 2019-05-26
 * */
import React from 'react';
import axios from 'axios';
import {Divider, Modal, message, Tooltip, Input} from "antd";
import CancleButton from "../BlockQuote/cancleButton";
import NewButton from "../BlockQuote/newButton";
import {withRouter} from "react-router-dom";

class ChangePassword extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            visible : false
        };
        this.ok = this.ok.bind(this);
        this.click = this.click.bind(this);
        this.showTips = this.showTips.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    render() {
        let {oldPassword,newPassword,confirm} = this.state;
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
                    <div className={'update-password'}>
                        <Input type={'password'} placeholder={'请输入旧密码'} name={'oldPassword'} value={oldPassword} onChange={this.inputChange}/>
                    </div>
                    <div className={'update-password'}>
                        <Input type={'password'} placeholder={'请输入新密码'} name={'newPassword'} value={newPassword} onChange={this.inputChange}/>
                    </div>
                    <div>
                        <Input type={'password'} placeholder={'请确定新密码'} name={'confirm'} value={confirm} onChange={this.inputChange}/>
                        {this.showTips(newPassword, confirm)}
                    </div>
                </Modal>
            </div>
        )
    }

    //点击修改密码，显示弹出框
    click(){
        this.setState({
            visible : true
        })
    }

    inputChange(e) {
        let tar = e.target, name = tar.name, val = tar.value;
        this.setState({
            [name]: val
        })

    }

    showTips(newPassword, confirm) {
        if (newPassword && !confirm) {
            return <span style={{color:'red'}}>请确认您的密码！</span>
        } else if (confirm && newPassword !== confirm) {
            return <span style={{color:'red'}}>两次输入的密码不一致</span>
        } else {
            return ''
        }
    }

    ok() {
        const url = JSON.parse(localStorage.getItem('url'));
        let {userId} = this.props, {newPassword,confirm,oldPassword} = this.state,
            params = {
                newPassword,
                oldPassword,
                userId: userId
            };
        if(newPassword !== confirm) {
            message.info('前后两次输入密码不一致！')
            return
        }
        if(!oldPassword || !confirm || !newPassword ){
            message.info('信息填写不完整！');
            return
        }

        this.changePassword(params,url)
        this.handleCancel()
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
        }).then((data) => {
            if(data.data.code === 0) {
                localStorage.clear();  //退出登录
                this.props.logout();
                this.props.history.push({pathname: '/'});
            }
            message.info(data.data.message)
        }).catch(error=>{
            message.info(error.message)
        })
    }

    //取消弹出框
    handleCancel(){
        this.setState({
            visible : false
        });
        this.setState({
            oldPassword: undefined,
            newPassword: undefined,
            confirm: undefined
        })
    }
}
export default withRouter(ChangePassword)
