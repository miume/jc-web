import React from 'react';
import axios from "axios";
import '../Home/page.css';
import BlockQuote from '../BlockQuote/blockquote';
import SearchCell from '../BlockQuote/search';
import DeleteByIds from '../BlockQuote/deleteByIds';
import { Table,Popconfirm,Divider,message } from 'antd';

const data = [];
for(let i = 1;i<=10;i++){
    data.push({
        key:i,
        index:i,
        serial:'ABC'+i,
        name:'name'+i,
        time:'1994-'+i+"-10",
        person:'person'+i,
    })
}

class Equipment extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dataSource:[],
            pagination:[],
            selectedRowKeys: [],
            searchContent:'',
        }
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
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
            title: '编号',
            dataIndex: 'serial',
            key: 'serial',
            align:'center',
            width: '16%',
        },{
            title: '指导书名称',
            dataIndex: 'name',
            key: 'name',
            align:'center',
            width: '16%',
        },{
            title: '生效时间',
            dataIndex: 'time',
            key: 'time',
            align:'center',
            width: '16%',
        },{
            title: '编制人',
            dataIndex: 'person',
            key: 'person',
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
                        <span className='blue'>编辑</span>
                        <Divider type="vertical" />
                        <span ref="#" className='blue'>详情</span>
                        <Divider type="vertical" />
                        <span ref="#" className='blue'>删除</span>
                    </span>
                )
            }
        }]
    }
    /**获取查询时名称的实时变化 */
    searchContentChange(e){
        const value = e.target.value;
        this.setState({searchContent:value});
    }
    searchEvent(){
        console.log(this.searchContentChange)
    }
    onSelectChange(selectedRowKeys) {
        this.setState({ selectedRowKeys:selectedRowKeys }); 
    }
    render(){
        const current = JSON.parse(localStorage.getItem('current'));
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            onSelect() {},
            onSelectAll() {},
          };
        return (
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent}></BlockQuote>
                <div style={{padding:'15px'}}>
                <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} />
                <SearchCell name='请输入指导书名称' searchEvent={this.searchEvent} searchContentChange={this.searchContentChange}/>
                <Table size="small" dataSource={data} rowSelection={rowSelection} columns={this.columns} bordered pagination={this.pagination}  scroll={{ y: 400 }}/>
                </div>
            </div>
        );
    }
}

export default Equipment