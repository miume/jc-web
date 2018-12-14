import React,{Component} from 'react';
import Blockquote from '../BlockQuote/blockquote';
import SearchCell from '../BlockQuote/search';
import './block.css';

import RawMaterial from './rawMaterial/rawMaterial';
import Manufacturer from './factory/factory';
class RawStandard extends Component{
    constructor(props){
        super(props);
        this.state={
            flag1:1,
            flag2:0,
            flag3:0,
            content1:'选择原材料',
            content2:'选择生产厂家',
            content3:'设置标准',

        }
    }
    next(){
       const current=this.state.current+1;
       this.setState({
           current:current
       }); 
    }
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
                    <RawMaterial onBlockChange={this.onBlockChange}/>
                    {/* <Manufacturer/> */}
                   </div >
                   
               </div>
           );
       }
}
export default RawStandard;