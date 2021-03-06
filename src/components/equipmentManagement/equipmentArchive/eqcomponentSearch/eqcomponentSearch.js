import React from "react";
import Blockquote from "../../../BlockQuote/blockquote";
import EARight from "./right/eARight";
import axios from "axios";
import {message} from "antd";
import {judgeOperation,getOperations} from '../../../commom/getOperations'
class EqcomponentSearch extends React.Component{
    componentWillUnmount() {
        this.setState = () => {
            return;
        }
    }
    componentDidMount(){
        let {openKeys,menuId} = this.current, operations = getOperations(openKeys,menuId);
        this.setState({
            deleteFlag:judgeOperation(operations,'DELETE'),
            updateFlag:judgeOperation(operations,'UPDATE')
        })
    }
    constructor(props) {
        super(props);
        this.state = {
            rightTableData2: [],
            rightTableData3: [],
            depCode: -1,
            deviceName: '',
            pageChangeFlag: 0,   //0表示分页 1 表示查询
            searchContent: '',
            flag:0
        };
        this.getTableData = this.getTableData.bind(this)
        this.getTableData2 = this.getTableData2.bind(this)
        this.modifySearchContent = this.modifySearchContent.bind(this)
        this.handleTableChange = this.handleTableChange.bind(this)
        this.searchEvent = this.searchEvent.bind(this)
        this.searchReset = this.searchReset.bind(this)
        this.cleardata=this.cleardata.bind(this)
        this.pagination = {
            showTotal(total) {
                return `共${total}条记录`
            },
            showSizeChanger: true
        }
        this.returnDataEntry = this.returnDataEntry.bind(this)
    }

    cleardata=(flag)=>{
        var pagination = this.pagination;
        pagination.current = 1;
        pagination.total = 0;
        this.setState({
            pagination:pagination,
            flag:flag,
            rightTableData3:[],
        })
    }

    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        this.current = JSON.parse(localStorage.getItem('dataEntry')) ;
        let {updateFlag,deleteFlag}=this.state
        return (
            <div>
                <Blockquote menu={this.current.menuParent} name="部件/配件关联查询"  menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}/>
                <div style={{padding: '15px'}}>
                    <div>
                        <EARight
                            updateFlag={updateFlag}
                            deleteFlag={deleteFlag}
                            url={this.url}
                            operation={this.operation}
                            depCode={this.state.depCode}
                            rightTableData={this.state.rightTableData3}
                            getTableData={this.getTableData}
                            getTableData2={this.getTableData2}
                            deviceName={this.state.deviceName}
                            getRightData={this.getRightData}
                            handleTableChange={this.handleTableChange}
                            pagination={this.pagination}
                            searchContent={this.state.searchContent}
                            modifySearchContent={this.modifySearchContent}
                            searchEvent={this.searchEvent}
                            searchReset={this.searchReset}
                            cleardata={this.cleardata}
                            rightTableData2={this.state.rightTableData2}
                        />
                    </div>
                </div>
            </div>
        );
    }
    handleTableChange = (pagination) => {
        this.pagination = pagination;
        if (this.state.flag===1) {
            this.getTableData({
                size: pagination.pageSize,
                page: pagination.current,
                unitName: this.state.searchContent,
                accName: this.state.searchContent,

            })
        } else {
            this.getTableData2({
                size: pagination.pageSize,
                page: pagination.current,
                unitName: this.state.searchContent,
                accName: this.state.searchContent,
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
            url: `${this.url.equipmentArchive.AccName}`,
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
                        name: eqStatus['name']
                    })
                }
                this.pagination.total = res ? res.total : 0;
                this.setState({
                    rightTableData3: rightTableData,
                    deviceName: params.deviceName
                });
            } else {
                message.info('查询失败，请刷新下页面！')
                this.setState({
                    rightTableData3: [],
                    deviceName: ''
                });
            }
        }).catch(() => {
            message.info('查询失败，请刷新下页面！')
        });
    }



    getTableData2 = (params, flag) => {
        /**flag为1时，清空搜索框的内容 以及将分页搜索位置0 */
        if (flag) {
            this.setState({
                pageChangeFlag: 0,
                searchContent: ''
            })
        }
        axios({
            url: `${this.url.equipmentArchive.UnitName}`,
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
                        name: eqStatus['name']
                    })
                }
                this.pagination.total = res ? res.total : 0;
                this.setState({
                    rightTableData2: rightTableData,
                    deviceName: params.deviceName
                });
            } else {
                message.info('查询失败，请刷新下页面！')
                this.setState({
                    rightTableData2: [],
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
        if(this.state.flag===1){
        this.getTableData({
            accName: this.state.searchContent,
        })}
        else{
            this.getTableData2({
                unitName: this.state.searchContent,
            })
        }
    }

    // 搜索重置调用
    searchReset = () => {
    //     this.getTableData({
    //         accName:'',
    //         unitName:'',
    //     }, 1)
        this.setState({
            rightTableData2:[],
            rightTableData3:[],
        })
        this.pagination.total = 0;
     }
    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/equipmentArchive'});
    }

}
export default EqcomponentSearch
