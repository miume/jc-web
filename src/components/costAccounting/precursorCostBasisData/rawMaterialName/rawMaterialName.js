import React from "react";
import '../../../Home/page.css';
import { Table,Popconfirm,Divider,message,Spin } from 'antd';
import BlockQuote from '../../../BlockQuote/blockquote';
import DeleteByIds from '../../../BlockQuote/deleteByIds';
import SearchCell from '../../../BlockQuote/search';
import axios from "axios";
import AddModal from "./addModal"

class RawMaterialName extends React.Component{
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
        };
        this.columns=[{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            align:'center',
            width: '12.5%',
        },{
            title: '原材料名称',
            dataIndex: 'materialName',
            key: 'materialName',
            align:'center',
            width: '12.5%',
        },{
            title:"材料来源",
            dataIndex: 'source',
            key: 'source',
            align:'center',
            width: '12.5%',
        },{
            title:"材料类别",
            dataIndex: 'materialType',
            key: 'materialType',
            align:'center',
            width: '12.5%',
        },{
            title:"所属金属",
            dataIndex: 'metal',
            key: 'metal',
            align:'center',
            width: '12.5%',
        },{
            title:"材料物相",
            dataIndex: 'materialPhase',
            key: 'materialPhase',
            align:'center',
            width: '12.5%',
        },{
            title:"领料方式",
            dataIndex: 'method',
            key: 'method',
            align:'center',
            width: '12.5%',
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align:'center',
            width: '12.5%',
            render:(text,record)=>{
                return(
                    <span>
                        <AddModal editFlag={true} fetch={this.fetch}/>
                        <Divider type="vertical" />
                        <span className="blue">删除</span>
                    </span>
                )
            }
        }]
        this.onSelectChange = this.onSelectChange.bind(this);
        this.cancel=this.cancel.bind(this);
        this.start=this.start.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.handleTableChange=this.handleTableChange.bind(this);
    };
    handleTableChange(pagination){
        this.pagination=pagination
        this.fetch()
    }
    handleDelete = (id)=>{
        // console.log(id)
        axios({
            url:`${this.url.precursorRawMaterial.deleteById}`,
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
        // console.log(ids)
        axios({
            url:`${this.url.precursorRawMaterial.deleteByIds}`,
            method:'delete',
            headers:{
                'Authorization':this.url.Authorization
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
            url:`${this.url.precursorRawMaterial.page}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization
            },
            params
        }).then((data)=>{
            const res=data.data.data;
            console.log(res)
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
    /**实现全选 */
    onSelectChange = (selectedRowKeys)=>{
        //   console.log(selectedRowKeys)
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
    searchEvent(){
        this.fetch()
    };
    /**返回数据录入页面 */
    returnDataEntry = ()=>{
        this.props.history.push({pathname: "/precursorCostBasisData"});
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
                        // deleteByIds={this.start}
                        // cancel={this.cancel}
                        flag={true}
                    />
                    <SearchCell name="请输入原材料名称" flag={true}/>
                    <div className='clear' ></div>
                    <Table rowSelection={rowSelection} onChange={this.handleTableChange} pagination={this.pagination} columns={this.columns} rowKey={record => record.index} dataSource={this.state.data} scroll={{ y: 400 }} size="small" bordered/>
                </Spin>
            </div>
        )
    }
}


export default RawMaterialName