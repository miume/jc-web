import React from 'react';
import {Modal, Input,message, Table, Radio, InputNumber, Button} from 'antd';
import CancleButton from "../../../../BlockQuote/cancleButton";
import axios from "axios";

class DetailofMain extends React.Component{
    url = JSON.parse(localStorage.getItem('url'));
    ob = JSON.parse(localStorage.getItem('menuList'));
    state = {
        editorVisible:false,
        PlanName1:``,
        depCode:``,
        deviceNameAndNum:``,
        dataOfDepartment:[],
        MaintenancePeriod:``,
        ImplementDate:``,
        NextPlanDate:``,
        MaintenanceType:[],
        Effective: ``,
        deviceNameAndNumdata:[],
        whomade:``,
        detailNum:'',
        generateMaint:'',
        detail_head:'',
        deviceMaintenancePlansDetails:'',
    };

    handleMaintanceDetail=()=>{

        this.setState({detailVisible:true})
        axios({
                url:`${this.url.DeviceMaintenancePlan.maintenancePlanDetail}/${this.props.editorRecord.code}`,
                method: 'get',
                headers: {
                    'Authorization': this.url.Authorization
                },
            }).then((data) => {
            var res = data.data.data ? data.data.data : [];
            var detailNum=res.detailNum;
            var generateMaint=res.generateMaint;
            for(let i = 0; i < res.deviceMaintenancePlansDetails.length; i++) {
                res.deviceMaintenancePlansDetails[i]['index'] = i + 1;
            }
            var deviceMaintenancePlansDetails=res.deviceMaintenancePlansDetails;
            var deviceMaintenancePlansHead=res.deviceMaintenancePlansHead;
            this.setState({
                deviceNameAndNum:deviceMaintenancePlansHead.deviceName+'/'+deviceMaintenancePlansHead.fixedassetsCode,
                PlanName1:deviceMaintenancePlansHead.planName,
                whomade:deviceMaintenancePlansHead.setPeople,
                depCode:deviceMaintenancePlansHead.depCode,
                MaintenanceType:deviceMaintenancePlansDetails,
                MaintenancePeriod:deviceMaintenancePlansHead.maintPeriod,
                ImplementDate:deviceMaintenancePlansHead.planDate,
                Effective:deviceMaintenancePlansHead.effFlag,
                NextPlanDate:deviceMaintenancePlansHead.nextDate,
                detailNum:detailNum,
                generateMaint:generateMaint,
                detail_head:{deviceMaintenancePlansHead},
            })
        })
    }
    handleCancel2=()=>{
        this.setState({detailVisible:false})
    }

    /**生成保养单*/
    handleClick=()=>{
        let {MaintenanceType} = this.state;
        const m=[];
        for(var i=0;i<MaintenanceType.length;i++){
            m.push({
                code:MaintenanceType[i].itemsCode,
                deviceName:this.props.editorRecord.deviceName,
                maintenanceContent:MaintenanceType[i].maintenanceContent,
                maintenanceItems:MaintenanceType[i].maintenanceItems,
                optType:MaintenanceType[i].optType,
                planCode:MaintenanceType[i].planCode,
            })
        }

        const dataofmain={
            deviceMaintenanceItems:m,
            deviceMaintenancePlansHead:this.state.detail_head.deviceMaintenancePlansHead

        }

        axios({
            url:`${this.props.url.DeviceMaintenancePlan.generatorMaint}`,
            method: 'post',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            data:dataofmain,
        }).then((data)=>{
            message.info(data.data.message)
        })
        const params={
            deptId:this.props.depCode,
            statusId:this.props.statusId,
            page:1,
        }
        this.props.getTableData(params)
        this.handleCancel2()
    }

    render(){
        return(
            <span>
                <span onClick={this.handleMaintanceDetail} className="blue">详情</span>
                <Modal title='详情' visible={this.state.detailVisible}
                       width="1100px"
                       closable={false}
                       centered={true}
                       maskClosable={false}
                       footer={!this.state.generateMaint?[<CancleButton key='cancle' flag={1} handleCancel={this.handleCancel2} />]:
                       [
                           <CancleButton key='cancle' flag={1} handleCancel={this.handleCancel2} />,
                           <Button onClick={this.handleClick} key='planid' className='green-button'><i className="fa fa-floppy-o" aria-hidden="true" style={{color:'white'}}></i>&nbsp;&nbsp;生成保养单</Button>]
                       }
                >
                    <div>
                    <div className='Rowofadd'>
                        <div className='divofadd'>
                            <b className='row-label'>计划名称:</b>
                            <Input
                                id='Planname_add'
                                disabled={true}
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
                                disabled={true}
                                value={this.props.depName}
                            />
                        </div>
                        <div className='divofadd'>
                            <b className='row-label1'>设备名称/编号:</b>
                            <Input
                                id='deviceNameAndNum_add'
                                key="deviceNameAndNum"
                                name="deviceNameAndNum"
                                style={{ width: 200 }}
                                value={this.state.deviceNameAndNum}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className='Rowofadd'>
                        <div className='divofadd'>
                            <b className='row-label'>保养周期:</b>
                            <InputNumber
                                id='MaintenancePeriod_add'
                                style={{width:'200px'}}
                                key="MaintenancePeriod"
                                name="MaintenancePeriod"
                                value={this.state.MaintenancePeriod}
                                disabled={true}
                                min={0}
                            />
                        </div>
                        <div className='divofadd'>
                            <b className='row-label1'>本次计划执行日期:</b>
                            <Input
                                id='ImplementDate_add'
                                disabled={true}
                                placeholder='请选择日期'
                                key="ImplementDate" name="ImplementDate"
                                value={this.state.ImplementDate}
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
                            rowKey={item => item.code}
                            columns={this.columns}
                            dataSource={this.state.MaintenanceType}
                            size="small"
                            scroll={{ y: 150 }}
                            bordered={true}
                            pagination={false}
                        />
                    </div>
                    <div id='Effective_add' style={{display:'inline',paddingLeft: 10}}>
                        <b className='row-label'>是否生效:</b>
                        <Radio.Group disabled={true} value={this.state.Effective}>
                            <Radio value={0}>生效</Radio>
                            <Radio value={1}>失效</Radio>
                        </Radio.Group>
                    </div>
                </div>
                    </Modal>
            </span>
        )
    }

    columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key:'index',
            width: "6%"
        },
        {
            title: '保养项目',
            dataIndex: 'maintenanceItems',
            key:'maintenanceItems',
            width: "40%"
        },
        {
            title: '保养内容',
            dataIndex: 'maintenanceContent',
            key:'maintenanceContent',
            width: "54%"
        }
    ];
}

export default DetailofMain
