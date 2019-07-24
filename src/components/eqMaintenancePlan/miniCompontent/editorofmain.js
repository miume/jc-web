import React from 'react';
import {Modal, Input, InputNumber, DatePicker, TreeSelect, Table, Radio, message} from 'antd';
import moment from 'moment'

import CancleButton from "../../BlockQuote/cancleButton";
import SaveButton from "../../BlockQuote/saveButton";
import '../blockCompontent/style.css'
import axios from "axios";
class EditorofMain extends React.Component{
    url = JSON.parse(localStorage.getItem('url'));
    date1='';
    state = {
        editorVisible:false,
        PlanName1:'',
        depCode:'',
        depName:'',
        deviceName:'',
        fixedassetsCode:'',
        deviceNameAndNum:'',
        MaintenancePeriod:'',
        ImplementDate:'',
        NextPlanDate:'',
        MaintenanceType:[],
        Effective:'',
        whomade:'',
        selectedRowKeys: [],
        MaintenanceDetail:[],
    };
    setS=()=>{
        this.setState({
            deviceNameAndNum:this.props.editorRecord.deviceName+'/#'+this.props.editorRecord.fixedassetsCode,
            depName:this.props.editorRecord.depName,
            PlanName1:this.props.editorRecord.planName,
            whomade:this.props.editorRecord.setPeople,
            depCode:this.props.editorRecord.depCode,
            MaintenanceType:this.props.editorRecord.MaintenanceType,
            MaintenancePeriod:this.props.editorRecord.maintPeriod,
            ImplementDate:this.props.editorRecord.planDate,
            Effective:this.props.editorRecord.effFlag,
            NextPlanDate:this.props.editorRecord.nextDate,
            deviceName:this.props.editorRecord.deviceName,
            fixedassetsCode:this.props.editorRecord.fixedassetsCode,
        })
    }
    findkeys=()=>{
        const x=this.props.editorRecord.MaintenanceType;
        const y=[];
        for(var i=0;i<x.length;i++){
            y.push(x.index)
        }
    }
    render(){
        const dateFormat = 'YYYY-MM-DD';
        const MaintenanceTypeSelection={
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({
                    MaintenanceType:selectedRows,
                    selectedRowKeys:selectedRowKeys
                })
                console.log(this.state.MaintenanceType);
            },
            onSelect: (changeAbleRowKeys) => {
                const selected=[];
                console.log("MaintenanceTypelength",this.props.MaintenanceType.length);
                for(var i=0;i<this.props.MaintenanceType.length;i++){
                    for(var j=0;j<this.state.MaintenanceDetail.length;j++){
                        console.log("-----------------------------")
                        if(this.props.MaintenanceType[i].code===this.state.MaintenanceDetail[j].code){
                            selected.push(i);
                        }
                        console.log("Detailcode",this.state.MaintenanceDetail[i].code);
                        console.log("MaintenanceTypecode",this.props.MaintenanceType[i].code);
                    }

                }
                console.log("selected",selected)
                this.setState({ selectedRowKeys: selected });
            },

        }
        return(
            <span>
                <span onClick={this.handleMaintanceEditor} className="blue">编辑</span>
                <Modal title='编辑' visible={this.state.editorVisible}
                       width="1010px"
                       closable={false}
                       centered={true}
                       maskClosable={false}
                       footer={[<CancleButton key='back'  handleCancel={this.handleCancel2} />,
                           <SaveButton key="define" handleSave={this.handleCreate}/>,]}>
                    <div >
                <div className='Rowofadd'>
                    <div className='divofadd'>
                        <b>计划名称</b>
                        <Input
                            id='Planname_add'
                            onChange={this.handlePlanName1Change}
                            placeholder='请输入'
                            key="PlanName1" name="PlanName1"
                            value={this.state.PlanName1}
                        />
                    </div>
                    <div className='divofadd1'>
                        <b>所属部门</b>
                        <Input
                            id='department_add'
                            key="department"
                            name="department"
                            placeholder="请选择"
                            style={{ width: 200 }}
                            value={this.props.depName}
                            disabled={true}
                        />
                    </div>
                    <div className='divofadd1'>
                        <b>设备名称/编号</b>
                        <TreeSelect
                            id='deviceNameAndNum_add'
                            key="deviceNameAndNum"
                            name="deviceNameAndNum"
                            style={{ width: 200 }}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="请选择"
                            treeData={this.state.deviceNameAndNumdata}
                            allowClear={true}
                            value={this.state.deviceNameAndNum}
                            onChange={this.handleDeviceNameAndNumChange}
                            disabled={true}
                        />
                    </div>
                </div>
                <div className='Rowofadd'>
                    <div className='divofadd'>
                        <b>保养周期</b>
                        <InputNumber
                            id='MaintenancePeriod_add'
                            placeholder='请输入天数'
                            style={{width:'200px'}}
                            defaultValue={0}
                            key="MaintenancePeriod"
                            name="MaintenancePeriod"
                            value={this.state.MaintenancePeriod}
                            onChange={this.handleMaintenancePeriodChange}
                            min={0}
                        />
                    </div>
                    <div className='divofadd'>
                        <b>本次计划执行日期</b>
                        <DatePicker
                            id='ImplementDate_add'
                            defaultValue={moment(this.state.ImplementDate, dateFormat)}
                            onChange={this.handleImplementDateChange}
                            placeholder='请选择日期'
                            key="ImplementDate" name="ImplementDate"
                        />
                    </div>
                    <div className='divofadd2'>
                        <h4 id='NextPlanDate_add' key="NextPlanDate" name="NextPlanDate">
                            <b>下次计划执行日期:</b>&nbsp;&nbsp;{this.state.NextPlanDate}
                        </h4>
                    </div>
                </div>
                <div className='Rowofadd'>
                    <div className='divofadd'>
                        <b>保养项目</b>
                        <Table
                            id='Mainname_add'
                            rowKey={record => record.code}
                            name="Maintenancetype"
                            columns={this.columns}
                            dataSource={this.props.MaintenanceType}
                            size="small"
                            scroll={{ y: 240 }}
                            rowSelection={MaintenanceTypeSelection}
                            bordered={true}
                            pagination={false}
                        />
                    </div>
                </div>
                <div id='Effective_add' style={{display:'inline'}}>&nbsp;&nbsp;&nbsp;&nbsp;<b>是否生效:</b>&nbsp;&nbsp;
                    <Radio.Group onChange={this.handleEffectiveChange} value={this.state.Effective}>
                        <Radio value={0}>生效</Radio>
                        <Radio value={1}>失效</Radio>
                    </Radio.Group>
                </div>
            </div>
                </Modal>
            </span>
        )
    }
    defaultSelect=(record)=>{
        console.log("record",record)
    }


    handlePlanName1Change=(e)=>{
        this.setState({PlanName1:e.target.value})
    }
    handleDeviceNameAndNumChange=(value)=>{
        this.setState({deviceNameAndNum:value})
        console.log(value);
    }
    handleImplementDateChange=(date, dateString)=>{
        this.setState({ImplementDate:dateString});
        this.date1=Date.parse(dateString);
        console.log(this.date1);
        var date2=this.date1+(this.state.MaintenancePeriod * 24* 3600* 1000);
        var time = new Date(date2);
        let Y=time.getFullYear();
        let M=(time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1);
        let D=time.getDate() < 10 ? '0' + time.getDate() + '' : time.getDate() + '' ;
        this.setState({NextPlanDate:Y+'-'+M+'-'+D});
    }
    handleMaintenancePeriodChange=(e)=>{
        var re =/[1−9]+[0−9]∗]∗/
        if(!re.test(e)&&e>=0){
            this.setState({MaintenancePeriod:e})
        }
        else{
            message.info("请输入整数字")
        }
        const date1=this.date1;
        var date2=date1+(e * 24* 3600* 1000)
        var time = new Date(date2);
        let Y=time.getFullYear()
        let M=(time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1)
        let D=time.getDate() < 10 ? '0' + time.getDate() + '' : time.getDate() + '' // 日
        if(this.state.ImplementDate){
            this.setState({NextPlanDate:Y+'-'+M+'-'+D})
        }

    }
    handleEffectiveChange=(e)=>{
        this.setState({Effective:e.target.value})
    }
    /**处理一条编辑记录 */
    handleMaintanceEditor=()=>{
        axios({
            url:`${this.url.DeviceMaintenancePlan.maintenancePlanDetail}/${this.props.editorRecord.code}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
        }).then((data) => {
            var res = data.data.data ? data.data.data : [];
            console.log(res)
            var detailNum=res.detailNum;
            console.log('detailNum')
            console.log(detailNum)
            var deviceMaintenancePlansDetails=res.deviceMaintenancePlansDetails;
            this.setState({
                MaintenanceDetail:deviceMaintenancePlansDetails,
            })
        })
        const params2={
            deviceName:this.props.editorRecord.deviceName,
        }
        this.props.getMaintType(params2)
        this.setS();
        console.log("this.props.editorRecord",this.props.editorRecord)
        console.log("this.props.MaintenanceType",this.props.MaintenanceType)
        this.setState({editorVisible:true})

    }
    //点击返回
    handleCancel2=()=>{
        this.setState({editorVisible:false});
    }    ;
    //点击保存
    handleCreate=()=>{
        const menuList = JSON.parse(localStorage.getItem('menuList')) ;

        var jing=this.state.deviceNameAndNum.search('/#');
        this.setState({
            whomade:menuList.userId,
        },()=>{
            var objectdata = {
                deviceMaintenancePlansHead:{
                    "code":this.props.editorRecord.code,
                    "planName":this.state.PlanName1,
                    "fixedassetsCode":this.state.fixedassetsCode,
                    "deviceName":this.state.deviceName,
                    "deptCode":this.props.editorRecord.depCode,
                    "maintPeriod":this.state.MaintenancePeriod,
                    "planDate":this.state.ImplementDate,
                    "nextDate":this.state.NextPlanDate,
                    "setPeople":this.state.whomade,
                    "effFlag":this.state.Effective,
                },
                "deviceMaintenanceItems":this.state.MaintenanceType,
                "detailNum":1,
            }
            console.log(objectdata)
            this.handleCancel2();
            axios({
                url: `${this.props.url.DeviceMaintenancePlan.maintenanceUpdatePlan}`,
                method: 'put',
                headers: {
                    'Authorization': this.props.url.Authorization
                },
                data: objectdata,
            }).then((data) => {
                message.info(data.data.data.message);
                this.props.getTableData(this.props.params)
            }).catch(function () {
                message.info('更新失败，请联系管理员！');
            });
        })
        const params1={
            deptId:this.props.depCode,
            statusId:-1,
            pagination:this.pagination,
        }
        this.props.getTableData(params1,this.props.depName)
        this.handleCancel2()
        const Editorobject={
            editorVisible:this.state.editorVisible,
            PlanName1:this.state.PlanName1,
            departmentname:this.state.departmentname,
            deviceNameAndNum:this.state.deviceNameAndNum,
            dataOfDepartment:[],
            MaintenancePeriod:this.state.MaintenancePeriod,
            ImplementDate:this.state.ImplementDate,
            NextPlanDate:this.state.NextPlanDate,
            MaintenanceType:[],
            Effective: this.state.Effective,
            deviceNameAndNumdata:[],
            whomade:this.state.whomade,
        }
        console.log(Editorobject)
    }

    columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key:'index',
            width: "10%"
        },
        {
            title: '保养项目',
            dataIndex: 'maintenanceItems',
            key:'maintenanceItems',
            width: "20%"
        },
        {
            title: '保养内容',
            dataIndex: 'maintenanceContent',
            key:'maintenanceContent',
            width: "40%"
        },
        {
            title: '频次',
            dataIndex: 'frequency',
            key:'frequency',
            width: "30%",
        },
    ];
    pagination = {
        total:this.state.MaintenanceType.length,
        showSizeChanger: true,
        showTotal(total){
            return `共${total}条记录`
        },
    };
}

export default EditorofMain