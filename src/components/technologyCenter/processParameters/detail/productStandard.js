import React from 'react';
import {Table} from "antd";

class ProductStandard extends React.Component {
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    constructor(props) {
        super(props);
        this.state = {
        };
        this.getFooter = this.getFooter.bind(this);
        this.columns = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            sorter: (a,b) => a.code - b.code,
            width: '12%'
        }, {
            title: '项目',
            key: 'processNum',
            dataIndex: 'processNum',
            width: '22%'
        }, {
            title: '取样点',
            key: 'plantName',
            dataIndex: 'plantName',
            width: '22%'
        }, {
            title: '频次',
            key: 'processName',
            dataIndex: 'processName',
            width: '22%'
        }, {
            title: '标准',
            key: 'effectiveDate',
            dataIndex: 'effectiveDate',
            width: '22%'
        }]
    }

    render() {
        return (
            <Table rowKey={record => record.code} dataSource={this.props.data}
                   columns={this.columns} pagination={false}
                   scroll={{y:200}} footer={this.getFooter}
                   size={"small"} bordered/>
        )
    }

    getFooter() {
        return '备注信息'
    }
}

export default ProductStandard;
