import React from "react";
import NewButton from "../../../BlockQuote/newButton";
import {Input, Select, Table} from "antd";
const {Option} = Select;

class AddTable extends React.Component{
    constructor(props){
        super(props);
        this.columns=[{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: '7%',
        },{
            title: '成品名称',
            dataIndex: 'productionTypeName',
            key: 'productionTypeName',
            width: '12%',
            render: (text,record) => {
                return <Input name={`productionTypeName-${record.index}`} value={text} placeholder={'成品名称'} onChange={this.props.inputChange}/>
            }
        },{
            title: '批号',
            dataIndex: 'batch',
            key: 'batch',
            width: '22%',
            render: (text,record) => {
                let {batchData} = this.props;
                return (
                    <Select placeholder='请选择批号' value={text} onChange={this.props.batchChange} style={{width:'100%'}}>
                        {
                            batchData ? batchData.map(e => <Option key={e.code} name={`${record.index}-${e.batch}`} value={e.code}>{e.batch}</Option>) : null
                        }
                    </Select>
                )
            }
        },{
            title: '入库时间',
            dataIndex: 'storageTime',
            key: 'storageTime',
            width: '19%',
        },{
            title: '重量(T)',
            dataIndex: 'weights',
            key: 'weights',
            width: '10%',
            render: (text,record) => {
                return <Input name={`weights-${record.index}-float`} value={text} onChange={this.props.inputChange}/>
            }
        },{
            title: 'Ni(%)',
            dataIndex: 'niConcentration',
            key: 'niConcentration',
            width: '10%',
            render: (text,record) => {
                return <Input name={`niConcentration-${record.index}-float`} value={text} onChange={this.props.inputChange}/>
            }
        },{
            title: 'Co(%)',
            dataIndex: 'coConcentration',
            key: 'coConcentration',
            width: '10%',
            render: (text,record) => {
                return <Input name={`coConcentration-${record.index}-float`} value={text} onChange={this.props.inputChange}/>
            }
        },{
            title: 'Mn(%)',
            dataIndex: 'mnConcentration',
            key: 'mnConcentration',
            width: '10%',
            render: (text,record) => {
                return <Input name={`mnConcentration-${record.index}-float`} value={text} onChange={this.props.inputChange}/>
            }
        }]
    };

    render() {
        let {data,visible,add} = this.props;
        return(
            <div className={visible ? '' : 'hide'}>
                <NewButton name='新增' handleClick={add} className='fa fa-plus'/>
                <Table pagination={this.pagination} columns={this.columns}
                       rowKey={record => record.index}
                       dataSource={data} size="small" bordered pagination={false}/>
            </div>
        )
    }
}

export default AddTable;
