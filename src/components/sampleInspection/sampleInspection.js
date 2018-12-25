import React from "react";
import BlockQuote from '../BlockQuote/blockquote';
import axios from "axios";
import {Table,Divider,message,Popconfirm,Popover,Input, Button} from "antd";
import '../Home/page.css';
import SearchCell from '../BlockQuote/search'
import AddModal from './addModal'
import DeleteByIds from '../BlockQuote/deleteByIds';
import PopRefuse from "./confuse"
import "./sample.css"
import Edit from "./edit"


class SampleInspection extends React.Component{
    server
    Authorization
    componentDidMount() {
        this.fetch();
    }
    componentWillUnmount() {
        this.setState = () => {
            return ;
        }
    }
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            selectedRowKeys: [],    //多选框key
            loading: false,
            pagination:[],
            searchContent:'',
            clicked:false,
            Contentvalue:''
        };
        this.handleTableChange = this.handleTableChange.bind(this);
        this.fetch = this.fetch.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.returnDataEntry = this.returnDataEntry.bind(this);
        this.deleteByIds = this.deleteByIds.bind(this);
        // this.handleDelete = this.handleDelete.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.handleRefuse = this.handleRefuse.bind(this);
        this.contentChange = this.contentChange.bind(this);
        this.pagination = {
            total: this.state.dataSource.length,
            showTotal(total){
                return `共${total}条记录`
            },
            showSizeChanger: true,
        }
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            sorter: (a, b) => a.commonBatchNumber.id - b.commonBatchNumber.id,
            align:'center',
            width: '8%',
        },{
            title: '送检时间',
            dataIndex: 'sampleDeliveringRecord.sampleDeliveringDate',
            key: 'sampleDeliveringRecord.sampleDeliveringDate',
            align:'center',
            width: '13%',
        },{
            title: '送检人',
            dataIndex: 'deliverer.name',
            key: 'deliverer.name',
            align:'center',
            width: '7%',
        },{
            title: '送检工厂',
            dataIndex: 'deliveryFactory.name',
            key: 'deliveryFactory.name',
            align:'center',
            width: '7%',
        },{
            title: '批号',
            dataIndex: 'serialNumberName',
            key: 'serialNumberName',
            align:'center',
            width: '11%',
        },{
            title: '异常备注',
            dataIndex: 'sampleDeliveringRecord.exceptionComment',
            key: 'sampleDeliveringRecord.exceptionComment',
            align:'center',
            width: '9%',
            render:(text,record)=>{
                if(record.sampleDeliveringRecord.exceptionComment === null){
                    return "无"
                }else{
                    return record.sampleDeliveringRecord.exceptionComment
                }
            }
        },{
            title: '类型',
            dataIndex: 'sampleDeliveringRecord.type',
            key: 'sampleDeliveringRecord.type',
            align:'center',
            width: '6%',
            render:status=>{
                switch(`${status}`){
                    case '1':return "原材料";
                    case "2":return "中间品";
                    case "3":return "成品"
                }
            }
        },{
            title: '接受状态',
            dataIndex: 'sampleDeliveringRecord.acceptStatus',
            key: 'status',
            align:'center',
            width: '6%',
            render:status=>{
                switch(`${status}`){
                    case '-1':return "保存"
                    case '1':return "等待接受";
                    case "2":return "接受";
                    case "3":return "拒绝"
                }
            }
        },{
            title: '拒绝原因',
            dataIndex: 'sampleDeliveringRecord.handleComment',
            key: 'sampleDeliveringRecord.handleComment',
            align:'center',
            width: '7%',
            render : (text,record)=>{
                if(record.sampleDeliveringRecord.handleComment === null){
                    return "无"
                }else{
                    return record.sampleDeliveringRecord.handleComment
                }
            }
        },{
            title:'操作',
            dataIndex: 'sampleDeliveringRecord.id',
            key: 'id',
            align:'center',
            width: '18%',
            render : (text,record)=>{
                return(
                    <span>
                        {record.sampleDeliveringRecord.acceptStatus==-1?<Edit fetch={this.fetch} id={text} data={record}/>:<span className='Editgrey'>编辑</span>}
                        <Divider type="vertical" />
                        {record.sampleDeliveringRecord.acceptStatus==-1?<Popconfirm title="确定删除?" onConfirm={()=>this.handleDelete(record.sampleDeliveringRecord.id)} okText="确定" cancelText="取消">
                          <span className='blue'>删除</span>
                        </Popconfirm>:<span  className="Editgrey">删除</span>}
                        <Divider type="vertical" />
                        {record.sampleDeliveringRecord.acceptStatus==1?<Popconfirm title="确定接受?" onConfirm={()=>this.handleAccept(record.sampleDeliveringRecord.id)} okText="确定" cancelText="取消">
                          <span className='blue'>接受</span>
                        </Popconfirm>:<span  className="Editgrey">接受</span>}
                        <Divider type="vertical" />
                        {record.sampleDeliveringRecord.acceptStatus==1?<PopRefuse contentChange={this.contentChange} id={record.sampleDeliveringRecord.id} handleRefuse={this.handleRefuse} acceptStatus={record.sampleDeliveringRecord.acceptStatus}/>:<span className="Editgrey">拒绝</span>}
                    </span>
                );
            }
        }];
    }
    contentChange(e){
        const value = e.target.value;
        this.setState({Contentvalue:value});
    }
    handleRefuse(id){
        axios({
            url:`${this.server}/jc/common/sampleDeliveringRecord/accept`,
            method:'Post',
            headers:{
                'Authorization':this.Authorization
            },
            params : {
                id:id,
                isAccept:3,
                handleComment:this.state.Contentvalue
            }
        }).then((data)=>{
            message.info(data.data.message);
        }).catch((error)=>{
            message.info(error.data)
        });
        setTimeout(() => {
            this.fetch();
        }, 1000);
    }
    handleAccept = (id) =>{
        axios({
            url:`${this.server}/jc/common/sampleDeliveringRecord/accept`,
            method:'Post',
            headers:{
                'Authorization':this.Authorization
            },
            params : {
                id:id,
                isAccept:2
            }
        }).then((data)=>{
            message.info(data.data.message);
        }).catch((error)=>{
            message.info(error.data)
        });
        setTimeout(() => {
            this.fetch();
        }, 1000);
    }
    handleDelete = (id) => {
        axios({
            url:`${this.server}/jc/common/sampleDeliveringRecord/${id}`,
            method:'Delete',
            headers:{
                'Authorization':this.Authorization
            },
        }).then((data)=>{
            message.info(data.data.message);
        }).catch((error)=>{
            message.info(error.data)
        });
        setTimeout(() => {
            this.fetch();
        }, 1000);
    }
    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/dataEntry'});
    }
    searchEvent(){
        const ope_name = this.state.searchContent;
        axios({
            url:`${this.server}/jc/common/sampleDeliveringRecord/pages`,
            method:'get',
            headers:{
                'Authorization':this.Authorization
            },
            params:{
                pageSize: this.pagination.pageSize,
                pageNumber: this.pagination.current,
                factoryName:ope_name
            },
            type:'json',
        }).then((data)=>{
            const res = data.data.data;
            this.pagination.total=res.total;
            for(var i = 1; i<=res.list.length; i++){
                res.list[i-1]['index']=(res.prePage)*10+i;
            }
            this.setState({
                dataSource: res.list,
            });
        })

    };

    /**获取查询时菜单名称的实时变化 */
    searchContentChange(e){
        const value = e.target.value;
        this.setState({searchContent:value});
    }
    /**获取所有数据 getAllByPage */
    handleTableChange = (pagination) => {
        this.fetch({
            pageSize: pagination.pageSize,
            pageNumber: pagination.current,
            // sortField: 'sample_Delivering_Date',
            // sortType: 'asc',
        });
    };
    fetch = (params = {}) => {
        axios({
            url: `${this.server}/jc/common/sampleDeliveringRecord/pages`,
            method: 'get',
            params: params,
            // type: 'json',
        }).then((data) => {
            const res = data.data.data;
            this.pagination.total=res.total;
            for(var i = 1; i<=res.list.length; i++){
                res.list[i-1]['index']=(res.pageNumber-1)*10+i;
            }
            this.setState({
                dataSource: res.list,
            });
        })
    };
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    cancel() {
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }
    deleteByIds(){
        const ids = this.state.selectedRowKeys;
        axios({
            url:`${this.server}/jc/common/sampleDeliveringRecord`,
            method:'delete',
            headers:{
                'Authorization':this.Authorization
            },
            data:ids,
            type:'json'
        }).then((data)=>{
            message.info(data.data.message);
            this.fetch();
        })
    }
    render(){
        const { selectedRowKeys } = this.state;
        const current = JSON.parse(localStorage.getItem('current')) ;
        this.server = localStorage.getItem('remote');
        this.Authorization = localStorage.getItem("Authorization")
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return(
            <div>
                <BlockQuote name="样品送检" menu={current.menuParent} menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}></BlockQuote>
                <div style={{padding:'15px'}}>
                    <AddModal fetch={this.fetch}/>
                    <DeleteByIds
                        selectedRowKeys = {this.state.selectedRowKeys}
                        cancel={this.cancel}
                        deleteByIds={this.deleteByIds}
                    />

                    <span style={{float:'right',paddingBottom:'8px'}}>

                        <SearchCell name='请输入搜索内容'  searchEvent={this.searchEvent} searchContentChange={this.searchContentChange} fetch={this.fetch}/>
                    </span>
                    <div className='clear' ></div>
                    <Table columns={this.columns} dataSource={this.state.dataSource} rowSelection={rowSelection} size="small"
                           bordered
                           rowKey={record => record.sampleDeliveringRecord.id}
                           onChange={this.handleTableChange}
                           pagination={this.pagination}
                           scroll={{ x: 1500}}></Table>
                </div>
            </div>
        )
    }
}

export default SampleInspection