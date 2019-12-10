import React from "react";
import axios from "axios";
import {Table, message, Spin, Divider,Modal} from "antd";
import CancleButton from "../../BlockQuote/cancleButton";
import MaintenanceDetail from "./maintenanceDetail"

class DeviceMaintenance extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data : [],
            visible:false,
            deviceName: undefined,
            fixedassetsCode: undefined,
            deptName: undefined,
        }
        this.column = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: '7%',
        },{
            title: '保养单号',
            dataIndex: 'maintCode',
            key: 'maintCode',
            width: '12%',
        },{
            title: '本次计划执行日期',
            dataIndex: 'planDate',
            key: 'planDate',
            width: '15%',
        },{
            title: '接单时间',
            dataIndex: 'receiveTime',
            key: 'receiveTime',
            width: '19%',
        },{
            title: '保养完成日期',
            dataIndex: 'finishDate',
            key: 'finishDate',
            width: '15%',
        },{
            title: '保养人',
            dataIndex: 'maintPeople',
            key: 'maintPeople',
            width: '10%',
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align:'center',
            width: '7%',
            render:(text,record)=>{
                return(
                    <span>
                        <MaintenanceDetail  record={record} deptName={this.state.deptName} url={this.props.url}/>
                    </span>
                )
            }
        }]
        this.getTableData=this.getTableData.bind(this);
    }
    componentDidMount(){
        this.getTableData()
    }
    componentWillUnmount(){
        this.setState=()=>{
            return
        }
    }
    getTableData(){
        let {deviceCode,startTime,endTime}=this.props.record
        axios({
            url:this.props.url.eqmaintenance.byConditions,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                startTime:startTime,
                endTime:endTime,
                deviceCode:deviceCode
            }
        }).then(data=>{
            let res=data.data.data
            if(res&&res.dtoList){
                for(let i=0;i<res.dtoList.length;i++){
                    res.dtoList[i]['index']=(i+1)
                }
                this.setState({
                    data:res.dtoList,
                    deviceName: res.deviceName,
                    fixedassetsCode: res.fixedassetsCode,
                    deptName: res.deptName,
                })
            }
        })
    }
    handleDetail = () =>{
        this.setState({
            visible:true
        })
    }
    handleCancel=()=>{
        this.setState({
            visible: false
        });
    }
    render(){
        return(
            <span>
                <span onClick={this.handleDetail} className="blue">保养</span>
                <Modal
                    title='设备保养信息'
                    visible={this.state.visible}
                    width="1000px"
                    closable={false} centered={true}
                    maskClosable={false}
                        footer={[
                            <CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />,
                        ]}
                >
                    <div>设备名称 ：{this.state.deviceName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        固定资产编码：{this.state.fixedassetsCode}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        所属部门：{this.state.deptName}
                    </div><br/>
                    <Table pagination={false} size="small" bordered  dataSource={this.state.data} columns={this.column} rowKey={record=>record.index}/>
                </Modal>
            </span>
        )
    }
}

export default DeviceMaintenance