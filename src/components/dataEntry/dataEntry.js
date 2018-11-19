import React from 'react';
import Data from './data';
const data = [{
    id:1,
    name:'制程检测',
    path:'/processInspection'
},{
    id:2,
    name:'样品送检',
    path:'/sampleInspection'
},{
    id:3,
    name:'原材料检测报告发布',
    path:'/rawTestReport'
},{
    id:4,
    name:'进货检验报告',
    path:'/PurchaseCheckReport'
},{
    id:5,
    name:'中间品检验',
    path:'/InterProduct'
},{
    id:6,
    name:'成品检验',
    path:'/process'
},]
const active={
    backgroundColor:'#00b4f0'
}
const notActive ={
    backgroundColor:'#ebebeb'
}

let styleObj={
    width:'230px',height:'100px' , margin:'25px', 
    border:'solid 1px black',
    backgroundColor:'#ebebeb'
}
class DataEntry extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            clickId:'',
            flag:0,
            path:'',
            clickButton:''
        }
        this.click = this.click.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.lastStep = this.lastStep.bind(this);
    }
     click(e){
        //  console.log(e.target)
        e.target.style.backgroundColor='#00b4f0'; //点击改变button的背景色
        const value = e.target.id;
        const path = e.target.value;
        // console.log('this.state.clickId:'+this.state.clickId+'value:'+value)
        //如果已点击并且已点击的id不等于现在点击的buttonID 则之前button变回灰色
        if( this.state.clickId && this.state.clickId!=value){
            document.getElementById(this.state.clickId).style.backgroundColor='#ebebeb';
        }
        this.setState({
            clickId:value,
            path:path,
            clickButton:e.target
        })    
    }
    nextStep(){
        this.setState({
            flag:1
        })
        console.log(this.state.path)
        this.props.history.push({pathname:this.state.path})
        
    }
    lastStep(){
        this.setState({
            flag:0
        })
    }
    render(){
        console.log(this.state.clickId)
        return (
            <div>
            {/* {
                (!this.state.flag)?<Data data={data} click={this.click} buttonstyle={style} nextStep={this.nextStep} />:<NextStep clickId={this.state.clickId} lastStep={this.lastStep} />
            } */}
                <Data data={data} click={this.click} nextStep={this.nextStep} />
           </div>
        );
    }
}
export default DataEntry;