import React from 'react';
import {Table} from "antd";

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
                <div className='process-params-detail-text'>
                    { data && data.length ? data[0]['comment'] : ''}
                </div>
            </div>
        )
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default ProcessParametersTable;
