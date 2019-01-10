import React,{Component} from 'react';
import Blockquote from '../BlockQuote/blockquote';
import SearchCell from '../BlockQuote/search';
import {Tabs} from 'antd';
import './block.css';
import RawMaterial from './rawMaterial/rawMaterial';
import Manufacturer from './factory/factory';
import Standard  from './standard/standard';
import SetStandard from './setStandard/setStandard';
class RawStandard extends Component{
    constructor(props){
        super(props);
        this.state={
            flag:1,//决定渲染那个界面
            content1:'选择原材料',//最开始是这样，但是一旦选择之后会改成所选择的那个文字
            content2:'选择生产厂家',
            content3:'设置标准',
            rawMaterialId:0,//原材料id
            factoryId:0,
            detail:[],
            standardData:[],//建立标准返回的数据作为标准界面表格的数据
        }
        this.onBlockChange1=this.onBlockChange1.bind(this);
        this.onBlockChange2=this.onBlockChange2.bind(this);
        this.onBlockChange3=this.onBlockChange3.bind(this);
        this.clickToRaw=this.clickToRaw.bind(this);
        this.clickToFactory=this.clickToFactory.bind(this);
    }
 
  onBlockChange1(flag,content1,id){//原材料那个块是否被选中，选中后发生的变化
      //console.log(flag,content1);
      this.setState({
        flag:flag,
        content1:content1,
        rawMaterialId:id
    });
  }
  onBlockChange2(flag,content2,id){
    //console.log(flag);
         this.setState({
             flag:flag,
             content2:content2,
             factoryId:id
         });
  }
  onBlockChange3(flag,content3){
      console.log(flag,content3);
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
                     <div className={this.state.flag===2||this.state.flag===3||this.state.flag===4?'rawStanstdardBlockQuoBlue':'rawStanstdardBlockQuoGrey'} onClick={this.clickToFactory}><span><i className='fa fa-industry'></i></span>&nbsp;{this.state.content2}</div><span className={this.state.flag===2||this.state.flag===3||this.state.flag===4?'rawStanstdardBlockQuoTriggleBlue':'rawStanstdardBlockQuoTriggleGrey'}></span>
                     <div className={this.state.flag===3?'rawStanstdardBlockQuoBlue':'rawStanstdardBlockQuoGrey'} ><span><i className='fa fa-leaf'></i></span>&nbsp;{this.state.content3}</div> 
                     
                   <div>
                        <div className={this.state.flag===1?'show':'hide'}>
                            <RawMaterial onBlockChange={this.onBlockChange1} type={1}/>
                        </div>
                        <div className={this.state.flag===2?'show':'hide'}  >
                            <Manufacturer onBlockChange={this.onBlockChange2} rawMaterialId={this.state.rawMaterialId} type={2}/> 
                        </div>
                        <div className={this.state.flag===3?'show':'hide'}>
                            <Standard onBlockChange={this.onBlockChange3} type={3} raw={this.state.content1} factory={this.state.content2} factoryId={this.state.factoryId} rawMaterialId={this.state.rawMaterialId}/>
                        </div>
                        <div className={this.state.flag===4?'show':'hide'}>
                            <SetStandard onBlockChange={this.onBlockChange3}  type={4} raw={this.state.content1} factory={this.state.content2} rawMaterialId={this.state.rawMaterialId}  rawManufacturerId={this.state.factoryId}/>
                        </div>
                    </div>
                   </div > 
                   
               </div>
           );
       }
}
export default RawStandard;