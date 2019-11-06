import React from 'react';
import {Modal, Table,message} from 'antd';
import axios from 'axios';
import CancleButton from "../../../BlockQuote/cancleButton";

class Detail extends React.Component{
    url
    constructor(props){
        super(props)
        this.state = {
            workshop:"",
            planName:"",
            planDate:"",
            templateName:"",
            checkType:"",
            createName:"",
            createDate:"",
            devicePatrolPlanRecordLocationDetailsList:[],
            devicePatrolPlanRecordItemDetailsList:[],
            data:"",
            visible:false,
            modelName:"",
            setPeople:"",
            tabulatedate:""
        }
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

    fetch = (id) => {
        axios({
            url:`${this.url.devicePatrolPlan.detail}`,
            method:"GET",
            params:{planId:id},
            headers:{
                'Authorization':this.url.Authorization
            },
        }).then((data) => {
            const res = data.data.data;
            if(res){
                let {devicePatrolPlanRecordLocationDetailsList,devicePatrolPlanRecordItemDetailsList,devicePatrolPlanRecordHead} = res;
                for(let i = 0; i < devicePatrolPlanRecordLocationDetailsList.length; i++) {
                    devicePatrolPlanRecordLocationDetailsList[i]['index'] = i + 1;
                }
                for(let j = 0; j < devicePatrolPlanRecordItemDetailsList.length; j++) {
                    devicePatrolPlanRecordItemDetailsList[j]['index'] = j + 1;
                }
                this.setState({
                    workshop:res.detpName,
                    data:res,
                    devicePatrolPlanRecordLocationDetailsList:devicePatrolPlanRecordLocationDetailsList,
                    devicePatrolPlanRecordItemDetailsList:devicePatrolPlanRecordItemDetailsList,
                    planName:devicePatrolPlanRecordHead.planName,
                    checkType:devicePatrolPlanRecordHead.checkType,
                    planDate:devicePatrolPlanRecordHead.planTime,
                    modelName:res.modelName,
                    setPeople:res.tabPeopleName,
                    tabulatedate:devicePatrolPlanRecordHead.tabulatedate
                })
            }
        }).catch(()=>{
            message.info('查询失败，请联系管理员！')
        })
    }

    /**处理一条详情记录 */
    handleDetail = () => {
        this.fetch(this.props.code)
        this.setState({
          visible: true
        });
    };

    handleCancel = () => {
        this.setState({
        visible: false
        });
    }

    getTitle() {
        return '巡检项目';
    }

    getTitle1() {
        return '巡检区域';
    }

    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        return (
            <span>
                <span onClick={this.handleDetail} className="blue">详情</span>
                <Modal title='详情' visible={this.state.visible}
                    width="980px"
                    closable={false} centered={true}
                    maskClosable={false}
                    footer={[
                        <CancleButton key='cancel' flag={1} handleCancel={this.handleCancel} />,
                    ]}
                >
                    <div>
                        <span className="headers">所属车间：</span><span className="checkName">{this.state.workshop}</span>
                        <span className="headers">计划名称：</span><span className="checkName">{this.state.planName}</span>
                        <span className="headers1">巡检模板名称：</span><span className="checkName">{this.state.modelName}</span>
                        <div>
                            <span className="headers">检查类型：</span><span className="checkName">{this.state.checkType?"机械类":"电气类"}</span>
                            <span className="headers">计划日期：</span><span className="checkName">{this.state.planDate}</span>
                            <span className="headers1">制表人：</span><span className="checkName">{this.state.setPeople?this.state.setPeople:"空"}</span>
                        </div>
                        <div>
                            <span className="headers">制表日期：</span><span className="checkName">{this.state.tabulatedate?this.state.tabulatedate:"空"}</span>
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
                    </div>
                </Modal>
            </span>
        )
    }
}

export default Detail
