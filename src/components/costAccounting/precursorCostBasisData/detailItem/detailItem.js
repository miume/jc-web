import React from "react";
import '../../../Home/page.css';
import { Table,Popconfirm,Divider,message } from 'antd';
import BlockQuote from '../../../BlockQuote/blockquote';
import AddModal from './addModal';
import DeleteByIds from '../../../BlockQuote/deleteByIds';
import SearchCell from '../../../BlockQuote/search';
import axios from "axios";
import Edit from "./edit";

class DetailItem extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state = {
            visiable:false,
            data:[],
            selectedRowKeys: [],
            loading:true,
            searchContent:'',
        }
        this.onSelectChange = this.onSelectChange.bind(this);
        this.cancel=this.cancel.bind(this);
        this.start=this.start.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.pagination = {
            total: this.state.data.length,
            showTotal(total){
                return `共${total}条记录`
            },
            showSizeChanger: true,
        };
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            align:'center',
            width: '16.6%',
        },{
            title: '物料名称',
            dataIndex: 'materialName',
            key: 'materialName',
            align:'center',
            width: '16.6%',
        },{
            title: '所属类别',
            dataIndex: 'types',
            key: 'types',
            align:'center',
            width: '16.6%',
            render:(text,record)=>{
                // console.log(text,record)
                if(text == 1){
                    return "辅材"
                }else{
                    return "主材"
                }
            }
        },{
            title: '所属工序',
            dataIndex: 'processName',
            key: 'processName',
            align:'center',
            width: '16.6%',
        },{
            title: '所含金属',
            dataIndex: 'metal',
            key: 'metal',
            align:'center',
            width: '16.6%',
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align:'center',
            width: '16.6%',
            render:(text,record)=>{
                return(
                    <span>
                        <Edit code={record.code} fetch={this.fetch} processCode={record.processCode}/>
                        <Divider type="vertical"/>
                        <Popconfirm title="确定删除？" onConfirm={()=>this.handleDelete(record.code)} okText="确定" cancelText="取消">
                            <span className="blue" href="#">删除</span>
                        </Popconfirm>
                    </span>
                )
            }
        }]
    }
    handleDelete = (id)=>{
        // console.log(id)
        axios({
            url:`${this.url.precursorMaterialDetails.delete}`,
            method:"delete",
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{id:id}
        }).then((data)=>{
            message.info(data.data.message);
            this.fetch();
        }).catch((error)=>{
            message.info(error.data)
        });
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
          return ;
        }
    }

    componentDidMount(){
        this.fetch();
    }

    fetch = ()=>{
        axios({
            url:`${this.url.precursorMaterialDetails.page}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization
            },
        }).then((data)=>{
            const res = data.data.data.list;
            // console.log(res)
            for(var i = 1; i<=res.length; i++){
                res[i-1]['index']=i;
            }
            for(var i=0;i<res.length;i++){
                res[i]["metal"] = ""
            }
            for(var i=0;i<res.length;i++){
                if(res[i]["mn"] == 1){
                    res[i]["metal"]+="mn "
                }
                if(res[i]["co"] == 1){
                    res[i]["metal"]+="co "
                }
                if(res[i]["ni"] == 1){
                    res[i]["metal"]+="ni "
                }
            }
            for(var i=0;i<res.length;i++){
                if(res[i]["metal"] == ""){
                    res[i]["metal"] = "无"
                }
            }
            if(res.length!==0){
                this.setState({
                    data:res,
                    searchContent:'',
                })
            }
        })
    }
    start = () => {
        const ids = this.state.selectedRowKeys;
        // console.log(ids)
        axios({
            url:`${this.url.precursorMaterialDetails.ids}`,
            method:'delete',
            headers:{
                'Authorization':this.Authorization
            },
            data:ids,
            type:'json'
        }).then((data)=>{
            // console.log(data);
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
            message.info(data.data.message);
            // if((this.pagination.total-1)%10===0){
            //     this.pagination.current = this.pagination.current-1
            // }
            // this.handleTableChange(this.pagination);
            this.fetch();
        }).catch((error)=>{
            message.info(error.data);
        })
    };
    /**实现全选 */
    onSelectChange(selectedRowKeys) {
        //   console.log(selectedRowKeys)
        this.setState({ selectedRowKeys:selectedRowKeys });
    }
    cancel() {
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }
    searchContentChange(e){
        const value = e.target.value;
        this.setState({searchContent:value});
    }
    searchEvent(){
        const ope_name = this.state.searchContent;
        axios({
            url:`${this.url.precursorMaterialDetails.page}`,
            method:'get',
            headers:{
                'Authorization':this.Authorization
            },
            params:{
                // size: this.pagination.pageSize,
                // page: this.pagination.current,
                condition:ope_name
            },
            type:'json',
        }).then((data)=>{
            // const res = data.data.data;
            // if(res&&res.list){
            //     this.pagination.total=res.total;
            //     for(var i = 1; i<=res.list.length; i++){
            //         res.list[i-1]['index']=(res.prePage)*10+i;
            //     }
            //     this.setState({
            //         dataSource: res.list,
            //     });
            // }
            const res = data.data.data.list;
            // console.log(res)
            for(var i = 1; i<=res.length; i++){
                res[i-1]['index']=i;
            }
            for(var i=0;i<res.length;i++){
                res[i]["metal"] = ""
            }
            for(var i=0;i<res.length;i++){
                if(res[i]["mn"] == 1){
                    res[i]["metal"]+="mn "
                }
                if(res[i]["co"] == 1){
                    res[i]["metal"]+="co "
                }
                if(res[i]["ni"] == 1){
                    res[i]["metal"]+="ni "
                }
            }
            for(var i=0;i<res.length;i++){
                if(res[i]["metal"] == ""){
                    res[i]["metal"] = "无"
                }
            }
            if(res.length!==0){
                this.setState({
                    data:res
                })
            }
        })
    };
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('precursorCostBasisData'));
        const {  selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            onSelect() {},
            onSelectAll() {},
            // getCheckboxProps: record => ({
            //     disabled: record.commonBatchNumber.status === 2, // Column configuration not to be checked
            //   }),
          };
        return(
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent}></BlockQuote>
                <div style={{padding:'15px'}}>
                    <AddModal fetch={this.fetch}/>
                    <DeleteByIds 
                        selectedRowKeys={this.state.selectedRowKeys}
                        deleteByIds={this.start}
                        cancel={this.cancel}
                        flag={true}
                    />
                    <SearchCell name="请输入物料名称" flag={true} fetch={this.fetch} searchEvent={this.searchEvent} searchContentChange={this.searchContentChange}/>
                    <div className='clear' ></div>
                    <Table rowSelection={rowSelection} columns={this.columns} rowKey={record => record.code} dataSource={this.state.data} scroll={{ y: 400 }} size="small" bordered/>
                </div>
            </div>
        )
    }
}

export default DetailItem