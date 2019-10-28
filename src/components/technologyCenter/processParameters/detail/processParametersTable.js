import React from 'react';
import {Table} from "antd";

class ProcessParametersTable extends React.Component {
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    constructor(props) {
        super(props);
        this.columns = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            sorter: (a,b) => a.code - b.code,
            width: '6%'
        }, {
            title: '实际镍钴锰溶液流量1(L/min)',
            key: 'flowStandard1',
            dataIndex: 'flowStandard1',
            width: '15%'
        }, {
            title: '实际镍钴锰溶液流量2(L/min)',
            key: 'flowStandard2',
            dataIndex: 'flowStandard2',
            width: '15%'
        }, {
            title: '转速(转/分)',
            key: 'RotateSpeedStandard',
            dataIndex: 'RotateSpeedStandard',
            width: '8%'
        }, {
            title: '温度(℃)',
            key: 'TemperatureStandard',
            dataIndex: 'TemperatureStandard',
            width: '8%',
            render: (text,record) => {
                return `${text}±1`
            }
        }, {
            title: '碱度(g/L)',
            key: 'BasicityStandard',
            dataIndex: 'BasicityStandard',
            width: '8%'
        }, {
            title: '含固量(g/L)',
            key: 'solidContainingContentStandard',
            dataIndex: 'solidContainingContentStandard',
            width: '8%'
        }, {
            title: '氨气流量(L/N)',
            key: 'NitrogenFlowStandard',
            dataIndex: 'NitrogenFlowStandard',
            width: '8%'
        }, {
            title: '粒度(um)D70',
            key: 'SizeD70',
            dataIndex: 'SizeD70',
            width: '8%'
        }, {
            title: '粒度(um)D30',
            key: 'SizeD30',
            dataIndex: 'SizeD30',
            width: '8%'
        }, {
            title: '粒度(um)D90',
            key: 'SizeD90',
            dataIndex: 'SizeD90',
            width: '8%'
        }]
    }

    render() {
        return (
            <div className='process-parameters-detail-bottom-process'>
                <div className='process-parameters-detail-bottom-process-div'>{`生产品种：`}</div>
                <div className='process-parameters-detail-bottom-process-div'>{`生产线：`}</div>
                <div className='process-parameters-detail-bottom-process-div'>{`合成槽号：`}</div>
                <Table rowKey={record => record.code} dataSource={this.props.data}
                       columns={this.columns} pagination={false}
                       scroll={{y:200,x:1300}}
                       size={"small"} bordered/>
            </div>
        )
    }
}

export default ProcessParametersTable;
