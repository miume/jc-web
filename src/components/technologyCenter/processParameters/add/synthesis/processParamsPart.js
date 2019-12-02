import React from 'react';
import {Col, Select, Table, Input, Checkbox} from "antd";
import axios from "axios";
const { TextArea} = Input, {Option} = Select;

class ProcessParamsPart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productionData: [],
            productionLineData: [],
            productionLineCode: ''
        };
        this.getProduction = this.getProduction.bind(this);
        this.getProductionLine = this.getProductionLine.bind(this);
        this.productionLineChange = this.productionLineChange.bind(this);
        this.getSynthesisSlotNumber= this.getSynthesisSlotNumber.bind(this);
        this.columns = [{
            title: '实际镍钴锰溶液流量(L/min)',
            dataIndex: 'flowStandard1',
            key: 'flowStandard1',
            width: '19%',
            render: (text,record) => {
                return (
                    <div style={{display:'flex'}}>
                        <Input name={`flowStandard1-${record.index}`} value={text} onChange={this.props.inputChange}/>
                        <span className='process-params-table-part-symbol'>±</span>
                        <Input name={`flowBias1-${record.index}`} value={record.flowBias1} onChange={this.props.inputChange}/>
                    </div>
                )
            },
            className: 'process-params-table-part-td'
        },{
            title: '实际镍钴锰溶液流量(L/min)2',
            dataIndex: 'flowStandard2',
            key: 'flowStandard2',
            width: '19%',
            render: (text,record) => {
                return (
                    <div style={{display:'flex'}}>
                        <Input name={`flowStandard2-${record.index}`} value={text} onChange={this.props.inputChange}/>
                        <span className='process-params-table-part-symbol'>±</span>
                        <Input name={`flowBias2-${record.index}`} value={record.flowBias2} onChange={this.props.inputChange}/>
                    </div>
                )
            },
            className: 'process-params-table-part-td'
        },{
            title: '转速(转/分)',
            dataIndex: 'rotateSpeedStandard',
            key: 'rotateSpeedStandard',
            width: '8%',
            render: (text,record) => {
                return (
                    <div style={{display:'flex'}}>
                        <Input name={`rotateSpeedStandard-${record.index}`} value={text} onChange={this.props.inputChange}/>
                        <span className='process-params-table-part-symbol'>±</span>
                        <Input name={`rotateSpeedBias-${record.index}`} value={record['rotateSpeedBias']} onChange={this.props.inputChange}/>
                    </div>
                )
            },
            className: 'process-params-table-part-td'
        },{
            title: '温度(℃)',
            dataIndex: 'temperatureStandard',
            key: 'temperatureStandard',
            width: '8%',
            render: (text,record) => {
                return (
                    <div style={{display:'flex'}}>
                        <Input name={`temperatureStandard-${record.index}`} value={text} onChange={this.props.inputChange}/>
                        <span className='process-params-table-part-symbol'>±</span>
                        <Input name={`temperatureBias-${record.index}`} value={record['temperatureBias']} onChange={this.props.inputChange}/>
                    </div>
                )
            },
            className: 'process-params-table-part-td'
        },{
            title: '碱度(g/L)',
            dataIndex: 'basicityStandard',
            key: 'basicityStandard',
            width: '8%',
            render: (text,record) => {
                return (
                    <div style={{display:'flex'}}>
                        <Input name={`basicityStandard-${record.index}`} value={text} onChange={this.props.inputChange}/>
                        <span className='process-params-table-part-symbol'>±</span>
                        <Input name={`basicityBias-${record.index}`} value={record['basicityBias']} onChange={this.props.inputChange}/>
                    </div>
                )
            },
            className: 'process-params-table-part-td'
        },{
            title: '氨气流量(L/N)',
            dataIndex: 'nitrogenFlowStandard',
            key: 'nitrogenFlowStandard',
            width: '9%',
            render: (text,record) => {
                return (
                    <div style={{display:'flex'}}>
                        <Input name={`nitrogenFlowStandard-${record.index}`} value={text} onChange={this.props.inputChange}/>
                        <span className='process-params-table-part-symbol'>±</span>
                        <Input name={`nitrogenFlowBias-${record.index}`} value={record['nitrogenFlowBias']} onChange={this.props.inputChange}/>
                    </div>
                )
            },
            className: 'process-params-table-part-td'
        },{
            title: '粒度(um)D70',
            dataIndex: 'sizeD70',
            key: 'sizeD70',
            width: '9%',
            render: (text,record) => {
                return <Input name={`sizeD70-${record.index}`} value={text} onChange={this.props.inputChange}/>
            },
            className: 'process-params-table-part-td'
        },{
            title: '粒度(um)D30',
            dataIndex: 'sizeD30Standard',
            key: 'sizeD30Standard',
            width: '9%',
            render: (text,record) => {
                return (
                    <div style={{display:'flex'}}>
                        <Input name={`sizeD30Standard-${record.index}`} value={text} onChange={this.props.inputChange}/>
                        <span className='process-params-table-part-symbol'>±</span>
                        <Input name={`sizeD30Bias-${record.index}`} value={record['sizeD30Bias']} onChange={this.props.inputChange}/>
                    </div>
                )
            },
            className: 'process-params-table-part-td'
        },{
            title: '粒度(um)D90',
            dataIndex: 'sizeD90',
            key: 'sizeD90',
            width: '9%',
            render: (text,record) => {
                return <Input name={`sizeD90-${record.index}`} value={text} onChange={this.props.inputChange}/>
            },
            className: 'process-params-table-part-td'
        }]
    }

    render() {
        let {productionData,productionLineData,materialData} = this.state, {detail,memoChange} = this.props,
            index = detail ? detail[0]['index'] : -1,
            productionLineClass = {
                display: 'flex',
                flexDirection: 'space-between',
                margin: '10px 0'
            }, productionLineSpan = {
                display: 'inline-block',
                width: '77px'
            };
        return (
            <div className={'process-params-table-part'}>
                <div>
                    <span>生产品种：</span>
                    <Select style={{width: 200}} placeholder={'请选择'}>
                        {
                            productionData ? productionData.map(e => e) : null
                        }
                    </Select>
                    <span style={{float: 'right'}} className='blue' onClick={() => this.props.deleteItem(index)}>删除</span>
                </div>
                <div style={productionLineClass}>
                    <span style={productionLineSpan}>生产线：</span>
                    <Checkbox.Group style={{ width: '100%',lineHeight: '20px'}} onChange={this.productionLineChange}>
                        {
                            productionLineData ? productionLineData.map(e => {
                                return <Col span={2} key={e.code}><Checkbox value={e.code}>{e.name}</Checkbox></Col>
                            }) : null
                        }
                    </Checkbox.Group>
                </div>
                <div style={productionLineClass}>
                    <span>合成槽号：</span>
                    {
                        materialData ? materialData.map(e => <span style={{paddingRight: '5px'}} key={e.materialCode}>{e.materialName}</span>) : null
                    }
                </div>
                <Table dataSource={detail} columns={this.columns} size={'small'}
                       rowKey={record => record.index} bordered pagination={false}/>
                <div style={{marginTop:5}}>
                    <TextArea rows={2} name={`processParamsMemo`} placeholder={'请输入备注'} onChange={memoChange}/>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.getProduction();
        this.getProductionLine();
    }

    /**获取生产品种*/
    getProduction() {
        axios({
            url: `${this.props.url.productionBatchRule.getDetail}?code=5`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then((data) => {
            const res = data.data.data ? data.data.data : [], productionData = [];
            if (res) {
                for(let i = 0; i < res.length; i++) {
                    let e = res[i];
                    productionData.push(
                        <Option key={e.code}>{e.ruleDesc}</Option>
                    )
                }
                this.setState({
                    productionData: productionData
                })
            }
        });
    }

    getProductionLine() {
        axios({
            url: `${this.props.url.precursorProductionLine.all}?code=5`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
            if(res) {
                this.setState({
                    productionLineData: res
                })
            }
        })
    }

    /**监控生产线的变化*/
    productionLineChange(value) {
        this.getSynthesisSlotNumber(value);
        this.setState({
            productionLineCode: value
        })
    }

    /**根据生产线id获取合成槽号*/
    getSynthesisSlotNumber(ids) {
        axios({
            url: `${this.props.url.techLineCellMap.byIds}`,
            method: 'post',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            data: ids,
            type:'application/json'
        }).then((data) => {
            let res = data.data.data ? data.data.data : [], materialData = [];
            for(let i = 0; i < res.length; i++) {
                let materialDTOS = res[i]['materialDTOS'];
                for(let j = 0; j < materialDTOS.length; j++) {
                    materialData.push(materialDTOS[j]);
                }
            }
            this.setState({
                materialData: materialData
            })
        })
    }

    componentWillUnmount() {
        this.setState(() => null)
    }
}

export default ProcessParamsPart;
