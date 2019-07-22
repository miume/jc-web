import React from 'react';
import {Modal, Input, DatePicker, TreeSelect, Table, Radio, InputNumber} from 'antd';
import CancleButton from "../../BlockQuote/cancleButton";
import axios from "axios";
import moment from 'moment';
import SaveButton from "../../BlockQuote/saveButton";
const dateFormat = 'YYYY-MM-DD';
const d2 = [];
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
            console.log(res)
            var detailNum=res.detailNum;
            var deviceMaintenanceItems=res.deviceMaintenanceItems;
            var deviceMaintenancePlansDetails=res.deviceMaintenancePlansDetails;
            var deviceMaintenancePlansHead=res.deviceMaintenancePlansHead;
            console.log()
            console.log(deviceMaintenancePlansHead)
            this.setState({deviceNameAndNum:deviceMaintenancePlansHead["deviceName"]+'/'+deviceMaintenancePlansHead.fixedassetsCode})
            this.setState({PlanName1:deviceMaintenancePlansHead.planName})
            this.setState({whomade:deviceMaintenancePlansHead.setPeople})
            this.setState({depCode:deviceMaintenancePlansHead.depCode})
            this.setState({MaintenanceType:deviceMaintenanceItems})
            this.setState({MaintenancePeriod:deviceMaintenancePlansHead.maintPeriod})
            this.setState({ImplementDate:deviceMaintenancePlansHead.planDate})
            this.setState({Effective:deviceMaintenancePlansHead.effFlag})
            this.setState({NextPlanDate:deviceMaintenancePlansHead.nextDate})
            this.setState({detailNum:detailNum})
            }
        )
    }
    handleCancel2=()=>{
        this.setState({detailVisible:false})
    }
    handleClick=()=>{

    }

    render(){
        const MaintenanceTypeSelection={
            onChange: (selectedRowKeys, selectedRows) => {
                //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.state.MaintenanceType=selectedRows;
                //console.log(this.state.MaintenanceType);
            },
        }
        const detailNum=this.state.detailNum;
        return(

            <span>
                <span onClick={this.handleMaintanceDetail} className="blue">详情</span>
                <Modal title='详情' visible={this.state.detailVisible}
                       width="1010px"
                       closable={false}
                       centered={true}
                       maskClosable={false}
                       footer={{detailNum}?[<CancleButton key='cancle' flag={1} handleCancel={this.handleCancel2} />]:
                       [<CancleButton key='cancle' flag={1} handleCancel={this.handleCancel2} />,
                           <SaveButton key="define" handleClick={this.handleClick}/>,]
                       }
                >
                    <div >
                <div className='Rowofadd'>
                    <div className='divofadd'>
                        <b>计划名称</b>
                        <Input
                            id='Planname_add'
                            disabled={true}
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
                            disabled={true}
                            value={this.props.depName}
                        />
                    </div>
                    <div className='divofadd1'>
                        <b>设备名称/编号</b>
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
                        <b>保养周期</b>
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
                        <b>本次计划执行日期</b>
                        <Input
                            id='ImplementDate_add'
                            disabled={true}
                            placeholder='请选择日期'
                            key="ImplementDate" name="ImplementDate"
                            value={this.state.ImplementDate}
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
                            dataSource={d2}
                            size="small"
                            scroll={{ y: 240 }}
                            rowSelection={MaintenanceTypeSelection}
                            bordered={true}
                        />
                    </div>
                </div>
                <div id='Effective_add' style={{display:'inline'}}>&nbsp;&nbsp;&nbsp;&nbsp;<b>是否生效:</b>&nbsp;&nbsp;
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
            dataIndex: 'number',
            key:'number',
            width: "10%"
        },
        {
            title: '保养项目',
            dataIndex: 'maintanencetype',
            key:'maintanencetype',
            width: "20%"
        },
        {
            title: '保养内容',
            dataIndex: 'maintanencecontent',
            key:'maintanencecontent',
            width: "40%"
        },
        {
            title: '频次',
            dataIndex: 'frequency',
            key:'frequency',
            width: "30%",
        },
    ];
}

export default DetailofMain