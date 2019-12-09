import React from "react";
import {Button, Divider,Table, Select, Input,Spin} from "antd";
import NewButton from "../../../../BlockQuote/newButton";

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
            key:'monPotency'
        },{
            title:'氨浓度(%)',
            dataIndex:'ammValue',
            key:'ammValue',
            render: (text,record) => {
                return record['ammoniaFlag'] ?
                    <Input name={`ammValue-${record['index']}-${this.props.status}`} value={text} style={{width: '100%'}} onChange={this.props.inputChange}/> :
                    text
            }
        },{
            title:'碱浓度(%)',
            dataIndex:'alkValue',
            key:'alkValue',
            render: (text,record) => {
                return record['alkaliFlag'] ?
                    <Input name={`alkValue-${record['index']}-${this.props.status}`} value={text} style={{width: '100%'}} onChange={this.props.inputChange}/> :
                    text
            }
        }]
    }
    render() {
        let {data} = this.props;
        return(
            <div>
                <NewButton name={'获取体积值'}/>
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
