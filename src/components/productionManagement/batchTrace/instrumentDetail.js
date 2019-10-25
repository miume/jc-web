import React from "react";
import {Modal, Table,Button} from "antd";
import axios from 'axios';
import CancleButton from "../../BlockQuote/cancleButton";

class InstrumentDetail extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state={
            data:[{
                type:"PH",
                minValue:"14",
                maxValue:"14",
                averageValue:"14"
            }],
            visible:false,
            tableDisplay:"block",
            pictureDisplay:"none",
            valueType:"primary",
            picType:"default"
        };
        this.column = [{
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            align:'center',
            width: '25%',
        },{
            title: '最小值',
            dataIndex: 'minValue',
            key: 'minValue',
            align:'center',
            width: '25%',
        },{
            title: '最大值',
            dataIndex: 'maxValue',
            key: 'maxValue',
            align:'center',
            width: '25%',
        },{
            title: '平均值',
            dataIndex: 'averageValue',
            key: 'averageValue',
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
    valueChange=()=>{
        // console.log(111)
        this.setState({
            tableDisplay:"block",
            pictureDisplay:"none",
            valueType:"primary",
            picType:"default",
        })
    }
    picChange=()=>{
        // console.log(111)
        this.setState({
            tableDisplay:"none",
            pictureDisplay:"block",
            valueType:"default",
            picType:"primary",
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        return(
            <div>
                <span onClick={this.handleDetail} className="blue">详情</span>
                <Modal
                    title='仪器仪表详情'
                    visible={this.state.visible}
                    width="1000px"
                    closable={false} centered={true}
                    maskClosable={false}
                        footer={[
                            <CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />,
                        ]}
                >
                    批次信息：<span>19M01001806TE4S</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    合成槽号：<span>00001</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span style={{float:"right",display:"inlineBlock"}}>
                    <Button type={this.state.valueType} style={{width:"80px",height:"35px"}} onClick={this.valueChange}>统计值</Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button type={this.state.picType} style={{width:"80px",height:"35px"}} onClick={this.picChange}>图表</Button>
                    </span>
                    <br /><br />
                    <div style={{display:this.state.tableDisplay}}>
                    <Table columns={this.column} dataSource={this.state.data} pagination={false} size="small" bordered rowKey={record=>record.type}/>
                    </div>
                    <div style={{display:this.state.pictureDisplay}}>
                        11111
                    </div>
                </Modal>
            </div>
        )
    }
}

export default InstrumentDetail