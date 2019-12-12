import React from 'react';
import { Input, Icon, Button, Checkbox,message,Spin } from 'antd';

class LoginItem extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        let {remindLogin,getDefault,handleSubmit} = this.props;
        return (
            <div style={{padding: '0px 28px 0px 28px', height:'200px'}}>
                <Input className='login-input' size='large' id='userName' prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />} placeholder="请输入用户名称" defaultValue={getDefault(0)}/>
                <div className='login-blockquote'></div>
                <Input className='login-input' id='password' type='password' size='large' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入密码登录"  defaultValue={getDefault(1)} />
                <div className='login-blockquote'></div>
                <Checkbox style={{float:'left'}} onChange={remindLogin} defaultChecked={document.cookie?true:false}>记住登录状态</Checkbox>
                <div className='login-blockquote'></div>
                <div className='login-blockquote'></div>
                <Button size='large' type="primary" style={{width:'100%', fontSize:'14px'}} onClick={handleSubmit}>
                    登录
                </Button>
            </div>
        );
    }

}

export default LoginItem;
