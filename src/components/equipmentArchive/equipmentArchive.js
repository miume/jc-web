import React, {Component} from 'react';
import {Divider, message} from 'antd';
import DepTree from './depTree/depTree';
import Blockquote from '../BlockQuote/blockquote';
import './equipmentArchive.css'
import EARight from './right/eARight'
import axios from "axios";


/**
 * 模块名称：设备管理-设备档案
 * 创建人：方乐
 * 时间：2019-7-2
 */
class EquipmentArchive extends Component {
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
            pagination: {
                showTotal(total) {
                    return `共${total}条记录`
                },
                showSizeChanger: true
            },
            pageChangeFlag: 0,   //0表示分页 1 表示查询
        };
        this.getRightData = this.getRightData.bind(this);
        this.getTableData = this.getTableData.bind(this)
        // this.handleTableChange = this.handleTableChange.bind(this)

    }

    // 页面渲染
    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current'));
        this.operation = JSON.parse(localStorage.getItem('menus')) ? JSON.parse(localStorage.getItem('menus')).filter(e => e.path === current.path)[0].operations : null;
        // 页面UI架构
        return (
            <div>
                <Blockquote menu={current.menuParent} name={current.menuName}/>
                <div style={{padding: '15px'}} className="eA">
                    {/*左边树结构部分*/}
                    <div className="eA-left">
                        <DepTree
                            tabKey={this.state.tabKey}
                            getRightData={this.getRightData}
                            url={this.url}
                            operation={this.operation}
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

                            // handleTableChange={this.handleTableChange}
                            // pagination={this.state.pagination}
                        />
                    </div>
                </div>
            </div>
        )
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


    // handleTableChange = (pagination) => {
    //     this.setState({
    //         pagination: pagination
    //     });
    //     const {pageChangeFlag} = this.state;
    //     /**分页查询 */
    //     if (pageChangeFlag) {
    //         this.fetch({
    //             pageSize: pagination.pageSize,
    //             pageNumber: pagination.current,
    //             factory: this.state.searchContent
    //         })
    //     } else {
    //         this.fetch({
    //             pageSize: pagination.pageSize,
    //             pageNumber: pagination.current,
    //         })
    //     }
    // };

    getTableData = (params, flag) => {
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
                this.setState({
                    rightTableData: rightTableData,
                    // pagination:pagination,
                    deviceName:params.deviceName
                });
            } else {
                message.info('查询失败，请刷新下页面！')
                this.setState({
                    rightTableData: [],
                    // pagination:pagination,
                    deviceName:''
                });
            }
        }).catch(() => {
            message.info('查询失败，请刷新下页面！')
        });
    }
}

export default EquipmentArchive