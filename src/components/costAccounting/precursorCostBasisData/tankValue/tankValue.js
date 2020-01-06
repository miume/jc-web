import React from "react";
import '../../../Home/page.css';
import { Table,Popconfirm,Divider,message,Spin } from 'antd';
import BlockQuote from '../../../BlockQuote/blockquote';
import DeleteByIds from '../../../BlockQuote/deleteByIds';
import SearchCell from '../../../BlockQuote/search';
import axios from "axios";
import AddModal from "./addModal"
import {judgeOperation,getOperations} from '../../../commom/getOperations'
class TankValue extends React.Component{
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
            pageSizeOptions: ["10","20","50","100"]
        };
        this.columns=[{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: '20%',
        },{
            title: '生产线',
            dataIndex: 'lineName',
            key: 'lineName',
            width: '20%',
        },{
            title:"合成槽号",
            dataIndex: 'materialName',
            key: 'materialName',
            width: '20%',
        },{
            title:"合成槽体积値",
            dataIndex: 'volumesValue',
            key: 'volumesValue',
            width: '20%',
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: '20%',
            render:(text,record)=>{
                let {deleteFlag,updateFlag}=this.state
                return(
                    <span>
                        <AddModal url={this.url}  updateFlag={updateFlag} editFlag={true} fetch={this.fetch} code={record.code} lineName={record.lineName}/>
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
        this.onSelectChange = this.onSelectChange.bind(this);
        this.cancel=this.cancel.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.handleTableChange=this.handleTableChange.bind(this);
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
        this.pagination=pagination
        this.fetch()
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
            url:`${this.url.precursorCompoundCellVolumes.page}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization
            },
            params
        }).then((data)=>{
            const dataRes=data.data.data
            const res = dataRes&&dataRes.list?dataRes.list:null;
         if(dataRes &&res){
            this.pagination.total = dataRes.total ? dataRes.total : 0;
            for (let i = 1; i <= res.length; i++) {
                res[i - 1]['index'] = (dataRes['page']-1) * dataRes['size'] + i;
            }
          
            this.setState({
                data:res,
            })
         }
            this.setState({
                searchContent:'',
                loading:false
            })
        })
    }
    /**实现全选 */
    onSelectChange = (selectedRowKeys)=>{
        this.setState({ selectedRowKeys:selectedRowKeys });
    }
    handleDelete = (id)=>{
        axios({
            url:`${this.url. precursorCompoundCellVolumes.delete}`,
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
            url:`${this.url. precursorCompoundCellVolumes.ids}`,
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
        //const ope_name = this.state.searchContent;
       this.fetch()
    };
    /**返回数据录入页面 */
    returnDataEntry = ()=>{
        this.props.history.push({pathname: "/precursorCostBasisData"});
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        this.current = JSON.parse(localStorage.getItem('dataEntry'));
        let {  selectedRowKeys,addFlag ,deleteFlag} = this.state;
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
                    <AddModal url={this.url} fetch={this.fetch} addFlag={addFlag}/>
                    <DeleteByIds 
                        selectedRowKeys={this.state.selectedRowKeys}
                        deleteByIds={this.start}
                        cancel={this.cancel}
                        flag={deleteFlag}
                    />
                    <SearchCell name="请输入合成槽号" flag={true} fetch={this.fetch} searchEvent={this.searchEvent} searchContentChange={this.searchContentChange}/>
                    <div className='clear' ></div>
                    <Table rowSelection={rowSelection} pagination={this.pagination} onChange={this.handleTableChange} columns={this.columns} rowKey={record => record.code} dataSource={this.state.data}  size="small" bordered/>
                </Spin>
            </div>
        )
    }
}


export default TankValue