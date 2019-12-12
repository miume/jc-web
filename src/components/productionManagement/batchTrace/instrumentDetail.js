import React from "react";
import {Modal, Table,Button,Select} from "antd";
import axios from 'axios';
import CancleButton from "../../BlockQuote/cancleButton";
import ReactEcharts from 'echarts-for-react';

class InstrumentDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            visible:false,
            tableDisplay:"block",
            pictureDisplay:"none",
            detailTableDisplay:'none',
            valueType:"primary",
            picType:"default",
            detailType:'default',
            batch:undefined,
            cellNum:undefined,
            xData:[],
            seriesData:[],
            selectValue:'phValue',
            selectName:'PH',
            res:undefined ,//图表的数据
            detailData:[]//图表明细数据
        };
        this.column = [{
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            width: '25%',
        },{
            title: '最小值',
            dataIndex: 'minValue',
            key: 'minValue',
            width: '25%',
        },{
            title: '最大值',
            dataIndex: 'maxValue',
            key: 'maxValue',
            width: '25%',
        },{
            title: '平均值',
            dataIndex: 'averageValue',
            key: 'averageValue',
            width: '25%',
        }]
        this.column1=[{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: '4%',
        },{
            title: '时间',
            dataIndex: 'sampleTime',
            key: 'sampleTime',
            width: '10%',
        },{
            title: 'PH',
            dataIndex: 'phValue',
            key: 'phValue',
            width: '5%',
        },{
            title: '温度(℃)',
            dataIndex: 'temperature',
            key: 'temperature',
            width: '5%',
        },{
            title: '盐流量1(kg/h)',
            dataIndex: 'saltFlow1',
            key: 'saltFlow1',
            width: '6%',
        },{
            title: '盐流量2(kg/h)',
            dataIndex: 'saltFlow2',
            key: 'saltFlow2',
            width: '6%',
        },{
            title: '盐流量3(kg/h)',
            dataIndex: 'saltFlow3',
            key: 'saltFlow3',
            width: '6%',
        },{
            title: '盐流量4(kg/h)',
            dataIndex: 'saltFlow4',
            key: 'saltFlow4',
            width: '6%',
        },{
            title: '氨碱1(kg/h)',
            dataIndex: 'ammoniaBases1',
            key: 'ammoniaBases1',
            width: '6%',
        },{
            title: '氨碱2(kg/h)',
            dataIndex: 'ammoniaBases2',
            key: 'ammoniaBases2',
            width: '7%',
        },{
            title: '氨水(kg/h)',
            dataIndex: 'ammoniaWater',
            key: 'ammoniaWater',
            width: '5%',
        },{
            title: '氨气(kpa)',
            dataIndex: 'ammoniaGas',
            key: 'ammoniaGas',
            width: '5%',
        },{
            title: '含固量(g/l)',
            dataIndex: 'solidContainingContent',
            key: 'solidContainingContent',
            width: '7%',
        },{
            title: '变频器显示(Hz)',
            dataIndex: 'transducerShow',
            key: 'transducerShow',
            width: '7%',
        }]
        this.detaiTableChange=this.detaiTableChange.bind(this);
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
                // {
                //     type:'3c测量值',
                //     minValue:res.measured3cMin,
                //     maxValue:res.measured3cMax,
                //     averageValue:res.measured3cAvg
                // }
            ]
                this.setState({
                    cellNum:res.cellNum,
                    data:dataSource
                })
                axios({
                    url:this.props.url.productionBatchInfo.getInstrumentChart,
                    method:'get',
                    headers:{
                        'Authorization':this.props.url.Authorization
                    },
                    params:{
                        cellNum:res.cellNum,
                        startTime:this.props.record.startTime,
                        endTime:this.props.record.endTime
                    }
                }).then(data=>{
                    let res=data.data.data
                    if(res){
                        let xData=[],
                        seriesData=[]
                        for(let i=0;i<res.length;i++){
                            seriesData.push(res[i].phValue) //默认显示ph
                            xData.push(res[i].sampleTime)
                           res[i]['index']=(i+1)
                        }
                        this.setState({
                            xData:xData,
                            seriesData:seriesData,
                            res:res,
                            detailData:res
                        })
                    }
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
            detailTableDisplay:'none',
            valueType:"primary",
            picType:"default",
            detailType:'default'
        })
    }
    picChange=()=>{
        this.setState({
            tableDisplay:"none",
            pictureDisplay:"block",
            detailTableDisplay:'none',
            valueType:"default",
            picType:"primary",
            detailType:'default'
        })
        
        
    }
    detaiTableChange(){
        this.setState({
            tableDisplay:"none",
            pictureDisplay:"none",
            detailTableDisplay:'block',
            valueType:"default",
            picType:"default",
            detailType:'primary'
        })
    }
    getOption = () =>{
        let{xData,selectValue,seriesData,selectName}=this.state
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
                color: ['#dc150c'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: [selectName]
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
                        name: '工序时间',
                       // axisTick: {show: false},
                       boundaryGap: false,
                        data: xData
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '值（单位）',
                    }
                ],
                series: [
                    {
                        name: selectName,
                        type: 'line',
                       // barGap: 0,
                        data: seriesData
                    },
                 
                ]
            }
        )
    };
    selectChange = (value,name) =>{
        let {res}=this.state
        let seriesData=[]
        name=name.props.children
        for(let i=0;i<res.length;i++){
            seriesData.push(res[i][value])  
        }
        this.setState({
            selectValue:value,
            seriesData:seriesData,
            selectName:name
        })
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
                    <div style={{height:'615px'}}>
                        批次信息：<span>{this.props.record.batch}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                        合成槽号：<span>{this.state.cellNum}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                        <span style={{float:"right",display:"inlineBlock"}}>
                        <Button type={this.state.valueType} style={{width:"80px",height:"35px"}} onClick={this.valueChange}>统计值</Button>
                        &nbsp;&nbsp;
                        <Button type={this.state.picType} style={{width:"80px",height:"35px"}} onClick={this.picChange}>图表</Button>
                        &nbsp;&nbsp;
                        <Button type={this.state.detailType} style={{width:"80px",height:"35px"}} onClick={this.detaiTableChange}>表格显示</Button>
                        </span>
                        <br /><br />
                        <div style={{display:this.state.tableDisplay}}>
                        <Table columns={this.column} dataSource={this.state.data} pagination={false} size="small" bordered rowKey={record=>record.type}/>
                        </div>
                        <div style={{display:this.state.pictureDisplay}}>
                            请选择类型：
                            <Select placeholder="请选择类型" defaultValue="phValue" onChange={this.selectChange} style={{width:"200px"}}>
                                <Select.Option value="phValue">PH</Select.Option>
                                <Select.Option value="temperature">温度(℃)</Select.Option>
                                <Select.Option value="saltFlow1">盐流量1(kg/h)</Select.Option>
                                <Select.Option value="saltFlow2">盐流量2(kg/h)</Select.Option>
                                <Select.Option value="saltFlow3">盐流量3(kg/h)</Select.Option>
                                <Select.Option value="saltFlow4">盐流量4(kg/h)</Select.Option>
                                <Select.Option value="ammoniaBases1">氨碱1(kg/h)</Select.Option>
                                <Select.Option value="ammoniaBases2">氨碱2(kg/h)</Select.Option>
                                <Select.Option value="ammoniaWater">氨水(kg/h)</Select.Option>
                                <Select.Option value="ammoniaGas">氨气(kpa)</Select.Option>
                                <Select.Option value="solidContainingContent">含固量(g/l)</Select.Option>
                                <Select.Option value="transducerShow">变频器显示(Hz)</Select.Option>
                                <Select.Option value="measured3c">3c测量值</Select.Option>
                            </Select>
                            <br /><br />
                            <div className='statis-processCompare-echarts' ><ReactEcharts option={this.getOption()} style={{width:'100%',height: '100%'}}/></div>  
                        </div>
                        <div style={{display:this.state.detailTableDisplay}} >
                              <Table columns={this.column1} dataSource={this.state.detailData} pagination={false} size="small" bordered rowKey={record=>record.index}/>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default InstrumentDetail