import React from "react";
import '../Home/page.css';
import BlockQuote from '../BlockQuote/blockquote';
import SearchCell from '../BlockQuote/search';
import DeleteByIds from '../BlockQuote/deleteByIds';
import {Table, Popconfirm, Divider, message, Select, Tabs} from 'antd';
import WillRepair from "./willRepair/willRepair";
import HaveRepair from "./haveRepair/haveRepair";
import HaveJudge from "./haveJudge/haveJudge";
import IsRepair from "./isRepair/isRepair";
import axios from 'axios';


class equipmentRepair extends React.Component{
    constructor(props){
        super(props);
        this.state={
            repairStatus:'',
            secondDeptId:'',

            rightTableData:[],
            pagination:{
                showTotal(total) {
                    return `共${total}条记录`
                },
                showSizeChanger: true
            }
        }
    };

    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current'));
        const { selectedRowKeys } = this.state;
        const Option = Select.Option;
        return(
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent}></BlockQuote>
                <Tabs onChange={this.returnEquKey} style={{paddingLeft:'15px',paddingRight:'15px'}}>
                    <Tabs.TabPane key={1} tab="待维修">
                        <WillRepair
                            url={this.url}
                            getTableData={this.getTableData}
                            rightTableData={this.state.rightTableData}
                        />
                    </Tabs.TabPane>

                    <Tabs.TabPane key={2} tab="已接单">
                        <IsRepair
                            url={this.url}
                        />
                    </Tabs.TabPane>

                    <Tabs.TabPane key={3} tab="已完成">
                        <HaveRepair
                            url={this.url}
                        />
                    </Tabs.TabPane>

                    <Tabs.TabPane key={4} tab="已评价">
                         <HaveJudge
                             url={this.url}
                         />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        )
    }

    returnEquKey = key => {
        if(key==='1'||key==='2'||key==='3'||key==='4'){
            this.setState({
                rightTableData:[],
            })
        }
    };

    /**获得表格数据*/
    getTableData = (params) => {
        this.setState({secondDeptId:params.secondDeptId,repairStatus:params.repairStatus},()=> {
                axios({
                    url: `http://192.168.1.103:8082/deviceRepair/getPage?`,
                    method: 'get',
                    headers: {
                        'Authorization': this.url.Authorization
                    },
                    params: params,
                }).then((data) => {
                    console.log(data)
                    const res = data.data.data ? data.data.data : [];
                    if (res && res.list) {
                        var rightTableData = [];
                        for (var i = 0; i < res.list.length; i++) {
                            var arr = res.list[i];
                            rightTableData.push({
                                index: i + 1 + (res.page - 1) * res.size,//序号
                                code: arr.deviceRepairApplication['code'],
                                deptCode:arr.deviceRepairApplication['deptCode'],
                                deviceCode:arr.deviceRepairApplication['deviceCode'],
                                deviceName:arr.deviceRepairApplication['deviceName'],
                                fixedassetsCode:arr.deviceRepairApplication['fixedassetsCode'],
                                faultContent:arr.deviceRepairApplication['faultContent'],
                                reportTime:arr.deviceRepairApplication['reportTime'],
                                reportPeople:arr['reportPeople'],
                                reportPhone:arr.deviceRepairApplication['reportPhone'],
                                receiveTime:arr.deviceRepairApplication['receiveTime'],
                                receivePeople:arr['receivePeople'],
                                receivePhone:arr.deviceRepairApplication['receivePhone'],
                                faultReason:arr.deviceRepairApplication['faultReason'],
                                finishTime:arr.deviceRepairApplication['finishTime'],
                                evaluationResult:arr.deviceRepairApplication['evaluationResult'],
                                repairStatus:arr.deviceRepairApplication['repairStatus'],
                            })
                        }//新建状态用来获得所需的查询条件
                        this.setState({
                            rightTableData: rightTableData,
                        });
                    } else {
                        this.setState({
                            rightTableData: [],
                        });
                    }
                    console(rightTableData);
                }).catch(() => {
                    message.info('查询失败，请刷新下页面！')
                })
            }
        )
    }
}

export default equipmentRepair