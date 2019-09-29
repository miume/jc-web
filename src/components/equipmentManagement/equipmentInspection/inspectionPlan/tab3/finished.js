import React from "react";
import axios from "axios";
import SearchCell from './search';
import { Table,Divider,Popconfirm,message } from 'antd';
import TreeCard from '../treeCard';
import Detail from "../details"

class Finished extends React.Component{
    operation
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
        this.searchContentChange = this.searchContentChange.bind(this);
        this.judgeOperation = this.judgeOperation.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
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
            render:(text,record)=>{
                return(
                    <span>
                        <Detail code={record.devicePatrolPlanRecordHead.code}/>
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
                    status:3
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
            page:this.pagination.current,
            size:this.pagination.pageSize,
            deptId:parseInt(selectedKeys[0].split("-")[1]),
            status:3
        })
        this.setState({
            selectedKeys:selectedKeys,
        })
    }
    judgeOperation(operation,operationCode){
        if(operation===null) return false
        var flag = operation?operation.filter(e=>e.operationCode===operationCode):[];
        return flag.length>0?true:false
    }
    searchContentChange(e){
        const value = e.target.value;
        this.setState({searchContent:value});
    }
    searchEvent(){
        const ope_name = this.state.searchContent;
        axios({
            url:`${this.url.devicePatrolPlan.page}`,
            method:'get',
            headers:{
                'Authorization':this.Authorization
            },
            params:{
                size: this.pagination.pageSize,
                page: this.pagination.current,
                condition:ope_name,
                status:3,
                deptId:this.state.selectedKeys[0].split("-")[1]
            },
            type:'json',
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
        };
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
        /** 先获取数据录入的所有子菜单，在筛选当前子菜单的所有操作权限*/
        const current = JSON.parse(localStorage.getItem('equipmentInspection'));
        const operation = JSON.parse(localStorage.getItem('menus')) ? JSON.parse(localStorage.getItem('menus')).filter(e => e.menuName === current.menuParent)[0].menuList : null;
        this.operation = operation.filter(e => e.path === current.path)[0].operations
        return (
            <div>
                <div style={{padding:'15px',display:'flex'}}>
                    <div style={{width:"20%"}}>
                        <TreeCard treeName={"所属部门"} onExpand={this.onExpand} expandedKeys={this.state.expandedKeys} getTableData={this.getTableData} onSelect = {this.onSelect} selectedKeys={this.state.selectedKeys} TreeData={this.state.TreeData}/>
                    </div>
                    <div style={{width:"80%",marginLeft:"15px"}}>
                    <SearchCell name='请输入计划名称' type={this.props.type} searchEvent={this.searchEvent} pagination={this.pagination} selectedKeys={this.state.selectedKeys} searchContentChange={this.searchContentChange} fetch={this.getTableData} flag={this.judgeOperation(this.operation,'QUERY')}/>
                    <div className='clear' ></div>
                        <Table size="small" rowKey={record => record.devicePatrolPlanRecordHead.code} pagination={this.pagination} dataSource={this.state.dataSource} columns={this.columns} bordered/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Finished
