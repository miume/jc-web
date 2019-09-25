import React from "react";
import axios from "axios";
import SearchCell from "./search";
import { Table,Divider,Popconfirm,message } from 'antd';
import TreeCard from '../treeCard';
import Detail from "../details";
import DeleteByIds from '../../../../BlockQuote/deleteByIds';
import AddModal from './add';
import Edit from './edit';

class CheckPlan extends React.Component{
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
        this.cancel=this.cancel.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.pagination = {
            showTotal(total){
                return `共${total}条记录`
            },
            showSizeChanger: true,
        };
        this.columns=[{
            title:"序号",
            dataIndex:'index',
            key: 'devicePatrolPlanRecordHead.code',
            align:'center',
            width: '10%',
        },{
            title:"计划名称",
            dataIndex:'devicePatrolPlanRecordHead.planName',
            key: 'devicePatrolPlanRecordHead.planName',
            align:'center',
            width: '15%',
        },{
            title:"巡检模板名称",
            dataIndex:'modelName',
            key: 'modelName',
            align:'center',
            width: '20%',
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
            width: '20%',
        },{
            title:"操作",
            dataIndex: 'operation',
            key: 'operation',
            align:'center',
            width: '20%',
            render:(text,record)=>{
                // console.log(record)
                return(
                    <span>
                        <Edit pagination={this.pagination} deptName={this.state.deviceName} planId={record.devicePatrolPlanRecordHead.code} getTableData={this.getTableData} deptCode={this.state.selectedKeys.length!==0?this.state.selectedKeys[0].split("-")[1]:""}/>
                        <Divider type="vertical" />
                        <Detail code={record.devicePatrolPlanRecordHead.code}/>
                        <Divider type="vertical" />
                        <Popconfirm title="确定删除?" onConfirm={()=>this.handleDelete(record.devicePatrolPlanRecordHead.code)} okText="确定" cancelText="取消" >
                            <span className={this.judgeOperation(this.operation,'DELETE')?'blue':'hide'} href="#">删除</span>
                        </Popconfirm>
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
            if(res.length !== 0){
                this.getTableData({
                    page:this.pagination.current,
                    size:this.pagination.pageSize,
                    deptId:res[0].son[0].code,
                    status:1,
                })
            }
        })
    }
    cancel() {
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }
    handleDelete = (id) => {
        axios({
            url:`${this.url.devicePatrolPlan.delete}`,
            method:'Delete',
            params:{planId:id},
            headers:{
                'Authorization':this.Authorization
            },
        }).then((data)=>{
            message.info(data.data.message);
        }).catch((error)=>{
            message.info(error.data)
        });
        setTimeout(() => {
            // if((this.pagination.total-1)%10===0){
            //     this.pagination.current = this.pagination.current-1
            // }
            this.getTableData({
                page:this.pagination.current,
                size:this.pagination.pageSize,
                deptId:parseInt(this.state.selectedKeys[0].split("-")[1]),
                status:1
            });
        }, 1000);
    };
    componentWillUnmount() {
        this.setState = (state, callback) => {
          return ;
        }
      }
      onExpand = (expandedKeys) => {
        this.setState({expandedKeys: expandedKeys})
    }
    deleteByIds = ()=>{
        const ids = this.state.selectedRowKeys;
        axios({
            url:`${this.url.devicePatrolPlan.deleteByIds}`,
            method:'delete',
            headers:{
                'Authorization':this.Authorization
            },
            data:ids,
            type:'json'
        }).then((data)=>{
            message.info(data.data.message);
            if(data.data.code===0){
                this.getTableData({
                    page:this.pagination.current,
                    size:this.pagination.pageSize,
                    deptId:parseInt(this.state.selectedKeys[0].split("-")[1]),
                    status:1
                })
            }
        }).catch(()=>{
            message.info('删除错误，请联系管理员！')
        })
    }
    getTableData = (params = {})=>{
        console.log(params)
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
                    dataSource:res.list,
                    searchContent:'',
                    selectedRowKeys: [],
                })
            }
        })
    }
    onSelect = (selectedKeys,info)=>{
        this.getTableData({
            page:this.pagination.current,
            size:this.pagination.pageSize,
            deptId:selectedKeys.length!==0?parseInt(selectedKeys[0].split("-")[1]):"",
            status:1
        })
        this.setState({
            selectedKeys:selectedKeys,
            deviceName:info.node.props.title
        })
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
                status:1,
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
    judgeOperation(operation,operationCode){
        if(operation===null) return false
        var flag = operation?operation.filter(e=>e.operationCode===operationCode):[];
        return flag.length>0?true:false
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
    /**实现全选 */
    onSelectChange(selectedRowKeys) {
        // console.log(selectedRowKeys)
        this.setState({ selectedRowKeys:selectedRowKeys });
    }
    render(){
        /** 先获取数据录入的所有子菜单，在筛选当前子菜单的所有操作权限*/
        const current = JSON.parse(localStorage.getItem('equipmentInspection'));
        const operation = JSON.parse(localStorage.getItem('menus')) ? JSON.parse(localStorage.getItem('menus')).filter(e => e.menuName === current.menuParent)[0].menuList : null;
        this.operation = operation.filter(e => e.path === current.path)[0].operations;
        this.ob = JSON.parse(localStorage.getItem('menuList'));
        const { loading,selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            onSelect() {},
            onSelectAll() {},
          };
        return (
            <div>
                <div style={{padding:'15px',display:'flex'}}>
                    <div style={{width:"20%"}}>
                        <TreeCard treeName={"所属部门"} onExpand={this.onExpand} expandedKeys={this.state.expandedKeys} getTableData={this.getTableData} onSelect = {this.onSelect} selectedKeys={this.state.selectedKeys} TreeData={this.state.TreeData}/>
                    </div>
                    <div style={{width:"80%",marginLeft:"15px"}}>
                    <AddModal userId={this.ob.userId} pagination={this.pagination} deptName={this.state.deviceName} getTableData={this.getTableData} deptCode={this.state.selectedKeys.length!==0?this.state.selectedKeys[0].split("-")[1]:""}/>
                    <DeleteByIds
                        selectedRowKeys={this.state.selectedRowKeys}
                        loading={loading}
                        cancel={this.cancel}
                        deleteByIds={this.deleteByIds}
                        flag={this.judgeOperation(this.operation,'DELETE')}
                    />
                    <SearchCell name='请输入计划名称' type={this.props.type} searchEvent={this.searchEvent} pagination={this.pagination} selectedKeys={this.state.selectedKeys} searchContentChange={this.searchContentChange} fetch={this.getTableData} flag={this.judgeOperation(this.operation,'QUERY')}/>
                    <div className='clear' ></div>
                        <Table rowSelection={rowSelection} size="small" rowKey={record => record.devicePatrolPlanRecordHead.code} pagination={this.pagination} dataSource={this.state.dataSource} columns={this.columns} bordered scroll={{ y: 400 }}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default CheckPlan
