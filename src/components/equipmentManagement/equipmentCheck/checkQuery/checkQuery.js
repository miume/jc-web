import React from "react";
import Blockquote from "../../../BlockQuote/blockquote";
import {Button, Icon, message} from "antd";
import CheckTable from "./checktable"
import DepTree from './depTree';
import "./checkQuery.css"
import axios from "axios";

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
            workshop:'',
            updatebackground:[],
            topNumber:'',
            flag:true,
            flags:[1],
            bottomheight:true,
        }
        this.fetch=this.fetch.bind(this)
        this.renderEquipmentName = this.renderEquipmentName.bind(this)
        this.returnEquKey=this.returnEquKey.bind(this)
        this.changeworkshop=this.changeworkshop.bind(this)
        this.firstworkshop=this.firstworkshop.bind(this)
        this.searchContentChange=this.searchContentChange.bind(this)
        this.searchEvent=this.searchEvent.bind(this)
        this.handleClick=this.handleClick.bind(this)
    }

    handleClick=()=>{
        this.setState({
            flag:!this.state.flag,
            bottomheight:!this.state.bottomheight,
        })
    }
    componentDidMount() {
        this.fetch()
    }
    renderEquipmentName = (data) =>  {
        var first=data.slice(0,7);
        return (
            <div >
                <div className="eq-outside">
                    <div className={'buttonofdrop'}>
                        {
                            data.length>7?
                                <Button size={"small" } onClick={this.handleClick}>
                                    {this.state.flag?<Icon type="down" />:<Icon type="up" />}
                                    {this.state.flag?"更多":"收起"}
                                </Button>:''

                        }
                    </div>
                    <div className={'Dropfrist'}>
                        {this.state.flag?
                            <div className="DropNoExpand">
                                {
                                    first.map((data,index)=>{
                                        if(this.state.updatebackground[index]===0){
                                            return (
                                                <span
                                                    className="DropExpandblue"
                                                    key={index}
                                                    onClick={this.returnEquKey.bind(this,`${index}`,`${data.name}`,`${data.count}`)}>{`${data.name}(${data.count})`}</span>
                                            )
                                        }
                                        else {
                                            return (
                                                <span
                                                    className="DropExpandwhite"
                                                    key={index}
                                                    onClick={this.returnEquKey.bind(this,`${index}`,`${data.name}`,`${data.count}`)}>{`${data.name}(${data.count})`}</span>
                                            )
                                        }

                                    } )
                                }
                            </div>:
                            <div className={"DropExpandselected"} >
                                {
                                    data.map((data,index)=>{
                                        if(this.state.updatebackground[index]===0){
                                            return (
                                                <span
                                                    className="DropExpandblue"
                                                    key={index}
                                                    onClick={this.returnEquKey.bind(this,`${index}`,`${data.name}`,`${data.count}`)}>{`${data.name}(${data.count})`}</span>
                                            )
                                        }
                                        else {
                                            return (
                                                <span
                                                    className="DropExpandwhite"
                                                    key={index}
                                                    onClick={this.returnEquKey.bind(this,`${index}`,`${data.name}`,`${data.count}`)}>{`${data.name}(${data.count})`}</span>
                                            )
                                        }
                                    } )
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>)

    }
    //----------------------------------
    searchEvent = () => {
        this.setState({
            pageChangeFlag:1
        });
        this.getTableData({
            condition:this.state.searchContent,
            deptId:parseInt(this.state.depCode),
            deviceName:this.state.deviceName,
        })
    }
    searchContentChange = (e) => {
        const value = e.target.value;
        this.setState({
            searchContent: value
        })
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
                var updatebackground=[1];
                for(var i=0;i<rightTopData.length-1;i++){
                    updatebackground.push(0);
                }
                this.setState({
                    rightTopData: rightTopData,
                    depCode: code,
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
                'Authorization': this.url.Authorization
            },
            params: params,
        }).then((data) => {
            const res = data.data.data ? data.data.data : [],{pagination} = this.state;
            pagination.total = res.total || 0;
            if (res && res.list) {
                var rightTableData = [];
                for (var i = 0; i < res.list.length; i++) {
                    var arr = res.list[i].deviceDocumentMain;
                    var eqStatus = res.list[i].basicInfoDeviceStatus
                    rightTableData.push({
                        index: (res.page-1)*10+i+1,
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
                this.setState({
                    rightTableData: rightTableData,
                    deviceName: params.deviceName,
                    pagination
                });
            } else {
                message.info('查询失败，请刷新下页面！')
                this.setState({
                    rightTableData: [],
                    deviceName: '',
                    pagination
                });
            }
        }).catch(() => {
            message.info('查询失败，请刷新下页面！')
        });
    }
    fetch = () => {

            }
            //---------------------------------
    returnEquKey=(key,name)=>{
        const params = {
            deptId: parseInt(this.state.depCode),
            deviceName: name
        }
        this.getTableData(params, 0)
        this.setState({flags:this.state.updatebackground},()=>{
            var flagx=this.state.flags;
            const index=flagx.indexOf(1);
            flagx[index]=0;
            flagx[parseInt(key)]=1;
            this.setState({flags:flagx})
        })
    }

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
    handleTableChange = (pagination) => {
        this.setState({
            pagination:pagination
        });
        this.getTableData({
            deptId:this.state.depCode,
            deviceName:this.state.deviceName,
            status:this.state.Tableflag,
            size:pagination.pageSize,
            page:pagination.current,
            condition:this.state.searchContent
        })
    };
    /**返回数据录入页面 */
    returnDataEntry = () => {
        this.props.history.push({pathname:'/equipmentCheck'});
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('dataEntry')) ;
        const operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.menuName===current.menuParent)[0].menuList:null;
        this.operation=operation.filter(e=>e.path===current.path)[0].operations

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
                            <div >
                                {this.renderEquipmentName(this.state.rightTopData)}
                            </div>
                        <CheckTable rightTableData={this.state.rightTableData} operation={this.operation} pagination={this.state.pagination} url={this.url} fetch={this.getTableData}  handleTableChange={this.handleTableChange}
                                    deptId={this.state.depCode}
                                    deviceName={this.state.deviceName}
                                    searchEvent={this.searchEvent} searchContentChange={this.searchContentChange}/>
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
