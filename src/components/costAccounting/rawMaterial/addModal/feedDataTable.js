import React from 'react';
import {Input, Table} from "antd";

class FeedDataTable extends React.Component {
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    componentDidMount() {
        let {flag,data} = this.props;
        this.columns = this.renderColumns(flag,data);
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.renderColumns = this.renderColumns.bind(this);
        this.columns1 = [{
            title: '物料名称',
            key: 'materialName',
            dataIndex: 'materialName',
            width: '7%'
        }, {
            title: '重量(T)',
            key: 'weight',
            dataIndex: 'weight',
            width: '7%',
            render: () => {
                return (
                    <Input name='mixedSalt-1-weight' onChange={this.props.feedDataChange}/>
                )
            },
            className:'tdStyle'
        },  {
            title: '密度(g/ml)',
            key: 'density',
            dataIndex: 'density',
            width: '7%',
            render: () => {
                return (
                    <Input name='mixedSalt-1-density' onChange={this.props.feedDataChange}/>
                )
            },
            className:'tdStyle'
        },{
            title: 'Ni浓度(g/L)',
            key: 'NiConcentration',
            dataIndex: 'NiConcentration',
            width: '7%',
            render: () => {
                return (
                    <Input name='mixedSalt-1-NiConcentration' onChange={this.props.feedDataChange}/>
                )
            },
            className:'tdStyle'
        }, {
            title: 'Co浓度(g/L)',
            key: 'CoConcentration',
            dataIndex: 'CoConcentration',
            width: '7%',
            className:'tdStyle',
            render: () => {
                return (
                    <Input name='mixedSalt-1-CoConcentration' onChange={this.props.feedDataChange}/>
                )
            }
        }, {
            title: 'Mn浓度(g/L)',
            key: 'MnConcentration',
            dataIndex: 'MnConcentration',
            width: '7%',
            className:'tdStyle',
            render: () => {
                return (
                    <Input name='mixedSalt-1-MnConcentration' onChange={this.props.feedDataChange}/>
                )
            }
        }];

        this.columns2 = [{
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
                    <Input name={`crystal-${record.code}-weight`} onChange={this.props.feedDataChange}/>
                )
            }
        },  {
            title: '浓度(%)',
            key: 'concentration',
            dataIndex: 'concentration',
            width: '7%',
            render: (text,record) => {
                return (
                    <Input name={`crystal-${record.code}-concentration`} onChange={this.props.feedDataChange}/>
                )
            }
        }]

        this.columns3 = [{
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
                    <Input name={`singleCrystal-${record.code}-weight`} onChange={this.props.feedDataChange}/>
                )
            }
        },  {
            title: '密度(g/ml)',
            key: 'density',
            dataIndex: 'density',
            width: '7%',
            render: (text,record) => {
                return (
                    <Input name={`singleCrystal-${record.code}-density`} onChange={this.props.feedDataChange}/>
                )
            }
        },{
            title: '浓度(g/L)',
            key: 'NiConcentration',
            dataIndex: 'NiConcentration',
            width: '7%',
            render: (text,record) => {
                return (
                    <Input name={`singleCrystal-${record.code}-NiConcentration`} onChange={this.props.feedDataChange}/>
                )
            }
        }]
    }


    render() {
        const {periodName, lineName, start, end} = this.props.data;
        return (
            <div className={'raw-material-detail'}>
                <div className={'raw-material-detail-head'}>
                    <div>{`周期：` + periodName}</div>
                    <div>{`期数：` + lineName}</div>
                    <div>{`开始时间：` + start}</div>
                    <div>{`结束时间：` + end}</div>
                </div>
                <Table rowKey={record => record.code} dataSource={this.state.data} columns={this.columns}
                       size={"small"} bordered pagination={false}/>
            </div>
        )
    }

    /**根据flag渲染columns*/
    renderColumns(flag,data) {
        let columns = this.columns1;
        if(flag === 'crystal') {
            this.setState({
                data: data.crystal
            });
            return this.columns2;
        }
        if(flag === 'singleCrystal') {
            this.setState({
                data: data.singleCrystal
            });
            return this.columns3;
        }
        this.setState({
            data: data.mixedSalt
        });
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
}

export default FeedDataTable;
