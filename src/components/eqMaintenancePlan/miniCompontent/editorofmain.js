import React from 'react';
import {Modal, Input, InputNumber, DatePicker, TreeSelect, Table, Radio, message} from 'antd';
import moment from 'moment'

import CancleButton from "../../BlockQuote/cancleButton";
import SaveButton from "../../BlockQuote/saveButton";
import '../blockCompontent/style.css'
import axios from "axios";
class EditorofMain extends React.Component{
    d2 = [];
    url = JSON.parse(localStorage.getItem('url'));
    date1='';
    state = {
        editorVisible:false,
        PlanName1:``,
        departmentname:``,
        deviceNameAndNum:``,
        dataOfDepartment:[],
        MaintenancePeriod:``,
        ImplementDate:``,
        NextPlanDate:``,
        MaintenanceType:[],
        Effective: ``,
        deviceNameAndNumdata:[],
        whomade:``,
    };
    //点编辑的时候设置状态
    handlemounteditor=()=>{
        this.setState({deviceNameAndNum:this.props.editorRecord.deviceNameAndNum})
        this.setState({deviceNameAndNumdata:[]})
        this.setState({PlanName1:this.props.editorRecord.PlanName1})
        this.setState({whomade:this.props.editorRecord.whomade})
        this.setState({departmentname:this.props.departmente.departmentname})
        this.setState({MaintenanceType:['1','2']})
        this.setState({MaintenancePeriod:this.props.editorRecord.MaintenancePeriod})
        this.setState({ImplementDate:this.props.editorRecord.ImplementDate})
        this.setState({Effective:this.props.editorRecord.Effective})
        console.log(this.state.departmentname)
    }
    render(){
        const dateFormat = 'YYYY-MM-DD';
        const MaintenanceTypeSelection={
            onChange: (selectedRowKeys, selectedRows) => {
                //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.state.MaintenanceType=selectedRowKeys;

                console.log(this.state.MaintenanceType);
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
                        <TreeSelect
                            id='department_add'
                            key="department"
                            name="department"
                            placeholder="请选择"
                            style={{ width: 200 }}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            onChange={this.handledepartmentnameChange}
                            treeData={this.state.dataOfDepartment}
                            value={this.state.departmentname}
                            treeNodeLabelProp='value'
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
                            dataSource={this.d2}
                            pagination={this.pagination}
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
    getDepartmentData = () => {
        // TODO：调接口，获取部门数据
        axios({
            url: `${this.url.equipmentDept.dept}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            }
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
            var dataSource = [{
                title: '总公司',
                value:'总公司',
                key:'总公司',
                children: []
            }];
            if (res) {
                for (let i = 0; i < res.length; i++) {
                    const arrParent = res[i].parent;
                    var parenObj = {
                        title:arrParent.name,
                        value: arrParent.name,
                        key:arrParent.name,
                        children: []
                    };
                    const arrSon = res[i].son;
                    for (let j = 0; j < arrSon.length; j++) {
                        var arr = arrSon[j];
                        if(i===0&&j===0){
                            parenObj['children'].push({
                                title:arr.name.toString(),
                                key:arr.name,
                                value:  arrParent.name.toString()+'-'+arr.name.toString(),
                                children: []
                            });
                        }else{
                            parenObj['children'].push({
                                title:arr.name.toString(),
                                key:arr.name,
                                value: arrParent.name.toString()+'-'+arr.name.toString(),
                                children: []
                            });
                        }
                    }
                    dataSource[0].children.push(parenObj);
                }

                this.setState({
                    dataOfDepartment: dataSource
                })
                console.log(this.state.dataOfDepartment)
            } else {

            }
        });
    };

    handlePlanName1Change=(e)=>{
        this.setState({PlanName1:e.target.value})
    }
    handledepartmentnameChange=(value)=>{
        this.setState({departmentname:value})
        //console.log(this.state.departmentname)
    }
    handleDeviceNameAndNumChange=(value)=>{
        this.setState({deviceNameAndNum:value})
        console.log(value);
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
        this.setState({editorVisible:true})
        for(let i = 1; i < 5; i++) {
            this.d2.push({
                index: i,
                maintanencetype: `Edward King ${i}`,
                maintanencecontent: 32,
                frequency: `Park Lane No.${i}`,
                code:i
            });
        }
        this.getDepartmentData();
        const d3=this.props.editorRecord;
        this.date1=Date.parse(this.props.editorRecord.ImplementDate)
        var date2=this.date1+(this.state.MaintenancePeriod * 24* 3600* 1000)
        var time = new Date(date2);
        let Y=time.getFullYear()
        let M=(time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1)
        let D=time.getDate() < 10 ? '0' + time.getDate() + '' : time.getDate() + '' // 日
        this.setState({NextPlanDate:Y+'-'+M+'-'+D})
        this.handlemounteditor()
    }
    //点击返回
    handleCancel2=()=>{
        this.setState({editorVisible:false});
        this.d2=[];
    }    ;
    //点击保存
    handleCreate=()=>{
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
    pagination = {
        total:this.d2.length,
        showSizeChanger: true,
        itemRender(current, type, originalElement){
            if (type === 'prev') {
                return <a>&nbsp;&nbsp;上一页&nbsp;&nbsp;</a>;
            }
            if (type === 'next') {
                return <a>&nbsp;&nbsp;下一页&nbsp;&nbsp;</a>;
            }
            return originalElement;
        },
        showTotal(total){
            return `共${total}条记录`
        },
    };
}

export default EditorofMain