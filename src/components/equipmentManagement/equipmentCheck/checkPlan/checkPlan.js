import React from "react";
import {Button, Icon, message, Select,Spin} from "antd";
import axios from "axios";
import Blockquote from "../../../BlockQuote/blockquote";
import DepTree from "../../../BlockQuote/department";
import RightTable from "./rightTable"
import Add from "./add";
import SearchCell from "../../../BlockQuote/newSearchSell";
import './checkPlan.css';
import {judgeOperation,getOperations} from '../../../commom/getOperations'
class CheckPlan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            rightTopData: [],
            rightTableData: [],
            deptCode: -1,
            deviceName: '',
            Tableflag: '',
            departName: '',
            updatebackground:[],
            topNumber:'',
            flag:true,
            flags:[1],
            bottomheight:true,
        }
        this.pagination = {
            pageSize: 10,
            current: 1,
            showSizeChanger: true,//是否可以改变 pageSize
            showTotal: (total) => `共${total}条记录`,//显示共几条记录
            pageSizeOptions: ["10","20","50","100"]
        };

        this.renderEquipmentName = this.renderEquipmentName.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.returnEquKey=this.returnEquKey.bind(this)
        this.reset=this.reset.bind(this)
        this.searchEvent=this.searchEvent.bind(this)
        this.handleClick=this.handleClick.bind(this)
    }
    componentWillUnmount() {
        this.setState = () => {
            return;
        }
    }
    componentDidMount() {
        let {openKeys,menuId} = this.current, operations = getOperations(openKeys,menuId);
        this.setState({
            addFlag:judgeOperation(operations,'SAVE'),
            deleteFlag:judgeOperation(operations,'DELETE'),
            updateFlag:judgeOperation(operations,'UPDATE')
        })
    }
    handleClick=()=>{
        this.setState({
            flag:!this.state.flag,
            bottomheight:!this.state.bottomheight,
        })
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

    getRightData = (params) => {
        let code = parseInt(params.deptId), {depName,parentCode} = params
        this.setState({
            deptCode:code,
            deptName: depName,
            parentCode
        })
        axios({
            url: `${this.url.equipmentArchive.device}/${code}`,
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
                var updatebackground=[1], deviceName = rightTopData[0] ? rightTopData[0].name : '';
                for(var i=0;i<rightTopData.length-1;i++){
                    updatebackground.push(0);
                }
                this.setState({
                    deviceName,
                    rightTopData: rightTopData,
                    deptCode: code,
                    updatebackground:updatebackground,
                });
                this.getTableData({
                    deptId: parseInt(code),
                    deviceName
                })
            } else {
                message.info('查询失败，请刷新下页面！')
            }
        }).catch(() => {
            message.info('查询失败，请刷新下页面！')
        });
    };

    getTableData = (params={}, reset) => {
        this.setState({
            loading: true
        });
        let {pageSize, current} = this.pagination, {deptCode, deviceName, condition,status} = this.state;
        params['size'] = pageSize;
        params['page'] = current;
        params['status'] = params['status'] || status;
        params['deptId'] = params['deptId'] || deptCode;
        params['deviceName'] = params['deviceName'] || deviceName;
        params['condition'] = reset ? '' : params['condition'] || condition;
        axios({
            url: `${this.url.SpotcheckPlan.page}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params: params,
        }).then((data) => {
            const res = data.data.data ? data.data.data : [], {pagination} = this.state;
            this.pagination.total = res.total ? res.total : 0;
            if (res && res.list) {
                var rightTableData = [];
                for (var i = 0; i < res.list.length; i++) {
                    var arr = res.list[i].deviceSpotcheckPlans;
                    rightTableData.push({
                        index:(res.page-1)*10+i+1,
                        code:arr['code'],
                        modelCode:arr['modelCode'],
                        fixedassetsCode:arr['fixedassetsCode'],
                        deviceName:arr['deviceName'],
                        deptCode:arr['deptCode'],
                        effFlag:arr['effFlag'],
                        detailNum:res.list[i].detailNum
                    })
                }
                this.setState({
                    rightTableData: rightTableData,
                    loading: false
                });
            } else {
                message.info('查询失败，请刷新下页面！')
                this.setState({
                    rightTableData: [],
                    loading: false
                });
            }
        }).catch(() => {
            message.info('查询失败，请刷新下页面！')
        });
    }

    handleChange = (value) => {
        this.setState({
            status: value === '' ? undefined : value
        }, () => {
            this.getTableData(params, 0)
        })
        let params = {
            status:value,
        }
        
    }

    searchEvent(condition){
        this.setState({
            condition
        })
        this.getTableData({
            condition
        })
    }

    returnEquKey=(key,name)=>{
        const params = {
            deviceName: name
        }
        this.setState({
            deviceName:name
        })
        this.getTableData(params)
        this.setState({flags:this.state.updatebackground},()=>{
            var flagx=this.state.flags;
            const index=flagx.indexOf(1);
            flagx[index]=0;
            flagx[parseInt(key)]=1;
            this.setState({flags:flagx})
        })
    }
    handleTableChange = (pagination) => {
        this.pagination = pagination
        this.getTableData()
    };

    reset(){
        this.setState({
            condition: ''
        })
        this.getTableData({},'reset')
    }

    /**返回数据录入页面 */
    returnDataEntry = () => {
        this.props.history.push({pathname:'/equipmentCheck'});
    }

render(){
    this.url = JSON.parse(localStorage.getItem('url'));
    this.current = JSON.parse(localStorage.getItem('dataEntry')) ;
    const { Option } = Select;
    let {addFlag,deleteFlag,parentCode }=this.state
    return (
        <div>
            <Blockquote menu={this.current.menuParent} name="点检计划"  menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}/>
            <div className='equipment'>
                <DepTree
                    key="depTree"
                    treeName={'所属部门'}
                    url={this.url}
                    getTableData={this.getRightData}
                />
                <Spin spinning={this.state.loading} wrapperClassName='equipment-right'>
                    <div style={{paddingBottom:10}}>
                        {this.renderEquipmentName(this.state.rightTopData)}
                    </div>
                    <div>
                        <div className="checkP_buttons">
                            <div className="checkp-left">
                                <Add addFlag={addFlag} deptCode={this.state.deptCode} deviceName={this.state.deviceName}  url={this.url}  
                                     departName={this.state.deptName} parentCode={parentCode}
                                     fetch={this.getTableData}/>
                            </div>
                            <div className="check_right">
                                <Select defaultValue="全部状态" style={{ width:120}} onChange={this.handleChange} >
                                    <Option value=''>全部状态</Option>
                                    <Option value='0'>开</Option>
                                    <Option value='1'>关</Option>
                                </Select>&nbsp;&nbsp;&nbsp;&nbsp;
                                <SearchCell
                                    placeholder='设备编号...'
                                    flag={true}
                                    searchEvent={this.searchEvent}
                                    reset={this.reset}
                                />
                            </div>
                        </div>
                        <RightTable
                            deleteFlag={deleteFlag}
                            dataSource={this.state.rightTableData}
                            operation={this.operation}
                            pagination={this.pagination}
                            getTableData={this.getTableData}
                            deptCode={this.state.deptCode} deviceName={this.state.deviceName}  
                            url={this.url} handleTableChange={this.handleTableChange}/>
                    </div>
                </Spin>
            </div>
        </div>
    )
}

}

export default CheckPlan
