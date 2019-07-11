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
    // 结构化，获取传入的参数
    constructor(props) {
        super(props);
        this.state = {
            rightTopData: [],
            rightTableData: [],
            depCode: -1,
            deviceName: ''
        };
        this.getRightData = this.getRightData.bind(this);
        this.getTableData = this.getTableData.bind(this)

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
                    if (deviceName === '') {
                        this.getTableData(code, rightTopData[0] ? rightTopData[0].name : null);
                    } else {
                        this.getTableData(code, deviceName);
                    }
                });
            }
        }).catch(() => {
            message.info('查询失败，请联系管理员！')
        });
    };

    getTableData = (code, name) => {
        code = parseInt(code)
        axios({
            url: `${this.url.equipmentArchive.device}/${code}/${name}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            }
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
            if (res) {
                var rightTableData = [];
                for (var i = 0; i < res.length; i++) {
                    var arr = res[i];
                    rightTableData.push({
                        index: i + 1,
                        code: arr['code'],
                        fixedassetsCode: arr['fixedassetsCode'],
                        deviceName: arr['deviceName'],
                        specification: arr['specification'],
                        startdate: arr['startdate'],
                        idCode: arr['idCode'],
                        statusCode: arr['statusCode']
                    })
                }
                this.setState({
                    rightTableData: rightTableData,
                    deviceName: name
                });
            } else {
                this.setState({
                    rightTableData: [],
                    deviceName: name
                });
            }
        });
    }
}

export default EquipmentArchive