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
        Effective:'',
        detailNum: ''
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

    render(){
        const dateFormat = 'YYYY-MM-DD';
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.selectChange
        };
        let {updateFlag}=this.props
        return(
            <span>
                <span onClick={this.handleMaintanceEditor} className={updateFlag?"blue":'hide'}>编辑</span>
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
                                <b className='row-label'>计划名称:</b>
                                <Input
                                    id='Planname_add'
                                    onChange={this.handlePlanName1Change}
                                    placeholder='请输入'
                                    key="PlanName1" name="PlanName1"
                                    value={this.state.PlanName1}
                                />
                            </div>
                            <div className='divofadd'>
                                <b className='row-label1'>所属部门:</b>
                                <Input
                                    id='department_add'
                                    key="department"
                                    name="department"
                                    placeholder="请选择"
                                    style={{ width: 200 }}
                                    value={this.props.deviceName}
                                    disabled={true}
                                />
                            </div>
                            <div className='divofadd'>
                                <b className='row-label1'>设备名称/编号:</b>
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
                                <b className='row-label'>保养周期:</b>
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
                                <b className='row-label1'>本次计划执行日期:</b>
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
                                rowKey={record => record.itemsCode}
                                columns={this.columns}
                                dataSource={this.state.deviceMaintenanceItems}
                                size="small"
                                scroll={{ y: 150 }}
                                bordered={true}
                                pagination={false}
                                rowSelection={rowSelection}
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
        this.setState({deviceNameAndNum:value});
    }
    handleImplementDateChange=(date, dateString)=>{
        this.setState({ImplementDate:dateString});
        this.date1=Date.parse(dateString);
        var date2=this.date1+(this.state.MaintenancePeriod * 24* 3600* 1000);
        var time = new Date(date2);
        let Y=time.getFullYear();
        let M=(time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1);
        let D=time.getDate() < 10 ? '0' + time.getDate() + '' : time.getDate() + '' ;
        this.setState({NextPlanDate:Y+'-'+M+'-'+D});
    }
    handleMaintenancePeriodChange=(e)=>{
        if (e) {
            var re = /[1−9]+[0−9]∗]∗/
            if (!re.test(e) && e >= 0) {
                this.setState({MaintenancePeriod: e})
                var date1 = this.date1;
                if (!date1) {
                    date1 = (new Date()).getTime();
                }
                var date2 = date1 + (e * 24 * 3600 * 1000)
                var time = new Date(date2);
                let Y = time.getFullYear()
                let M = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1)
                let D = time.getDate() < 10 ? '0' + time.getDate() + '' : time.getDate() + '' // 日
                if (this.state.ImplementDate) {
                    this.setState({NextPlanDate: Y + '-' + M + '-' + D})
                }
            } else {
                this.setState({
                    NextPlanDate: '',
                    MaintenancePeriod: ''
                })
            }
        } else {
            this.setState({
                NextPlanDate: '',
                MaintenancePeriod: ''
            });
            message.info("请输入整数字")
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
            const params2={
                deviceName:this.props.editorRecord.deviceName,
            }
            this.props.getMaintType(params2)
            this.setS();
            let {deviceMaintenancePlansDetails,deviceMaintenanceItems,detailNum} = res,
                len = deviceMaintenancePlansDetails.length, selectedRowKeys = [], selectedRows = [];
            for(let i = 0; i < deviceMaintenanceItems.length; i++) {
                deviceMaintenanceItems[i]['index'] = i + 1;
                let itemsCode = deviceMaintenanceItems[i].code;
                deviceMaintenanceItems[i]['itemsCode'] = itemsCode;
                delete deviceMaintenanceItems[i].code;
                if( i < len && itemsCode === deviceMaintenancePlansDetails[i].itemsCode) {
                    selectedRowKeys.push(itemsCode);
                    selectedRows.push(deviceMaintenancePlansDetails[i])
                }
            }
            this.setState({
                deviceMaintenanceItems:deviceMaintenanceItems,
                editorVisible:true,
                selectedRowKeys: selectedRowKeys,
                detailNum: detailNum
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
        const menuList = JSON.parse(localStorage.getItem('menuList'));
        const {PlanName1, fixedassetsCode, deviceName, MaintenancePeriod, ImplementDate, NextPlanDate, Effective, selectedRows,detailNum} = this.state;

        var objectdata = {
            deviceMaintenancePlansHead:{
                "code":this.props.editorRecord.code,
                "planName": PlanName1,
                "fixedassetsCode": fixedassetsCode,
                "deviceName": deviceName,
                "deptCode":this.props.depCode,
                "maintPeriod": MaintenancePeriod,
                "planDate": ImplementDate,
                "nextDate": NextPlanDate,
                "setPeople":menuList.userId,
                "effFlag": Effective,
            },
            "deviceMaintenancePlansDetails": selectedRows,
            "detailNum":detailNum,
        };

        axios({
            url: `${this.props.url.DeviceMaintenancePlan.maintenanceUpdatePlan}`,
            method: 'put',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            data: objectdata,
        }).then((data) => {
            message.info(data.data.message);
            this.handleCancel2();
            const params={
                deptId: this.props.depCode,
                statusId: this.props.statusId,
                condition:this.props.condition,
                page:this.props.page,
                size:this.props.size,
            }
            this.props.getTableData(params)
        });
    }

    selectChange = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedRowKeys: selectedRowKeys,
            selectedRows: selectedRows
        })
    }

    columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key:'index',
            width: "10%"
        }, {
            title: '保养项目',
            dataIndex: 'maintenanceItems',
            key:'maintenanceItems',
            width: "20%"
        }, {
            title: '保养内容',
            dataIndex: 'maintenanceContent',
            key:'maintenanceContent',
            width: "40%"
        }, {
            title: '频次',
            dataIndex: 'maintenanceFrequency',
            key:'maintenanceFrequency',
            width: "30%",
        }
    ];
}

export default EditorofMain
