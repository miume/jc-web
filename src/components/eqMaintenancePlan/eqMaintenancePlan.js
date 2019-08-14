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
            rightTableData: [],
            MaintenanceType:[],
            deviceName:'',
            Opt_type:'',
            detailNum:'',
            depCode: 2,
            depName:'铜官制造一、二部-锂电一',
            Device:[],
            deviceNameandNum:'',
            //控制搜索
            condition:'',
            searchContent:'',
            params:{},
            selectContent:-1,
            //控制分页
            page:1,
            size:10,
            current:1,
            total:''
        }
        this.pagination = {
            showSizeChanger:true,
            total:this.state.total,
            showTotal(total) {
                return `共${total}条记录`
            },
        }
        this.returnDataEntry = this.returnDataEntry.bind(this)
        this.getTableData = this.getTableData.bind(this)
        this.handleTableChange = this.handleTableChange.bind(this)
        this.SearchEvent = this.SearchEvent.bind(this)
        this.searchReset = this.searchReset.bind(this)
    }

    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current')) ;
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;

        return (
            <div>
                <Blockquote menu={current.menuParent} name="保养计划"  menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}/>
                <div className={'eqMaintenancePlan_blockComponent'} style={{padding: '15px' ,display:'flex',margin:'15px'}} >
                    <DepartmentCard
                        style={{display:'inline-block' ,width:"20%"}}
                        url={this.url}
                        getTableData={this.getTableData}
                        depName={this.state.depName}
                        depCode={this.state.depCode}
                        statusId={this.state.selectContent}
                        condition={this.state.condition}
                        page={this.state.page}
                        size={this.state.size}
                        current={this.state.current}
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
                            MaintenanceType={this.state.MaintenanceType}
                            getDevice={this.getDevice}
                            //四个更新表格的方法
                            getTableData={this.getTableData}
                            SearchEvent={this.SearchEvent}
                            searchReset={this.searchReset}
                            selectEvent={this.selectEvent}
                            Device={this.state.Device}
                            statusId={this.state.selectContent}
                            page={this.state.page}
                            size={this.state.size}
                            current={this.state.current}
                            condition={this.state.condition}
                        />
                        <ContentTable
                            url={this.url}
                            depCode={this.state.depCode}
                            depName={this.state.depName}
                            getTableData={this.getTableData}
                            getMaintType={this.getMaintType}
                            MaintenanceType={this.state.MaintenanceType}
                            getDevice={this.getDevice}
                            Device={this.state.Device}
                            deviceName={this.state.deviceName}
                            Opt_type={this.state.Opt_type}
                            statusId={this.state.selectContent}
                            // handleTableChange={this.handleTableChange}
                            handleDel={this.handleDel}
                            pagination={this.pagination}
                            dataSource={this.state.rightTableData}
                            page={this.state.page}
                            size={this.state.size}
                            current={this.state.current}
                            condition={this.state.condition}
                            getTableSize={this.getTableSize}
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
            params:params,
        }).then((data)=>{
            const res=data.data.data;
            if(res){
                var mainData=[];
                for(var i=0;i<res.length;i++){
                    mainData.push({
                        code:res[i].code,
                        deviceName:res[i].deviceName,
                        maintenanceItems:res[i].maintenanceItems,
                        maintenanceContent:res[i].maintenanceContent,
                        maintenanceFrequency:res[i].maintenanceFrequency,
                        optType:res[i].optType,
                    })
                }
                this.setState({
                    MaintenanceType:mainData,
                })
                //console.log(mainData)
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
                            key:res[i].code,
                            title:res[i].deviceName,
                            value:res[i].deviceName,
                            children:[],
                        })
                    }
                }
                for(var o=0;o<DevicetreeData.length;o++)
                {
                    for(var j=0;j<res.length;j++)
                    {
                        if(DevicetreeData[o].value===res[j].deviceName){
                            DevicetreeData[o].children.push({
                                key:res[j].code,
                                title:res[j].fixedassetsCode,
                                value:res[j].deviceName+'/#'+res[j].fixedassetsCode,
                                children: [],
                            })
                        }
                    }
                }
                this.setState({Device:DevicetreeData})
                //console.log(DevicetreeData);
            }else{
                message.info("未检测到设备")
            }
        })
    }
    getTableSize=(current,size)=>{
        this.setState({
            size:size,
            current:current,
        })
    }
    getTableData = (params) => {
        ////console.log(depName)
        //console.log(params)
        this.setState({
            depCode:params.deptId,
            selectContent:params.statusId,
            page:params.page,
            condition:params.condition,
            params:params,
            size:params.size,
            depName:params.depName,
        },()=>{
            //console.log('this.state.depName',this.state.depName)
            //console.log('params',params)
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
                const status=data.status;
                if(status===200){
                    if (res&&res.list) {
                        var rightTableData = [];
                        for (var i = 0; i < res.list.length; i++) {
                            var arr = res.list[i].deviceMaintenancePlansHead;
                            this.setState({depCode:arr['deptCode'],});
                            rightTableData.push({
                                key:i,
                                index:(res.page-1)*res.size+i+1,
                                code: arr['code'],
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
                                depName:this.state.depName,
                                deviceNameAndNum:arr['deviceName']+'/#'+arr['fixedassetsCode'],
                                MaintenanceType:res.list[i].deviceMaintenanceItems,
                                setPeopleName:res.list[i].setPeopleName
                            })
                        }
                        this.pagination.total = res?res.total:0;
                        this.setState({
                            rightTableData: rightTableData,
                            total:data.data.total,
                        });
                        ////console.log(this.state.depCode)
                    } else {
                        message.info('未查询到结果，请联系管理员！');
                    }
                }
                else{
                    message.info("网络错误，请重试")
                }

            })
        })

        ;
    }
    selectEvent=(status)=>{
        this.setState({
            selectContent:status,
        },()=>{
            this.getTableData({
                condition:this.state.searchContent,
                statusId:parseInt(status),
                deptId: parseInt(this.state.depCode),
                page:this.state.page,
                size:this.state.size,
            })
        })
    }

    SearchEvent = (value) => {
        //console.log(value)
        this.setState({
            searchContent:value,
            deptId:this.state.deptId,
            statusId:this.state.statusId,
            page:this.state.page,
        },()=>{
            this.getTableData({
                condition:value,
                statusId:parseInt(this.state.selectContent),
                deptId: parseInt(this.state.depCode),
                page:parseInt(this.state.page),
                size:this.state.size,
            },this.state.depName)
        })
        ;
    }

    // 搜索重置调用
    searchReset = () => {
        this.setState({searchContent:''})
        this.getTableData({
            deptId: parseInt(this.state.depCode),
            statusId:-1,
            page:1,
            size:this.state.size,
        })
    }
}

export default EqMaintenancePlan