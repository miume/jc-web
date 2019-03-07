import React from 'react';
import axios from "axios";
import '../Home/page.css';
import BlockQuote from '../BlockQuote/blockquote';
import SearchCell from '../BlockQuote/search';
import DeleteByIds from '../BlockQuote/deleteByIds';
import AddModal from './add';
import { Table,Popconfirm,Divider,message } from 'antd';
import Edit from "./edit"

// const data = [];
// for(let i = 1;i<=10;i++){
//     data.push({
//         key:i,
//         index:i,
//         serial:'ABC'+i,
//         name:'name'+i,
//         time:'1994-'+i+"-10",
//         person:'person'+i,
//     })
// }

class Equipment extends React.Component{
    url
    constructor(props){
        super(props);
        this.state={
            dataSource:[],
            pagination:[],
            searchContent:'',
        }
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.pagination = {
            total: this.state.dataSource.length,
            showTotal(total){
                return `共${total}条记录`
            },
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
            },
            onChange(current) {
            }
        };
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            align:'center',
            width: '15%',
        },{
            title: '批号',
            dataIndex: 'batchNumber',
            key: 'batchNumber',
            align:'center',
            width: '16%',
        },{
            title: '指导书名称',
            dataIndex: 'instructorName',
            key: 'instructorName',
            align:'center',
            width: '16%',
        },{
            title: '生效时间',
            dataIndex: 'effectiveDate',
            key: 'effectiveDate',
            align:'center',
            width: '16%',
        },{
            title: '编制人',
            dataIndex: 'createPerson',
            key: 'createPerson',
            align:'center',
            width: '16%',
        },{
            title: '操作',
            dataIndex: 'index',
            key: 'id',
            align:'center',
            width: '16%',
            render:()=>{
                return (
                    <span>
                        <Edit />
                        <Divider type="vertical" />
                        <span ref="#" className='blue'>详情</span>
                        <Divider type="vertical" />
                        <span ref="#" className='blue'>删除</span>
                    </span>
                )
            }
        }]
    }
    /**获取所有数据 getAllByPage */
    handleTableChange = (pagination) => {
        this.fetch({
            size: pagination.pageSize,
            page: pagination.current,
            orderField: 'id',
            orderType: 'desc',
  
        });
    };
    fetch = (params = {}) =>{
        axios({
            url:`${this.url.instructor.instructorAll}`,
            method: 'get',
            headers:{
                'Authorization': this.Authorization
            },
            params: params,
        }).then((data)=>{
            const res = data.data.data;
            if(res&&res.list){
                this.pagination.total=res.total;
                this.pagination.current = res.pageNum;
                for(var i = 1; i<=res.list.length; i++){
                    res.list[i-1]['index']=(res.prePage)*10+i;
                }
                this.setState({
                    dataSource: res.list,
                    searchContent:'',
                })
            }
        })
    };
    componentDidMount() {
        this.fetch();
    }
    /**获取查询时名称的实时变化 */
    searchContentChange(e){
        const value = e.target.value;
        this.setState({searchContent:value});
    }
    searchEvent(){
        const ope_name = this.state.searchContent;
        axios({
            url:`${this.url.instructor.instructorAll}`,
            method:'get',
            headers:{
                'Authorization':this.Authorization
            },
            params:{
                // size: this.pagination.pageSize,
                // page: this.pagination.current,
                instructorName:ope_name
            },
            type:'json',
        }).then((data)=>{
            const res = data.data.data;
            if(res&&res.list){
                this.pagination.total=res.total;
                for(var i = 1; i<=res.list.length; i++){
                    res.list[i-1]['index']=(res.prePage)*10+i;
                }
                this.setState({
                    dataSource: res.list,
                });
            }else{
                this.setState({
                    dataSource: null
                })
            }
        })
        };
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current'));
        return (
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent}></BlockQuote>
                <div style={{padding:'15px'}}>
                <AddModal />&nbsp;&nbsp;&nbsp;
                <SearchCell name='请输入指导书名称' fetch={this.fetch} searchEvent={this.searchEvent} searchContentChange={this.searchContentChange}/>
                <div className='clear'></div>
                <Table size="small" dataSource={this.state.dataSource} columns={this.columns} bordered rowKey={record => record.batchNumber} pagination={this.pagination} scroll={{ y: 400 }} onChange={this.handleTableChange}/>
                </div>
            </div>
        );
    }
}

export default Equipment