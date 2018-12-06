import React from 'react';
import {Tabs} from 'antd';
import BlockQuote from '../BlockQuote/blockquote';
import RawMaterialApplication from './rawMaterialApplication/rawMaterialApplication';
import RawMaterialOut from './rawMaterialApplication/rawMaterialOut';
const TabPane = Tabs.TabPane;
class StockOut extends React.Component{
    render(){
        return (
            <div>
                <BlockQuote name='出库管理' menu='智能仓库'></BlockQuote>
                <Tabs defaultActiveKey='1-1' onChange={this.handleChange}>
                <TabPane key='1-1' tab={<span><i className="fa fa-leaf" aria-hidden="true"></i> &nbsp;原材料出库申请</span>}><RawMaterialApplication type={1} index={1}/></TabPane>
                    <TabPane key='2-3' tab={<span><i className="fa fa-cube" aria-hidden="true"></i> &nbsp;产品出库申请</span>}><RawMaterialApplication type={3} index={2}/></TabPane>
                    <TabPane key='3-1' tab={<span><i className="fa fa-leaf" aria-hidden="true"></i> &nbsp;原材料出库记录</span>}><RawMaterialOut type={1} index={3}/></TabPane>
                    <TabPane key='4-3' tab={<span><i className="fa fa-cube" aria-hidden="true"></i> &nbsp;产品出库记录</span>}><RawMaterialOut type={3} index={4}/></TabPane>
                </Tabs>
                
            </div>
        );
    }
}
export default StockOut;