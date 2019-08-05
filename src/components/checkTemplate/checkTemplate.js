import React from "react";
import BlockQuote from '../BlockQuote/blockquote';
import DeleteByIds from '../BlockQuote/deleteByIds';
import axios from "axios";
import { Table,Popconfirm,Divider,message } from 'antd';
import '../Home/page.css';
import AddBut from "./add";
import TreeCard from "./treeCard";

// const data = [];
// for(var i=0;i<5;i++){
//     data.push({
//         key:i,
//         index:i,
//         name:"名字"+i,
//         date:"日期"+i,
//         person:"人"+i,
//         tableDate:"时间"+i,
//         status:"状态"+i,
//     })
// }

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
            pageChangeFlag:0,
            selectedKeys:[],
            lineData:[],
            expandedKeys:[],
            TreeData:[],
            deptCode:"",
            deviceName:"",
            deptName:""
        };
        this.onSelectChange = this.onSelectChange.bind(this);
        this.cancel=this.cancel.bind(this);
        this.judgeOperation = this.judgeOperation.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.getTreeData = this.getTreeData.bind(this);
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
            dataIndex: 'deviceSpotcheckModelsHead.deviceName',
            key: 'deviceName',
            align:'center',
            width: '15%',
        },{
            title: '生效日期',
            dataIndex: 'deviceSpotcheckModelsHead.effectDate',
            key: 'effectDate',
            align:'center',
            width: '15%',
        },{
            title: '制表人',
            dataIndex: 'peopleName',
            key: 'peopleName',
            align:'center',
            width: '15%',
        },{
            title: '制表日期',
            dataIndex: 'deviceSpotcheckModelsHead.tabulateDate',
            key: 'tabulateDate',
            align:'center',
            width: '15%',
        },{
            title: '模板状态',
            dataIndex: 'deviceSpotcheckModelsHead.modelStatus',
            key: 'modelStatus',
            align:'center',
            width: '15%',
            render: (statusCode) => {
                if(statusCode === false)
                        return <span className="main-statu1"><i style={{color: `\t#53FF53`}} className="fa fa-circle" aria-hidden="true"></i>&nbsp;生效</span>
                   else
                        return <span className="main-statu2"><i style={{color: `\t#9D9D9D`}} className="fa fa-circle" aria-hidden="true"></i>&nbsp;失效</span>
                }
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
                        <Divider type="vertical" />
                        <a href="#">删除</a>
                    </span>
                )
            }
        }]
    }
    onSelectChange(selectedRowKeys) {
        this.setState({ selectedRowKeys:selectedRowKeys }); 
    }
    componentDidMount(){
        this.getTreeData()
        axios({
            url:`${this.url.deviceSpot.getAllDevices}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization
            },
        }).then((data)=>{
            const res = data.data.data
            if(res.length !== 0){
                this.getTableData({
                    page:1,
                    size:10,
                    deviceName:res[0].deviceName[0],
                    deptId:res[0].basicInfoDept.code,
                })
            }
        })
        
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
          return ;
        }
      }
    cancel() {
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }
    getTreeData(){
        axios({
            url:`${this.url.deviceSpot.getAllDevices}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization
            },
        }).then((data)=>{
            const res = data.data.data
            if(res.length !== 0){
                var defaultkey = [];
                defaultkey.push(res[0].basicInfoDept.code.toString());
                var selectedKey = [];
                selectedKey.push(res[0].basicInfoDept.code.toString()+"-"+0);
                this.setState({
                    TreeData:res,
                    expandedKeys:defaultkey,
                    selectedKeys:selectedKey,
                    deptCode:res[0].basicInfoDept.code,
                    deviceName:res[0].deviceName[0],
                    deptName:res[0].basicInfoDept.name,

                })
            }
        })
    }
    onSelect = (selectedKeys,info)=>{
        // console.log(info)
        this.getTableData({
            page:1,
            size:10,
            deviceName:info.node.props.title,
            deptId:parseInt(selectedKeys)
        })
        this.setState({
            selectedKeys:selectedKeys,
            deptCode:info.node.props.code,
            deviceName:info.node.props.title,
            deptName:info.node.props.fatherName,
        })
    }
    getTableData = (params = {})=>{
        axios({
            url:`${this.url.deviceSpot.planPage}`,
            method:"get",
            headers:{
                'Authorization': this.url.Authorization
            },
            params: params,
        }).then((data)=>{
            const res = data.data.data
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
    
    judgeOperation(operation,operationCode){
        if(operation===null) return false
        var flag = operation?operation.filter(e=>e.operationCode===operationCode):[];
        return flag.length>0?true:false
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
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
                    <div style={{width:"20%"}}>
                    <TreeCard expandedKeys={this.state.expandedKeys} getTableData={this.getTableData} onSelect = {this.onSelect} selectedKeys={this.state.selectedKeys} TreeData={this.state.TreeData}/></div>
                    <div style={{width:"80%",marginLeft:"15px"}}>
                    <AddBut getTableData={this.getTableData} info={this.state.lineData} deptCode={this.state.deptCode} deviceName={this.state.deviceName} deptName={this.state.deptName}/>
                    <DeleteByIds
                        selectedRowKeys={this.state.selectedRowKeys}
                        loading={loading}
                        cancel={this.cancel}
                        flag={this.judgeOperation(this.operation,'DELETE')}
                    />
                    <div className='clear'></div>
                        <Table rowSelection={rowSelection} size="small" rowKey={record => record.index} dataSource={this.state.dataSource} columns={this.columns} bordered pagination={this.pagination}  scroll={{ y: 400 }}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default CheckTemplate