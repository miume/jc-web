import React from "react";
import BlockQuote from '../BlockQuote/blockquote';
import DeleteByIds from '../BlockQuote/deleteByIds';
import axios from "axios";
import { Table,Popconfirm,Divider,message } from 'antd';
import '../Home/page.css';
import AddBut from "./add";
import TreeCard from "../BlockQuote/treeSelect";

const data = [];
for(var i=0;i<5;i++){
    data.push({
        key:i,
        index:i,
        name:"名字"+i,
        date:"日期"+i,
        person:"人"+i,
        tableDate:"时间"+i,
        status:"状态"+i,
    })
}

class CheckTemplate extends React.Component{
    url
    status
    operation
    constructor(props){
        super(props)
        this.state = {
            dataSource:[],
            selectedRowKeys:[],
            loading: false,
            pagination:[],
            searchContent:'',
            clicked:false,
            Contentvalue:'',
            pageChangeFlag:0 
        };
        this.onSelectChange = this.onSelectChange.bind(this);
        this.cancel=this.cancel.bind(this);
        this.judgeOperation = this.judgeOperation.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.pagination = {
            total: this.state.dataSource.length,
            showTotal(total){
                return `共${total}条记录`
            },
            showSizeChanger: true,
        };
        this.columns=[{
            title:"序号",
            dataIndex:'index',
            key: 'index',
            align:'center',
            width: '10%',
        },{
            title: '设备名称',
            dataIndex: 'name',
            key: 'name',
            align:'center',
            width: '15%',
        },{
            title: '生效日期',
            dataIndex: 'date',
            key: 'date',
            align:'center',
            width: '15%',
        },{
            title: '制表人',
            dataIndex: 'person',
            key: 'person',
            align:'center',
            width: '15%',
        },{
            title: '制表日期',
            dataIndex: 'tableDate',
            key: 'tableDate',
            align:'center',
            width: '15%',
        },{
            title: '模板状态',
            dataIndex: 'status',
            key: 'status',
            align:'center',
            width: '15%',
        },{
            title:"操作",
            dataIndex: 'operation',
            key: 'operation',
            align:'center',
            width: '15%',
            render:()=>{
                return (
                    <span>
                        <a href="#">编辑</a>
                        <Divider type="vertical" />
                        <a href="#">详情</a>
                    </span>
                )
            }
        }]
    }
    onSelectChange(selectedRowKeys) {
        this.setState({ selectedRowKeys:selectedRowKeys }); 
    }
    cancel() {
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }
    getTableData(){

    }
    judgeOperation(operation,operationCode){
        if(operation===null) return false
        var flag = operation?operation.filter(e=>e.operationCode===operationCode):[];
        return flag.length>0?true:false
    }
    render(){
        
        const { loading, selectedRowKeys } = this.state;
        const current = JSON.parse(localStorage.getItem('equipmentCheck'));
        const operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.menuName===current.menuParent)[0].menuList:null;
        this.operation = operation.filter(e=>e.path === current.path)[0].operations
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            onSelect() {},
            onSelectAll() {},
            // getCheckboxProps: record => ({
            //     disabled: record.commonBatchNumber.status === 2, // Column configuration not to be checked
            //   }),
          };
        return (
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent}></BlockQuote>
                <div style={{padding:'15px',display:'flex',margin:'15px'}}>
                    <TreeCard getTableData={this.getTableData} />
                    <div style={{width:"80%",marginLeft:"15px"}}>
                    <AddBut />
                    <DeleteByIds
                        selectedRowKeys={this.state.selectedRowKeys}
                        loading={loading}
                        cancel={this.cancel}
                        flag={this.judgeOperation(this.operation,'DELETE')}
                    />
                    <div className='clear'></div>
                        <Table rowSelection={rowSelection} size="small" rowKey={record => record.index} dataSource={data} columns={this.columns} bordered pagination={this.pagination}  scroll={{ y: 400 }}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default CheckTemplate