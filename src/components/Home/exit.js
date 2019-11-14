import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import TopIcon from './topIcon';
import Auth from '../auth/Auth';
import {Drawer, message} from 'antd';
import axios from 'axios';
import TodoPart from './todopart';
class Exit extends Component {
    componentWillMount(){
        this.fetch();
    }
    constructor(props) {
        super(props);
        this.fetch = this.fetch.bind(this);
        this.onClose = this.onClose.bind(this);
        this.exitEvent = this.exitEvent.bind(this);
        this.gotodolist = this.gotodolist.bind(this);
        this.drawerEvent = this.drawerEvent.bind(this);
        this.judgeCurrent = this.judgeCurrent.bind(this);
        this.versionInstruction = this.versionInstruction.bind(this)
        this.count = 0;
        this.state = {
            visible:false,
            count:0,
            flag:0
        }
    }
    /**退出事件 */
    exitEvent() {
        localStorage.clear();
        let newState = {...this.state, flag : 1}
        this.setState(newState);
        this.props.logout()
    }
    /**查看用户手册 */
    userInstruction(){
        window.open('../../../instruction/guide.html','_blank');
    }
    /**查看版本发布手册 */
    versionInstruction(){
        window.open('../../../instruction/versionRelease.html','_blank');
    }
    /**点击弹出待办事项 */
    drawerEvent(){
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        let week = date.getDay();
        let time = year+'-'+month+'-'+day;
        switch(week){
            case 0: week='星期天';break;
            case 1: week='星期一';break;
            case 2: week='星期二';break;
            case 3: week='星期三';break;
            case 4: week='星期四';break;
            case 5: week='星期五';break;
            case 6: week='星期六';break;
            default:week='';break;
        }
        this.setState({
            visible:true,
            date:time,
            week:week
        })
    }
    /**点击关闭抽屉 */
    onClose(){
        this.setState({
            visible:false
        })
    }
    /**根据当前登陆用户id获取待办事项 */
    fetch(){
        const url = JSON.parse(localStorage.getItem('url'));
        axios.get(`${url.toDoList}/${this.props.userId}`,{
            headers:{
                'Authorization':url.Authorization
            }
        }).then((data)=>{
            const res = data.data.data;
            let count = res? res.length : 0;
            this.setState({
                data:res,
                count:count
            })
        })
    }

    gotodolist(){
        let flag = this.judgeCurrent();
        if(!flag) {
            message.info('您沒有权限，无法访问！');
            return
        }
        this.setState({
            visible:false
        })
        this.props.history.push({pathname:'/todoList'})
    }
    /**用来判断 若直接从top 进入待办事项时，怎么正确渲染待办事项页面 */
    judgeCurrent(){
        const menus = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path==='/todoList')[0]:[];
        if(menus && menus.length) {
            const parentName = JSON.parse(localStorage.getItem('menuList'))?JSON.parse(localStorage.getItem('menuList')).menuList.filter(e=>e.menuId===menus.parent)[0].menuName:[];
            const current = {
                openKeys:menus.parent,
                menuName:menus.menuName,
                menuParent:parentName,
                path:menus.path
            }
            localStorage.setItem('selectedKeys',menus.path)
            localStorage.setItem('defaultOpenKeys',[menus.parent])
            localStorage.setItem('current',JSON.stringify(current));
            return true;
        }
        return false
    }
    render() {
        let height1 = document.body.clientHeight - 150;
        return (
            <div className="fr">
                {this.state.flag?<Auth/>: <TopIcon exitEvent={this.exitEvent} versionInstruction={this.versionInstruction} userInstruction={this.userInstruction} drawerEvent={this.drawerEvent} count={this.state.count} />}
                <Drawer title='待办事项' placement='right' visible={this.state.visible}
                onClose={this.onClose} maskClosable={false} mask={false} width={400}
                >
                <div className='drawer-div'>
                    <div>{this.state.date}</div>
                    <div>{this.state.week}</div>
                    <div className='drawer-date-div' style={{height:height1}}>
                    {
                        this.state.data?this.state.data.map((e,index)=>{
                            let contents = '';
                            let curId = this.props.userId;
                            for(let i = 0; i < e.details.length; i++){
                                if(curId===e.details[i].userId) contents = e.details[i].responsibility;
                            }
                            return (
                                <TodoPart key={index} data={e.commonBatchNumber} contents={contents} gotodolist={this.gotodolist} />
                            )
                        }):<div className='divAuto'>暂无</div>
                    }
                    </div>
                </div>
                </Drawer>
            </div>
        );
    }
}
export default withRouter(Exit);
