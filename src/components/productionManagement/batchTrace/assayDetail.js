import React from "react";
import {Modal, Table,Button,Select, Divider,message} from "antd";
import axios from 'axios';
import CancleButton from "../../BlockQuote/cancleButton";
import "./batchTrace.css"
import IsQualified from '../../BlockQuote/isQualified'
import DetailStateModal from '../../qualityProcess/dataEntry/intermediateProductTest/detailStateModal'
class AssayDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            data:[],
            headData:[],
            sampleName:undefined,
            tester:undefined,
            isQualified:undefined,
            examine: {       //审核数据
                batchNumberId: '',
                examineStatus: '',
                examineData: []
            },
        }
        this.column = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: '10%',
        },{
            title: '检测项目',
            dataIndex: 'name',
            key: 'name',
            width: '25%',
        },{
            title: '检测结果',
            dataIndex: 'testItemResultRecord.testResult',
            key: 'testItemResultRecord.testResult',
            width: '25%',
        },{
            title: '计量单位',
            dataIndex: 'unit',
            key: 'unit',
            width: '20%',
        },{
            title: '状态',
            dataIndex: 'isAudit',
            key: 'isAudit',
            width: '15%',
            render:(text)=>{
                if(text===0){
                    return '最近审核未通过'
                }
                else if(text===1){
                    return '通过'
                }
                else{
                    return '未审核'
                }
            }
        }]
        this.getData=this.getData.bind(this);
        this.handleData=this.handleData.bind(this);
    }
    componentWillUnmount() {
        this.setState = () => {
          return ;
        }
      }   
    getData(){
        let {sampleCode,assayTypeId}=this.props.record
        if(assayTypeId===2){//中间品
            axios({
                url:`${this.props.url.intermediateProduct}/details/${sampleCode}`,
                method:'get',
                headers:{
                    'Authorization':this.props.url.Authorization
                },

            }).then(data=>{
                let res=data.data.data
                this.handleData(res)
            }).catch(()=>{
                message.error('操作失败，请联系管理员')
            })
        }
        else if(assayTypeId===1){//原材料
            axios({
                url:this.props.url.rawTestReport.getById,
                method:'get',
                headers:{
                    'Authorization':this.props.url.Authorization
                },
                params:{
                    id:sampleCode
                }
            }).then(data=>{
                let res=data.data.data
                this.handleData(res)
            })
        }
        else{//成品
            // axios({
            //     url:this.props.url.productInspection.details,
            //     method:'get',
            //     headers:{
            //         'Authorization':this.props.url.Authorization
            //     },
            //     params:{
            //         id:sampleCode
            //     }
            // }).then()
        }
    }
    handleData(res){
        let isQualified=0
        if(res){
            isQualified = res.testReportRecord?res.testReportRecord.isQualified:'';
            const examineStatus = res.commonBatchNumber?res.commonBatchNumber.status:'';
            const batchNumberId = res.commonBatchNumber?res.commonBatchNumber.id:'';
            let headData=[]
            headData.push({
                serialNumber:res.serialNumber,
                type:res.materialName,
                sampleDeliveringDate:res.sampleDeliveringRecord?res.sampleDeliveringRecord.sampleDeliveringDate:undefined
            })
            if(examineStatus===2||examineStatus===3){//审核通过，审核未通过,调用待办事项流程审核结果
                axios({
                    url:`${this.props.url.toDoList}/${batchNumberId}/result`,
                    method:'get',
                    headers:{
                        'Authorization':this.props.url.Authorization
                    }
                }).then(data=>{
                    let res=data.data.data
                    if(res){
                        this.setState({
                            examine: {
                                batchNumberId:batchNumberId,
                                examineStatus: examineStatus,
                                examineData: res
                            }
                        })
                    }
                })
            }
            else{
                this.setState({
                    examine: {
                        batchNumberId:batchNumberId,
                        examineStatus: examineStatus,
                        examineData: []
                    },
                })
            }
            this.setState({
                headData:headData,
                sampleName:res.materialName,
                tester:res.tester,
                judgeDate:res.testReportRecord?res.testReportRecord.judgeDate:undefined
            })
        }
        if(res&&res.testDTOS){
            for(let i=0;i<res.testDTOS.length;i++){
                res.testDTOS[i]['index']=i+1
            }
            this.setState({
                data:res.testDTOS
            })
        }
    }
    handleDetail = () =>{
        this.setState({
            visible:true
        })
        this.getData()
    }
    handleCancel = ()=>{
        this.setState({
        visible: false
        });
    }
    render(){
        return(
            <div>
                <span onClick={this.handleDetail} className="blue">详情</span>
                <Modal
                    title='化验数据详情'
                    visible={this.state.visible}
                    width="500px"
                    closable={false} centered={true}
                    maskClosable={false}
                        footer={[
                            <CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />,
                        ]}
                >
                    <div className="interDrSpanModalTop">
                        <table>
                            <thead>
                            <tr>
                                <th>编号</th>
                                <th>原材料</th>
                                <th>送样日期</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.headData?this.state.headData.map((item,index)=>{
                                    return(
                                        <tr key={index}>
                                            <td>{item.serialNumber}</td>
                                            <td>{item.type}</td>
                                            <td>{item.sampleDeliveringDate}</td>
                                    </tr>
                                    )
                                }):null
                            }
                            </tbody>
                        </table>
                    </div>
                    <br />
                    样品名称：{this.state.sampleName}
                    <br /><br />
                    <Table pagination={false} dataSource={this.state.data} columns={this.column} size="small" bordered rowKey={record=>record.index}/>
                    <Divider />
                    <div style={{float:"left"}}>
                        <div>检验人：{this.state.tester}</div>
                        <div>检验日期：{this.state.judgeDate}</div>
                    </div>
                    <IsQualified status={this.state.isQualified}/>
                    <Divider />
                    <DetailStateModal
                    data={this.state.examine}
                />
                </Modal>
            </div>
        )
    }
}

export default AssayDetail