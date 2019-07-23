import React from "react";
import Blockquote from "../BlockQuote/blockquote";
import axios from "axios";
import {message,Tabs} from "antd";
import Completed from './completed/completed'
import AcceptOrders from './acceptOrders/acceptOrders'
import WillMaintain from './willMaintain/willMaintain'


class EqMaintenanceQuery extends React.Component{
    constructor(props){
        super(props)
        this.state={
            depCode:'',//新建的状态用来获得所需的查询条件
            rightTableData:[],
        }
        this.returnDataEntry = this.returnDataEntry.bind(this)
        this.returnEquKey = this.returnEquKey.bind(this)
        this.getTableData=this.getTableData.bind(this)
    }
    getTableData=()=>{

    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current')) ;
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;


        return (
            <div>
                <Blockquote menu={current.menuParent} name="设备查询"  menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}/>
                <Tabs onChange={this.returnEquKey} style={{paddingLeft:'15px',paddingRight:'15px'}}>
                    <Tabs.TabPane key={1} tab="待保养">
                        <WillMaintain
                            rightTableData={this.state.rightTableData}
                            getTableData={this.getTableData}
                            url={this.url}
                            operation={this.operation}
                            depCode={this.state.depCode}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane key={2} tab="已接单">
                        <AcceptOrders
                            rightTableData={this.state.rightTableData}
                            getTableData={this.getTableData}
                            url={this.url}
                            operation={this.operation}
                            depCode={this.state.depCode}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane key={3} tab="已完成">
                        <Completed
                            url={this.url}
                            operation={this.operation}
                            getTableData={this.getTableData}
                            rightTableData={
                                this.state.rightTableData
                            }
                            depCode={this.state.depCode}
                        />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        )
    }
    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/EquipmentMaintenance'});
    }
    /**用于选择页面，看是待保养还是已接单*/
    returnEquKey = key => {
        this.setState({
            rightTableData:[]
        })
    };

    getTableData = (params) => {
        console.log(params)
        this.setState({depCode:params.deptId})//新建状态用来获得所需的查询条件
        axios({
            url: `${this.url.eqMaintenanceQuery.recordPage}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params:params,
        }).then((data) => {
            console.log(data)
            const res = data.data.data ? data.data.data : [];
            console.log(res)
            if (res&&res.list) {
                var rightTableData = [];
                for (var i = 0; i < res.list.length; i++) {
                    var arr = res.list[i]
                    rightTableData.push({
                        code: arr['code'],//保养单号
                        planCode: arr['planCode'],//所属计划单号
                        fixedassetsCode: arr["fixedassetsCode"],//固定资产编码
                        deviceName: arr['deviceName'],//设备名称
                        deptCode:arr["deptCode"],//所属部门
                        planDate:arr["planDate"],//计划执行日期
                        receiveDate:arr["receiveDate"],//接单日期
                        finishiDate:arr["finishiDate"],//保养完成日期
                        maintPeople:arr["maintPeople"],//保养人
                        abnormalcontent:arr["abnormalcontent"],//异常处理备注
                        editFlag:arr["editFlag"],//标记位

                    })

                }
                this.setState({
                    rightTableData: rightTableData,
                });
            } else {
                this.setState({
                    rightTableData: [],
                });
            }
        }).catch(() => {
            message.info('查询失败，请刷新下页面！')
        });
    }
}

export default EqMaintenanceQuery