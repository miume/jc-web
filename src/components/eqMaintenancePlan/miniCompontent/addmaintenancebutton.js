import React from 'react';
import { Modal,InputNumber , Input,DatePicker,TreeSelect , Table ,Radio,message } from 'antd';
import axios from "axios";
import moment from 'moment'
import '../blockCompontent/style.css'
import AddButton from '../../BlockQuote/newButton';
import CancleButton from "../../BlockQuote/cancleButton";
import SaveButton from "../../BlockQuote/saveButton";

class Addmaintenancebutton extends React.Component{
    constructor(props){
        super(props)
        this.state={
            visible: false,
            deviceNameAndNum:'',
            deviceNameAndNumdata:[],
            PlanName1:'',
            whomade:'',
            MaintenanceType:[],
            selectedRowKeys:[],
            MaintenancePeriod:'',
            ImplementDate:'',
            NextPlanDate:'',
            Effective: 0,
            deviceName:'',
            fixedassetsCode:'',
        }
    }
    date1='';
    columns = [
        {
            title: '序号',
            dataIndex: 'code',
            key:'code',
            width: "7%"
        },
        {
            title: '保养项目',
            dataIndex: 'maintenanceItems',
            key:'maintenanceItems',
            width: "25%"
        },
        {
            title: '保养内容',
            dataIndex: 'maintenanceContent',
            key:'maintenanceContent',
            width: "45%"
        },
        {
            title: '频次',
            dataIndex: 'maintenanceFrequency',
            key:'maintenanceFrequency',
            width: "35%",
        },
    ];
    handleDeviceNameAndNumChange=(value)=>{
        //console.log(value)
        if(value !== undefined){
            var jing=value.split('/#');
            this.setState({
                deviceName:jing[0]?jing[0]:'',
                fixedassetsCode:jing[1]?jing[1]:'',
                deviceNameAndNum:value
            },()=>{
                if(!this.state.fixedassetsCode){
                    message.info("请选择固定编号！")
                    this.setState({deviceNameAndNum:''})
                }
            })

            const params2={
                deviceName:jing[0],
            }
            this.props.getMaintType(params2)
            ////console.log(value);
        }
    }
    handlePlanName1Change=(e)=>{
        this.setState({PlanName1:e.target.value})
    }
    handleImplementDateChange=(date, dateString)=>{
        this.setState({ImplementDate:dateString})
        this.date1=Date.parse(dateString);
        var date2=this.date1+(this.state.MaintenancePeriod * 24* 3600* 1000)
        var time = new Date(date2);
        let Y=time.getFullYear()
        let M=(time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1)
        let D=time.getDate() < 10 ? '0' + time.getDate() + '' : time.getDate() + '' // 日
        this.setState({NextPlanDate:Y+'-'+M+'-'+D})
        ////console.log(this.state.ImplementDate)
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

    showModal = () => {
        var now = new Date();
        var year = now.getFullYear(); //得到年份
        var month = now.getMonth();//得到月份
        var date = now.getDate();//得到日期
        if (month < 10) month = "0" + month;
        if (date < 10) date = "0" + date;
        var date1 = year + "-" + month + "-" + date;
        //console.log("state",this.state)
        //console.log(this.props.MaintenanceType)
        const menuList = JSON.parse(localStorage.getItem('menuList')) ;
        this.setState({
            visible: true,
            whomade:menuList.userId,
            ImplementDate:date1,
        });
        //console.log(menuList);
        const params1={
            code:this.props.depCode,
        }
        ////console.log(params1)
        this.props.getDevice(params1)
    };
    handleCreate = (e) => {
        if((!this.state.PlanName1)){
            message.info("请输入计划名称！")
            return;
        }
        if(!(this.state.deviceNameAndNum)){
            message.info("请选择设备名称及固定资产编号！")
            return;
        }
        if(!this.state.ImplementDate){
            message.info("请选择当前计划执行日期！")
            return;
        }
        if(!this.state.MaintenancePeriod){
            message.info("请输入保养周期！")
            return;
        }
        if(this.state.MaintenanceType.length===0){
            message.info("请选择保养项目！")
            return;
        }
        //console.log(this.state)
            var objectdata = {
                deviceMaintenancePlansHead:{
                    "planName":this.state.PlanName1,
                    "fixedassetsCode":this.state.fixedassetsCode,
                    "deviceName":this.state.deviceName,
                    "deptCode":this.props.depCode,
                    "maintPeriod":this.state.MaintenancePeriod,
                    "planDate":this.state.ImplementDate,
                    "nextDate":this.state.NextPlanDate,
                    "setPeople":this.state.whomade,
                    "effFlag":this.state.Effective,
                    "editFlag":1,
                },
                "deviceMaintenanceItems":this.state.MaintenanceType,
            }
            //console.log("objectdata",objectdata)
            axios({
                url: `${this.props.url.DeviceMaintenancePlan.maintenanceAddPlan}`,
                method: 'post',
                headers: {
                    'Authorization': this.props.url.Authorization
                },
                data: objectdata,
            }).then((data) => {
                message.info(data.data.message)
                if(data.data.code!==0){
                    return;
                } else{
                    this.handleCancel();
                    this.props.getTableData({
                        deptId: this.props.depCode,
                        depName: this.props.depName,
                        page:this.props.current,
                        size:this.props.size,
                    })
                }

            }).catch(function (err) {
                message.info('新增失败，请联系管理员！')
            })

        const params1={
            deptId:this.props.depCode,
            statusId:-1,
            condition:this.props.condition,
            page:1,
            size:this.props.size,
            depName:this.props.depName,
        }
        this.props.getTableData(params1)
        ////console.log(params1)
    }
    handleCancel = () => {
        this.props.clearMainType()
        this.setState({
            deviceNameAndNum:'',
            visible: false ,
            PlanName1:'',
            whomade:'',
            MaintenanceType:[],
            MaintenancePeriod:'',
            selectedRowKeys:[],
            NextPlanDate:'',
            Effective: 0,
            deviceName:'',
            fixedassetsCode:"",
        });
    };

    render(){
        const MaintenanceTypeSelection={
            onChange: (selectedRowKeys, selectedRows) => {
                var objMain=[];
                //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                for(var j=0;j<selectedRowKeys.length;j++) {
                    objMain.push({
                        code:selectedRows[j].code,
                        deviceName:selectedRows[j].deviceName,
                        maintenanceItems:selectedRows[j].maintenanceItems,
                        maintenanceContent:selectedRows[j].maintenanceContent,
                        optType:selectedRows[j].optType,
                        maintenanceFrequency: selectedRows[j].maintenanceFrequency,
                    })
                }
                ////console.log(objMain)
                this.setState({
                    MaintenanceType:objMain,
                    selectedRowKeys: selectedRowKeys});
                ////console.log(`MaintenanceType:${this.state.MaintenanceType}`);
            },
        }
        const dateFormat = 'YYYY-MM-DD';
        return(
            <span className='left_buttons'>
                <AddButton handleClick={this.showModal}  name='新增' className='fa fa-plus' />
                <Modal
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    title='新增数据'
                    width='1010px'
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <SaveButton key="define" handleSave={this.handleCreate}/>,
                    ]}
                >
                    <div >
                <div className='Rowofadd'>
                    <div className='divofadd'>
                        <b>计划名称</b>&nbsp;
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
                        <b>设备名称/编号</b>&nbsp;
                        <TreeSelect
                            id='deviceNameAndNum_add'
                            key="deviceNameAndNum"
                            name="deviceNameAndNum"
                            style={{ width: 200 }}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            treeNodeLabelProp={'value'}
                            placeholder="请选择"
                            treeData={this.props.Device}
                            treeDefaultExpandAll={true}
                            allowClear={true}
                            value={this.state.deviceNameAndNum}
                            onChange={this.handleDeviceNameAndNumChange}
                        />
                    </div>
                </div>
                <div className='Rowofadd'>
                    <div className='divofadd'>
                        <b>保养周期</b>&nbsp;
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
                        <b>本次计划执行日期</b>&nbsp;
                        <DatePicker
                            format={dateFormat}
                            id='ImplementDate_add'
                            onChange={this.handleImplementDateChange}
                            placeholder='请选择日期'
                            key="ImplementDate" name="ImplementDate"
                            value={moment(`${this.state.ImplementDate}`, dateFormat)}
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
                        <b>保养项目</b>&nbsp;
                        <Table
                            id='Mainname_add'
                            key="Maintenancetype"
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
}
export default Addmaintenancebutton