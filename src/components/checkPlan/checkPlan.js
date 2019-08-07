import React from "react";
import {Button, Icon, message, Select, Tabs} from "antd";
import axios from "axios";
import Blockquote from "../BlockQuote/blockquote";
import DepTree from "./depTree";
import RightTable from "./rightTable"
import "./checkPlan.css"
import "../equipmentArchiveManager/equipmentArchiveManager.css"
import Add from "./add";
import SearchCell from "./searchCell";
import home from "../commom/fns";

class CheckPlan extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            rightTopData: [],
            rightTableData: [],
            deptCode: -1,
            deviceName: '',
            pagination: {
                showTotal(total) {
                    return `共${total}条记录`
                },
                showSizeChanger: true
            },
            pageChangeFlag: 0,   //0表示分页 1 表示查询
            searchContent: '',
            Tableflag: '',
            parentname: '',
            updatebackground:[],
            topNumber:'',
            flag:true,
            flags:[1],
            bottomheight:true,
        }


        this.renderEquipmentName = this.renderEquipmentName.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.handleSelect=this.handleSelect.bind(this)
        this.returnEquKey=this.returnEquKey.bind(this)
        this.firstname=this.firstname.bind(this)
        this.handleClick=this.handleClick.bind(this)
    }
    handleClick=()=>{
        this.setState({
            flag:!this.state.flag,
            bottomheight:!this.state.bottomheight,
        })
    }

    renderEquipmentName = (data) =>  {
        console.log("data",data);
        var first=data.slice(0,7);
        console.log(this.state.updatebackground)
        console.log(this.state.flags)
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

    handleSelect = (code, data) => data.map((item) => {
        if (item.code === code) {
            item.isSelect = true;
            this.setState({
                parentname:item.parentname,
                deptCode:code
            })
            console.log(this.state.parentname)
        } else {
            item.isSelect = false;
        }
        //Tip: Must have, when a node is editable, and you click a button to make other node editable, the node which you don't save yet will be not editable, and its value should be defaultValue
        // item.isSelect = false;
        if (item.children) {
            this.handleSelect(code, item.children)
        }
    });
    getRightData = (code, deviceName) => {

        code = parseInt(code)
        console.log(code)
        this.setState({
            deptCode:code
        })
        axios({
            url: `${this.url.SpotcheckPlan.getDeviceCount}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params:{
                deptId:code
            }
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
                    deptCode: code,
                 updatebackground:updatebackground,
                }, () => {
                    const rightTopData = this.state.rightTopData;
                    var deviceFlag = true;
                    rightTopData.map((item) => {
                        if (item.name === deviceName) {
                            deviceFlag = false
                        }
                        return rightTopData;
                    })
                    if (deviceFlag) {
                        this.getTableData({
                            deptId: parseInt(code),
                            deviceName: rightTopData[0] ? rightTopData[0].name : null
                        }, 0);
                        this.setState({
                            deviceName: rightTopData[0].name
                        })
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
        console.log(this.state.deviceName)
        if (flag) {
            var {pagination} = this.state;
            pagination.current = 1;
            pagination.total = 0;
            this.setState({
                pageChangeFlag: 0,
                searchContent: '',
                pagination:pagination
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
            url: `${this.url.SpotcheckPlan.page}`,
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
                    var arr = res.list[i].deviceSpotcheckPlans;
                    console.log('11111')
                    rightTableData.push({
                        index:i+1,
                        code:arr['code'],
                        modelCode:arr['modelCode'],
                        fixedassetsCode:arr['fixedassetsCode'],
                        deviceName:arr['deviceName'],
                        deptCode:arr['deptCode'],
                        effFlag:arr['effFlag'],
                        detailNum:res.list[i].detailNum
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
                    deviceName: '',
                    pagination:pagination
                });
            }
        }).catch(() => {
            message.info('查询失败，请刷新下页面！')
        });
    }
    handleChange = (value) => {
        this.setState({
            Tableflag: value
        })
        const params = {
            deptId: parseInt(this.state.deptCode),
            deviceName: this.state.deviceName,
            status:value,
        }
        this.getTableData(params, 0)
    }
    searchEvent = () => {
        console.log('调用查询借口并')
        this.setState({
            pageChangeFlag:1
        });
        this.getTableData({
            condition:this.state.searchContent,
            deptId:this.state.deptCode,
            deviceName:this.state.deviceName,
        })
    }
    searchContentChange = (e) => {
        const value = e.target.value;
        this.setState({
            searchContent: value
        })
        console.log(this.state.searchContent)
    }


    returnEquKey=(key,name)=>{
        const params = {
            deptId: parseInt(this.state.deptCode),
            deviceName: name
        }
        this.setState({
            deviceName:name
        })
        this.getTableData(params, 0)
        console.log("props",this.state.updatebackground)
        this.setState({flags:this.state.updatebackground},()=>{
            var flagx=this.state.flags;
            const index=flagx.indexOf(1);
            flagx[index]=0;
            flagx[parseInt(key)]=1;
            this.setState({flags:flagx})
        })
    }
    handleTableChange = (pagination) => {
        this.setState({
            pagination:pagination
        });
        const {pageChangeFlag} = this.state;
        /**分页查询 */
        if(pageChangeFlag){
            this.getTableData({
                deptId:this.state.deptCode,
                deviceName:this.state.deviceName,
                status:this.state.Tableflag,
                size:pagination.pageSize,
                page:pagination.current,
                condition:this.state.searchContent
            })
        }else{
            this.getTableData({
                deptId:this.state.deptCode,
                deviceName:this.state.deviceName,
                status:this.state.Tableflag,
                size:pagination.pageSize,
                page:pagination.current,
            })
        }
    };
    firstname=(e)=>{
        this.setState({
            parentname:e
        })
    }
    /**返回数据录入页面 */
    returnDataEntry = () => {
        this.props.history.push({pathname:'/equipmentCheck'});
    }
render(){
    this.url = JSON.parse(localStorage.getItem('url'));
    const current = JSON.parse(localStorage.getItem('equipmentCheck')) ;
    const operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.menuName===current.menuParent)[0].menuList:null;
    this.operation = operation.filter(e=>e.path === current.path)[0].operations;
    const { Option } = Select;
    return (<div>
            <Blockquote menu={current.menuParent} name="点检计划"  menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}/>
            <div className="checkP-DE-demo" >
                <div className="checkP-DE-left" >
                    <div  className="checkP-eqblocka">
                        设备名称(请选择）
                    </div>
                    <DepTree
                        getRightData={this.getRightData}
                        url={this.url}
                        operation={this.operation}
                        handleSelect={this.handleSelect}
                        firstname={this.firstname}

                    />
                </div>
                <div className="checkP-DE-right">
                    <div style={{paddingBottom:10}}>
                        {this.renderEquipmentName(this.state.rightTopData)}
                    </div>
                    <div>
                        <div className="checkP_buttons">
                            <div className="checkp-left">
                                <Add deptCode={this.state.deptCode} deviceName={this.state.deviceName}  url={this.url}  departName={this.state.parentname} pagination={this.state.pagination}
                                fetch={this.getTableData}/>
                            </div>
                            <div className="check_right">
                                <Select defaultValue="全部状态" style={{ width:120}} onChange={this.handleChange} >
                                    <Option value='-1'>全部状态</Option>
                                    <Option value='0'>开</Option>
                                    <Option value='1'>关</Option>
                                </Select>&nbsp;&nbsp;&nbsp;&nbsp;
                                <SearchCell
                                    name='计划编号/设备编号...'
                                    flag={home.judgeOperation(this.operation, 'QUERY')}
                                    searchEvent={this.searchEvent}
                                    searchContentChange={this.searchContentChange}
                                    fetch={this.getTableData}
                                    deptId={this.state.deptCode}
                                    deviceName={this.state.deviceName}


                                />
                            </div>
                        </div>
                        <RightTable
                            dataSource={this.state.rightTableData}
                            operation={this.operation}
                            pagination={this.state.pagination}
                            getTableData={this.getTableData}
                            deptCode={this.state.deptCode} deviceName={this.state.deviceName}  url={this.url} handleTableChange={this.handleTableChange}/>
                    </div>
                </div>
            </div>

        </div>
    )
}

}

export default CheckPlan