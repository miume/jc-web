import React from 'react';
import BlockQuote from '../dataEntry/blockQuote';
import {Tabs} from 'antd';
import Pack from './pack';
import Check from './check';
import Release from './release';



class PurchaseCheckReport extends React.Component {
    constructor(props) {
        super(props);
    };
    render() {
        const TabPane = Tabs.TabPane;
        return(
            <div>
                <BlockQuote name="进货检测报告" menu="质量与流程" menu2="数据录入"></BlockQuote>
                <Tabs defaultActiveKey="1" type="card" onChange={this.callback}  style={{padding:'15px'}}>
                    <TabPane tab="生成" key="1" >
                        <Pack />
                    </TabPane>
                    <TabPane tab="审核" key="2" >
                        <Check />
                    </TabPane>
                    <TabPane tab="发布" key="3" >
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