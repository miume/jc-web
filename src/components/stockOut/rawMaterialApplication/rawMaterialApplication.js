import React from 'react';
import {Button,Table,Modal,Icon, Select} from 'antd';
import SearchCell from '../../BlockQuote/search';
import RawAdd from './rawAdd'; 
const Option = Select.Option;
const data = [];
for(var i = 1; i<=20; i++){
    data.push({
        id:`${i}`,
        materialName:'钴锰矿',
        materialClass:'钴锰矿一号',
        batchNumberId:'ECT/314314',
        quantity:'122',
        weight:'22' 
    })
}
const process = [{
    id:1,
    name:'流程1'
},{
    id:2,
    name:'流程2'
},{
    id:3,
    name:'流程3'
},{
    id:4,
    name:'流程4'
},]
class RawMaterialApplication extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource : data,
            visible:false
        }
        this.apply = this.apply.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel =this.handleCancel.bind(this);
        this.columns = [{
            title:'序号',
            dataIndex:'id',
            key:'id',
            sorter:(a,b)=>a.id-b.id,
            align:'center',
            width:'14%'
        },{
            title:'货物名称',
            dataIndex:'materialName',
            key:'materialName',
            align:'center',
            width:'14%'
        },,{
            title:'货物类型',
            dataIndex:'materialClass',
            key:'materialClass',
            align:'center',
            width:'14%'
        },,{
            title:'批号',
            dataIndex:'batchNumberId',
            key:'batchNumberId',
            align:'center',
            width:'14%'
        },{
            title:'数量',
            dataIndex:'quantity',
            key:'quantity',
            align:'center',
            width:'14%'
        },{
            title:'重量',
            dataIndex:'weight',
            key:'weight',
            align:'center',
            width:'14%'
        }]
        this.pagination = {
            total: this.state.dataSource.length,
            showTotal(total) {
              return `共${total}条记录`
            } ,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
            },
            onChange(current) {
            }
          }
    }   
    /**点击申请按钮，弹出弹出框 */
    apply(){
        this.setState({
            visible:true
        })
    }
    /**申请出库弹出框 点击取消按钮 */
    handleCancel(){
        this.setState({
            visible:false
        })
    }
    /**申请出库弹出框 点击送审按钮 */
    handleOk(){
        // this.setState({
        //     visible:false
        // })
    }
    render(){
        return (
            <div style={{padding:'0 15px'}}>
                <Button type='primary' size='default' className='button' onClick={this.apply}><i className="fa fa-plus-square" style={{color:'white'}}></i> 申请出库</Button>
                <Modal title='申请' visible={this.state.visible}
                    closable= {false} width='1100px'
                    footer={[
                        <Button key='back' type='ghost' onClick={this.handleCancel} style={{float:'left'}}><Icon type="close" />取消</Button>,
                        <Button key='submit' type='primary' onClick={this.handleOk} className='button'><Icon type="check" />送审</Button>                       
                    ]}
                >
                    <RawAdd></RawAdd>
                </Modal>
                <Modal title='设置审批细节' visible={this.state.visible1}
                    closable= {false} width='200px'
                    footer={[
                        <Button key='back' type='ghost' onClick={this.handleCancel} >取消</Button>,
                        <Button key='submit' type='primary' onClick={this.handleOk} className='button'>送审</Button>                       
                    ]}
                >
                <div>
                    <Select placeholder='请选择审核流程'>
                    {
                        process.map(p=>{
                            return (
                                <Option key={p.id} value={p.id}>{p.name}</Option>
                            );
                        })
                    }
                    </Select>
                </div>
                </Modal>
                <span style={{float:'right',paddingBottom:'8px'}}>
                    <SearchCell name='请输入货物名称'></SearchCell>
                </span>
                <Table rowKey={record=>record.id} dataSource={this.state.dataSource} columns={this.columns} pagination={this.pagination} scroll={{ y: 390 }} bordered size='small'></Table>
            </div>
        );
    }
}
export default RawMaterialApplication;