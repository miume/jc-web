import React from "react";
import Blockquote from "../../BlockQuote/blockquote";
import DeleteByIds from "../../BlockQuote/deleteByIds";
import axios from "axios";
import {Table, message, Spin, Divider} from "antd";
import SearchCell from '../../BlockQuote/search';
import AddModal from "./addModal"

class BatchMessage extends React.Component{
    componentWillUnmount() {
        this.setState = () => {
            return;
        }
    }
    url = JSON.parse(localStorage.getItem('url'));
    constructor(props){
        super(props);
        this.state={         
            visiable:false,
            data:[],
            selectedRowKeys: [],
            loading:true,
            searchContent:'',
        }
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
            width: '8.11%',
        },{
            title: '批次信息',
            dataIndex: 'batch',
            key: 'batch',
            align:'center',
            width: '11.11%',
        },{
            title: '工序',
            dataIndex: 'process',
            key: 'process',
            align:'center',
            width: '11.11%',
        },{
            title: '批次生成时间',
            dataIndex: 'setTime',
            key: 'setTime',
            align:'center',
            width: '12.11%',
        },{
            title: '生成人',
            dataIndex: 'setPeople',
            key: 'setPeople',
            align:'center',
            width: '11.11%',
            
        },{
            title: '状态',
            dataIndex: 'statusFlag',
            key: 'statusFlag',
            align:'center',
            width: '11.11%',
            render:(text,record)=>{
                if(record.statusFlag === false){
                    return(<span>已完成</span>)
                }else{
                    return(<span>进行中</span>)
                }
            }
        },{
            title: '开始时间',
            dataIndex: 'startTime',
            key: 'startTime',
            align:'center',
            width: '12.11%',
        },{
            title: '结束时间',
            dataIndex: 'endTime',
            key: 'endTime',
            align:'center',
            width: '12.11%',
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align:'center',
            width: '11.11%',
            render:(text,record)=>{
                return(
                    <span>
                        <span className="blue">编辑</span>
                        <Divider type="vertical"/>
                        <span className="blue">删除</span>
                    </span>
                )
            }
        }]
    }
    componentDidMount(){
        this.fetch();
    }

    fetch = ()=>{
        axios({
            url:`${this.url.productionBatchInfo.getAll}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{
                page:1,
                size:10
            }
        }).then((data)=>{
            const res = data.data.data.list;
            var data = [];
            for(var i=0;i<res.length;i++){
                data.push(res[i].productionBatchInfo);
            };
            for(var i = 1; i<=data.length; i++){
                data[i-1]['index']=i;
            }
            if(data.length!==0){
                this.setState({
                    data:data,
                    searchContent:'',
                    loading:false,
                    selectedRowKeys: [],
                })
            }
        })
    }

    /**实现全选 */
    onSelectChange=(selectedRowKeys)=>{
        //   console.log(selectedRowKeys)
        this.setState({ selectedRowKeys:selectedRowKeys });
    }
    cancel=()=>{
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    };
    searchContentChange=(e)=>{
        const value = e.target.value;
        this.setState({searchContent:value});
    };
    render(){
        const current = JSON.parse(localStorage.getItem('current'));
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
                <Blockquote name={current.menuName} menu={current.menuParent}/>
                <Spin spinning={this.state.loading}  wrapperClassName='rightDiv-content'>
                    <AddModal fetch={this.fetch}/>
                    <SearchCell name='请输入批次信息' flag={true} fetch={this.fetch} searchContentChange={this.searchContentChange}/>
                    <div className='clear' ></div>
                    <Table pagination={this.pagination} rowSelection={rowSelection} columns={this.columns} rowKey={record => record.code} dataSource={this.state.data} scroll={{ y: 400 }} size="small" bordered/>
                </Spin>
            </div>
        )
    }
}

export default BatchMessage