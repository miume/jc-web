import React from "react";
import '../../../Home/page.css';
import { Table,Popconfirm,Divider,message,Spin } from 'antd';
import BlockQuote from '../../../BlockQuote/blockquote';
import AddModal from './addModal';
import DeleteByIds from '../../../BlockQuote/deleteByIds';
import SearchCell from '../../../BlockQuote/search';
import axios from "axios";
import Edit from "./edit"
import {judgeOperation,getOperations} from '../../../commom/getOperations'
class MaterialPLC extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state={
            visible:false,
            data:[],
            selectedRowKeys: [],
            loading:true,
            searchContent:'',
            searchFlag:1//用来判断是搜索分页还是getAll分页
        };
        this.onSelectChange = this.onSelectChange.bind(this);
        this.cancel=this.cancel.bind(this);
        this.start=this.start.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.handleTableChange=this.handleTableChange.bind(this)
        this.pagination = {
            total: this.state.data.length,
            showTotal(total){
                return `共${total}条记录`
            },
            showSizeChanger: true,
            pageSizeOptions: ["10","20","50","100"]
        };
        this.columns=[{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            align:'center',
            width: '20%',
        },{
            title: '物料名称',
            dataIndex: 'material',
            key: 'material',
            align:'center',
            width: '30%',
        },{
            title: 'PLC地址表',
            dataIndex: 'plcAddress',
            key: 'plcAddress',
            align:'center',
            width: '30%',
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align:'center',
            width: '20%',
            render:(text,record)=>{
                let {deleteFlag,updateFlag}=this.state
                return(
                    <span>
                        <Edit fetch={this.fetch} updateFlag={updateFlag} code={record.code}/>
                        {updateFlag&&deleteFlag?<Divider type='vertical'/>:''}
                        <span className={deleteFlag?'':'hide'}>
                            <Popconfirm title='确定删除?' onConfirm={()=>this.handleDelete(record.code)} okText='确定' cancelText='取消'>
                                <span className='blue'>删除</span>
                            </Popconfirm>
                        </span>
                    </span>
                )
            }
        }]
    };

    handleDelete = (id)=>{
        axios({
            url:`${this.url.matPlcMap.matPlcMap}`,
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
    };
    start = () => {
        const ids = this.state.selectedRowKeys;
        axios({
            url:`${this.url.matPlcMap.ids}`,
            method:'delete',
            headers:{
                'Authorization':this.Authorization
            },
            data:ids,
            type:'json'
        }).then((data)=>{
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
            message.info(data.data.message);
            this.fetch();
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
        let {openKeys,menuId} = this.current, operations = getOperations(openKeys,menuId);
        this.setState({
            addFlag:judgeOperation(operations,'SAVE'),
            deleteFlag:judgeOperation(operations,'DELETE'),
            updateFlag:judgeOperation(operations,'UPDATE')
        })
    }
    handleTableChange(pagination){
        let {searchFlag}=this.state
        this.pagination=pagination
        if(searchFlag===1){
            this.searchEvent({
                size:pagination.pageSize,
                page:pagination.current
            })
        }
        else{
            this.fetch({
                size:pagination.pageSize,
                page:pagination.current
            })
        }
    }
    fetch = (params={})=>{
        this.setState({
            loading:true,
            searchFlag:0
        })
        axios({
            url:`${this.url.matPlcMap.page}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization
            },
            params:params
        }).then((data)=>{
            const res = data.data.data;
            this.pagination.total=res&&res.total?res.total:0
           if(res &&res.list){
                for(var i = 1; i<=res.list.length; i++){
                    res.list[i-1]['index']=(res.page-1)*res.size+i;
                }
           }

            this.setState({
                data:res.list,
                searchContent:'',
                loading:false,

            })

        })
    }
     /**实现全选 */
    onSelectChange(selectedRowKeys) {
        this.setState({ selectedRowKeys:selectedRowKeys });
    }
    cancel() {
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    };
    searchContentChange(e){
        const value = e.target.value;
        this.setState({searchContent:value});
    };
    /**返回数据录入页面 */
    returnDataEntry = ()=>{
        this.props.history.push({pathname: "/precursorCostBasisData"});
    }
    searchEvent(params={}){
        const ope_name = this.state.searchContent;
        this.fetch({
            ...params,
            condition:ope_name
        })
        this.setState({
            searchFlag:1
        })

    };
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        this.current = JSON.parse(localStorage.getItem('dataEntry'));
        let {  selectedRowKeys ,addFlag,deleteFlag} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            onSelect() {},
            onSelectAll() {},
          };
        return(
            <div>
                <BlockQuote name={this.current.menuName} menu={this.current.menuParent} menu2='返回'
                            returnDataEntry={this.returnDataEntry} flag={1}></BlockQuote>
                <Spin spinning={this.state.loading}  wrapperClassName='rightDiv-content'>
                    <AddModal fetch={this.fetch} addFlag={addFlag}/>
                    <DeleteByIds
                        selectedRowKeys={this.state.selectedRowKeys}
                        deleteByIds={this.start}
                        cancel={this.cancel}
                        flag={deleteFlag}
                    />
                    <SearchCell name='请输入物料名称/PLC地址' flag={true} fetch={this.fetch} searchEvent={this.searchEvent} searchContentChange={this.searchContentChange}/>
                    <div className='clear' ></div>
                    <Table pagination={this.pagination} rowSelection={rowSelection} columns={this.columns} rowKey={record => record.code} dataSource={this.state.data} onChange={this.handleTableChange}  size="small" bordered/>
                </Spin>
            </div>
        )
    }
}

export default MaterialPLC
