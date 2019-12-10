import React from 'react';
import {Table, Input} from "antd";
const {TextArea} = Input;

class AgedWashingDeatil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productionData: []
        };
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: '10%'
        },{
            title: '生产设备',
            dataIndex: 'deviceCode',
            key: 'deviceCode',
            width: '45%'
        },{
            title: '技术参数',
            dataIndex: 'techParameters',
            key: 'techParameters',
            width: '45%'
        }]
    }

    render() {
        let {ch} = this.props,{devices, detail} = ch;
        for(let i = 0; i < devices.length; i++) {
            devices[i]['index'] = i + 1;
        }
        return (
            <div style={{height: 300}}>
                <Table dataSource={devices} rowKey={record => record.index} columns={this.columns}
                       pagination={false} bordered size={'small'} scroll={{y:200}}/>
                <div className='process-params-detail-text'>
                    {detail['comment']}
                </div>
            </div>
        )
    }

    componentWillUnmount() {
        this.setState(() => {
                return;
            }
        )
    }
}

export default AgedWashingDeatil;
