import React,{Component} from 'react'
import Blockquote from '../../BlockQuote/blockquote'
import {Spin,Table,Button,Tabs} from 'antd'
import NewButton from '../../BlockQuote/newButton'
import Search from './search'
import PendSubmit from './pendSubmit/pendSubmit'
import StatisticDone from './statisticDone/ststisticDone'
const { TabPane } = Tabs;
class ProcessStatistics extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false
        }
        this.judgeOperation=this.judgeOperation.bind(this);
        this.handleAdd=this.handleAdd.bind(this);
        this.statisticalAnalysis=this.statisticalAnalysis.bind(this);
    }
    judgeOperation(operation,operationCode){
            var flag=operation?operation.filter(e=>e.operationCode===operationCode):[]
            return flag.length?true:false
    }
   handleAdd(){
       this.props.history.push({pathname:'/costProcessAdd'})
   }
   statisticalAnalysis(){
       this.props.history.push({pathname:'/processStatisticalAnalysis'})
   }
    render(){
        const current=JSON.parse(localStorage.getItem('current'));
        this.operation=JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
        return(
            <div>
                <Blockquote name={current.menuName} menu={current.menuParent}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <NewButton name='新增' className='fa fa-plus' handleClick={this.handleAdd}/>
                    <Button type='primary' onClick={this.statisticalAnalysis}>统计分析</Button>
                    <Search flag={this.judgeOperation(this.operation,'QUERY')}/>
                    <div className='clear'></div>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab='待提交' key='1'>
                            <PendSubmit/>
                        </TabPane>
                        <TabPane tab='已统计' key='2'>
                            <StatisticDone/>
                        </TabPane>
                    </Tabs>
                </Spin>
            </div>
        );
    }
}
export default ProcessStatistics;