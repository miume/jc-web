import React from 'react';
import {Modal, Input, message, DatePicker, Table} from 'antd';
import axios from 'axios';
import CancleButton from "../../../../BlockQuote/cancleButton";
import moment from "moment";
import locale from 'antd/lib/date-picker/locale/zh_CN';
import SaveButton from "../../../../BlockQuote/saveButton";

class Edit extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            planName:'',
            dastSource:{},
            modelName:"",
            checkType:"",
            planTime:"",
            tabPeopleName:"",
            tabulatedate:"",
            devicePatrolPlanRecordItemDetailsList:[],
            devicePatrolPlanRecordLocationDetailsList:[]
        }
        this.onChange = this.onChange.bind(this);
        this.getTitle = this.getTitle.bind(this);
        this.getTitle1 = this.getTitle1.bind(this);
        this.column1 = [{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b) =>a.id-b.id,
            width:'20%',
        },{
            title:'巡检项目',
            dataIndex:'patrolItem',
            key:'patrolItem',
            width:'40%'
        },{
            title:'巡检内容',
            dataIndex:'patrolContent',
            key:'patrolContent',
            width:'40%'
        }];

        this.column2 = [{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b) =>a.id-b.id,
            width:'20%',
        },{
            title:'巡检位置',
            dataIndex:'locationName',
            key:'locationName',
            width:'75%'
        }]
    }
    onChangeTime = (date) =>{
        this.setState({
            planTime:moment(date).format('YYYY-MM-DD')
        })
    }

    handleCancel = () => {
        this.setState({
            visible: false,
            });
    };

    handleCreate = () => {
        axios({
            url : `${this.url.devicePatrolPlan.update}`,
            method:'put',
            params:{planId:this.props.planId,planName:this.state.planName,planDate:this.state.planTime},
            type:'json'
        }).then((data)=>{
            if(data.data.code !== 0){
                message.info('更新失败')
                this.setState({
                  visible:true
                })
              }else{
                message.info(data.data.message);
                this.props.getTableData();
                this.setState({
                    visible: false,
                });
              }
        })
    };

    onChange(e){
        const value = e.target.value;
        this.setState({planName:value});
    }

    showModal = () => {
        axios({
            url:`${this.url.devicePatrolPlan.detail}`,
            method:"get",
            params:{planId:parseInt(this.props.planId)},
            type:"json"
        }).then((data)=>{
            var res = data.data.data;
            for(let i = 0; i < res.devicePatrolPlanRecordLocationDetailsList.length; i++) {
                res.devicePatrolPlanRecordLocationDetailsList[i]['index'] = i + 1;
            }
            for(let j = 0; j < res.devicePatrolPlanRecordItemDetailsList.length; j++) {
                res.devicePatrolPlanRecordItemDetailsList[j]['index'] = j + 1;
            }
            this.setState({
                deptName:res.detpName,
                visible: true,
                planName:res.devicePatrolPlanRecordHead.planName,
                modelName:res.modelName,
                checkType:res.devicePatrolPlanRecordHead.checkType,
                planTime:res.devicePatrolPlanRecordHead.planTime,
                tabPeopleName:res.tabPeopleName,
                tabulatedate:res.devicePatrolPlanRecordHead.tabulatedate,
                devicePatrolPlanRecordItemDetailsList:res.devicePatrolPlanRecordItemDetailsList,
                devicePatrolPlanRecordLocationDetailsList:res.devicePatrolPlanRecordLocationDetailsList
            })
        })
    };

    getTitle() {
        return '巡检项目';
    }

    getTitle1() {
        return '巡检区域';
    }

    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        let {updateFlag}=this.props
        return(
            <span>
                <span className={updateFlag?'blue':'hide'} onClick={this.showModal}>编辑</span>
                <Modal
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    title="编辑"
                    width='1000px'
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <SaveButton key="define" handleSave={this.handleCreate} className='fa fa-check' />,
                    ]}
                >
                    <div>
                        <span className="headers">所属车间：</span><span className="checkName">{this.state.deptName}</span>
                        <span className="headers">计划名称：</span><span><Input style={{width:"200px"}} placeholder="请输入计划名称" onChange={this.onChange} value={this.state.planName}/></span>
                        <span className="headers1">巡检模板名称：</span><span className="checkName">{this.state.modelName}</span>
                    </div>
                    <div>
                        <span className="headers">检查类型：</span><span className="checkName">{this.state.checkType === false?"机械类":"电气类"}</span>
                        <span className="headers">计划日期：</span><span><DatePicker format="YYYY-MM-DD" defaultValue={moment(this.state.planTime,'YYYY-MM-DD')} value={moment(this.state.planTime,'YYYY-MM-DD')} locale={locale} showTime={true} onChange={this.onChangeTime} placeholder="请选择时间"/></span>
                        <span className="headers1">制表人：</span><span className="checkName">{this.state.tabPeopleName===""?"空":this.state.tabPeopleName}</span>
                    </div>
                    <div>
                        <span className="headers">制表日期：</span><span className="checkName">{this.state.tabulatedate===null?"空":this.state.tabulatedate}</span>
                    </div>
                    <Table
                        title = {this.getTitle}
                        columns={this.column1}
                        rowKey={record => record.code}
                        size="small"
                        dataSource={this.state.devicePatrolPlanRecordItemDetailsList}
                        bordered
                        scroll={{y: 150}}
                        pagination={false}
                        className={'inspection-detail-table'}
                    />
                    <Table
                        title = {this.getTitle1}
                        columns={this.column2}
                        rowKey={record => record.code}
                        size="small"
                        dataSource={this.state.devicePatrolPlanRecordLocationDetailsList}
                        bordered
                        scroll={{y: 150}}
                        pagination={false}
                        className={'inspection-detail-table'}
                    />
                </Modal>
            </span>
        )
    }
}

export default Edit
