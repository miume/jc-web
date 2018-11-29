import React from 'react';
import {Table} from 'antd';
import SearchCell from '../../BlockQuote/search';
import './rawAdd.css';
import ApplyStockOut from './applyStockOut';
// const Option = Select.Option;
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
class RawMaterialApplication extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource : data,
        }
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
        },{
            title:'货物类型',
            dataIndex:'materialClass',
            key:'materialClass',
            align:'center',
            width:'14%'
        },{
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
    render(){
        return (
            <div style={{padding:'0 15px'}}>
                <ApplyStockOut />
                <span style={{float:'right',paddingBottom:'8px'}}>
                    <SearchCell name='请输入货物名称'></SearchCell>
                </span>
                <Table rowKey={record=>record.id} dataSource={this.state.dataSource} columns={this.columns} pagination={this.pagination} scroll={{ y: 390 }} bordered size='small'></Table>
            </div>
        );
    }
}
export default RawMaterialApplication;