import React from 'react';
import {Input, Table} from "antd";

class FeedDataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.renderColumns = this.renderColumns.bind(this);
        this.columns1 = [{  //混合盐
            title: '物料名称',
            key: 'materialName',
            dataIndex: 'materialName',
            width: '7%'
        }, {
            title: '重量(T)',
            key: 'weights',
            dataIndex: 'weights',
            width: '7%',
            render: (text) => {
                return (
                    <Input name='mixedSalt-1-weights' value={text} onChange={this.props.feedDataChange}/>
                )
            },
            className:'tdStyle'
        },  {
            title: '密度(g/ml)',
            key: 'density',
            dataIndex: 'density',
            width: '7%',
            render: (text) => {
                return (
                    <Input name='mixedSalt-1-density' value={text} onChange={this.props.feedDataChange}/>
                )
            },
            className:'tdStyle'
        },{
            title: 'Ni浓度(g/L)',
            key: 'niConcentration',
            dataIndex: 'niConcentration',
            width: '7%',
            render: (text) => {
                return (
                    <Input name='mixedSalt-1-niConcentration' value={text} onChange={this.props.feedDataChange}/>
                )
            },
            className:'tdStyle'
        }, {
            title: 'Co浓度(g/L)',
            key: 'coConcentration',
            dataIndex: 'coConcentration',
            width: '7%',
            className:'tdStyle',
            render: (text) => {
                return (
                    <Input name='mixedSalt-1-coConcentration' value={text} onChange={this.props.feedDataChange}/>
                )
            }
        }, {
            title: 'Mn浓度(g/L)',
            key: 'mnConcentration',
            dataIndex: 'mnConcentration',
            width: '7%',
            className:'tdStyle',
            render: (text) => {
                return (
                    <Input name='mixedSalt-1-mnConcentration' value={text} onChange={this.props.feedDataChange}/>
                )
            }
        }];

        this.columns2 = [{  //晶体
            title: '物料名称',
            key: 'materialName',
            dataIndex: 'materialName',
            width: '7%'
        }, {
            title: '重量(T)',
            key: 'weight',
            dataIndex: 'weight',
            width: '7%',
            render: (text,record) => {
                return (
                    <Input name={`crystal-${record.index}-weight`} value={text} onChange={this.props.feedDataChange}/>
                )
            }
        },  {
            title: '浓度(%)',
            key: 'concentration',
            dataIndex: 'concentration',
            width: '7%',
            render: (text,record) => {
                return (
                    <Input name={`crystal-${record.index}-concentration`} value={text} onChange={this.props.feedDataChange}/>
                )
            }
        }]

        this.columns3 = [{  //单晶体
            title: '物料名称',
            key: 'materialName',
            dataIndex: 'materialName',
            width: '7%'
        }, {
            title: '重量(T)',
            key: 'weights',
            dataIndex: 'weights',
            width: '7%',
            render: (text,record) => {
                return (
                    <Input name={`singleCrystal-${record.index}-weights`} value={text} onChange={this.props.feedDataChange}/>
                )
            }
        },  {
            title: '密度(g/ml)',
            key: 'density',
            dataIndex: 'density',
            width: '7%',
            render: (text,record) => {
                return (
                    <Input name={`singleCrystal-${record.index}-density`} value={text} onChange={this.props.feedDataChange}/>
                )
            }
        },{
            title: '浓度(g/L)',
            key: 'concentration',
            dataIndex: 'concentration',
            width: '7%',
            render: (text,record) => {
                return (
                    <Input name={`singleCrystal-${record.index}-concentration`} value={text} onChange={this.props.feedDataChange}/>
                )
            }
        }]
    }


    render() {
        let {data,flag} = this.props;
        return (
            <div className={'raw-material-detail'}>
                <Table rowKey={record => record.index} dataSource={data} columns={this.renderColumns(flag)}
                       size={"small"} bordered pagination={false} scroll={{y:150}}/>
            </div>
        )
    }

    /**根据flag渲染columns*/
    renderColumns(flag) {
        let columns = this.columns1;
        if(flag === 'crystal') {
            return this.columns2;
        }
        if(flag === 'singleCrystal') {
            return this.columns3;
        }
        return columns;
    }

    /**点击详情按钮*/
    handleClick() {
        this.setState({
            visible: true
        })
    }

    /**点击取消按钮*/
    handleCancel() {
        this.setState({
            visible: false
        })
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default FeedDataTable;
