import React from "react";
import {Table, Input, Button} from "antd";

class WorkShop extends React.Component{
    url;
    constructor(props){
        super(props);
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index'
        },{
            title:'溶液',
            dataIndex:'materialName',
            key:'materialName'
        },{
            title:'体积(m3)',
            dataIndex:'volume',
            key:'volume'
        },{
            title:'密度(T/m3)',
            dataIndex:'monPotency',
            key:'monPotency',
            render: (text,record) => {
                return <Input name={`monPotency-${record['index']}-${this.props.status}`} value={text} style={{width: '100%'}} onChange={this.props.inputChange}/>
            }
        },{
            title:'氨浓度(%)',
            dataIndex:'ammPotency',
            key:'ammPotency',
            render: (text,record) => {
                return record['ammoniaFlag'] ?
                    <Input name={`ammPotency-${record['index']}-${this.props.status}`} value={text} style={{width: '100%'}} onChange={this.props.inputChange}/> :
                    text
            }
        },{
            title:'碱浓度(%)',
            dataIndex:'alkPotency',
            key:'alkPotency',
            render: (text,record) => {
                return record['alkaliFlag'] ?
                    <Input name={`alkPotency-${record['index']}-${this.props.status}`} value={text} style={{width: '100%'}} onChange={this.props.inputChange}/> :
                    text
            }
        }]
    }
    render() {
        let {data,getVolume,status} = this.props;
        return(
            <div>
                <Button type='ant-btn ant-btn-primary' onClick={() => getVolume(status,'volume')} style={{marginBottom: 10}}>获取体积值</Button>
                <Table
                    dataSource={data}
                    rowKey={record => record.code}
                    columns={this.columns}
                    pagination={false}
                    size='small'
                    bordered/>
            </div>
        );
    }
}

export default WorkShop
