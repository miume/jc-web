import React from 'react';
import { Button, Modal,Select,Form, Input,message,Icon,Col, Row,Upload,Radio,Divider,DatePicker } from 'antd';
import axios from 'axios';
import AddButton from '../../BlockQuote/newButton';
import CancleButton from "../../BlockQuote/cancleButton";
import SaveButton from "../../BlockQuote/saveButton";
import "../plan.css";
import moment from "moment";
import locale from 'antd/lib/date-picker/locale/zh_CN';

class Edit extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            planName:'',
            // planDate:'',
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
    }
    onChangeTime = (date, dateString) =>{
        // console.log(moment(date).format('YYYY-MM-DD'))
        // console.log(moment(undefined).format('YYYY-MM-DD HH:mm:ss'))
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
                this.props.getTableData({
                    page:this.props.pagination.current,
                    size:this.props.pagination.pageSize,
                    deptId:parseInt(this.props.deptCode),
                    status:0
                })
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
        // console.log(this.props.planId)
        axios({
            url:`${this.url.devicePatrolPlan.detail}`,
            method:"get",
            params:{planId:parseInt(this.props.planId)},
            type:"json"
        }).then((data)=>{
            var res = data.data.data;
            this.setState({
                dastSource:res,
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

    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        return(
            <span>
                <span className='blue' onClick={this.showModal}>编辑</span>
                <Modal
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    title="编辑"
                    width='800px'
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <SaveButton key="define" handleSave={this.handleCreate} className='fa fa-check' />,
                    ]}
                >
                    <div>
                        <span className="headers">所属车间：</span><span style={{backgroundColor:"#D6D6D6"}} className="checkName">{this.props.deptName}</span>
                        <span className="headers">计划名称：</span><span style={{width:"152px"}}><Input style={{width:"152px"}} placeholder="请输入计划名称" onChange={this.onChange} value={this.state.planName} className="checkName" /></span>
                        <span className="headers "style={{marginLeft:"10px"}}>巡检模板名称：</span><span style={{ width: "152px",backgroundColor:"#D6D6D6" }} className="checkName">{this.state.modelName}</span>
                    </div>
                    <div>
                        <span className="headers">检查类型：</span><span style={{backgroundColor:"#D6D6D6"}} className="checkName">{this.state.checkType === false?"机械类":"电气类"}</span>
                        <span className="headers">计划日期：</span><span style={{width:"152px"}}><DatePicker style={{width:"152px"}} format="YYYY-MM-DD" defaultValue={moment(this.state.planTime,'YYYY-MM-DD')} value={moment(this.state.planTime,'YYYY-MM-DD')} locale={locale} showTime={true} style={{width:'200px'}} onChange={this.onChangeTime} placeholder="请选择时间"/></span>
                        <span className="headers">制表人：</span><span style={{ width: "152px",backgroundColor:"#D6D6D6" }} className="checkName">{this.state.tabPeopleName===""?"空":this.state.tabPeopleName}</span>
                    </div>
                    <div>
                        <span className="headers">制表日期：</span><span style={{backgroundColor:"#D6D6D6"}} className="checkName">{this.state.tabulatedate===null?"空":this.state.tabulatedate}</span>
                    </div>
                    <div style={{display:"flex",marginTop:"8px"}}>
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
                                    <td>{value.locationName}</td>
                                </tr>)
                            })
                        }
                            </tbody>
                        </table>
                        </div>
                </Modal>
            </span>
        )
    }
}

export default Edit