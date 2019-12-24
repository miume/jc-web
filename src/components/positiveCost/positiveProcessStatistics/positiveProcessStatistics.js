import React,{Component} from 'react'
import {Spin,Tabs} from 'antd'
import Blockquote from '../../BlockQuote/blockquote'
import NewButton from '../../BlockQuote/newButton'
import Search from './search'
import PositivePendSubmit from './positivePendSubmit/positivePentSubmit'
import PositiveStatisticDone from './positiveStatisticDone/positiveStatisDone'
import axios from 'axios'
const { TabPane } = Tabs;
class PositiveProcessStatistics extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,

        }
        this.getPeriod=this.getPeriod.bind(this);
        this.judgeOperation=this.judgeOperation.bind(this);
        this.handleAdd=this.handleAdd.bind(this);
        this.statisticalAnalysis=this.statisticalAnalysis.bind(this);
        this.addConfirm=this.addConfirm.bind(this);
        this.getLine=this.getLine.bind(this);
    }
    componentDidMount() {
        this.getPeriod()
        this.getLine()
        
    }
    componentWillUnmount() {
        this.setState=()=>{
            return
        }
    }
    /**获取统计周期*/
    getPeriod(){
        axios({
            url:this.url.positiveStatic.all,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            }
        }).then(data=>{
            let res=data.data.data
            if(res){
                this.setState({
                    periodStatis:res,
                    periodCode:res[0].code,
                    length:res[0].length,
                    time:res[0].startTime
                })
            }
        })
    }
    /**获取产线*/
    getLine(){
        axios({
            url:this.url.positiveProductline.all,
            method:'get',
            headers: {
                'Authorization':this.url.Authorization
            }
        }).then(data=>{
            let res=data.data.data
            if(res){
                this.setState({
                    line:res
                })
            }
        })
    }
 
    addConfirm(params){//主界面的确认按钮

    }
    handleAdd(){
        let {periodStatis,line}=this.state
        this.props.history.push({
            pathname:'/positiveAdd',
            periodStatis:periodStatis,
            line:line,
        })
    }
    statisticalAnalysis(){
        this.props.history.push({pathname:'/positiveStatistic'})
    }
    judgeOperation(operation,operationCode){
        var flag=operation?operation.filter(e=>e.operationCode===operationCode):[]
        return flag.length?true:false
    }
    render(){
        let {periodStatis,periodCode,time,length,line}=this.state
        const current=JSON.parse(localStorage.getItem('current'))
        this.url=JSON.parse(localStorage.getItem('url'))
        this.operation=JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null
        return(
            <div>
                <Blockquote name={current.menuName} menu={current.menuParent}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <NewButton name='新增' className='fa fa-plus' handleClick={this.handleAdd}/>
                    <NewButton name='统计分析' handleClick={this.statisticalAnalysis}/>
                    <Search flag={this.judgeOperation(this.operation,'QUERY')} periodStatis={periodStatis} line={line}
                            periodCode={periodCode} time={time} length={length} addConfirm={this.addConfirm}/>
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