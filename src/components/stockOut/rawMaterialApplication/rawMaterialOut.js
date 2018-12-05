import React from 'react';
import {Table, Popconfirm,message} from 'antd';
import SearchCell from '../../BlockQuote/search';
import DeleteByIds from '../../BlockQuote/deleteByIds';
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
class RawMaterialOut extends React.Component{
    Authorization
    server
    componentDidMount(){
        this.fetch();
    }
    constructor(props){
        super(props);
        this.state = {
            dataSource : data,
            searchContent:'',
            selectedRowKeys:[]
        }
        this.cancel = this.cancel.bind(this);
        this.deleteByIds = this.deleteByIds.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.columns = [{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b)=>a.id-b.id,
            align:'center',
            width:'7%'
        },{
            title:'批号',
            dataIndex:'batchNumber',
            key:'batchNumber',
            align:'center',
            width:'14%'
        },{
            title:'货物名称',
            dataIndex:'materialName',
            key:'materialName',
            align:'center',
            width:'8%'
        },{
            title:'货物数量',
            dataIndex:'quantity',
            key:'quantity',
            align:'center',
            width:'8%'
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
            width:'8%'
        },{
            title:'申请日期',
            dataIndex:'createTime',
            key:'createTime',
            align:'center',
            width:'14%'
        },{
            title:'审核状态',
            dataIndex:'status',
            key:'status',
            align:'center',
            width:'8%',
            render:status => {
                switch(`${status}`) {
                    case '-1': return '已保存未提交';
                    case '0': return '已提交未审核';
                    case '1': return '审核';
                    case '2': return '审核通过';
                    case '3': return '审核未通过';
                    case '4': return '合格';
                    case '5': return '不合格';
                    default: return '';
                }
            },
        },{
            title:'紧急',
            dataIndex:'isUrgent',
            key:'isUrgent',
            align:'center',
            width:'8%',
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
                       <span className='blue' id={record.id}>删除</span>
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
        this.Authorization = localStorage.getItem('Authorization');
        this.server = localStorage.getItem('remote');
    }
    fetch=(params={})=>{
        axios({
            url:`${this.server}/jc/common/repoOutApply/getAllByNameLikeAndTypeByPage`,
            method:'get',
            headers:{
                'Authorization':this.Authorization
            },
            params:{
                ...params,
                type:this.props.type
            }
        }).then((data)=>{
            const res = data.data.data;
            this.pagination.total = res.total;
            var out = []
            for(var i = 1; i<=res.list.length; i++){
                var li = res.list[i-1];
                out.push({
                    id:li.repoOutApply.id,
                    index:res.prePage*10+i,
                    batchNumber:li.commonBatchNumber.batchNumber,
                    createPersonId:li.commonBatchNumber.createPersonId,
                    createTime:li.commonBatchNumber.createTime,
                    status:li.commonBatchNumber.status,
                    isUrgent:li.commonBatchNumber.isUrgent,
                    materialName:li.repoBaseSerialNumber.materialName,
                    serialNumber:li.repoBaseSerialNumber.serialNumber,
                    quantity:li.repoOutApply.quantity,
                    weight:li.repoOutApply.weight
                })
            }
          this.setState({
            dataSource: out,
          });
        })
    }
    /**单条记录删除 */
    handleDelete(id){
        axios({
            url:`${this.server}/jc/common/repoOutApply/deleteById/${id}`,
            method:'Delete',
            headers:{
                'Authorization':this.Authorization
            }
        }).then((data)=>{
            message.info(data.data.message);
            this.fetch();
        }).catch(()=>{
            message.info('删除失败，请联系管理员！')
        })
    }
    /**批量删除 */
    deleteByIds(){
        axios({
            url:`${this.server}/jc/common/repoOutApply/deleteByIds`,
            method:'Delete',
            headers:{
                'Authorization':this.Authorization
            },
            data:this.state.selectedRowKeys
        }).then((data)=>{
            message.info(data.data.message);
            this.fetch();
        }).catch(()=>{
            message.info('删除错误，请联系管理员！')
        })
    }
    /**取消删除 */
    cancel(){
        this.setState({
            selectedRowKeys:[]
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
        this.fetch({
            materialName:this.state.searchContent
        });
    }
    /**监控checkbox的选中情况 */
    onSelectChange(selectedRowKeys){
        this.setState({
            selectedRowKeys:selectedRowKeys
        })
    }
    render(){
        const {selectedRowKeys} = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
          };
        return (
            <div style={{padding:'0 15px'}}>
                <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds} cancel={this.cancel}/>
                <SearchCell type={this.props.index} name='请输入货物名称' fetch={this.fetch} searchEvent={this.searchEvent} searchContentChange={this.searchContentChange}></SearchCell>
                <Table rowKey={record=>record.id} dataSource={this.state.dataSource} columns={this.columns} rowSelection={rowSelection} pagination={this.pagination} scroll={{y:380}} size='small' bordered></Table>
            </div>
        );
    }
}
export default RawMaterialOut;