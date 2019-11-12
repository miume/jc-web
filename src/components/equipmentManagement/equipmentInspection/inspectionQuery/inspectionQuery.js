import React from "react";
import Blockquote from "../../../BlockQuote/blockquote";
import {Tabs} from "antd";
import axios from "axios";
import "./inspectionQuery.css";
import InspectionRight from './inspectionRight';

class InspectionQuery extends React.Component{
    url;
    constructor(props){
        super(props)
        this.state = {
            status: 1,
            rightTableData: [],
            deptId1: '',
            deptId2: '',
            deptId3: '',
            loading:true,
        };

        this.saveParams = this.saveParams.bind(this);
        this.returnEquKey = this.returnEquKey.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.returnDataEntry = this.returnDataEntry.bind(this);
    }

    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current')) ;
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
        let {loading,rightTableData} = this.state;
        return (
            <div>
                <Blockquote menu={current.menuParent} name="巡检查询"  menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}/>
                    <Tabs onChange={this.returnEquKey} >
                        <Tabs.TabPane key={1} tab={(<b>待巡检</b>)}>
                            <InspectionRight getTableData={this.getTableData} url={this.url} status={1} loading={loading} rightTableData={rightTableData}/>
                        </Tabs.TabPane>
                        <Tabs.TabPane key={2} tab={(<b>已接单</b>)}>
                            <InspectionRight getTableData={this.getTableData} url={this.url} status={2} loading={loading} rightTableData={rightTableData}/>
                        </Tabs.TabPane>
                        <Tabs.TabPane key={3} tab={(<b>已完成</b>)}>
                            <InspectionRight getTableData={this.getTableData} url={this.url} status={3} loading={loading} rightTableData={rightTableData}/>
                        </Tabs.TabPane>
                    </Tabs>
            </div>
        )
    }

    /**切换tabs*/
    returnEquKey(key) {
        key = parseInt(key);
        let deptId = '', {deptId1,deptId2,deptId3} = this.state
        if(key === 1) {
            deptId = deptId1;
        } else if(key === 2) {
            deptId = deptId2;
        } else {
            deptId = deptId3;
        }
        this.getTableData({
            status: key,
            deptId: deptId
        });
        this.setState({
            status: key
        })
    };

    /**获取表格数据*/
    getTableData(params) {
        params['status'] = params['status'] ? params['status'] :this.state.status;
        if(!params.deptId) return;
        this.saveParams(params);
        this.setState({
            loading: true
        });

        axios({
            url:this.url.devicePatrolQuery.PatrolQueryPage,
            method: "get",
            header:{
                'Authorization': this.url.Authorization
            },
            params:params,
        }).then((data)=>{
            let result = data.data.data ? data.data.data.list : [];
            if(result) {
                let tableData=[];
                tableData['total'] = data.data &&data.data.total ? data.data.total : 0;
                for(let i=0;i<result.length;i++){
                    let devicePatrolPlanRecordHead=result[i].devicePatrolPlanRecordHead,
                        checkType = devicePatrolPlanRecordHead.checkType;
                    tableData.push({
                        index:i+1,
                        key: devicePatrolPlanRecordHead.code,
                        planName: devicePatrolPlanRecordHead.planName,
                        modalName: result[i].modelName,
                        checkType: checkType ? '电气类' : '机械类',
                        planDate: devicePatrolPlanRecordHead.planTime,
                        receiveTime: devicePatrolPlanRecordHead.receiveTime,
                        completed: devicePatrolPlanRecordHead.finishTime,
                        editFlag: devicePatrolPlanRecordHead.editFlag,
                        patrolPeople: devicePatrolPlanRecordHead.patrolPeople,
                        receivePeople: devicePatrolPlanRecordHead.receivePeople,
                        patrolComment: devicePatrolPlanRecordHead.patrolComment,
                    })
                }
                this.setState({
                    rightTableData: tableData
                })
            }
            this.setState({
                loading: false
            })
        })
    };

    /**保存查询参数*/
    saveParams(params) {
        let {deptId,status} = params;
        if(status === 1) {
            this.setState({
                deptId1: deptId
            })
        } else if(status === 2) {
            this.setState({
                deptId2: deptId
            })
        } else {
            this.setState({
                deptId3: deptId
            })
        }
    }

    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/equipmentInspection'});
    }

    componentWillUnmount() {
        this.setState = () => {
            return ;
        }
    }
}
export default InspectionQuery
