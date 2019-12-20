import React,{Component} from 'react'
import BlockQuote from "../../../BlockQuote/blockquote";
import {Spin, Table, Divider, message, Popconfirm} from "antd";
import DeleteByIds from "../../../BlockQuote/deleteByIds";
import Add from './add'
import axios from "axios";
import dataSample from "echarts/src/processor/dataSample";
class FireTestItem extends Component{
    constructor(props){
        super(props)
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index'
        },{
            title:'检测项目名称',
            dataIndex:'name',
            key:'name'
        },{
            title:'单位',
            dataIndex:'unit',
            key:'unit'
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            render:(text,record)=>{
                return(
                    <span>
                        <Add url={this.url} getTableData={this.getTableData} record={record} editflag={true}/>
                        <Divider type={'vertical'}/>
                        <Popconfirm title={'确定删除吗？'} okText={'确定'} cancelText={'再想想'} onConfirm={()=>this.handleDelete(record.code)}>
                            <span className={'blue'}>删除</span>
                        </Popconfirm>
                    </span>
                )
            }
        }]
        this.state={
            loading:false,
            selectedRowKeys:[],
            dataSource:[]
        }
        this.back=this.back.bind(this);
        this.getTableData=this.getTableData.bind(this);
        this.deleteByIds=this.deleteByIds.bind(this);
        this.deleteCancel=this.deleteCancel.bind(this);
        this.onSelectChange=this.onSelectChange.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
    }
    componentDidMount() {
        this.getTableData()
    }
    componentWillUnmount() {
        this.setState=()=>{
            return
        }
    }

    getTableData(){
        this.setState({
            loading:true
        })
        axios({
            url:`${this.url.fireMageTestItems}/page`,
            method:'get',
            headers:{
                'Authorizaion':this.url.Authorizaion
            }
        }).then(data=>{
            let res=data.data.data
            if(res&&res.list){
                for(let i=0;i<res.list.length;i++){
                    res.list[i]['index']=(res.page-1)*(res.size)+(i+1)
                }
                this.setState({
                    dataSource:res.list,
                    loading:false
                })
            }
        })
    }
    deleteByIds(){
        let ids=this.state.selectedRowKeys
        axios({
            url:`${this.url.fireMageTestItems}/${ids}`,
            method:'delete',
            headers:{
                'Authorizaion':this.url.Authorizaion
            }
        }).then(data=>{
            if(data.data.code===0){
                message.info('操作成功!')
                this.getTableData()
            }
            else{
                message.error('操作失败，请联系管理员!')
            }
        })
    }
    deleteCancel(){
        this.setState({
            selectedRowKeys:[]
        });
    }
    handleDelete(id){
        axios({
            url:`${this.url.fireMageTestItems}/${id}`,
            method:'delete',
            headers:{
                'Authorizaion':this.url.Authorizaion
            }
        }).then(data=>{
            if(data.data.code===0){
                message.info('操作成功!')
                this.getTableData()
            }
            else{
                message.error('操作失败，请联系管理员!')
            }
        })
    }
    onSelectChange(selectedRowKeys){
        this.setState({ selectedRowKeys: selectedRowKeys});
    }
    back(){
        this.props.history.push({pathname:"/fireBasicData"})
    }
    render(){
        const current=JSON.parse(localStorage.getItem('current'))
        this.url=JSON.parse(localStorage.getItem('url'))
        let {loading,selectedRowKeys}=this.state
        const rowSelection = {//checkbox
            selectedRowKeys,
            onChange:this.onSelectChange,
        };
        return(
            <div>
                <BlockQuote name={'检验项目'} menu={current.menuParent} menu2={'返回'} returnDataEntry={this.back}/>
                <Spin spinning={loading} wrapperClassName={'rightDiv-content'}>
                    <Add url={this.url} getTableData={this.getTableData} />
                    <DeleteByIds selectedRowKeys={selectedRowKeys} deleteByIds={this.deleteByIds} cancel={this.deleteCancel} flag={true}/>
                    <Table rowSelection={rowSelection} pagination={false} columns={this.columns}
                           dataSource={this.state.dataSource} rowKey={record => record.code} bordered size={'small'} />
                </Spin>
            </div>
        )
    }
}
export default FireTestItem