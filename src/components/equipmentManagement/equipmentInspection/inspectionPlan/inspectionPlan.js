import React from "react";
import Blockquote from "../../../BlockQuote/blockquote";
import {Tabs} from "antd";
import axios from "axios";
import InspectionRight from "./inspectionRight";

const TabPane=Tabs.TabPane;

class InspectionPlan extends React.Component{
    url
    operation
    constructor(props){
        super(props);
        this.state = {
            status: 1,
            loading: true,
            rightTableData: [],
            deviceName: '',
            checkPlan: '',
            ordered: '',
            finished: ''
        };
        this.tabsChange = this.tabsChange.bind(this);
        this.returnDataEntry = this.returnDataEntry.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.dataProcessing = this.dataProcessing.bind(this);
    }

    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current')) ;
        return (
            <div>
                <Blockquote menu={current.menuParent} name="巡检计划"  menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}/>
                <Tabs defaultActiveKey='1' onChange={this.tabsChange}>
                    {/*tab是选项卡头显示文字,key是对应activeKey，activeKey是当前激活 tab 面板的 key */}
                    <TabPane tab={'待巡检'} key='1'>
                        <InspectionRight status={1} loading={this.state.loading} getTableData={this.getTableData} deviceName={this.state.deviceName}
                                         url={this.url} rightTableData={this.state.rightTableData} deptCode={this.state.checkPlan}/>
                    </TabPane>
                    <TabPane tab={'已接单'} key='2'>
                        <InspectionRight status={2} loading={this.state.loading} getTableData={this.getTableData}
                                         url={this.url} rightTableData={this.state.rightTableData} deptCode={this.state.ordered}/>
                    </TabPane>
                    <TabPane tab={'已完成'} key='3'>
                        <InspectionRight status={3} loading={this.state.loading} getTableData={this.getTableData}
                                         url={this.url} rightTableData={this.state.rightTableData} deptCode={this.state.finished}/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }

    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/equipmentInspection'});
    }

    /**切换tabs*/
    tabsChange(key) {
        let {checkPlan,ordered,finished} = this.state, deptId = '';
        key = parseInt(key);
        if(key === 1) {
            deptId = checkPlan;
        } else if (key === 2) {
            deptId = ordered;
        } else {
            deptId = finished;
        }
        this.setState({
            status: key
        });
        let params = {
            status: key,
            deptId: deptId
        }
        if(params.deptId) {
            this.getTableData(params);
        }
    }

    /**根据车间，和status获取右边表格数据*/
    getTableData(params = {}) {
        this.dataProcessing(params);
        this.setState({
            loading: true
        });
        axios({
            url:`${this.url.devicePatrolPlan.page}`,
            method:"get",
            headers:{
                'Authorization': this.url.Authorization
            },
            params: params,
        }).then((data)=>{
            let res = data.data.data;
            if(res&&res.list){
                res.list['total'] = res.total;
                for(let i = 1; i <= res.list.length; i++){
                    res.list[i-1]['index']=(res.page-1)*10+i;
                }
                this.setState({
                    rightTableData:res.list
                })
            }
            this.setState({
                loading: false
            })
        })
    }

    /**保存待巡检、已接单、已完成界面的车间id*/
    dataProcessing(params) {
        let {status, deptId} = params;
        if(status === 1) {
            this.setState({
                checkPlan: deptId
            });
            if(params.depName) {
                this.setState({
                    deviceName: params.depName
                })
            }
        } else if (status === 2) {
            this.setState({
                ordered: deptId
            })
        } else if (status === 3) {
            this.setState({
                finished: deptId
            })
        }
    }

    /**注销组件*/
    componentWillUnmount() {
        this.setState = () => {
            return;
        }
    }
}

export default InspectionPlan
