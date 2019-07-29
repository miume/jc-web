import React from 'react';
import {Table, Modal, Steps, Popover} from 'antd';
import WhiteSpace from '../../BlockQuote/whiteSpace';
import axios from 'axios';
import CancleButton from "../../BlockQuote/cancleButton";
import "./completed.css"

const Step = Steps.Step

class Detail extends React.Component{
    url
    ind = [];
    constructor(props){
        super(props)
        this.state = {
            visible: false,
            depCode:'2',
            dataSource : [],
            // detailData:[],
            name:'',
            time:'',
            previewVisible:false,
            previewImage: '',
            detailData: {
                deviceMaintenanceRecordHead:[],
                deviceMaintenanceRecordDetails: [],
                deviceMaintenanceAccessory:[],
                planData:''
            },
            abnormalContent:[]
        };
        this.fetch = this.fetch.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDetail = this.handleDetail.bind(this);
        this.footer = this.footer.bind(this)
    }
    acolums=[{
        title:'序号',
        key:'index',
        dataIndex:'index',
        sorter: (a, b) => a.index - b.index,
        align:'center',
        width:50
    },{
        title:'保养项目',
        dataIndex:'maintenanceItems',
        key:'maintenanceItems',
        align:'center',
        width:160
    },{
        title:'保养内容',
        dataIndex:'maintenanceContent',
        key:'maintenanceContent',
        align:'center',
        width:160
    },{
        title:'保养情况',
        dataIndex:'mainContent',
        key:'mainContent',
        align:'center',
        width:160
    }
    ]
    bcolums=[{
        title:'序号',
        key:'index',
        dataIndex:'index',
        sorter: (a, b) => a.index - b.index,
        align:'center',
        width:50
    },{
        title:'配件名称',
        dataIndex:'name',
        key:'name',
        align:'center',
        width:160
    },{
        title:'配件规格',
        dataIndex:'specification',
        key:'specification',
        align:'center',
        width:160
    },{
        title:'配件数量',
        dataIndex:'counts',
        key:'counts',
        align:'center',
        width:160
    }
    ]
    columns= [
        {
            title: '保养单号',
            dataIndex: 'planCode',
            key: 'planCode',
            align:'center',
            width:130,
            height:0.5,
        },
        {
            title: '设备名称/编号',
            dataIndex: 'deviceName',
            key: 'deviceName',
            align:'center',
            width:130,
        },
        {
            title: '所属部门',
            align:'center',
            key: 'deptCode',
            dataIndex: 'deptCode',
            width:130,
        },
        {
            title: '本次计划执行日期',
            key: 'planDate',
            align:'center',
            dataIndex: 'planDate',
            width:130,
        },
        {
            title: '接单时间',
            key: 'receiveDate',
            dataIndex: 'receiveDate',
            align:'center',
            width:130,
        },
        {
            title: '保养完成日期',
            key: 'finishiDate',
            dataIndex: 'finishiDate',
            align:'center',
            width:130,
        },
        {
            title: '保养人',
            key: 'setPeople',
            dataIndex: 'setPeople',
            align:'center',
            width:150,
        }]

    fetch = (id) => {
        axios({
            url:`${this.url.instructor.instructorAll}/`+ parseInt(id),
            method:"GET",
        }).then((data) => {
            const res = data.data.data;
            if(res){
                this.setState({
                    data : res.content,
                    name : res.instructorName,
                    time : res.effectiveDate
                })
            }
        })
    }

