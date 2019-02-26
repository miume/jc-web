import React from 'react';
import {Table} from 'antd';
// import axios from 'axios';
import SearchCell from '../../BlockQuote/search';
import './rawAdd.css';
import ApplyStockOut from './applyStockOut';
// const Option = Select.Option;
// const data = [];
// for(var i = 1; i<=20; i++){
//     data.push({
//         id:`${i}`,
//         materialName:'钴锰矿',
//         materialClass:'钴锰矿一号',
//         batchNumberId:'ECT/314314',
//         quantity:'122',
//         weight:'22' 
//     })
// }
class RawMaterialApplication extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchContent:'',
            selectedRowKeys:[]
        }
        this.cancle = this.cancle.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        // this.handleTableChange = this.handleTableChange.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.columns = [{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b)=>a.index-b.index,
            width:'6%'
        },{
            title:'物料名称',
            dataIndex:'materialName',
            key:'materialName',
            width:'20%'
        },{
            title:'物料类型',
            dataIndex:'materialClass',
            key:'materialClass',
            width:'20%',
            render:(text,record)=>{
                switch(text){
                    case 1: return '原材料';
                    case 2: return '中间件';
                    case 3: return '成品';
                    default:return '';
                }
            }
        },{
            title:'编号',
            dataIndex:'serialNumber',
            key:'serialNumber',
            width:'34%',
            // render:(text)=>{
            //     if(text.length>24)
            //         return <span className='text-decoration' title={text}>{text.substring(0,24)}</span>
            //     else 
            //         return <span className='text-decoration' title={text}>{text}</span>
            // }
        }
        // ,{
        //     title:'数量',
        //     dataIndex:'quantity',
        //     key:'quantity',
        //     width:'15%'
        // }
        ,{
            title:'重量',
            dataIndex:'weight',
            key:'weight',
            // width:'20%'
        }]
        // this.pagination = {
        //     total: this.props.data.total,
        //     showTotal(total) {
        //       return `共${total}条记录`
        //     } ,
        //     showSizeChanger: true,
        //   }
    }   
    /**监控表格的变化 */
    // handleTableChange = (pagination) => {
    //     this.props.fetch({
    //       size: pagination.pageSize,
    //       page: pagination.current,
    //       orderField: 'id',
    //       orderType: 'desc',
    //     });
    //   }
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
            materialName:this.state.searchContent
        });
    }
    /**监控checkbox选中的情况 */
    onSelectChange(selectedRowKeys){
        this.setState({
            selectedRowKeys:selectedRowKeys
        })
    }
    cancle(){
        this.setState({
            selectedRowKeys:[]
        })
    }
    render(){
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange:this.onSelectChange,
        }
        return (
            <div style={{padding:'0 15px'}}>
                <ApplyStockOut selectedRowKeys={this.state.selectedRowKeys} data={this.props.data} cancle={this.cancle} url={this.props.url} />
                <span style={{float:'right',paddingBottom:'8px'}}>
                    <SearchCell name='请输入物料名称' searchEvent={this.searchEvent} type={this.props.index} fetch={this.props.fetch} searchContentChange={this.searchContentChange}></SearchCell>
                </span>
                <Table rowKey={record=>record.id} dataSource={this.props.data} columns={this.columns} rowSelection={rowSelection} pagination={false} scroll={{ y: 398 }} bordered size='small'></Table>
            </div>
        );
    }
}
export default RawMaterialApplication;