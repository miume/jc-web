import React,{Component} from 'react'
import Blockquote from '../../../BlockQuote/blockquote'
import {Spin,Tabs} from 'antd'
import PositiveProcess from './processStatistic/processStatis'
import PositiveProductLine from './productLineStatis/productLineStatis'
import Product from './productStatis/productStatis'
import PositiveProcessCom from './processCompare/processCom'
import ProductLineCom from './productLineCom/productLineCom'
import axios from 'axios'
const {TabPane}=Tabs

/**统计分析*/
 class PositiveStatistic extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false
        }
        this.getLine=this.getLine.bind(this);
        this.getPeriod=this.getPeriod.bind(this)
        this.tabChange=this.tabChange.bind(this);
    }
    componentDidMount(){
        this.getPeriod()
        this.getLine()
    }
    componentWillUnmount(){
        this.setState=()=>{
            return;
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
            if(res.length){
                this.setState({
                    staticPeriod:res,
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
                    line:res,
                    lineCode:res[0].code
                })
            }
        })
    }
    tabChange(key){
        this.setState({
            tabKey:key
        })
    }

    render(){
        const current=JSON.parse(localStorage.getItem('current'))
        let {line,staticPeriod,periodCode,lineCode}=this.state
        this.url=JSON.parse(localStorage.getItem('url'))
        return(
            <div>
                <Blockquote name={current.menuName} menu={current.menuParent}  />
                <div className='rightDiv-content'>
                    <Tabs defaultActiveKey='1' onChange={this.tabChange}>
                        <TabPane key='1' tab='按产线统计'> <PositiveProductLine staticPeriod={staticPeriod} periodCode={periodCode} url={this.url}/> </TabPane>
                        <TabPane key='2' tab='按工序统计'> <PositiveProcess line={line} staticPeriod={staticPeriod} periodCode={periodCode} lineCode={lineCode} url={this.url}/> </TabPane>
                        <TabPane key='3' tab='按产品统计'> <Product staticPeriod={staticPeriod} line={line} periodCode={periodCode} url={this.url}/> </TabPane>
                        <TabPane key='4' tab='产线对比分析'> <ProductLineCom staticPeriod={staticPeriod} periodCode={periodCode} url={this.url}/> </TabPane>
                        <TabPane key='5' tab='工序对比分析'> <PositiveProcessCom staticPeriod={staticPeriod} line={line} periodCode={periodCode} url={this.url}/> </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
 }
 export default  PositiveStatistic