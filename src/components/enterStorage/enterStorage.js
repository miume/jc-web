import React from 'react';
import {Tabs} from 'antd';
import BlockQuote from '../BlockQuote/blockquote';
import  RowMaterialStorage from './rowMaterialStorage/rowMaterialStorage';
import ProductInStorage from './productInStorge/productInStorage';
const TabPane=Tabs.TabPane;
class EnterStorage extends React.Component{
    callback=(key)=>{
        console.log(key);
    }
    render(){
        return(
           <div>
               <BlockQuote name='入库管理' menu='智能仓库'/>
                <Tabs defaultActiveKey='1' onChange={()=>this.callback}>
                 {/* //tab是选项卡头显示文字,key是对应activekey，activekey是当前激活 tab 面板的 key */}
                <TabPane tab={<span><i className='fa fa-tint'></i>&nbsp; 原材料入库</span>} key='1'> 
                   <RowMaterialStorage/>
                 </TabPane>
                 <TabPane tab={<span><i className='fa fa-industry'></i>&nbsp; 产品入库</span>} key='2'>
                      <ProductInStorage/>
                 </TabPane>
               </Tabs>
            </div>
            
        );
    }
}
export default  EnterStorage;