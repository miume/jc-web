import React from 'react';
import {Modal, Table,message} from 'antd';
import WhiteSpace from '../BlockQuote/whiteSpace';
import CancleButton from "../BlockQuote/cancleButton";
import axios from "axios"
import {acolums,bcolums,ccolumns,willacolums,willbcolums,willccolumus,doingacolums,doingbcolums} from "./columns";
import "./inspectionQuery.css"

class InspectionDetailModal extends React.Component{
    url=JSON.parse(localStorage.getItem('url'));
    constructor(props){
        super(props);
        this.state = {
            footer:'',
            visible: false,
            devicePatrolPlanRecordHead:[],
            devicePatrolPlanRecordItemDetailsList:[],
            devicePatrolPlanRecordLocationDetailsList:[],
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDetail = this.handleDetail.bind(this);
    }
    /**处理一条详情记录 */
    handleDetail() {
        const params={
            id:this.props.record.key,
        };
        console.log(params);
        axios({
            url:this.url.devicePatrolQuery.PatrolQueryDetail,
            method:"get",
            header:{
                'Authorization': this.url.Authorization
            },
            params:params,
        }).then((data)=>{
            console.log(data);
            var data1=[];
            var data2=[];
            var data3=[];
            const result=data.data.data?data.data.data:[];
            if(data.data.code===0){
                const devicePatrolPlanRecordHead=result.devicePatrolPlanRecordHead;
                const devicePatrolPlanRecordItemDetailsList=result.devicePatrolPlanRecordItemDetailsList;
                const devicePatrolPlanRecordLocationDetailsList=result.devicePatrolPlanRecordLocationDetailsList;
                const detpName=result.detpName;
                const modelName=result.modelName;
                const footer1 = `备注: ${devicePatrolPlanRecordHead.patrolComment}`;
                const tabPeopleName=result.tabPeopleName;
                data1.push({
                    key:devicePatrolPlanRecordHead.code,
                    recordCode:devicePatrolPlanRecordHead.code,
                    planName:devicePatrolPlanRecordHead.planName,
                    belongShop:detpName,
                    modalName:modelName,
                    checkType:devicePatrolPlanRecordHead.checkType.toString(),
                    planTime:devicePatrolPlanRecordHead.planTime,
                    getTime:devicePatrolPlanRecordHead.receiveTime,
                    completedTime:devicePatrolPlanRecordHead.finishTime,
                    getPeopleName:tabPeopleName,
                });
                for(var i1=0;i1<devicePatrolPlanRecordItemDetailsList.length;i1++)
                {
                    data2.push({
                        key:devicePatrolPlanRecordItemDetailsList[i1].code,
                        index:i1+1,
                        InspectionContent:devicePatrolPlanRecordItemDetailsList[i1].patrolContent,
                        inspectionResult:devicePatrolPlanRecordItemDetailsList[i1].mainValues,
                        reason:devicePatrolPlanRecordItemDetailsList[i1].mainContent,
                    })
                }
                for(var i2=0;i2<devicePatrolPlanRecordLocationDetailsList.length;i2++)
                {
                    data3.push({
                        key:devicePatrolPlanRecordLocationDetailsList[i2].code,
                        index:i2+1,
                        patrolContent:devicePatrolPlanRecordLocationDetailsList[i2].patrolContent,
                        inspectionLocation:devicePatrolPlanRecordLocationDetailsList[i2].locationName,
                        visitedTime:devicePatrolPlanRecordLocationDetailsList[i2].readIdcardTime,
                    })
                }
                this.setState({
                    devicePatrolPlanRecordHead:data1,
                    devicePatrolPlanRecordItemDetailsList:data2,
                    devicePatrolPlanRecordLocationDetailsList:data3,
                    footer:footer1,
                });
                message.info(data.data.message);
                this.setState({
                    visible:true,
                })
            }
            else{
                message.info("网络错误")
            }
        })
    }
    handleCancel() {
        this.setState({visible: false});
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        if(this.props.status===1){
            return(
                <span>
                <span onClick={this.handleDetail} className='blue'>详情</span>
                <Modal
                    title='设备巡检详情'
                    visible={this.state.visible}
                    width="1120px"
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    footer={[<CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />,]}
                ><div>
                        <Table
                            className="firstinspectiondetailtable"
                            size="small"
                            columns={willacolums}
                            bordered
                            dataSource={this.state.devicePatrolPlanRecordHead}
                            pagination={false}
                        />
                        <WhiteSpace />
                        <b>巡检项目</b>
                        <Table
                            className="secondinspectiondetailtable"
                            size="small"
                            columns={willbcolums}
                            dataSource={this.state.devicePatrolPlanRecordItemDetailsList}
                            bordered
                            pagination={false}
                            rowKey={record => record.code}
                        /><div className="footerofdetail">{this.state.footer}</div>

                        <WhiteSpace />
                        <b>巡检区域</b>
                        <div>
                            <Table className="thirdinspectiondetailtable"
                                   size="small"
                                   columns={willccolumus}
                                   bordered
                                   pagination={false}
                                   rowKey={record => record.code}
                                   dataSource={this.state.devicePatrolPlanRecordLocationDetailsList}
                            />
                        </div>
                    </div>
                </Modal>
            </span>
            )}
            else if(this.props.status===2){
                return(
                    <span>
                <span onClick={this.handleDetail} className='blue'>详情</span>
                <Modal title='设备巡检详情' visible={this.state.visible}
                       width="1120px"
                       closable={false}
                       centered={true}
                       maskClosable={false}
                       footer={[
                           <CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />,
                       ]}
                >
                    <div>
                        <Table
                            className="firstinspectiondetailtable"
                            size="small"
                            columns={doingacolums}
                            dataSource={this.state.devicePatrolPlanRecordHead}
                            bordered
                            rowKey={record => record.code}
                            pagination={false}
                            style={{marginBottom:"35"}}
                        />

                        <WhiteSpace />
                        <b>巡检项目</b>
                        <div>
                            <Table
                                className="secondinspectiondetailtable"
                                size="small"
                                columns={doingbcolums}
                                bordered
                                rowKey={record => record.code}
                                dataSource={this.state.devicePatrolPlanRecordItemDetailsList}
                                pagination={false}
                                scroll={{ y: 150 }}
                            /><div className="footerofdetail">{this.state.footer}</div>
                        </div>
                        <WhiteSpace />
                        <b>巡检区域</b>
                        <div>
                            <Table className="thirdinspectiondetailtable"
                                   size="small"
                                   columns={willccolumus}
                                   bordered
                                   rowKey={record => record.code}
                                   dataSource={this.state.devicePatrolPlanRecordLocationDetailsList}
                                   pagination={false}
                                   scroll={{ y: 50 }}
                            />
                        </div>
                    </div>
                </Modal>
            </span>
                )
            }
        else {
            return(
                <span>
                <span onClick={this.handleDetail} className='blue'>详情</span>
                <Modal title='设备巡检详情' visible={this.state.visible}
                       width="1120px"
                       closable={false}
                       centered={true}
                       maskClosable={false}
                       footer={[
                           <CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />,
                       ]}
                >
                    <div>
                        <Table
                            className="firstinspectiondetailtable"
                            size="small"
                            columns={acolums}
                            bordered
                            rowKey={record => record.code}
                            dataSource={this.state.devicePatrolPlanRecordHead}
                            pagination={false}
                            style={{marginBottom:"35"}}
                        />

                        <WhiteSpace />
                        <b>巡检项目</b>
                        <div>
                            <Table
                                className="secondinspectiondetailtable"
                                size="small"
                                columns={bcolums}
                                bordered
                                rowKey={record => record.code}
                                pagination={false}
                                dataSource={this.state.devicePatrolPlanRecordItemDetailsList}
                                scroll={{ y: 150 }}
                            /><div className="footerofdetail">{this.state.footer}</div>
                        </div>
                        <WhiteSpace />
                        <b>巡检区域</b>
                        <div>
                            <Table className="thirdinspectiondetailtable"
                                   size="small"
                                   columns={ccolumns}
                                   bordered
                                   rowKey={record => record.code}
                                   dataSource={this.state.devicePatrolPlanRecordLocationDetailsList}
                                   pagination={false}
                                   scroll={{ y: 50 }}
                            />
                        </div>
                    </div>
                </Modal>
            </span>
            )
        }
    }
}
export default InspectionDetailModal