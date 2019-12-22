import React from "react";
import Blockquote from "../../BlockQuote/blockquote";
import DeleteByIds from "../../BlockQuote/deleteByIds";
import axios from "axios";
import { Table, message, Spin, Divider ,Popconfirm} from "antd";
import SearchCell from '../../BlockQuote/search';
import AddModal from "./addModal"
import Edit from './edit'
import BatchInfoTrace from './batchTrace/batchTrace'
class BatchMessage extends React.Component {
    componentWillUnmount() {
        this.setState = () => {
            return;
        }
    }
    url = JSON.parse(localStorage.getItem('url'));
    constructor(props) {
        super(props);
        this.state = {
            visiable: false,
            data: [],
            selectedRowKeys: [],
            loading: false,
            searchContent: '',
            searchFlag: 1,//判断是搜索分页还是获取表格数据分页
            batch:'',
            batchData:undefined,
            visiable1:false //批次追溯的modal
        }
        this.pagination = {
            total: this.state.data.length,
            showTotal(total) {
                return `共${total}条记录`
            },
            showSizeChanger: true,
            pageSizeOptions: ["10","20","50","100"]
        };
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            align: 'center',
            width: '8.11%',
        }, {
            title: '批次信息',
            dataIndex: 'batch',
            key: 'batch',
            align: 'center',
            width: '11.11%',
        }, {
            title: '工序',
            dataIndex: 'process',
            key: 'process',
            align: 'center',
            width: '11.11%',
        }, {
            title: '批次生成时间',
            dataIndex: 'setTime',
            key: 'setTime',
            align: 'center',
            width: '12.11%',
        }, {
            title: '生成人',
            dataIndex: 'setPeople',
            key: 'setPeople',
            align: 'center',
            width: '11.11%',

        }, {
            title: '状态',
            dataIndex: 'statusFlag',
            key: 'statusFlag',
            align: 'center',
            width: '11.11%',
            render: (text, record) => {
                if (record.statusFlag === false) {
                    return (<span><span style={{color:'rgb(75,216,99)'}}><i className='fa fa-circle'></i></span>&nbsp;进行中</span>)
                } else {
                    return (<span><span  style={{color:'rgb(184,231,255)'}}><i className='fa fa-circle'></i></span>&nbsp;已完成</span>)
                }
            }
        }, {
            title: '开始时间',
            dataIndex: 'startTime',
            key: 'startTime',
            align: 'center',
            width: '12.11%',
        }, {
            title: '结束时间',
            dataIndex: 'endTime',
            key: 'endTime',
            align: 'center',
            width: '12.11%',
        }, {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align: 'center',
            width: '11.11%',
            render: (text, record) => {
                return (
                    <span>
                        <Edit fetch={this.fetch} statusFlag={record.statusFlag} code={record.code} url={this.url}/>
                        <Divider type="vertical" />
                        {!record.statusFlag?
                            <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.code)} okText="确定" cancelText="再想想" >
                                <span className='blue'>删除</span>
                            </Popconfirm>
                            :<span className='notClick' >删除</span>
                        }
                    </span>
                )
            }
        }]
        this.handleTableChange = this.handleTableChange.bind(this);
        this.searchEvent=this.searchEvent.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
        this.deleteByIds=this.deleteByIds.bind(this);
        this.handleBack=this.handleBack.bind(this);
        this.showModal=this.showModal.bind(this);
    }
    componentDidMount() {
        this.fetch();
    }
    handleTableChange(pagination) {
        this.pagination = pagination
        if (this.state.searchFlag === 1) {
            this.searchEvent()
        }
        else {
            this.fetch()
        }
    }
    fetch = (params = {}) => {
        this.setState({
            loading:true
        })
        let { pageSize, current } = this.pagination
        axios({
            url: `${this.url.productionBatchInfo.getAll}`,
            method: "get",
            headers: {
                'Authorization': this.url.Authorization
            },
            params: {
                ...params,
                page: current ? current : 1,
                size: pageSize ? pageSize : 10
            }
        }).then((data) => {
            const res = data.data.data;
            if (res && res.list) {
                this.pagination.total = res.total ? res.total : 0;
                let data = [];
                for (let i = 0; i < res.list.length; i++) {
                    data.push(res.list[i].productionBatchInfo);
                }

                for (let i = 1; i <= data.length; i++) {
                    data[i - 1]['index']=(res.page-1)*res.size+i
                }
                this.setState({
                    data: data,
                })
            }
            this.setState({
                searchContent: '',
                loading: false,
                selectedRowKeys: [],
                searchFlag: 0
            })

        })
    }

    onSelectChange = (selectedRowKeys,data) => {
        this.setState({ 
            selectedRowKeys: selectedRowKeys ,
            batchData:data
        });
    }
    //根据id处理单条记录删除
    handleDelete(id){
        axios({
          url:`${this.url.productionBatchInfo.deleteOne}?id=${id}`,
          method:'Delete',
          headers:{
            'Authorization':this.url.Authorization
          },
          params:{
              code:id
          }
        })
        .then((data)=>{
          if(data.data.code===0){
              this.fetch();
              message.info('操作成功!')
          }
          else{
              message.error('删除失败，请联系管理员！');
          }
        })
        .catch(()=>{
            message.error('删除失败，请联系管理员！');
        });
      }
    /**批量删除弹出框确认函数 */
    deleteByIds(){
        const ids = this.state.selectedRowKeys;//删除的几行的id
        axios({
            url:`${this.url.productionBatchInfo.deletes}`,
            method:'Delete',
            headers:{
                'Authorization' :this.url.Authorization
            },
            data:ids,
            type:'json'
        })
        .then((data)=>{
            if(data.data.code===0){//即操作成功
                this.fetch();
            }
            else{
                message.error('删除失败，请联系管理员！');
            }
            this.setState({
                selectedRowKeys:[]
            });
        })//处理成功
        .catch(()=>{
            message.error('删除失败，请联系管理员！');
        });//处理异常
    }
    cancel = () => {
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    };
    searchContentChange = (e) => {
        const value = e.target.value;
        this.setState({ searchContent: value });
    };
    searchEvent(params = {}) {
        let { searchContent } = this.state,
            {pageSize,current}=this.pagination
        axios({
            url: this.url.productionBatchInfo.getAllInfoByCondition,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params: {
                condition: searchContent,
                page:current?current:1,
                size:pageSize?pageSize:10
            }
        }).then(data => {
            let res=data.data.data
            if(res&&res.list){
                this.pagination.total = res.total ? res.total : 0;
                let data = [];
                for (let i = 0; i < res.list.length; i++) {
                    data.push(res.list[i].productionBatchInfo);
                }

                for (let i = 1; i <= data.length; i++) {
                    data[i - 1]['index']=(res.page-1)*res.size+i
                }
                this.setState({
                    data: data,
                })
            }
        }).catch(()=>{
            message.error('操作失败，请联系管理员!')
        })
    }
    showModal(){
        let {batchData}=this.state
        for(let i=0;i<batchData.length-1;i++){
            if(batchData[i].batch!==batchData[i+1].batch){
                message.error('您选的批次不同，不可生成批次追溯!')
                return
            }
         }
         this.setState({
            visiable1:true
        })
       this.child.handleCreate()
    }
    handleBack(value){//处理批次追溯预览的返回
        this.setState({
            selectedRowKeys:[],
            visiable1:false
        })
    }
    render() {
        const current = JSON.parse(localStorage.getItem('current'));
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div>
                <Blockquote name={current.menuName} menu={current.menuParent} />
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <AddModal fetch={this.fetch} />
                    <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds} cancel={this.cancel} flag={true} />&nbsp;&nbsp;&nbsp;
                    <BatchInfoTrace batchData={this.state.batchData} handleBack={this.handleBack} onRef={(ref)=>{ this.child = ref}} 
                                    showModal={this.showModal} visiable={this.state.visiable1}
                                    selectedRowKeys={this.state.selectedRowKeys}/>
                    <SearchCell name='请输入批次信息' flag={true} fetch={this.fetch} searchContentChange={this.searchContentChange} searchEvent={this.searchEvent}/>
                    <div className='clear' ></div>
                    <Table pagination={this.pagination} onChange={this.handleTableChange} rowSelection={rowSelection} columns={this.columns} rowKey={record => record.code} dataSource={this.state.data} size="small" bordered />
                </Spin>
            </div>
        )
    }
}

export default BatchMessage