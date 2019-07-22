import React from 'react';
import { Modal,InputNumber , Input,DatePicker,TreeSelect , Table ,Radio,message } from 'antd';
import axios from "axios";
import moment from 'moment'
import '../blockCompontent/style.css'
import AddButton from '../../BlockQuote/newButton';
import CancleButton from "../../BlockQuote/cancleButton";
import SaveButton from "../../BlockQuote/saveButton";

class Addmaintenancebutton extends React.Component{
    d2 = [];
    constructor(props){
        super(props)
        this.state={
            visible: false,
            dataOfDepartment:[],
            mainNumber:'',
            deviceNameAndNum:'',
            deviceNameAndNumdata:[],
            PlanName1:'',
            whomade:'',
            departmentname: this.props.departmentname,
            MaintenanceType:[],
            MaintenancePeriod:'',
            ImplementDate:'',
            NextPlanDate:'',
            Effective: 1,
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
            dataIndex: 'maintenanceFrequency',
            key:'maintenanceFrequency',
            width: "30%",
        },
    ];


    handleDeviceNameAndNumChange=(value)=>{
        console.log(value)
        if(value !== undefined){
            var jing=value.split('/#');
            this.setState({
                deviceName:jing[0]?jing[0]:'',
                fixedassetsCode:jing[1]?jing[1]:'',
                deviceNameAndNum:value
            })
            const params2={
                deviceName:jing[0],
            }
            this.props.getMaintType(params2)
            console.log(value);
        }
    }
    handlePlanName1Change=(e)=>{
        this.setState({PlanName1:e.target.value})
    }

    handledepartmentnameChange=(value)=>{
        this.setState({departmentname:value})
        //console.log(this.state.departmentname)
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
        console.log(this.state.ImplementDate)
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
        this.setState({ visible: true });
        const menuList = JSON.parse(localStorage.getItem('menuList')) ;
        console.log(menuList);
        this.setState({whomade:menuList.userId})
        const params1={
            code:this.props.depCode,
        }
        console.log(params1)
        this.props.getDevice(params1)
        for(var i=0;i<3;i++)
        {
            this.d2.push({
                "deviceName":this.state.deviceName,
                "maintenanceItems":"saasd",
                "maintenanceContent":"string",
                "optType":0,
                "maintenanceFrequency": "string"
            })
        }
    };
    handleCreate = (e) => {
        const menuList = JSON.parse(localStorage.getItem('menuList')) ;
        var jing=this.state.deviceNameAndNum.search('/#');
        this.setState({
            deviceName:this.state.deviceNameAndNum.slice(0,jing),
            fixedassetsCode:this.state.deviceNameAndNum.slice(jing+2),
            whomade:menuList.userId,
        },()=>{
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
                },
                "deviceMaintenanceItems":this.state.MaintenanceType,
                "detailNum":1,
            }
            console.log(objectdata)
            this.handleCancel();
            axios({
                url: `${this.props.url.DeviceMaintenancePlan.maintenanceAddPlan}`,
                method: 'post',
                headers: {
                    'Authorization': this.props.url.Authorization
                },
                data: objectdata,
            }).then((data) => {
                message.info(data.data.data.message);
                this.props.getTableData(this.props.params)
            }).catch(function () {
                message.info('新增失败，请联系管理员！');
            });
        })
        const params1={
            deptId:this.props.depCode,
            statusId:-1,
        }
        this.props.getTableData(params1,this.props.depName)
    }
    handleCancel = () => {
        this.setState({
            visible: false ,
            dataOfDepartment:[],
            deviceNameAndNum:'',
            deviceNameAndNumdata:[],
            PlanName1:'',
            whomade:'',
            departmentname: '',
            MaintenanceType:[],
            MaintenancePeriod:'',
            ImplementDate:'',
            NextPlanDate:'',
            Effective: 1,
        });
        this.d2=[];
    };
    handledapartmentChange=(e)=>{
        this.setState({departmentname:e.event.value})
    }
    render(){
        const MaintenanceTypeSelection={
            onChange: (selectedRowKeys, selectedRows) => {
                var objMain=[];
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                for(var j=0;j<selectedRowKeys.length;j++) {
                    objMain.push({
                        deviceName:selectedRows[j].deviceName,
                        maintenanceItems:selectedRows[j].maintenanceItems,
                        maintenanceContent:selectedRows[j].maintenanceContent,
                        optType:1,
                        maintenanceFrequency: selectedRows[j].maintenanceFrequency,
                    })
                }
                //console.log(objMain)
                this.setState({MaintenanceType:objMain});
                //console.log(`MaintenanceType:${this.state.MaintenanceType}`);
                objMain=[];
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
                            onChange={this.handledapartmentChange}
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
                            format={dateFormat}
                            id='ImplementDate_add'
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
                            key="Maintenancetype"
                            name="Maintenancetype"
                            columns={this.columns}
                            dataSource={this.d2}
                            size="small"
                            scroll={{ y: 240 }}
                            rowSelection={MaintenanceTypeSelection}
                            bordered={true}
                        />
                    </div>
                </div>
                <div id='Effective_add' style={{display:'inline'}}>&nbsp;&nbsp;&nbsp;&nbsp;<b>是否生效:</b>&nbsp;&nbsp;
                    <Radio.Group onChange={this.handleEffectiveChange} value={this.state.Effective}>
                        <Radio value={1}>生效</Radio>
                        <Radio value={0}>失效</Radio>
                    </Radio.Group>
                </div>
            </div>
                </Modal>
            </span>
        )
    }
}
export default Addmaintenancebutton