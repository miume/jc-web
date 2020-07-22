import React from "react";
import '../../Home/page.css';
import BlockQuote from '../../BlockQuote/blockquote';
import {message, Tabs} from 'antd';
import WillRepair from "./willRepair/willRepair";
import HaveRepair from "./haveRepair/haveRepair";
import HaveJudge from "./haveJudge/haveJudge";
import IsRepair from "./isRepair/isRepair";
import axios from 'axios';

class equipmentRepair extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            repairStatus: 1,
            secondDeptId:'',
            secondDeptId2:'',
            secondDeptId3:'',
            secondDeptId4:'',
            rightTableData:[],
            loading: true
        };
        this.getData = this.getData.bind(this);
    };

    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current'));
        return(
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent}></BlockQuote>
                <Tabs onChange={this.returnEquKey} style={{paddingLeft:'15px',paddingRight:'15px'}}>
                    <Tabs.TabPane key={1} tab="待维修">
                        <WillRepair
                            url={this.url}
                            getTableData={this.getTableData}
                            loading = {this.state.loading}
                            rightTableData={this.state.rightTableData}
                            secondDeptId={this.state.secondDeptId}
                        />
                    </Tabs.TabPane>

                    <Tabs.TabPane key={2} tab="已接单">
                        <IsRepair
                            url={this.url}
                            getTableData={this.getTableData}
                            loading = {this.state.loading}
                            rightTableData={this.state.rightTableData}
                            secondDeptId={this.state.secondDeptId2}
                        />
                    </Tabs.TabPane>

                    <Tabs.TabPane key={3} tab="待确认">
                        <HaveRepair
                            url={this.url}
                            getTableData={this.getTableData}
                            loading = {this.state.loading}
                            rightTableData={this.state.rightTableData}
                            secondDeptId={this.state.secondDeptId3}
                        />
                    </Tabs.TabPane>

                    <Tabs.TabPane key={4} tab="已完成">
                         <HaveJudge
                             url={this.url}
                             getTableData={this.getTableData}
                             loading = {this.state.loading}
                             rightTableData={this.state.rightTableData}
                             secondDeptId={this.state.secondDeptId4}
                         />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        )
    }

    returnEquKey = key => {
        let code,{secondDeptId,secondDeptId2,secondDeptId3,secondDeptId4} = this.state;
        if(key === "1") {
            code = secondDeptId;
        } else if(key === "2") {
            code = secondDeptId2;
        } else if (key === "3") {
            code = secondDeptId3;
        } else {
            code = secondDeptId4;
        }
        this.setState({
            rightTableData: []
        }, () => {
            this.getTableData({
                secondDeptId: code,
                repairStatus: parseInt(key)
                
            })
        });
    };

    /**获得表格数据*/
    getTableData = (params) => {
        let secondDeptId =  params.deptId ? params.deptId : params.secondDeptId;
        if(secondDeptId) {
            params['secondDeptId'] = params['secondDeptId'] ? params['secondDeptId'] : params.deptId;
            /**分别保存每一次点击部门的id*/
            if(params.repairStatus === 1) {
                this.setState({
                    secondDeptId: secondDeptId
                })
            } else if (params.repairStatus === 2) {
                this.setState({
                    secondDeptId2: secondDeptId
                })
            } else if ((params.repairStatus === 3)){
                this.setState({
                    secondDeptId3: secondDeptId
                });
            } else {
                this.setState({
                    secondDeptId4: secondDeptId
                });
            }
            this.setState({
                loading: true
            });
            this.getData(params);
        }
    };

    getData(params) {
        axios({
            url: `${this.url.equipmentRepair.getPage}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params: params,
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
            if (res && res.list) {
                var rightTableData = [];
                rightTableData['total'] = res.total
                for (var i = 0; i < res.list.length; i++) {
                    var arr = res.list[i];
                    var emergeStatus='';
                    if(arr.deviceRepairApplication['emergeStatus']===1)
                    {
                        emergeStatus='紧急';
                    }
                    else{
                        emergeStatus='一般';
                    }
                    rightTableData.push({
                        index: i + 1 + (res.page - 1) * res.size,//序号
                        code: arr.deviceRepairApplication['code'],//序号ID
                        deptCode:arr.deviceRepairApplication['deptCode'],//所属部门
                        deviceCode:arr.deviceRepairApplication['deviceCode'],//主设备编号
                        deviceName:arr.deviceRepairApplication['deviceName'],//设备名称
                        fixedassetsCode:arr.deviceRepairApplication['fixedassetsCode'],//固定资产编码
                        faultContent:arr.deviceRepairApplication['faultContent'],//故障描述
                        reportTime:arr.deviceRepairApplication['reportTime'],//报修时间
                        reportPeople:arr['reportPeople'],//报修人
                        reportPhone:arr.deviceRepairApplication['reportPhone'],//报修人联系电话
                        receiveTime:arr.deviceRepairApplication['receiveTime'],//接单时间
                        receivePeople:arr['receivePeople'],//接单人
                        receivePhone:arr.deviceRepairApplication['receivePhone'],//接单人联系电话
                        faultReason:arr.deviceRepairApplication['faultReason'],//故障原因
                        finishTime:arr.deviceRepairApplication['finishTime'],//完成时间
                        evaluationResult:arr.deviceRepairApplication['evaluationResult'],//评价结果
                        repairStatus:arr.deviceRepairApplication['repairStatus'],//维修状态
                        emergeStatus:emergeStatus,//紧急程度
                        deptName:arr.deptName
                    })
                }
                this.setState({
                    rightTableData: rightTableData,
                    loading: false
                });
            } else {
                this.setState({
                    rightTableData: [],
                    loading: false
                });
            }
        }).catch(() => {
            message.info('查询失败，请刷新下页面！')
        })
    }
}

export default equipmentRepair
