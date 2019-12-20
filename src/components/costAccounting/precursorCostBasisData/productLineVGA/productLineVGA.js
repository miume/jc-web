import React from "react";
import '../../../Home/page.css';
import { Table,Popconfirm,Divider,message,Spin } from 'antd';
import BlockQuote from '../../../BlockQuote/blockquote';
import AddModal from './addModal';
import DeleteByIds from '../../../BlockQuote/deleteByIds';
import SearchCell from '../../../BlockQuote/search';
import axios from "axios";
import Edit from "./edit";

class ProductLineStatical extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state={
            visible:false,
            data:[],
            selectedRowKeys: [],
            loading:true,
            searchContent:'',
        }
        this.onSelectChange = this.onSelectChange.bind(this);
        this.cancel=this.cancel.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.handleTableChange=this.handleTableChange.bind(this);
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
            width: '25%',
        },{
            title: 'VGA点',
            dataIndex: 'vgaName',
            key: 'vgaName',
            align:'center',
            width: '25%',
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
            width: '25%',
            render:(text,record)=>{
                return(
                    <span>
                        <Edit code = {record.vgaPoint.code} fetch = {this.fetch}/>
                        <Divider type="vertical"/>
                        <Popconfirm title="确定删除？" onConfirm={()=>this.handleDelete(record.vgaPoint.code)} okText="确定" cancelText="取消">
                            <span className="blue" href="#">删除</span>
                        </Popconfirm>
                    </span>
                )
            }
        }]
    };

    handleDelete = (id)=>{
        axios({
            url:`${this.url.vgaMap.vgaMap}`,
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
            url:`${this.url.vgaMap.ids}`,
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
            url:`${this.url.vgaMap.page}`,
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
            for(let i=0;i<res.length;i++){
                res[i].weightValue = res[i].lines.map((item)=>{
                    return(
                        item.name+"  "+item.value
                    )
                }).join(",")
            }
            for(let i=0;i<res.length;i++){
                res[i].vgaName = res[i].vgaPoint.vgaName
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
                    <SearchCell name="请输入vga点名称" flag={true} fetch={this.fetch} searchEvent={this.searchEvent} searchContentChange={this.searchContentChange}/>
                    <div className='clear' ></div>
                    <Table pagination={this.pagination} rowSelection={rowSelection} columns={this.columns} rowKey={record => record.vgaPoint.code} dataSource={this.state.data} onChange={this.handleTableChange} size="small" bordered/>
                </Spin>
            </div>
        )
    }
}

export default ProductLineStatical