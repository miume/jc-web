import React from 'react';
import {Modal, Input, InputNumber, DatePicker, TreeSelect, Table, Radio, message} from 'antd';
import moment from 'moment'

import CancleButton from "../../../../BlockQuote/cancleButton";
import SaveButton from "../../../../BlockQuote/saveButton";
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
        let {editorRecord} = this.props;
        this.setState({
            deviceNameAndNum:editorRecord.deviceName+'/#'+editorRecord.fixedassetsCode,
            depName:editorRecord.depName,
            PlanName1:editorRecord.planName,
            whomade:editorRecord.setPeople,
            depCode:editorRecord.depCode,
            MaintenancePeriod:editorRecord.maintPeriod,
            ImplementDate:editorRecord.planDate,
            Effective:editorRecord.effFlag,
            NextPlanDate:editorRecord.nextDate,
            deviceName:editorRecord.deviceName,
            fixedassetsCode:editorRecord.fixedassetsCode,
        })
    }
    onSelectChange =( selectedRowKeys, selectedRows) => {
        this.setState({
            MaintenanceType:selectedRows,
        })

        this.setState({ selectedRowKeys });
    };

    render(){
        const dateFormat = 'YYYY-MM-DD';
        const { selectedRowKeys } = this.state;
        const MaintenanceTypeSelection={
            selectedRowKeys,
            onChange:this.onSelectChange,
        }
        return(
            <span>
                <span onClick={this.handleMaintanceEditor} className="blue">编辑</span>
                <Modal title='编辑' visible={this.state.editorVisible}
                       width="1100px"
                       closable={false}
                       centered={true}
                       maskClosable={false}
                       footer={[<CancleButton key='back'  handleCancel={this.handleCancel2} />,
                           <SaveButton key="define" handleSave={this.handleCreate}/>,]}>
                    <div>
                        <div className='Rowofadd'>
                            <div className='divofadd'>
                                <b className='row-label'>计划名称</b>
                                <Input
                                    id='Planname_add'
                                    onChange={this.handlePlanName1Change}
                                    placeholder='请输入'
                                    key="PlanName1" name="PlanName1"
                                    value={this.state.PlanName1}
                                />
                            </div>
                            <div className='divofadd'>
                                <b className='row-label1'>所属部门</b>
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
                            <div className='divofadd'>
                                <b className='row-label1'>设备名称/编号</b>
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
                                <b className='row-label'>保养周期</b>
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
                                <b className='row-label1'>本次计划执行日期</b>
                                <DatePicker
                                    id='ImplementDate_add'
                                    defaultValue={moment(this.state.ImplementDate, dateFormat)}
                                    onChange={this.handleImplementDateChange}
                                    placeholder='请选择日期'
                                    key="ImplementDate" name="ImplementDate"
                                />
                            </div>
                            <div className='divofadd'>
                                <b className='row-label1'>下次计划执行日期:</b>
                                <div>{this.state.NextPlanDate}</div>
                            </div>
                        </div>
                        <div className='row-table'>
                            <b className='row-label'>保养项目:</b>
                            <Table
                                id='Mainname_add'
                                rowKey={record => record.code}
                                name="Maintenancetype"
                                columns={this.columns}
                                dataSource={this.props.MaintenanceType}
                                size="small"
                                scroll={{ y: 150 }}
                                rowSelection={MaintenanceTypeSelection}
                                bordered={true}
                                pagination={false}
                            />
                        </div>
                        <div id='Effective_add' style={{display:'inline',paddingLeft: 10}}>
                            <b className='row-label'>是否生效:</b>
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



    handlePlanName1Change=(e)=>{
        this.setState({PlanName1:e.target.value})
    }
    handleDeviceNameAndNumChange=(value)=>{
        this.setState({deviceNameAndNum:value})
        //console.log(value);
    }
    handleImplementDateChange=(date, dateString)=>{
        this.setState({ImplementDate:dateString});
        this.date1=Date.parse(dateString);
        //console.log(this.date1);
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
            //console.log(res)
            var detailNum=res.detailNum;
            //console.log('detailNum')
            //console.log(detailNum)
            const params2={
                deviceName:this.props.editorRecord.deviceName,
            }
            this.props.getMaintType(params2)
            this.setS();
            var deviceMaintenancePlansDetails=res.deviceMaintenancePlansDetails;
            const m=[];
            for(var i=0;i<this.state.MaintenanceType.length;i++){
                m.push({
                    code:deviceMaintenancePlansDetails[i].itemsCode,
                    deviceName:this.props.editorRecord.deviceName,
                    maintenanceContent:deviceMaintenancePlansDetails[i].maintenanceContent,
                    maintenanceItems:deviceMaintenancePlansDetails[i].maintenanceItems,
                    optType:deviceMaintenancePlansDetails[i].optType,
                    planCode:deviceMaintenancePlansDetails[i].planCode,
                })
            }
            this.setState({
                MaintenanceType:m,
                MaintenanceDetail:deviceMaintenancePlansDetails,
            },()=>{
                ////console.log("this.props.editorRecord",this.props.editorRecord)
                ////console.log("this.props.MaintenanceType",this.props.MaintenanceType)
                ////console.log("this.state.MaintenanceDetail",this.state.MaintenanceDetail)
                const selected=[];
                for(var i=0;i<this.props.MaintenanceType.length;i++){
                    for(var j=0;j<this.state.MaintenanceDetail.length;j++){
                        if(this.props.MaintenanceType[i].code===this.state.MaintenanceDetail[j].itemsCode){
                            selected.push(this.props.MaintenanceType[i].code);
                        }
                    }
                }
                this.setState({
                    editorVisible:true,
                    selectedRowKeys:selected,
                },()=>{
                    ////console.log("selected",selected)
                })
            })
        })


    }
    //点击返回
    handleCancel2=()=>{
        this.setState({
            editorVisible:false});
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
            //console.log(objectdata)
            this.handleCancel2();
            axios({
                url: `${this.props.url.DeviceMaintenancePlan.maintenanceUpdatePlan}`,
                method: 'put',
                headers: {
                    'Authorization': this.props.url.Authorization
                },
                data: objectdata,
            }).then((data) => {
                message.info(data.data.message);
                const params={
                    deptId: this.props.depCode,
                    statusId: this.props.statusId,
                    condition:this.props.condition,
                    page:this.props.page,
                    size:this.props.size,
                }
                this.props.getTableData(params)
            });
        })
        const params1={
            deptId:this.props.depCode,
            statusId:-1,
            pagination:this.pagination,
            depName:this.props.depName,
        }
        this.props.getTableData(params1,)
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
        //console.log(Editorobject)
    }

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