import React,{Component} from 'react'
import {Tabs} from 'antd'
import Blockquote from '../../../BlockQuote/blockquote'
import ProcessStatis from './processStatis/processStatis'
import ProductLineStatis from './productLineStatis/productLIneStatis'
import ProcessCompare from './processCompare/processCompare'
import ProductLineCompare from './productLineCompare/processLineCompare'
const {TabPane}=Tabs;

class ProcessStatisticalAnalysis extends Component{//在制品统计的统计分析
    constructor(props){
        super(props);
        this.state={
            staticPeriod:[],
            process:[],
            periodCode:-1,
            startSecondTime:'',//周期对应的时分秒
            length:-1
        }
        this.returnProcess=this.returnProcess.bind(this);
    }
    componentDidMount(){
        let staticPeriod=this.props.location.staticPeriod
        let process=this.props.location.process
        let length=this.props.location.staticPeriod&&this.props.location.staticPeriod[0]&&this.props.location.staticPeriod[0].length?this.props.location.staticPeriod[0].length:-1
        let periodCode=this.props.location.staticPeriod&&this.props.location.staticPeriod[0]&&this.props.location.staticPeriod[0].code?this.props.location.staticPeriod[0].code:-1
        let startTime=this.props.location.staticPeriod&&this.props.location.staticPeriod[0]&&this.props.location.staticPeriod[0].startTime?this.props.location.staticPeriod[0].startTime:-1
        this.setState({
            staticPeriod:staticPeriod,
            process:process,
            length:length,
            periodCode:periodCode,
            startSecondTime:startTime
        })
    }
    componentWillUnmount(){
        this.setState = (state,callback)=>{
        return;
        };
      }
    returnProcess(){//点击返回在制品统计界面
        this.props.history.push({pathname:'/processStatistics'})
    }
    render(){
        
        return(
            <div>
                <Blockquote name='统计分析' menu='前驱体成本核算管理' menu2='在制品统计' returnDataEntry={this.returnProcess}/>
                <Tabs defaultActiveKey='1'>
                    <TabPane key='1' tab='按工序统计'> <ProcessStatis startSecondTime={this.state.startSecondTime} staticPeriod={this.state.staticPeriod} url={this.url}/> </TabPane>
                    <TabPane key='2' tab='按产线统计'> <ProductLineStatis startSecondTime={this.state.startSecondTime} staticPeriod={this.state.staticPeriod} url={this.url}/> </TabPane>
                    <TabPane key='3' tab='工序对比分析'> <ProcessCompare startSecondTime={this.state.startSecondTime} periodCode={this.state.periodCode} length={this.state.length}  staticPeriod={this.state.staticPeriod} process={this.state.process} url={this.url}/> </TabPane>
                    <TabPane key='4' tab='产线对比分析'> <ProductLineCompare startSecondTime={this.state.startSecondTime} periodCode={this.state.periodCode} length={this.state.length} staticPeriod={this.state.staticPeriod}  process={this.state.process} url={this.url}/> </TabPane>
                </Tabs>
            </div>
        );
    }
}
export default ProcessStatisticalAnalysis