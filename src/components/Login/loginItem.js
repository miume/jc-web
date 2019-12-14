import React from 'react';
import { Input, Icon, Button, Checkbox, message} from 'antd';
import MoreInfo from './moreInfo'
class LoginItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            infoFlag:true
        };
        this.beforeLogin = this.beforeLogin.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.remindLogin = this.remindLogin.bind(this);
        this.dataProcessing = this.dataProcessing.bind(this);  
        this.handleInfo=this.handleInfo.bind(this);
    }
 
    render() {
        let {username,password} = this.state;
        return (
            <div className={'login-spin'}>
                <Input className='login-input' size='large' name='username' value={username} onChange={this.inputChange}
                       prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />} placeholder="请输入用户名称"/>
                <div className='login-blockquote'></div>
                <Input className='login-input' name='password' value={password} onChange={this.inputChange} type='password' size='large'
                       prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入密码登录"/>
                <div className='login-blockquote'></div>
                <Checkbox style={{float:'left'}} onChange={this.remindLogin} defaultChecked={document.cookie ? true : false}>记住登录状态</Checkbox>
                <div className='login-blockquote'></div>
                <div className='login-blockquote'></div>
                <Button size='large' type="primary" style={{width:'100%', fontSize:'14px'}} onClick={this.handleSubmit}>
                    登录
                </Button>
                <div className='login-blockquote'></div>
                <div onClick={this.handleInfo} className='login-info'><span>{this.state.infoFlag?'<<<':'>>>'}</span>&nbsp;&nbsp;{this.state.infoFlag?'更多信息':'隐藏信息'}</div>
                {/* <MoreInfo handleInfo={this.props.handleInfo}/> */}
            </div>
        );
    }
    /**登陆接口调用 */
    handleSubmit() {
        let {username,password} = this.state;
        if(!this.beforeLogin(username,password)){
            return
        }
        this.props.loginIn(username,password);
    }

    /**登陆前先对数据进行验证 */
    beforeLogin(username,password){
        if(username === '' || password === '' ){
            this.setState({
                loading : false
            });
            message.info('请先填写账号和密码！');
            return false
        }
        return true
    }

    /**实行记住密码 */
    remindLogin(e) {
        let {username,password} = this.state;
        /**点击记住密码 将登陆名和密码存入localStorage中   取消记住密码，则从localStorage中删除 */
        if(e.target.checked) {
            if(username === '' && password === '') {
                message.info('请先填写用户名和密码！')
            } else {
                document.cookie = `${username}-${password}`;
            }
        } else {
            document.cookie = '';
        }
    }

    /**登陆成功后对返回的数据进行处理 */
    dataProcessing(data){
        let i = 1, quickAccess = [],menus=[];
        data.menuList.forEach(e=>{
            e.menuList.forEach(e1=>{
                menus.push(e1)
                if(i <= 6){
                    quickAccess.push({
                        openKeys:e.menuId,
                        menuParent:e.menuName,
                        menuName:e1.menuName,
                        path:e1.path
                    });
                    i++;
                }
            })
        });
        localStorage.setItem('menus',JSON.stringify(menus));
        localStorage.setItem('quickAccess',JSON.stringify(quickAccess));
    }

    /**监控用户名和密码的问题*/
    inputChange(e) {
        let target = e.target, name = target.name, value = target.value;
        this.setState({
            [name]: value
        })
    }
    handleInfo(){
        let {infoFlag}=this.state
        this.setState({
            infoFlag:!infoFlag
        })
        this.props.handleInfo(!infoFlag)
    }
    componentDidMount() {
        /**实现enter键登陆 */
        const f = (e) => {
            if(e.keyCode===13) {this.handleSubmit();}
        };
        window.onkeydown = f;
        let cookie = document.cookie.split('-');
        if(cookie.length > 1) {
            this.setState({
                username: cookie[0],
                password: cookie[1]
            })
        }
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default LoginItem;
