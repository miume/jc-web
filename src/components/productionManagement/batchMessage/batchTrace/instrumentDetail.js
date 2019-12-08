import React from "react";
import {Modal, Table,Button,Select} from "antd";
import axios from 'axios';
import CancleButton from "../../../BlockQuote/cancleButton";
import ReactEcharts from 'echarts-for-react';

class InstrumentDetail extends React.Component{
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
        axios({
            url:this.props.url.productionBatchInfo.getInstrument,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                instrumentCode:this.props.record.instrumentCode
            }
        }).then(data=>{
            let res=data.data.data
            if(res){
                let dataSource=[{
                    type:'PH',
                    minValue:res.phValueMin,
                    maxValue:res.phValueMax,
                    averageValue:res.phValueAvg
                },{
                    type:'温度(℃)',
                    minValue:res.temperatureMin,
                    maxValue:res.temperatureMax,
                    averageValue:res.temperatureAvg
                },{
                    type:'盐流量1(kg/h)',
                    minValue:res.saltFlow1Min,
                    maxValue:res.saltFlow1Max,
                    averageValue:res.saltFlow1Avg
                },{
                    type:'盐流量2(kg/h)',
                    minValue:res.saltFlow2Min,
                    maxValue:res.saltFlow2Max,
                    averageValue:res.saltFlow2Avg
                },{
                    type:'盐流量3(kg/h)',
                    minValue:res.saltFlow3Min,
                    maxValue:res.saltFlow3Max,
                    averageValue:res.saltFlow3Avg
                },{
                    type:'盐流量4(kg/h)',
                    minValue:res.saltFlow4Min,
                    maxValue:res.saltFlow4Max,
                    averageValue:res.saltFlow4Avg
                },{
                    type:'氨碱1(kg/h)',
                    minValue:res.ammoniaBases1Min,
                    maxValue:res.ammoniaBases1Max,
                    averageValue:res.ammoniaBases1Avg
                },{
                    type:'氨碱2(kg/h)',
                    minValue:res.ammoniaBases2Min,
                    maxValue:res.ammoniaBases2Max,
                    averageValue:res.ammoniaBases2Avg
                },{
                    type:'氨水(kg/h)',
                    minValue:res.ammoniaWaterMin,
                    maxValue:res.ammoniaWaterMax,
                    averageValue:res.ammoniaWaterAvg
                },{
                    type:'氨气(kpa)',
                    minValue:res.ammoniaGasMin,
                    maxValue:res.ammoniaGasMax,
                    averageValue:res.ammoniaGasAvg
                },{
                    type:'含固量(g/l)',
                    minValue:res.solidContainingContentMin,
                    maxValue:res.solidContainingContentMax,
                    averageValue:res.solidContainingContentAvg
                },{
                    type:'变频器显示(Hz)',
                    minValue:res.transducerShowMin,
                    maxValue:res.transducerShowMax,
                    averageValue:res.transducerShowAvg
                },
                {
                    type:'3c测量值',
                    minValue:res.measured3cMin,
                    maxValue:res.measured3cMax,
                    averageValue:res.measured3cAvg
                }]
                this.setState({
                    cellNum:res.cellNum,
                    data:dataSource
                })
            }
        })
    }
    handleCancel = ()=>{
        this.setState({
        visible: false
        });
    }
    valueChange=()=>{
        this.setState({
            tableDisplay:"block",
            pictureDisplay:"none",
            valueType:"primary",
            picType:"default",
        })
    }
    picChange=()=>{
        this.setState({
            tableDisplay:"none",
            pictureDisplay:"block",
            valueType:"default",
            picType:"primary",
        })
        axios({
            url:this.props.url.productionBatchInfo.getInstrumentChart,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                startTime:this.props.record.startTime,
                endTime:this.props.record.endTime
            }
        }).then(data=>{})
    }

    getOption = () =>{
        var labelOption = {
            normal: {
                show: true,
                formatter: '{c}  {name|{a}}',
                fontSize: 16,
                rich: {
                    name: {
                        textBorderColor: '#fff'
                    }
                }
            }
        };
        return (
            {
                color: ['#003366', '#006699', '#dc150c'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['Ni', 'Co', 'Mn']
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        name: '周期数',
                        axisTick: {show: false},
                        data: ['2012', '2013', '2014', '2015', '2016']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '含量（T）',
                    }
                ],
                series: [
                    {
                        name: 'Ni',
                        type: 'line',
                        barGap: 0,
                        label: labelOption,
                        data: [320, 332, 301, 334, 390]
                    },
                    {
                        name: 'Co',
                        type: 'line',
                        label: labelOption,
                        data: [220, 182, 191, 234, 290]
                    },
                    {
                        name: 'Mn',
                        type: 'line',
                        label: labelOption,
                        data: [150, 232, 201, 154, 190]
                    }
                ]
            }
        )
    };
    handleChange = (e) =>{
        console.log(e)
    }
    render(){
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
                    请选择类型：<Select placeholder="请选择类型" defaultValue="PH" onChange={this.handleChange} style={{width:"120px"}}>
                        <Select.Option value="PH">PH</Select.Option>
                        <Select.Option value="温度">温度</Select.Option>
                        <Select.Option value="氨气">氨气</Select.Option>
                    </Select>
                    <ReactEcharts option={this.getOption()}/>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default InstrumentDetail