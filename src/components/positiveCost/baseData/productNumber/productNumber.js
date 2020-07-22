import React from 'react';
import BlockQuote from "../../../BlockQuote/blockquote";
import {Spin, message, Table, Divider, Popconfirm} from "antd";
import SearchCell from '../../../BlockQuote/search';
import DeleteByIds from '../../../BlockQuote/deleteByIds';
import AddModal from "./addModal";
import axios from 'axios';
import {getOperations,judgeOperation} from "../../../commom/getOperations";

class ProductNumber extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedRowKeys: [],
            searchContent: '',
            dataSource:[]
        };
        this.operations = [];
        this.pagination = {
            pageSize: 10,
            current: 1,
            showSizeChanger: true,//是否可以改变 pageSize
            showTotal: (total) => `共${total}条记录`,//显示共几条记录
            pageSizeOptions: ["10", "20", "50", "100"]
        };
        this.columns = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            width: '10%'
        },{
            title: '产品型号',
            key: ' name',
            dataIndex: 'name',
            width: '30%'
        },{
            title: '产品信息',
            key: ' description',
            dataIndex: 'description',
            width: '30%'
        },{
            title: '操作',
            key: 'code',
            dataIndex: 'code',
            width: '30%',
            render: (text,record) => {
                //console.log(record)
                let {deleteFlag,updateFlag} = this.state;
                return (
                    <span>
                        <AddModal flag={updateFlag} record={record} title={'编辑'} url={this.url} getTableData={this.getTableData}/>
                        {updateFlag && deleteFlag ? <Divider type={"vertical"}/> : ''}
                        <span className={deleteFlag ? '' : 'hide'}>
                            <Popconfirm title="确认删除?" onConfirm={()=>this.handleDelete(record.code)} okText="确定" cancelText="取消" >
                                <span className='blue'>删除</span>
                            </Popconfirm>
                        </span>
                    </span>
                );
            }
        }]
        
        this.pagination = {
            total: this.state.dataSource.length,
            showTotal(total){
                return `共${total}条记录`
            },
            showSizeChanger: true,
        };

        this.back = this.back.bind(this);
        this.reset = this.reset.bind(this);
        this.cancel = this.cancel.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.searchContentChange=this.searchContentChange.bind(this);
        this.deleteByIds = this.deleteByIds.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
    }

    componentDidMount(){
        this.getTableData()
        let {openKeys,menuId} = this.current, operations = getOperations(openKeys,menuId);
        this.setState({
            addFlag:judgeOperation(operations,'SAVE'),
            deleteFlag:judgeOperation(operations,'DELETE'),
            updateFlag:judgeOperation(operations,'UPDATE')
        })
    }
    componentWillUnmount(){
        this.setState=()=>{
            return
        }
    }
    handleDelete = (id)=>{
        // console.log(id)
        axios({
            url:`${this.url.positiveModel.delete}`,
            method:"delete",
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{id:id}
        }).then((data)=>{
            message.info(data.data.message);
            this.getTableData();
        }).catch((error)=>{
            message.info(error.data)
        });
    };

    getTableData=(params={})=>{
        let {searchContent}=this.state,
            {pageSize,current}=this.pagination;
        params={
            condition:searchContent,
            size:pageSize,
            page:current
        }

        this.setState({
            loading:true
        })
        axios({
            url:this.url.positiveModel.page,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            params
        }).then(data=>{
            let res=data.data.data
            if(res&&res.list){
                this.pagination.total = res.total ? res.total : 0;
                for(let i=0;i<res.list.length;i++){
                    res.list[i]['index']=(res.page-1)*res.size+(i+1);
                }
                this.setState({
                    dataSource:res.list
                })
            }
            this.setState({
                loading:false,
                searchContent:''
            })
        })
    }

    render() {
        this.current = JSON.parse(localStorage.getItem('dataEntry'));
        this.url = JSON.parse(localStorage.getItem('url'));
        let {selectedRowKeys,data,addFlag,deleteFlag} = this.state,
            rowSelection = {
                selectedRowKeys,
                onChange: this.onSelectChange,
            };
        //data = [{ code: 1, index: 1, name: 'ceshi', description: '描述' }]; //TODO: 测试数据删除
        return (
            <div>
                <BlockQuote name={this.current.menuName} menu={this.current.menuParent} menu2='返回' returnDataEntry={this.back}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <AddModal flag={addFlag} title={'新增'} url={this.url} getTableData={this.getTableData}/>
                    
 
                    <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds} cancel={this.cancel} flag={this.state.deleteFlag} />
                    
                    <SearchCell  name='请输入产品型号' flag={true} searchEvent={this.searchEvent}
                      searchContentChange={this.searchContentChange} placeholder={'请输入产品型号'} fetch={this.getTableData}/>
                    <div className='clear'></div>
                    <Table dataSource={this.state.dataSource}
                            columns={this.columns}
                            rowSelection={rowSelection}
                            pagination={this.pagination}
                           onChange={this.handleTableChange}
                           size={'small'}
                           bordered rowKey={record => record.code}/>
                </Spin>
            </div>
        );
    }

    /**确定获取表格数据的参数*/
    getTableParams(value) {   //TODO: 修改所有接口url
        let {searchContent} = this.state, {pageSize,current} = this.pagination,
            params = {
                size: pageSize,
                current: current
            };
            this.getTableData(params,value === undefined ? searchContent : value);
    }

    onSelectChange(selectedRowKeys) {
        this.setState({
            selectedRowKeys:selectedRowKeys
        })
    }
  
   /**批量删除*/
   deleteByIds(){
    const ids=this.state.selectedRowKeys
    //console.log(ids)
    axios({
        url:this.url.positiveModel.ids,
        method:'delete',
        data:ids,
        type : 'json'
    }).then(data=>{
        //console.log(data,data)
        if(data.data.code===0){
            this.getTableData()
        }
        else{
            message.error('操作失败')
        }
    }).catch(error=>{
        message.error('操作失败，请联系管理员!')
    })
    this.cancel()
}
    handleTableChange(pagination) {
        this.pagination = pagination;
        this.getTableData();
    }

    /**搜索事件*/
    searchEvent(){
        this.getTableData()
    }
    searchContentChange(e){
        //console.log(e.target.value)
        this.setState({
            
            searchContent:e.target.value
        })
    }
    /**取消批量删除*/
    cancel() {
        this.setState({
            selectedRowKeys: [],
            loading:false
        })
    }

    /**重置事件*/
    reset() {
        this.setState({
            searchContent: undefined
        });
        this.pagination.current = 1;
        this.getTableParams('')
    }

    back() {
        this.props.history.push('/repoBasic');
    }

}

export default ProductNumber;
