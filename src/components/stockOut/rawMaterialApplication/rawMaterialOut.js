import React from 'react';
import {Table} from 'antd';
import SearchCell from '../../BlockQuote/search';
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
class RawMaterialOut extends React.Component{
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
            title:'批号',
            dataIndex:'batchNumberId',
            key:'batchNumberId',
            align:'center',
            width:'14%'
        },{
            title:'货物名称',
            dataIndex:'materialName',
            key:'materialName',
            align:'center',
            width:'14%'
        },{
            title:'货物数量',
            dataIndex:'quantity',
            key:'quantity',
            align:'center',
            width:'14%'
        },{
            title:'获取重量',
            dataIndex:'weight',
            key:'weight',
            align:'center',
            width:'14%'
        },{
            title:'申请人',
            dataIndex:'applicant',
            key:'applicant',
            align:'center',
            width:'14%'
        },{
            title:'申请日期',
            dataIndex:'applyDate',
            key:'applyDate',
            align:'center',
            width:'14%'
        },{
            title:'审核状态',
            dataIndex:'applicant',
            key:'applicant',
            align:'center',
            width:'14%'
        },{
            title:'紧急',
            dataIndex:'applyDate',
            key:'applyDate',
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
                <SearchCell name='请输入货物名称'></SearchCell>
                <Table rowkey={record=>record.id}></Table>
            </div>
        );
    }
}
export default RawMaterialOut;