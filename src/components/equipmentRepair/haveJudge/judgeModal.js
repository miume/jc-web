import React from 'react';
import {Modal, Table, Steps, Popover, message, Col, Row, Divider, Card} from 'antd'
import {Rate} from 'antd'
import CancleButton from "../../BlockQuote/cancleButton";
import axios from "axios";

class JudgeModal extends React.Component{
    constructor(props){
        super(props)
        this.state={
            visible:false,
            judgeData:'',
            complete:0,
            inTime:0,
            clean:0,
            attitude:0,
        }
    }
    render() {
        return(
            <div >
                <Divider type="vertical" />
                <span className="blue" onClick={this.getJudge}>评价结果</span>
                <Modal
                    title="维修评价"
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    width="350px"
                    footer={[
                        <CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />
                    ]}
                >
                    <Row type="flex" justify="start" style={{paddingTop:"15px"}} >
                        <Col span={1.5} style={{paddingLeft:"20px",paddingTop:"5px"}}>
                                设备修复完好性：
                        </Col>
                        <Col span={1.5} >
                            <Rate disabled defaultValue={this.state.complete} />
                        </Col>
                    </Row>

                    <Row type="flex" justify="start" style={{paddingTop:"15px"}} >
                        <Col span={1.5} style={{paddingLeft:"20px",paddingTop:"7px"}}>
                                维修及时性：
                        </Col>
                        <Col span={1.5} style={{paddingLeft:"28px"}}>
                            <Rate disabled defaultValue={this.state.inTime} />
                        </Col>
                    </Row>

                    <Row type="flex" justify="start" style={{paddingTop:"15px"}} >
                        <Col span={1.5} style={{paddingLeft:"20px",paddingTop:"5px"}}>
                               维修后现场清理：
                        </Col>
                        <Col span={1.5} >
                            <Rate disabled defaultValue={this.state.clean} />
                        </Col>
                    </Row>

                    <Row type="flex" justify="start" style={{paddingTop:"15px"}} >
                        <Col span={1.5} style={{paddingLeft:"20px",paddingTop:"5px"}}>
                                维修服务态度：
                        </Col>
                        <Col span={1.5} style={{paddingLeft:"15px"}}>
                            <Rate disabled defaultValue={this.state.attitude} />
                        </Col>
                    </Row>

                    <Row type="flex" justify="start" style={{paddingTop:"15px"}} >
                    <Card style={{width: 300}}>
                        <p>{this.state.judgeData}</p>
                    </Card>
                    </Row>

                </Modal>
            </div>
        )
    }
    handleCancel=()=>{
        this.setState({
            visible: false
        });
    }

    getJudge = () => {
        console.log(this.props.code)
        axios({
            url:`${this.props.url.equipmentRepair.evaluations}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params:{
                id: this.props.code
            }
        }).then((data) => {
            console.log(data)
            const res = data.data.data.deviceRepairEvaluations ? data.data.data.deviceRepairEvaluations: [];
            if (res) {
                console.log(res)
                var newRowData = res;
                var i
                for(i=0;i<res.length;i++)
                {
                    if(newRowData[i].itemName==="设备修复完好性"){
                        this.setState({
                            complete:newRowData[i].levels
                        })
                    }
                    if(newRowData[i].itemName==="维修及时性"){
                        this.setState({
                            inTime:newRowData[i].levels
                        })
                    }
                    if(newRowData[i].itemName==="维修后现场清理"){
                        this.setState({
                            clean:newRowData[i].levels
                        })
                    }
                    if(newRowData[i].itemName==="维修服务态度"){
                        this.setState({
                            attitude:newRowData[i].levels
                        })
                    }
                }
                this.setState({
                    judgeData:data.data.data.evaluationsResult,
                    visible: true
                })
            } else {
                this.setState({
                    visible: true
                })
            }
        }).catch(() => {
            message.info('数据存在异常，请联系管理员！')
        });
    }
}
export default JudgeModal