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
            dataSource: [{
                index:"1",
                batchNumber:"19M01001806TE4S",
                process:"JH",
                createTime:"2019-01-01  12:30",
                person:"张三",
                status:"进行中",
                startTime:"2019-01-01  12:30",
                endTime:"2019-01-01  12:30",
            }],
            selectedRowKeys: [],
            loading: true,
            searchContent:'',
            searchText: ''
        }
        this.pagination = {
            total: this.state.dataSource.length,
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
            align:'center',
            width: '11%',
        },{
            title: '批次信息',
            dataIndex: 'batchNumber',
            key: 'batchNumber',
            align:'center',
            width: '11%',
        },{
            title: '工序',
            dataIndex: 'process',
            key: 'process',
            align:'center',
            width: '11%',
        },{
            title: '批次生成时间',
            dataIndex: 'createTime',
            key: 'createTime',
            align:'center',
            width: '11%',
        },{
            title: '生成人',
            dataIndex: 'person',
            key: 'person',
            align:'center',
            width: '11%',
        },{
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            align:'center',
            width: '11%',
        },{
            title: '开始时间',
            dataIndex: 'startTime',
            key: 'startTime',
            align:'center',
            width: '11%',
        },{
            title: '结束时间',
            dataIndex: 'endTime',
            key: 'endTime',
            align:'center',
            width: '11%',
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align:'center',
            width: '11%',
            render:(text,record)=>{
                return(
                    <span>
                        <Detail />
                    </span>
                )
            }
        }]
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current'));
        return(
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent}></BlockQuote>
                <div className="batchSearch_page" style={{padding: '15px'}}>
                    <SearchCell flag={true} name="请输入批次信息"/>
                    <Table size="small" bordered  dataSource={this.state.dataSource} columns={this.column} rowKey={record=>record.index}/>
                </div>
            </div>
        )
    }
}

export default BatchTrace
