import React from "react";
import Blockquote from "../../../BlockQuote/blockquote";
import axios from "axios";
import {message, Tabs} from "antd";
import Completed from './completed/completed'
import AcceptOrders from './acceptOrders/acceptOrders'
import WillMaintain from './willMaintain/willMaintain'

class EqMaintenanceQuery extends React.Component{
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    constructor(props){
        super(props)
        this.state={
            deptId:'',//新建的状态用来获得所需的查询条件
            depName:'',
            rightTableData:[],
            startDate: '',
            endDate: '',
            deptId2:'',
            deptId3:'',
        };
        this.returnDataEntry = this.returnDataEntry.bind(this);
        this.getTableData=this.getTableData.bind(this);
        this.tabsChange = this.tabsChange.bind(this);
        this.getData = this.getData.bind(this);
        this.getLastMonthTime = this.getLastMonthTime.bind(this);
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        this.current = JSON.parse(localStorage.getItem('dataEntry')) ;

        return (
            <div>
                <Blockquote menu={this.current.menuParent} name="设备查询"  menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}/>
                <Tabs onChange={this.tabsChange} style={{paddingLeft:'15px',paddingRight:'15px'}}>
                    <Tabs.TabPane key={1} tab="待保养">
                        <WillMaintain
                            url={this.url}
                            operation={this.operation}
                            deptId={this.state.deptId}
                            getTableData={this.getTableData}
                            rightTableData={this.state.rightTableData}
                            depName={this.state.depName}
                            loading = {this.state.loading}
                            current={this.current}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane key={2} tab="已接单">
                        <AcceptOrders
                            url={this.url}
                            operation={this.operation}
                            deptId={this.state.deptId2}
                            getTableData={this.getTableData}
                            rightTableData={this.state.rightTableData}
                            depName={this.state.depName}
                            loading = {this.state.loading}
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
                            deptId={this.state.deptId3}
                            loading = {this.state.loading}
                            getLastMonthTime = {this.getLastMonthTime}
                        />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        )
    }
    /**返回数据录入页面 */
    returnDataEntry() {
        this.props.history.push({pathname:'/EquipmentMaintenance'});
    }

    /**用于选择页面，看是待保养还是已接单*/
    tabsChange(key) {
        key = parseInt(key);
        let code,{deptId,deptId2,deptId3} = this.state;
        if(key === 1) {
            code = deptId;
        } else if(key === 2) {
            code = deptId2;
        } else {
            code = deptId3;
        }
        this.setState({
            rightTableData: []
        }, () => {
            this.getTableData({
                deptId:code,
                statusId: key
            })
        })
    };

    /**获取表格数据*/
    getTableData(params) {
        if(params.deptId) {
            if(params.depName) {
                this.setState({
                    depName:params.depName,
                    loading: true})
            } else {
                this.setState({
                    loading: true})
            }
            /**分别保存每一次点击部门的id*/
            if(params.statusId === 1) {
                this.setState({
                    deptId: params.deptId
                })
            } else if (params.statusId === 2) {
                this.setState({
                    deptId2: params.deptId
                })
            } else {
                this.setState({
                    deptId3: params.deptId
                });
                if(params.startDate && params.endDate) {
                    this.setState({
                        startDate: params.startDate,
                        endDate: params.endDate
                    })
                } else {
                    let {startDate, endDate} = this.state;
                    params['startDate'] = startDate;
                    params['endDate'] = endDate;
                }
            }
            this.getData(params);
        }
    }

    /**根据部门deptId、状态编码statusId、开始日期startDate、结束日期endDate、查询条件condition进行分页查询 */
    getData(params) {
        axios({
            url: `${this.url.eqMaintenanceQuery.recordPage}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params: params,
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
            if (res && res.list) {
                let rightTableData = [];
                for (let i = 0; i < res.list.length; i++) {
                    let arr = res.list[i];
                    rightTableData.push({
                        index: i + 1 + (res.page - 1) * res.size,//序号
                        code: arr['code'],//保养单号
                        planCode: arr['planCode'],//所属计划单号
                        fixedassetsCode: arr["fixedassetsCode"],//固定资产编码
                        deviceName: arr['deviceName'] + "/" + arr["fixedassetsCode"],//设备名称
                        deptCode: arr["deptCode"],//所属部门,
                        planDate: arr["planDate"],//计划执行日期
                        receiveDate: arr["receiveDate"],//接单日期
                        finishiDate: arr["finishiDate"],//保养完成日期
                        maintPeople: arr["maintName"],//保养人
                        abnormalcontent: arr["abnormalcontent"],//异常处理备注
                        editFlag: arr["editFlag"],//标记位
                        depName: arr["deptName"],
                    })
                }//新建状态用来获得所需的查询条件
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

    /**获取已完成界面 最近一月，*/
    getLastMonthTime(month) {
        var date=new Date();
        var strYear = date.getFullYear();
        var strDay = date.getDate();
        var strMonth = date.getMonth()+1;
        var NowDate= strYear+"-"+strMonth+"-"+strDay;
        var daysInMonth = [0,31,28,31,30,31,30,31,31,30,31,30,31];
        //一、解决闰年平年的二月份天数   //平年28天、闰年29天//能被4整除且不能被100整除的为闰年,或能被100整除且能被400整除
        if (((strYear % 4) === 0) && ((strYear % 100)!==0) || ((strYear % 400)===0)){
            daysInMonth[2] = 29;
        }
        if(month===1){
            if(strMonth - 1 === 0) //二、解决跨年问题
            {
                strYear -= 1;
                strMonth = 12;
            }
            else
            {
                strMonth -= month;
            }
        }
        else if(month===3){
            if(strMonth - month<= 0) //二、解决跨年问题
            {
                strYear -= 1;
                if(strMonth===1)strMonth=10;
                else if(strMonth===2)strMonth=11;
                else if(strMonth===3)strMonth=12;
            }
            else
            {
                strMonth -= month;
            }
        }
        else if(month===12){
            strYear-=1;
        }
        strDay = Math.min(strDay,daysInMonth[strMonth]);//三、前一个月日期不一定和今天同一号，例如3.31的前一个月日期是2.28；9.30前一个月日期是8.30
        if(strMonth<10)//给个位数的月、日补零
        {
            strMonth="0"+strMonth;
        }
        if(strDay<10)
        {
            strDay="0"+strDay;
        }
        var datastr = strYear+"-"+strMonth+"-"+strDay;
        return {
            startDate: datastr,
            endDate: NowDate
        }
    }
}

export default EqMaintenanceQuery
