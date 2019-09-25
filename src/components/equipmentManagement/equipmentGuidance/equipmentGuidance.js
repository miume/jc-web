import React from 'react';
import axios from "axios";
import '../../Home/page.css';
import BlockQuote from '../../BlockQuote/blockquote';
import SearchCell from '../../BlockQuote/search';
import AddModal from './add';
import {Divider, message, Popconfirm, Table} from 'antd';
import Edit from "./editor";
import Detail from './detail';

class Equipment extends React.Component{
    url
    operation
    constructor(props){
        super(props);
        this.state={
            dataSource:[],
            pagination:[],
            searchContent:'',

        }
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.judgeOperation = this.judgeOperation.bind(this);
        this.pagination = {
            total: this.state.dataSource.length,
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
            width: '15%',
        },{
            title: '批号',
            dataIndex: 'batchNumber',
            key: 'batchNumberId',
            align:'center',
            width: '16%',
        },{
            title: '指导书名称',
            dataIndex: 'instructorName',
            key: 'instructorName',
            align:'center',
            width: '16%',
        },{
            title: '生效时间',
            dataIndex: 'effectiveDate',
            key: 'effectiveDate',
            align:'center',
            width: '16%',
        },{
            title: '编制人',
            dataIndex: 'createPerson',
            key: 'createPerson',
            align:'center',
            width: '16%',
        },{
            title: '操作',
            dataIndex: 'index',
            key: 'id',
            align:'center',
            width: '16%',
            render:(text,record)=>{
                return (
                    <span>
                        <Detail batchNumberId={record.batchNumberId}/>
                        {this.judgeOperation(this.operation,'UPDATE')&&this.judgeOperation(this.operation,'DELETE')?<Divider type="vertical" />:null}
                        <Edit value={record.id} status={record.status} batchNumberId={record.batchNumberId} fetch={this.fetch} flag={this.judgeOperation(this.operation,'UPDATE')}/>
                        {this.judgeOperation(this.operation,'UPDATE')?<Divider type="vertical" />:null}
                        {record.status === -1?<Popconfirm title="确定删除?" onConfirm={()=>this.handleDelete(record.batchNumberId)} okText="确定" cancelText="取消" >
                            <span className={this.judgeOperation(this.operation,'DELETE')?'blue':'hide'} href="#">删除</span>
                        </Popconfirm>:<span className={this.judgeOperation(this.operation,'DELETE')?'notClick':'hide'}>删除</span>}
                    </span>
                )
            }
        }]
    }



    judgeOperation(operation,operationCode){
        if(operation===null) return false
        var flag = operation?operation.filter(e=>e.operationCode===operationCode):[];
        return flag.length>0?true:false
    }

    handleDelete = (id) => {
        axios({
            url:`${this.url.instructor.instructorAll}/${id}`,
            method:'Delete',
            headers:{
                'Authorization':this.url.Authorization
            },
        }).then((data)=>{
            message.info(data.data.message);
        }).catch((error)=>{
            message.info(error.data)
        });
        setTimeout(() => {
            if((this.pagination.total-1)%10===0){
                this.pagination.current = this.pagination.current-1
            }
            this.handleTableChange(this.pagination);
        }, 1000);
    }

    /**获取所有数据 getAllByPage */
    handleTableChange = (pagination) => {
        // console.log(pagination.current)
        this.fetch({
            pageSize: pagination.pageSize,
            pageNumber: pagination.current,
            sortField: 'id',
            sortType: 'desc',
        });
    };
    fetch = (params = {}) =>{
        axios({
            url:`${this.url.instructor.instructorAll}`,
            method: 'get',
            headers:{
                'Authorization': this.url.Authorization
            },
            params: params,
        }).then((data)=>{
            const res = data.data.data;
            if(res&&res.list){
                this.pagination.total=res.total;
                this.pagination.current = res.pageNumber;
                for(var a = 1; a<=res.list.length; a++){
                    res.list[a-1]['index']=(res.prePage)*10+a;
                }
                this.setState({
                    dataSource: res.list,
                    searchContent:'',
                })
            }
        })
    };
    componentDidMount() {
        this.fetch({sortField: 'id',
        sortType: 'desc',});
    }
    /**获取查询时名称的实时变化 */
    searchContentChange(e){
        this.setState({searchContent: e.target.value});
    }
    searchEvent(){
        const ope_name = this.state.searchContent;
        axios({
            url:`${this.url.instructor.instructorAll}`,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{
                instructorName:ope_name
            },
            type:'json',
        }).then((data)=>{
            const res = data.data.data;
            if(res&&res.list){
                this.pagination.total=res.total;
                for(var b = 1; b<=res.list.length; b++){
                    res.list[b-1]['index']=(res.prePage)*10+b;
                }
                this.setState({
                    dataSource: res.list,
                });
            }else{
                this.setState({
                    dataSource: null
                })
            }
        })
        };
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current'));
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
        return (
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent}></BlockQuote>
                <div style={{padding:'15px'}}>
                <AddModal fetch={this.fetch} flag={this.judgeOperation(this.operation,'SAVE')}/>&nbsp;&nbsp;&nbsp;
                <SearchCell
                    name='请输入指导书名称'
                    fetch={this.fetch}
                    searchEvent={this.searchEvent}
                    searchContentChange={this.searchContentChange} flag={this.judgeOperation(this.operation,'QUERY')}/>
                <div className='clear'></div>
                <Table size="small" dataSource={this.state.dataSource} columns={this.columns} bordered rowKey={record => record.batchNumberId} pagination={this.pagination} scroll={{ y: 400 }} onChange={this.handleTableChange}/>
                </div>
            </div>
        );
    }
}

export default Equipment
