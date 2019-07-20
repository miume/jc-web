import React from "react";
import {message,Input,Button,Table,Layout,Tree} from "antd";
import './acceptOrders.css'
import Card from "antd/lib/card";
import TheTable from "./Table/theTable";
import axios from "axios";
import SearchCell from "../../BlockQuote/search";
import DepTree from "../willMaintain/depTree/depTree";
import home from "../../commom/fns";

//总的页面样式

class AcceptOrders extends React.Component{
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
    }

    onSelect = (selectedKeys, info) => {console.log('selected', selectedKeys, info)};


    render() {
        const { Header, Sider, Content } = Layout;
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current'));
        this.operation = JSON.parse(localStorage.getItem('menus')) ? JSON.parse(localStorage.getItem('menus')).filter(e => e.path === current.path)[0].operations : null;

        return (
            <div >
                <Layout >
                    <Sider style={{background:"white"}} >
                        <Card title="所属部门">
                            <DepTree
                                url={this.url}
                                getRightData={this.getRightData}
                                tabKey={this.state.tabKey}
                                operation={this.operation}
                            />
                        </Card>
                    </Sider>
                    <Layout >
                        <Header style={{background:"white",lineHeight:2,height:45}}>
                            <div className="ac-putright" >
                                <SearchCell
                                    name='单号/设备名称/编号'
                                    fetch={this.fetch}
                                    searchEvent={this.searchEvent}
                                    searchContentChange={this.searchContentChange}
                                    flag={home.judgeOperation(this.operation, 'QUERY')}/>
                            </div>
                        </Header >
                        <Content>
                            <div style={{background:"white"}}>
                            <TheTable dataSource={this.dataSource}/>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }

    onSelect = (selectedKeys, info) => {console.log('selected', selectedKeys, info)};

    /**实时跟踪搜索框内容的变化 */
    searchContentChange = (e) => {
        const value = e.target.value;
        this.setState({
            searchContent: value
        })
    };
    /**绑定搜索事件 */
    searchEvent = () => {
        this.setState({
            pageChangeFlag: 1
        });
        this.fetch({
            // personName: this.state.searchContent
        });
    }

    fetch=()=>{

    }

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
}

export default AcceptOrders