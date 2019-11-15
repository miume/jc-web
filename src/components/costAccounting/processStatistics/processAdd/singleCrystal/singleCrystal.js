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
               if(record.dataType===1){

                    return(
                        <Input  name={`${record.index}-${'volume'}`}  onChange={this.inputChange}/>
                    )
               }
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
    }

    getLastPotency() {//获取上期浓度
        axios({
            url: `${this.props.url.precursorGoodIn.getLastPotencyByProcessId}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params: {
                processId: this.props.processId
            }
        }).then(data => {
            
            let res = data.data.data
            if (res) {
                //获取到浓度后，setState浓度值，渲染到本期浓度列，获取本期浓度有变化，再输入，将输入的值保存提交,无变化，提交原来的值
            }
        })
    }
  
    inputChange(e){//要定位到是第几条数据发生了变化，点击父组件保存时，要把填写的数据（没有改动的要传原来的数据）都保存起来并传给父组件
        //获取到输入框变化的code值-字段名
       
        let value=e.target.value //获取到输入框填的值
       let inputData=`${e.target.name}-${value}`
       // this.tableData[code]['currentConcentration'] = value;//修改第几行的哪个字段数据
       this.props.getSingleCrystal(this.props.processId,inputData,'')

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
                <NewButton name='获取体积值' flagConfirm={!this.props.flagConfirm}/>
                <NewButton name='获取上期浓度' handleClick={this.getLastPotency} flagConfirm={!this.props.flagConfirm}/>
                <Table
                    dataSource={this.tableData}
                    rowKey={record => record.code}
                    columns={this.columns}
                    pagination={false}
                    scroll={{y:'220px'}}
                    size='small'
                    bordered />
            </div>
        );
    }
}
export default SingleCrystal



