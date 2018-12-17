import React,{Component} from 'react';
import Blockquote from '../BlockQuote/blockquote';
import SearchCell from '../BlockQuote/search';
import './block.css';

import RawMaterial from './rawMaterial/rawMaterial';
import Manufacturer from './factory/factory';
import Standard  from './standard/standard';
class RawStandard extends Component{
    constructor(props){
        super(props);
        this.state={
            flag1:true,//决定渲染那个界面
            flag2:false,
            flag3:false,

            click1:false,//是否可以点击
            click2:false,
            click3:false,

            content1:'选择原材料',//最开始是这样，但是一旦选择之后会改成所选择的那个文字
            content2:'选择生产厂家',
            content3:'设置标准',

        }
    }
    // next(){
    //    const current=this.state.current+1;
    //    this.setState({
    //        current:current
    //    }); 
    // }
    // previous(){
    //    const current=this.state.current-1;
    //    this.setState({
    //     current:current
    //    });
    // }
  onBlockChange(value){
      console.log(value);
  }
   
       render(){
           return(
               <div>
                   <Blockquote menu='技术中心' name='原材料标准'/>
                  
                   <div style={{paddingLeft:'35px',paddingTop:'15px'}}>
                     
                     {/* <Steps current={this.state.current}>
                          {steps.map(item => <Step key={item.title} title={item.title} />)}
                    </Steps> */}
                    <div className='rawStanstdardBlockQuo' >{this.state.content1}</div>
                    <div className='rawStanstdardBlockQuo' >{this.state.content2}</div>
                    <div className='rawStanstdardBlockQuo' >{this.state.content3}</div>
                    {/* <RawMaterial onBlockChange={this.onBlockChange}/> */}
                    {/* <Manufacturer/> */}
                    <Standard/>
                   </div >
                   
               </div>
           );
       }
}
export default RawStandard;