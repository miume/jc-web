import React from 'react';
import {Tabs} from 'antd';
import BlockQuote from '../BlockQuote/blockquote';
import  Material from './material/material';
import Product from './product/product'
// import ProductInventor from './productInventor/productInventor';
const TabPane=Tabs.TabPane;
class LibraryManage extends React.Component{
    callback=(key)=>{
        console.log(key);
    }
    render(){
        return(
           <div>
               <BlockQuote name='盘库管理' menu='智能仓库'/>
                <Tabs defaultActiveKey='1' onChange={()=>this.callback}>
                 {/* //tab是选项卡头显示文字,key是对应activekey，activekey是当前激活 tab 面板的 key */}
                <TabPane tab={<span><i className='fa fa-tint'></i>&nbsp; 原材料盘库</span>} key='1'> 
                   <Material />
                 </TabPane>
                 <TabPane tab={<span><i className='fa fa-industry'></i>&nbsp; 产品盘库</span>} key='2'>
                    <Product />
                 </TabPane>
               </Tabs>
            </div>
            
        );
    }
}
export default LibraryManage;