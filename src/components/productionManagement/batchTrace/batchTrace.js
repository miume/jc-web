import React from "react";
// import Blockquote from "../../BlockQuote/blockquote";
import DeleteByIds from "../../BlockQuote/deleteByIds";
import SearchCell from '../../BlockQuote/search';
import axios from "axios";
import {Table, message, Spin, Divider} from "antd";
import BlockQuote from '../../BlockQuote/blockquote';
import Detail from "./detail";

class BatchTrace extends React.Component{
    url
    constructor(props){
        super(props);
        this.state={
            dataSource: [],
            selectedRowKeys: [],
            loading: true,
            searchContent:'',
            searchText: ''
        }
        this.pagination = {
            showTotal(total){
                return `共${total}条记录`
            },
            showSizeChanger: true,
            pageSizeOptions: ["10","20","50","100"]
        };
        this.column = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: '11%',
        },{
            title: '批次信息',
            dataIndex: 'batch',
            key: 'batch',
            width: '11%',
        },{
            title: '批次生成时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: '11%',
        },{
            title: '生成人',
            dataIndex: 'creater',
            key: 'creater',
            width: '11%',
        },{
            title: '开始时间',
            dataIndex: 'startTime',
            key: 'startTime',
            width: '11%',
        },{
            title: '结束时间',
            dataIndex: 'endTime',
            key: 'endTime',
            width: '11%',
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: '11%',
            render:(text,record)=>{
                return(
                    <span>
                        <Detail />
                    </span>
                )
            }
        }]
        this.pagination={
            showSizeChanger:true,
            showTotal:(total)=>`共${total}条记录`,
            pageSizeOptions:['10','20','50','100']
        }
        this.getTableData=this.getTableData.bind(this);
        this.handleTableChange=this.handleTableChange.bind(this);
        this.searchContentChange=this.searchContentChange.bind(this);
        this.searchEvent=this.searchEvent.bind(this);
    }
    handleTableChange(pagination){
        this.pagination=pagination
        this.getTableData()
    }
    componentDidMount(){
        this.getTableData()
    }
    componentWillUnmount() {
        this.setState = () => {
          return ;
        }
      }
    getTableData(){
        this.setState({
            loading:true
        })
        let {current,pageSize}=this.pagination,
            {searchContent}=this.state
        axios({
            url:this.url.productionBatchRetrospect.page,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{
                condition:searchContent,
                size:pageSize,
                page:current
            }
        }).then(data=>{
            let res=data.data.data
            if(res&&res.list){
                for(let i=0;i<res.list.length;i++){
                    res.list[i]['index']=(res.page-1)*res.size+(i+1)
                }
                this.setState({
                    dataSource:res.list,
                })
            }
            this.setState({
                loading:false,
                searchContent:''
            })
        })
    }
    searchContentChange(e){
        let value=e.target.value
        this.setState({
            searchContent:value
        })
    }
    searchEvent(){
        this.getTableData()
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current'));
        return(
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent}></BlockQuote>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                <SearchCell name='请输入批次信息' flag={true}
                    searchContentChange={this.searchContentChange}
                    searchEvent={this.searchEvent}
                    fetch={this.getTableData}
                />
                <div className='clear' ></div>
                    <Table size="small" bordered  
                    dataSource={this.state.dataSource} 
                    columns={this.column} 
                    pagination={this.pagination}
                    onChange={this.handleTableChange}
                    rowKey={record=>record.index}/>
                </Spin>
            </div>
        )
    }
}

export default BatchTrace
