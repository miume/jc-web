import React,{Component} from 'react'
import Blockquote from '../../BlockQuote/blockquote'
import PositiveMainMaterial from './mainMaterial'
import axios from 'axios'
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
                <PositiveMainMaterial url={this.url} period={this.state.period} periodCode={this.state.periodCode}/>
            </div>
        );
    }
}
export default PositiveCostAccount