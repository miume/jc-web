import React from 'react';
import {Table} from "antd";
import axios from "axios";

class ProcessParametersTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '实际镍钴锰溶液流量1(L/min)',
            key: 'flowStandard1',
            dataIndex: 'flowStandard1',
            width: '15%',
            render: (text,record) => {
                return `${text}±${record.flowBias1}`
            }
        }, {
            title: '实际镍钴锰溶液流量2(L/min)',
            key: 'flowStandard2',
            dataIndex: 'flowStandard2',
            width: '15%',
            render: (text,record) => {
                return `${text}±${record.flowBias2}`
            }
        }, {
            title: '转速(转/分)',
            key: 'rotateSpeedStandard',
            dataIndex: 'rotateSpeedStandard',
            width: '8%',
            render: (text,record) => {
                return `${text}±${record.rotateSpeedBias}`
            }
        }, {
            title: '温度(℃)',
            key: 'temperatureStandard',
            dataIndex: 'temperatureStandard',
            width: '8%',
            render: (text,record) => {
                return `${text}±${record.temperatureBias}`
            }
        }, {
            title: '碱度(g/L)',
            key: 'basicityStandard',
            dataIndex: 'basicityStandard',
            width: '8%',
            render: (text,record) => {
                return `${text}±${record.basicityBias}`
            }
        }, {
            title: '含固量(g/L)',
            key: 'solidContainingContentStandard',
            dataIndex: 'solidContainingContentStandard',
            width: '8%',
            render: (text,record) => {
                return `${text}±${record.solidContainingContentBias}`
            }
        }, {
            title: '氨气流量(L/N)',
            key: 'nitrogenFlowStandard',
            dataIndex: 'nitrogenFlowStandard',
            width: '8%',
            render: (text,record) => {
                return `${text}±${record.nitrogenFlowBias}`
            }
        }, {
            title: '粒度(um)D70',
            key: 'sizeD70',
            dataIndex: 'sizeD70',
            width: '8%'
        }, {
            title: '粒度(um)D30',
            key: 'sizeD30Standard',
            dataIndex: 'sizeD30Standard',
            width: '8%',
            render: (text,record) => {
                return `${text}±${record.sizeD30Bias}`
            }
        }, {
            title: '粒度(um)D90',
            key: 'sizeD90',
            dataIndex: 'sizeD90',
            width: '8%'
        }]
        this.getSynthesisSlotNumber= this.getSynthesisSlotNumber.bind(this);
    }

    render() {
        let {data,proAndLines} = this.props;
        if(proAndLines) {
            var {productClassName,lineNames} = proAndLines;
            lineNames = lineNames.join(',');
        }
        return (
            <div className='process-parameters-detail-bottom-process'>
                <div className='process-parameters-detail-bottom-process-div'>{`生产品种：${productClassName}`}</div>
                <div className='process-parameters-detail-bottom-process-div'>{`生产线：${lineNames}`}</div>
                <div className='process-parameters-detail-bottom-process-div'>{`合成槽号：`}</div>
                <Table rowKey={record => record.code} dataSource={data}
                       columns={this.columns} pagination={false}
                       size={"small"} bordered/>
                <div className={'process-material-add-footer'}>
                    <div className={'process-material-add-footer-div'}>{`镍(g/L)：${data[0]['ni'] || 0}`}</div>
                    <div className={'process-material-add-footer-div'}>{`钴(g/L)：${data[0]['co'] || 0}`}</div>
                    <div className={'process-material-add-footer-div'}>{`锰(g/L)：${data[0]['mn'] || 0}`}</div>
                </div>
                <div className='process-params-detail-text'>
                    { data && data.length ? data[0]['comment'] : ''}
                </div>
            </div>
        )
    }

    componentDidMount() {
        let line = this.props.proAndLines['lines']
        if(line.length) {
            this.getSynthesisSlotNumber(line);
        }
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
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
}

export default ProcessParametersTable;
