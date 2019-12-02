import React from 'react';
import NewButton from "../../../../BlockQuote/newButton";
import {Table, Input} from "antd";
const {TextArea} = Input;

class ExceptionHandling extends React.Component {
    constructor(props) {
        super(props);
        this.processExceptionDisposes = this.processExceptionDisposes.bind(this);
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: '10%'
        },{
            title: '现象',
            dataIndex: 'phenomenon',
            key: 'phenomenon',
            width: '20%',
            render: (text,record) => {
                return <TextArea rows={2} name={`hc-phenomenon-${record.index}`} onChange={this.props.inputChange}/>
            }
        },{
            title: '原因',
            dataIndex: 'reason',
            key: 'reason',
            width: '20%',
            render: (text,record) => {
                return <TextArea rows={2} name={`hc-reason-${record.index}`} onChange={this.props.inputChange}/>
            }
        },{
            title: '处理方式',
            dataIndex: 'processMode',
            key: 'processMode',
            width: '20%',
            render: (text,record) => {
                return <TextArea rows={2} name={`hc-processMode-${record.index}`} onChange={this.props.inputChange}/>
            }
        },{
            title: '相关产品处理',
            dataIndex: 'relatedProductionProcess',
            key: 'relatedProductionProcess',
            width: '20%',
            render: (text,record) => {
                return <TextArea rows={2} name={`hc-relatedProductionProcess-${record.index}`} onChange={this.props.inputChange}/>
            }
        },{
            title: '操作',
            dataIndex: 'code',
            key: 'code',
            width: '10%',
            render: (text,record) => {
                return <span className='blue' onClick={() => this.props.deleteExceptionDisposes(record.index)}>删除</span>
            }
        }]

    }

    render() {
        let {data,addExceptionDisposes} = this.props;
        return (
            <div>
                <NewButton handleClick={addExceptionDisposes} name='新增' className='fa fa-plus'/>
                <Table dataSource={data} rowKey={record => record.index}  columns={this.columns}
                       pagination={false} bordered size={'small'}/>
            </div>
        )
    }

    processExceptionDisposes(data) {
        for(let i = 0; i < data.length; i++) {
            data[i]['index'] = i + 1;
            console.log('i+1=',i,data[i])
        }
        return data;
    }
}

export default ExceptionHandling;
