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
            depCode:'',//新建的状态用来获得所需的查询条件
            depName:'',
            rightTableData:[],
            pagination:{
                showTotal(total) {
                    return `共${total}条记录`
                },
                showSizeChanger: true
            }
        }
        this.returnDataEntry = this.returnDataEntry.bind(this)
        this.returnEquKey = this.returnEquKey.bind(this)
        this.getTableData=this.getTableData.bind(this)
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
                            url={this.url}
                            operation={this.operation}
                            depCode={this.state.depCode}
                            getTableData={this.getTableData}
                            pagination={this.state.pagination}
                            rightTableData={this.state.rightTableData}
                            depName={this.state.depName}
                            loading = {this.state.loading}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane key={2} tab="已接单">
                        <AcceptOrders
                            url={this.url}
                            operation={this.operation}
                            depCode={this.state.depCode}
                            getTableData={this.getTableData}
                            pagination={this.state.pagination}
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
                            depCode={this.state.depCode}
                            loading = {this.state.loading}
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
        if(key==='1'||key==='2'||key==='3'){
            this.getTableData({
                deptId:2,
                statusId:parseInt(key),
                depName:"锂电一",}
        )
        }
    };

    /**获取表格数据*/
    getTableData = (params) => {
        this.setState({depCode:params.deptId,depName:params.depName,loading: true},()=> {
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
                            deptCode: arr["deptCode"],//所属部门
                            planDate: arr["planDate"],//计划执行日期
                            receiveDate: arr["receiveDate"],//接单日期
                            finishiDate: arr["finishiDate"],//保养完成日期
                            maintPeople: arr["maintPeople"],//保养人
                            abnormalcontent: arr["abnormalcontent"],//异常处理备注
                            editFlag: arr["editFlag"],//标记位
                            depName: this.state.depName,
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
        )}
}

export default EqMaintenanceQuery
