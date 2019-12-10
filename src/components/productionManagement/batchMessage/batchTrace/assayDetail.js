import React from "react";
import {Modal, Table,Button,Select, Divider} from "antd";
import axios from 'axios';
import CancleButton from "../../../BlockQuote/cancleButton";
import "./batchTrace.css"

class AssayDetail extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            data:[{
                index:1,
                testItem:"Ca",
                result:0.001,
                unit:"g/ml"
            }]
        }
        this.column = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            align:'center',
            width: '25%',
        },{
            title: '检测项目',
            dataIndex: 'testItem',
            key: 'testItem',
            align:'center',
            width: '25%',
        },{
            title: '检测结果',
            dataIndex: 'result',
            key: 'result',
            align:'center',
            width: '25%',
        },{
            title: '计量单位',
            dataIndex: 'unit',
            key: 'unit',
            align:'center',
            width: '25%',
        }]
    }
    handleDetail = () =>{
        this.setState({
            visible:true
        })
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
                    width="800px"
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
                            <tr>
                                <td>EcT/139</td>
                                <td>镍矿石</td>
                                <td>2018年11月11日</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <br />
                    样品名称：镍矿石样品
                    <br /><br />
                    <Table pagination={false} dataSource={this.state.data} columns={this.column} size="small" bordered rowKey={record=>record.index}/>
                    <Divider />
                    <div style={{float:"left"}}>
                        <div>检验人：王小红</div>
                        <div>检验日期：2018年11月12日</div>
                    </div>
                    <div style={{marginBottom:"5px"}} className="qulified"><span>合格</span></div>
                    <Divider />
                    <div>审核人：王小红</div>
                    <div>审核意见：数据正常，审核通过</div>
                    <div>审核日期：2018年11月12日</div>
                </Modal>
            </div>
        )
    }
}

export default AssayDetail