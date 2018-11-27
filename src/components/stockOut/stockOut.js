import React from 'react';
import {Tabs} from 'antd';
import BlockQuote from '../BlockQuote/blockquote';
import RawMaterialApplication from './rawMaterialApplication/rawMaterialApplication';
const TabPane = Tabs.TabPane;
class StockOut extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <BlockQuote name='出库管理' menu='智能仓库'></BlockQuote>
                <Tabs defaultActiveKey='1'>
                    <TabPane key='1' tab={<span><i className="fa fa-leaf" aria-hidden="true"></i> 原材料出库申请</span>}><RawMaterialApplication /></TabPane>
                    <TabPane key='2' tab={<span><i className="fa fa-cube" aria-hidden="true"></i> 产品出库申请</span>}></TabPane>
                    <TabPane key='3' tab={<span><i className="fa fa-leaf" aria-hidden="true"></i> 原材料出库记录</span>}></TabPane>
                    <TabPane key='4' tab={<span><i className="fa fa-cube" aria-hidden="true"></i> 产品出库申请</span>}></TabPane>
                </Tabs>
                
            </div>
        );
    }
}
export default StockOut;