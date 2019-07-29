import React from "react";
import Blockquote from "../BlockQuote/blockquote";
import {Col, message, Row, Tabs} from "antd";
import Eqblock from "../eqMaintenanceDataEntry/eqblock";
import Right from "../eqMaintenanceDataEntry/right";
import CheckTable from "./checktable"
import DepTree from './depTree';
import "./checkQuery.css"
import axios from "axios";
import home from '../commom/fns'
import Check from "../purchaseCheckReport/check";


class CheckQuery extends React.Component{
    constructor(props){
        super(props)
        this.state={
            dataSource:[],
            rightTopData: [],
            rightTableData: [],
            depCode: -1,
            deviceName: '',
            pagination : {
                showTotal(total) {
                    return `共${total}条记录`
                },
                showSizeChanger:true
            },
            pageChangeFlag: 0,   //0表示分页 1 表示查询
            searchContent: '',
            deviceNamee:'',
            workshop:''
        }
        this.fetch=this.fetch.bind(this)
        this.renderEquipmentName = this.renderEquipmentName.bind(this)
        this.returnEquKey=this.returnEquKey.bind(this)
        this.changeworkshop=this.changeworkshop.bind(this)
        this.firstworkshop=this.firstworkshop.bind(this)
    }

    componentDidMount() {
        this.fetch()
    }
    renderEquipmentName = (data) => data.map((item) => {

        return (
            <Tabs.TabPane key={item.name} tab={item.name + '(' + item.count + ')'}>
            </Tabs.TabPane>
        )
    });
    //----------------------------------


    getRightData = (code, deviceName) => {
        code = parseInt(code)
        axios({
            url: `${this.url.equipmentArchive.device}/${code}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
            if (res) {
                var rightTopData = [];
                if (JSON.stringify(res) !== '{}') {
                    for (var key in res) {
                        rightTopData.push({
                            name: key,
                            count: res[key]
                        })
                    }
                } else {
                    rightTopData.push({
                        name: '无设备',
                        count: 0
                    })
                }
                this.setState({
                    rightTopData: rightTopData,
                    depCode: code
                }, () => {
                    const rightTopData = this.state.rightTopData;
                    var deviceFlag = true;
                    rightTopData.map((item) => {
                        if (item.name === deviceName) {
                            deviceFlag = false
                        }
                    })
                    if (deviceFlag) {
                        this.getTableData({
                            deptId: parseInt(code),
                            deviceName: rightTopData[0] ? rightTopData[0].name : null
                        }, 0);
                    } else {
                        this.getTableData({
                            deptId: parseInt(code),
                            deviceName: deviceName
                        }, 0);
                    }
                });
            } else {
                message.info('查询失败，请刷新下页面！')
            }
        }).catch(() => {
            message.info('查询失败，请刷新下页面！')
        });
    };
    getTableData = (params, flag) => {
        /**flag为1时，清空搜索框的内容 以及将分页搜索位置0 */
        console.log(params)
        if (flag) {
            this.setState({
                pageChangeFlag: 0,
                searchContent: ''
            })
            // var {pagination} = this.state;
            // pagination.current = 1;
            // pagination.total = 0;
            // this.setState({
            //     pageChangeFlag:0,
            //     searchContent:'',
            //     pagination:pagination
            // })
        }
        axios({
            url: `${this.url.equipmentArchive.page}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params: params,
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
            console.log(res)
            if (res && res.list) {
                var rightTableData = [];
                for (var i = 0; i < res.list.length; i++) {
                    var arr = res.list[i].deviceDocumentMain;
                    console.log('11111')
                    var eqStatus = res.list[i].basicInfoDeviceStatus
                    rightTableData.push({
                        index: i + 1,
                        code: arr['code'],
                        fixedassetsCode: arr['fixedassetsCode'],
                        deviceName: arr['deviceName'],
                        workshop:this.state.workshop,
                        specification: arr['specification'],
                        startdate: arr['startdate'],
                        idCode: arr['idCode'],
                        statusCode: arr['statusCode'],
                        color: eqStatus['color'],
                        name: eqStatus['name']
                    })
                }
                console.log('2222222')
                console.log(rightTableData)
                this.setState({
                    rightTableData: rightTableData,
                    deviceName: params.deviceName
                });
                console.log('kkkkkkkkkkkk')
                console.log(this.state.rightTableData)
            } else {
                message.info('查询失败，请刷新下页面！')
                this.setState({
                    rightTableData: [],
                    deviceName: ''
                });
            }
        }).catch(() => {
            message.info('查询失败，请刷新下页面！')
        });
    }
    fetch = () => {
        console.log('1111111111111111')
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
        // axios({
        //     url: `${this.url}` ,
        //     method: 'get',
        //     headers:{
        //         'Authorization': this.url.Authorization
        //     },
        //     params: params,
        // }).then((data) => {
        //     const res = data.data.data?data.data.data:[];
        //
        //     if(res&&res.list){
        //         for(var i = 1; i<=res.list.length; i++){
        //             res.list[i-1]['index']=(res.prePage)*10+i;
        //         }
        //         const {pagination} = this.state;
        //         pagination.total=res.total;
        //
        //
        //         // 假数据阶段
        //         // this.setState({
        //         //     dataSource: res.list,
        //         //     pagination:pagination,
        //         // });
        //         this.setState({
        //             dataSource:fakedataSource
        //         })
        //     }else{
        //         //假数据
        //         this.setState({
        //             dataSource:fakedataSource
        //         })
                // this.setState({
                //     dataSource: []
                // })

            }
            //---------------------------------
    returnEquKey = (key) => {
        const params = {
            deptId: parseInt(this.state.depCode),
            deviceName: key,
        }
        this.setState({
            deviceNamee:key
        })
        console.log(params)
        console.log(this.state.deviceNamee)
        this.getTableData(params, 0)
    };

    changeworkshop = (value)=> {
        this.setState({
            workshop:value
        })
    }
    firstworkshop=(e)=>{
        this.setState({
            workshop:e
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('equipmentCheck')) ;
        const operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.menuName===current.menuParent)[0].menuList:null;
        this.operation=operation.filter(e=>e.path===current.path)[0].operations
        const { TabPane } = Tabs;
        function callback(key) {
            console.log(key);
        }

        return (
            <div>
                <Blockquote menu={current.menuParent} name="点检查询"  menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}/>
                    <div className="checkQ-DE-demo" >
                        <div className="checkQ-DE-left" >
                            <div  className="checkQ-eqblocka">
                                设备名称(请选择）
                            </div>
                            <DepTree
                                getRightData={this.getRightData}
                                url={this.url}
                                operation={this.operation}
                                changeworkshop={this.changeworkshop}
                                firstworkshop={this.firstworkshop}
                            />
                        </div>
                        <div className="checkQ-DE-right">
                            <Tabs onChange={this.returnEquKey}>
                                {this.renderEquipmentName(this.state.rightTopData)}
                            </Tabs>
                        <CheckTable rightTableData={this.state.rightTableData} operation={this.operation} pagination={this.state.pagination} url={this.url} fetch={this.getTableData} />
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