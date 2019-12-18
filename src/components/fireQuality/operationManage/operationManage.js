import React,{Component} from 'react'
import BlockQuote from "../../BlockQuote/blockquote"
import {Table,Spin} from 'antd'
import DeleteByIds from "../../BlockQuote/deleteByIds";
import SearchCell from "../../BlockQuote/search";
import Add from './add'
import axios from 'axios'

class Operation extends Component{
    constructor(props){
        super(props)
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:'15%'
        },{
            title:'标题',
            dataIndex:'title',
            key:'title',
            width:'20%'
        },{
            title:'内容',
            dataIndex:'content',
            key:'content',
            width:'20%'
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            width:'20%',
            render:(text,record)=>{
                return(
                    <span>
                        <Add editflag={true}/>
                    </span>
                )
            }
        }]
        this.state={
            loading:false,
            selectedRowKeys:[]
        }
        this.getTableData=this.getTableData.bind(this);
        this.deleteByIds=this.deleteByIds.bind(this);
        this.cancel=this.cancel.bind(this);
    }
    getTableData(){

    }

    deleteByIds(){
        let {selectedRowKeys}=this.state
    }
    cancel(){

    }
    render(){
        const current=JSON.parse(localStorage.getItem(('current')))
        this.url=JSON.parse(localStorage.getItem('url'))
        let {loading,selectedRowKeys}=this.state
        return(
            <div>
                <BlockQuote menu={current.menuParent} name={current.menuName}/>
                <Spin spinning={loading} wrapperClassName={'rightDiv-content'}>
                    <Add url={this.url}/>
                    <DeleteByIds flag={true} selectedRowKeys={selectedRowKeys}
                                 deleteByIds={this.deleteByIds} cancel={this.cancel}/>
                    <SearchCell flag={true} name={'请输入手册标题'}/>
                    <Table columns={this.columns} bordered size={'small'} rowKey={record => record.index}/>
                </Spin>
            </div>
        )
    }

}
export default Operation