import React, { Component } from 'react'
import { Table, Input } from 'antd'
import NewButton from '../../../../BlockQuote/newButton'
import axios from 'axios'

class SingleCrystal extends Component {//单晶体配置
    constructor(props) {
        super(props);
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width:'5%'
        }, {
            title: '溶液',
            dataIndex: 'materialName',
            key: 'materialName',
            width: '25%'
        }, {
            title: '体积',
            dataIndex: 'volume',
            key: 'volume',
            width: '25%',
            render:(text,record)=>{
                    return(
                        <span>{record.volume}</span>
                    )
            }
        }, {
            title: '本期浓度',
            dataIndex: 'monPotency',
            key: 'monPotency',
            width:'30%',
            render: (text, record) => {
                return (
                    <Input value={record.monPotency} name={`${record.index}-${'monPotency'}`}  onChange={this.inputChange}/>
                )
            }
        }];
        this.getLastPotency = this.getLastPotency.bind(this);
        this.inputChange=this.inputChange.bind(this);
        this.getWeight=this.getWeight.bind(this);
    }

    getLastPotency() {//获取上期浓度
        this.props.getLastPotency(this.props.processId)
    }
    getWeight(){
        this.props.weightAlterData(this.props.processId,'volume')
    }
    inputChange(e){//要定位到是第几条数据发生了变化，点击父组件保存时，要把填写的数据（没有改动的要传原来的数据）都保存起来并传给父组件
        //获取到输入框变化的code值-字段名
       this.props.getSingleCrystal(this.props.processId,e,'')

    }
    render() {
        this.tableData = this.props.tagTableData&&this.props.tagTableData[0]&&this.props.tagTableData[0].materialDetails?this.props.tagTableData[0].materialDetails:[]
        if (this.tableData && this.tableData.length) {
            for (let i = 0; i < this .tableData.length; i++) {
                this.tableData[i]['index'] = i + 1
            }
        }
        
        return (
            <div>
                <NewButton name='获取体积值' flagConfirm={!this.props.flagConfirm} handleClick={this.getWeight}/>
                <NewButton name='获取上期浓度' handleClick={this.getLastPotency} flagConfirm={!this.props.flagConfirm}/>
                <Table
                    dataSource={this.tableData}
                    rowKey={record => record.code}
                    columns={this.columns}
                    pagination={false}
                    scroll={{y:'42vh'}}
                    size='small'
                    bordered />
            </div>
        );
    }
}
export default SingleCrystal



