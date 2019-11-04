import React from "react";
import {Button, Divider,Table, Select, Input,Spin} from "antd";
import NewButton from "../../../../BlockQuote/newButton";

class Consumption extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state = {
            data:undefined,
            loading:false
        }
        this.columns=[{
            title:'序号',
            dataIndex:'id',
            key:'id'
        },{
            title:'溶液',
            dataIndex:'periodType',
            key:'periodType'
        },{
            title:'体积(m3)',
            dataIndex:'period',
            key:'period'
        },{
            title:'氨浓度(%)',
            dataIndex:'endTime',
            key:'endTime'
        },{
            title:'碱浓度(%)',
            dataIndex:'process',
            key:'process'
        }]
    }
    change = (e)=>{
        
    }
    render(){
        return(
            <div>
                <Spin spinning={this.state.loading} wrapperClassName='rightContent-Div'>
                <Button type='primary' onChange={this.change}>获取重量值</Button>
                <br/><br/>
                    <Table
                    columns={this.columns}
                    size='small'
                    bordered/>
                </Spin>
            </div>
        );
    }
}

export default Consumption