import React from 'react';
import {Tabs,Badge} from 'antd';
import './todolist.css';
import BlockQuote from '../BlockQuote/blockquote';
import TodoProcessed from './todoprocessed';
import axios from 'axios';
const TabPane = Tabs.TabPane;
class TodoList extends React.Component{
    url
    componentDidMount(){
        const id = localStorage.getItem('menuList')?JSON.parse(localStorage.getItem('menuList')).userId:-1;
        this.fetch(id);
        this.getHistory(id);
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
    fetch(id){
        axios.get(`${this.url.toDoList}/${id}`,{
            headers:{
                'Authorization':this.Authorization
            }
        }).then((data)=>{
            const res = data.data.data;
            const count = res? res.length : 0;
            if(res) res['curId'] = id;
            this.setState({
                data:res,
                count:count
            })
        })
    }
    /**根据当前用户id获取待办事项历史记录 */
    getHistory(id){
        axios.get(`${this.url.toDoList}/${id}/history`,{},{
            headers:{
                'Authorization':this.url.Authorization
            }
        }).then((data)=>{
            const res = data.data.data;
            // const count = res? res.length : 0;
            if(res) res['curId'] = id;
            this.setState({
                historyRecord:res,
            })
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        return (
            <div>
                 <BlockQuote name="待办事项" menu='质量与流程'></BlockQuote>
                 <Tabs defaultActiveKey='todo1'>
                     <TabPane key='todo1' tab={<span><i className="fa fa-bell-o" aria-hidden="true"></i> &nbsp;<Badge count={this.state.count} offset={[10,0]}><span>待处理</span></Badge></span>}><TodoProcessed url={this.url} data={this.state.data} fetch={this.fetch} /></TabPane>
                     <TabPane key='todo2' tab={<span><i className="fa fa-undo" aria-hidden="true"></i> &nbsp;历史记录</span>}><TodoProcessed url={this.url} data={this.state.historyRecord} fetch={this.fetch} flag={1} /></TabPane>
                 </Tabs>
            </div>
        );
    }
}
export default TodoList;
