import React from "react";
import Blockquote from "../../../BlockQuote/blockquote";
import {Button, Icon, message,Spin} from "antd";
import CheckTable from "./checktable"
import DepTree from '../../../BlockQuote/department';
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
            deviceNamee:'',
            workshop:'',
            updatebackground:[],
            topNumber:'',
            flag:true,
            flags:[1],
            bottomheight:true,
            loading: false
        }
        this.pagination = {
            pageSize: 10,
            current: 1,
            showSizeChanger: true,//是否可以改变 pageSize
            showTotal: (total) => `共${total}条记录`,//显示共几条记录
            pageSizeOptions: ["10","20","50","100"]
        };
        this.renderEquipmentName = this.renderEquipmentName.bind(this)
        this.returnEquKey=this.returnEquKey.bind(this)
        this.reset=this.reset.bind(this);
        this.searchEvent=this.searchEvent.bind(this)
        this.handleClick=this.handleClick.bind(this)
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
    
    searchEvent = (searchContent) => {
        this.setState({
            condition: searchContent
        })
        this.getTableData({
            condition: searchContent
        })
    }

    getRightData = (params) => {
        let code = parseInt(params.deptId), deptName = params.depName
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
                var updatebackground=[1], deviceName = rightTopData[0] ? rightTopData[0].name : '';
                for(var i=0;i<rightTopData.length-1;i++){
                    updatebackground.push(0);
                }
                this.setState({
                    rightTopData: rightTopData,
                    depCode: code,
                    updatebackground:updatebackground,
                    deptName
                });
                this.getTableData({
                    deptId: parseInt(code),
                    deviceName: deviceName,
                    deptName
                }, 0)
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
        let {pageSize, current} = this.pagination, {depCode, deviceName, condition} = this.state;
        params['size'] = pageSize;
        params['page'] = current;
        params['deptId'] = params['deptId'] || depCode;
        params['deviceName'] = params['deviceName'] || deviceName;
        params['condition'] = reset ? '' : params['condition'] || condition;
        axios({
            url: `${this.url.equipmentArchive.page}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params: params,
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
            this.pagination.total = res.total || 0;
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
                        workshop: params['deptName'] ? params['deptName'] : this.state.deptName,
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
                    loading: false
                });
            } else {
                message.info('查询失败，请刷新下页面！')
                this.setState({
                    rightTableData: [],
                    deviceName: '',
                    loading: false
                });
            }
        }).catch(() => {
            message.info('查询失败，请刷新下页面！')
        });
    }
    
    returnEquKey=(key,name)=>{
        const params = {
            deviceName: name
        }
        this.setState({deviceName: name})
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
        const current = JSON.parse(localStorage.getItem('dataEntry')) ;
        const operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.menuName===current.menuParent)[0].menuList:null;
        this.operation=operation.filter(e=>e.path===current.path)[0].operations

        return (
            <div>
                <Blockquote menu={current.menuParent} name="点检查询"  menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}/>
                <div className='equipment'>
                    <DepTree
                        key="depTree"
                        treeName={'所属部门'}
                        url={this.url}
                        getTableData={this.getRightData}
                    />
                    <Spin spinning={this.state.loading} wrapperClassName='equipment-right'>
                        <div >
                            {this.renderEquipmentName(this.state.rightTopData)}
                        </div>
                        <CheckTable rightTableData={this.state.rightTableData} pagination={this.pagination} url={this.url}
                                    handleTableChange={this.handleTableChange}
                                    deptId={this.state.depCode}
                                    deviceName={this.state.deviceName}
                                    searchEvent={this.searchEvent} reset={this.reset}/>
                    </Spin>
                </div>
            </div>
        )
    }
}

export default CheckQuery
