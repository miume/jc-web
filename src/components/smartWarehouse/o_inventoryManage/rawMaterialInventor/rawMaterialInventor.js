//入库管理的原材料入库
import React,{Component} from 'react';
import {Table, Spin} from 'antd';
import SearchCell from '../../../BlockQuote/search';
import axios from 'axios';
class RowMaterialInventor extends Component{
    url;
    operation;
    componentDidMount(){
      this.getTableData();
    }

    /**销毁组件*/
    componentWillUnmount(){
        this.setState=()=>{
            return;
        }
    }
    constructor(props){
         super(props);
         this.state={
             materialName:'',
             dataSource:[],
             pageChangeFlag:0,//0表示getAllByPage分页  1 表示搜索分页
             loading: true
         };

         this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b)=>a.index-b.index,
            width:'10%',
            align:'center'
        },{
           title:'物料名称',
           dataIndex:'materialName',
           key:'materialName',
           width:'15%',
           align:'center'
        },{
            title:'物料类型',
            dataIndex:'materialType',
            key:'materialType',
            width:'15%',
            align:'center'
        },{
           title:'物料编码',
           dataIndex:'materialCode',
           key:'materialCode',
           width:'50%',
           align:'center'
        },{
           title:'重量',
           dataIndex:'weight',
           key:'weight',
           width:'10%',
           align:'center'
        }];
        this.pagination={
            showTotal:(total)=>`共${total}条记录`,//显示共几条记录
            showSizeChanger: true,
            pageSizeOptions: ['10','20','50','100']
        };
        this.reset = this.reset.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.handleTableChange=this.handleTableChange.bind(this);
        this.searchContentChange=this.searchContentChange.bind(this);
        this.searchEvent=this.searchEvent.bind(this);
        this.judgeOperation=this.judgeOperation.bind(this);
    }
    /**切换分页*/
    handleTableChange=(pagination)=>{//页切换时调用
        this.pagination = pagination;
        this.getTableData({
            size: pagination.pageSize,//当前页显示了几条记录
            page: pagination.current,//当前是第几页
            materialName: this.state.materialName
        });
    };

    /**获取表格数据*/
    getTableData(params = {}) {
        params['orderBy'] = 'id';
        params['orderType'] = 'DESC';
        params['materialType'] = this.props.type;
        this.setState({
            loading: true
        });
        axios({
            url: `${this.url.inventorManage.inventorManage}`,
            method: 'post',
            headers: {
                "Authorization": this.url.Authorization
            },
            data: params
        }).then(data => {
            let res = data.data.data;
            if(res && res.records) {
                this.pagination.total = res.total;
                for(let i = 0; i < res.records.length; i++) {
                    res.records[i]['index'] = (res.current - 1) * 10 + i + 1;
                }
                this.setState({
                    dataSource: res.records
                })
            }
            this.setState({
                loading: false
            })
        })
    }

    /**搜索事件 根据物料名称进行搜索*/
    searchEvent() {
        this.getTableData({
            materialName: this.state.materialName
        });
    }

    /**监控搜索框内容*/
    searchContentChange (e) {
       const value=e.target.value;
       this.setState({materialName:value});
    }

    /**重置*/
    reset() {
        this.setState({
            materialName: ''
        });
        this.getTableData();
    }

    judgeOperation(operation,operationCode){
        let flag=operation?operation.filter(e=>e.operationCode===operationCode):[];
        return flag.length>0?true:false
    }

    render(){
        this.url=JSON.parse(localStorage.getItem('url'));
        const current=JSON.parse(localStorage.getItem('current'));
        //获取该菜单所有权限
      this.operation=JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null
        return(
            <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <SearchCell name='请输入物料名称'
                        searchContentChange={this.searchContentChange}
                        searchEvent={this.searchEvent}
                        type={this.props.type}
                        fetch={this.reset}
                        flag={this.judgeOperation(this.operation,'QUERY')}
                    >
                    </SearchCell>
                <div className='clear'></div>
                <Table
                rowKey={record=>record.id}
                columns={this.columns}
                dataSource={this.state.dataSource}
                pagination={this.pagination}
                onChange={this.handleTableChange}
                bordered
                size='small'
                ></Table>
            </Spin>
        );
    }
}
export default  RowMaterialInventor;
