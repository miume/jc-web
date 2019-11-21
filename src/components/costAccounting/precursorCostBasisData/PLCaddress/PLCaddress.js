import React from "react";
import '../../../Home/page.css';
import { Table,Popconfirm,Divider,message,Spin } from 'antd';
import BlockQuote from '../../../BlockQuote/blockquote';
import AddModal from './addModal';
import DeleteByIds from '../../../BlockQuote/deleteByIds';
import SearchCell from '../../../BlockQuote/search';
import axios from "axios";
import Edit from "./edit";

class PLCaddress extends React.Component{
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
        this.start=this.start.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.handleTableChange=this.handleTableChange.bind(this);
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
            title: 'PLC地址表',
            dataIndex: 'address',
            key: 'address',
            align:'center',
            width: '30%',
        },{
            title:"地址说明",
            dataIndex: 'description',
            key: 'description',
            align:'center',
            width: '30%',
            render:(text,record)=>{
                // console.log(record)
                if(text == undefined){
                    return "无"
                }else{
                    return text
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
                        <Divider type="vertical"/>
                        <Popconfirm title="确定删除？" onConfirm={()=>this.handleDelete(record.code)} okText="确定" cancelText="取消">
                            <span className="blue" href="#">删除</span>
                        </Popconfirm>
                    </span>
                )
            }
        }]
    }

    handleDelete = (id)=>{
        // console.log(id)
        axios({
            url:`${this.url.plcAddress.plcAddress}`,
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
            url:`${this.url.plcAddress.ids}`,
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
    componentWillUnmount() {
        this.setState = () => {
          return ;
        }
    }

    componentDidMount(){
        this.fetch();
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
            loading:true
        })
        axios({
            url:`${this.url.plcAddress.plcAddress}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization
            },
            params:params
        }).then((data)=>{
            const res = data.data.data;
            // console.log(res)
            if(res&&res.list){
                for(var i = 1; i<=res.list.length; i++){
                    res.list[i-1]['index']=(res.page-1)*res.pageSize+i;
                }
            }
                this.setState({
                    data:res.list,
                    searchContent:'',
                    loading:false
                })
            
        })
    }
    // rowSelected(selectedRowKeys){
    //     this.setState({
    //       selectedIds: selectedRowKeys
    //     });
    //   }
      /**实现全选 */
      onSelectChange(selectedRowKeys) {
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
        const ope_name = this.state.searchContent;
        axios({
            url:`${this.url.plcAddress.plcAddress}`,
            method:'get',
            headers:{
                'Authorization':this.Authorization
            },
            params:{
                // size: this.pagination.pageSize,
                // page: this.pagination.current,
                condition:ope_name
            },
            type:'json',
        }).then((data)=>{
            // const res = data.data.data;
            // if(res&&res.list){
            //     this.pagination.total=res.total;
            //     for(var i = 1; i<=res.list.length; i++){
            //         res.list[i-1]['index']=(res.prePage)*10+i;
            //     }
            //     this.setState({
            //         dataSource: res.list,
            //     });
            // }
            const res = data.data.data.list;
            // console.log(res)
            for(var i = 1; i<=res.length; i++){
                res[i-1]['index']=i;
            }
            if(res.length!==0){
                this.setState({
                    data:res
                })
            }
        })
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
                        deleteByIds={this.start}
                        cancel={this.cancel}
                        flag={true}
                    />
                    <SearchCell name='请输入PLC地址' flag={true} fetch={this.fetch} searchEvent={this.searchEvent} searchContentChange={this.searchContentChange}/>
                    <div className='clear' ></div>
                    <Table pagination={this.pagination} rowSelection={rowSelection} columns={this.columns} rowKey={record => record.code} dataSource={this.state.data} scroll={{ y: 400 }} size="small" bordered/>
                </Spin>
            </div>
        )
    }
}

export default PLCaddress