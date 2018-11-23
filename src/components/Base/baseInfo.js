import React from 'react';
import BaseInfoData from './baseInfoData';
const data=[{
    id:1,
    name:'送样工厂',
    path:'/deliveryFactory'
},{
    id:2,
    name:'产品工序',
    path:'/productProcess'
},{
    id:3,
    name:'检测项目',
    path:'/testItem'
},{
    id:4,
    name:'取样点',
    path:'/samplePoint'
},{
    id:5,
    name:'产品线',
    path:'/productLine'
}]
const active={
    backgroundcolor:'#00b4f0',//点击的时候按钮变成蓝色
}
const noActive={
    backgroundcolor:'#ebebeb',//未点击的时候是灰白色
}
var style={//按钮风格
     width:'230px',height:'100px',
     backgroundcolor:'#ebebeb',margin:'25px',
     border:'solid 1px black'
}
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
       //console.log(e.target.value);
       e.target.style.backgroundColor='#00b4f0';//点击时button背景变为蓝色
       const ID=e.target.id;
       const path=e.target.value;
       //console.log('this.state.clickId:'+this.state.clickId+'ID:'+ID);
       //如果已点击并且已点击的id不等于现在点击的按钮ID，则之前button变回灰色
       if(this.state.clickId && this.state.clickId!=ID){
         document.getElementById(this.state.clickId).style.backgroundColor='#ebebeb';
       }
       this.setState({
           clickId:ID,
           path:path,
           clickButton:e.target
       });
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
                <BaseInfoData data={data} click={this.click} 
                buttonstyle={style} nextStep={this.nextStep} lastStep={this.lastStep}/>
            </div>
        );
    }
}
export default BaseInfo;