import React from 'react';
import BlockQuote from '../dataEntry/blockQuote';
import {Tabs} from 'antd';
import Pack from './pack';
import Check from './check';
import Release from './release';



class PurchaseCheckReport extends React.Component {
    render() {
        const TabPane = Tabs.TabPane;
        return(
            <div>
                <BlockQuote name="进货检测报告" menu="质量与流程" menu2="数据录入"></BlockQuote>
                <Tabs defaultActiveKey="2"  onChange={this.callback}  style={{padding:'15px'}}>
                    <TabPane tab={<span style={{paddingLeft:'25px',paddingRight:'25px'}}><i className="fa fa-cube" aria-hidden="true"></i> &nbsp;生成</span>} key="1" >
                        <Pack />
                    </TabPane>
                    <TabPane tab={<span style={{paddingLeft:'25px',paddingRight:'25px'}}><i className="fa fa-certificate" aria-hidden="true"></i> &nbsp;审核</span>} key="2" >
                        <Check />
                    </TabPane>
                    <TabPane tab={<span style={{paddingLeft:'25px',paddingRight:'25px'}}><i className="fa fa-bullhorn" aria-hidden="true"></i> &nbsp;发布</span>} key="3" >
                        <Release />
                    </TabPane>
                </Tabs>
            </div>
        )
    };
    callback= (key) => {
        // console.log(key);
    }
}

export default PurchaseCheckReport;