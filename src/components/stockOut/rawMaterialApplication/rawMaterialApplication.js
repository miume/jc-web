import React from 'react';
import {Table} from 'antd';
import axios from 'axios';
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
const Authorization = localStorage.getItem('Authorization');
const server = localStorage.getItem('remote');
class RawMaterialApplication extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource : data,
            searchContent:''
        }
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
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
    /**监控搜索框的输入变化 */
    searchContentChange(e){
        const value = e.target.value;
        this.setState({
            searchContent:value
        })
    }
    /**根据货物名称进行搜索 */
    searchEvent(){
        const content = this.state.searchContent;
        axios({
            url:`${server}/jc/auth/role/getRolesByNameLikeByPage`,
            method:'get',
            headers:{
              'Authorization':Authorization
            },
            params:{
              size: this.pagination.pageSize,
              page: this.pagination.current,
              roleName:content
            },
            type:'json',
          }).then((data)=>{
            const res = data.data.data;
            this.pagination.total=res.total;
            for(var i = 1; i<=res.list.length; i++){
              res.list[i-1]['index']=(res.pages-1)*10+i;
            }
            this.setState({
              dataSource: res.list,
            });
          })
    }
    render(){
        return (
            <div style={{padding:'0 15px'}}>
                <ApplyStockOut />
                <span style={{float:'right',paddingBottom:'8px'}}>
                    <SearchCell name='请输入货物名称' searchEvent={this.searchEvent} searchContentChange={this.searchContentChange}></SearchCell>
                </span>
                <Table rowKey={record=>record.id} dataSource={this.state.dataSource} columns={this.columns} pagination={this.pagination} scroll={{ y: 398 }} bordered size='small'></Table>
            </div>
        );
    }
}
export default RawMaterialApplication;