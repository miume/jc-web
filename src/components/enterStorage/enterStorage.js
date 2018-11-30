import React from 'react';
import {Tabs} from 'antd';
import BlockQuote from '../dataEntry/blockQuote';
import  RowMaterialStorage from './rowMaterialStorage/rowMaterialStorage';
const TabPane=Tabs.TabPane;
class EnterStorage extends React.Component{
    callback=(key)=>{
        console.log(key);
    }
    render(){
        return(
           <div>
               <BlockQuote name='入库管理'/>
                <Tabs defaultActiveKey='1' onChange={()=>this.callback}>
                 {/* //tab是选项卡头显示文字,key是对应activekey，activekey是当前激活 tab 面板的 key */}
                 <TabPane tab='原材料入库' key='1'>
                   <RowMaterialStorage/>
                 </TabPane>
                 <TabPane tab='产品入库' key='2'>

                 </TabPane>
               </Tabs>
            </div>
            
        );
    }
}
export default  EnterStorage;