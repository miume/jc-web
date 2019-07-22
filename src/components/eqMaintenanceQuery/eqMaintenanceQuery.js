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
            rightTableData:[],
            depCode:'2',
        }
        this.returnDataEntry = this.returnDataEntry.bind(this)
        this.returnEquKey = this.returnEquKey.bind(this)
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

                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane key={2} tab="已接单">
                        <AcceptOrders

                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane key={3} tab="已完成">
                        <Completed
                            getTableData={this.getTableData}
                            rightTableData={this.state.rightTableData}
                            depCode={this.state.depCode}
                        />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        )
    }
    getTableData = (params) => {
        this.setState({depCode:params.deptId})
        /**flag为1时，清空搜索框的内容 以及将分页搜索位置0 */
        // if(flag) {
        //     var {pagination} = this.state;
        //     pagination.current = 1;
        //     pagination.total = 0;
        //     this.setState({
        //         pageChangeFlag:0,
        //         searchContent:'',
        //         pagination:pagination
        //     })
        // }
        axios({
            url: `${this.url.eqmaintenance.recordPage}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params:params,
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
            if (res&&res.list) {
                var rightTableData = [];
                for (var i = 0; i < res.list.length; i++) {
                    var arr = res.list[i];
                    rightTableData.push({
                        code: arr['code'],
                        planCode:arr['planCode'],
                        fixedassetsCode: arr['fixedassetsCode'],
                        deviceName: arr['deviceName'],
                        deptCode:arr['deptCode'],
                        planDate:arr['planDate'],
                        receiveDate:arr['receiveDate'],
                        finishDate:arr['finishDate'],
                        maintPeople:arr['maintPeople'],
                        abnormalcontent:arr['abnormalconten'],
                        editFlag:arr['editFlag'],
                    })
                }
                this.setState({
                    rightTableData: rightTableData,
                    // pagination:pagination,

                });
                console.log(rightTableData)
            } else {
                message.info('查询失败，请刷新下页面！')
                console.log(rightTableData)
            }
        }).catch(() => {
            message.info('查询失败，请刷新下页面！')
        });
    }

    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/EquipmentMaintenance'});
    }
    returnEquKey = key => {
        console.log(key)

    };
}

export default EqMaintenanceQuery