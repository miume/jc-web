import React,{Component} from 'react'
import Blockquote from '../../BlockQuote/blockquote'
import { Tabs } from 'antd';
import PositiveMainMaterial from './mainMaterial'
import PositiveAuxiliaryMaterial from './auxiliaryMaterial'
import axios from 'axios'
const { TabPane } = Tabs;
class PositiveCostAccount extends Component{
    constructor(props){
        super(props)
        this.state={
            period:[],
            periodCode:undefined
        }
        this.getPeriod=this.getPeriod.bind(this);
        this.getTimeByPeriod=this.getTimeByPeriod.bind(this);
    }
    componentDidMount(){
        this.getPeriod()
    }
    componentWillUnmount(){
        this.setState=()=>{
            return
        }
    }
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
                    period:res,
                    periodCode:res[0].code
                })
            }
        })
    }
    getTimeByPeriod(){

    }
    render(){
        const current=JSON.parse(localStorage.getItem('current'))
        this.url=JSON.parse(localStorage.getItem('url'))
        return(
            <div>
                <Blockquote name={current.menuName} menu={current.menuParent}/>
                <Tabs defaultActiveKey="1" >
                    <TabPane tab="主材" key="1">
                        <PositiveMainMaterial url={this.url} period={this.state.period} periodCode={this.state.periodCode}/>
                    </TabPane>
                    <TabPane tab="辅材" key="2">
                        <PositiveAuxiliaryMaterial url={this.url} period={this.state.period} periodCode={this.state.periodCode}/>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
export default PositiveCostAccount