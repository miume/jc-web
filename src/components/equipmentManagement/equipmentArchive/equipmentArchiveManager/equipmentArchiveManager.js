import React, {Component} from 'react';
import {message} from 'antd';
import DepTree from './depTree/depTree';
import Blockquote from '../../../BlockQuote/blockquote';
import './equipmentArchiveManager.css'
import EARight from './right/eARight'
import axios from "axios";


/**
 * 模块名称：设备管理-设备档案
 * 创建人：方乐
 * 时间：2019-7-2
 */
class EquipmentArchiveManager extends Component {
    componentWillUnmount() {
        this.setState = () => {
            return;
        }
    }

    // 结构化，获取传入的参数
    constructor(props) {
        super(props);
        this.state = {
            rightTopData: [],
            rightTableData: [],
            depCode: -1,
            deviceName: '',
            deptName:'',
            flag:true,
            pageChangeFlag: 0,   //0表示分页 1 表示查询
            searchContent: '',
            updatebackground:[],
            size:10,
            page:1
        };
        this.getRightData = this.getRightData.bind(this);
        this.getTableData = this.getTableData.bind(this)

        this.modifySearchContent = this.modifySearchContent.bind(this)
        this.handleTableChange = this.handleTableChange.bind(this)
        this.searchEvent = this.searchEvent.bind(this)
        this.searchReset = this.searchReset.bind(this)
        this.returnDataEntry = this.returnDataEntry.bind(this)

        this.pagination = {
            showTotal(total) {
                return `共${total}条记录`
            },
            showSizeChanger: true
        }

    }

    // 页面渲染
    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current'));
        this.operation = JSON.parse(localStorage.getItem('menus')) ? JSON.parse(localStorage.getItem('menus')).filter(e => e.path === current.path)[0].operations : null;
        // 页面UI架构
        return (
            <div>
                <Blockquote menu={current.menuParent} name="设备档案管理"  menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}/>
                <div style={{padding: '15px'}} className="eA">
                    {/*左边树结构部分*/}
                    <div className="eA-left">
                        <DepTree
                            tabKey={this.state.tabKey}
                            getRightData={this.getRightData}
                            url={this.url}
                            operation={this.operation}
                            handleResetFlag={this.handleResetFlag}
                        />
                    </div>
                    {/*右边页面部分*/}
                    <div className="eA-right">
                        <EARight
                            url={this.url}
                            operation={this.operation}
                            depCode={this.state.depCode}
                            rightTopData={this.state.rightTopData}
                            rightTableData={this.state.rightTableData}
                            getTableData={this.getTableData}
                            deviceName={this.state.deviceName}
                            getRightData={this.getRightData}
                            handleTableChange={this.handleTableChange}
                            pagination={this.pagination}
                            searchContent={this.state.searchContent}
                            modifySearchContent={this.modifySearchContent}
                            searchEvent={this.searchEvent}
                            searchReset={this.searchReset}
                            updatebackground={this.state.updatebackground}
                            deptName={this.state.deptName}
                            handleFlag={this.handleFlag}
                            flag={this.state.flag}
                        />
                    </div>
                </div>
            </div>
        )
    }
    handleFlag=()=>{
        this.setState({flag:!this.state.flag})
    }
    handleResetFlag=()=>{
        this.setState({flag:true})
    }
    returnDataEntry(){
        this.props.history.push({pathname:'/equipmentArchive'});
    }
    getRightData = (code, deviceName,deptName) => {
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
                var updatebackground=[1];
                for(var i=0;i<rightTopData.length-1;i++){
                    updatebackground.push(0);
                }
                this.setState({
                    rightTopData: rightTopData,
                    depCode: code,
                    deptName:deptName,
                    updatebackground:updatebackground,
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
                            deptName:this.state.deptName,
                            deptId: parseInt(code),
                            deviceName: rightTopData[0] ? rightTopData[0].name : null
                        }, 0);
                    } else {
                        this.getTableData({
                            size: this.state.size,
                            page: this.state.page,
                            deptName:this.state.deptName,
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
    handleTableChange = (pagination) => {
        this.pagination = pagination;
        this.setState({
            size: pagination.size,
            page: pagination.current,
        })

        const {pageChangeFlag} = this.state;
        if (pageChangeFlag) {
            this.getTableData({
                size: pagination.pageSize,
                page: pagination.current,
                condition: this.state.searchContent,
                deptId: parseInt(this.state.depCode),
                deviceName: this.state.deviceName,
                deptName:this.state.deptName,
            })
        } else {
            this.getTableData({
                size: pagination.pageSize,
                page: pagination.current,
                deptId: parseInt(this.state.depCode),
                deviceName: this.state.deviceName,
                deptName:this.state.deptName,
            })
        }
    };



    getTableData = (params, flag) => {
        /**flag为1时，清空搜索框的内容 以及将分页搜索位置0 */
        if (flag) {
            this.setState({
                pageChangeFlag: 0,
                searchContent: ''
            })
        }
        axios({
            url: `${this.url.equipmentArchive.page}`,
            method: 'get',
            headers: {
                'Authorization':this.url.Authorization
            },
            params: params,
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
            if (res && res.list) {
                var rightTableData = [];
                for (var i = 0; i < res.list.length; i++) {
                    var arr = res.list[i].deviceDocumentMain;
                    var eqStatus = res.list[i].basicInfoDeviceStatus
                    rightTableData.push({
                        index: (res.page-1)*res.size + i+1,
                        code: arr['code'],
                        fixedassetsCode: arr['fixedassetsCode'],
                        deviceName: arr['deviceName'],
                        specification: arr['specification'],
                        startdate: arr['startdate'],
                        idCode: arr['idCode'],
                        statusCode: arr['statusCode'],
                        color: eqStatus['color'],
                        name: eqStatus['name'],
                        depCode:params.deptId,
                    })
                }
                this.pagination.total = res ? res.total : 0;
                this.setState({
                    rightTableData: rightTableData,
                    deviceName: params.deviceName
                },()=>{
                    message.info('查询成功！')
                });
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

    modifySearchContent = (value) => {
        this.setState({
            searchContent: value
        })
    }

    searchEvent = () => {
        this.setState({
            pageChangeFlag: 1
        })
        this.getTableData({
            condition: this.state.searchContent,
            deptId: parseInt(this.state.depCode),
            deviceName: this.state.deviceName
        });
    }

    // 搜索重置调用
    searchReset = () => {
        this.getTableData({
            deptId: parseInt(this.state.depCode),
            deviceName: this.state.deviceName
        }, 1)
    }
}

export default EquipmentArchiveManager
