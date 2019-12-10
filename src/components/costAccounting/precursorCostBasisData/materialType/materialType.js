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
        this.onSelectChange = this.onSelectChange.bind(this);
        this.cancel=this.cancel.bind(this);
        this.start=this.start.bind(this);
        this.handleTableChange=this.handleTableChange.bind(this);
    };

    handleDelete = (id)=>{
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
        axios({
            url:`${this.url.precursorMaterialType.ids}`,
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
    };

    /**实现全选 */
    onSelectChange = (selectedRowKeys)=>{
        this.setState({ selectedRowKeys:selectedRowKeys });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
          return ;
        }
    }

    componentDidMount(){
        this.fetch();
    };
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
            url:`${this.url.precursorMaterialType.page}`,
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
    /**返回数据录入页面 */
    returnDataEntry = ()=>{
        this.props.history.push({pathname: "/precursorCostBasisData"});
    };

    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('precursorCostBasisData'));
        const {  selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            onSelect() {},
            onSelectAll() {},
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
                    <div className='clear' ></div>
                    <Table rowSelection={rowSelection} pagination={this.pagination} columns={this.columns} rowKey={record => record.index} onChange={this.handleTableChange} dataSource={this.state.data}  size="small" bordered/>
                </Spin>
            </div>
        )
    }
}

export default MaterialType