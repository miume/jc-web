import React from 'react';
import Blockquote from '../BlockQuote/blockquote';
import BasePart from './basePart';
const data=[{
    id:1,
    name:'送样工厂',
    path:'/deliveryFactory',
    className:'fa fa-industry fa-5x'
},{
    id:2,
    name:'产品工序',
    path:'/productProcess',
    className:'fa fa-wrench fa-5x'
},{
    id:3,
    name:'检测项目',
    path:'/testItem',
    className:'fa fa-tint fa-5x'
},{
    id:4,
    name:'产品线',
    path:'/productLine',
    className:'fa fa-sitemap fa-5x'
}]
// const active={
//     backgroundcolor:'#00b4f0',//点击的时候按钮变成蓝色
// }
// const noActive={
//     backgroundcolor:'#ebebeb',//未点击的时候是灰白色
// }
// var style={//按钮风格
//      width:'230px',height:'100px',
//      backgroundcolor:'#ebebeb',margin:'25px',
//      border:'solid 1px black'
// }
class BaseInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            clickId:'',
            flag:0,
            path:'',
            clickButton:''
        }
        this.click=this.click.bind(this);
        this.nextStep=this.nextStep.bind(this);
        this.lastStep=this.lastStep.bind(this);
    }
    click(e){  
       //console.log(e.target);
  
       const path=e.target.id;
     
    this.props.history.push({pathname:path})
    }
    nextStep(){
        
        this.setState({
            flag:1
        });
        //console.log(this.state.path);
        this.props.history.push({pathname:this.state.path});//react的路由跳转
    }
    lastStep(){
        this.setState({flag:0});
    }
    render(){
        return(
            <div>
                <Blockquote menu='质量与流程' name='基础数据'/>
                <div style={{marginTop:'20px',width:'100%',height:'100%'}}>
                    <div style={{marginLeft:'20px'}}>
                    {
                        data.map(d=>
                            <BasePart key={d.id} id={d.id} name={d.name} path={d.path} click={this.click} className={d.className}></BasePart>
                        )
                    }
                </div>
           </div>
           </div>
        );
    }
}
export default BaseInfo;