import React from 'react';
import BlockQuote from '../BlockQuote/blockquote';
import {Tabs} from 'antd';
import Pack from './pack';
import Check from './check';
import Release from './release';
import './purchaseCheckReport.css';
import home from "../fns";
import OperationTable from "../operationManagement/operationTable";


class PurchaseCheckReport extends React.Component {
    url;
    operation;
    componentWillUnmount() {
        this.setState = () => {
            return ;
        }
    }
    constructor(props){
        super(props);
        this.state={
            tabFlag: ''
        }
        this.returnDataEntry = this.returnDataEntry.bind(this);
        this.modifyTabFlag = this.modifyTabFlag.bind(this);
    }
    render() {
        const TabPane = Tabs.TabPane;
        const current = JSON.parse(localStorage.getItem('current')) ;
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operationList:null;
        const status = JSON.parse(localStorage.getItem('status')) ;
        this.url = JSON.parse(localStorage.getItem('url'));
        const menuList = JSON.parse(localStorage.getItem('menuList')) ;
        return(
            <div>
                <BlockQuote name="进货检验" menu={current.menuParent} menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}></BlockQuote>
                <Tabs defaultActiveKey="1"  onChange={this.callback}  style={{paddingLeft:'15px',paddingRight:'15px'}}>
                    <TabPane tab={<span className="purchaseReportTab"><i className="fa fa-cube" aria-hidden="true"></i> &nbsp;生成</span>} key="1" >
                        <Pack
                            tabFlag={this.state.tabFlag}
                            modifyTabFlag={this.modifyTabFlag}
                            url={this.url}
                            status={status}
                            menuList={menuList}
                            judgeOperation = {home.judgeOperation}
                            operation = {this.operation}
                        />
                    </TabPane>
                    <TabPane tab={<span className="purchaseReportTab"><i className="fa fa-certificate" aria-hidden="true"></i> &nbsp;审核</span>} key="2" >
                        <Check
                            tabFlag={this.state.tabFlag}
                            modifyTabFlag={this.modifyTabFlag}
                            menuList={menuList}
                            url={this.url}
                            status={status}
                            judgeOperation = {home.judgeOperation}
                            operation = {this.operation}
                        />
                    </TabPane>
                    <TabPane tab={<span className="purchaseReportTab"><i className="fa fa-bullhorn" aria-hidden="true"></i> &nbsp;发布</span>} key="3" >
                        <Release
                            tabFlag={this.state.tabFlag}
                            modifyTabFlag={this.modifyTabFlag}
                            menuList={menuList}
                            url={this.url}
                            status={status}
                            judgeOperation = {home.judgeOperation}
                            operation = {this.operation}
                        />
                    </TabPane>
                </Tabs>
            </div>
        )
    };
    callback= (key) => {
        switch (key) {
            case '1':
                this.setState({
                    tabFlag: 1,
                });
                break;
            case '2':
                this.setState({
                    tabFlag: 2,
                })
                break;
            case '3':
                this.setState({
                    tabFlag: 3,
                })
                break;
            default:break;

        }
    }
    modifyTabFlag = () => {
        this.setState({
            tabFlag: '',
        })
    }
    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/dataEntry'});
    }
}

export default PurchaseCheckReport;