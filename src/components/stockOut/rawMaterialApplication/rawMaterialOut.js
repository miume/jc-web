import React from 'react';
import {Table, Popconfirm} from 'antd';
import SearchCell from '../../BlockQuote/search';
import axios from 'axios';
const data = [];
for(var i = 1; i<=20; i++){
    data.push({
        index:`${i}`,
        id:`${i}`,
        materialName:'钴锰矿',
        materialClass:'钴锰矿一号',
        batchNumberId:'ECT/314314',
        quantity:'122',
        weight:'22' ,
        applicant:'杨梅',
        applyDate:'2018-11-11 11-11-11',
        status:1,
        isUrgent:0
    })
}
const Authorization = localStorage.getItem('Authorization');
const server = localStorage.getItem('remote');
class RawMaterialOut extends React.Component{
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
            dataIndex:'index',
            key:'index',
            sorter:(a,b)=>a.id-b.id,
            align:'center',
            width:'6%'
        },{
            title:'批号',
            dataIndex:'batchNumberId',
            key:'batchNumberId',
            align:'center',
            width:'10%'
        },{
            title:'货物名称',
            dataIndex:'materialName',
            key:'materialName',
            align:'center',
            width:'10%'
        },{
            title:'货物数量',
            dataIndex:'quantity',
            key:'quantity',
            align:'center',
            width:'10%'
        },{
            title:'获取重量',
            dataIndex:'weight',
            key:'weight',
            align:'center',
            width:'10%'
        },{
            title:'申请人',
            dataIndex:'applicant',
            key:'applicant',
            align:'center',
            width:'10%'
        },{
            title:'申请日期',
            dataIndex:'applyDate',
            key:'applyDate',
            align:'center',
            width:'14%'
        },{
            title:'审核状态',
            dataIndex:'status',
            key:'status',
            align:'center',
            width:'10%',
            render:status => {
                switch(`${status}`) {
                  case '1': return '审核中';
                  case '2': return '不通过';
                  case '3': return '已通过';
                  default: return '';
                }
            },
        },{
            title:'紧急',
            dataIndex:'isUrgent',
            key:'isUrgent',
            align:'center',
            width:'10%',
            render:isUrgent=>isUrgent?<span><i className="fa fa-circle" aria-hidden="true"></i>正常</span>:<span className='urgent'><i className="fa fa-circle" aria-hidden="true"></i> 紧急</span>,
        },{
            title:'操作',
            dataIndex:'id',
            key:'id',
            align:'center',
            width:'10%',
            render:(text,record)=>{
                return (
                   <Popconfirm title='确定删除' onConfirm={()=>this.handleDelete(record.id)} okText='确定' cancelText='取消'>
                       <a id={record.id}>删除</a>
                   </Popconfirm> 
                );
            }
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
    /**单条记录删除 */
    handleDelete(id){
        console.log(id)
        var newData = [...this.state.dataSource];
        newData = newData.filter(f=>{return f.id!=id})
        this.setState({
            dataSource:newData
        })
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
            url:`${server}/jc/role/getRolesByNameLikeByPage`,
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
                <SearchCell name='请输入货物名称' searchEvent={this.searchEvent} searchContentChange={this.searchContentChange}></SearchCell>
                <Table rowKey={record=>record.id} dataSource={this.state.dataSource} columns={this.columns} pagination={this.pagination} scroll={{y:380}} size='small' bordered></Table>
            </div>
        );
    }
}
export default RawMaterialOut;