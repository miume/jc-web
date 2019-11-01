import React,{Component} from 'react'
import {Spin,Tabs} from 'antd'
import Blockquote from '../../BlockQuote/blockquote'
import NewButton from '../../BlockQuote/newButton'
import Search from './search'
import PositivePendSubmit from './positivePendSubmit/positivePentSubmit'
import PositiveStatisticDone from './positiveStatisticDone/positiveStatisDone'

const { TabPane } = Tabs;
class PositiveProcessStatistics extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false
        }
        this.judgeOperation=this.judgeOperation.bind(this);
        this.handleAdd=this.handleAdd.bind(this);
        this.statisticalAnalysis=this.statisticalAnalysis.bind(this);
    }
    handleAdd(){

    }
    statisticalAnalysis(){

    }
    judgeOperation(operation,operationCode){
        var flag=operation?operation.filter(e=>e.operationCode===operationCode):[]
        return flag.length?true:false
    }
    render(){
        const current=JSON.parse(localStorage.getItem('current'))
        this.operation=JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null
        return(
            <div>
                <Blockquote name={current.menuName} menu={current.menuParent}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <NewButton name='新增' handleClick={this.handleAdd}/>
                    <NewButton name='统计分析' handleClick={this.statisticalAnalysis}/>
                    <Search flag={this.judgeOperation(this.operation,'QUERY')}/>
                    <div className='clear'></div>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab='待提交' key='1'>
                            <PositivePendSubmit history={this.props.history}/>
                        </TabPane>
                        <TabPane tab='已统计' key='2'>
                            <PositiveStatisticDone/>
                        </TabPane>
                    </Tabs>
                </Spin>
            </div>
        );
    }
}
export default PositiveProcessStatistics