    /**处理一条详情记录 */
    handleDetail() {
        axios({
            url:`${this.props.url.eqMaintenanceQuery.recordDetail}`,
            method:'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params:{
                id:this.props.code
            }
        }).then((data) => {
            const res=data.data.data ? data.data.data : [];
            if(res){
                var detailData = this.state.detailData
                const deviceMaintenanceRecordHead=res.deviceMaintenanceRecordHead
                detailData.deviceMaintenanceRecordHead.push({
                    planCode:deviceMaintenanceRecordHead.planCode,
                    deviceName:deviceMaintenanceRecordHead.deviceName + '/#' + deviceMaintenanceRecordHead.fixedassetsCode,
                    deptCode:deviceMaintenanceRecordHead.deptCode ,
                    planDate:deviceMaintenanceRecordHead.planDate,
                    receiveDate:deviceMaintenanceRecordHead.receiveDate,
                    finishiDate:deviceMaintenanceRecordHead.finishiDate,
                })
                if(res.setPeople){
                detailData.deviceMaintenanceRecordHead.push({
                    setPeople:res.setPeople
                })}
                else{
                    detailData.deviceMaintenanceRecordHead.push({
                        setPeople:''
                    })
                    }
                const deviceMaintenanceRecordDetails=res.deviceMaintenanceRecordDetails
                var abnormalContent = this.state.abnormalContent
                for(var i = 0 ; i<deviceMaintenanceRecordDetails.length; i++){
                    const arr = deviceMaintenanceRecordDetails[i]
                    if(arr.mainValues===1){
                        abnormalContent.push(arr.mainContent)
                    }
                }
                detailData.deviceMaintenanceRecordDetails = deviceMaintenanceRecordDetails
                const deviceMaintenanceAccessory=res.deviceMaintenanceAccessory
                detailData.deviceMaintenanceAccessory =deviceMaintenanceAccessory
                detailData.planData = '本次计划时间：' + deviceMaintenanceRecordHead.planDate
                detailData.receiveDate = deviceMaintenanceRecordHead.receiveDate
                detailData.finishiDate = deviceMaintenanceRecordHead.finishiDate
                this.setState({
                    detailData:detailData,
                    visible:true,
                    abnormalContent:abnormalContent
                })
            }else{

            }

        })
        // this.fetch(this.props.batchNumberId)
        // this.setState({
        //     visible: true
        // });
        // const params ={
        //     Id:this.props.planCode
        // }
        // axios({
        //     url:`${this.props.url.eqmaintenance.recordDetail}`,
        //     method:'get',
        //     headers: {
        //         'Authorization': this.props.url.Authorization
        //     }
        // }).then((data) => {
        //     const res=data.data.data ? data.data.data : [];
        //     if(res){
        //         this.setState({detailData:res})
        //         this.dateA="本次计划执行日期:"+this.state.detailData.deviceMaintenanceAccessory.receiveDate
        //     }else{
        //
        //     }
        //
        // })
    }
    handleCancel() {
        this.setState({
            visible: false,
            detailData: {
                deviceMaintenanceRecordHead:[],
                deviceMaintenanceRecordDetails: [],
                deviceMaintenanceAccessory:[],
                planData:''
            },
            abnormalContent:[]
        });
    }
    footer = () => {
        const abnormalContent = this.state.abnormalContent
        if(abnormalContent.length===0){
            return null
        }else{

            return abnormalContent
        }
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        var adata={ };
        var bdata={ };
        const customDot = (dot,{status,index})=>(
            <Popover visible={this.state.visible1} >
                {dot}
            </Popover>
        )
        return(
            <span>
                <span onClick={this.handleDetail} className='blue'>详情</span>
                <Modal title='保养工单详情' visible={this.state.visible}
                       width="1020px"
                       closable={false} centered={true}
                       maskClosable={false}
                       footer={[
                           <CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />,
                       ]}
                >
                    <div style={{maxHeight:'550px'}}>

                        <Table
                            className="eqQueryCompleted-table"
                            size="small"
                            columns={this.columns}
                            dataSource={this.state.detailData.deviceMaintenanceRecordHead}
                            bordered
                            pagination={false}
                            style={{marginBottom:"35"}}
                        />

                        <WhiteSpace />
                        <Steps size="small" current={2} progressDot={customDot} className="eqQueryCompleted-step">
                            <Step title="制定计划" description={this.state.detailData.planData}/>
                            <Step title="已接单" description={this.state.detailData.receiveDate}/>
                            <Step title="已完成" description= {this.state.detailData.finishiDate}/>
                        </Steps>
                        <WhiteSpace />
                        <div style={{maxHeight:'150px',marginBottom:'2px',marginTop:'2px'}}>
                            <Table

                                className="eqQueryCompleted-table"
                                size="small"
                                columns={this.acolums}
                                dataSource={this.state.detailData.deviceMaintenanceRecordDetails}
                                bordered
                                pagination={false}
                               // style={{tr height:'10'}}
                                scroll={{ y: 150 }}
                                 footer={this.footer}
                            />
                        </div>

                        <div className="eqQueryCompleted-title" style={{paddingTop:"5"}}>配件使用</div>
                        <div style={{maxHeight:'150px',marginTop:'10px'}}>
                            <Table className="eqQueryCompleted-table"
                                   size="small"
                                   columns={this.bcolums}
                                   dataSource={this.state.detailData.deviceMaintenanceAccessory}
                                   bordered
                                 //  style={{marginTop:"20"}}
                                   pagination={false}
                                   scroll={{ y: 150 }}
                            />
                        </div>

                    </div>

                </Modal>
            </span>
        )
    }
}

export default Detail