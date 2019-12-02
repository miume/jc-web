import React from 'react';
import NewButton from "../../../../BlockQuote/newButton";
import {Table, Input} from "antd";
const {TextArea} = Input;

class IntermediateStandards extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: '10%'
        },{
            title: '项目',
            dataIndex: 'item',
            key: 'item',
            width: '20%',
            render: (text,record) => {
                return <TextArea rows={2} name={`zjp-item-${record.index}`}/>
            }
        },{
            title: '取样点',
            dataIndex: 'samplePlace',
            key: 'samplePlace',
            width: '20%',
            render: (text,record) => {
                return <TextArea rows={2} name={`zjp-samplePlace-${record.index}`}/>
            }
        },{
            title: '频次',
            dataIndex: 'frequency',
            key: 'frequency',
            width: '20%',
            render: (text,record) => {
                return <TextArea rows={2} name={`zjp-processMode-${record.index}`}/>
            }
        },{
            title: '标准',
            dataIndex: 'standards',
            key: 'standards',
            width: '20%',
            render: (text,record) => {
                return <TextArea rows={2} name={`zjp-standards-${record.index}`}/>
            }
        },{
            title: '操作',
            dataIndex: 'code',
            key: 'code',
            width: '10%',
            render: (text,record) => {
                return <span className='blue' onClick={() => this.props.deleteMediateItem(record.index)} >删除</span>
            }
        }]
    }

    render() {
        let {data,memoChange,addMediateItem} = this.props;
        return (
            <div>
                <NewButton handleClick={addMediateItem} name='新增' className='fa fa-plus'/>
                <Table dataSource={data} rowKey={record => record.index} columns={this.columns}
                       pagination={false} bordered size={'small'}/>
                <div style={{marginTop:5}}>
                    <TextArea rows={2} name={`mediateMemo`} placeholder={'请输入备注'} onChange={memoChange}/>
                </div>
            </div>
        )
    }
}

export default IntermediateStandards;
