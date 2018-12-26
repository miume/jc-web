import React from 'react';
import './todolist.css';
import axios from 'axios';
import {Tabs,Badge} from 'antd';
import TodoProcessed from './todoprocessed';
import BlockQuote from '../BlockQuote/blockquote';
const TabPane = Tabs.TabPane;
class TodoList extends React.Component{
    url
    userId
    componentDidMount(){
        this.fetch();
        this.getHistory('');
    }
    componentWillUnmount() {
        this.setState = () => {
          return ;
        }
      }
    constructor(props){
        super(props);
        this.state = {
            count : 0,
            historyCount : 0,
            data:[]
        }
        this.fetch = this.fetch.bind(this);
        this.getHistory = this.getHistory.bind(this);
    }
    /**根据当前登陆用户id获取待办事项 */
    fetch(){
        axios.get(`${this.url.toDoList}/${this.userId}`,{
            headers:{
                'Authorization':this.Authorization
            }
        }).then((data)=>{
            const res = data.data.data;
            const count = res? res.length : 0;
            if(res) res['curId'] = this.userId;
            this.setState({
                data:res,
                count:count
            })
        })
    }
    /**根据当前用户id获取待办事项历史记录 */
    getHistory(date){
        if(date===undefined) date = '';
        axios.get(`${this.url.toDoList}/${this.userId}/history?date=${date}`,{},{
            headers:{
                'Authorization':this.url.Authorization
            },
        }).then((data)=>{
            const res = data.data.data;
            //console.log(res)
            if(res) res['curId'] = this.userId;
            this.setState({
                historyRecord:res,
            })
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        this.userId = localStorage.getItem('menuList')?JSON.parse(localStorage.getItem('menuList')).userId:-1;
        return (
            <div>
                 <BlockQuote name="待办事项" menu='质量与流程'></BlockQuote>
                 <Tabs defaultActiveKey='todo1'>
                     <TabPane key='todo1' tab={<span><i className="fa fa-bell-o" aria-hidden="true"></i> &nbsp;<Badge count={this.state.count} offset={[10,0]}><span>待处理</span></Badge></span>}><TodoProcessed url={this.url} data={this.state.data} fetch={this.fetch} getHistory={this.getHistory} /></TabPane>
                     <TabPane key='todo2' tab={<span><i className="fa fa-undo" aria-hidden="true"></i> &nbsp;历史记录</span>}><TodoProcessed url={this.url} data={this.state.historyRecord} getHistory={this.getHistory} fetch={this.fetch} flag={1} /></TabPane>
                 </Tabs>
            </div>
        );
    }
}
export default TodoList;
