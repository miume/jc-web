import React from 'react';
import {Tabs} from 'antd';
import BlockQuote from '../BlockQuote/blockquote';
import  Material from './material/material';
import Product from './product/product'
import MaterialRecord from "./materialRecord/materialRecord"
import ProductRecord from "./productRecord/productRecord"
// import ProductInventor from './productInventor/productInventor';
const TabPane=Tabs.TabPane;
class LibraryManage extends React.Component{
    operation
    callback=(key)=>{
        console.log(key);
    }
    judgeOperation(operation,operationCode){
        if(operation===null) return false
        var flag = operation?operation.filter(e=>e.operationCode===operationCode):[];
        return flag.length>0?true:false
    }
    render(){
        const current = JSON.parse(localStorage.getItem('current')) ;
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
        return(
           <div>
               <BlockQuote name={current.menuName} menu={current.menuParent}/>
                <Tabs defaultActiveKey='1' onChange={()=>this.callback}>
                 {/* //tab是选项卡头显示文字,key是对应activekey，activekey是当前激活 tab 面板的 key */}
                <TabPane tab={<span><i className='fa fa-leaf'></i>&nbsp; 原材料盘库</span>} key='1'> 
                   <Material type={1} flag={this.judgeOperation(this.operation,'QUERY')}/>
                 </TabPane>
                 <TabPane tab={<span><i className='fa fa-cube'></i>&nbsp; 产品盘库</span>} key='2'>
                    <Product type={2} flag={this.judgeOperation(this.operation,'QUERY')}/>
                 </TabPane>
                 <TabPane tab={<span><i className='fa fa-leaf'></i>&nbsp; 原材料盘库记录</span>} key='3'>
                    <MaterialRecord type={3} flag={this.judgeOperation(this.operation,'QUERY')}/>
                 </TabPane>
                 <TabPane tab={<span><i className='fa fa-cube'></i>&nbsp; 产品盘库记录</span>} key='4'>
                    <ProductRecord type={4} flag={this.judgeOperation(this.operation,'QUERY')}/>
                 </TabPane>
               </Tabs>
            </div>
        );
    }
}
export default LibraryManage;