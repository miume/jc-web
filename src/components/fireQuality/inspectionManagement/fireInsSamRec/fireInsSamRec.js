/**检验管理-样品接收*/
/**检验管理-送检登记*/
import React,{Component} from 'react'
import BlockQuote from "../../../BlockQuote/blockquote";
import {Spin, Table, Divider, message, Popconfirm} from "antd";
import DeleteByIds from "../../../BlockQuote/deleteByIds";
import Add from './add'
import axios from "axios";

class FireInsSamRec extends Component{
    constructor(props){
        super(props)
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index'
        },{
            title:'批号',
            dataIndex:'batch',
            key:'batch'
        },{
            title:'检验项目',
            dataIndex:'item',
            key:'item'
        },{
            title:'送检部门',
            dataIndex:'dept',
            key:'dept'
        },{
            title:'送检人',
            dataIndex:'deliveryPeople',
            key:'deliveryPeople'
        },{
            title:'登记时间',
            dataIndex:'checkInTime',
            key:'checkInTime'
        },{
            title:'确认时间',
            dataIndex:'comfirmTime',
            key:'comfirmTime'
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            render:(text,record)=>{
                return(
                    <span>
                        <Add url={this.url} getTableData={this.getTableData} record={record} editflag={true}/>
                        <Divider type={'vertical'}/>
                        <Popconfirm title={'确定删除吗？'} okText={'确定'} cancelText={'再想想'} onConfirm={()=>this.handleDelete(record.index)}>
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
        //this.getTableData()
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

    }
    deleteByIds(){
        let ids=this.state.selectedRowKeys
        // axios({
        //     url:`${this.url.fireMageTestItems}/${ids}`,
        //     method:'delete',
        //     headers:{
        //         'Authorizaion':this.url.Authorizaion
        //     }
        // }).then(data=>{
        //     if(data.data.code===0){
        //         message.info('操作成功!')
        //         this.getTableData()
        //     }
        //     else{
        //         message.error('操作失败，请联系管理员!')
        //     }
        // })
    }
    deleteCancel(){
        this.setState({
            selectedRowKeys:[]
        });
    }
    handleDelete(id){
        // axios({
        //     url:`${this.url.fireMageTestItems}/${id}`,
        //     method:'delete',
        //     headers:{
        //         'Authorizaion':this.url.Authorizaion
        //     }
        // }).then(data=>{
        //     if(data.data.code===0){
        //         message.info('操作成功!')
        //         this.getTableData()
        //     }
        //     else{
        //         message.error('操作失败，请联系管理员!')
        //     }
        // })
    }
    onSelectChange(selectedRowKeys){
        this.setState({ selectedRowKeys: selectedRowKeys});
    }
    back(){
        this.props.history.push({pathname:"/inspectionManagement"})
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
                <BlockQuote name={'样品接收'} menu={current.menuParent} menu2={'返回'} returnDataEntry={this.back}/>
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
export default FireInsSamRec