import React from 'react';
import {Col,Row} from 'antd';
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
    className:'fa fa-envira fa-5x'
},{
    id:4,
    name:'进货检验',
    path:'/PurchaseCheckReport',
    className:'fa fa-cube fa-5x'
},{
    id:5,
    name:'中间品检验',
    path:'/InterProduct',
    className:'fa fa-code-fork fa-5x'
},{
    id:6,
    name:'成品检验',
    path:'/process',
    className:'fa fa-codepen fa-5x'
},]

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
        this.returnDataEntry = this.returnDataEntry.bind(this);
    }
     click(e){
        const path = e.target.id;
        // console.log('this.state.clickId:'+this.state.clickId+'value:'+value)
        //如果已点击并且已点击的id不等于现在点击的buttonID 则之前button变回灰色
        // if( this.state.clickId && this.state.clickId!=value){
        //     document.getElementById(this.state.clickId).style.backgroundColor='#ebebeb';
        // }
        console.log(e.target)
        this.props.history.push({pathname:path})
         
    }
    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/dataEntry'});
    }
    render(){
        return (
            <div>
                <Blockquote menu='质量流程' name='数据录入' onClick={this.returnDataEntry}/>
                <div style={{marginTop:'20px',width:'100%',height:'100%'}}>
                    <div style={{margin:'20px'}}>
                    <Row gutter={32}>
                    {
                        data.map(d=>
                           <Col key={d.id} span={6} className='gutter-row'  onClick={this.click}>
                               <DataPart key={d.id} id={d.id} name={d.name} path={d.path} click={this.click} className={d.className}></DataPart>
                           </Col> 
                            )
                    }
                    </Row>
                    {/* {
                        data.map(d=>
                            <DataPart key={d.id} id={d.id} name={d.name} path={d.path} click={this.click} className={d.className}></DataPart>
                        )
                    } */}
                </div>
           </div>
           </div>
        );
    }
}
export default DataEntry;