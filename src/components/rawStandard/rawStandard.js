import React,{Component} from 'react';
import Blockquote from '../BlockQuote/blockquote';
import SearchCell from '../BlockQuote/search';
import {Tabs} from 'antd';
import axios from 'axios';
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
            dataSource:[],
            name:''
           
        }
        this.onBlockChange1=this.onBlockChange1.bind(this);
        this.onBlockChange2=this.onBlockChange2.bind(this);
        this.onBlockChange3=this.onBlockChange3.bind(this);
        this.clickToRaw=this.clickToRaw.bind(this);
        this.clickToFactory=this.clickToFactory.bind(this);
        this.getStandard=this.getStandard.bind(this);
    }
  onBlockChange1(flag,content1,id){//原材料那个块是否被选中，选中后发生的变化
    //  console.log(flag,content1,id);
        this.setState({
            flag:flag,
            content1:content1,
            rawMaterialId:id
        });
  }
  onBlockChange2(flag,content2,id){//原材料那个块是否被选中，选中后发生的变化
        this.setState({
            flag:flag,
            content2:content2,
            factoryId:id
        });
  }
  getStandard(id){//获取设置标准界面的表格数据
    //console.log(value);
    axios({
        url:`${this.url.rawStandard.getStandard}`,
        method:'get',
        headers:{
           'Authorization':this.url.Authorization
        },
        params:{
           materialId:this.state.rawMaterialId,
           factoryId:id
      },
        type:'json'
    }).then(data=>{
        //console.log(data);
        const res=data.data.data;
        var raw=[];
        var j=1;
       if(res){
           for(var i=res.length-1;i>=0;i--){
                  raw.push({
                      index:j++,
                      batchNumber:res[i].commonBatchNumber.batchNumber,
                      createTime:res[i].commonBatchNumber.createTime,
                      createPersonName:res[i].createPersonName,
                      status:res[i].commonBatchNumber.status,
                      batchNumberId:res[i].commonBatchNumber.id,
                      isPublished:res[i].commonBatchNumber.isPublished,//为1是实施中
                  });
            }
        }
       console.log(raw);
    this.setState({
        dataSource:raw,
    });
  });
}
   onBlockChange3(flag,content3){
        this.setState({
            flag:flag,
        });
        if(flag===3){
            this.getStandard(this.state.factoryId);
        }
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
        this.url=JSON.parse(localStorage.getItem('url'));
        const current=JSON.parse(localStorage.getItem('current'));
        //console.log(current.menuName,current.menuParent);
           return(
            <div>
                   <Blockquote menu={current.menuParent} name={current.menuName}/>
                   <div  className='rawMaterailStandard'>
                     <div className='rawStanstdardBlockQuoBlue' onClick={this.clickToRaw}><span><i className='fa fa-leaf'></i></span>&nbsp;{this.state.content1}</div>
                     <div className={this.state.flag===2||this.state.flag===3||this.state.flag===4?'rawStanstdardBlockQuoBlue':'rawStanstdardBlockQuoGrey'} onClick={this.clickToFactory}><span><i className='fa fa-industry'></i></span>&nbsp;{this.state.content2}</div>
                     <div className={this.state.flag===3?'rawStanstdardBlockQuoBlue':'rawStanstdardBlockQuoGrey'} ><span><i className='fa fa-leaf'></i></span>&nbsp;{this.state.content3}</div> 
                     
                   <div>
                        <div className={this.state.flag===1?'':'hide'}>
                            <RawMaterial onBlockChange={this.onBlockChange1} type={1} url={this.url}/>
                        </div>
                        <div className={this.state.flag===2?'':'hide'}  >
                            <Manufacturer onBlockChange={this.onBlockChange2} rawMaterialId={this.state.rawMaterialId} type={2} url={this.url}/> 
                        </div>
                        <div className={this.state.flag===3?'':'hide'}>
                            <Standard dataSource={this.state.dataSource}  onBlockChange={this.onBlockChange3}  type={3} raw={this.state.content1} factory={this.state.content2} rawManufacturerId={this.state.factoryId} rawMaterialId={this.state.rawMaterialId} url={this.url} getStandard={this.getStandard}/>
                        </div>
                        <div className={this.state.flag===4?'':'hide'}>
                            <SetStandard onBlockChange={this.onBlockChange3}  type={4} raw={this.state.content1} factory={this.state.content2} rawMaterialId={this.state.rawMaterialId}  rawManufacturerId={this.state.factoryId} url={this.url} getStandard={this.getStandard}/>
                        </div>
                    </div>
                   </div > 
                   
               </div>
           );
       }
}
export default RawStandard;