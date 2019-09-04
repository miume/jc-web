import React from 'react';
import {Modal,Radio,Divider} from 'antd';
import WhiteSpace from '../BlockQuote/whiteSpace';
import axios from 'axios';
import CancleButton from "../BlockQuote/cancleButton";
import "./plan.css"

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
    }

    fetch = (id) => {
        // console.log(id)
        axios({
            url:`${this.url.devicePatrolPlan.detail}`,
            method:"GET",
            params:{planId:id},
            headers:{
                'Authorization':this.url.Authorization
            },
        }).then((data) => {
            // console.log(data)
            const res = data.data.data;
            // console.log(res)
            if(res){
                this.setState({
                    workshop:res.detpName,
                    data:res,
                    devicePatrolPlanRecordLocationDetailsList:res.devicePatrolPlanRecordLocationDetailsList,
                    devicePatrolPlanRecordItemDetailsList:res.devicePatrolPlanRecordItemDetailsList,
                    planName:res.devicePatrolPlanRecordHead.planName,
                    checkType:res.devicePatrolPlanRecordHead.checkType,
                    planDate:res.devicePatrolPlanRecordHead.planTime,
                    modelName:res.modelName,
                    setPeople:res.devicePatrolPlanRecordHead.setPeople,
                    tabulatedate:res.devicePatrolPlanRecordHead.tabulatedate
                })
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    /**处理一条详情记录 */
    handleDetail = () => {
        this.fetch(this.props.code)
        this.setState({
          visible: true
        });
    }
    handleCancel = () => {
        this.setState({
        visible: false
        });
    }

    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        return (
            <span>
                <span onClick={this.handleDetail} className="blue">详情</span>
                <Modal title='详情' visible={this.state.visible}
                    width="800px"
                    closable={false} centered={true}
                    maskClosable={false}
                    footer={[
                        <CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />,
                    ]}
                >
                    <div>
                        <span className="headers">所属车间：</span><span className="checkName">{this.state.workshop}</span>
                        <span className="headers">计划名称：</span><span className="checkName">{this.state.planName}</span>
                        <span className="headers">巡检模板名称：</span><span className="checkName">{this.state.modelName}</span>
                        <div>
                            <span className="headers">检查类型：</span><span className="checkName">{this.state.checkType?"机械类":"电气类"}</span>
                            <span className="headers">计划日期：</span><span className="checkName">{this.state.planDate}</span>
                            <span className="headers">制表人：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span className="checkName">{this.state.setPeople?this.state.setPeople:"管理员"}</span>
                        </div>
                        <div>
                            <span className="headers">制表日期：</span><span className="checkName">{this.state.tabulatedate?this.state.tabulatedate:"空"}</span>
                        </div>
                        <div style={{display:"flex"}}>
                        <b className="headers">巡检项目：</b>
                        <table className="planTable">
                            <thead className="planHead">
                                <tr><th>序号</th><th>巡检内容</th><th>巡检项目</th></tr>
                            </thead>
                            <tbody>
                        {
                            this.state.devicePatrolPlanRecordItemDetailsList.map((value,item)=>{
                                return (<tr key={item}>
                                    <td>{item}</td>
                                    <td>{value.patrolContent}</td>
                                    <td>{value.patrolItem}</td>
                                </tr>)
                            })
                        }
                            </tbody>
                        </table>
                        <b className="headers">巡检区域：</b>
                        <table className="planTable">
                            <thead className="planHead">
                                <tr><th>序号</th><th>巡检位置</th></tr>
                            </thead>
                            <tbody>
                        {
                            this.state.devicePatrolPlanRecordLocationDetailsList.map((value,item)=>{
                                return (<tr key={item}>
                                    <td>{item}</td>
                                    <td>{value.patrolContent}</td>
                                </tr>)
                            })
                        }
                            </tbody>
                        </table>
                        </div>
                    </div>
                </Modal>
            </span>
        )
    }
}


export default Detail