/**检验管理-送检登记*/
import React,{Component} from 'react'
import BlockQuote from "../../../BlockQuote/blockquote";
import {Spin, Table, message} from "antd";
import DeleteByIds from "../../../BlockQuote/deleteByIds";
import Add from './add'
import Detail from './detail'
import axios from "axios";

class FireInsRegister extends Component{
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
                    <Detail url={this.url} getTableData={this.getTableData} record={record} editflag={true}/>
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
        this.onSelectChange=this.onSelectChange.bind(this);
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
                <BlockQuote name={'送检登记'} menu={current.menuParent} menu2={'返回'} returnDataEntry={this.back}/>
                <Spin spinning={loading} wrapperClassName={'rightDiv-content'}>
                    <Add url={this.url} getTableData={this.getTableData} />
                    <Table rowSelection={rowSelection} pagination={false} columns={this.columns}
                           dataSource={this.state.dataSource} rowKey={record => record.code} bordered size={'small'} />
                </Spin>
            </div>
        )
    }
}
export default FireInsRegister