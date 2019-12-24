import React,{Component} from 'react'
import Blockquote from '../../BlockQuote/blockquote'
import { Tabs } from 'antd';
import MainMaterial from './mainMaterial'
import AuxiliaryMaterial from './auxiliaryMaterial'
import axios from 'axios'
const { TabPane } = Tabs;
class CostAccount extends Component{
    constructor(props){
        super(props)
        this.state={
            periodCode:undefined,
            staticPeriod:undefined,
            line:[],
            date:undefined
        }
        this.getStaPeriod=this.getStaPeriod.bind(this);
        this.getLine=this.getLine.bind(this);
        this.getDate=this.getDate.bind(this);
    }
    componentDidMount(){
        this.getStaPeriod()
        this.getLine()
    }
    componentWillUnmount(){
        this.setState=()=>{
            return
        }
    }
    getStaPeriod() {//获取统计周期
        axios({
            url: `${this.url.staticPeriod.all}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            }
        }).then((data) => {
            let res = data.data.data, periodCode = ''
            if (res && res.length) {
                periodCode = res[0].code
            }
            this.setState({
                staticPeriod: res,
                periodCode: periodCode,
            })
            this.getDate(periodCode)
        })
    }
    getLine(){
        axios({
            url:this.url.precursorProductionLine.all,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            }
        }).then(data=>{
            let res=data.data.data
            if(res){
                res.unshift({
                    code: 0,
                    name: '全部产线'
                })
                this.setState({
                    line:res
                })
            }
        })
    }
    getDate(value){
        axios({
            url:this.url.costAccount.getDate,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{
                periodCode:value
            }
        }).then(data=>{
            let res=data.data.data
            if(res){
                this.setState({
                    date:res
                })
            }
        })
    }
    render(){
        const current=JSON.parse(localStorage.getItem('current'))
        this.url=JSON.parse(localStorage.getItem('url'))
        return(
            <div>
                <Blockquote name={current.menuName} menu={current.menuParent}/>
                <Tabs defaultActiveKey="1" tabBarGutter={32}>
                    <TabPane tab="主材" key="1">
                        <MainMaterial periodCode={this.state.periodCode} staticPeriod={this.state.staticPeriod} line={this.state.line} url={this.url}
                                      getDate={this.getDate} date={this.state.date}/>
                    </TabPane>
                    <TabPane tab="辅材" key="2">
                        <AuxiliaryMaterial periodCode={this.state.periodCode} staticPeriod={this.state.staticPeriod} line={this.state.line} url={this.url}
                                           getDate={this.getDate} date={this.state.date}/>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
export default CostAccount
