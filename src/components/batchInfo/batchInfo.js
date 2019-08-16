import React from "react";
import Blockquote from "../BlockQuote/blockquote";
import SearchPart from "./searchpart"
import DeleteByIds from "../BlockQuote/deleteByIds";
import axios from "axios";
import {Table, message, Spin} from "antd";
import AddPart from "./addpart"
import PreviewBatch from "./previewBatch"
import EditPart from "./batchinfoEditModal";
import DeleteOne from "./deleteOne";

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
            loading:false,
            selectRows:[],
            batchInfo:'',
            ifClick:"请选择4条相同批次信息的记录",
            params:{
                size:10,
                page:1,
                content:'',
            },
            tableData:[],
            ToSelectData:[],
            ToDecideStatus:[],
        };
        this.pagination={
            showSizeChanger:true,
            onShowSizeChange:(current, size)=>{
                this.setState({
                    params:{
                        size:size,
                        page:current,
                    }})
            },
            showTotal(total) {
                return `共${total}条记录`
            },
            total:0,
        }
    }
    getTableData=(condition)=>{
        var params={
            page:this.state.params.page,
            size:this.state.params.size,
        };
        if(condition) params["condition"]=condition;
        this.setState({loading:true},()=>{
            axios({
                url:this.url.productionBatchInfo.getAll,
                method:"get",
                header:{'Authorization': this.url.Authorization},
                params:params
            }).then((response)=>{
                console.log(response)
                if(response.status===200){
                    if(response.data.code===0){
                        const responseData=response.data.data;
                        if(responseData){
                            // console.log(responseData)
                            this.pagination.total=responseData.total;
                                if(responseData.total>0){
                                    var table=[];
                                    var tabledata=responseData.list;
                                    // console.log(tabledata);
                                    for(var i=0;i<tabledata.length;i++) {
                                        table.push({
                                            index:i+1+responseData.size*(responseData.page-1),
                                            batchInfo:tabledata[i].productionBatchInfo.batch,
                                            endTime:tabledata[i].endTime,
                                            setTime:tabledata[i].setTime,
                                            startTime:tabledata[i].startTime,
                                            endTime1:tabledata[i].productionBatchInfo.endTime,
                                            setTime1:tabledata[i].productionBatchInfo.setTime,
                                            startTime1:tabledata[i].productionBatchInfo.startTime,
                                            code:tabledata[i].productionBatchInfo.code,
                                            cellNum:tabledata[i].productionBatchInfo.cellNum,
                                            material:tabledata[i].productionBatchInfo.material,
                                            modifyPeople:tabledata[i].productionBatchInfo.modifyPeople,
                                            modifyTime:tabledata[i].productionBatchInfo.modifyTime,
                                            year:tabledata[i].productionBatchInfo.year,
                                            month:tabledata[i].productionBatchInfo.month,
                                            setPeople:tabledata[i].productionBatchInfo.setPeople,
                                            productionModel:tabledata[i].productionBatchInfo.productionModel,
                                            productionLine:tabledata[i].productionBatchInfo.productionLine,
                                            productionType:tabledata[i].productionBatchInfo.productionType,
                                            serialNumber:tabledata[i].productionBatchInfo.serialNumber,
                                            timepoint:tabledata[i].productionBatchInfo.timepoint,
                                            slotnum:tabledata[i].productionBatchInfo.slotnum,
                                            process:tabledata[i].productionBatchInfo.process,
                                        })
                                    }
                                    this.setState({tableData:table,},()=>{
                                        if(this.state.tableData){
                                            this.setState({loading:false,})
                                        }
                                    })
                                }

                        }
                    }
                }
            })
        })

    }
    componentDidMount() {
        this.getTableData()
    }
    handleTableChange=(current)=>{
        console.log("current",current);
        this.setState({
            params:{
                size:current.pageSize,
                page:current.current,
            }
        },()=>{
            this.getTableData()
        })
    }
    cancel=()=> {
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
            });
        }, 1000);
    }
    judgeOperation=(operation,operationCode)=>{
        if(operation===null) return false
        var flag = operation?operation.filter(e=>e.operationCode===operationCode):[];
        return flag.length>0?true:false
    }

    deleteByIds = ()=>{
        const selectRows=this.state.selectRows;
        let ids=[];
        console.log(selectRows)
        if(selectRows){
            for(var i=0;i<selectRows.length;i++){
                ids.push(selectRows[i].code)
            }
        }
        console.log(ids)
        if(ids){
            console.log(ids)
            axios({
                url:`${this.url.productionBatchInfo.deletes}`,
                method:'delete',
                headers:{
                    'Authorization':this.Authorization
                },
                data:ids,
                type:'json'
            }).then((data)=>{
                console.log(data.data.message)
                message.info(data.data.message);
                if(data.data.code===0){
                    this.getTableData()
                    message.info("删除成功")
                }
            }).catch(()=>{
                message.info('删除错误，请联系管理员！')
            })
        }

    }
    onSelectChange=(selectedRowKeys,selectRows)=> {
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
                    <AddPart
                        url={this.url}
                        getTableData={this.getTableData}
                    />
                    <DeleteByIds
                        selectedRowKeys={this.state.selectedRowKeys}
                        loading={loading}
                        cancel={this.cancel}
                        deleteByIds={this.deleteByIds}
                        flag={this.judgeOperation(this.operation,'DELETE')}
                        getTableData={this.getTableData}
                    />
                    <PreviewBatch
                        batchInfo={this.state.batchInfo}
                        ifClick={this.state.ifClick}
                    />
                    <SearchPart
                        getTableData={this.getTableData}
                    />
                    <Spin spinning={this.state.loading}>
                        <Table
                            className={"batchInfo_Table"}
                            bordered={true}
                            size={"small"}
                            rowSelection={rowSelection}
                            columns={this.batchInfoTablecolums}
                            dataSource={this.state.tableData}
                            scroll={{y:420}}
                            rowKey={record => record.index}
                            onChange={this.handleTableChange}
                            pagination={this.pagination}
                            total={this.state.total}
                        />
                    </Spin>
                </div>
            </div>
        )
    }
    batchInfoTablecolums=[
        {
            title:"序号",
            dataIndex:"index",
            key:"index",
            width:"5%"
        },{
            title:"批次信息",
            dataIndex:"batchInfo",
            key:"batchInfo",
            width:"15%"
        },{
            title:"工序",
            dataIndex:"process",
            key:"process",
            width:"5%"
        },{
            title:"批次生成时间",
            dataIndex:"setTime",
            key:"setTime",
            width:"15%"
        },{
            title:"生成人",
            dataIndex:"setPeople",
            key:"setPeople",
            width:"5%"
        },{
            title:"状态",
            dataIndex:"status",
            key:"status",
            width:"10%",
            render:(text,record)=>{
                if(record.status===0){
                    return(<span >进行中</span>)
                }
                else{
                    return(<span >已完成</span>)
                }
            }

        },{
            title:"开始时间",
            dataIndex:"startTime",
            key:"startTime",
            width:"15%"
        },{
            title:"结束时间",
            dataIndex:"endTime",
            key:"endTime",
            width:"15%"
        },{
            title:"操作",
            dataIndex:"code",
            key:"code",
            width:"15%",
            render:(text,record)=>{

                return(
                    <span>
                        <EditPart  record={record} getTableData={this.getTableData}/>&nbsp;&nbsp;&nbsp;&nbsp;
                        <DeleteOne record={record} getTableData={this.getTableData}/>
                </span>
                )
            }
        }
    ]
}

export default BatchInfo