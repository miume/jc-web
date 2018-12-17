import React from 'react';
import {Tabs,Badge} from 'antd';
import BlockQuote from '../BlockQuote/blockquote';
import HistoryRecord from './historyRecord';
import TodoProcessed from './todoprocessed';
import axios from 'axios';
const TabPane = Tabs.TabPane;
const data = [];
for(var i = 1; i < 4; i++){
    data.push({
        commonBatchNumber:{
            batchNumber: "ECT/99c4cb57dc53",
                createPersonId: 1,
                createTime: "2018-11-27 14:37:35",
                dataType: 2,
                description: "制程检测",
                id: `${i}`,
                isUrgent: -1,
                memo: "制程检测专用",
                status: 0,
        },
        createPersonName: "王大大",
        details:[{
            personName: "嘻嘻嘻",
            responsibility: "算命",
            taskType: 2,
            userId: 121,
            visible: null,
        },{
            personName: "陈小春",
            responsibility: "打野",
            taskType: 2,
            userId: 129,
            visible: null
        },{
            personName: "王大大",
            responsibility: "抽签",
            taskType: 2,
            userId: 1,
            visible: 1,
        },{
            personName: "嘻嘻嘻",
                responsibility: "算命",
                taskType: 2,
                userId: 121,
                visible: null,
        },{
            personName: "陈小春",
            responsibility: "打野",
            taskType: 2,
            userId: 129,
            visible: null
        }]
})
}
class TodoList extends React.Component{
    url
    componentDidMount(){
        const id = localStorage.getItem('menuList')?JSON.parse(localStorage.getItem('menuList')).userId:-1;
        //this.fetch(id);
        //this.getHistory(id);
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
            data:data
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
            const count = res? res.length : 0;
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
                 <Tabs defaultActiveKey='1'>
                     <TabPane key='1' tab={<span><i className="fa fa-bell-o" aria-hidden="true"></i> &nbsp;<Badge count={this.state.count} offset={[15,8]}><span>待处理</span></Badge></span>}><TodoProcessed getCount={this.getCount} url={this.url} data={this.state.data}/></TabPane>
                     <TabPane key='2' tab={<span><i className="fa fa-undo" aria-hidden="true"></i> &nbsp;历史记录</span>}><HistoryRecord/></TabPane>
                 </Tabs>
            </div>
        );
    }
}
export default TodoList;