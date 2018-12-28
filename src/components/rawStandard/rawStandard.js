import React,{Component} from 'react';
import Blockquote from '../BlockQuote/blockquote';
import SearchCell from '../BlockQuote/search';
import {Tabs} from 'antd';
import './block.css';
import RawMaterial from './rawMaterial/rawMaterial';
import Manufacturer from './factory/factory';
import Standard  from './standard/standard';
//const TabPane = Tabs.TabPane;
class RawStandard extends Component{
    constructor(props){
        super(props);
        this.state={
            flag:1,//决定渲染那个界面
           

            click1:false,//是否可以点击
            click2:false,
            click3:false,

            content1:'选择原材料',//最开始是这样，但是一旦选择之后会改成所选择的那个文字
            content2:'选择生产厂家',
            content3:'设置标准',

        }
        this.onBlockChange1=this.onBlockChange1.bind(this);
        
        this.onBlockChange2=this.onBlockChange2.bind(this);
        this.returnRaw=this.returnRaw.bind(this);
    }
 
  onBlockChange1(flag,content1,click1){//原材料那个块是否被选中，选中后发生的变化
      console.log(flag,content1,click1);
    
      this.setState({
        flag:flag,
        content1:content1,
        click1:click1//后面被选中的时候，就可以点击这个面板了
    });
  }

  onBlockChange2(flag,content2,click2){
         this.setState({
             flag:flag,
             content2:content2,
             click2:click2,
         });
  }
  returnRaw(){
    const name=this.state.content1;
    return name;
}
   
       render(){
           return(
               <div>
                   <Blockquote menu='技术中心' name='原材料标准'/>
                  
                   {/* <div style={{padding:'20px'}}>
                     
                     <div className='rawStanstdardBlockQuo' >{this.state.content1}</div>
                     <div className='rawStanstdardBlockQuo' >{this.state.content2}</div>
                     <div className='rawStanstdardBlockQuo' >{this.state.content3}</div>
                   
                     <div  className={this.state.flag===1?'show':'hide'}>
                         <RawMaterial onBlockChange={this.onBlockChange1} />
                     </div>
                     <div   className={this.state.flag===2?'show':'hide'}  >
                          <Manufacturer onBlockChange={this.onBlockChange2} returnRaw={this.returnRaw}/> 
                      </div>
                     <div className={this.state.flag===3?'show':'hide'}>
                          <Standard />
                      </div>
                   </div > */}
                   
               </div>
           );
       }
}
export default RawStandard;