import React from 'react';
import {Table} from "antd";

class LineStatistics extends React.Component {
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };

        this.getFooter = this.getFooter.bind(this);
        this.columns = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            sorter: (a,b) => a.code - b.code,
            width: '10%'
        }, {
            title: '周期类型',
            key: 'periodName',
            dataIndex: 'periodName',
            width: '10%'
        }, {
            title: '期数',
            key: 'lineName',
            dataIndex: 'lineName',
            width: '10%'
        }, {
            title: '开始时间',
            key: 'start',
            dataIndex: 'start',
            width: '10%'
        }, {
            title: '结束时间',
            key: 'end',
            dataIndex: 'end',
            width: '10%'
        } , {
            title: '产线',
            key: 'lineName',
            dataIndex: 'lineName',
            width: '10%'
        }, {
            title: '小计(T)',
            key: 'lineName',
            dataIndex: 'lineName',
            width: '10%'
        }, {
            title: 'Ni(T)',
            key: 'start',
            dataIndex: 'start',
            width: '10%'
        }, {
            title: 'Co(T)',
            key: 'end',
            dataIndex: 'end',
            width: '10%'
        } , {
            title: 'Mn(T)',
            key: 'end',
            dataIndex: 'end',
            width: '10%'
        } ]
    }

    render() {
        return (
            <div>
                <div></div>
                <Table rowKey={record => record.code} dataSource={this.props.data}
                       columns={this.columns} pagination={false}
                       size={"small"} bordered
                       footer={this.getFooter}/>
            </div>
        )
    }

    /**切换分页*/
    getFooter(data) {
        return (
            <div className='raw-material-line-footer'>
                <div>总计</div>
                <div className='raw-material-line-footer'>
                    <div className='raw-material-line-footer-div'>{`重量：100T`}</div>
                    <div className='raw-material-line-footer-div'>{`Ni金属量：5T`}</div>
                    <div className='raw-material-line-footer-div'>{`Co金属量：5T`}</div>
                    <div className='raw-material-line-footer-div'>{`Mn金属量：5T`}</div>
                </div>
            </div>
        )
    }
}

export default LineStatistics;
