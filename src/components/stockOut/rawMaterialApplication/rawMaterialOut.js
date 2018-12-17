import React from 'react';
import {Table, Popconfirm,message,Divider} from 'antd';
import SearchCell from '../../BlockQuote/search';
import DeleteByIds from '../../BlockQuote/deleteByIds';
import Detail from '../detail';
import axios from 'axios';
// const data = [];
// for(var i = 1; i<=20; i++){
//     data.push({
//         index:`${i}`,
//         id:`${i}`,
//         materialName:'钴锰矿',
//         materialClass:'钴锰矿一号',
//         batchNumberId:'ECT/314314',
//         quantity:'122',
//         weight:'22' ,
//         applicant:'杨梅',
//         applyDate:'2018-11-11 11-11-11',
//         status:1,
//         isUrgent:0
//     })
// }
class RawMaterialOut extends React.Component{
    componentDidMount(){
        //this.fetch();
    }
    constructor(props){
        super(props);
        this.state = {
            dataSource : [],
            searchContent:'',
            selectedRowKeys:[]
        }
        this.deleteByIds = this.deleteByIds.bind(this);
        this.cancel = this.cancel.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.columns = [{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b)=>a.id-b.id,
            align:'center',
            width:'10%'
        },{
            title:'批号',
            dataIndex:'batchNumber',
            key:'batchNumber',
            align:'center',
            width:'15%'
        }
        // ,{
        //     title:'货物名称',
        //     dataIndex:'materialName',
        //     key:'materialName',
        //     align:'center',
        //     width:'8%'
        // },{
        //     title:'货物数量',
        //     dataIndex:'quantity',
        //     key:'quantity',
        //     align:'center',
        //     width:'8%'
        // },{
        //     title:'获取重量',
        //     dataIndex:'weight',
        //     key:'weight',
        //     align:'center',
        //     width:'10%'
        // }
        ,{
            title:'申请人',
            dataIndex:'createPersonName',
            key:'createPersonName',
            align:'center',
            width:'15%'
        },{
            title:'申请日期',
            dataIndex:'createTime',
            key:'createTime',
            align:'center',
            width:'16%'
        },{
            title:'审核状态',
            dataIndex:'status',
            key:'status',
            align:'center',
            width:'15%',
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
            width:'10%',
            render:isUrgent=>isUrgent?<span><i className="fa fa-circle" aria-hidden="true"></i>正常</span>:<span className='urgent'><i className="fa fa-circle" aria-hidden="true"></i> 紧急</span>,
        },{
            title:'操作',
            dataIndex:'id',
            key:'id',
            align:'center',
            render:(text,record)=>{
                return (
                    <span>
                        <Detail id={record.id} url={this.props.url}></Detail>
                        <Divider type='vertical'></Divider>
                        <Popconfirm title='确定删除' onConfirm={()=>this.handleDelete(record.id)} okText='确定' cancelText='取消'>
                            <span className='blue' id={record.id}>删除</span>
                        </Popconfirm> 
                   </span>
                );
            }
        }]
        this.pagination = {
            total: this.props.data.length,
            showTotal(total) {
              return `共${total}条记录`
            } ,
            showSizeChanger: true,
          }
        // this.Authorization = localStorage.getItem('Authorization');
        // this.server = localStorage.getItem('remote');
    }
    /**监控表格变化 */
    handleTableChange(pagination){
        this.fetch({
            size:pagination.pageSize,
            page:pagination.current,
        })
    }
    /**getAllByPage分页查询 */
    // fetch=(params={})=>{
    //     axios({
    //         url:`${this.server}/jc/common/repoOutApply/getAllByNameLikeAndTypeByPage`,
    //         method:'get',
    //         headers:{
    //             'Authorization':this.Authorization
    //         },
    //         params:{
    //             ...params,
    //             type:this.props.type
    //         }
    //     }).then((data)=>{
    //         const res = data.data.data;
    //         this.pagination.total = res.total;
    //         var out = []
    //         console.log(res)
    //         for(var i = 1; i<=res.list.length; i++){
    //             var li = res.list[i-1];
    //             out.push({
    //                 id:li.commonBatchNumber.id,
    //                 index:res.prePage*10+i,
    //                 batchNumber:li.commonBatchNumber.batchNumber,
    //                 createPersonName:li.createPersonName,
    //                 createTime:li.commonBatchNumber.createTime,
    //                 status:li.commonBatchNumber.status,
    //                 isUrgent:li.commonBatchNumber.isUrgent,
    //             })
    //         }
    //       this.setState({
    //         dataSource: out,
    //       });
    //     })
    // }
    /**单条记录删除 */
    handleDelete(id){
        axios({ 
            url:`${this.props.url.stockOut.repoOut}/${id}`,
            method:'Delete',
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then((data)=>{
            message.info(data.data.message);
            this.props.fetch();
        }).catch(()=>{
            message.info('删除失败，请联系管理员！')
        })
    }
    /**批量删除 */
    deleteByIds(){
        axios({
            url:`${this.props.url.stockOut.repoOut}`,
            method:'Delete',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            data:this.state.selectedRowKeys
        }).then((data)=>{
            message.info(data.data.message);
            this.props.fetch();
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
        this.props.fetch({
            personName:this.state.searchContent
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
        this.pagination.total = this.props.data.total;
        return (
            <div style={{padding:'0 15px'}}>
                <DeleteByIds deleteByIds={this.deleteByIds} cancel={this.cancel} selectedRowKeys={this.state.selectedRowKeys}/>
                <span style={{float:'right',paddingBottom:'8px'}}>
                    <SearchCell name='请输入申请人' type={this.props.index} fetch={this.props.fetch} searchEvent={this.searchEvent} searchContentChange={this.searchContentChange}></SearchCell>
                </span>
                <div className='clear'></div>
                <Table rowKey={record=>record.id} dataSource={this.props.data} columns={this.columns} rowSelection={rowSelection} pagination={this.pagination} onChange={this.handleTableChange} scroll={{y:380}} size='small' bordered></Table>
            </div>
        );
    }
}
export default RawMaterialOut;