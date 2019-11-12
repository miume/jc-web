import React from "react";
import {message, Spin} from "antd";
import axios from "axios";
import ButtonToDd from './blockCompontent/buttontodo'
import ContentTable from './blockCompontent/contenttable'
import './blockCompontent/style.css'
import Blockquote from "../../../BlockQuote/blockquote";
import Department from '../../../BlockQuote/department';

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
            depCode: '',
            Device:[],
            deviceNameandNum:'',
            //控制搜索
            condition:'',
            searchContent:'',
            params:{},
            selectContent:-1,
            //控制分页
            // page:1,
            // size:10,
            // current:1,
            loading: true
        };
        this.pagination = {
            showSizeChanger:true,
            showTotal(total) {
                return `共${total}条记录`
            },
        };
        this.returnDataEntry = this.returnDataEntry.bind(this)
        this.getTableData = this.getTableData.bind(this)
        this.SearchEvent = this.SearchEvent.bind(this)
        this.searchReset = this.searchReset.bind(this)
        this.clearMainType = this.clearMainType.bind(this)
        this.modifySearchContent = this.modifySearchContent.bind(this);
    }

    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current')) ;
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;

        return (
            <div>
                <Blockquote menu={current.menuParent} name="保养计划"  menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}/>
                <div className='equipment'>
                    <Department
                        key="depTree"
                        treeName = '部门名称'
                        url={this.url}
                        getTableData={this.getTableData}
                    />
                    <Spin spinning={this.state.loading} wrapperClassName='equipment-right'>
                        <ButtonToDd
                            url={this.url}
                            searchContent={this.state.searchContent}
                            modifySearchContent={this.modifySearchContent}
                            params={this.state.params}
                            depCode={this.state.depCode}
                            deviceName={this.state.deviceName}
                            getMaintType={this.getMaintType}
                            clearMainType={this.clearMainType}
                            MaintenanceType={this.state.MaintenanceType}
                            getDevice={this.getDevice}
                            Device = {this.state.Device}
                            //四个更新表格的方法
                            getTableData={this.getTableData}
                            SearchEvent={this.SearchEvent}
                            searchReset={this.searchReset}
                            selectEvent={this.selectEvent}
                            statusId={this.state.selectContent}
                        />
                        <ContentTable
                            url={this.url}
                            depCode={this.state.depCode}
                            getTableData={this.getTableData}
                            getMaintType={this.getMaintType}
                            MaintenanceType={this.state.MaintenanceType}
                            Device={this.state.Device}
                            deviceName={this.state.deviceName}
                            Opt_type={this.state.Opt_type}
                            statusId={this.state.selectContent}
                            handleDel={this.handleDel}
                            pagination={this.pagination}
                            dataSource={this.state.rightTableData}
                            page={this.state.page}
                            size={this.state.size}
                            current={this.state.current}
                            condition={this.state.condition}
                            getTableSize={this.getTableSize}
                        />
                    </Spin>
                </div>
            </div>
        )
    }
    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/EquipmentMaintenance'});
    }

    clearMainType = () => {
        this.setState({
            MaintenanceType:[],
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
                        index: i + 1,
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
            } else {
                message.info("未检测到保养计划")
            }
        })
    }

     /**获取表格当前请求页数和每页显示数据数量*/
     getTableSize = (current,size)=>{
        this.setState({
            size:size,
            current:current,
        })
    }

    /**获取表格数据*/
    getTableData = (params = {
        deptId:this.state.depCode,
        statusId: this.state.selectContent,
        condition:this.state.searchContent,
        depName:this.state.deviceName,
    }) => {
        this.setState({
            loading: true,
            depCode: params.deptId
        });
        if(params.depName) {
            this.setState({
                deviceName: params.depName
            })
        }
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
                if (res && res.list) {
                    let rightTableData = [];
                    for (let i = 0; i < res.list.length; i++) {
                        let e = res.list[i];
                        let arr = e.deviceMaintenancePlansHead;
                        rightTableData.push({
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
                            MaintenanceType:e.deviceMaintenanceItems,
                            setPeopleName:e.setPeopleName
                        })
                    }
                    this.pagination.total = res?res.total:0;
                    this.setState({
                        rightTableData: rightTableData,
                        loading: false
                    });
                } else {
                    message.info('未查询到结果，请联系管理员！');
                }
            }
            else {
                message.info("网络错误，请重试")
            }
        });
    };

    getDevice = (params) => {
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
            }else{
                message.info("未检测到设备")
            }
        })
    }

    /**监控下拉框变化*/
    selectEvent = (status) => {
        this.setState({
            selectContent:status,
        });
        let {searchContent,depCode} = this.state;
        this.getTableData({
            condition: searchContent,
            statusId: parseInt(status),
            deptId: parseInt(depCode),
            size: this.pagination.pageSize,
            page: this.pagination.current
        })
    };

    /**监控输入框的变化*/
    modifySearchContent(value) {
        this.setState({
            searchContent: value
        });
    }

    /**搜索事件*/
    SearchEvent = (value) => {
        let {selectContent,depCode} = this.state;
        this.getTableData({
            condition:value,
            statusId:parseInt(selectContent),
            deptId: parseInt(depCode),
            size: this.pagination.pageSize,
            page: this.pagination.current
        })
    }

    /**搜索重置调用*/
    searchReset = () => {
        this.setState({
            searchContent:'',
            selectContent: -1
        });
        this.getTableData({
            deptId: parseInt(this.state.depCode),
            statusId:-1,
            page:1,
            size:this.state.size,
        })
    }
}

export default EqMaintenancePlan
