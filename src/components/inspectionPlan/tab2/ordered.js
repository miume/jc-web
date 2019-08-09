import React from "react";
import axios from "axios";
import SearchCell from '../../BlockQuote/search';
import { Table,Divider,Popconfirm,message } from 'antd';
import TreeCard from '../treeCard';

class Ordered extends React.Component{
    url = JSON.parse(localStorage.getItem('url'));
    constructor(props){
        super(props);
        this.state = {
            dataSource:[],
            selectedRowKeys: [],
            loading: false,
            searchContent:'',
            searchText: '',
            treeData:[],
            defaultkey:'',
            selectedKeys:[],
            deptCode:'',
            deviceName:'',
            deptName:'',
            sonKey:""
        }
        this.url=JSON.parse(localStorage.getItem('url'));
        this.pagination = {
            total: this.state.dataSource.length,
            showTotal(total){
                return `共${total}条记录`
            },
            showSizeChanger: true,
        };
        this.columns=[{
            title:"序号",
            dataIndex:'devicePatrolPlanRecordHead.code',
            key: 'index',
            align:'center',
            width: '10%',
        },{
            title:"计划名称",
            dataIndex:'devicePatrolPlanRecordHead.planName',
            key: 'devicePatrolPlanRecordHead.planName',
            align:'center',
            width: '10%',
        },{
            title:"巡检模板名称",
            dataIndex:'modelName',
            key: 'modelName',
            align:'center',
            width: '10%',
        },{
            title:"检查类型",
            dataIndex:'devicePatrolPlanRecordHead.checkType',
            key: 'devicePatrolPlanRecordHead.checkType',
            align:'center',
            width: '10%',
            render:(record)=>{
                if(record===true){
                    return "电气类"
                }else{
                    return "机械类"
                }
            }
        },{
            title:"计划日期",
            dataIndex:'devicePatrolPlanRecordHead.planTime',
            key: 'devicePatrolPlanRecordHead.planTime',
            align:'center',
            width: '10%',
        },{
            title:"操作",
            dataIndex: 'operation',
            key: 'operation',
            align:'center',
            width: '15%',
            render:()=>{
                return(
                    <span>
                        <a href="#">详情</a>
                    </span>
                )
            }
        }]
    }
    componentDidMount(){
        this.getTreeData();
        axios({
            url:`${this.url.equipmentDept.dept}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization
            },
        }).then((data)=>{
            const res = data.data.data;
            // console.log(res[0].son[0].code);
            if(res.length !== 0){
                this.getTableData({
                    page:this.pagination.current,
                    size:10,
                    deptId:res[0].son[0].code,
                    status:1
                })
            }
        })
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
          return ;
        }
      }
      onExpand = (expandedKeys) => {
        this.setState({expandedKeys: expandedKeys})
    }
    getTableData = (params = {})=>{
        axios({
            url:`${this.url.devicePatrolPlan.page}`,
            method:"get",
            headers:{
                'Authorization': this.url.Authorization
            },
            params: params,
        }).then((data)=>{
            const res = data.data.data;
            // console.log(res);
            if(res&&res.list){
                this.pagination.total = res.total;
                this.pagination.current = res.page;
                for(var i = 1; i<=res.list.length; i++){
                    res.list[i-1]['index']=(res.page-1)*10+i;
                }
                this.setState({
                    dataSource:res.list
                })
            }
        })
    }
    onSelect = (selectedKeys,info)=>{
        // console.log(selectedKeys)
        this.getTableData({
            page:1,
            size:10,
            deptId:parseInt(selectedKeys[0].split("-")[1]),
            status:1
        })
        this.setState({
            selectedKeys:selectedKeys,
        })
    }
    getTreeData(){
        axios({
            url:`${this.url.equipmentDept.dept}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization
            },
        }).then((data)=>{
            const res = data.data.data;
            // console.log(res);
            if(res.length !== 0){
                var defaultkey = [];
                defaultkey.push(res[0].parent.code.toString());
                var selectedKey = [];
                selectedKey.push(res[0].parent.code.toString()+"-"+res[0].son[0].code.toString());
                this.setState({
                    TreeData:res,
                    expandedKeys:defaultkey,
                    selectedKeys:selectedKey,
                    deptCode:res[0].parent.code,
                    deviceName:res[0].son[0].name,
                    deptName:res[0].parent.name,
                    sonKey:res[0].son[0].code,
                })
            }
        })
    }
    render(){
        return (
            <div>
                <div style={{padding:'15px',display:'flex',margin:'15px'}}>
                    <div style={{width:"20%"}}>
                        <TreeCard treeName={"所属部门"} onExpand={this.onExpand} expandedKeys={this.state.expandedKeys} getTableData={this.getTableData} onSelect = {this.onSelect} selectedKeys={this.state.selectedKeys} TreeData={this.state.TreeData}/>
                    </div>
                    <div style={{width:"80%",marginLeft:"15px"}}>
                        <Table size="small" rowKey={record => record.devicePatrolPlanRecordHead.code} pagination={this.pagination} dataSource={this.state.dataSource} columns={this.columns} bordered scroll={{ y: 400 }}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Ordered