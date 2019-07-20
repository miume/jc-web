import React from 'react';
import {Modal, Input, DatePicker, TreeSelect, Table, Radio, InputNumber} from 'antd';
import CancleButton from "../../BlockQuote/cancleButton";
import axios from "axios";
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';
const d2 = [];
const d1={
    "dataOfDepartment":[],
    "mainNumber":'hfht',
    "deviceNameAndNum":'dhfdh',
    "deviceNameAndNumdata":[],
    "PlanName1":'sacascasc',
    "whomade":'casasca',
    "departmentname": 'ascascas',
    "MaintenanceType":[],
    "MaintenancePeriod":'ascasc',
    "NextPlanDate":'scasca',
    "Effective": 0,
}
class DetailofMain extends React.Component{
    url = JSON.parse(localStorage.getItem('url'));
    ob = JSON.parse(localStorage.getItem('menuList'));
    state={
        detailVisible:false,
    }
    treeData=[];



    handleMaintanceDetail=()=>{
        this.setState({detailVisible:true})
        for(let i = 0; i < 2; i++) {
            d2.push({
                number: i,
                maintanencetype: `Edward King ${i}`,
                maintanencecontent: 32,
                frequency: `Park Lane No.${i}`,
            });
        }
    }
    handleCancel2=()=>{
        this.setState({detailVisible:false})
    }
    render(){

        const MaintenanceTypeSelection={
            onChange: (selectedRowKeys, selectedRows) => {
                //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.state.MaintenanceType=selectedRows;
                //console.log(this.state.MaintenanceType);
            },
        }
        return(
            <span>
                <span onClick={this.handleMaintanceDetail} className="blue">详情</span>
                <Modal title='详情' visible={this.state.detailVisible}
                       width="1010px"
                       closable={false}
                       centered={true}
                       maskClosable={false}
                       footer={[<CancleButton key='cancle' flag={1} handleCancel={this.handleCancel2} />,]}
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
                            value={d1.PlanName1}
                        />
                    </div>
                    <div className='divofadd1'>
                        <b>所属部门</b>
                        <TreeSelect
                            id='department_add'
                            key="department"
                            name="department"
                            placeholder="请选择"
                            treeDefaultExpandAll={true}
                            style={{ width: 200 }}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            disabled={true}
                            treeData={d1.dataOfDepartment}
                            value={d1.departmentname}
                            treeNodeLabelProp='value'
                        />
                    </div>
                    <div className='divofadd1'>
                        <b>设备名称/编号</b>
                        <TreeSelect
                            id='deviceNameAndNum_add'
                            key="deviceNameAndNum"
                            name="deviceNameAndNum"
                            style={{ width: 200 }}
                            value={d1.deviceNameAndNum}
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
                            value={d1.MaintenancePeriod}
                            disabled={true}
                            min={0}
                        />
                    </div>
                    <div className='divofadd'>
                        <b>本次计划执行日期</b>
                        <DatePicker
                            id='ImplementDate_add'
                            disabled={true}
                            placeholder='请选择日期'
                            key="ImplementDate" name="ImplementDate"
                            defaultValue={moment(this.state.ImplementDate, dateFormat)}

                        />
                    </div>
                    <div className='divofadd2'>
                        <h4 id='NextPlanDate_add' key="NextPlanDate" name="NextPlanDate">
                            <b>下次计划执行日期:</b>&nbsp;&nbsp;{d1.NextPlanDate}
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
                    <Radio.Group disabled={true} value={d1.Effective}>
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