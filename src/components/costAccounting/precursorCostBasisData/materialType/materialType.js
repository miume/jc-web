import React from "react";
import '../../../Home/page.css';
import { Table,Popconfirm,Divider,message,Spin } from 'antd';
import BlockQuote from '../../../BlockQuote/blockquote';
import DeleteByIds from '../../../BlockQuote/deleteByIds';
import SearchCell from '../../../BlockQuote/search';
import axios from "axios";
import AddModal from "./addModal"
import Edit from "./edit"

class MaterialType extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state={
            data:[{
                index:1,
                materialType:"混合盐溶液",
                source:"补料",
            }],
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
        };
        this.columns=[{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            align:'center',
            width: '20%',
        },{
            title: '材料类别',
            dataIndex: 'materialTypeName',
            key: 'materialTypeName',
            align:'center',
            width: '30%',
        },{
            title:"材料来源",
            dataIndex: 'dataType',
            key: 'dataType',
            align:'center',
            width: '30%',
            render:(text,record)=>{
                if(record.dataType == 0){
                    return "仓库领料"
                }else{
                    return "补料"
                }
            }
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align:'center',
            width: '20%',
            render:(text,record)=>{
                return(
                    <span>
                        <Edit code={record.code} fetch={this.fetch}/>
                        <Divider type="vertical" />
                        <Popconfirm title="确定删除？" onConfirm={()=>this.handleDelete(record.code)} okText="确定" cancelText="取消">
                            <span className="blue" href="#">删除</span>
                        </Popconfirm>
                    </span>
                )
            }
        }]
    };

    handleDelete = (id)=>{
        // console.log(id)
        axios({
            url:`${this.url.precursorMaterialType.delete}`,
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
        // console.log(ids)
        axios({
            url:`${this.url.precursorMaterialType.ids}`,
            method:'delete',
            headers:{
                'Authorization':this.Authorization
            },
            data:ids,
            type:'json'
        }).then((data)=>{
            // console.log(data);
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
            message.info(data.data.message);
            // if((this.pagination.total-1)%10===0){
            //     this.pagination.current = this.pagination.current-1
            // }
            // this.handleTableChange(this.pagination);
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
    };
    /**实现全选 */
    onSelectChange = (selectedRowKeys)=>{
        //   console.log(selectedRowKeys)
        this.setState({ selectedRowKeys:selectedRowKeys });
    }
    /**返回数据录入页面 */
    returnDataEntry = ()=>{
        this.props.history.push({pathname: "/precursorCostBasisData"});
    };
    componentWillUnmount() {
        this.setState = (state, callback) => {
          return ;
        }
    }

    componentDidMount(){
        this.fetch();
    };
    fetch = ()=>{
        axios({
            url:`${this.url.precursorMaterialType.page}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization
            },
        }).then((data)=>{
            // console.log(data)
            const res = data.data.data.list;
            // console.log(res)
            for(var i = 1; i<=res.length; i++){
                res[i-1]['index']=i;
            }
            if(res.length!==0){
                this.setState({
                    data:res,
                    searchContent:'',
                    loading:false
                })
            }
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('precursorCostBasisData'));
        const {  selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            onSelect() {},
            onSelectAll() {},
            // getCheckboxProps: record => ({
            //     disabled: record.commonBatchNumber.status === 2, // Column configuration not to be checked
            //   }),
          };
        return(
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent} menu2='返回'
                            returnDataEntry={this.returnDataEntry} flag={1}></BlockQuote>
                <Spin spinning={this.state.loading}  wrapperClassName='rightDiv-content'>
                    <AddModal fetch={this.fetch}/>
                    <DeleteByIds 
                        selectedRowKeys={this.state.selectedRowKeys}
                        deleteByIds={this.start}
                        cancel={this.cancel}
                        flag={true}
                    />
                    {/* <SearchCell name="请输入产线名称" flag={true}/> */}
                    <div className='clear' ></div>
                    <Table rowSelection={rowSelection} pagination={this.pagination} columns={this.columns} rowKey={record => record.code} dataSource={this.state.data} scroll={{ y: 400 }} size="small" bordered/>
                </Spin>
            </div>
        )
    }
}

export default MaterialType