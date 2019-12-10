import React from 'react';
import {Table} from "antd";
// import AllTester from "./allTester";

class ExceptionHandling extends React.Component {
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
            width: '12%'
        }, {
            title: '现象',
            key: 'phenomenon',
            dataIndex: 'phenomenon',
            width: '22%'
        }, {
            title: '原因',
            key: 'reason',
            dataIndex: 'reason',
            width: '22%'
        }, {
            title: '处理方法',
            key: 'processMode',
            dataIndex: 'processMode',
            width: '22%'
        }, {
            title: '相关产品处理',
            key: 'relatedProductionProcess',
            dataIndex: 'relatedProductionProcess',
            width: '22%'
        }]
    }

    render() {
        let {data} = this.props;
        for(let i = 0; i < data.length; i++) {
            data[i]['index'] = i + 1;
        }
        return (
            <div>
                <Table rowKey={record => record.code} dataSource={data}
                       columns={this.columns} pagination={false}
                       scroll={{y:200}}
                       size={"small"} bordered/>
                       {/*<AllTester />*/}
            </div>
        )
    }
}

export default ExceptionHandling;
