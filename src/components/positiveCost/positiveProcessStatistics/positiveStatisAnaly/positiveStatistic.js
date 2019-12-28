import React,{Component} from 'react'
import Blockquote from '../../../BlockQuote/blockquote'
import {Spin,Tabs} from 'antd'
import PositiveProcess from './processStatistic/processStatis'
import PositiveProductLine from './productLineStatis/productLineStatis'
import PositiveProcessCom from './processCompare/processCom'
import ProductLineCom from './productLineCom/productLineCom'
const {TabPane}=Tabs

/**统计分析*/
 class PositiveStatistic extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false
        }
        this.back=this.back.bind(this);
        this.tabChange=this.tabChange.bind(this);
    }
    componentDidMount(){
        let {location}=this.props
        let staticPeriod=location.periodStatis,//这个数组在点击统计分析界面后就有了
            line=location.line,
            periodCode=staticPeriod&&staticPeriod[0]?staticPeriod[0].code:-1,
            length=staticPeriod&&staticPeriod[0]?staticPeriod[0].length:-1,
            startTime=staticPeriod&&staticPeriod[0]?staticPeriod[0].startTime:'',
            lineCode=line&&line[0]&&line[0].code?line[0].code:undefined

        this.setState({
            staticPeriod:staticPeriod,
            line:line,
            periodCode:periodCode,
            length:length,
            startSecondTime:startTime
        })
    }
    componentWillUnmount(){
        this.setState = ()=>{
        return;
        };
      }
    tabChange(key){
        this.setState({
            tabKey:key
        })
    }
    back(){
        this.props.history.push({pathname:'/positiveProcess'})
    }
    render(){
        const current=JSON.parse(localStorage.getItem('current'))
        let {line,staticPeriod}=this.state
        let periodCode=this.props.location.periodStatis && this.props.location.periodStatis[0]?this.props.location.periodStatis[0].code:''
        return(
            <div>
                <Blockquote name='在制品统计分析' menu='正极成本'  menu2='在制品管理' returnDataEntry={this.back}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <Tabs defaultActiveKey='1' onChange={this.tabChange}>
                        <TabPane key='1' tab='按产线统计'> <PositiveProductLine staticPeriod={staticPeriod} periodCode={periodCode}/> </TabPane>
                        <TabPane key='2' tab='按工序统计'> <PositiveProcess line={line} staticPeriod={staticPeriod} periodCode={periodCode}/> </TabPane>
                        <TabPane key='3' tab='产线对比分析'> <ProductLineCom staticPeriod={staticPeriod} periodCode={periodCode}/> </TabPane>
                        <TabPane key='4' tab='工序对比分析'> <PositiveProcessCom staticPeriod={staticPeriod} line={line} periodCode={periodCode}/> </TabPane>
                    </Tabs>
                </Spin>
            </div>
        )
    }
 }
 export default  PositiveStatistic