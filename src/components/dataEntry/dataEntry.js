import React from 'react';
import './data.css';
import DataPart from './dataPart';
import Blockquote from '../BlockQuote/blockquote';
const data = [{
    id:1,
    name:'制程检测',
    path:'/processInspection',
    className:'fa fa-tasks fa-5x'
},{
    id:2,
    name:'样品送检',
    path:'/sampleInspection',
    className:'fa fa-flask fa-5x'
},{
    id:3,
    name:'原材料检测',
    path:'/rawTestReport',
    className:'fa fa-leaf fa-5x'
},{
    id:4,
    name:'进货检验',
    path:'/PurchaseCheckReport',
    className:'fa fa-shopping-cart fa-5x'
},{
    id:5,
    name:'中间品检验',
    path:'/InterProduct',
    className:'fa fa-code-fork fa-5x'
},{
    id:6,
    name:'成品检验',
    path:'/productInspection',
    className:'fa fa-cube fa-5x'
},{
    id:7,
    name:'不合格审评表',
    path:'/unqualifiedExamineTable',
    className:'fa fa-exclamation-triangle fa-5x'
},{
    id:8,
    name:'不合格跟踪表',
    path:'/unqualifiedTrackTable',
    className:'fa fa-crosshairs fa-5x'
}]

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
    }
     click(e){
         const path = e.target.id;
         this.props.history.push({pathname:path})
    }
    render(){
        return (
            <div>
                <Blockquote menu='质量与流程' name='数据录入' />
                <div style={{marginTop:'20px',width:'100%',height:'100%'}}>
                    <div className='card-parent'>
                    {
                        data.map(d=>
                        <DataPart key={d.id} id={d.id} name={d.name} path={d.path} click={this.click} className={d.className} ></DataPart>
                        )}
                </div>
           </div>
           </div>
        );
    }
}
export default DataEntry;
