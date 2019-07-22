import React from 'react';
import {Table, Modal, Steps, Popover} from 'antd';
import WhiteSpace from '../../BlockQuote/whiteSpace';
import axios from 'axios';
import CancleButton from "../../BlockQuote/cancleButton";
import "./completed.css"

const Step = Steps.Step

class Detail extends React.Component{
    url
    constructor(props){
        super(props)
        this.state = {
            visible: false,
            depCode:'2',
            dataSource : [],
            detailData:[],
            name:'',
            time:'',
            previewVisible:false,
            previewImage: '',
        };
        this.fetch = this.fetch.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDetail = this.handleDetail.bind(this);
        this.dateA=''
    }
    acolums=[{
        title:'序号',
        key:'code',
        dataIndex:'code',
        align:'center',
    },{
        title:'保养项目',
        dataIndex:'maintenanceItems',
        key:'maintenanceitems',
        align:'center',
    },{
        title:'保养内容',
        dataIndex:'maintenanceContent',
        key:'maintenanceContent',
        align:'center',
    },{
        title:'保养情况',
        dataIndex:'mainValues',
        key:'mainValues',
        align:'center',
    }
    ]
    bcolums=[{
        title:'序号',
        key:'index',
        dataIndex:'index',
        align:'center',
    },{
        title:'配件名称',
        dataIndex:'name',
        key:'name',
        align:'center',
    },{
        title:'配件规格',
        dataIndex:'specification',
        key:'specification',
        align:'center',
    },{
        title:'配件数量',
        dataIndex:'counts',
        key:'counts',
        align:'center',
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
            width:130,
        },
        {
            title: '保养完成日期',
            key: 'finishDate',
            dataIndex: 'finishDate',
            align:'center',
            width:130,
        },
        {
            title: '保养人',
            key: 'maintPeople',
            dataIndex: 'maintPeople',
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
        this.fetch(this.props.batchNumberId)
        this.setState({
            visible: true
        });
        const params ={
            Id:this.props.planCode
        }
        axios({
            url:`${this.props.url.eqmaintenance.recordDetail}`,
            method:'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then((data) => {
            const res=data.data.data ? data.data.data : [];
            if(res){
                this.setState({detailData:res})
                this.dateA="本次计划执行日期:"+this.state.detailData.deviceMaintenanceAccessory.receiveDate
            }else{

            }

        })
    }
    handleCancel() {
        this.setState({
            visible: false
        });
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
      //   const data = [
      //       {
      //           odd_number:'by12345',
      //           number:'管道阀门/#1001',
      //           department:'制造一部',
      //           date:'2019-07-18',
      //           time:'2019-07-17 10:00',
      //           deadline:'2019-8-17',
      //           someone:'ww',
      //       }]
      // var adata=[{
      //     index:1,
      //     project:'管道阀门',
      //     context:'畅通、不漏液',
      //     condition:'异常',
      // }]
      //   var bdata=[{
      //       index:1,
      //       name:'配件名称',
      //       standards:'配件规格',
      //       number:'配件数量',
      //   }]
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
                    <div>

                        <Table
                            className="eqQueryCompleted-table"
                            size="small"
                            columns={this.columns}
                            dataSource={this.state.detailData.deviceMaintenanceRecordHead}
                            bordered
                            pagination={false}
                            style={{marginBottom:"20"}}
                        />

                        <WhiteSpace />
                        <Steps size="small" current={2} progressDot={customDot}>
                            <Step title="制定计划" description={this.dateA}/>

                            <Step title="已接单" description=''/>
                            <Step title="已完成" description= ''/>

                        </Steps>

                        <Table
                            className="eqQueryCompleted-table"
                            size="small"
                            columns={this.acolums}
                            dataSource={this.state.detailData.deviceMaintenanceRecordDetails}
                            bordered
                            pagination={false}
                            style={{marginBottom:"20"}}
                          //  footer={() =>  {this.state.detailData.deviceMaintenanceAccessory.abnormalcontent}}
                         />

                        <div className="eqQueryCompleted-title" style={{paddingTop:"20"}}>配件使用</div>

                        <Table className="eqQueryCompleted-table"
                             size="small"
                             columns={this.bcolums}
                             dataSource={this.state.detailData.deviceMaintenanceAccessory}
                             bordered
                             pagination={false}
                         />

                    </div>

                </Modal>
            </span>
        )
    }
}

export default Detail