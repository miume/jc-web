import React from "react";
import '../../../Home/page.css';
import { Table,Popconfirm,Divider,message,Spin } from 'antd';
import BlockQuote from '../../../BlockQuote/blockquote';
import AddModal from './addModal';
import DeleteByIds from '../../../BlockQuote/deleteByIds';
import SearchCell from '../../../BlockQuote/search';
import axios from "axios";
import Edit from "./edit";
import {judgeOperation,getOperations} from '../../../commom/getOperations'
class ProductLineStatical extends React.Component{//物料产线权重分配
    url;
    constructor(props){
        super(props);
        this.state={
            visible:false,
            data:[],
            selectedRowKeys: [],
            loading:true,
            searchContent:'',
            searchFlag:1,//用来判断是搜索分页还是getAll分页
        }
        this.onSelectChange = this.onSelectChange.bind(this);
        this.cancel=this.cancel.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
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
            width: '10%',
        },{
            title: '物料名称',
            dataIndex: 'materialName',
            key: 'materialName',
            align:'center',
            width: '15%',
        },{
            title: '所属类别',
            dataIndex: 'types',
            key: 'types',
            align:'center',
            width: '20%',
            render:(text,record)=>{
                if(record.types===1){
                    return "辅材"
                }else{
                    return "主材"
                }
            }
        },{
            title: '所属工序',
            dataIndex: 'processName',
            key: 'processName',
            align:'center',
            width: '20%',
        },{
            title: '产线/权重',
            dataIndex: 'weightValue',
            key: 'weightValue',
            align:'center',
            width: '25%',
            render:(text,record)=>{
                var record = record.weightValue.split(",");
                return(
                    record.map((item,index)=>{
                        return(<div key={index}>
                            {item}
                        </div>)
                    })
                )
            }
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
                        <Edit code = {record.materialCode} updateFlag={updateFlag} fetch = {this.fetch}/>
                        {updateFlag&&deleteFlag?<Divider type='vertical'/>:''}
                        <span className={deleteFlag?'':'hide'}>
                            <Popconfirm title='确定删除?' onConfirm={()=>this.handleDelete(record.materialCode)} okText='确定' cancelText='取消'>
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
            url:`${this.url.precursorMaterialLineWeight.delete}`,
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
        setTimeout(() => {
            if((this.pagination.total-1)%10===0){
                this.pagination.current = this.pagination.current-1
            }
            this.handleTableChange(this.pagination);
        }, 1000);
    };
    /**页面切换调用的函数*/
    handleTableChange = (pagination) => {
        let {searchFlag}=this.state
        if(searchFlag===0){
            this.fetch({
                size: pagination.pageSize,
                page: pagination.current,
            });
        }
        else{
            this.searchEvent({
                size: pagination.pageSize,
                page: pagination.current,
            })
        }
    };
    start = () => {
        const ids = this.state.selectedRowKeys;
        axios({
            url:`${this.url.precursorMaterialLineWeight.ids}`,
            method:'delete',
            headers:{
                'Authorization':this.url.Authorization
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
        this.setState = (state, callback) => {
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

    fetch = (params = {})=>{
        this.setState({
            loading:true,
            searchFlag:0
        })
        axios({
            url:`${this.url.precursorMaterialLineWeight.page}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization
            },
            params: params,
        }).then((data)=>{
            const dataRes=data.data.data
            const res =  dataRes.list;
            this.pagination.total=dataRes &&dataRes.total?dataRes.total:0;
            this.pagination.current = dataRes &&dataRes.page?dataRes.page:1;
            if(dataRes&&res){
                for(var i = 1; i<=res.length; i++){
                    res[i-1]['index']=(dataRes.page-1)*dataRes.size+i;
                }
                for(var i=0;i<res.length;i++){
                    res[i].weightValue = res[i].weightDTOS.map((item)=>{
                        return(
                            item.lineName+"  "+item.weightValue
                        )
                    }).join(",")
                }
            }
                this.setState({
                    data:res,
                    searchContent:'',
                    loading:false,
                    selectedRowKeys:[]
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
    }
    searchContentChange(e){
        const value = e.target.value;
        this.setState({searchContent:value});
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
    /**返回数据录入页面 */
    returnDataEntry = ()=>{
        this.props.history.push({pathname: "/precursorCostBasisData"});
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        this.current = JSON.parse(localStorage.getItem('dataEntry'));
        let {  selectedRowKeys,addFlag,deleteFlag } = this.state;
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
                    <SearchCell name="请输入物料名称" flag={true} fetch={this.fetch} searchEvent={this.searchEvent} searchContentChange={this.searchContentChange}/>
                    <div className='clear' ></div>
                    <Table pagination={this.pagination} rowSelection={rowSelection} onChange={this.handleTableChange} columns={this.columns} rowKey={record => record.materialCode} dataSource={this.state.data} scroll={{ y: 400 }} size="small" bordered/>
                </Spin>
            </div>
        )
    }
}

export default ProductLineStatical