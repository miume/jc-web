import React,{Component} from 'react';
import Blockquote from '../BlockQuote/blockquote';
//import {Steps} from 'antd';
import SearchCell from '../BlockQuote/search';
import './block.css';
import DataPart from './div';
//const Step=Steps.Step;


// const steps=[{
//     title:'选择原材料',
//     content:'first'
// },{
//     title:'选择生产厂家',
//     constent:'second'
// },{
//     title:'设置标准',
//     content:'third'
// }];

const data=[{
    id:1,
    name:'镍钴锰'
},{
    id:2,
    name:'铁矿'
},{ 
    id:3,
    name:'金矿'
},{ 
    id:4,
    name:'银矿'
},{
    id:5,
    name:'铜矿'
},{
    id:6,
    name:'硫酸'
},{
    id:7,
    name:'硫酸'
},{
    id:8,
    name:'硫酸'
},{
    id:71,
    name:'硫酸'
},{
    id:72,
    name:'硫酸'
},{
    id:733,
    name:'硫酸'
},{
    id:74,
    name:'硫酸'
},{
    id:75,
    name:'硫酸'
},{
    id:743,
    name:'硫酸'
},{
    id:734,
    name:'硫酸'
},{
    id:735,
    name:'硫酸1'
}];
class RawStandard extends Component{
    constructor(props){
        super(props);
        this.state={
            current:0,
            searchContent:''
        }
    }
    next(){
       const current=this.state.current+1;
       this.setState({
           current:current
       }); 
    }
    previous(){
       const current=this.state.current-1;
       this.setState({
        current:current
       });
       this.searchContentChange=this.searchContentChange.bind(this);
       this.searchEvent=this.searchEvent.bind(this);
    }
 /**---------------------- */
//获取查询时用户名称的实时变化
    searchContentChange(e){
        const value=e.target.value;
        this.setState({
            searchContent:value
        });

    }
    searchEvent(){
       
    }
   
       render(){
           return(
               <div>
                   <Blockquote menu='技术中心' name='原材料标准'/>
                   
                   <div style={{padding:'20px'}}>
                     
                     {/* <Steps current={this.state.current}>
                          {steps.map(item => <Step key={item.title} title={item.title} />)}
                    </Steps> */}
                    <div style={{height:'16px',width:'477px',backgroundColor:'blue'}}>你好吗</div>
                    <span></span>
                    <span></span>
                   </div >
                   <div style={{padding:'15px'}}>
                    &nbsp; <h2 style={{display:'inline-block'}}><span style={{width:'24px',height:'90px'}}>请选择原材料</span></h2>
                     <span style={{float:'right' }}>
                     <SearchCell name='请输入搜索内容'
                     searchContent={this.searchEvent}
                     searchContentChange={this.searchContentChange}/>
                     </span>
                   </div>
                   <div className='parent'>
                    
                       {
                           data.map(d=>
                            <DataPart  key={d.id} name={d.name}/>)
                       }
                    
                   </div>
               </div>
           );
       }
}
export default RawStandard;