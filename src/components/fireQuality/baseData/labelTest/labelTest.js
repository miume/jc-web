import React,{Component} from 'react'
import BlockQuote from "../../../BlockQuote/blockquote";
import {Divider, Popconfirm, Spin, Table,message} from "antd";
import DeleteByIds from "../../../BlockQuote/deleteByIds";
import SearchCell from '../../../BlockQuote/search'
import Add from '../serialTest/add'
import axios from'axios'
import './labelTest.css'
class FireLabelTest extends Component{
    constructor(props){
        super(props)
        this.state={
            loading:false,
            selectedRowKeys:[]
        }
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:'10%'
        },{
            title:'打印预览',
            dataIndex:'word',
            key:'word',
            width:'40%',
            render:(text,record)=>{
                return(
                    <div className='fire-qua-labelTest1'>
                        <div className='fire-qua-labelTest fire-qua-labelTest-font-big'>TSF1906191206F106XXXXX</div>
                        <div className='fire-qua-labelTest fire-qua-labelTest-font-small'>检验项目 : </div>
                        <div className='fire-qua-labelTest fire-qua-labelTest-font-small'>{record.itemNames}</div>
                        <div className='fire-qua-labelTest fire-qua-labelTest-font-small'>送检时间 : &nbsp;{new Date().toLocaleString()} </div>
                    </div>
                )
            }
        },{
            title:'检验项目',
            dataIndex:'itemNames',
            key:'itemNames',
            width:'20%'
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            width:'20%',
            render:(text,record)=>{
                return(
                    <span>
                        <Add showFlag={true} record={record} url={this.url} editflag={true} getTableData={this.getTableData}/>
                        <Divider type={'vertical'}/>
                         <Popconfirm title={'确定删除吗？'} okText={'确定'} cancelText={'再想想'} onConfirm={()=>this.handleDelete(record.code)}>
                            <span className={'blue'}>删除</span>
                        </Popconfirm>
                    </span>
                )
            }
        }]
        this.back=this.back.bind(this);
        this.deleteByIds=this.deleteByIds.bind(this);
        this.deleteCancel=this.deleteCancel.bind(this);
        this.onSelectChange=this.onSelectChange.bind(this);
        this.back=this.back.bind(this);
        this.getTableData=this.getTableData.bind(this);
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
            url:`${this.url.fireMageLabel}/getAll`,
            method:'get',
            headers:{
                'Authorizaion':this.url.Authorizaion
            }
        }).then(data=>{
            let res=data.data.data
            if(res){
                for(let i=0;i<res.length;i++){
                    res[i]['index']=(i+1)
                }
                this.setState({
                    dataSource:res,
                    loading:false,
                })
            }
        })
    }
    handleDelete(id){
        axios({
            url:`${this.url.fireMageLabel}/${id}`,
            method:'delete',
            headers: {
                'Authorizaion':this.url.Authorizaion
            }
        }).then(data=>{
            if(data.data.code===0){
                message.info('删除成功!')
                this.getTableData()
            }
            else{
                message.error('操作失败，请联系管理员!')
            }
        }).catch(()=>{
            message.error('操作失败，请联系管理员!')
        })
    }
    deleteByIds(){
        let {selectedRowKeys}=this.state
        axios({
            url:`${this.url.fireMageLabel}/ids`,
            method:'delete',
            headers: {
                'Authorizaion':this.url.Authorizaion
            },
            data:selectedRowKeys
        }).then(data=>{
            if(data.data.code===0){
                message.info('删除成功!')
                this.getTableData()
            }
            else{
                message.error('操作失败，请联系管理员!')
            }
        }).catch(()=>{
            message.error('操作失败，请联系管理员!')
        })
    }
    deleteCancel(){
        this.setState({
            selectedRowKeys:[]
        })
    }
    /**复选框变化*/
    onSelectChange(selectedRowKeys){
        this.setState({
            selectedRowKeys:selectedRowKeys
        })
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
                <BlockQuote name={'标签与检验项目'}  menu={current.menuParent} menu2={'返回'} returnDataEntry={this.back}/>
                <Spin spinning={loading} wrapperClassName={'rightDiv-content'}>
                    <Add showFlag={true} url={this.url} getTableData={this.getTableData}/>
                    <DeleteByIds selectedRowKeys={selectedRowKeys} deleteByIds={this.deleteByIds} cancel={this.deleteCancel} flag={true}/>
                    <Table dataSource={this.state.dataSource} rowKey={record=>record.code} rowSelection={rowSelection} pagination={false} columns={this.columns} bordered size={'small'}/>
                </Spin>
            </div>
        )
    }
}
export default FireLabelTest