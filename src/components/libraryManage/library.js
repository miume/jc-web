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
    callback=(key)=>{
        console.log(key);
    }
    render(){
        const current = JSON.parse(localStorage.getItem('current')) ;
        return(
           <div>
               <BlockQuote name={current.menuName} menu={current.menuParent}/>
                <Tabs defaultActiveKey='1' onChange={()=>this.callback}>
                 {/* //tab是选项卡头显示文字,key是对应activekey，activekey是当前激活 tab 面板的 key */}
                <TabPane tab={<span><i className='fa fa-leaf'></i>&nbsp; 原材料盘库</span>} key='1'> 
                   <Material type={1}/>
                 </TabPane>
                 <TabPane tab={<span><i className='fa fa-cube'></i>&nbsp; 产品盘库</span>} key='2'>
                    <Product type={2}/>
                 </TabPane>
                 <TabPane tab={<span><i className='fa fa-leaf'></i>&nbsp; 原材料盘库记录</span>} key='3'>
                    <MaterialRecord type={3}/>
                 </TabPane>
                 <TabPane tab={<span><i className='fa fa-cube'></i>&nbsp; 产品盘库记录</span>} key='4'>
                    <ProductRecord type={4}/>
                 </TabPane>
               </Tabs>
            </div>
        );
    }
}
export default LibraryManage;