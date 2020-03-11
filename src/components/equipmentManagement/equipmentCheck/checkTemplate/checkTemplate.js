import React from "react";
import BlockQuote from '../../../BlockQuote/blockquote';
import DeleteByIds from '../../../BlockQuote/deleteByIds';
import {Table, Divider, Popconfirm, message, Spin} from 'antd';
import '../../../Home/page.css';
import AddBut from "./add";
import TreeCard from "./treeCard";
import axios from 'axios';
import Detail from "./details";
import Edit from "./edit";
import {judgeOperation,getOperations} from "../../../commom/getOperations";
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
            deptName:"",
            tableLoading:true,
        };
        this.onSelectChange = this.onSelectChange.bind(this);
        this.cancel=this.cancel.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.getTreeData = this.getTreeData.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.pagination = {
            showTotal(total){
                return `共${total}条记录`
            },
            showSizeChanger: true,
            pageSizeOptions: ['10','20','50','100']
        };
        this.columns=[{
            title:"序号",
            dataIndex:'index',
            key: 'deviceSpotcheckModelsHead.code',
            align:'center',
            width: '10%',
        },{
            title: '设备名称',
            dataIndex: 'deviceSpotcheckModelsHead.deviceName',
            key: 'deviceName',
            align:'center',
            width: '15%',
        },{
            title: '模板名称',
            dataIndex: 'deviceSpotcheckModelsHead.modelName',
            key: 'modelName',
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
            render:(text,record)=>{
                let {deleteFlag,updateFlag}=this.state
                return (
                    <span>
                        <Edit getTableData={this.getTableData} updateFlag={updateFlag}  deptmentCode={this.state.deptCode} info={this.state.lineData} deptCode={record.deviceSpotcheckModelsDetails.code} code = {record.deviceSpotcheckModelsHead.code} deptName={this.state.deptName} deviceName={this.state.deviceName}/>
                        {updateFlag?<Divider type='vertical'/>:''}
                        <Detail code = {record.deviceSpotcheckModelsHead.code} deptName={this.state.deptName} deviceName={this.state.deviceName}/>
                        {deleteFlag?<Divider type='vertical'/>:''}
                        <span className={deleteFlag?'':'hide'}>
                            <Popconfirm title='确定删除?' onConfirm={()=>this.handleDelete(record.deviceSpotcheckModelsHead.code)} okText='确定' cancelText='取消'>
                                <span className='blue'>删除</span>
                            </Popconfirm>
                        </span>
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
                    page:this.pagination.current,
                    size:10,
                    deviceName:res[0].deviceName[0],
                    deptId:res[0].basicInfoDept.code,
                })
            }
        })
        let {openKeys,menuId} = this.current, operations = getOperations(openKeys,menuId);
        this.setState({
            addFlag:judgeOperation(operations,'SAVE'),
            deleteFlag:judgeOperation(operations,'DELETE'),
            updateFlag:judgeOperation(operations,'UPDATE')
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
    onExpand = (expandedKeys) => {
        this.setState({expandedKeys: expandedKeys})
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
                    loading:false

                })
            }
        })
    }
    handleDelete = (id) => {
        axios({
            url:`${this.url.deviceSpot.delete}/${id}`,
            method:'Delete',
            headers:{
                'Authorization':this.Authorization
            },
        }).then((data)=>{
            message.info(data.data.message);
        }).catch((error)=>{
            message.info(error.data)
        });
        setTimeout(() => {
            this.getTableData({
                page:1,
                size:10,
                deviceName:this.state.deviceName,
                deptId:this.state.deptCode
            });
        }, 1000);
    };
    onSelect = (selectedKeys,info)=>{
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
    deleteByIds = ()=>{
        const ids = this.state.selectedRowKeys;
        axios({
            url:`${this.url.deviceSpot.deleteByIds}`,
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
                    page:1,
                    size:10,
                    deviceName:this.state.deviceName,
                    deptId:this.state.deptCode
                })
            }
        }).catch(()=>{
            message.info('删除错误，请联系管理员！')
        })
    }
    getTableData(params = {}){
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
                    dataSource:res.list,
                    tableLoading:false
                })
            }
        })
    }

    handleTableChange(pagination) {
        this.pagination = pagination;
        let {deviceName,deptCode}=this.state,{pageSize,current}=this.pagination
        this.getTableData({
            page: current,
            size: pageSize,
            deviceName: deviceName,
            deptId: deptCode
        });
    }

    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        let { loading, selectedRowKeys ,addFlag,deleteFlag} = this.state;
        this.current = JSON.parse(localStorage.getItem('dataEntry'));
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
          };
        return (
            <div>
                <BlockQuote name={this.current.menuName} menu={this.current.menuParent} menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}></BlockQuote>
                <div className='equipment'>
                    <Spin spinning={this.state.loading} wrapperClassName={'equipment-left'}>
                    <TreeCard treeName={"所属部门"} onExpand={this.onExpand} expandedKeys={this.state.expandedKeys} getTableData={this.getTableData} onSelect = {this.onSelect} selectedKeys={this.state.selectedKeys} TreeData={this.state.TreeData}/></Spin>
                    {/*右边表格部分*/}
                    <Spin spinning={this.state.tableLoading} wrapperClassName='equipment-right'>
                        <AddBut addFlag={addFlag} getTableData={this.getTableData} info={this.state.lineData} deptCode={this.state.deptCode} deviceName={this.state.deviceName} deptName={this.state.deptName}/>
                        <DeleteByIds
                            selectedRowKeys={this.state.selectedRowKeys}
                            loading={loading}
                            cancel={this.cancel}
                            deleteByIds={this.deleteByIds}
                            flag={deleteFlag}
                        />
                        <div className='clear'></div>
                        <Table rowSelection={rowSelection} size="small" rowKey={record => record.deviceSpotcheckModelsHead.code} dataSource={this.state.dataSource}
                               columns={this.columns} bordered pagination={this.pagination} onChange={this.handleTableChange}/>
                    </Spin>
                </div>
            </div>
        )
    }
    /**返回数据录入页面 */
    returnDataEntry = () => {
        this.props.history.push({pathname:'/equipmentCheck'});
    }
}

export default CheckTemplate
