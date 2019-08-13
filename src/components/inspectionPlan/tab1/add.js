import React from 'react';
import { Button, Modal,Select,Form, Input,message,Icon,Col, Row,Upload,Radio,Divider,DatePicker } from 'antd';
import axios from 'axios';
import AddButton from '../../BlockQuote/newButton';
import CancleButton from "../../BlockQuote/cancleButton";
import SaveButton from "../../BlockQuote/saveButton";
import "../plan.css";
import moment from "moment";
import locale from 'antd/lib/date-picker/locale/zh_CN';

class AddModal extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            radioValue:undefined,
            date:undefined,
            devicePatrolModelsItemDetailsList:[],
            devicePatrolModelsLocationDetails:[],
            templateName:"",
            planName:"",
            templateData:[],
            checkType:"",
            devicePatrolModelsHead:{}
        }
        this.onChange = this.onChange.bind(this);
    }
    // onChange = (e)=>{
    //     this.setState({
    //         radioValue:e.target.value
    //     })
    // }
    onChangeTime = (date, dateString) =>{
        // console.log(moment(date).format('YYYY-MM-DD'))
        // console.log(moment(undefined).format('YYYY-MM-DD HH:mm:ss'))
        this.setState({
            date:moment(date).format('YYYY-MM-DD')
        })
    }
    showModal = () => {
        axios({
            url:`${this.url.devicePatrolModel.getAllByDeptCode}`,
            method:"get",
            params:{id:parseInt(this.props.deptCode)},
            type:"json"
        }).then((data)=>{
            var res = data.data.data;
            this.setState({
                templateData:res
            })
        })
        this.setState({ visible: true });
    };
    handleCancel = () => {
        this.setState({
            visible: false,
            radioValue:undefined,
            date:"",
            devicePatrolModelsItemDetailsList:[],
            devicePatrolModelsLocationDetails:[],
            templateName:"",
            planName:"",
            checkType:"",
            templateData:[]
            });
    };
    handleCreate = () =>{
        // console.log(parseInt(this.props.deptCode),this.state.planName,this.state.checkType,this.state.date,this.state.devicePatrolModelsHead.code)
        axios({
            url:`${this.url.devicePatrolPlan.add}`,
            method:"post",
            headers:{
                'Authorization': this.url.Authorization
            },
            params:{deptId:parseInt(this.props.deptCode),planName:this.state.planName,checkType:this.state.checkType === false?0:1,planDate:this.state.date,modelId:this.state.devicePatrolModelsHead.code},
            type:"json"
        }).then((data)=>{
            // console.log(data)
            if(data.data.code !== 0){
                message.info('新增失败')
                this.setState({
                    visible: false,
                    radioValue:undefined,
                    date:"",
                    devicePatrolModelsItemDetailsList:[],
                    devicePatrolModelsLocationDetails:[],
                    templateName:"",
                    planName:"",
                    checkType:"",
                    templateData:[]
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
                    radioValue:undefined,
                    date:"",
                    devicePatrolModelsItemDetailsList:[],
                    devicePatrolModelsLocationDetails:[],
                    templateName:"",
                    planName:"",
                    checkType:"",
                    templateData:[]
                });
              }
        })
    }
    onChange(e){
        const value = e.target.value;
        this.setState({planName:value});
    }
    selectChange = (e)=>{
        // const value = e.target.value;
        // console.log(e)
        axios({
            url:`${this.url.devicePatrolModel.detail}`,
            method:"get",
            params:{id:e},
            type:"json"
        }).then((data)=>{
            var res = data.data.data;
            // console.log(res);
            this.setState({
                checkType:res.devicePatrolModelsHead.checkType,
                devicePatrolModelsItemDetailsList:res.devicePatrolModelsItemDetailsList,
                devicePatrolModelsLocationDetails:res.devicePatrolModelsLocationDetails,
                devicePatrolModelsHead:res.devicePatrolModelsHead
            })
        })
        this.setState({radioValue:e});
    }
    checkChange=()=>{

    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        return(
            <span>
                <AddButton handleClick={this.showModal} name='新增' className='fa fa-plus' />
                <Modal
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    title="新增"
                    width='800px'
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <SaveButton key="define" handleSave={this.handleCreate} className='fa fa-check' />,
                    ]}
                >
                    <div>
                        <span className="headers">所属车间：</span><span className="checkName">{this.props.deptName}</span>
                        <span className="headers">计划名称：</span><span style={{width:"152px"}}><Input style={{width:"152px"}} placeholder="请输入计划名称" onChange={this.onChange} value={this.state.planName} className="checkName" /></span>
                        <span className="headers">巡检模板名称：</span><span><Select value={this.state.radioValue} placeholder="请选择巡检模板" style={{ width: "152px" }} onChange={this.selectChange}>{
                            this.state.templateData.map((value,item)=>{
                                return <Select.Option key="item" value={value.devicePatrolModelsHead.code}>{value.devicePatrolModelsHead.patrolName}</Select.Option>
                            })
                        }</Select></span>
                    </div>
                    <div>
                        <span className="headers">检查类型：</span><Input placeholder="请先选择巡检模板" disabled={true} style={{ width: "152px" }} value={this.state.checkType===""?"":this.state.checkType===true?"电气类":"机械类"} onChange={this.checkChange} className="checkName" />
                        <span className="headers">计划日期：</span><span><DatePicker format="YYYY-MM-DD" locale={locale} showTime={true}  style={{width:'200px'}} onChange={this.onChangeTime} placeholder="请选择时间"/></span>
                    </div>
                    <div style={{display:"flex",marginTop:"8px"}}>
                        <b className="headers">巡检项目：</b>
                        <table className="planTable">
                            <thead className="planHead">
                                <tr><th>序号</th><th>巡检内容</th></tr>
                            </thead>
                            <tbody>
                        {
                            this.state.devicePatrolModelsItemDetailsList.map((value,item)=>{
                                return (<tr key={item}>
                                    <td>{item}</td>
                                    <td>{value.patrolContent}</td>
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
                            this.state.devicePatrolModelsLocationDetails.map((value,item)=>{
                                return (<tr key={item}>
                                    <td>{item}</td>
                                    <td>{value.patrolContent}</td>
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

export default AddModal