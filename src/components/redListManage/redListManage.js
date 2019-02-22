import React from 'react';
import {Tabs} from 'antd';
import BlockQuote from '../BlockQuote/blockquote';
import  RawMaterialRedList from './rawMaterialRedList/rawMaterialRedList';
import ProductRedList from './productRedList/productRedList';
const TabPane=Tabs.TabPane;
class RedListManage extends React.Component{
    callback=(key)=>{
        console.log(key);
    }
    render(){
        return(
           <div>
               <BlockQuote name='红单管理' menu='智能仓库'/>
                <Tabs defaultActiveKey='1' onChange={()=>this.callback}>
                 {/* //tab是选项卡头显示文字,key是对应activekey，activekey是当前激活 tab 面板的 key */}
                <TabPane tab={<span><i className='fa fa-tint'></i>&nbsp; 原材料红单</span>} key='1'> 
                   <RawMaterialRedList type={1}/>
                 </TabPane>
                 <TabPane tab={<span><i className='fa fa-industry'></i>&nbsp; 成品红单</span>} key='2'>
                    <ProductRedList type={3}/>
                 </TabPane>
               </Tabs>
            </div>
            
        );
    }
}
export default  RedListManage;