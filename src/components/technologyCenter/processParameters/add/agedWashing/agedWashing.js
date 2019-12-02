import React from 'react';
import NewButton from "../../../../BlockQuote/newButton";
import {Table, Input, Select} from "antd";
const {TextArea} = Input, {Option} = Select;

class AgedWashing extends React.Component {
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
            width: '30%',
            render: (text,record) => {
                return (
                    <Select placeholder='请选择生产设备' onChange={this.props.equipmentChange}>
                        <Option value={'12'} name={1}>12</Option>
                    </Select>
                )
            },
            className: 'process-params-table-part-td'
        },{
            title: '技术参数',
            dataIndex: 'techParameters',
            key: 'techParameters',
            width: '50%',
            render: (text,record) => {
                return <TextArea row={2} name={`ch-techParameters-${record.index}`} onChange={this.props.inputChange}/>
            },
            className: 'process-params-table-part-td'
        },{
            title: '操作',
            dataIndex: 'code',
            key: 'code',
            width: '10%',
            render: (text,record) => {
                return <span className='blue' onClick={() => this.props.deleteItem(record.index)} >删除</span>
            }
        }]
    }

    render() {
        let {code,data,memoChange} = this.props;
        return (
            <div className={code === 50 ? '' : 'hide'}>
                <NewButton handleClick={this.props.add} name='新增' className='fa fa-plus'/>
                <Table dataSource={data} rowKey={record => record.index} columns={this.columns}
                       pagination={false} bordered size={'small'}/>
                <div style={{marginTop:10}}>
                    <TextArea row={2} name='chMoment' onChange={memoChange} placeholder='请输入备注'/>
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

export default AgedWashing;
