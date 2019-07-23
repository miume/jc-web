import React from "react";
import Blockquote from "../BlockQuote/blockquote";
import {Col, Row,Tabs} from "antd";
import Eqblock from "../eqMaintenanceDataEntry/eqblock";
import Right from "../eqMaintenanceDataEntry/right";
import CheckTable from "./checktable"
import "./checkQuery.css"
class CheckQuery extends React.Component{
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current')) ;
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
        const { TabPane } = Tabs;
        function callback(key) {
            console.log(key);
        }
        return (
            <div>
                <Blockquote menu={current.menuParent} name="点检查询"  menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}/>
                <div style={{padding: '15px'}} >
                    <div className="equipment-DE-demo" >
                        <div className="equipment-DE-left" >
                            11
                        </div>
                        <div className="equipment-DE-right">
                            <Tabs defaultActiveKey="1" onChange={callback}>
                                <TabPane tab="Tab 1" key="1">
                                    <CheckTable />
                                </TabPane>
                                <TabPane tab="Tab 2" key="2">
                                    Content of Tab Pane 2 s
                                </TabPane>
                                <TabPane tab="Tab 3" key="3">
                                    Content of Tab Pane 3
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
    // 返回还没有
    // returnDataEntry(){
    //     this.props.history.push({pathname:'/EquipmentMaintenance'});
    // }
}

export default CheckQuery