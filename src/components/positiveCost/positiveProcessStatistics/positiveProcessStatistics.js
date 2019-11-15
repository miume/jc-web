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
            loading:false,
            startDate:'',
            endDate:'',
            startTime:'',
            endTime:'',
            periodCode:'',//记录下拉框周期类型的value值
        }
        this.judgeOperation=this.judgeOperation.bind(this);
        this.handleAdd=this.handleAdd.bind(this);
        this.statisticalAnalysis=this.statisticalAnalysis.bind(this);
        this.reset=this.reset.bind(this);
        this.startChange=this.startChange.bind(this);
        this.endChange=this.endChange.bind(this);
        this.selectChange=this.selectChange.bind(this);
        this.confirm=this.confirm.bind(this);
    }
    startChange(date,dateString){
        // console.log(date,dateString)
         this.setState({
             startDate:dateString
             
         })
     }
     endChange(date,dateString){
        this.setState({
            endDate:dateString
        })
     }
     selectChange(value){
         //console.log(value)
         this.setState({
             periodCode:value
         })
     }
     confirm(){
         let {startTime,endTime,periodCode}=this.state;//es6新语法，解构赋值
         let params={//点击搜索传给后台的值
            startTime:startTime,
             endTime:endTime,
             periodCode:periodCode
         }
     }
     reset(){//重置清空搜索框的值
         this.setState({
             beginTime:'',
             endTime:'',
             periodCode:1
         })
     }
    handleAdd(){
        this.props.history.push({pathname:'/positiveAdd'})
    }
    statisticalAnalysis(){
        this.props.history.push({pathname:'/positiveStatistic'})
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
                    <NewButton name='新增' className='fa fa-plus' handleClick={this.handleAdd}/>
                    <NewButton name='统计分析' handleClick={this.statisticalAnalysis}/>
                    <Search flag={this.judgeOperation(this.operation,'QUERY')} search={this.confirm} reset={this.reset} selectChange={this.selectChange} startChange={this.startChange} endChange={this.endChange}/>
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