import React from "react";
import Blockquote from "../BlockQuote/blockquote";
import SearchPart from "./searchpart"
import DeleteByIds from "../BlockQuote/deleteByIds";
import axios from "axios";
import {Table ,message} from "antd";
import {batchInfoTablecolums,datas} from "./colums"
import AddPart from "./addpart"

class BatchInfo extends React.Component{
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return ;
        }
    }
    url = JSON.parse(localStorage.getItem('url'));
    constructor(props){
        super(props);
        this.state={
            selectedRowKeys:[],
            loading:'',
        };
        this.pagination={
            showSizeChanger:true,
            showTotal(total) {
                return `共${total}条记录`
            }
        }
    }
    handleSizeChange=(current,size)=>{
        //console.log(current);
        this.setState({
            size:current.pageSize,
            page:'1',
            //loading:true,
        },()=>{
            // this.getTableData()
        })
    }
    cancel=()=> {
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }
    judgeOperation=(operation,operationCode)=>{
        if(operation===null) return false
        var flag = operation?operation.filter(e=>e.operationCode===operationCode):[];
        return flag.length>0?true:false
    }
    deleteByIds = ()=>{
        const ids = this.state.selectedRowKeys;
        // axios({
        //     url:`${this.url.processManagement.deleteByIds}`,
        //     method:'delete',
        //     headers:{
        //         'Authorization':this.Authorization
        //     },
        //     data:ids,
        //     type:'json'
        // }).then((data)=>{
        //     message.info(data.data.message);
        //     if(data.data.code===0){
        //         this.getTableData({
        //             page:1,
        //             size:10,
        //             deviceName:this.state.deviceName,
        //             deptId:this.state.deptCode
        //         })
        //     }
        // }).catch(()=>{
        //     message.info('删除错误，请联系管理员！')
        // })
        console.log(ids)
    }
    onSelectChange=(selectedRowKeys)=> {
        console.log(selectedRowKeys)
        this.setState({ selectedRowKeys:selectedRowKeys });
    }
    render(){
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const current = JSON.parse(localStorage.getItem('current')) ;
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
        return (
            <div>
                <Blockquote menu={current.menuParent} name="批次信息" />
                <div style={{padding: '15px'}}>
                    <AddPart/>
                    <DeleteByIds
                        selectedRowKeys={this.state.selectedRowKeys}
                        loading={loading}
                        cancel={this.cancel}
                        deleteByIds={this.deleteByIds}
                        flag={this.judgeOperation(this.operation,'DELETE')}
                    />
                    <SearchPart/>
                    <Table
                        bordered={true}
                        size={"small"}
                        rowSelection={rowSelection}
                        columns={batchInfoTablecolums}
                        dataSource={datas}
                        scroll={{y:420}}
                        pagination={this.pagination}
                    />
                </div>
            </div>
        )
    }
}

export default BatchInfo