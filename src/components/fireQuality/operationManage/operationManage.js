import React,{Component} from 'react'
import BlockQuote from "../../BlockQuote/blockquote"
import {Table,Spin} from 'antd'
import NewButton from "../../BlockQuote/newButton";
import DeleteByIds from "../../BlockQuote/deleteByIds";
import SearchCell from "../../BlockQuote/search";
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
            width:'40%'
        },{
            title:'内容',
            dataIndex:'content',
            key:'content',
            width:'40%'
        }]
        this.state={
            loading:false,
            selectedRowKeys:[]
        }
        this.add=this.add.bind(this);
        this.deleteByIds=this.deleteByIds.bind(this);
        this.cancel=this.cancel.bind(this);
    }
    add(){

    }
    deleteByIds(){

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
                    <NewButton name={'新增'} className={'fa fa-plus'} handleClick={this.add}/>
                    <DeleteByIds flag={true} selectedRowKeys={selectedRowKeys}
                                 deleteByIds={this.deleteByIds} cancel={this.cancel}/>
                    <SearchCell flag={true} />
                    <Table columns={this.columns} bordered size={'small'}/>
                </Spin>
            </div>
        )
    }

}
export default Operation