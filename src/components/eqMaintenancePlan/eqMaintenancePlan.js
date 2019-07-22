import React from "react";
import Blockquote from "../BlockQuote/blockquote";
import axios from "axios";
import DepartmentCard from './blockCompontent/department'
import ButtonToDd from './blockCompontent/buttontodo'
import ContentTable from './blockCompontent/contenttable'
import './blockCompontent/style.css'
import {message} from "antd";

class EqMaintenancePlan extends React.Component{
    componentWillUnmount() {
        this.setState = () => {
            return;
        }
    }
    constructor(props){
        super(props)
        this.state={
            deviceMaintenancePlansDetails:[],
            MaintenanceType:[],
            detailNum:'',
            rightTableData: [],

            depCode: 2,
            depName:'铜官制造一、二部-锂电一',

            Device:[],
            pageChangeFlag: 0,   //0表示分页 1 表示查询
            searchContent:'',
            params:{},
            selectContent:-1,
        }
        this.pagination = {
            showTotal(total) {
                return `共${total}条记录`
            },
            showSizeChanger: true
        }
        this.returnDataEntry = this.returnDataEntry.bind(this)
        this.getTableData = this.getTableData.bind(this)
        this.handleTableChange = this.handleTableChange.bind(this)
        this.searchEvent = this.searchEvent.bind(this)
        this.searchReset = this.searchReset.bind(this)
    }

    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current')) ;
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;

        return (
            <div>
                <Blockquote menu={current.menuParent} name="保养计划"  menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}/>
                <div style={{padding: '15px' ,display:'flex',margin:'15px'}} >
                    <DepartmentCard
                        style={{display:'inline' ,width:"20%"}}
                        getTableData={this.getTableData}
                        url={this.url}
                        depCode={this.state.depCode}
                    />
                    <div style={{width:"80%",marginLeft:'15px'}}>
                        <ButtonToDd
                            url={this.url}
                            searchContent={this.state.searchContent}
                            modifySearchContent={this.modifySearchContent}
                            params={this.state.params}
                            depCode={this.state.depCode}
                            depName={this.state.depName}
                            getMaintType={this.getMaintType}
                            getDevice={this.getDevice}
                            //四个更新表格的方法
                            getTableData={this.getTableData}
                            searchEvent={this.searchEvent}
                            searchReset={this.searchReset}
                            selectEvent={this.selectEvent}
                            Device={this.state.Device}
                        />
                        <ContentTable
                            url={this.url}
                            depCode={this.state.depCode}
                            depName={this.state.depName}
                            getTableData={this.getTableData}
                            getMaintType={this.getMaintType}
                            getDevice={this.getDevice}
                            Device={this.state.Device}
                            // handleTableChange={this.handleTableChange}
                            handleDel={this.handleDel}
                            pagination={this.pagination}
                            dataSource={this.state.rightTableData}
                        />
                    </div>
                </div>
            </div>
        )
    }
    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/EquipmentMaintenance'});
    }

    handleTableChange = () => {
        this.getTableData({
                deptId: parseInt(this.state.depCode),
            })
    };
    getMaintType=(params)=>{
        axios({
            url:this.url.eqMaintenanceDataEntry.getAll,
            method: 'get',
            header:{
                'Authorization': this.url.Authorization,
            },
            params:params
        }).then((data)=>{
            const res=data.data.data;
            if(res){
                this.setState({MaintenanceType:res})
                console.log(res)
            }else{
                message.info("未检测到保养计划")
            }
        })
    }
    getDevice=(params)=>{
        axios({
            url:this.url.DeviceMaintenancePlan.getDeviceByDeptCode,
            method: 'get',
            header:{
                'Authorization': this.url.Authorization,
            },
            params:params
        }).then((data)=>{
            const res=data.data.data;
            var DevicetreeData=[];
            if(res){
                for(var i=0;i<res.length;i++)
                {
                    var familiar=res[i].deviceName;
                    if(DevicetreeData.every((value)=>{
                        return value.title !== familiar;
                    })){
                        DevicetreeData.push({
                            title:res[i].deviceName,
                            value:res[i].deviceName,
                            children:[],
                        })
                    }
                }
                for(var i=0;i<DevicetreeData.length;i++)
                {
                    for(var j=0;j<res.length;j++)
                    {
                        if(DevicetreeData[i].value===res[j].deviceName){
                            DevicetreeData[i].children.push({
                                title:res[j].fixedassetsCode,
                                value:res[j].deviceName+'/#'+res[j].fixedassetsCode,
                                children: [],
                            })
                        }
                    }
                }
                this.setState({Device:DevicetreeData})
                console.log(DevicetreeData);
            }else{
                message.info("未检测到设备")
            }
        })
    }

    getTableData = (params,depName) => {
        //console.log(depName)
        this.setState({params:params})
        this.setState({depCode:params.deptId})
        this.setState({depName:depName})
        /**flag为1时，清空搜索框的内容 以及将分页搜索位置0 */
        axios({
            url: `${this.url.DeviceMaintenancePlan.maintenancePlanPage}`,
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
                    var arr = res.list[i].deviceMaintenancePlansHead;
                    this.setState({depCode:arr['deptCode'],});
                    rightTableData.push({
                        code: arr['code'],
                        index:i+1,
                        planName:arr['planName'],
                        fixedassetsCode:arr['fixedassetsCode'],
                        deviceName:arr['deviceName'],
                        deptCode:arr['deptCode'],
                        maintPeriod:arr['maintPeriod'],
                        planDate:arr['planDate'],
                        nextDate:arr['nextDate'],
                        setDate:arr['setDate'],
                        setPeople:arr['setPeople'],
                        editFlag:arr['editFlag'],
                        effFlag:arr['effFlag'],//1代表'已生效'；
                        whetherdelete:res.list[i].detailNum,
                    })
                }
                this.pagination.total = res?res.total:0;
                this.setState({
                    rightTableData: rightTableData,
                });
                console.log(this.state.depCode)
            } else {
                message.info('查询无结果，请联系管理员！');
            }
        });
    }
    selectEvent=(status)=>{
        this.setState({
            selectContent:status,
        },()=>{
            this.getTableData({
                condition:this.state.searchContent,
                statusId:parseInt(status),
                deptId: parseInt(this.state.depCode),
            })
        })
    }

    searchEvent = (value) => {
        console.log(value)
        this.setState({
            searchContent:value,
        },()=>{
            this.getTableData({
                condition:value,
                statusId:parseInt(this.state.selectContent),
                deptId: parseInt(this.state.depCode),
            })
        })
        ;
    }

    // 搜索重置调用
    searchReset = () => {
        this.getTableData({
            deptId: parseInt(this.state.depCode),
        })
    }
}

export default EqMaintenancePlan