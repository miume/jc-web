import React from 'react';
import NewButton from "../../../../BlockQuote/newButton";
import {Table, Input, Divider} from "antd";
import TemplateChoice from "./choiceTemplate";
const {TextArea} = Input;

class ExceptionHandling extends React.Component {
    constructor(props) {
        super(props);
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
                return <TextArea rows={2} value={text} name={`hc-phenomenon-${record.index}`} onChange={this.props.inputChange}/>
            }
        },{
            title: '原因',
            dataIndex: 'reason',
            key: 'reason',
            width: '20%',
            render: (text,record) => {
                return <TextArea rows={2} value={text} name={`hc-reason-${record.index}`} onChange={this.props.inputChange}/>
            }
        },{
            title: '处理方式',
            dataIndex: 'processMode',
            key: 'processMode',
            width: '20%',
            render: (text,record) => {
                return <TextArea rows={2} value={text} name={`hc-processMode-${record.index}`} onChange={this.props.inputChange}/>
            }
        },{
            title: '相关产品处理',
            dataIndex: 'relatedProductionProcess',
            key: 'relatedProductionProcess',
            width: '20%',
            render: (text,record) => {
                return <TextArea rows={2} value={text} name={`hc-relatedProductionProcess-${record.index}`} onChange={this.props.inputChange}/>
            }
        },{
            title: '操作',
            dataIndex: 'code',
            key: 'code',
            width: '10%',
            render: (text,record) => {
                return (
                    <span>
                        <span className='blue' onClick={() => this.props.deleteExceptionDisposes(record.index)}>删除</span>
                        <Divider type={"vertical"}/>
                        <TemplateChoice index={record.index} url={this.props.url} choiceTemplate={this.props.choiceTemplate}/>
                        </span>
                )
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
}

export default ExceptionHandling;
