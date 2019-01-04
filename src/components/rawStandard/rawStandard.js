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
            content1:'选择原材料',//最开始是这样，但是一旦选择之后会改成所选择的那个文字
            content2:'选择生产厂家',
            content3:'设置标准',

        }
        this.onBlockChange1=this.onBlockChange1.bind(this);
        this.onBlockChange2=this.onBlockChange2.bind(this);
        this.onBlockChange3=this.onBlockChange3.bind(this);
        this.clickToRaw=this.clickToRaw.bind(this);
        this.clickToFactory=this.clickToFactory.bind(this);
    }
 
  onBlockChange1(flag,content1){//原材料那个块是否被选中，选中后发生的变化
      //console.log(flag,content1);
      this.setState({
        flag:flag,
        content1:content1,
    });
  }
  onBlockChange2(flag,content2){
         this.setState({
             flag:flag,
             content2:content2,
         });
  }
  onBlockChange3(flag,content3){
    this.setState({
        flag:flag,
        content3:content3,
    });
}
    clickToRaw(){//在生产厂家或设置标准界面点击回到原材料
         this.setState({
            flag:1,
            content1:this.state.content1,
            content2:'请选择生产厂家'
         });
    }
    clickToFactory(){//在设置标准界面点击回到生产厂家
        this.setState({
            flag:2,
            content2:this.state.content2,
         });
    }
       render(){
           return(
               <div>
                   <Blockquote menu='技术中心' name='原材料标准'/>
                  
                   <div style={{padding:'20px'}}>
                     
                     <div className='rawStanstdardBlockQuoBlue' onClick={this.clickToRaw}><span><i className='fa fa-leaf'></i></span>&nbsp;{this.state.content1}</div><span className='rawStanstdardBlockQuoTriggleBlue'></span>
                     <div className={this.state.flag===2||this.state.flag===3?'rawStanstdardBlockQuoBlue':'rawStanstdardBlockQuoGrey'} style={{zIndex:'-1'}} onClick={this.clickToFactory}><span><i className='fa fa-industry'></i></span>&nbsp;{this.state.content2}</div><span className={this.state.flag===2||this.state.flag===3?'rawStanstdardBlockQuoTriggleBlue':'rawStanstdardBlockQuoTriggleGrey'}></span>
                     <div className={this.state.flag===3?'rawStanstdardBlockQuoBlue':'rawStanstdardBlockQuoGrey'} ><span><i className='fa fa-leaf'></i></span>&nbsp;{this.state.content3}</div> 
                   <div >
                     <div  className={this.state.flag===1?'show':'hide'}>
                         <RawMaterial onBlockChange={this.onBlockChange1} type={1}/>
                     </div>
                     <div   className={this.state.flag===2?'show':'hide'}  >
                          <Manufacturer onBlockChange={this.onBlockChange2} type={2}/> 
                      </div>
                     <div className={this.state.flag===3?'show':'hide'}>
                          <Standard onBlockChange={this.onBlockChange3} type={3} raw={this.state.content1} factory={this.state.content2}/>
                      </div>
                     </div>
                   </div > 
                   
               </div>
           );
       }
}
export default RawStandard;