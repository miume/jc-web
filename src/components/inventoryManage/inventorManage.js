import React from 'react';
import {Tabs} from 'antd';
import BlockQuote from '../BlockQuote/blockquote';
import  RowMaterialInventor from './rawMaterialInventor/rawMaterialInventor';
import ProductInventor from './productInventor/productInventor';
const TabPane=Tabs.TabPane;
class InventorManage extends React.Component{
    callback=(key)=>{
        console.log(key);
    }
    render(){
        return(
           <div>
               <BlockQuote name='库存管理' menu='智能仓库'/>
                <Tabs defaultActiveKey='1' onChange={()=>this.callback}>
                 {/* //tab是选项卡头显示文字,key是对应activekey，activekey是当前激活 tab 面板的 key */}
                <TabPane tab={<span><i className='fa fa-tint'></i>&nbsp; 原材料库存</span>} key='1'> 
                   <RowMaterialInventor/>
                 </TabPane>
                 <TabPane tab={<span><i className='fa fa-industry'></i>&nbsp; 产品库存</span>} key='2'>
                    <ProductInventor/>
                 </TabPane>
               </Tabs>
            </div>
            
        );
    }
}
export default InventorManage;