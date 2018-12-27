import React from 'react';
import BlockQuote from '../BlockQuote/blockquote';
import {Tabs} from 'antd';
import Pack from './pack';
import Check from './check';
import Release from './release';
import './purchaseCheckReport.css';


class PurchaseCheckReport extends React.Component {
    url;
    constructor(props){
        super(props);
        this.returnDataEntry = this.returnDataEntry.bind(this);
    }
    render() {
        const TabPane = Tabs.TabPane;
        const current = JSON.parse(localStorage.getItem('current')) ;
        const status = JSON.parse(localStorage.getItem('status')) ;
        this.url = JSON.parse(localStorage.getItem('url'));
        const menuList = JSON.parse(localStorage.getItem('menuList')) ;
        console.log()
        return(
            <div>
                <BlockQuote name="进货检验" menu={current.menuParent} menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}></BlockQuote>
                <Tabs defaultActiveKey="1"  onChange={this.callback}  style={{paddingLeft:'15px',paddingRight:'15px'}}>
                    <TabPane tab={<span className="purchaseReportTab"><i className="fa fa-cube" aria-hidden="true"></i> &nbsp;生成</span>} key="1" >
                        <Pack
                            url={this.url}
                            status={status}
                            menuList={menuList}
                        />
                    </TabPane>
                    <TabPane tab={<span className="purchaseReportTab"><i className="fa fa-certificate" aria-hidden="true"></i> &nbsp;审核</span>} key="2" >
                        <Check
                            menuList={menuList}
                            url={this.url}
                            status={status}
                        />
                    </TabPane>
                    <TabPane tab={<span className="purchaseReportTab"><i className="fa fa-bullhorn" aria-hidden="true"></i> &nbsp;发布</span>} key="3" >
                        <Release
                            menuList={menuList}
                            url={this.url}
                            status={status}
                        />
                    </TabPane>
                </Tabs>
            </div>
        )
    };
    callback= (key) => {
        // console.log(key);
    }
    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/dataEntry'});
    }
}

export default PurchaseCheckReport;