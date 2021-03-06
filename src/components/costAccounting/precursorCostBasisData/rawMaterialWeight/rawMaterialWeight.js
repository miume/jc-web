import React from "react";
import '../../../Home/page.css';
import { Table,Popconfirm,Divider,message,Spin } from 'antd';
import BlockQuote from '../../../BlockQuote/blockquote';
import DeleteByIds from '../../../BlockQuote/deleteByIds';
import SearchCell from '../../../BlockQuote/search';
import axios from "axios";
import AddModal from './addModal'
import {judgeOperation,getOperations} from '../../../commom/getOperations'
class RawMaterialWeight extends React.Component{
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
            align:'center',
            width: '16.7%',
        },{
            title: '原材料名称',
            dataIndex: 'materialName',
            key: 'materialName',
            align:'center',
            width: '16.7%',
        },{
            title:"材料来源",
            dataIndex: 'dataType',
            key: 'dataType',
            align:'center',
            width: '16.7%',
            render:(text,record)=>{
                if(record.dataType===1){
                    return '补料'
                }
                else {
                    return '仓库领料'
                }
            }
        },{
            title:"材料类别",
            dataIndex: 'materialTypeName',
            key: 'materialTypeName',
            align:'center',
            width: '16.7%',
            
        
        },{
            title:"产线/权重",
            dataIndex: 'weightValue',
            key: 'weightValue',
            align:'center',
            width: '16.7%',
            render:(text,record)=>{
                let data = record.weightValue.split(",");
                return(
                    data.map((item,index)=>{
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
            width: '16.7%',
            render:(text,record)=>{
                let {deleteFlag,updateFlag}=this.state
                return(
                    <span>
                        <AddModal url={this.url} fetch={this.fetch} updateFlag={updateFlag} editFlag={true} code={record.materialCode}/>
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
            url:`${this.url.precursorRawmaterialLineWeight.page}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization
            },
            params
        }).then((data)=>{
            const res=data.data.data;
            let dataSource = [];
            if(res&&res.list) {
                this.pagination.total = res.total ? res.total : 0;
                for (let i = 1; i <= res.list.length; i++) {
                    res.list[i - 1]['index'] = (res['page']-1) * res['size'] + i;
                }
                for(var i=0;i<res.list.length;i++){
                    res.list[i].weightValue = res.list[i].weightDTOS.map((item)=>{
                        return(
                            item.lineName+"  "+item.weightValue
                        )
                    }).join(",")
                }
                dataSource = res.list;
                this.setState({
                    data: dataSource
                })
            }
            this.setState({
                loading:false,
                searchContent:''
            })
        })
    }
    /**实现全选 */
    onSelectChange = (selectedRowKeys)=>{
        this.setState({ selectedRowKeys:selectedRowKeys });
    }
    handleDelete = (id)=>{
        axios({
            url:`${this.url.precursorRawmaterialLineWeight.delete}`,
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
    }
    start = () => {
        const ids = this.state.selectedRowKeys;
        axios({
            url:`${this.url.precursorRawmaterialLineWeight.ids}`,
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
        this.fetch()
    };
    handleTableChange(pagination){
        this.pagination=pagination
        this.fetch()
    }
    /**返回数据录入页面 */
    returnDataEntry = ()=>{
        this.props.history.push({pathname: "/precursorCostBasisData"});
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        this. current = JSON.parse(localStorage.getItem('dataEntry'));
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
                    <AddModal fetch={this.fetch} url={this.url} addFlag={addFlag}/>
                    <DeleteByIds 
                            selectedRowKeys={this.state.selectedRowKeys}
                            deleteByIds={this.start}
                            cancel={this.cancel}
                            flag={deleteFlag}
                        />
                    <SearchCell name="请输入原材料名称" flag={true} searchEvent={this.searchEvent}
                      searchContentChange={this.searchContentChange}/>
                    <div className='clear' ></div>
                    <Table rowSelection={rowSelection} onChange={this.handleTableChange} pagination={this.pagination} columns={this.columns} rowKey={record => record.materialCode} dataSource={this.state.data} size="small" bordered/>
                </Spin>
            </div>
        )
    }
}


export default RawMaterialWeight