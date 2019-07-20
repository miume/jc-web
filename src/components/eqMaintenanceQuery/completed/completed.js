import React from "react";
import {message,Tree,Card,Layout} from "antd";
import Right from "./right";
import axios from "axios";
import DepTree from "./depTree";
import Home from "../../Home/home";

class Completed extends React.Component{
    url;
    operation
    componentDidMount() {
        this.fetch({
            pageSize:10,
            pageNumber:1,
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            selectedRowKeys: [],
            editingKey: '',
            searchContent:'',
            searchText: '',
            pagination : {
                showTotal(total) {
                    return `共${total}条记录`
                },
                showSizeChanger:true
            },
            pageChangeFlag : 0,   //0表示分页 1 表示查询
        };
    }
    // onSelect = (selectedKeys, info) => {
    //     console.log('selected', selectedKeys, info);
    // };
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

    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        const {  Sider, Content } = Layout;
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div>
                <Layout>
                    <Sider theme='light'>
                        <Card headStyle={{marginLeft:"30px"}} title="所属部门" width="100">
                            <DepTree url={this.url} getRightData={this.getRightData} />
                        </Card>
                    </Sider>
                    <Content margin-left={600} theme="light">
                        <Right
                            url={this.url}
                            data={this.state.dataSource}
                            pagination={this.state.pagination}
                            fetch={this.fetch}
                            modifyDataSource={this.modifyDataSource}
                            handleTableChange={this.handleTableChange}
                            handleDelete={this.handleDelete}
                            judgeOperation = {Home.judgeOperation}
                            operation = {this.operation}
                        />
                    </Content>
                </Layout>
            </div>

        );
    }

    /**---------------------- */
    /**获取所有数据 getAllByPage */
    handleTableChange = (pagination) => {
        this.setState({
            pagination:pagination
        });
        const {pageChangeFlag} = this.state;
        /**分页查询 */
        if(pageChangeFlag){
            this.fetch({
                size:pagination.pageSize,
                page:pagination.current,
                condition:this.state.searchContent,
                deptId:parseInt(this.state.depCode),
                deviceId:this.props.record.code
                // pageSize:pagination.pageSize,
                // pageNumber:pagination.current,
                // departmentName:this.state.searchContent
            })
        }else{
            this.fetch({
                size:pagination.pageSize,
                page:pagination.current,
                condition:this.state.depCode,
                deptId:parseInt(this.state.code),
                deviceId:this.props.record.code
                // pageSize:pagination.pageSize,
                // pageNumber:pagination.current,
            })
        }
    };


    fetch = (params ,flag) => {
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
            url: ' ' ,
            method: 'get',
            params: params,
        }).then((data) => {
            const res = data.data.data?data.data.data:[];
            if(res&&res.list){
                for(var i = 1; i<=res.list.length; i++){
                    res.list[i-1]['index']=(res.prePage)*10+i;
                }
                const {pagination} = this.state;
                pagination.total=res.total;
                this.setState({
                    dataSource: res.list,
                    pagination:pagination,
                });
            }else{
                this.setState({
                    dataSource: []
                })
            }
        });
    };
}
export default Completed

