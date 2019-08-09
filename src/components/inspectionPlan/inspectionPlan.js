import React from "react";
import Blockquote from "../BlockQuote/blockquote";
import {Table, Tabs,message,Spin} from "antd";
import CheckPlan from "./tab1/checkPlan";
import Ordered from "./tab2/ordered";
import Finished from './tab3/finished';

const TabPane=Tabs.TabPane;

class InspectionPlan extends React.Component{
    url
    operation
    constructor(props){
        super(props)
        this.returnDataEntry = this.returnDataEntry.bind(this)
    }
    callback=(key)=>{
        console.log(key);
    }
    judgeOperation = (operation,operationCode)=>{
        if(operation===null) return false
        var flag = operation?operation.filter(e=>e.operationCode===operationCode):[];
        return flag.length>0?true:false
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current')) ;
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;

        return (
            <div>
                <Blockquote menu={current.menuParent} name="巡检计划"  menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}/>
                <div style={{padding: '15px'}}>
                    <Tabs defaultActiveKey='1' onChange={()=>this.callback}>
                        {/* //tab是选项卡头显示文字,key是对应activekey，activekey是当前激活 tab 面板的 key */}
                        <TabPane tab={<span><b>待巡检</b></span>} key='1'> 
                            <CheckPlan type={1} flag={this.judgeOperation(this.operation,'QUERY')} check={this.judgeOperation(this.operation,'UPDATE')}/>
                        </TabPane>
                        <TabPane tab={<span><b>已接单</b></span>} key='2'>
                            <Ordered type={2} flag={this.judgeOperation(this.operation,'QUERY')} check={this.judgeOperation(this.operation,'UPDATE')}/>
                        </TabPane>
                        <TabPane tab={<span><b>已完成</b></span>} key='3'>
                            <Finished type={3} flag={this.judgeOperation(this.operation,'QUERY')}/>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/equipmentInspection'});
    }
}

export default InspectionPlan