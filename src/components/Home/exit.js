import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import TopIcon from './topIcon';
import Auth from '../auth/Auth';
import {Drawer} from 'antd';
import axios from 'axios';
import TodoPart from './todopart';

class Exit extends Component {
    constructor(props) {
        super(props);
        this.fetch = this.fetch.bind(this);
        this.logout = this.logout.bind(this);
        this.onClose = this.onClose.bind(this);
        this.exitEvent = this.exitEvent.bind(this);
        this.gotodolist = this.gotodolist.bind(this);
        this.drawerEvent = this.drawerEvent.bind(this);
        this.state = {
            visible:false,
            content : <TopIcon exitEvent={this.exitEvent} drawerEvent={this.drawerEvent} />
        }
    }
    /**退出事件 */
    exitEvent() {
        localStorage.clear();
        let newState = {...this.state, content : <Auth/>}
        this.setState(newState);
        /**登出时，使登陆背景动图显示 */
        document.getElementById('defaultCanvas0').style.visibility='visible'; 
        var showFrame = setInterval(function() {
            var frame = window.frame;
            if(frame !== undefined && frame !== null) {
                frame(20);   //恢复帧
                clearInterval(showFrame);
            }
        },100)
    }
    /**点击弹出待办事项 */
    drawerEvent(){
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        var week = date.getDay();
        var time = year+'-'+month+'-'+day;
        switch(week){
            case 0: week='星期天';break;
            case 1: week='星期一';break;
            case 2: week='星期二';break;
            case 3: week='星期三';break;
            case 4: week='星期四';break;
            case 5: week='星期五';break;
            case 6: week='星期六';break;
        }
        this.fetch();
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
            const count = res? res.length : 0;
            this.setState({
                data:res,
                count:count
            })
        })
    }
    logout() {
        /**登出时，使登陆背景动图显示 */
        document.getElementById('defaultCanvas0').style.visibility='visible'; 
        var showFrame = setInterval(function() {
            var frame = window.frame;
            if(frame !== undefined && frame !== null) {
                frame(20);   //恢复帧
                clearInterval(showFrame);
            }
        },100)
    }
    gotodolist(){
        this.props.history.push({pathname:'/todoList'})
        this.setState({
            visible:false
        })
    }
    render() {
        return (
            <div id='exit'>
                {this.state.content}
                <Drawer title='待办事项' placement='right' visible={this.state.visible}
                onClose={this.onClose} maskClosable={false} mask={false} width={400}
                >
                <div className='drawer-div'>
                    <div>{this.state.date}</div>
                    <div>{this.state.week}</div>
                    <div className='drawer-date-div'>
                    {
                        this.state.data?this.state.data.map((e,index)=>{
                            var contents = '';
                            var curId = this.props.userId;
                            for(var i = 0; i < e.details.length; i++){
                                if(curId===e.details[i].userId) contents = e.details[i].responsibility;     
                            }
                            return (
                                <TodoPart key={index} data={e.commonBatchNumber} contents={contents} gotodolist={this.gotodolist} />
                            )
                        }):null
                    }
                    </div>
                </div>
                </Drawer>
            </div>
        );
    }
}
export default withRouter(Exit);