import React from 'react';
import {Modal,Button,Select,Table} from 'antd';
import WhiteSpace from '../BlockQuote/whiteSpace';
import './editor.css';
import Tr from './tr';
const Option = Select.Option;
const approvalProcess = [{
    id:1,
    name:'流程1'
},{
    id:2,
    name:'流程2'
},{
    id:3,
    name:'流程3'
}]
const children = approvalProcess.map(p => 
    <Option key={p.id}>{p.name}</Option>
)
const columns = [{
    title: '批号',
    dataIndex: 'batchNumber' ,
    key: 'batchNumber',
    width: '9%',
    align:'center',
  }, {
    title: '创建人',
    dataIndex: 'creatPerson',
    key:  'creatPerson.id',
    render:creatPerson => `${creatPerson.userName}`,
    width: '8%',
    align:'center',
  }, {
    title: '创建时间',
    dataIndex: 'creatTime',
    key: 'creatTime',
    width: '19%',
    align:'center',
  }, {
    title: '修改人',
    dataIndex: 'updatePerson',
    key: 'updatePerson.id',
    render:updatePerson => `${updatePerson.userName}`,
    width: '9%',
    align:'center',
  }, {
    title: '修改时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    width: '19%',
    align:'center',
  }, {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    render: type => {
        switch(`${type}`) {
          case '1': return '制成检测数据';
          case '2': return '样品送检数据';
          case '3': return '样品报告单数据';
          default: return '';
        }
    },
    width: '12%',
    align:'center',
  }, {
    title: '状态',
    dataIndex: 'state',
    key:'state',
    render: state => {
      switch(`${state}`) {
        case '-1': return '已保存未提交';
        case '0': return '已提交未未审核';
        case '1': return '审核中';
        case '2': return '审核通过';
        case '3': return '审核未通过';
        case '4': return '合格';
        case '5': return '不合格';
      }
    },
    width: '10%',
    align:'center',
  }, {
    title: '紧急',
    dataIndex: 'isUrgent',
    key: 'isUrgent',
    render: isUrgent =>  `${isUrgent}`?'正常':'紧急',
    width: '7%',
    align:'center',
  }]
  const columns1 = [{
    title: '产品线',
    dataIndex: 'productLine' ,
    key: 'productLine',
    width: '9%',
    align:'center',
  },{
    title: '工序',
    dataIndex: 'procedureName' ,
    key: 'procedureName',
    width: '9%',
    align:'center',
  },{
    title: '样品检测点',
    dataIndex: 'samplePoint' ,
    key: 'samplePoint',
    width: '9%',
    align:'center',
  },{
    title: '测试项目',
    dataIndex: 'testItem' ,
    key: 'testItem',
    width: '9%',
    align:'center',
  },{
    title: '测试频率',
    dataIndex: 'testFrequency' ,
    key: 'testFrequency',
    width: '9%',
    align:'center',
  },{
    title: '采样人',
    dataIndex: 'sampler' ,
    key: 'sampler',
    width: '9%',
    align:'center',
  },{
    title: '检测人',
    dataIndex: 'tester' ,
    key: 'tester',
    width: '9%',
    align:'center',
  },{
    title: '状态',
    dataIndex: 'status' ,
    key: 'status',
    width: '9%',
    align:'center',
  },{
    title: '备注',
    dataIndex: 'comment' ,
    key: 'comment',
    width: '9%',
    align:'center',
  }]
  const detailData = [{
      id: 1,
      productLine:{id:1,name:'产品线'},
      procedureName:{id:1,name:'工序'},
      samplePoint:{id:1,name:'样品检测点'},
      testItem:{id:1,name:'测试项目'},
      testFrequency:{id:1,name:'测试频率'},
      sampler:{id:1,name:'张三'},
      tester:{id:1,name:'傻子'},
      status:0,
      comment:'xxxxx'
  }]
class Editor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible : false,
            count : 1,
            dataSource:[],
            data:[1]
        }
        this.handleEditor = this.handleEditor.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addData = this.addData.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
    }
    /**处理新增一条记录 */
    handleEditor() {
        console.log(this.props.value)
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
    /**下拉框变化 */
    handleChange(value){
        console.log(`selected:${value}`)
    }
    /**编辑中新增按钮 */
    addData() {
        const {count,data} = this.state;
        this.setState({
            count: count+1,
            data: [...data, count+1],
        })
        console.log(this.state)
    }
    /**删除一条 */
    deleteRow(value){
        // const value = event.target.value;
        // console.log(value)
        const {count,data} = this.state;
        this.setState({
            count: count-1,
            data: data.filter(d => d.toString()!==value)
        })
        // console.log(this.state.data)
    }
    render() {
        return (
            <span>
                <a onClick={this.handleEditor} >编辑</a>
                <Modal title="详情" visible={this.state.visible}
                    onCancel={this.handleCancel}  width='1000px'
                    footer={[
                        <Button key="submit" type="primary" size="large" onClick={this.handleOk}>确 定</Button>,
                        <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>返 回</Button>
                    ]}>
                    <div style={{height:'400px'}}>
                         {/* <div style={{marginBottom:'15px'}}>
                             <Select placeholder='请选择审批流程' onChange={this.handleChange} style={{ width: 200 }}>{children}</Select>
                         </div>
                         <Table rowKey={record => record.id} columns={columns} dataSource={data} width='650px' pagination={false} size='small'></Table>
                         <WhiteSpace /> */}
                         
                         <p className='fr'>已录入{this.state.count}条数据</p>
                         <table style={{width:'100%'}}>
                             <thead className='thead'>
                                 <tr>
                                     <td>产品线</td>
                                     <td>工序</td>
                                     <td>样品检测点</td>
                                     <td>测试项目</td><td>测试频率</td>
                                     <td>采样人</td><td>检测人</td>
                                     <td>状态</td><td>备注</td><td>操作</td>
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
export default Editor;