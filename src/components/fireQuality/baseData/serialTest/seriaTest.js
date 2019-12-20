import React,{Component} from 'react'
import BlockQuote from "../../../BlockQuote/blockquote";
import {Divider, Popconfirm, Spin, Table} from "antd";
import DeleteByIds from "../../../BlockQuote/deleteByIds";
import SearchCell from '../../../BlockQuote/search'
import Add from './add'
class FireSerialTest extends Component{
    constructor(props){
        super(props)
        this.state={
            loading:false,
            selectedRowKeys:[]
        }
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index'
        },{
            title:'工序',
            dataIndex:'word',
            key:'word'
        },{
            title:'产品型号/厂家',
            dataIndex:'demo',
            key:'demo'
        },{
            title:'检验项目',
            dataIndex:'item',
            key:'item'
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            render:(text,record)=>{
                return(
                    <span>
                        <Add url={this.url} record={record}/>
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
        this.searchEvent=this.searchEvent.bind(this);
        this.searchContentChange=this.searchContentChange.bind(this);
        this.reset=this.reset.bind(this);
        this.getTableData=this.getTableData.bind(this)
        this.handleDelete=this.handleDelete.bind(this);
    }
    getTableData(){

    }
    deleteByIds(){

    }
    deleteCancel(){

    }
    handleDelete(){

    }
    /**复选框变化*/
    onSelectChange(){

    }
    searchEvent(){

    }
    searchContentChange(){

    }
    reset(){

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
                <BlockQuote name={'批号与检验项目'} menu={current.menuParent}  menu2={'返回'} returnDataEntry={this.back}/>
                <Spin spinning={loading} wrapperClassName={'rightDiv-content'}>
                    <Add url={this.url} />
                    <DeleteByIds selectedRowKeys={selectedRowKeys} deleteByIds={this.deleteByIds} cancel={this.deleteCancel} flag={true}/>
                    <SearchCell name='请输入部门名称'
                                searchEvent={this.searchEvent}
                                searchContentChange={this.searchContentChange}
                                fetch={this.reset}
                                flag={true}
                    />
                    <Table rowSelection={rowSelection} pagination={false} columns={this.columns} bordered size={'small'}/>
                </Spin>
            </div>
        )
    }
}
export default FireSerialTest