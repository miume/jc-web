import React from "react";
import Blockquote from "../BlockQuote/blockquote";
import axios from "axios";
import DepartmentCard from './blockCompontent/department'
import ButtonToDd from './blockCompontent/buttontodo'
import ContentTable from './blockCompontent/contenttable'
import './blockCompontent/style.css'
import {message} from "antd";

class EqMaintenancePlan extends React.Component{
    constructor(props){
        super(props)
        this.state={
            depCode: -1,
        }
        this.pagination = {
            showTotal(total) {
                return `共${total}条记录`
            },
            showSizeChanger: true
        }
        this.returnDataEntry = this.returnDataEntry.bind(this)
    }

    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current')) ;
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;

        return (
            <div>
                <Blockquote menu={current.menuParent} name="保养计划"  menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}/>
                <div style={{padding: '15px' ,display:'flex',margin:'15px'}} >
                    <DepartmentCard
                        style={{display:'inline' ,width:"20%"}}
                        getRightData={this.getRightData}
                        url={this.url}
                    />
                    <div style={{width:"80%",marginLeft:'15px'}}>
                        <ButtonToDd
                            url={this.url}
                        />
                        <ContentTable
                            url={this.url}
                            depCode={this.state.depCode}
                            getTableData={this.getTableData}
                            getRightData={this.getRightData}
                            handleTableChange={this.handleTableChange}
                            pagination={this.pagination}
                        />
                    </div>

                </div>

            </div>
        )
    }
    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/EquipmentMaintenance'});
    }
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
            }else{
                message.info('查询失败，请刷新下页面！')
            }
        }).catch(() => {
            message.info('查询失败，请刷新下页面！')
        });
    };

    handleTableChange = (pagination) => {
        this.pagination = pagination;
        const {pageChangeFlag} = this.state;
        if(pageChangeFlag){
            this.getTableData({
                size:pagination.pageSize,
                page:pagination.current,
                condition:this.state.searchContent,
                deptId: parseInt(this.state.depCode),
                deviceName: this.state.deviceName
            })
        }else{
            this.getTableData({
                size:pagination.pageSize,
                page:pagination.current,
                deptId: parseInt(this.state.depCode),
                deviceName: this.state.deviceName
            })
        }
    };

    getTableData = (params, flag) => {
        /**flag为1时，清空搜索框的内容 以及将分页搜索位置0 */
        if(flag) {
            this.setState({
                pageChangeFlag:0,
                searchContent:''
            })

        }
        axios({
            url: `${this.url.equipmentArchive.page}`,
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
                    var arr = res.list[i].deviceDocumentMain;
                    var eqStatus = res.list[i].basicInfoDeviceStatus
                    rightTableData.push({
                        index: i + 1,
                        code: arr['code'],
                        fixedassetsCode: arr['fixedassetsCode'],
                        deviceName: arr['deviceName'],
                        specification: arr['specification'],
                        startdate: arr['startdate'],
                        idCode: arr['idCode'],
                        statusCode: arr['statusCode'],
                        color:eqStatus['color'],
                        name:eqStatus['name']
                    })
                }
                this.pagination.total = res?res.total:0;
                this.setState({
                    rightTableData: rightTableData,
                    deviceName:params.deviceName
                });
            } else {
                message.info('查询失败，请刷新下页面！')
                this.setState({
                    rightTableData: [],
                    deviceName:''
                });
            }
        }).catch(() => {
            message.info('查询失败，请刷新下页面！')
        });
    }

    modifySearchContent = (value) => {
        console.log(value)
        this.setState({
            searchContent:value
        })
    }

    searchEvent = () => {
        this.setState({
            pageChangeFlag:1
        })
        this.getTableData({
            condition:this.state.searchContent,
            deptId: parseInt(this.state.depCode),
            deviceName: this.state.deviceName
        });
    }

    // 搜索重置调用
    searchReset = () => {
        this.getTableData({
            deptId: parseInt(this.state.depCode),
            deviceName: this.state.deviceName
        },1)
    }
}

export default EqMaintenancePlan