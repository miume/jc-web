import React from "react";
import '../../../Home/page.css';
import { Table,Popconfirm,Divider,message,Spin } from 'antd';
import BlockQuote from '../../../BlockQuote/blockquote';
import DeleteByIds from '../../../BlockQuote/deleteByIds';
import SearchCell from '../../../BlockQuote/search';
import axios from "axios";
import AddModal from "./addModal"

class RawMaterialName extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state={
            data:[],
            visible:false,
            selectedRowKeys: [],
            loading:false,
            searchContent:'',
        }
        this.pagination = {
            total: this.state.data.length,
            showTotal(total){
                return `共${total}条记录`
            },
            showSizeChanger: true,
        };
        this.columns=[{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: '12.5%',
        },{
            title: '原材料名称',
            dataIndex: 'materialName',
            key: 'materialName',
            width: '12.5%',
        },{
            title:"材料来源",
            dataIndex: 'dataType',
            key: 'dataType',
            width: '12.5%',
            render:(text,record)=>{
                if(record.dataType===0){
                    return '仓库领料'
                }
                else{
                    return '补料'
                }
            }
        },{
            title:"材料类别",
            dataIndex: 'typeName',
            key: 'typeName',
            width: '12.5%',
        },{
            title:"所属金属",
            dataIndex: 'metal',
            key: 'metal',
            width: '12.5%',
            
        },{
            title:"材料物相",
            dataIndex: 'phaseType',
            key: 'phaseType',
            width: '12.5%',
            render:(text,record)=>{
                if(record.phaseType===0){
                    return '溶液'
                }
                else{
                    return '晶体'
                }
            }
        },{
            title:"领料方式",
            dataIndex: 'pickingType',
            key: 'pickingType',
            width: '12.5%',
            render:(text,record)=>{
                if(record.pickingType===0){
                    return '手工领料'
                }
                else{
                    return 'AGV叫料'
                }
            }
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align:'center',
            width: '12.5%',
            render:(text,record)=>{
                return(
                    <span>
                        <AddModal editFlag={true} fetch={this.fetch} code={record.code}/>
                        <Divider type="vertical" />
                        <Popconfirm title="确定删除？" onConfirm={() => this.handleDelete(record.code)} okText="确定" cancelText="取消">
                            <span className="blue" href="#">删除</span>
                        </Popconfirm>
                    </span>
                )
            }
        }]
        this.onSelectChange = this.onSelectChange.bind(this);
        this.cancel=this.cancel.bind(this);
        this.start=this.start.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.handleTableChange=this.handleTableChange.bind(this);
    };
    handleTableChange(pagination){
        this.pagination=pagination
        this.fetch()
    }
    handleDelete = (id)=>{
        axios({
            url:`${this.url.precursorRawMaterial.deleteById}`,
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
    start = () => {
        const ids = this.state.selectedRowKeys;
        axios({
            url:`${this.url.precursorRawMaterial.deleteByIds}`,
            method:'delete',
            headers:{
                'Authorization':this.url.Authorization
            },
            data:ids,
            type:'json'
        }).then((data)=>{
            if(data.data.code===0){
                this.setState({
                    selectedRowKeys: [],
                    loading: false,
                });
                this.fetch();
            }
           else{
            message.info(data.data.message);
           }
        }).catch((error)=>{
            message.info(error.data);
        })
    };
    componentWillUnmount() {
        this.setState = () => {
          return ;
        }
    }

    componentDidMount(){
        this.fetch();
    }
    fetch = (params={},flag)=>{
        this.setState({
            loading:true
        })
        let {searchContent}=this.state,
            {pageSize,current}=this.pagination
             params={
                condition:flag?'':searchContent,
                size:pageSize,
                page:current
            }
        axios({
            url:`${this.url.precursorRawMaterial.page}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization
            },
            params
        }).then((data)=>{
            const res=data.data.data;
            let dataSource = [];
            if(res&&res.list) {
                this.pagination.total = res.total ? res.total : 0;
                for (let i = 1; i <= res.list.length; i++) {
                    res.list[i - 1]['index'] = (res['page']-1) * res['size'] + i;
                }
                for (let i = 0; i < res.list.length; i++) {
                    res.list[i]["metal"] = ""
                }
                for (let i = 0; i < res.list.length; i++) {
                    if (res.list[i]["mnFlag"] === true) {
                        res.list[i]["metal"] += "mn "
                    }
                    if (res.list[i]["coFlag"] === true) {
                        res.list[i]["metal"] += "co "
                    }
                    if (res.list[i]["niFlag"] === true) {
                        res.list[i]["metal"] += "ni "
                    }
                }
                for (let i = 0; i < res.list.length; i++) {
                    if (res.list[i]["metal"] == "") {
                        res.list[i]["metal"] = "无"
                    }
                }
                dataSource = res.list;
                this.setState({
                    data: dataSource
                })
            }
            this.setState({
                loading:false,
                searchContent:''
            })
        })
    }
    /**实现全选 */
    onSelectChange = (selectedRowKeys)=>{
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
        this.fetch()
    };
    /**返回数据录入页面 */
    returnDataEntry = ()=>{
        this.props.history.push({pathname: "/precursorCostBasisData"});
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('precursorCostBasisData'));
        const {  selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            onSelect() {},
            onSelectAll() {},
          };
        return(
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent} menu2='返回'
                            returnDataEntry={this.returnDataEntry} flag={1}></BlockQuote>
                <Spin spinning={this.state.loading}  wrapperClassName='rightDiv-content'>
                    <AddModal fetch={this.fetch}/>
                    <DeleteByIds 
                        selectedRowKeys={this.state.selectedRowKeys}
                        deleteByIds={this.start}
                        cancel={this.cancel}
                        flag={true}
                    />
                    <SearchCell name="请输入原材料名称" flag={true}/>
                    <div className='clear' ></div>
                    <Table rowSelection={rowSelection} onChange={this.handleTableChange} pagination={this.pagination} columns={this.columns} rowKey={record => record.index} dataSource={this.state.data}  size="small" bordered/>
                </Spin>
            </div>
        )
    }
}


export default RawMaterialName