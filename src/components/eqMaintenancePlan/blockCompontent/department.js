import {Card, message} from 'antd';
import React from 'react'

import './style.css'
import DepartmentTree from '../miniCompontent/treeofdepartment'
import axios from "axios";

class DepartmentCard extends React.Component{
    getTableData = (params, flag) => {
        /**flag为1时，清空搜索框的内容 以及将分页搜索位置0 */
        if(flag) {
            var {pagination} = this.state;
            pagination.current = 1;
            pagination.total = 0;
            this.setState({
                pageChangeFlag:0,
                searchContent:'',
                pagination:pagination
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
            //console.log(res)
            if (res&&res.list) {
                var rightTableData = [];
                for (var i = 0; i < res.list.length; i++) {
                    var arr = res.list[i];
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
                    pagination:pagination,
                    deviceName:params.deviceName
                });
            } else {
                this.setState({
                    rightTableData: [],
                    pagination:pagination,
                    deviceName:''
                });
            }
        });
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
            }
        }).catch(() => {
            message.info('查询失败，请联系管理员！')
        });
    };
    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        return(
            <Card  style={{display:'inline',width: "240px",overflowX:'auto', height:'520px'}} className='departmentCard' title={<p id='titledepartment1'><b fontSize="10px" id='titledepartmentselect'>所属部门</b>（请选择）</p>} >
                <DepartmentTree url={this.url} getRightData={this.getRightData} />
            </Card>)
    }
}
export default DepartmentCard
