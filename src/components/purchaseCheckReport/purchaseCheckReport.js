import React from 'react';
import WhiteSpace from '../BlockQuote/whiteSpace';
import BlockQuote from '../BlockQuote/blockquote';
import {message,Input,Button,Tabs} from 'antd';
import Pack from './pack';

const Authorization = 'JCeyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbi1bUk9MRV9BVVRIX1JPTEVfREVMRVRFLCBST0xFX0FVVEhfQVVUSF9ERUxFVEUsIFJPTEVfQVVUSF9BVVRIX1VQREFURSwgUk9MRV9BVVRIX1JPTEVfVVBEQVRFLCBST0xFX0FVVEhfQVVUSF9ET1dOTE9BRCwgUk9MRV9BVVRIX01FTlVfRE9XTkxPQUQsIFJPTEVfQVVUSF9NRU5VX1BSSU5ULCBST0xFX0FVVEhfUk9MRV9BVURJVCwgUk9MRV9BVVRIX01FTlVfUVVFUlksIFJPTEVfVVNFUiwgUk9MRV9BVVRIX1JPTEVfRE9XTkxPQUQsIFJPTEVfQVVUSF9BVVRIX1NBVkUsIFJPTEVfQVVUSF9BVVRIX1BSSU5ULCBST0xFX0FVVEhfUk9MRV9RVUVSWSwgUk9MRV9BVVRIX0FVVEhfVVBMT0FELCBST0xFX0FVVEhfTUVOVV9TQVZFLCBST0xFX0FVVEhfUk9MRV9TQVZFLCBST0xFX0FVVEhfTUVOVV9ERUxFVEUsIFJPTEVfQVVUSF9BVVRIX1FVRVJZLCBST0xFX0FVVEhfUk9MRV9QUklOVCwgUk9MRV9BVVRIX01FTlVfQVVESVQsIFJPTEVfQVVUSF9ST0xFX1VQTE9BRCwgUk9MRV9BVVRIX0FVVEhfQVVESVQsIFJPTEVfQVVUSF9NRU5VX1VQTE9BRCwgUk9MRV9BRE1JTiwgUk9MRV9BVVRIX01FTlVfVVBEQVRFXSIsImV4cCI6MTU0MjI2NDc2Nn0.7UJlJrYa_C0T18q7WpQv90p9E2FAMi6GONUIeL6Rd63eIpOcwxwgzDH6R2EARaipHiPhrNImqKCrbR1o1MCnkA'

class PurchaseCheckReport extends React.Component {
    constructor(props) {
        super(props);
    };
    render() {
        const TabPane = Tabs.TabPane;
        return(
            <div>
                <BlockQuote name="进货检测报告"></BlockQuote>
                <Tabs defaultActiveKey="1" onChange={this.callback} size="large">
                    <TabPane tab="打包" key="1">
                        <Pack />
                    </TabPane>
                    <TabPane tab="审核" key="2">Content of Tab Pane 2</TabPane>
                    <TabPane tab="发布" key="3">Content of Tab Pane 3</TabPane>
                </Tabs>
            </div>
        )
    };
    callback= (key) => {
        console.log(key);
    }
}

export default PurchaseCheckReport;