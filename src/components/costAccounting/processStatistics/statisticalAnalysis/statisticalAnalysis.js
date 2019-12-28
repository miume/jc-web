import React,{Component} from 'react'
import {Tabs} from 'antd'
import Blockquote from '../../../BlockQuote/blockquote'
import ProcessStatis from './processStatis/processStatis'
import ProductLineStatis from './productLineStatis/productLIneStatis'
import ProcessCompare from './processCompare/processCompare'
import ProductLineCompare from './productLineCompare/processLineCompare'
import axios from 'axios'
const {TabPane}=Tabs;

class ProcessStatisticalAnalysis extends Component{//在制品统计的统计分析
    constructor(props){
        super(props);
        this.state={
            staticPeriod:[],
            process:[],
            periodCode:'',
            time:[],
            tabKey:'1',
            startSecondTime:'',
            length:-1,
            productLine:[]
        }
        this.returnProcess=this.returnProcess.bind(this);
        this.getStartTime=this.getStartTime.bind(this);
        this.tabChange=this.tabChange.bind(this);
        this.getProductLine=this.getProductLine.bind(this);
    }
    componentDidMount(){
        let {location}=this.props
        let staticPeriod=location.staticPeriod,//这个数组在点击统计分析界面后就有了
            process=location.process,
            periodCode=staticPeriod&&staticPeriod[0]?staticPeriod[0].code:-1,
            length=staticPeriod&&staticPeriod[0]?staticPeriod[0].length:-1,
            startTime=staticPeriod&&staticPeriod[0]?staticPeriod[0].startTime:''
        
        this.setState({
            staticPeriod:staticPeriod,
            process:process,
            periodCode:periodCode,
            length:length,
            startSecondTime:startTime
        })
        this.getStartTime(periodCode)
        this.getProductLine()
    }
    componentWillUnmount(){
        this.setState = ()=>{
        return;
        };
      }
    returnProcess(){//点击返回在制品统计界面
        this.props.history.push({pathname:'/processStatistics'})
    }
    getProductLine(){
        axios({
            url:this.url.precursorProductionLine.all,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            }
        }).then((data)=>{
            let res=data.data.data
            if(res){
                this.setState({
                    productLine:res
                })
            }
        })
    }
    getStartTime(periodCode){//获取统计周期内存在的开始时间
         axios({
             url:this.url.precursorGoodIn.getStartTime,
             method:'get',
             headers:{
                 'Authorization':this.url.Authorization
             },
             params:{
                 periodId:periodCode
             }
         }).then(data=>{
             let res= data.data.data
             if(res){
                 this.setState({
                     time:res
                  }
               )
             }
         })
     } 
    tabChange(key){
        this.setState({
            tabKey:key
        })
    }
    render(){
       this.url=JSON.parse(localStorage.getItem('url'))
       let periodCode=this.props.location.staticPeriod && this.props.location.staticPeriod[0]?this.props.location.staticPeriod[0].code:''
       let length=this.props.location.staticPeriod&&this.props.location.staticPeriod[0]?this.props.location.staticPeriod[0].length:''
       let startSecondTime=this.props.location.staticPeriod&&this.props.location.staticPeriod[0]?this.props.location.staticPeriod[0].startTime:''
       return(
            <div>
                <Blockquote name='统计分析' menu='前驱体成本核算管理' menu2='在制品统计' returnDataEntry={this.returnProcess}/>
                <Tabs defaultActiveKey='1' onChange={this.tabChange}>
                    <TabPane key='1' tab='按工序统计'> <ProcessStatis  staticPeriod={this.state.staticPeriod} periodCode={periodCode} url={this.url} time={this.state.time} getStartTime={this.getStartTime}/> </TabPane>
                    <TabPane key='2' tab='按产线统计'> <ProductLineStatis  staticPeriod={this.state.staticPeriod} periodCode={periodCode} url={this.url} time={this.state.time} getStartTime={this.getStartTime}/> </TabPane>
                    <TabPane key='3' tab='工序对比分析'> <ProcessCompare startSecondTime={startSecondTime} periodCode={periodCode} length={length}  staticPeriod={this.state.staticPeriod} process={this.state.process} url={this.url}/> </TabPane>
                    <TabPane key='4' tab='产线对比分析'> <ProductLineCompare startSecondTime={startSecondTime} periodCode={periodCode} length={length} staticPeriod={this.state.staticPeriod}  process={this.state.process} url={this.url} productLine={this.state.productLine}/> </TabPane>
                </Tabs>
            </div>
        );
    }
}
export default ProcessStatisticalAnalysis