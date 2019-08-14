import React from "react";
import Blockquote from "../BlockQuote/blockquote";
import SearchPart from "./searchpart"
import DeleteByIds from "../BlockQuote/deleteByIds";
import axios from "axios";
import {Table ,message} from "antd";
import {batchInfoTablecolums,datas} from "./colums"
import AddPart from "./addpart"
import PreviewBatch from "./previewBatch"

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
            selectRows:[],
            batchInfo:'',
            ifClick:"请选择4条相同批次信息的记录",
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
    onSelectChange=(selectedRowKeys,selectRows)=> {
        // console.log(selectedRowKeys);
        // console.log('selectRows',selectRows);
        this.setState({
            selectedRowKeys:selectedRowKeys ,
            selectRows:selectRows,
        },()=>{
            if(this.state.selectRows.length===4){
                if(this.state.selectRows[0].batchInfo===this.state.selectRows[1].batchInfo&&this.state.selectRows[1].batchInfo===this.state.selectRows[2].batchInfo&&this.state.selectRows[2].batchInfo===this.state.selectRows[3].batchInfo){
                    this.setState({batchInfo:this.state.selectRows[0].batchInfo,ifClick:"1"},()=>{
                        console.log('batchInfo',this.state.batchInfo)
                    })
                }
                else {
                    this.setState({ifClick:"选中项批次信息不一致,请选择相同批次信息的记录!"})
                }
            }else {
                this.setState({ifClick:"请选择4条相同批次信息的记录!",batchInfo:''})
            }
        });
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
                    <PreviewBatch
                        batchInfo={this.state.batchInfo}
                        ifClick={this.state.ifClick}
                    />
                    <SearchPart/>
                    <Table
                        className={"batchInfo_Table"}
                        bordered={true}
                        size={"small"}
                        rowSelection={rowSelection}
                        columns={batchInfoTablecolums}
                        dataSource={datas}
                        scroll={{y:420}}
                        rowKey={record => record.index}
                        pagination={this.pagination}
                    />
                </div>
            </div>
        )
    }
}

export default BatchInfo