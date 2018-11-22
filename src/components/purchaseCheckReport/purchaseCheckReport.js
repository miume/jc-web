import React from 'react';
import BlockQuote from '../BlockQuote/blockquote';
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
                <BlockQuote name="进货检测报告"></BlockQuote>
                <Tabs defaultActiveKey="2" onChange={this.callback} size="large">
                    <TabPane tab="生成" key="1">
                        <Pack />
                    </TabPane>
                    <TabPane tab="审核" key="2">
                        <Check />
                    </TabPane>
                    <TabPane tab="发布" key="3">
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