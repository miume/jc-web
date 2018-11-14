import React from 'react';
import {Button,Modal,Select,Input,Table,Popconfirm} from 'antd';
import WhiteSpace from '../BlockQuote/whiteSpace';
import './editor.css';
import Tr from './tr';
const Option = Select.Option;
const approvalProcess = [{
    id:1,
    name:'产品线1'
},{
    id:2,
    name:'产品线2'
},{
    id:3,
    name:'产品线3'
}]
const children = approvalProcess.map(p => 
    <Option key={p.id.toString()}>{p.name}</Option>
)
const columns1 = [{
    title: '产品线',
    dataIndex: 'productLine' ,
    key: 'productLine',
    width: '9%',
    align:'center',
    render: (text) => {
        console.log(text);
        return (
            <Select defaultValue={text.id.toString()} style={{width:'100%'}}>{children}</Select>
        )
    }
  },{
    title: '工序',
    dataIndex: 'procedureName' ,
    key: 'procedureName',
    width: '9%',
    align:'center',
    render: (text) => {
        return (
            <Select defaultValue={text.id.toString()} style={{width:'100%'}}>{children}</Select>
        )
    }
  },{
    title: '样品检测点',
    dataIndex: 'samplePoint' ,
    key: 'samplePoint',
    width: '9%',
    align:'center',
    render: (text) => {
        return (
            <Select defaultValue={text.id.toString()} style={{width:'100%'}}>{children}</Select>
        )
    }
  },{
    title: '测试项目',
    dataIndex: 'testItem' ,
    key: 'testItem',
    width: '9%',
    align:'center',
    render: (text) => {
        return (
            <Select defaultValue={text.id.toString()} style={{width:'100%'}}>{children}</Select>
        )
    }
  },{
    title: '测试频率',
    dataIndex: 'testFrequency' ,
    key: 'testFrequency',
    width: '9%',
    align:'center',
    render: (text) => {
        return (
            <Input defaultValue={text} />
        )
    }
  },{
    title: '采样人',
    dataIndex: 'sampler' ,
    key: 'sampler',
    width: '9%',
    align:'center',
    render: (text) => {
        return (
            <Select defaultValue={text.id.toString()} style={{width:'100%'}}>{children}</Select>
        )
    }
  },{
    title: '检测人',
    dataIndex: 'tester' ,
    key: 'tester',
    width: '9%',
    align:'center',
    render: (text) => {
        console.log(text);
        return (
            <Select defaultValue={text.id.toString()} style={{width:'100%'}}>{children}</Select>
        )
    }
  },{
    title: '状态',
    dataIndex: 'status' ,
    key: 'status',
    width: '9%',
    align:'center',
    render: (text) => {
        return (
            <Input defaultValue={text}/>
        )
    }
  },{
    title: '备注',
    dataIndex: 'comment' ,
    key: 'comment',
    width: '9%',
    align:'center',
    render: (text) => {
        return (
            <Input defaultValue={text}/>
        )
    }
  },{
    title: '操作',
    dataIndex: 'operation' ,
    key: 'operation',
    width: '9%',
    align:'center',
    render: (text,record) => {
        return (
            <span>
                <Popconfirm title="确定删除?" onConfirm={() =>this.handleDelete(record.key)} okText="确定" cancelText="取消" >
                          <a href="#">删除</a>
                      </Popconfirm>
            </span>
        )
    }
  }]
const data = [{
    id:1,
    batchNumber:'NNNN',
    productLine:{id:1,name:'产品线1'},
    procedureName:{id:1,name:'产品线1'},
    samplePoint:{id:1,name:'产品线1'},
    testItem:{id:1,name:'产品线1'},
    sampler:{id:1,name:'产品线1'},
    tester:{id:1,name:'产品线1'},
    testFrequency:'23',
    status:0,
    comment:'kkkk'
}]
class Add extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible : false,
            count: 1,
            data : [1]
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.addData = this.addData.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
    }
    /**处理新增一条记录 */
    handleAdd = () => {
        this.setState({
          visible: true
        });
      }
    handleOk() {
        this.setState({
        visible: false
        });
    }
    handleCancel() {
        this.setState({
        visible: false
        });
    }
    /**新增一条数据 */
 
    addData() {
        const {count,data} = this.state;
        this.setState({
            count: count+1,
            data: [...data, count+1],
        })
        console.log(this.state)
    }
    /**删除一条数据 */
    deleteRow(value){
        const {count,data} = this.state;
        this.setState({
            count:count-1,
            data:data.filter(d=>d.toString()!==value)
        })
    }
    render() {
        return (
            <span>
                <Button type="primary" size="small" style={{marginRight:'15px'}}  onClick={this.handleAdd} >新增</Button>
                <Modal title="新增" visible={this.state.visible}
                    onCancel={this.handleCancel}  width='1200px'
                    footer={[
                        <Button key="submit" type="primary" size="large" onClick={this.handleOk}>确 定</Button>,
                        <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>返 回</Button>
                    ]}>
                    <div style={{height:'400px'}}>
                    <p className='fr'>已录入{this.state.count}条数据</p>
                         <table style={{width:'100%'}}>
                             <thead className='thead'>
                                 <tr>
                                     <td>产品线</td>
                                     <td>工序</td>
                                     <td>样品检测点</td>
                                     <td>测试项目</td><td>测试频率</td>
                                     <td>采样人</td><td>检测人</td>
                                     <td>状态</td><td>备注</td><td>删除</td>
                                 </tr>
                             </thead>
                             <tbody>
                             {
                                this.state.data.map((m) => { return <Tr key={m.toString()} deleteRow={this.deleteRow} value={m.toString()}></Tr> })
                             }
                             </tbody>
                         </table>
                         <WhiteSpace />
                         <Button type="primary" icon="plus" size='large' style={{width:'100%',fontSize:'15px'}} onClick={this.addData}/>
                         
                    </div>
                </Modal>
            </span>
        );
    }
}
export default Add;