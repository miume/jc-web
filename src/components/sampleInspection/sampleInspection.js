import React from "react";
import BlockQuote from '../BlockQuote/blockquote';
import axios from "axios";
import {Table,Divider,message,Popconfirm} from "antd";
import '../Home/page.css';
import SearchCell from '../BlockQuote/search'
import AddModal from './addModal'
import DeleteByIds from '../BlockQuote/deleteByIds';
import PopRefuse from "./confuse"
import "./sample.css"
import Edit from "./editor"
class SampleInspection extends React.Component{
    url
    server
    Authorization
    componentDidMount() {
        this.fetch({sortField: 'id',
        sortType: 'desc',});
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
            Contentvalue:'',
            pageChangeFlag:0 //0为fetch，1为search
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
        this.changePage = this.changePage.bind(this);
        this.pagination = {
            total: this.state.dataSource.length,
            showTotal(total){
                return `共${total}条记录`
            },
            showSizeChanger: true,
            onChange:this.changePage,
        }
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            sorter: (a, b) => a.sampleDeliveringRecord.id - b.sampleDeliveringRecord.id,
            align:'center',
            width: '6%',
        },{
            title: '送检时间',
            dataIndex: 'sampleDeliveringRecord.sampleDeliveringDate',
            key: 'sampleDeliveringRecord.sampleDeliveringDate',
            align:'center',
            width: '13%',
            render:(text)=>{
                const items = text.split(' ')
                return <abbr title={text}>{items[0]}</abbr>
            }
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
            title: '编号',
            dataIndex: 'serialNumberName',
            key: 'serialNumberName',
            align:'center',
            width: '11%',
            render:(text)=>{
                if(text.length>8){
                    return <abbr title={text}>{text.substr(0,7)}</abbr>
                }else{
                    return text
                }
            }
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
                    case "3":return "成品";
                    default : return null
                }
            }
        },{
            title: '接受状态',
            dataIndex: 'sampleDeliveringRecord.acceptStatus',
            key: 'status',
            align:'center',
            width: '8%',
            render:status=>{
                switch(`${status}`){
                    case '-1':return "保存"
                    case '1':return "等待接受";
                    case "2":return "接受";
                    case "3":return "拒绝";
                    default : return null;
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
            width: '20%',
            render : (text,record)=>{
                return(
                    <span>
                        {record.sampleDeliveringRecord.acceptStatus===-1?<Edit handleTableChange={this.handleTableChange} pagination={this.pagination} fetch={this.fetch} id={text} data={record} type={record.sampleDeliveringRecord.type}/>:<span className="notClick">编辑</span>}
                        <Divider type="vertical" />
                        {record.sampleDeliveringRecord.acceptStatus===-1?<Popconfirm title="确定删除?" onConfirm={()=>this.handleDelete(record.sampleDeliveringRecord.id)} okText="确定" cancelText="取消">
                          <span className='blue'>删除</span>
                        </Popconfirm>:<span className="notClick">删除</span>}
                        <Divider type="vertical" />
                        {record.sampleDeliveringRecord.acceptStatus===1?<Popconfirm title="确定接受?" onConfirm={()=>this.handleAccept(record.sampleDeliveringRecord.id)} okText="确定" cancelText="取消">
                          <span className='blue'>接受</span>
                        </Popconfirm>:<span className="notClick">接受</span>}
                        <Divider type="vertical" />
                        {record.sampleDeliveringRecord.acceptStatus===1?<PopRefuse contentChange={this.contentChange} id={record.sampleDeliveringRecord.id} handleRefuse={this.handleRefuse} acceptStatus={record.sampleDeliveringRecord.acceptStatus}/>:<span className="notClick">拒绝</span>}
                    </span>
                );
            }
        }];
    }
    changePage = (page,pageSize) =>{
    }
    contentChange(e){
        const value = e.target.value;
        this.setState({Contentvalue:value});
    }
    handleRefuse(id){
        axios({
            url:`${this.url.sampleInspection.accept}`,
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
            this.handleTableChange(this.pagination);
        }, 1000);
    }
    handleAccept = (id) =>{
        axios({
            url:`${this.url.sampleInspection.accept}`,
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
            this.handleTableChange(this.pagination);
        }, 1000);
    }
    handleDelete = (id) => {
        axios({
            url:`${this.url.sampleInspection.getAll}/${id}`,
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
            if((this.pagination.total-1)%10===0){
                this.pagination.current = this.pagination.current-1
            }
            this.handleTableChange(this.pagination);
        }, 1000);
    }
    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/dataEntry'});
    }
    searchEvent(params = {}){
        const ope_name = this.state.searchContent;
        axios({
            url:`${this.url.sampleInspection.getAllBypages}`,
            method:'get',
            headers:{
                'Authorization':this.Authorization
            },
            params:{
                pageSize: params.pageSize,
                pageNumber: params.pageNumber,
                factoryName:ope_name
            },
            type:'json',
        }).then((data)=>{
            const res = data.data.data;
            console.log(res)
            if(res&&res.list){
                this.pagination.total=res.total;
                this.pagination.current = res.pageNumber
                for(var i = 1; i<=res.list.length; i++){
                    res.list[i-1]['index']=(res.prePage)*10+i;
                }
                this.setState({
                    dataSource: res.list,
                    pageChangeFlag:1
                });
            }
        })

    };

    /**获取查询时菜单名称的实时变化 */
    searchContentChange(e){
        const value = e.target.value;
        this.setState({searchContent:value});
    }
    /**获取所有数据 getAllByPage */
    handleTableChange = (pagination) => {
        const pageChangeFlag = this.state.pageChangeFlag;
        console.log(pageChangeFlag)
        if(pageChangeFlag===0){
            this.fetch({
                pageSize: pagination.pageSize,
                pageNumber: pagination.current,
                sortField: 'id',
                sortType: 'desc',
            });
        }else{
            this.searchEvent({
                pageSize: pagination.pageSize,
                pageNumber: pagination.current,
            })
        }
        
    };
    fetch = (params = {}) => {
        axios({
            url: `${this.url.sampleInspection.getAllBypages}`,
            method: 'get',
            params: params,
            // type: 'json',
        }).then((data) => {
            const res = data.data.data;
            if(res&&res.list){
                for(var i = 1; i<=res.list.length; i++){
                    res.list[i-1]['index']=(res.pageNumber-1)*10+i;
                }
                this.pagination.total=res.total;
                this.pagination.current = res.pageNumber;
                this.setState({
                    dataSource: res.list,
                    searchContent:'',
                    selectedRowKeys: [],
                    pageChangeFlag:0
                });
            }
        })
    };
    onSelectChange = (selectedRowKeys) => {
        //console.log('selectedRowKeys changed: ', selectedRowKeys);
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
            url:`${this.url.sampleInspection.getAll}`,
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
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current')) ;
        this.server = localStorage.getItem('remote');
        this.Authorization = localStorage.getItem("Authorization")
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
                disabled: record.sampleDeliveringRecord.acceptStatus === 1|| record.sampleDeliveringRecord.acceptStatus === 2|| record.sampleDeliveringRecord.acceptStatus === 3, // Column configuration not to be checked
              }),
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

                        <SearchCell name='请输入工厂名'  searchEvent={this.searchEvent} searchContentChange={this.searchContentChange} fetch={this.fetch}/>
                    </span>
                    <div className='clear' ></div>
                    <Table columns={this.columns} dataSource={this.state.dataSource} rowSelection={rowSelection} size="small"
                           bordered
                           rowKey={record => record.sampleDeliveringRecord.id}
                           onChange={this.handleTableChange}
                           pagination={this.pagination}
></Table>
                </div>
            </div>
        )
    }
}

export default SampleInspection