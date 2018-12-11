import React from 'react';
import {Tabs,Badge} from 'antd';
import BlockQuote from '../BlockQuote/blockquote';
import HistoryRecord from './historyRecord';
import TodoProcessed from './todoprocessed';
const TabPane = Tabs.TabPane;
class TodoList extends React.Component{
    componentWillUnmount() {
        this.setState = () => {
          return ;
        }
      }
    constructor(props){
        super(props);
        this.state = {
            count : 0
        }
        this.getCount = this.getCount.bind(this);
    }
    getCount(count){
        this.setState({
            count:count
        })
    }
    render(){
        return (
            <div>
                 <BlockQuote name="待办事项" menu='质量与流程'></BlockQuote>
                 <Tabs defaultActiveKey='1'>
                     <TabPane key='1' tab={<span><i className="fa fa-bell-o" aria-hidden="true"></i> &nbsp;<Badge count={this.state.count} offset={[15,8]}><span>待处理</span></Badge></span>}><TodoProcessed getCount={this.getCount} /></TabPane>
                     <TabPane key='2' tab={<span><i className="fa fa-undo" aria-hidden="true"></i> &nbsp;历史记录</span>}><HistoryRecord/></TabPane>
                 </Tabs>
            </div>
        );
    }
}
export default TodoList;