import React from 'react';
import {Modal, Popover, Steps, Table} from 'antd';
import WhiteSpace from '../../../../BlockQuote/whiteSpace';
import axios from 'axios';
import CancleButton from "../../../../BlockQuote/cancleButton";
import "./completed.css"

const Step = Steps.Step

class Detail extends React.Component{
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
    url
    constructor(props){
        super(props)
        this.state = {
            visible: false,
            depCode:'2',
            dataSource : [],
            name:'',
            time:'',
            previewVisible:false,
            previewImage: '',
            detailData: {
                deviceMaintenanceRecordHead: [],
                deviceMaintenanceRecordDetails: [],
                deviceMaintenanceAccessory: [],
                planData:''
            },
            abnormalContent:''
        };
        this.fetch = this.fetch.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDetail = this.handleDetail.bind(this);
        this.footer = this.footer.bind(this)
    }
    colums1=[{
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
    colums2=[{
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
            key: 'depName',
            dataIndex: 'depName',
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
            if(res) {
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
                id:this.props.code.code
            }
        }).then((data) => {
            const res=data.data.data ? data.data.data : [];
            if(res){
                let detailData = this.state.detailData;
                const deviceMaintenanceRecordHead = res.deviceMaintenanceRecordHead;
                deviceMaintenanceRecordHead['deviceName'] = deviceMaintenanceRecordHead.deviceName + '/#' + deviceMaintenanceRecordHead.fixedassetsCode;
                deviceMaintenanceRecordHead['setPeople'] = res.setPeople ? res.setPeople : '';
                deviceMaintenanceRecordHead['depName'] = this.props.code.depName;
                detailData.deviceMaintenanceRecordHead.push(deviceMaintenanceRecordHead);
                const deviceMaintenanceRecordDetails = res.deviceMaintenanceRecordDetails;
                let abnormalContent = deviceMaintenanceRecordHead.abnormalcontent;

                detailData.deviceMaintenanceRecordDetails = deviceMaintenanceRecordDetails;
                const deviceMaintenanceAccessory = res.deviceMaintenanceAccessory
                detailData.deviceMaintenanceAccessory = deviceMaintenanceAccessory
                detailData.planData = '本次计划时间：' + deviceMaintenanceRecordHead.planDate
                detailData.receiveDate = deviceMaintenanceRecordHead.receiveDate
                detailData.finishiDate = deviceMaintenanceRecordHead.finishiDate
                this.setState({
                    detailData:detailData,
                    visible:true,
                    abnormalContent:abnormalContent
                })
            }
        })
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
        const abnormalContent = this.state.abnormalContent;
        return (
            <div style={{textAlign: 'left'}}>{`备注：` + abnormalContent}</div>
        )
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const customDot = (dot)=>(
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
                            rowKey={item => item.code}
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
                        <div style={{height:'170px',marginBottom:'2px',marginTop:'2px'}}>
                            <Table
                                rowKey={item => item.code}
                                className="eqQueryCompleted-table"
                                size="small"
                                columns={this.colums1}
                                dataSource={this.state.detailData.deviceMaintenanceRecordDetails}
                                bordered
                                pagination={false}
                                scroll={{ y: 150 }}
                                footer={this.footer}
                            />
                        </div>

                        <div className="eqQueryCompleted-title" style={{paddingTop:"5"}}>配件使用</div>
                        <div style={{height:'170px',marginTop:'10px'}}>
                            <Table className="eqQueryCompleted-table"
                                   rowKey={item => item.code}
                                   size="small"
                                   columns={this.colums2}
                                   dataSource={this.state.detailData.deviceMaintenanceAccessory}
                                   bordered
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
