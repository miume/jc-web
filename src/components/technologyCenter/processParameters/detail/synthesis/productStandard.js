import React from 'react';
import {Table, Input} from "antd";

class ProductStandard extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            sorter: (a,b) => a.code - b.code,
            width: '12%'
        }, {
            title: '项目',
            key: 'item',
            dataIndex: 'item',
            width: '22%'
        }, {
            title: '取样点',
            key: 'samplePlace',
            dataIndex: 'samplePlace',
            width: '22%'
        }, {
            title: '频次',
            key: 'frequency',
            dataIndex: 'frequency',
            width: '22%'
        }, {
            title: '标准',
            key: 'standards',
            dataIndex: 'standards',
            width: '22%'
        }]
    }

    render() {
        let {memo,data} = this.props;
        for(let i = 0; i < data.length; i++) {
            data[i]['index'] = i + 1;
        }
        return (
            <div>
                <Table rowKey={record => record.code} dataSource={data}
                       columns={this.columns} pagination={false}
                       scroll={{y:200}}
                       size={"small"} bordered/>
                <div className='process-params-detail-text'>
                    {memo}
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

export default ProductStandard;
